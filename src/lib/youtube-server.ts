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

    // v10 Fix: Force-clean the cookie string
    if (cookie) {
        if (cookie.toLowerCase().startsWith('cookie:')) {
            cookie = cookie.substring(7).trim();
        }
        // Remove any non-printable or weird characters that might have snuck in via paste
        cookie = cookie.replace(/[^\x20-\x7E]/g, '').trim();
    }

    const cookieLength = cookie?.length || 0;
    const cookieStart = cookie?.substring(0, 20) || 'NONE';
    const cookieEnd = cookie?.substring(Math.max(0, cookieLength - 20)) || 'NONE';

    try {
        console.log(`[YouTube v11] Attempting yt-dlp extraction (Length: ${cookieLength}, Start: ${cookieStart}..., End: ...${cookieEnd})`);

        // v11 UA: Exactly matching the user's Chrome 145.0.0.0 session for perfect cookie alignment
        const ua = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36';

        const info: any = await youtubedl(url, {
            dumpSingleJson: true,
            noCheckCertificates: true,
            noWarnings: true,
            preferFreeFormats: true,
            youtubeSkipDashManifest: true,
            referer: 'https://www.google.com/',
            addHeader: cookie ? [
                `Cookie: ${cookie}`,
                'Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7',
                'Accept-Language: en-US,en;q=0.9',
                'Sec-Fetch-Mode: navigate',
                'Sec-Fetch-Site: none',
                'Sec-Fetch-User: ?1'
            ] : undefined,
            userAgent: ua,
            format: 'best[ext=mp4]/best'
        });

        if (info && info.url) {
            console.log(`[YouTube v11] Success via yt-dlp!`);
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
            console.warn('[YouTube v11] yt-dlp binary missing. Falling back to play-dl...');
        } else {
            console.error('[YouTube v11] yt-dlp error:', ytdlError.message || ytdlError);
        }

        try {
            const ua = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36';
            (play as any).user_agent = ua;

            if (cookie) {
                await play.setToken({
                    youtube: {
                        cookie: cookie
                    }
                });
            }

            const info = await play.video_info(url);
            const bestFormat = info.format.find(f => f.itag === 22) || info.format.find(f => f.itag === 18) || info.format[0];

            if (!bestFormat?.url) {
                throw new Error('No playable formats found in fallback');
            }

            console.log(`[YouTube v11] play-dl Success! (Format: ${bestFormat.itag})`);

            return {
                streamUrl: bestFormat.url,
                title: info.video_details.title || 'YouTube Video',
                duration: info.video_details.durationInSec || 0,
                thumbnail: info.video_details.thumbnails?.[0]?.url || null
            };
        } catch (error: any) {
            console.error('[YouTube Extraction Error]', error);
            throw new Error(`[v11] Extraction Failed. Length: ${cookieLength}. Error: ${error.message}`);
        }
    }
}
