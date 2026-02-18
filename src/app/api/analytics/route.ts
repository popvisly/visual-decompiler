import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';

type CountRow = { value: string | null; count: number };

function toCounts(rows: any[], key: string): CountRow[] {
    const counts: Record<string, number> = {};
    for (const row of rows) {
        const val = row[key];
        if (val) counts[val] = (counts[val] || 0) + 1;
    }
    return Object.entries(counts)
        .map(([value, count]) => ({ value, count }))
        .sort((a, b) => b.count - a.count);
}

export async function GET(req: Request) {
    const { searchParams } = new URL(req.url);
    const brand = searchParams.get('brand');

    let query = supabaseAdmin
        .from('ad_digests')
        .select('trigger_mechanic, claim_type, offer_type, narrative_framework, cognitive_load, cta_strength, brand, brand_guess, digest')
        .eq('status', 'processed');

    if (brand) {
        query = query.or(`brand.ilike.%${brand}%,brand_guess.ilike.%${brand}%`);
    }

    const { data: rows, error } = await query;

    if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }

    if (!rows || rows.length === 0) {
        return NextResponse.json({
            total: 0,
            brand_filter: brand || null,
            trigger_mechanic: [],
            claim_type: [],
            offer_type: [],
            narrative_framework: [],
            cognitive_load: [],
            cta_strength: [],
            top_brands: [],
            avg_confidence: null,
        });
    }

    // Aggregate confidence from digest JSONB
    const confidences = rows
        .map((r: any) => r.digest?.diagnostics?.confidence?.overall)
        .filter((c: any) => typeof c === 'number');
    const avgConfidence = confidences.length
        ? Math.round((confidences.reduce((a: number, b: number) => a + b, 0) / confidences.length) * 100) / 100
        : null;

    // Top brands — prefer confirmed brand over AI guess
    const brandCounts: Record<string, number> = {};
    for (const row of rows) {
        const b = (row as any).brand || (row as any).brand_guess;
        if (b) brandCounts[b] = (brandCounts[b] || 0) + 1;
    }
    const topBrands = Object.entries(brandCounts)
        .map(([value, count]) => ({ value, count }))
        .sort((a, b) => b.count - a.count)
        .slice(0, 10);

    return NextResponse.json({
        total: rows.length,
        brand_filter: brand || null,
        avg_confidence: avgConfidence,
        top_brands: topBrands,
        trigger_mechanic: toCounts(rows, 'trigger_mechanic'),
        claim_type: toCounts(rows, 'claim_type'),
        offer_type: toCounts(rows, 'offer_type'),
        narrative_framework: toCounts(rows, 'narrative_framework'),
        cognitive_load: toCounts(rows, 'cognitive_load'),
        cta_strength: toCounts(rows, 'cta_strength'),
    });
}
