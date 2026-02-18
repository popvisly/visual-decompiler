import { NextResponse } from 'next/server';
import { decompileAd } from '@/lib/vision';
import { AdDigestSchema } from '@/types/digest';
import { supabaseAdmin } from '@/lib/supabase';

export async function POST(req: Request) {
    try {
        const { mediaUrl } = await req.json();

        if (!mediaUrl) {
            return NextResponse.json({ error: 'mediaUrl is required' }, { status: 400 });
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
