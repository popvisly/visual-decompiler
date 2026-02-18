import { exec } from 'child_process';
import util from 'util';
import path from 'path';
import fs from 'fs';
import os from 'os';

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

            // ffmpeg -ss [seconds] -i [url] -frames:v 1 [output]
            // -ss before -i is faster for remote URLs as it seeks before downloading much
            const command = [
                'ffmpeg',
                '-hide_banner',
                '-loglevel', 'error',
                // help for remote URLs / slow headers
                '-rw_timeout', '15000000',
                '-probesize', '20000000',
                '-analyzeduration', '20000000',
                // seek early (faster)
                '-ss', String(timestampSeconds),
                '-i', JSON.stringify(videoUrl),
                '-frames:v', '1',
                '-q:v', '2',
                JSON.stringify(outputPath),
                '-y',
            ].join(' ');

            try {
                await execPromise(command);
                if (fs.existsSync(outputPath)) {
                    results.push({
                        t_ms: req.t_ms,
                        label: req.label,
                        path: outputPath,
                    });
                }
            } catch {
                // If a single keyframe fails (short clip / remote issues), continue.
                // We'll fail the whole extraction only if we end up with zero frames.
            }
        }

        if (results.length === 0) {
            throw new Error('Failed to extract keyframes (no frames produced). Try a different video URL.');
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
