import youtubedl from 'youtube-dl-exec';

async function run() {
    try {
        console.log("Fetching youtube info with youtube-dl-exec...");
        const url = 'https://www.youtube.com/watch?v=aqz-KE-bpKQ'; // Big Buck Bunny

        const output = await youtubedl(url, {
            dumpSingleJson: true,
            noCheckCertificates: true,
            noWarnings: true,
            preferFreeFormats: true,
            addHeader: [
                'referer:youtube.com',
                'user-agent:Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
            ]
        });

        // @ts-ignore
        console.log("Title:", output.title);
        // @ts-ignore
        const format = output.formats.find(f => f.ext === 'mp4' && f.vcodec !== 'none' && f.acodec !== 'none') || output.formats.find(f => f.ext === 'mp4');
        console.log("Video URL:", format?.url ? format.url.substring(0, 80) + "..." : "NONE");
    } catch (e) {
        console.error("Error:", e);
    }
}
run();
