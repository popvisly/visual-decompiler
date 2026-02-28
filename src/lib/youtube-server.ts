import play from 'play-dl';
import { URL } from 'url';

/**
 * Checks if a URL belongs to YouTube or its shorteners
 */
export function isYouTubeUrl(urlStr: string): boolean {
    if (!urlStr) return false;
    try {
        const url = new URL(urlStr);
        const hostname = url.hostname.replace('www.', '');
        return ['youtube.com', 'youtu.be', 'youtube-nocookie.com'].includes(hostname);
    } catch {
        return false;
    }
}

/**
 * Extracts a YouTube Video ID from standard or short URLs
 */
export function extractYouTubeId(urlStr: string): string | null {
    if (!urlStr) return null;
    try {
        const url = new URL(urlStr);
        const hostname = url.hostname.replace('www.', '');

        if (hostname === 'youtu.be') {
            return url.pathname.slice(1);
        }

        if (hostname === 'youtube.com' || hostname === 'youtube-nocookie.com') {
            if (url.pathname === '/watch') {
                return url.searchParams.get('v');
            }
            if (url.pathname.startsWith('/embed/')) {
                return url.pathname.split('/')[2];
            }
            if (url.pathname.startsWith('/v/')) {
                return url.pathname.split('/')[2];
            }
            if (url.pathname.startsWith('/shorts/')) {
                return url.pathname.split('/')[2];
            }
        }
        return null;
    } catch {
        return null;
    }
}

/**
 * Reverses a YouTube URL into a direct, playable MP4 stream URL.
 * Also returns metadata like title and duration.
 */
export async function extractYouTubeMetadata(url: string) {
    if (!isYouTubeUrl(url)) {
        throw new Error('Not a valid YouTube URL');
    }

    try {
        // Attempt to bypass by setting a more "human" user-agent
        // This is a global setting in play-dl for the process
        (play as any).user_agent = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36';

        const info = await play.video_info(url);

        // Find best merged MP4 (720p = itag 22, 360p = itag 18)
        const bestFormat = info.format.find(f => f.itag === 22) || info.format.find(f => f.itag === 18);

        if (!bestFormat?.url) {
            throw new Error('No playable itag 18/22 found (v2)');
        }

        const durationSecs = info.video_details.durationInSec || 0;
        const title = info.video_details.title || 'YouTube Video';
        const thumbnails = info.video_details.thumbnails || [];
        const bestThumb = thumbnails.length > 0 ? thumbnails[thumbnails.length - 1].url : null;

        return {
            streamUrl: bestFormat.url,
            title: title,
            duration: durationSecs, // in seconds
            thumbnail: bestThumb
        };
    } catch (error: any) {
        console.error('[YouTube Extraction Error]', error);
        // Versioning the error to be 100% sure we are seeing the latest code
        throw new Error(`[v2] YouTube Extraction Failed: ${error.message}`);
    }
}
