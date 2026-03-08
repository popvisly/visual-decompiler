import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';
import crypto from 'crypto';
import sharp from 'sharp';
import { getServerSession } from '@/lib/auth-server';

export const dynamic = 'force-dynamic';

export async function POST(req: Request) {
    try {
        const session = await getServerSession(req);
        if (!session.userId) {
            return NextResponse.json({ error: 'Unauthorized: No active sovereign session found.' }, { status: 401 });
        }

        const { error: userErr } = await supabaseAdmin
            .from('users')
            .upsert({ id: session.userId, email: session.email || '' }, { onConflict: 'id' });

        if (userErr) {
            return NextResponse.json({ error: 'Failed to verify account status' }, { status: 500 });
        }

        const { data: agency, error: agencyError } = await supabaseAdmin.from('agencies').select('tier').limit(1).single();
        if (agencyError || !agency) {
            return NextResponse.json({ error: 'No agency found in the vault to validate tier.' }, { status: 401 });
        }

        const rawTier = (agency.tier || '').toLowerCase().trim();
        const isSovereign = rawTier === 'agency sovereignty' || rawTier === 'pro';

        if (!isSovereign) {
            return NextResponse.json({ error: 'Agency Sovereignty Tier Required' }, { status: 403 });
        }

        const contentType = req.headers.get('content-type') || '';
        let buffer: Buffer;
        let fileExt = 'png';
        let mimeType = 'image/jpeg';

        if (contentType.includes('application/json')) {
            const body = await req.json();
            const mediaUrl = body.mediaUrl;
            if (!mediaUrl) return NextResponse.json({ error: 'No mediaUrl provided.' }, { status: 400 });
            
            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), 5000);
            let fetchRes;
            try {
                fetchRes = await fetch(mediaUrl, { signal: controller.signal });
                clearTimeout(timeoutId);
            } catch (err: any) {
                clearTimeout(timeoutId);
                return NextResponse.json({ error: 'Image retrieval timed out.' }, { status: 408 });
            }

            if (!fetchRes.ok) return NextResponse.json({ error: 'Failed to fetch media from URL.' }, { status: 400 });
            
            mimeType = fetchRes.headers.get('content-type') || 'image/jpeg';
            if (!mimeType.startsWith('image/')) return NextResponse.json({ error: 'Only images supported.' }, { status: 400 });
            
            const arrayBuffer = await fetchRes.arrayBuffer();
            buffer = Buffer.from(new Uint8Array(arrayBuffer));
            fileExt = mimeType.split('/')[1] || 'png';
        } else if (contentType.includes('multipart/form-data')) {
            const formData = await req.formData();
            const file = formData.get('file') as File | null;
            if (!file) return NextResponse.json({ error: 'No file uploaded.' }, { status: 400 });
            if (!file.type.startsWith('image/')) return NextResponse.json({ error: 'Only images supported.' }, { status: 400 });
            fileExt = file.name.split('.').pop() || 'png';
            mimeType = file.type;
            const arrayBuffer = await file.arrayBuffer();
            buffer = Buffer.from(new Uint8Array(arrayBuffer));
        } else {
            return NextResponse.json({ error: 'Unsupported Content-Type.' }, { status: 400 });
        }

        buffer = await sharp(buffer)
            .resize({ width: 1024, height: 1024, fit: 'inside', withoutEnlargement: true })
            .toBuffer();

        const fileHash = crypto.createHash('sha256').update(buffer).digest('hex');
        const fileName = `${fileHash}.${fileExt}`;
        const filePath = `ingestions/${fileName}`;

        // Semantic Hash Deduplication
        const { data: existingAssets } = await supabaseAdmin.from('assets')
            .select('id')
            .ilike('file_url', `%${fileHash}%`)
            .limit(1);

        if (existingAssets && existingAssets.length > 0) {
            return NextResponse.json({ success: true, assetId: existingAssets[0].id, cached: true });
        }

        const { error: uploadError } = await supabaseAdmin.storage
            .from('vault-assets')
            .upload(filePath, buffer, { contentType: mimeType });

        if (uploadError) throw uploadError;

        const { data: publicUrlData } = supabaseAdmin.storage
            .from('vault-assets')
            .getPublicUrl(filePath);

        const publicUrl = publicUrlData.publicUrl;

        // Shell asset created instantly
        const { data: assetData, error: insertError } = await supabaseAdmin.from('assets').insert({
            brand_id: null,
            user_id: session.userId,
            type: 'STATIC',
            file_url: publicUrl
        }).select().single();

        if (insertError) throw insertError;

        return NextResponse.json({ success: true, assetId: assetData.id });

    } catch (e) {
        const error = e as Error;
        console.error('[Vault Init Error]:', error);
        return NextResponse.json({ error: error.message || 'Server error' }, { status: 500 });
    }
}
