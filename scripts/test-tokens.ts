import { extractYouTubeMetadata } from '../src/lib/youtube-server';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

async function test() {
    const testUrl = 'https://www.youtube.com/watch?v=aqz-KE-BPKQ'; // A standard test video
    console.log(`Testing extraction for: ${testUrl}`);
    console.log(`PO_TOKEN length: ${process.env.YOUTUBE_PO_TOKEN?.length || 0}`);
    console.log(`VISITOR_DATA length: ${process.env.YOUTUBE_VISITOR_DATA?.length || 0}`);

    try {
        const metadata = await extractYouTubeMetadata(testUrl);
        console.log('SUCCESS!');
        console.log('Title:', metadata.title);
        console.log('Stream URL starting with:', metadata.streamUrl.substring(0, 50) + '...');
    } catch (error: any) {
        console.error('FAILED:', error.message);
    }
}

test();
