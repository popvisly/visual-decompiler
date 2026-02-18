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
            const command = `ffmpeg -ss ${timestampSeconds} -i "${videoUrl}" -frames:v 1 -q:v 2 "${outputPath}" -y`;

            await execPromise(command);

            if (fs.existsSync(outputPath)) {
                results.push({
                    t_ms: req.t_ms,
                    label: req.label,
                    path: outputPath
                });
            }
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
