import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { decompileAd, VisionInput } from '@/lib/vision';
import { AdDigestSchema } from '@/types/digest';
import { supabaseAdmin } from '@/lib/supabase';
import { extractKeyframes, cleanupFrames } from '@/lib/video';
import fs from 'fs';

async function getMediaInfo(mediaUrl: string): Promise<{ ok: boolean; reason?: string; type: 'image' | 'video' | null; contentType?: string | null; sizeMB?: number }> {
    if (!/^https?:\/\//i.test(mediaUrl)) {
        return { ok: false, reason: 'Please paste a full http(s) URL.', type: null };
    }

    // Heuristic: YouTube URLs (bypass network fetch totally)
    if (mediaUrl.includes('youtube.com/') || mediaUrl.includes('youtu.be/')) {
        console.log(`[Ingest] YouTube heuristic triggered (bypassing fetch)`);
        return { ok: true, type: 'video', contentType: 'video/mp4' };
    }

    const tryDetect = async (url: string, useRange: boolean) => {
        const controller = new AbortController();
        const timeout = setTimeout(() => controller.abort(), 8000);
        try {
            const headers: Record<string, string> = {
                'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
                'Accept': 'image/*,video/*,application/octet-stream'
            };
            if (useRange) headers['Range'] = 'bytes=0-1024';

            const res = await fetch(url, {
                method: 'GET',
                redirect: 'follow',
                signal: controller.signal,
                headers
            });
            clearTimeout(timeout);
            return res;
        } catch (e) {
            clearTimeout(timeout);
            throw e;
        }
    };

    try {
        console.log(`[Ingest] Detecting media type for: ${mediaUrl}`);
        let res = await tryDetect(mediaUrl, true);

        let contentTypeHeader = res.headers.get('content-type')?.toLowerCase() || '';
        // Handle comma-separated content types (e.g. "text/html,text/html")
        let types = contentTypeHeader.split(',').map(t => t.trim());

        // If we get text/html, some CDNs might be rejecting the Range request for dynamic images.
        // Retry with a standard HEAD request.
        if (types.some(t => t.includes('text/html'))) {
            console.log(`[Ingest] Got text/html with Range request. Retrying with HEAD...`);
            const headRes = await fetch(mediaUrl, {
                method: 'HEAD',
                redirect: 'follow',
                headers: { 'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36' }
            });
            if (headRes.ok) {
                res = headRes;
                contentTypeHeader = res.headers.get('content-type')?.toLowerCase() || '';
                types = contentTypeHeader.split(',').map(t => t.trim());
            }
        }

        const contentLength = res.headers.get('content-length');
        const sizeMB = contentLength ? parseInt(contentLength) / (1024 * 1024) : undefined;
        const finalUrl = res.url || mediaUrl;

        console.log(`[Ingest] HTTP Check: status=${res.status}, types=${types.join('|')}, url=${finalUrl}`);

        if (types.some(t => t.startsWith('image/'))) return { ok: true, type: 'image', contentType: types.find(t => t.startsWith('image/')) || 'image/jpeg', sizeMB };
        if (types.some(t => t.startsWith('video/') || t.includes('mp4') || t.includes('mpeg'))) {
            return { ok: true, type: 'video', contentType: types.find(t => t.startsWith('video/')) || 'video/mp4', sizeMB };
        }

        // Heuristic: If it's Unsplash, it's almost certainly an image even if detection failed
        // Check both finalUrl and the original mediaUrl
        const isUnsplash = [finalUrl, mediaUrl].some(u => u.includes('unsplash.com/photo-') || u.includes('images.unsplash.com'));
        if (isUnsplash) {
            console.log(`[Ingest] Unsplash heuristic triggered`);
            return { ok: true, type: 'image', contentType: types[0] || 'image/jpeg', sizeMB };
        }

        // Fallback to extension check on both URLs
        const checkExt = (url: string) => {
            try {
                const urlPath = new URL(url).pathname;
                const ext = urlPath.split('.').pop()?.toLowerCase() || '';
                if (['jpg', 'jpeg', 'png', 'webp', 'gif'].includes(ext)) return { type: 'image', ext };
                if (['mp4', 'mov', 'webm'].includes(ext)) return { type: 'video', ext };
            } catch (e) { /* ignore */ }
            return null;
        };

        const extResult = checkExt(finalUrl) || checkExt(mediaUrl);
        if (extResult) {
            return { ok: true, type: extResult.type as any, contentType: types[0] || `${extResult.type}/${extResult.ext}`, sizeMB };
        }

        return { ok: true, type: null, contentType: contentTypeHeader, sizeMB };
    } catch (err: any) {
        console.warn(`[Ingest] Connection failed during detection: ${err.message}. Falling back to extension.`);
        try {
            const urlPath = new URL(mediaUrl).pathname;
            const ext = urlPath.split('.').pop()?.toLowerCase() || '';
            if (['jpg', 'jpeg', 'png', 'webp', 'gif'].includes(ext)) return { ok: true, type: 'image', contentType: `image/${ext}` };
            if (['mp4', 'mov', 'webm'].includes(ext)) return { ok: true, type: 'video', contentType: `video/${ext}` };
        } catch (urlErr) { /* ignore */ }
        return { ok: true, type: null, contentType: null };
    }
}

// Basic in-memory rate limiting for MVP
const RATE_LIMIT_WINDOW = 60 * 60 * 1000; // 1 hour
const MAX_REQUESTS_PER_IP = 50;
const ipCache = new Map<string, { count: number, resetAt: number }>();

function normalizeUrl(urlStr: string): string {
    try {
        const url = new URL(urlStr);
        // List of tracking parameters to strip
        const toStrip = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content', 'fbclid', 'gclid', '_ga', '_gl'];
        toStrip.forEach(p => url.searchParams.delete(p));
        // Also remove fragments
        url.hash = '';
        return url.toString();
    } catch (e) {
        return urlStr;
    }
}

export async function POST(req: Request) {
    const ip = req.headers.get('x-forwarded-for') || '127.0.0.1';
    const now = Date.now();
    const clientLimit = ipCache.get(ip);

    if (clientLimit && now < clientLimit.resetAt) {
        if (clientLimit.count >= MAX_REQUESTS_PER_IP) {
            return NextResponse.json({ error: 'Rate limit exceeded. Please wait an hour.' }, { status: 429 });
        }
        clientLimit.count++;
    } else {
        ipCache.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW });
    }

    let tempDir: string | null = null;
    try {
        let { mediaUrl } = await req.json();

        if (!mediaUrl) {
            return NextResponse.json({ error: 'mediaUrl is required' }, { status: 400 });
        }

        mediaUrl = normalizeUrl(mediaUrl);

        // ── Auth & Rate Limit Gate ──
        const { userId, orgId } = await auth();

        if (!userId) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        // Upsert user to ensure they exist in our tracking
        const { data: user, error: userErr } = await supabaseAdmin
            .from('users')
            .upsert({ id: userId }, { onConflict: 'id' })
            .select()
            .single();

        if (userErr || !user) {
            console.error('[Ingest] User sync failed:', userErr);
            return NextResponse.json({ error: 'Failed to verify account status' }, { status: 500 });
        }

        const tierLimit = user.tier === 'pro' ? 100 : 5;
        if (user.usage_count >= tierLimit) {
            return NextResponse.json({
                error: 'LIMIT_REACHED',
                message: `You have reached your ${user.tier} plan limit of ${tierLimit} reports per month.`
            }, { status: 429 });
        }

        let accessLevel: 'full' | 'limited' = 'full';

        // 0. Detect Media Type
        const info = await getMediaInfo(mediaUrl);
        if (!info.ok) {
            return NextResponse.json({ error: info.reason }, { status: 400 });
        }

        // Production Guardrail: Max 50MB for videos
        if (info.type === 'video' && info.sizeMB && info.sizeMB > 50) {
            return NextResponse.json({
                error: `Video file too large (${info.sizeMB.toFixed(1)}MB). Please use a file under 50MB for stable extraction.`
            }, { status: 400 });
        }

        const promptVersion = 'V2';

        if (info.type === null) {
            return NextResponse.json({
                error: 'Could not detect media type. Please ensure the URL ends in a common image or video extension.',
                debug: {
                    contentType: info.contentType,
                    detectedType: info.type
                }
            }, { status: 400 });
        }

        // 5. Insert 'queued' record into Supabase
        const { data: job, error: insertError } = await supabaseAdmin
            .from('ad_digests')
            .insert({
                media_url: mediaUrl,
                status: 'queued',
                model: 'gpt-4o',
                prompt_version: promptVersion,
                media_kind: info.type || 'image',
                media_type: info.contentType,
                digest: {}, // Placeholder to satisfy NOT NULL constraint
                user_id: userId,
                org_id: orgId,
                access_level: accessLevel,
            })
            .select()
            .single();

        if (insertError) {
            if (insertError.code === '23505') {
                return NextResponse.json({ error: 'This ad has already been decompiled.' }, { status: 409 });
            }
            console.error('Supabase error:', insertError);
            return NextResponse.json({ error: 'Failed to queue ingestion' }, { status: 500 });
        }

        console.log(`[Ingest] Job Created | id: ${job.id} | status: ${job.status} | timestamp: ${new Date().toISOString()}`);

        // Increment user usage counter
        await supabaseAdmin
            .from('users')
            .update({
                usage_count: user.usage_count + 1,
                updated_at: new Date().toISOString(),
            })
            .eq('id', userId);

        // 6. Return Job ID immediately
        return NextResponse.json({
            success: true,
            job_id: job.id,
            status: 'queued',
            access_level: accessLevel,
            message: 'Ad queued for decompilation.'
        });

    } catch (err: any) {
        console.error('Ingestion error:', err);
        return NextResponse.json({ error: err.message || 'Internal server error' }, { status: 500 });
    } finally {
        if (tempDir) {
            cleanupFrames(tempDir);
        }
    }
}
