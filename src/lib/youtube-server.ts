import youtubedl from 'youtube-dl-exec';
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
        // Vercel friendly execution using yt-dlp binary safely bundled
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

        // Try to find the highest-quality format that contains BOTH video and audio
        // and is specifically an MP4 container (which ffmpeg and browsers prefer).
        const formats = (output as any).formats || [];

        // yt-dlp formats:
        // ext: mp4/webm
        // vcodec: none (audio only)
        // acodec: none (video only)
        let bestFormat = formats.find((f: any) =>
            f.ext === 'mp4' &&
            f.vcodec !== 'none' &&
            f.acodec !== 'none'
        );

        // Fallback to highest quality video-only stream if merged audio/video isn't available
        // Extractor pipeline will still work visually
        if (!bestFormat) {
            const videoFormats = formats
                .filter((f: any) => f.vcodec !== 'none' && f.ext === 'mp4')
                .sort((a: any, b: any) => (b.height || 0) - (a.height || 0));

            bestFormat = videoFormats[0];
        }

        if (!bestFormat?.url) {
            throw new Error('Could not resolve a playable stream URL from YouTube');
        }

        return {
            streamUrl: bestFormat.url,
            title: (output as any).title || 'YouTube Video',
            duration: (output as any).duration, // in seconds
            thumbnail: (output as any).thumbnail
        };
    } catch (error: any) {
        console.error('[YouTube Extraction Error]', error);
        throw new Error(`Failed to extract YouTube metadata: ${error.message}`);
    }
}
