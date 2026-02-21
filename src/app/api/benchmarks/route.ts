import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';

export async function GET(req: Request) {
    const { searchParams } = new URL(req.url);
    const category = searchParams.get('category');

    if (!category) {
        return NextResponse.json({ error: 'Category is required' }, { status: 400 });
    }

    try {
        // 1. Fetch all processed ads for this category
        const { data: ads, error } = await supabaseAdmin
            .from('ad_digests')
            .select('digest')
            .eq('status', 'processed')
            .filter('digest->meta->>product_category_guess', 'eq', category);

        if (error) throw error;
        if (!ads || ads.length === 0) {
            return NextResponse.json({ message: 'Insufficient data for category' });
        }

        // 2. Aggregate Postures
        const triggers: Record<string, number> = {};
        const claims: Record<string, number> = {};

        ads.forEach((ad: any) => {
            const d = ad.digest;
            const t = d.classification?.trigger_mechanic;
            const c = d.classification?.claim_type;

            if (t) triggers[t] = (triggers[t] || 0) + 1;
            if (c) claims[c] = (claims[c] || 0) + 1;
        });

        // 3. Convert to Percentages for Benchmarking
        const total = ads.length;
        const triggerAverages = Object.entries(triggers).map(([key, val]) => ({
            key,
            percentage: (val / total) * 100
        })).sort((a, b) => b.percentage - a.percentage);

        const claimAverages = Object.entries(claims).map(([key, val]) => ({
            key,
            percentage: (val / total) * 100
        })).sort((a, b) => b.percentage - a.percentage);

        return NextResponse.json({
            category,
            sampleSize: total,
            benchmarks: {
                triggers: triggerAverages,
                claims: claimAverages
            }
        });

    } catch (err: any) {
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}
