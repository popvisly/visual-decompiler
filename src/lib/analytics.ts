import { supabaseAdmin } from '@/lib/supabase';

export interface AnalyticsData {
    summary: {
        total: number;
        brands: { label: string; count: number }[];
        top_brand: string | null;
        avg_confidence: number | null;
    };
    dimensions: Record<string, { label: string; count: number }[]>;
}

export async function getAnalyticsData(brandParam?: string | null): Promise<AnalyticsData> {
    let query = supabaseAdmin
        .from('ad_digests')
        .select('digest, brand, brand_guess')
        .eq('status', 'processed');

    if (brandParam) {
        query = query.or(`brand.ilike.%${brandParam}%,brand_guess.ilike.%${brandParam}%`);
    }

    const { data: ads, error } = await query;

    if (error) {
        throw new Error(error.message);
    }

    if (!ads) {
        return {
            summary: {
                total: 0,
                brands: [],
                top_brand: null,
                avg_confidence: null
            },
            dimensions: {}
        };
    }

    // Dimensions to aggregate
    const dimensions = [
        'trigger_mechanic',
        'claim_type',
        'offer_type',
        'narrative_framework',
        'cognitive_load',
        'cta_strength'
    ];

    const stats: Record<string, Record<string, number>> = {};
    dimensions.forEach(dim => stats[dim] = {});

    const brands: Record<string, number> = {};
    let totalConfidence = 0;
    let confidenceCount = 0;

    ads.forEach((ad: any) => {
        const digest = ad.digest;
        if (!digest) return;

        // Brand aggregation
        const brandName = ad.brand || ad.brand_guess || 'Unknown';
        brands[brandName] = (brands[brandName] || 0) + 1;

        // Confidence aggregation
        if (digest.diagnostics?.confidence?.overall !== undefined) {
            totalConfidence += digest.diagnostics.confidence.overall;
            confidenceCount++;
        }

        // Feature aggregation
        dimensions.forEach(dim => {
            let val = digest.classification?.[dim];
            if (val) {
                stats[dim][val] = (stats[dim][val] || 0) + 1;
            }
        });
    });

    // Helper to format as ranked list
    const toRankedList = (counts: Record<string, number>) => {
        return Object.entries(counts)
            .map(([label, count]) => ({ label, count }))
            .sort((a, b) => b.count - a.count);
    };

    const formattedBrands = toRankedList(brands);

    return {
        summary: {
            total: ads.length,
            top_brand: formattedBrands[0]?.label || null,
            avg_confidence: confidenceCount > 0 ? totalConfidence / confidenceCount : null,
            brands: formattedBrands
        },
        dimensions: Object.fromEntries(
            Object.entries(stats).map(([dim, counts]) => [dim, toRankedList(counts)])
        )
    };
}
