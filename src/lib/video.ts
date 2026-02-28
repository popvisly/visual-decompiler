import { exec } from 'child_process';
import util from 'util';
import path from 'path';
import fs from 'fs';
import os from 'os';
import ffmpegPath from 'ffmpeg-static';

const execPromise = util.promisify(exec);

export type KeyframeRequest = {
    t_ms: number;
    label: "start" | "mid" | "end" | "high_motion" | "other" | "Hook" | "Body 1" | "Body 2" | "Body 3" | "CTA";
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
        // ONLY if it's a remote URL. If it's a local path (from the worker), skip download.
        const isRemote = videoUrl.startsWith('http');
        const localVideoPath = path.join(tempDir, 'source_buffer.mp4');

        if (isRemote) {
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
        } else {
            // It's a local path already
            if (fs.existsSync(videoUrl)) {
                fs.copyFileSync(videoUrl, localVideoPath);
            }
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
            if (targetMs < 0) {
                // Percentage-based seeking (e.g. -0.25 for 25% into video)
                // Legacy: -1 = mid, -2 = end
                if (targetMs === -1) targetMs = durationMs / 2;
                else if (targetMs === -2) targetMs = Math.max(0, durationMs - 2000);
                else targetMs = Math.abs(targetMs) * durationMs;
            }

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
            const timeoutFlag = finalInput.startsWith('http') ? '-rw_timeout 15000000 ' : '';
            const command = `"${resolvedFfmpegPath}" -hide_banner -loglevel error ${timeoutFlag}-ss ${timestampSeconds} -i "${finalInput}" -frames:v 1 -q:v 2 "${outputPath}" -y`;

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

export async function extractAudio(videoUrl: string) {
    const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), 'vd-audio-'));
    const audioPath = path.join(tempDir, 'audio.mp3');

    let resolvedFfmpegPath = ffmpegPath;
    if (!fs.existsSync(resolvedFfmpegPath || '')) {
        const brewFfmpeg = '/opt/homebrew/bin/ffmpeg';
        if (fs.existsSync(brewFfmpeg)) resolvedFfmpegPath = brewFfmpeg;
    }

    if (!resolvedFfmpegPath) {
        throw new Error('ffmpeg binary not available for audio extraction.');
    }

    try {
        console.log(`[Video] Extracting audio for transcription...`);
        // Limit to 30 seconds for strategic synthesis to keep costs/latency low
        const command = `"${resolvedFfmpegPath}" -hide_banner -loglevel error -i "${videoUrl}" -t 30 -vn -acodec libmp3lame -q:a 2 "${audioPath}" -y`;
        await execPromise(command);

        if (!fs.existsSync(audioPath)) {
            throw new Error('Audio extraction failed (file not created).');
        }

        return { tempDir, audioPath };
    } catch (err) {
        if (fs.existsSync(tempDir)) fs.rmSync(tempDir, { recursive: true, force: true });
        throw err;
    }
}

export type VideoPacingResult = {
    average_shot_length: number;
    cut_cadence: "Frenetic" | "Fast" | "Moderate" | "Slow" | "Hypnotic";
    total_cuts: number;
};

export async function analyzeVideoPacing(videoUrl: string): Promise<VideoPacingResult | null> {
    let resolvedFfprobePath = ffmpegPath ? path.join(path.dirname(ffmpegPath), 'ffprobe') : 'ffprobe';
    if (!fs.existsSync(resolvedFfprobePath)) {
        const brewFfprobe = '/opt/homebrew/bin/ffprobe';
        if (fs.existsSync(brewFfprobe)) resolvedFfprobePath = brewFfprobe;
    }

    if (!resolvedFfprobePath) {
        console.warn('[Video/Pacing] ffprobe binary not available.');
        return null;
    }

    try {
        console.log(`[Video/Pacing] Analyzing clip cadence...`);
        // Use ffprobe to detect scene changes (> 30% difference)
        const command = `"${resolvedFfprobePath}" -show_frames -of compact=p=0 -f lavfi "movie='${videoUrl}',select=gt(scene\\,0.3)" -v error | grep pkt_pts_time`;

        let stdout = '';
        try {
            const { stdout: resOut } = await execPromise(command);
            stdout = resOut;
        } catch (e: any) {
            // grep exits with 1 if no matches found
            if (e.code === 1) {
                stdout = '';
            } else {
                throw e;
            }
        }

        const lines = stdout.split('\\n').filter(l => l.includes('pkt_pts_time='));
        const cutTimestamps = lines
            .map(l => {
                const match = l.match(/pkt_pts_time=([0-9.]+)/);
                return match ? parseFloat(match[1]) : null;
            })
            .filter((t): t is number => t !== null);

        let durationSeconds = 10;
        try {
            const probeCmd = `"${resolvedFfprobePath}" -v error -show_entries format=duration -of default=noprint_wrappers=1:nokey=1 "${videoUrl}"`;
            const { stdout: durOut } = await execPromise(probeCmd);
            const parsedDur = parseFloat(durOut.trim());
            if (!isNaN(parsedDur)) durationSeconds = parsedDur;
        } catch (err) {
            console.warn('[Video/Pacing] Duration probe failed, using fallback.');
        }

        const totalCuts = cutTimestamps.length;
        const totalShots = totalCuts + 1;
        const asl = durationSeconds / totalShots;

        let cadence: VideoPacingResult["cut_cadence"] = "Moderate";
        if (asl < 1.0) cadence = "Frenetic";
        else if (asl < 2.5) cadence = "Fast";
        else if (asl <= 4.0) cadence = "Moderate";
        else if (asl <= 7.0) cadence = "Slow";
        else cadence = "Hypnotic";

        console.log(`[Video/Pacing] Total Cuts: ${totalCuts}, ASL: ${asl.toFixed(2)}s (${cadence})`);

        return {
            average_shot_length: parseFloat(asl.toFixed(2)),
            cut_cadence: cadence,
            total_cuts: totalCuts
        };
    } catch (err: any) {
        console.warn(`[Video/Pacing] Pacing analysis failed:`, err.message);
        return null;
    }
}
