import { supabaseAdmin } from '@/lib/supabase';
import { AnalyticsData } from './analytics';

export interface BrandStats {
    totalAds: number;
    avgConfidence: number | null;
    topTrigger: string | null;
    topClaim: string | null;
    dimensions: Record<string, { label: string; count: number }[]>;
}

export async function getAllBrands(userId: string, orgId?: string | null) {
    const { data: brands, error } = await supabaseAdmin
        .from('ad_digests')
        .select('brand, brand_guess')
        .or(`user_id.eq.${userId}${orgId ? `,org_id.eq.${orgId}` : ''}`);

    if (error) throw new Error(error.message);

    const counts: Record<string, number> = {};
    brands?.forEach((ad: { brand: string | null; brand_guess: string | null }) => {
        const name = ad.brand || ad.brand_guess || 'Unknown';
        counts[name] = (counts[name] || 0) + 1;
    });

    return Object.entries(counts)
        .map(([name, count]) => ({ name, count }))
        .sort((a, b) => b.count - a.count);
}

export async function getBrandAds(brandName: string, userId: string, orgId?: string | null) {
    const q = JSON.stringify(brandName);
    const { data, error } = await supabaseAdmin
        .from('ad_digests')
        .select('*')
        .or(`user_id.eq.${userId}${orgId ? `,org_id.eq.${orgId}` : ''}`)
        .or(`brand.eq.${q},and(brand.is.null,brand_guess.eq.${q})`)
        .order('created_at', { ascending: false });

    if (error) throw new Error(error.message);
    return data || [];
}

export async function getBrandStats(brandName: string, userId: string, orgId?: string | null): Promise<BrandStats> {
    const q = JSON.stringify(brandName);
    const { data: ads, error } = await supabaseAdmin
        .from('ad_digests')
        .select('digest')
        .or(`user_id.eq.${userId}${orgId ? `,org_id.eq.${orgId}` : ''}`)
        .or(`brand.eq.${q},and(brand.is.null,brand_guess.eq.${q})`);

    if (error) throw new Error(error.message);

    if (!ads || ads.length === 0) {
        return {
            totalAds: 0,
            avgConfidence: null,
            topTrigger: null,
            topClaim: null,
            dimensions: {}
        };
    }

    const dimensions = ['trigger_mechanic', 'claim_type', 'offer_type', 'narrative_framework'];
    const stats: Record<string, Record<string, number>> = {};
    dimensions.forEach(dim => stats[dim] = {});

    let totalConfidence = 0;
    let confidenceCount = 0;

    ads.forEach((ad: any) => {
        const d = ad.digest;
        if (!d) return;

        // Confidence
        if (d.diagnostics?.confidence?.overall !== undefined) {
            totalConfidence += d.diagnostics.confidence.overall;
            confidenceCount++;
        }

        // Features
        dimensions.forEach(dim => {
            const val = d.classification?.[dim];
            if (val) {
                stats[dim][val] = (stats[dim][val] || 0) + 1;
            }
        });
    });

    const toRankedList = (counts: Record<string, number>) => {
        return Object.entries(counts)
            .map(([label, count]) => ({ label, count }))
            .sort((a, b) => b.count - a.count);
    };

    const dimensionStats = Object.fromEntries(
        Object.entries(stats).map(([dim, counts]) => [dim, toRankedList(counts)])
    );

    return {
        totalAds: ads.length,
        avgConfidence: confidenceCount > 0 ? totalConfidence / confidenceCount : null,
        topTrigger: dimensionStats.trigger_mechanic?.[0]?.label || null,
        topClaim: dimensionStats.claim_type?.[0]?.label || null,
        dimensions: dimensionStats
    };
}
