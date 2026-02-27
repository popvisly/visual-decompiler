import ytdl from 'ytdl-core';

async function run() {
    try {
        console.log("Fetching youtube info with ytdl-core...");
        const url = 'https://www.youtube.com/watch?v=aqz-KE-bpKQ'; // Big Buck Bunny

        const info = await ytdl.getInfo(url);
        console.log("Title:", info.videoDetails.title);

        const format = ytdl.chooseFormat(info.formats, { quality: 'highestvideo', filter: 'videoandaudio' })
            || ytdl.chooseFormat(info.formats, { quality: 'highestvideo' });

        console.log("Video URL:", format?.url ? format.url.substring(0, 80) + "..." : "NONE");
    } catch (e) {
        console.error("Error:", e);
    }
}
run();
