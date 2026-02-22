import { AdDigest } from '@/types/digest';

export type VelocityMetrics = {
    saturationLevel: number; // 0-100
    opportunityScore: number; // 0-100
    marketVelocity: 'Rising' | 'Steady' | 'Peaking' | 'Declining';
    estimatedLifespanDays: number;
    trendPhase: 'Early Adoption' | 'First In' | 'Mainstream' | 'Saturated';
};

export class ForecastingService {
    /**
     * Analyzes a collection of ads against macro-trend data to determine velocity and saturation.
     * In a real implementation, this would involve complex vector distance analysis against pulse history.
     * For this milestone, we implement the high-IQ heuristic logic.
     */
    static analyze(ads: AdDigest[], pulseText: string): VelocityMetrics {
        const adCount = ads.length;
        if (adCount === 0) {
            return {
                saturationLevel: 0,
                opportunityScore: 100,
                marketVelocity: 'Rising',
                estimatedLifespanDays: 180,
                trendPhase: 'Early Adoption'
            };
        }

        // Heuristic 1: Pattern Density
        // If many ads share the same trigger or visual style, saturation rises.
        const triggers = ads.map(a => a.classification?.trigger_mechanic);
        const uniqueTriggers = new Set(triggers).size;
        const triggerDensity = 1 - (uniqueTriggers / adCount);

        // Heuristic 2: Pulse Alignment
        // Check if dominant keywords from pulse_reports are appearing in the collection.
        const keywords = ['minimalist', 'ugc', 'cinematic', 'lo-fi', 'premium', 'fast-cut'];
        let pulseMatchCount = 0;
        keywords.forEach(kw => {
            if (pulseText.toLowerCase().includes(kw)) {
                const collectionHasIt = ads.some(a =>
                    JSON.stringify(a).toLowerCase().includes(kw)
                );
                if (collectionHasIt) pulseMatchCount++;
            }
        });

        // Calculate Saturation (0-100)
        // High density + high pulse alignment = high saturation
        let saturation = (triggerDensity * 60) + (pulseMatchCount * 10);
        saturation = Math.min(Math.max(saturation, 5), 95);

        // Determine Market Velocity
        let velocity: VelocityMetrics['marketVelocity'] = 'Steady';
        if (saturation < 30) velocity = 'Rising';
        else if (saturation > 75) velocity = 'Peaking';
        else if (pulseMatchCount > 3) velocity = 'Declining';

        // Determine Trend Phase
        let phase: VelocityMetrics['trendPhase'] = 'Mainstream';
        if (saturation < 20) phase = 'First In';
        else if (saturation < 40) phase = 'Early Adoption';
        else if (saturation > 80) phase = 'Saturated';

        // Estimated Lifespan
        const baseLifespan = 120; // 4 months
        const estimatedLifespanDays = Math.round(baseLifespan * (1 - saturation / 100) * (velocity === 'Rising' ? 1.5 : 0.8));

        // Opportunity Score (Inverse of saturation, weighted by velocity)
        const opportunityScore = Math.round((100 - saturation) * (velocity === 'Rising' ? 1.2 : 0.7));

        return {
            saturationLevel: Math.round(saturation),
            opportunityScore: Math.min(opportunityScore, 100),
            marketVelocity: velocity,
            estimatedLifespanDays: Math.max(estimatedLifespanDays, 14),
            trendPhase: phase
        };
    }

    static analyzeAd(ad: AdDigest, pulseText: string): Pick<VelocityMetrics, 'saturationLevel' | 'estimatedLifespanDays'> {
        // High-IQ heuristic for single ad
        const style = ad.classification?.visual_style?.[0] || 'Unknown';
        const isTrending = pulseText.toLowerCase().includes(style.toLowerCase());

        let saturation = isTrending ? 65 : 15;
        const lifespan = isTrending ? 45 : 120;

        return {
            saturationLevel: saturation,
            estimatedLifespanDays: lifespan
        };
    }
}
