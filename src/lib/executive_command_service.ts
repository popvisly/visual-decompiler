import { AdDigest } from '@/types/digest';
import { AdSummary } from '@/components/SelectionProvider';

// ── Types ──
export type AssetProfile = {
    id: string;
    brand: string;
    triggerMechanic: string;
    claimType: string;
    offerType: string;
    cognitiveLoad: string;
    narrativeFramework: string;
    emotionTone: string[];
    semioticSubtext: string;
    objectionTackle: string;
    sovereignScore: number;
};

export type TriggerDistribution = {
    trigger: string;
    count: number;
    percentage: number;
    assets: string[];
};

export type GapItem = {
    dimension: string;
    used: string[];
    missing: string[];
    opportunity: string;
};

export type CategoryAudit = {
    title: string;
    categoryGuess: string;
    assetCount: number;
    executiveSummary: string;
    assetProfiles: AssetProfile[];
    triggerDistribution: TriggerDistribution[];
    gapAnalysis: GapItem[];
    tacticalRecommendations: string[];
    dominantPattern: string;
    avgSovereignScore: number;
};

// ── Known Benchmarks ──
const ALL_TRIGGERS = [
    'Social Proof', 'Aspirational Identity', 'Fear of Missing Out', 'Authority',
    'Reciprocity', 'Scarcity', 'Visual Disruption', 'Emotional Anchoring',
    'Curiosity Gap', 'Loss Aversion', 'Bandwagon Effect', 'Nostalgia'
];

const ALL_CLAIM_TYPES = [
    'Superiority', 'Parity', 'Uniqueness', 'Preemptive', 'Generic', 'Lifestyle'
];

const ALL_EMOTIONAL_DRIVERS = [
    'Excitement', 'Trust', 'Urgency', 'Exclusivity', 'Comfort', 'Fear',
    'Joy', 'Nostalgia', 'Aspiration', 'Relief', 'Curiosity', 'Pride'
];

// ── Service ──
export class ExecutiveCommandService {

    /**
     * Build a full asset profile from an ad's digest.
     */
    static buildProfile(ad: AdSummary): AssetProfile {
        const d = ad.digest;
        const cls = d?.classification;
        const strat = d?.strategy;
        const diag = d?.diagnostics;

        // Sovereign Score — based on overall confidence + strategy completeness
        const confidence = diag?.confidence?.overall ?? 0.7;
        const strategyDepth = [
            strat?.target_job_to_be_done,
            strat?.positioning_claim,
            strat?.differentiator_angle,
            strat?.behavioral_nudge,
            strat?.objection_tackle,
        ].filter(Boolean).length / 5;

        const sovereignScore = Math.round((confidence * 60) + (strategyDepth * 40));

        return {
            id: ad.id,
            brand: ad.brand || d?.meta?.brand_guess || 'Unknown',
            triggerMechanic: cls?.trigger_mechanic || 'Unknown',
            claimType: cls?.claim_type || 'Unknown',
            offerType: cls?.offer_type || 'Unknown',
            cognitiveLoad: cls?.cognitive_load || 'Unknown',
            narrativeFramework: cls?.narrative_framework || 'Unknown',
            emotionTone: cls?.emotion_tone || [],
            semioticSubtext: strat?.semiotic_subtext || '',
            objectionTackle: strat?.objection_tackle || '',
            sovereignScore,
        };
    }

    /**
     * Aggregate trigger mechanic distribution across selected assets.
     */
    static analyzeTriggers(profiles: AssetProfile[]): TriggerDistribution[] {
        const triggerMap = new Map<string, string[]>();

        for (const p of profiles) {
            const t = p.triggerMechanic;
            if (!triggerMap.has(t)) triggerMap.set(t, []);
            triggerMap.get(t)!.push(p.brand);
        }

        return Array.from(triggerMap.entries())
            .map(([trigger, assets]) => ({
                trigger,
                count: assets.length,
                percentage: Math.round((assets.length / profiles.length) * 100),
                assets,
            }))
            .sort((a, b) => b.count - a.count);
    }

    /**
     * Identify strategic gaps — what's NOT being used by competitors.
     */
    static identifyGaps(profiles: AssetProfile[]): GapItem[] {
        const usedTriggers = new Set(profiles.map(p => p.triggerMechanic));
        const usedClaims = new Set(profiles.map(p => p.claimType));
        const usedEmotions = new Set(profiles.flatMap(p => p.emotionTone));

        const gaps: GapItem[] = [];

        const missingTriggers = ALL_TRIGGERS.filter(t => !usedTriggers.has(t));
        if (missingTriggers.length > 0) {
            gaps.push({
                dimension: 'Trigger Mechanics',
                used: Array.from(usedTriggers),
                missing: missingTriggers,
                opportunity: `${missingTriggers.length} trigger mechanic${missingTriggers.length > 1 ? 's' : ''} uncontested. Deploy "${missingTriggers[0]}" for immediate differentiation.`,
            });
        }

        const missingClaims = ALL_CLAIM_TYPES.filter(c => !usedClaims.has(c));
        if (missingClaims.length > 0) {
            gaps.push({
                dimension: 'Claim Types',
                used: Array.from(usedClaims),
                missing: missingClaims,
                opportunity: `"${missingClaims[0]}" claim positioning is a blue ocean in this category.`,
            });
        }

        const missingEmotions = ALL_EMOTIONAL_DRIVERS.filter(e => !usedEmotions.has(e));
        if (missingEmotions.length > 0) {
            gaps.push({
                dimension: 'Emotional Drivers',
                used: Array.from(usedEmotions),
                missing: missingEmotions,
                opportunity: `Competitors are ignoring "${missingEmotions[0]}" as an emotional lever — a sovereign opening.`,
            });
        }

        return gaps;
    }

    /**
     * Generate tactical recommendations based on aggregate data.
     */
    static generateRecommendations(profiles: AssetProfile[], triggers: TriggerDistribution[], gaps: GapItem[]): string[] {
        const recs: string[] = [];

        // Over-leveraged trigger warning
        const dominant = triggers[0];
        if (dominant && dominant.percentage > 40) {
            recs.push(`${dominant.percentage}% of competitors are over-leveraging "${dominant.trigger}." Counter-position with an under-utilized mechanic for maximum strategic differentiation.`);
        }

        // Gap-based recommendation
        if (gaps.length > 0) {
            recs.push(gaps[0].opportunity);
        }

        // Cognitive load insight
        const loads = profiles.map(p => p.cognitiveLoad);
        const highLoad = loads.filter(l => l === 'High').length;
        if (highLoad > profiles.length / 2) {
            recs.push('Majority of competitors use high cognitive load creatives. Consider a minimalist approach to cut through the visual noise.');
        } else {
            recs.push('Category leans toward low-friction creatives. A bold, high-impact visual disruption could capture disproportionate attention.');
        }

        // Sovereign Score insight
        const avgScore = Math.round(profiles.reduce((s, p) => s + p.sovereignScore, 0) / profiles.length);
        if (avgScore < 60) {
            recs.push(`Average Sovereign Score across selected assets is ${avgScore}/100 — indicating weak strategic depth. Your client's entry with a well-constructed strategy will dominate.`);
        } else {
            recs.push(`Average Sovereign Score is ${avgScore}/100 — this is a mature, well-defended category. Recommend flanking via emotional driver gaps.`);
        }

        return recs;
    }

    /**
     * Main entry: generates the full Category Audit from selected ads.
     */
    static generateCategoryAudit(ads: AdSummary[]): CategoryAudit {
        const profiles = ads.map(a => this.buildProfile(a));
        const triggers = this.analyzeTriggers(profiles);
        const gaps = this.identifyGaps(profiles);
        const recs = this.generateRecommendations(profiles, triggers, gaps);

        // Guess category from most common brand or product category
        const brands = profiles.map(p => p.brand);
        const categoryGuess = ads[0]?.digest?.meta?.product_category_guess || 'Multi-Brand';

        const avgScore = Math.round(profiles.reduce((s, p) => s + p.sovereignScore, 0) / profiles.length);

        const dominant = triggers[0];

        const executiveSummary = `Analysis of ${profiles.length} competitive assets in the "${categoryGuess}" category reveals `
            + `${dominant ? `a dominant reliance on "${dominant.trigger}" (${dominant.percentage}% of assets)` : 'diverse tactical approaches'}. `
            + `Average Sovereign Score: ${avgScore}/100. `
            + `${gaps.length} strategic gap${gaps.length !== 1 ? 's' : ''} identified for immediate exploitation.`;

        return {
            title: `Competitive Intelligence Briefing: ${categoryGuess}`,
            categoryGuess,
            assetCount: profiles.length,
            executiveSummary,
            assetProfiles: profiles,
            triggerDistribution: triggers,
            gapAnalysis: gaps,
            tacticalRecommendations: recs,
            dominantPattern: dominant?.trigger || 'Diverse',
            avgSovereignScore: avgScore,
        };
    }
}
