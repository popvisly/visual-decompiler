import play from 'play-dl';
import { create } from 'youtube-dl-exec';
import { URL } from 'url';
import path from 'path';
import fs from 'fs';

// v12: Use the bundled Linux binary on Vercel
const binaryPath = path.join(process.cwd(), 'src/lib/bin/yt-dlp');
const ytdl = create(fs.existsSync(binaryPath) ? binaryPath : 'yt-dlp');

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

// v13: Helper to convert key=val string to Netscape cookie format for yt-dlp
function convertToNetscape(cookieStr: string): string {
    const lines = ['# Netscape HTTP Cookie File', '# http://curl.haxx.se/rfc/cookie_spec.html', '# This is a generated file! Do not edit.', ''];
    const parts = cookieStr.split(';').map(p => p.trim()).filter(p => p.includes('='));

    for (const part of parts) {
        const eqIndex = part.indexOf('=');
        const name = part.substring(0, eqIndex);
        const value = part.substring(eqIndex + 1);
        // domain | flag | path | secure | expiration | name | value
        lines.push(`.youtube.com\tTRUE\t/\tTRUE\t0\t${name}\t${value}`);
    }
    return lines.join('\n');
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

    // v13 Fix: Force-clean the cookie string
    if (cookie) {
        if (cookie.toLowerCase().startsWith('cookie:')) {
            cookie = cookie.substring(7).trim();
        }
        cookie = cookie.replace(/[^\x20-\x7E]/g, '').trim();
    }

    const cookieLength = cookie?.length || 0;
    const poToken = process.env.YOUTUBE_PO_TOKEN;
    const visitorData = process.env.YOUTUBE_VISITOR_DATA;

    try {
        console.log(`[YouTube v14] Attempting bundled yt-dlp with PO_TOKEN & VisitorData (Length: ${cookieLength})`);

        // v13: Write cookie to a temp file for yt-dlp (more robust than header)
        const cookieFile = path.join('/tmp', `youtube-cookies-${Date.now()}.txt`);
        if (cookie) {
            fs.writeFileSync(cookieFile, convertToNetscape(cookie));
        }

        const ua = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36';

        const info: any = await ytdl(url, {
            dumpSingleJson: true,
            noCheckCertificates: true,
            noWarnings: true,
            preferFreeFormats: true,
            youtubeSkipDashManifest: true,
            referer: 'https://www.google.com/',
            cookies: cookie ? cookieFile : undefined,
            // v14: Bypass tokens
            extractorArgs: poToken ? `youtube:player-client=web,android;po_token=web+${poToken}` : undefined,
            visitorData: visitorData || undefined,
            // v13/v14: Aggressive bypass flags
            forceIpv4: true,
            geoBypass: true,
            addHeader: [
                'Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7',
                'Accept-Language: en-US,en;q=0.9',
                'Sec-Fetch-Mode: navigate',
                'Sec-Fetch-Site: none',
                'Sec-Fetch-User: ?1'
            ],
            userAgent: ua,
            format: 'best[ext=mp4]/best'
        } as any);

        // Cleanup temp file
        if (fs.existsSync(cookieFile)) fs.unlinkSync(cookieFile);

        if (info && info.url) {
            console.log(`[YouTube v14] Success via bundled yt-dlp!`);
            return {
                streamUrl: info.url,
                title: info.title || 'YouTube Video',
                duration: info.duration || 0,
                thumbnail: info.thumbnail || null
            };
        }

        throw new Error('yt-dlp returned no stream URL');

    } catch (ytdlError: any) {
        console.error('[YouTube v14] yt-dlp error:', ytdlError.message || ytdlError);

        try {
            console.log('[YouTube v14] Falling back to play-dl...');
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

            console.log(`[YouTube v14] play-dl Success! (Format: ${bestFormat.itag})`);

            return {
                streamUrl: bestFormat.url,
                title: info.video_details.title || 'YouTube Video',
                duration: info.video_details.durationInSec || 0,
                thumbnail: info.video_details.thumbnails?.[0]?.url || null
            };
        } catch (error: any) {
            console.error('[YouTube Extraction Error]', error);
            throw new Error(`[v14] Final Extraction Failure. Vercel IP block remains even with PO_TOKEN. Error: ${error.message}`);
        }
    }
}
