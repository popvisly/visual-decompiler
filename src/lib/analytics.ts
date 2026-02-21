import { supabaseAdmin } from '@/lib/supabase';

export interface AnalyticsData {
    summary: {
        total: number;
        queued: number;
        processing: number;
        brands: { label: string; count: number }[];
        top_brand: string | null;
        avg_confidence: number | null;
    };
    dimensions: Record<string, { label: string; count: number }[]>;
    highlights: {
        id: string;
        brand: string;
        subtext: string;
        objection: string;
    }[];
}

export async function getAnalyticsData(userId: string, orgId?: string | null, brandParam?: string | null): Promise<AnalyticsData> {
    let query = supabaseAdmin
        .from('ad_digests')
        .select('digest, brand, brand_guess, status')
        .or(`user_id.eq.${userId}${orgId ? `,org_id.eq.${orgId}` : ''}`);

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
                queued: 0,
                processing: 0,
                brands: [],
                top_brand: null,
                avg_confidence: null
            },
            dimensions: {},
            highlights: []
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

    let processedAds = 0;
    let queuedAds = 0;
    let processingAds = 0;

    ads.forEach((ad: any) => {
        if (ad.status === 'queued') {
            queuedAds++;
            return;
        }
        if (ad.status === 'processing') {
            processingAds++;
            return;
        }

        processedAds++;
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

    // Deep Intelligence Highlights
    const highlights = ads
        .filter((ad: any) => ad.digest?.strategy?.semiotic_subtext || ad.digest?.strategy?.objection_tackle)
        .slice(0, 6)
        .map((ad: any) => ({
            id: ad.id,
            brand: ad.brand || ad.brand_guess || 'Unknown',
            subtext: ad.digest.strategy.semiotic_subtext,
            objection: ad.digest.strategy.objection_tackle
        }));

    return {
        summary: {
            total: processedAds,
            queued: queuedAds,
            processing: processingAds,
            top_brand: formattedBrands[0]?.label || null,
            avg_confidence: confidenceCount > 0 ? totalConfidence / confidenceCount : null,
            brands: formattedBrands
        },
        dimensions: Object.fromEntries(
            Object.entries(stats).map(([dim, counts]) => [dim, toRankedList(counts)])
        ),
        highlights
    };
}

export interface ComparisonData {
    brandA: { name: string; stats: Record<string, { label: string; count: number }[]>; total: number };
    brandB: { name: string; stats: Record<string, { label: string; count: number }[]>; total: number };
    dimensions: string[];
}

export async function getComparisonData(brandAName: string, brandBName: string, userId: string, orgId?: string | null): Promise<ComparisonData> {
    const fetchBrand = async (name: string) => {
        const q = JSON.stringify(name);
        const { data, error } = await supabaseAdmin
            .from('ad_digests')
            .select('digest, brand, brand_guess')
            .or(`user_id.eq.${userId}${orgId ? `,org_id.eq.${orgId}` : ''}`)
            .or(`brand.eq.${q},and(brand.is.null,brand_guess.eq.${q})`)
            .eq('status', 'processed');

        if (error) throw error;

        const dimensions = ['trigger_mechanic', 'claim_type', 'offer_type', 'narrative_framework'];
        const stats: Record<string, Record<string, number>> = {};
        dimensions.forEach(dim => stats[dim] = {});

        data?.forEach((ad: any) => {
            const d = ad.digest;
            if (!d) return;
            dimensions.forEach(dim => {
                const val = d.classification?.[dim];
                if (val) stats[dim][val] = (stats[dim][val] || 0) + 1;
            });
        });

        const toRankedList = (counts: Record<string, number>) => {
            return Object.entries(counts)
                .map(([label, count]) => ({ label, count }))
                .sort((a, b) => b.count - a.count);
        };

        return {
            name,
            total: data?.length || 0,
            stats: Object.fromEntries(Object.entries(stats).map(([dim, counts]) => [dim, toRankedList(counts)]))
        };
    };

    const [brandA, brandB] = await Promise.all([
        fetchBrand(brandAName),
        fetchBrand(brandBName)
    ]);

    return {
        brandA,
        brandB,
        dimensions: ['trigger_mechanic', 'claim_type', 'offer_type', 'narrative_framework']
    };
}
