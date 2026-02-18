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

    try {
        for (const req of requests) {
            const fileName = `frame_${req.t_ms}.jpg`;
            const outputPath = path.join(tempDir, fileName);
            const timestampSeconds = req.t_ms / 1000;

            if (!ffmpegPath) {
                throw new Error('ffmpeg binary not available in this environment.');
            }

            // ffmpeg parameters for remote resilient extraction
            const command = `"${ffmpegPath}" -hide_banner -loglevel error -rw_timeout 15000000 -probesize 20000000 -analyzeduration 20000000 -ss ${timestampSeconds} -i "${videoUrl}" -frames:v 1 -q:v 2 "${outputPath}" -y`;

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
                // Re-throw with more detail so it lands in the digest
                throw new Error(`ffmpeg failed: ${cmdErr.message}. Stderr: ${cmdErr.stderr || 'none'}`);
            }
        }

        if (results.length === 0) {
            throw new Error('Failed to extract keyframes (no frames produced). Verify the video URL is reachable and indexable.');
        }

        return {
            tempDir,
            results
        };
    } catch (err) {
        // Cleanup on failure
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
