import { NextResponse } from 'next/server';
import { decompileAd, VisionInput } from '@/lib/vision';
import { AdDigestSchema } from '@/types/digest';
import { supabaseAdmin } from '@/lib/supabase';
import { extractKeyframes, cleanupFrames } from '@/lib/video';
import fs from 'fs';

async function getMediaInfo(mediaUrl: string): Promise<{ ok: boolean; reason?: string; type: 'image' | 'video' | null; contentType?: string | null }> {
    if (!/^https?:\/\//i.test(mediaUrl)) {
        return { ok: false, reason: 'Please paste a full http(s) URL.', type: null };
    }

    try {
        const controller = new AbortController();
        const timeout = setTimeout(() => controller.abort(), 6000);
        const res = await fetch(mediaUrl, { method: 'HEAD', redirect: 'follow', signal: controller.signal });
        clearTimeout(timeout);

        const ct = res.headers.get('content-type');
        if (!ct) return { ok: true, type: null, contentType: null };

        if (ct.startsWith('image/')) return { ok: true, type: 'image', contentType: ct };
        if (ct.startsWith('video/') || ct.includes('mp4') || ct.includes('mpeg')) return { ok: true, type: 'video', contentType: ct };

        return { ok: true, type: null, contentType: ct };
    } catch {
        return { ok: true, type: null, contentType: null };
    }
}

export async function POST(req: Request) {
    let tempDir: string | null = null;
    try {
        const { mediaUrl } = await req.json();

        if (!mediaUrl) {
            return NextResponse.json({ error: 'mediaUrl is required' }, { status: 400 });
        }

        // 0. Detect Media Type
        const info = await getMediaInfo(mediaUrl);
        if (!info.ok) {
            return NextResponse.json({ error: info.reason }, { status: 400 });
        }

        const promptVersion = 'V1'; // Ideally get this from artifacts name or config

        // 1. Prepare Vision Inputs
        let visionInputs: VisionInput[] = [];
        let keyframeMeta: any[] = [];

        if (info.type === 'video') {
            // Extract 3 keyframes for MVP: 10%, 50%, 90%
            // In a real app we'd get duration first, for MVP we'll just try [1s, 5s, 10s] or similar
            // or better: use ffmpeg to get duration first.
            const extraction = await extractKeyframes(mediaUrl, [
                { t_ms: 1000, label: 'start' },
                { t_ms: 5000, label: 'mid' },
                { t_ms: 10000, label: 'end' }
            ]);
            tempDir = extraction.tempDir;

            for (const result of extraction.results) {
                const base64 = fs.readFileSync(result.path, { encoding: 'base64' });
                visionInputs.push({
                    type: 'base64',
                    data: base64,
                    mimeType: 'image/jpeg'
                });
                keyframeMeta.push({
                    t_ms: result.t_ms,
                    label: result.label,
                    image_url: null, // We aren't hosting these yet in MVP
                    notes: null
                });
            }
        } else {
            // Direct image
            visionInputs.push({ type: 'url', url: mediaUrl });
        }

        if (visionInputs.length === 0) {
            return NextResponse.json({ error: 'Could not process media as image or video' }, { status: 400 });
        }

        // 2. Call the Black Box
        const rawDigest = await decompileAd(visionInputs);

        // 3. Enrich with metadata if video
        if (info.type === 'video' && rawDigest.extraction) {
            rawDigest.extraction.keyframes = keyframeMeta;
        }

        // 4. Validate
        const validation = AdDigestSchema.safeParse(rawDigest);
        const status = validation.success ? 'processed' : 'needs_review';

        // 5. Insert into Supabase
        const { data, error } = await supabaseAdmin
            .from('ad_digests')
            .insert({
                media_url: mediaUrl,
                status: status,
                digest: rawDigest,
                model: 'gpt-4o',
                prompt_version: promptVersion,
                media_kind: info.type || 'image',
                media_type: info.contentType
            })
            .select()
            .single();

        if (error) {
            if (error.code === '23505') {
                return NextResponse.json({ error: 'This ad has already been decompiled.' }, { status: 409 });
            }
            console.error('Supabase error:', error);
            return NextResponse.json({ error: 'Failed to store digest' }, { status: 500 });
        }

        return NextResponse.json({
            success: validation.success,
            id: data.id,
            digest: validation.success ? validation.data : rawDigest,
            validationErrors: validation.success ? null : validation.error.format()
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
