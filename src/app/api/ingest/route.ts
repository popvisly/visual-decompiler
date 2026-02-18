import { NextResponse } from 'next/server';
import { decompileAd } from '@/lib/vision';
import { AdDigestSchema } from '@/types/digest';
import { supabaseAdmin } from '@/lib/supabase';

async function assertLikelyImageUrl(mediaUrl: string): Promise<{ ok: boolean; reason?: string; contentType?: string | null }> {
    // Fast, pragmatic check: require http(s)
    if (!/^https?:\/\//i.test(mediaUrl)) {
        return { ok: false, reason: 'Please paste a full http(s) URL to an image.' };
    }

    // Try HEAD to learn content-type (many CDNs support this)
    try {
        const controller = new AbortController();
        const timeout = setTimeout(() => controller.abort(), 6000);
        const res = await fetch(mediaUrl, { method: 'HEAD', redirect: 'follow', signal: controller.signal });
        clearTimeout(timeout);

        const ct = res.headers.get('content-type');

        // If blocked/limited, we can still proceed (OpenAI may fetch successfully), but warn.
        if (!res.ok) {
            return { ok: false, reason: `URL not reachable (HTTP ${res.status}). Try a direct image URL (png/jpg/webp/gif).`, contentType: ct };
        }

        if (!ct) {
            return { ok: true, contentType: null };
        }

        if (!ct.startsWith('image/')) {
            return { ok: false, reason: `URL does not look like an image (content-type: ${ct}). Paste a direct image URL.`, contentType: ct };
        }

        return { ok: true, contentType: ct };
    } catch {
        // If HEAD fails (CORS/blocked), don't hard fail; let the model try.
        return { ok: true, contentType: null };
    }
}

export async function POST(req: Request) {
    try {
        const { mediaUrl } = await req.json();

        if (!mediaUrl) {
            return NextResponse.json({ error: 'mediaUrl is required' }, { status: 400 });
        }

        const precheck = await assertLikelyImageUrl(mediaUrl);
        if (!precheck.ok) {
            return NextResponse.json({ error: precheck.reason || 'Invalid mediaUrl' }, { status: 400 });
        }

        // 1. Call the Black Box
        const rawDigest = await decompileAd(mediaUrl);

        // 2. Validate
        const validation = AdDigestSchema.safeParse(rawDigest);

        const status = validation.success ? 'processed' : 'needs_review';

        // 3. Insert into Supabase
        const { data, error } = await supabaseAdmin
            .from('ad_digests')
            .insert({
                media_url: mediaUrl,
                status: status,
                digest: rawDigest, // Store raw even if validation fails for manual review
                model: 'gpt-4o',
                prompt_version: 'V1'
            })
            .select()
            .single();

        if (error) {
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
    }
}
