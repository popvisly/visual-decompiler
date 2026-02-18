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
    if (process.env.NODE_ENV === 'production') {
        const potentialPath = path.join(process.cwd(), 'node_modules/ffmpeg-static/ffmpeg');
        if (fs.existsSync(potentialPath)) {
            resolvedFfmpegPath = potentialPath;
        }
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

        const inputSource = fs.existsSync(localVideoPath) ? localVideoPath : videoUrl;

        for (const req of requests) {
            const fileName = `frame_${req.t_ms}.jpg`;
            const outputPath = path.join(tempDir, fileName);
            const timestampSeconds = req.t_ms / 1000;

            // ffmpeg parameters for remote resilient extraction
            const command = `"${resolvedFfmpegPath}" -hide_banner -loglevel error -rw_timeout 15000000 -probesize 20000000 -analyzeduration 20000000 -ss ${timestampSeconds} -i "${inputSource}" -frames:v 1 -q:v 2 "${outputPath}" -y`;

            try {
                const { stderr } = await execPromise(command);
                if (fs.existsSync(outputPath)) {
                    results.push({
                        t_ms: req.t_ms,
                        label: req.label,
                        path: outputPath
                    });
                } else {
                    console.warn(`[Video] Frame extraction failed for ${req.t_ms}ms (Command success but no file produced). Stderr: ${stderr}`);
                }
            } catch (cmdErr: any) {
                console.warn(`[Video] Frame extraction command failed for ${req.t_ms}ms: ${cmdErr.message || 'Unknown error'}. Stderr: ${cmdErr.stderr || 'none'}`);
                throw new Error(`ffmpeg failed: ${cmdErr.message}. Stderr: ${cmdErr.stderr || 'none'}`);
            }
        }

        if (results.length === 0) {
            throw new Error('Failed to extract keyframes (no frames produced). Verify the video URL is reachable and indexable.');
        }

        return { tempDir, results };
    } catch (err) {
        fs.rmSync(tempDir, { recursive: true, force: true });
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
