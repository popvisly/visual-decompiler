import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { supabaseAdmin } from '@/lib/supabase';

export async function GET(req: Request) {
    const { userId } = await auth();
    if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const { searchParams } = new URL(req.url);
    const brand = searchParams.get('brand');

    let query = supabaseAdmin
        .from('ad_digests')
        .select('*')
        .eq('user_id', userId)
        .eq('status', 'processed');

    if (brand) {
        const q = JSON.stringify(brand);
        query = query.or(`brand.eq.${q},and(brand.is.null,brand_guess.eq.${q})`);
    }

    const { data, error } = await query;

    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    if (!data || data.length === 0) return NextResponse.json({ error: 'No data to export' }, { status: 404 });

    // Generate CSV
    const headers = [
        'ID', 'Date', 'Brand', 'URL',
        'Trigger Mechanic', 'Claim Type', 'Offer Type',
        'Headline', 'Primary Text', 'Semiotic Subtext', 'Competitive Advantage', 'Objection Tackle'
    ];

    const rows = data.map((ad: any) => {
        const d = ad.digest;
        return [
            ad.id,
            new Date(ad.created_at).toISOString(),
            ad.brand || d.meta?.brand_guess || 'Unknown',
            ad.media_url,
            d.classification?.trigger_mechanic || '',
            d.classification?.claim_type || '',
            d.classification?.offer_type || '',
            `"${(d.extraction?.on_screen_copy?.primary_headline || '').replace(/"/g, '""')}"`,
            `"${(d.extraction?.on_screen_copy?.primary_body || '').replace(/"/g, '""')}"`,
            `"${(d.strategy?.semiotic_subtext || '').replace(/"/g, '""')}"`,
            `"${(d.strategy?.competitive_advantage || '').replace(/"/g, '""')}"`,
            `"${(d.strategy?.objection_tackle || '').replace(/"/g, '""')}"`
        ].join(',');
    });

    const csvContent = [headers.join(','), ...rows].join('\n');

    return new Response(csvContent, {
        headers: {
            'Content-Type': 'text/csv',
            'Content-Disposition': `attachment; filename=visual-decompiler-export-${new Date().getTime()}.csv`,
        },
    });
}
