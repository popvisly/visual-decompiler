import play from 'play-dl';
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

    let cookie = process.env.YOUTUBE_COOKIE;

    // v8 Fix: Many users copy the "cookie: " prefix by accident. Let's strip it.
    if (cookie && cookie.toLowerCase().startsWith('cookie:')) {
        cookie = cookie.substring(7).trim();
    }

    try {
        console.log(`[YouTube v8] Attempting yt-dlp extraction (Cookie length: ${cookie?.length || 0})`);

        // v8 Note: yt-dlp often fails on Vercel due to missing binary in serverless context.
        const info: any = await youtubedl(url, {
            dumpSingleJson: true,
            noCheckCertificates: true,
            noWarnings: true,
            preferFreeFormats: true,
            youtubeSkipDashManifest: true,
            referer: 'https://www.google.com/',
            addHeader: cookie ? [`Cookie: ${cookie.trim()}`] : undefined,
            userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36',
            format: 'best[ext=mp4]/best'
        });

        if (info && info.url) {
            console.log(`[YouTube v8] Success via yt-dlp!`);
            return {
                streamUrl: info.url,
                title: info.title || 'YouTube Video',
                duration: info.duration || 0,
                thumbnail: info.thumbnail || null
            };
        }

        throw new Error('yt-dlp returned no stream URL');

    } catch (ytdlError: any) {
        if (ytdlError.code === 'ENOENT') {
            console.warn('[YouTube v8] yt-dlp binary not found (ENOENT). Falling back to play-dl...');
        } else {
            console.error('[YouTube v8] yt-dlp error:', ytdlError.message || ytdlError);
        }

        try {
            const ua = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36';
            (play as any).user_agent = ua;

            if (cookie) {
                await play.setToken({
                    youtube: {
                        cookie: cookie.trim()
                    }
                });
            }

            const info = await play.video_info(url);
            const bestFormat = info.format.find(f => f.itag === 22) || info.format.find(f => f.itag === 18) || info.format[0];

            if (!bestFormat?.url) {
                throw new Error('No playable formats found in fallback');
            }

            console.log(`[YouTube v8] play-dl Success! Title: ${info.video_details.title}`);

            return {
                streamUrl: bestFormat.url,
                title: info.video_details.title || 'YouTube Video',
                duration: info.video_details.durationInSec || 0,
                thumbnail: info.video_details.thumbnails?.[0]?.url || null
            };
        } catch (error: any) {
            console.error('[YouTube Extraction Error]', error);
            throw new Error(`[v8] Extraction Failed. Your cookie might be truncated or "Cookie:" was included. (Length: ${cookie?.length || 0}). Error: ${error.message}`);
        }
    }
}
