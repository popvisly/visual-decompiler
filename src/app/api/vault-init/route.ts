import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';
import crypto from 'crypto';
import sharp from 'sharp';
import { getServerSession } from '@/lib/auth-server';
import { assertUsageAvailable } from '@/lib/usage';

export const dynamic = 'force-dynamic';

function normalizeAgencyTier(rawTier?: string | null) {
    const tier = (rawTier || '').toLowerCase().trim();
    if (tier === 'agency' || tier === 'agency sovereignty' || tier === 'enterprise') return 'Agency Sovereignty';
    if (tier === 'professional') return 'Professional';
    if (tier === 'pro' || tier === 'strategic') return 'Strategic';
    return 'Observer';
}

export async function POST(req: Request) {
    try {
        const session = await getServerSession(req);
        if (!session.userId) {
            return NextResponse.json({ error: 'Unauthorized: No active sovereign session found.' }, { status: 401 });
        }

        try {
            await assertUsageAvailable(session.userId, session.email);
        } catch (error) {
            if (error instanceof Error && error.message === 'LIMIT_REACHED') {
                const usage = (error as Error & { usage?: unknown }).usage;
                return NextResponse.json(
                    { error: 'LIMIT_REACHED', message: 'You have reached your monthly analysis limit.', usage },
                    { status: 402 }
                );
            }
            throw error;
        }

        const { error: userErr } = await supabaseAdmin
            .from('users')
            .upsert({ id: session.userId, email: session.email || '' }, { onConflict: 'id' });

        if (userErr) {
            return NextResponse.json({ error: 'Failed to verify account status' }, { status: 500 });
        }

        const { data: currentUser } = await supabaseAdmin
            .from('users')
            .select('tier')
            .eq('id', session.userId)
            .maybeSingle();

        const normalizedEmail = (session.email || `${session.userId}@local.visualdecompiler`).toLowerCase();

        const { data: membershipByUser } = await supabaseAdmin
            .from('agency_members')
            .select('agency_id')
            .eq('user_id', session.userId)
            .eq('status', 'active')
            .order('created_at', { ascending: true })
            .limit(1)
            .maybeSingle();

        const membership = membershipByUser
            ? membershipByUser
            : await (async () => {
                  const { data: membershipByEmail } = await supabaseAdmin
                      .from('agency_members')
                      .select('agency_id')
                      .ilike('email', normalizedEmail)
                      .eq('status', 'active')
                      .order('created_at', { ascending: true })
                      .limit(1)
                      .maybeSingle();
                  return membershipByEmail;
              })();

        let workspaceAgencyId = membership?.agency_id || null;

        if (!workspaceAgencyId) {
            const { data: newAgency, error: newAgencyError } = await supabaseAdmin
                .from('agencies')
                .insert({
                    name: `${normalizedEmail.split("@")[0] || "visual decompiler"} studio`,
                    tier: normalizeAgencyTier(currentUser?.tier),
                })
                .select('id')
                .single();

            if (newAgencyError || !newAgency) {
                return NextResponse.json({ error: 'Failed to initialize workspace.' }, { status: 500 });
            }

            workspaceAgencyId = newAgency.id;

            await supabaseAdmin.from('agency_members').upsert(
                {
                    agency_id: workspaceAgencyId,
                    user_id: session.userId,
                    email: normalizedEmail,
                    role: 'owner',
                    status: 'active',
                    joined_at: new Date().toISOString(),
                    updated_at: new Date().toISOString(),
                },
                { onConflict: 'agency_id,email' },
            );
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
            .eq('user_id', session.userId)
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

        // 4. Resolve a Brand ID (Constraint satisfaction)
        let placeholderBrandId = null;
        const { data: existingPending } = await supabaseAdmin.from('brands')
            .select('id')
            .eq('agency_id', workspaceAgencyId)
            .eq('name', 'PENDING EXTRACTION')
            .maybeSingle();

        if (existingPending) {
            placeholderBrandId = existingPending.id;
        } else {
            if (workspaceAgencyId) {
                const { data: newBrand } = await supabaseAdmin
                    .from('brands')
                    .insert({
                        name: 'PENDING EXTRACTION',
                        market_sector: 'Processing...',
                        agency_id: workspaceAgencyId,
                    })
                    .select('id')
                    .single();

                if (newBrand) {
                    placeholderBrandId = newBrand.id;
                }
            }
        }

        if (!placeholderBrandId) {
            // Fallback to any existing brand if we can't create one
            const { data: anyBrand } = await supabaseAdmin.from('brands').select('id').eq('agency_id', workspaceAgencyId).limit(1).single();
            placeholderBrandId = anyBrand?.id;
        }

        // 5. Shell asset created with placeholder brand
        const { data: assetData, error: insertError } = await supabaseAdmin.from('assets').insert({
            brand_id: placeholderBrandId,
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
