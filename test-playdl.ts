import play from 'play-dl';

async function run() {
    try {
        console.log("Fetching youtube info with play-dl...");
        const url = 'https://www.youtube.com/watch?v=aqz-KE-bpKQ'; // Big Buck Bunny

        const info = await play.video_info(url);
        console.log("Got info:", info.video_details.title);

        const stream = await play.stream_from_info(info);
        // @ts-ignore
        console.log("Got stream:", stream.url ? "YES (url)" : "YES (no url)");
        // @ts-ignore
        if (stream.url) {
            // @ts-ignore
            console.log("URL:", stream.url.substring(0, 80) + "...");
        }
    } catch (e) {
        console.error(e);
    }
}
run();
