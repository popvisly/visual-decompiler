import play from 'play-dl';

async function test() {
    const url = 'https://www.youtube.com/watch?v=aqz-KE-bpKQ';
    console.log(`Testing play-dl stream with: ${url}`);
    try {
        // play-dl.stream() is usually for audio, but we can try to find the video formats
        const info = await play.video_info(url);

        // itag 18 is 360p merged mp4
        // itag 22 is 720p merged mp4 (if available)
        const mergedFormat = info.format.find(f => f.itag === 22 || f.itag === 18);

        if (mergedFormat) {
            console.log(`Found merged format (itag ${mergedFormat.itag}):`, mergedFormat.url.substring(0, 100) + '...');
        } else {
            console.log('No itag 18/22 found, listing all formats with URLs:');
            info.format.filter(f => f.url).forEach(f => {
                console.log(`- itag: ${f.itag}, mime: ${f.mimeType}, quality: ${f.qualityLabel}`);
            });
        }
    } catch (e) {
        console.error('play-dl failed:', e);
    }
}

test().catch(console.error);
