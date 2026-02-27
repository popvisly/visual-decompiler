import ytdl from '@distube/ytdl-core';

async function run() {
    try {
        console.log("Fetching youtube info with @distube/ytdl-core...");
        const url = 'https://www.youtube.com/watch?v=aqz-KE-bpKQ'; // Big Buck Bunny

        const info = await ytdl.getInfo(url);
        console.log("Title:", info.videoDetails.title);

        // Find the best merged MP4 format that does NOT require signature deciphering 
        // YouTube often leaves 360p or 720p standard formats without heavy cryptography
        let bestFormat = info.formats.find(f =>
            f.hasVideo &&
            f.hasAudio &&
            f.container === 'mp4' &&
            !f.isHLS &&
            !f.isDashMPD &&
            !f.url.includes('signature')
        );

        if (!bestFormat) {
            bestFormat = ytdl.chooseFormat(info.formats, { quality: 'highest', filter: 'videoandaudio' });
        }

        console.log("Video URL:", bestFormat?.url ? bestFormat.url.substring(0, 80) + "..." : "NONE");
    } catch (e) {
        console.error("Error:", e);
    }
}
run();
