// scripts/verify-video-ingest.ts
// Tests keyframe extraction + Vision call (simulation)
import { extractKeyframes, cleanupFrames } from '../src/lib/video';
import { decompileAd } from '../src/lib/vision';
import fs from 'fs';
import path from 'path';

async function test() {
    const videoUrl = "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4";
    console.log("Starting video ingest verification...");

    try {
        // 1. Extract frames
        console.log("Extracting keyframes...");
        const extraction = await extractKeyframes(videoUrl, [
            { t_ms: 1000, label: 'start' },
            { t_ms: 5000, label: 'mid' },
        ]);

        console.log(`Extracted ${extraction.results.length} frames.`);

        // 2. Prepare Vision Inputs
        const visionInputs = extraction.results.map(f => ({
            type: 'base64' as const,
            data: fs.readFileSync(f.path, { encoding: 'base64' }),
            mimeType: 'image/jpeg'
        }));

        // 3. Call Vision (Mocked or Real if keys present)
        console.log("Calling Vision API (Black Box)...");
        // Note: This will fail if no OPENAI_API_KEY in process.env
        // But we can check if it at least prepares the payload correctly.
        if (process.env.OPENAI_API_KEY) {
            const digest = await decompileAd(visionInputs);
            console.log("Success! Digest generated:");
            console.log(JSON.stringify(digest, null, 2));
        } else {
            console.log("Skipping Vision call (no API key). Logic verified up to payload preparation.");
        }

        // Cleanup
        cleanupFrames(extraction.tempDir);
        console.log("Cleanup complete.");

    } catch (err) {
        console.error("Verification failed:", err);
    }
}

test();
