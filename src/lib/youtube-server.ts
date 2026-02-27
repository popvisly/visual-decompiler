import ytdl from '@distube/ytdl-core';
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
        const info = await ytdl.getInfo(url);

        // Find the best merged MP4 format that does NOT require signature deciphering 
        let bestFormat = info.formats.find(f =>
            f.hasVideo &&
            f.hasAudio &&
            f.container === 'mp4' &&
            !f.isHLS &&
            !f.isDashMPD &&
            !f.url.includes('signature')
        );

        // Fallback to highest quality regardless of cipher if none found
        if (!bestFormat) {
            bestFormat = ytdl.chooseFormat(info.formats, { quality: 'highest', filter: 'videoandaudio' });
        }

        if (!bestFormat?.url) {
            throw new Error('Could not resolve a playable stream URL from YouTube');
        }

        const durationSecs = parseInt(info.videoDetails.lengthSeconds, 10);
        const title = info.videoDetails.title || 'YouTube Video';
        const thumbnails = info.videoDetails.thumbnails || [];
        const bestThumb = thumbnails.length > 0 ? thumbnails[thumbnails.length - 1].url : null;

        return {
            streamUrl: bestFormat.url,
            title: title,
            duration: durationSecs, // in seconds
            thumbnail: bestThumb
        };
    } catch (error: any) {
        console.error('[YouTube Extraction Error]', error);
        throw new Error(`Failed to extract YouTube metadata: ${error.message}`);
    }
}
