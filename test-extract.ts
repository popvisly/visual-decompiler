import fs from 'fs';
import path from 'path';
import os from 'os';
import { extractKeyframes } from './src/lib/video.js';

async function test() {
    const videoUrl = 'https://www.w3schools.com/html/mov_bbb.mp4';
    const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), 'vd-worker-'));
    const mediaPath = path.join(tempDir, 'source_media');

    console.log('Downloading...');
    const res = await fetch(videoUrl);
    const buffer = await res.arrayBuffer();
    fs.writeFileSync(mediaPath, Buffer.from(buffer));
    console.log(`Downloaded ${buffer.byteLength} bytes`);

    console.log('Extracting keyframes from local path: ' + mediaPath);
    try {
        const extraction = await extractKeyframes(mediaPath, [
            { t_ms: 1000, label: 'start' }
        ]);
        console.log('Success:', extraction.results);
    } catch (e) {
        console.error('Extraction Failed:', e);
    }
}

test().catch(console.error);
