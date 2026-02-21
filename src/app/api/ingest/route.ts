import { NextResponse } from 'next/server';
import { decompileAd, VisionInput } from '@/lib/vision';
import { AdDigestSchema } from '@/types/digest';
import { supabaseAdmin } from '@/lib/supabase';
import { extractKeyframes, cleanupFrames } from '@/lib/video';
import fs from 'fs';

async function getMediaInfo(mediaUrl: string): Promise<{ ok: boolean; reason?: string; type: 'image' | 'video' | null; contentType?: string | null; sizeMB?: number }> {
    if (!/^https?:\/\//i.test(mediaUrl)) {
        return { ok: false, reason: 'Please paste a full http(s) URL.', type: null };
    }

    try {
        console.log(`[Ingest] Detecting media type for: ${mediaUrl}`);
        const controller = new AbortController();
        const timeout = setTimeout(() => controller.abort(), 8000);

        // Use GET with Range to get headers and a tiny chunk, follow redirects
        const res = await fetch(mediaUrl, {
            method: 'GET',
            redirect: 'follow', // CRITICAL for Unsplash/Redirected URLs
            signal: controller.signal,
            headers: {
                'Range': 'bytes=0-1024',
                'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
            }
        });
        clearTimeout(timeout);

        const contentType = res.headers.get('content-type');
        const contentLength = res.headers.get('content-length');
        const sizeMB = contentLength ? parseInt(contentLength) / (1024 * 1024) : undefined;
        const finalUrl = res.url || mediaUrl;

        console.log(`[Ingest] HTTP Check: status=${res.status}, type=${contentType}, url=${finalUrl}`);

        if (contentType?.startsWith('image/')) return { ok: true, type: 'image', contentType, sizeMB };
        if (contentType?.startsWith('video/') || contentType?.includes('mp4') || contentType?.includes('mpeg')) {
            return { ok: true, type: 'video', contentType, sizeMB };
        }

        // Fallback to extension check on the FINAL URL (after redirects)
        const urlWithoutQuery = finalUrl.split('?')[0];
        const ext = urlWithoutQuery.split('.').pop()?.toLowerCase() || '';

        if (['jpg', 'jpeg', 'png', 'webp', 'gif'].includes(ext)) return { ok: true, type: 'image', contentType: contentType || `image/${ext}`, sizeMB };
        if (['mp4', 'mov', 'webm'].includes(ext)) return { ok: true, type: 'video', contentType: contentType || `video/${ext}`, sizeMB };

        return { ok: true, type: null, contentType, sizeMB };
    } catch (err: any) {
        console.warn(`[Ingest] Connection failed during detection: ${err.message}. Falling back to extension.`);
        // Fallback to extension even on network failure
        const urlWithoutQuery = mediaUrl.split('?')[0];
        const ext = urlWithoutQuery.split('.').pop()?.toLowerCase() || '';
        if (['jpg', 'jpeg', 'png', 'webp', 'gif'].includes(ext)) return { ok: true, type: 'image', contentType: `image/${ext}` };
        if (['mp4', 'mov', 'webm'].includes(ext)) return { ok: true, type: 'video', contentType: `video/${ext}` };
        return { ok: true, type: null, contentType: null };
    }
}

// Basic in-memory rate limiting for MVP
const RATE_LIMIT_WINDOW = 60 * 60 * 1000; // 1 hour
const MAX_REQUESTS_PER_IP = 50;
const ipCache = new Map<string, { count: number, resetAt: number }>();

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
        const { mediaUrl } = await req.json();

        if (!mediaUrl) {
            return NextResponse.json({ error: 'mediaUrl is required' }, { status: 400 });
        }

        // ── Viewer Gate ──
        const cookieHeader = req.headers.get('cookie') || '';
        const viewerIdMatch = cookieHeader.match(/vd_viewer_id=([^;]+)/);
        const viewerId = viewerIdMatch ? viewerIdMatch[1] : null;

        let accessLevel: 'full' | 'limited' = 'full';

        if (viewerId) {
            // Upsert viewer_usage row
            const { data: usage } = await supabaseAdmin
                .from('viewer_usage')
                .upsert({ viewer_id: viewerId }, { onConflict: 'viewer_id' })
                .select()
                .single();

            if (usage) {
                if (usage.pro || usage.free_analyses_used < 1) {
                    accessLevel = 'full';
                } else {
                    accessLevel = 'limited';
                }
            }
        }

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
                viewer_id: viewerId,
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

        // Increment free usage counter (only for non-pro, full-access jobs)
        if (viewerId && accessLevel === 'full') {
            await supabaseAdmin
                .from('viewer_usage')
                .update({
                    free_analyses_used: ((await supabaseAdmin.from('viewer_usage').select('free_analyses_used').eq('viewer_id', viewerId).single()).data?.free_analyses_used ?? 0) + 1,
                    updated_at: new Date().toISOString(),
                })
                .eq('viewer_id', viewerId);
        }

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
