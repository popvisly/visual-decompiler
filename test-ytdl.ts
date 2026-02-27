import ytdl from '@distube/ytdl-core';
import fs from 'fs';

async function run() {
    try {
        console.log("Fetching youtube info...");
        const url = 'https://www.youtube.com/watch?v=aqz-KE-bpKQ'; // Big Buck Bunny
        const info = await ytdl.getInfo(url);
        const format = ytdl.chooseFormat(info.formats, { quality: 'highest', filter: 'videoandaudio' });

        console.log("Found format:", format?.url ? "YES" : "NO");
        if (format) {
            console.log("MimeType:", format.mimeType);
            console.log("Has Video:", format.hasVideo);
        }
    } catch (e) {
        console.error(e);
    }
}
run();
