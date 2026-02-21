import { exec } from 'child_process';
import util from 'util';
import path from 'path';
import fs from 'fs';
import os from 'os';
import ffmpegPath from 'ffmpeg-static';

const execPromise = util.promisify(exec);

export type KeyframeRequest = {
    t_ms: number;
    label: "start" | "mid" | "end" | "high_motion" | "other";
};

export async function extractKeyframes(videoUrl: string, requests: KeyframeRequest[]) {
    const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), 'visual-decompiler-'));
    const results: { t_ms: number; label: string; path: string }[] = [];

    // Path resolution hardening for Vercel
    let resolvedFfmpegPath = ffmpegPath;
    let resolvedFfprobePath = ffmpegPath ? path.join(path.dirname(ffmpegPath), 'ffprobe') : 'ffprobe';

    // Homebrew/System fallback for local dev if ffmpeg-static isn't perfect
    if (!fs.existsSync(resolvedFfmpegPath || '')) {
        const brewFfmpeg = '/opt/homebrew/bin/ffmpeg';
        if (fs.existsSync(brewFfmpeg)) resolvedFfmpegPath = brewFfmpeg;
    }
    if (!fs.existsSync(resolvedFfprobePath)) {
        const brewFfprobe = '/opt/homebrew/bin/ffprobe';
        if (fs.existsSync(brewFfprobe)) resolvedFfprobePath = brewFfprobe;
    }

    if (!resolvedFfmpegPath) {
        throw new Error('ffmpeg binary not available in this environment.');
    }

    try {
        // Optimization: Download first 10MB to handle seeking issues in serverless
        const localVideoPath = path.join(tempDir, 'source_buffer.mp4');
        const downloadController = new AbortController();
        const downloadTimeout = setTimeout(() => downloadController.abort(), 12000);

        try {
            const res = await fetch(videoUrl, {
                signal: downloadController.signal,
                headers: { 'Range': 'bytes=0-10485760' } // 10MB buffer
            });
            const buffer = await res.arrayBuffer();
            fs.writeFileSync(localVideoPath, Buffer.from(buffer));
        } catch (downloadErr) {
            console.warn('[Video] Partial download failed, falling back to remote URL:', downloadErr);
        } finally {
            clearTimeout(downloadTimeout);
        }

        const inputSourceFallback = fs.existsSync(localVideoPath) ? localVideoPath : videoUrl;

        // Get duration for relative frame extraction
        let durationMs = 10000; // Default fallback
        try {
            const probeCmd = `"${resolvedFfprobePath}" -v error -show_entries format=duration -of default=noprint_wrappers=1:nokey=1 "${inputSourceFallback}"`;
            const { stdout } = await execPromise(probeCmd);
            const seconds = parseFloat(stdout.trim());
            if (!isNaN(seconds)) durationMs = seconds * 1000;
            console.log(`[Video] Detected duration: ${durationMs}ms`);
        } catch (probeErr) {
            console.warn('[Video] ffprobe failed, using default duration for seek safety:', probeErr);
        }

        for (const req of requests) {
            let targetMs = req.t_ms;
            if (targetMs === -1) targetMs = durationMs / 2; // Mid
            if (targetMs === -2) targetMs = Math.max(0, durationMs - 2000); // End (2s before finish)

            const fileName = `frame_${req.label}_${Math.round(targetMs)}.jpg`;
            const outputPath = path.join(tempDir, fileName);
            const timestampSeconds = targetMs / 1000;

            // Strategy: If targeting mid/end (> 10MB mark roughly 10s), 
            // use remote URL with fast seeking. If targeting start, use local buffer.
            const isDeepSeek = targetMs > 8000; // > 8 seconds
            const finalInput = (isDeepSeek || !fs.existsSync(localVideoPath)) ? videoUrl : localVideoPath;

            console.log(`[Video] Extracting ${req.label} frame at ${targetMs}ms (ss ${timestampSeconds}s) using ${isDeepSeek ? 'remote' : 'buffer'}...`);

            // ffmpeg parameters:
            // For remote URLs, -ss BEFORE -i (fast seeking/output seeking) is CRITICAL to avoid timeouts.
            // For local files, either is fine, but we'll stick to fast seeking for consistency.
            const command = `"${resolvedFfmpegPath}" -hide_banner -loglevel error -rw_timeout 15000000 -ss ${timestampSeconds} -i "${finalInput}" -frames:v 1 -q:v 2 "${outputPath}" -y`;

            try {
                const { stderr } = await execPromise(command);
                if (fs.existsSync(outputPath)) {
                    results.push({
                        t_ms: targetMs,
                        label: req.label,
                        path: outputPath
                    });
                    console.log(`[Video] Successfully extracted ${req.label} frame.`);
                } else {
                    console.warn(`[Video] Frame extraction success in command but file missing: ${outputPath}. Stderr: ${stderr}`);
                }
            } catch (cmdErr: any) {
                console.warn(`[Video] Frame extraction failed for ${req.label} at ${targetMs}ms:`, cmdErr.message, 'Stderr:', cmdErr.stderr);
            }
        }

        if (results.length === 0) {
            throw new Error('Failed to extract keyframes (no frames produced). Verify the video URL is reachable.');
        }

        return { tempDir, results };
    } catch (err) {
        if (fs.existsSync(tempDir)) fs.rmSync(tempDir, { recursive: true, force: true });
        throw err;
    }
}

/**
 * Cleanup function to be called after processing
 */
export function cleanupFrames(tempDir: string) {
    if (fs.existsSync(tempDir)) {
        fs.rmSync(tempDir, { recursive: true, force: true });
    }
}
