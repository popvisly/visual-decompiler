import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';
import { v4 as uuidv4 } from 'uuid';

export async function POST(req: Request) {
    try {
        // Enforce Server-Side checking with strictly parsed strings
        const { data: agency, error: agencyError } = await supabaseAdmin.from('agencies').select('tier').limit(1).single();
        if (agencyError || !agency) {
            return NextResponse.json({ error: 'No agency found in the vault to validate tier.' }, { status: 401 });
        }

        const rawTier = (agency.tier || '').toLowerCase().trim();
        const isSovereign = rawTier === 'agency sovereignty' || rawTier === 'pro';

        if (!isSovereign) {
            return NextResponse.json({ error: 'Agency Sovereignty Tier Required' }, { status: 403 });
        }

        // Parse FormData
        const formData = await req.formData();
        const file = formData.get('file') as File | null;

        if (!file) {
            return NextResponse.json({ error: 'No file uploaded.' }, { status: 400 });
        }

        if (!file.type.startsWith('image/')) {
            return NextResponse.json({ error: 'Only images are supported for Ingestion currently.' }, { status: 400 });
        }

        // 1. Upload to Supabase Storage Bucket 'vault-assets'
        const fileExt = file.name.split('.').pop() || 'png';
        const fileName = `${uuidv4()}.${fileExt}`;
        const filePath = `ingestions/${fileName}`;

        // supabaseAdmin uses process.env.SUPABASE_SERVICE_ROLE_KEY
        const { error: uploadError } = await supabaseAdmin.storage
            .from('vault-assets')
            .upload(filePath, file, { contentType: file.type });

        if (uploadError) throw uploadError;

        // 2. Retrieve Public URL
        const { data: publicUrlData } = supabaseAdmin.storage
            .from('vault-assets')
            .getPublicUrl(filePath);

        const publicUrl = publicUrlData.publicUrl;

        // 3. Fallback Brand (System Dummy or 'Unassigned' logic)
        let targetBrandId = null;
        const { data: brands } = await supabaseAdmin.from('brands').select('id').limit(1);
        if (brands && brands.length > 0) {
            targetBrandId = brands[0].id;
        } else {
            throw new Error("No Brands found in Intelligence Vault to attach asset to.");
        }

        // 4. Create new Asset in database
        const { data: assetData, error: insertError } = await supabaseAdmin.from('assets').insert({
            brand_id: targetBrandId,
            type: 'STATIC',
            file_url: publicUrl
        }).select().single();

        if (insertError) throw insertError;

        return NextResponse.json({ success: true, assetId: assetData.id });

    } catch (e) {
        const error = e as Error;
        console.error('[Ingestion Route Error]:', error);
        return NextResponse.json({ error: error.message || 'Server error during ingestion' }, { status: 500 });
    }
}
