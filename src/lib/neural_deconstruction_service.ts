import { AdDigest } from '@/types/digest';

/**
 * NeuralDeconstructionService
 * Provides client-side heuristic fallback for the 5 intelligence modules.
 * When `digest.neural_deconstruction` exists (from AI), use it directly.
 * Otherwise these methods derive equivalent data from existing digest fields.
 */

type CognitiveLoadZone = { zone: string; load: number; note: string };
type SchemaSegment = { label: string; duration_hint: string; trigger_used: string; note: string };
type PlatformAffinity = { platform: string; fit_score: number; rationale: string };
type EmotionalDriver = { driver: string; intensity: number; source: string };

export type NeuralDeconstruction = {
    cognitive_load_score: number;
    cognitive_load_zones: CognitiveLoadZone[];
    schema_segments: SchemaSegment[];
    platform_affinity: PlatformAffinity[];
    emotional_drivers: EmotionalDriver[];
    strategic_verdict: string;
    percentile_estimate: number;
};

export class NeuralDeconstructionService {

    /**
     * Main entry: returns AI data if available, otherwise computes heuristic fallback.
     */
    static resolve(digest: AdDigest, forecasting?: { saturationLevel: number; estimatedLifespanDays: number }): NeuralDeconstruction {
        if (digest.neural_deconstruction) {
            return digest.neural_deconstruction as NeuralDeconstruction;
        }
        return {
            cognitive_load_score: this.computeCognitiveLoad(digest),
            cognitive_load_zones: this.computeCognitiveLoadZones(digest),
            schema_segments: this.buildSchemaAutopsy(digest),
            platform_affinity: this.projectMediaBuy(digest),
            emotional_drivers: this.extractEmotionalDrivers(digest),
            strategic_verdict: this.generateVerdict(digest),
            percentile_estimate: this.estimateBenchmark(digest, forecasting),
        };
    }

    // ── 1. Cognitive Load Map ──────────────────────────────────────────────

    static computeCognitiveLoad(digest: AdDigest): number {
        const cogLoad = digest.classification?.cognitive_load || '';
        const loadMap: Record<string, number> = {
            'Minimal_HighContrast': 18,
            'Cinematic_SlowBurn': 30,
            'Fast_Tense': 62,
            'Dense_InfoHeavy': 78,
            'Chaotic_Cluttered': 92,
        };
        let score = loadMap[cogLoad] ?? 45;

        // Adjust by element density
        const elementCount = digest.extraction?.notable_visual_elements?.length || 0;
        score += Math.min(elementCount * 3, 15);

        // Adjust by palette complexity
        const paletteSize = (digest.extraction as any)?.palette_hex?.length || 1;
        if (paletteSize > 4) score += 8;

        // Adjust by copy density
        const copyLen = (digest.extraction?.on_screen_copy?.supporting_copy?.length || 0);
        score += Math.min(copyLen * 4, 12);

        return Math.min(Math.max(Math.round(score), 5), 98);
    }

    static computeCognitiveLoadZones(digest: AdDigest): CognitiveLoadZone[] {
        const zones: CognitiveLoadZone[] = [];
        const ext = digest.extraction;
        const cls = digest.classification;

        // Hero / primary visual
        const gazeMap: Record<string, number> = {
            'Human_Face_EyeContact': 25, 'Human_Body_Action': 35,
            'Product_Packaging': 40, 'Typography_Headline': 55,
            'Logo_BrandMark': 20, 'Price_Discount_Badge': 60,
            'Color_Block_Abstract': 15, 'Scene_Context_Environment': 30,
        };
        zones.push({
            zone: 'Primary Visual',
            load: gazeMap[cls?.gaze_priority || ''] ?? 30,
            note: `Gaze priority: ${(cls?.gaze_priority || 'Unknown').replace(/_/g, ' ')}`,
        });

        // Typography / headline
        if (ext?.on_screen_copy?.primary_headline) {
            const headlineLen = ext.on_screen_copy.primary_headline.length;
            zones.push({
                zone: 'Headline Block',
                load: Math.min(20 + headlineLen, 75),
                note: headlineLen > 40 ? 'Long headline increases processing demand' : 'Concise headline — low friction',
            });
        }

        // CTA
        if (ext?.on_screen_copy?.cta_text) {
            zones.push({
                zone: 'Call-to-Action',
                load: cls?.cta_strength === 'Hard' ? 55 : cls?.cta_strength === 'Direct' ? 40 : 20,
                note: `CTA strength: ${cls?.cta_strength || 'Soft'}`,
            });
        }

        // Supporting elements
        const elCount = ext?.notable_visual_elements?.length || 0;
        if (elCount > 0) {
            zones.push({
                zone: 'Supporting Elements',
                load: Math.min(15 + elCount * 8, 85),
                note: `${elCount} visual elements detected`,
            });
        }

        return zones;
    }

    // ── 2. Schema Autopsy ──────────────────────────────────────────────────

    static buildSchemaAutopsy(digest: AdDigest): SchemaSegment[] {
        // If video with arc segments, use those
        const arc = digest.extraction?.narrative_arc;
        if (arc?.arc_segments && arc.arc_segments.length > 0) {
            return arc.arc_segments.map(seg => ({
                label: seg.label,
                duration_hint: `${(seg.t_ms / 1000).toFixed(1)}s`,
                trigger_used: digest.classification?.trigger_mechanic?.replace(/_/g, ' ') || 'Unknown',
                note: seg.strategy_note,
            }));
        }

        // For images, build from structural analysis
        const segments: SchemaSegment[] = [];
        const trigger = digest.classification?.trigger_mechanic?.replace(/_/g, ' ') || 'Unknown';
        const narrative = digest.classification?.narrative_framework?.replace(/_/g, ' ') || 'Unknown';

        segments.push({
            label: 'Hook',
            duration_hint: digest.meta?.media_type === 'video' ? '0–3s' : 'Top third',
            trigger_used: trigger,
            note: digest.audience_strategy?.first3s_hook_type
                ? `Hook type: ${digest.audience_strategy.first3s_hook_type}`
                : `Narrative: ${narrative}`,
        });

        // Value proposition
        if (digest.strategy?.positioning_claim) {
            segments.push({
                label: 'Value Proposition',
                duration_hint: digest.meta?.media_type === 'video' ? '3–7s' : 'Mid section',
                trigger_used: digest.classification?.secondary_trigger_mechanic?.replace(/_/g, ' ') || trigger,
                note: digest.strategy.positioning_claim,
            });
        }

        // Social proof / evidence
        if ((digest.classification?.proof_type?.length || 0) > 0) {
            segments.push({
                label: 'Social Proof',
                duration_hint: digest.meta?.media_type === 'video' ? '7–10s' : 'Supporting area',
                trigger_used: (digest.classification?.proof_type?.[0] || '').replace(/_/g, ' '),
                note: `Proof architecture: ${digest.classification?.proof_type?.join(', ').replace(/_/g, ' ')}`,
            });
        }

        // CTA
        if (digest.extraction?.on_screen_copy?.cta_text) {
            segments.push({
                label: 'CTA',
                duration_hint: digest.meta?.media_type === 'video' ? 'Final 2s' : 'Bottom / overlay',
                trigger_used: digest.strategy?.behavioral_nudge || 'Direct action',
                note: `"${digest.extraction.on_screen_copy.cta_text}" — ${digest.classification?.cta_strength || 'Soft'} strength`,
            });
        }

        return segments.length > 0 ? segments : [{
            label: 'Single Frame',
            duration_hint: 'Static',
            trigger_used: trigger,
            note: 'No sequential structure detected — single-impact composition.',
        }];
    }

    // ── 3. Media Buy Projections ──────────────────────────────────────────

    static projectMediaBuy(digest: AdDigest): PlatformAffinity[] {
        const cls = digest.classification;
        const cogLoad = cls?.cognitive_load || '';
        const mediaType = digest.meta?.media_type || 'image';
        const styles = cls?.visual_style || [];
        const ctaStrength = cls?.cta_strength || 'None';

        const platforms: PlatformAffinity[] = [];

        // Instagram
        let igScore = 60;
        if (styles.some(s => ['Minimalist', 'Premium_Luxury', 'Editorial_Fashion'].includes(s))) igScore += 20;
        if (cogLoad === 'Minimal_HighContrast' || cogLoad === 'Cinematic_SlowBurn') igScore += 10;
        if (mediaType === 'image') igScore += 5;
        platforms.push({ platform: 'Instagram', fit_score: Math.min(igScore, 98), rationale: igScore > 75 ? 'High-fidelity visuals and aspirational tone align with Instagram\'s aesthetic-first feed.' : 'Moderate visual alignment — consider carousel format for deeper engagement.' });

        // TikTok
        let ttScore = 40;
        if (mediaType === 'video') ttScore += 25;
        if (cogLoad === 'Fast_Tense' || cogLoad === 'Chaotic_Cluttered') ttScore += 20;
        if (styles.some(s => ['Playful_Bold', 'Absurdist_PatternInterrupt'].includes(s))) ttScore += 15;
        if ((digest.audience_strategy?.hook_clarity_score || 0) > 7) ttScore += 10;
        platforms.push({ platform: 'TikTok', fit_score: Math.min(ttScore, 98), rationale: ttScore > 70 ? 'High motion and pattern-interrupt energy make this a TikTok-first asset.' : 'Lower native fit — would require re-cut with faster pacing and native audio.' });

        // CTV / OTT
        let ctvScore = 35;
        if (mediaType === 'video') ctvScore += 20;
        if (cogLoad === 'Cinematic_SlowBurn') ctvScore += 25;
        if (styles.some(s => ['Premium_Luxury', 'Corporate_Modern'].includes(s))) ctvScore += 15;
        platforms.push({ platform: 'CTV / OTT', fit_score: Math.min(ctvScore, 98), rationale: ctvScore > 60 ? 'Cinematic quality and premium production value translate well to living-room viewing.' : 'Asset lacks the production scale typically expected for connected TV placements.' });

        // YouTube
        let ytScore = 50;
        if (mediaType === 'video') ytScore += 15;
        if (ctaStrength === 'Direct' || ctaStrength === 'Hard') ytScore += 10;
        if ((digest.extraction?.narrative_arc?.arc_segments?.length || 0) > 2) ytScore += 15;
        platforms.push({ platform: 'YouTube', fit_score: Math.min(ytScore, 98), rationale: ytScore > 65 ? 'Strong narrative arc and clear CTA make this effective for pre-roll and in-stream.' : 'Consider extending the narrative for better YouTube retention metrics.' });

        // Web / Display
        let webScore = 55;
        if (mediaType === 'image') webScore += 15;
        if (ctaStrength === 'Hard' || ctaStrength === 'Direct') webScore += 15;
        if (cogLoad === 'Dense_InfoHeavy') webScore += 10;
        platforms.push({ platform: 'Web Display', fit_score: Math.min(webScore, 98), rationale: webScore > 70 ? 'Information density and strong CTA optimize for web conversion environments.' : 'Visual complexity may reduce click-through in banner contexts.' });

        return platforms.sort((a, b) => b.fit_score - a.fit_score);
    }

    // ── 4. Neural Sentiment (Deep Emotional Drivers) ──────────────────────

    static extractEmotionalDrivers(digest: AdDigest): EmotionalDriver[] {
        const drivers: EmotionalDriver[] = [];
        const tones = digest.classification?.emotion_tone || [];
        const semLayers = digest.semiotic_intelligence?.semiotic_layers || [];

        // Map emotion_tone to deep drivers
        const driverMap: Record<string, { driver: string; base: number }> = {
            'Awe': { driver: 'Awe', base: 82 },
            'Desire': { driver: 'Desire', base: 78 },
            'Relief': { driver: 'Relief', base: 65 },
            'Safety': { driver: 'Security', base: 60 },
            'Confidence': { driver: 'Empowerment', base: 72 },
            'Belonging': { driver: 'Belonging', base: 68 },
            'Curiosity': { driver: 'Discovery', base: 70 },
            'Humor': { driver: 'Joy', base: 55 },
            'Urgency': { driver: 'Urgency', base: 85 },
            'Trust': { driver: 'Trust', base: 74 },
            'Peace_Calm': { driver: 'Tranquility', base: 58 },
        };

        tones.forEach((tone, i) => {
            const mapped = driverMap[tone];
            if (mapped) {
                drivers.push({
                    driver: mapped.driver,
                    intensity: Math.min(mapped.base + (i === 0 ? 10 : 0), 98),
                    source: `Primary emotion tone: ${tone.replace(/_/g, ' ')}`,
                });
            }
        });

        // Add drivers from semiotic layers
        (semLayers || []).forEach(layer => {
            if (!drivers.find(d => d.driver.toLowerCase() === layer.layer_name.toLowerCase())) {
                drivers.push({
                    driver: layer.layer_name,
                    intensity: Math.min(50 + (layer.cues?.length || 0) * 12, 95),
                    source: layer.cues?.slice(0, 2).join(', ') || 'Implicit semiotic signal',
                });
            }
        });

        // Infer from trigger mechanic if no drivers found
        if (drivers.length === 0) {
            const trigger = digest.classification?.trigger_mechanic || '';
            const triggerDrivers: Record<string, EmotionalDriver> = {
                'Status_Prestige': { driver: 'Aspiration', intensity: 85, source: 'Status/prestige trigger mechanic' },
                'FOMO_Scarcity': { driver: 'Urgency', intensity: 90, source: 'Scarcity-driven trigger mechanic' },
                'Security_Trust': { driver: 'Trust', intensity: 78, source: 'Security/trust trigger mechanic' },
                'Sex_Desire': { driver: 'Desire', intensity: 88, source: 'Desire-based trigger mechanic' },
                'Nostalgia_Comfort': { driver: 'Nostalgia', intensity: 72, source: 'Nostalgia/comfort trigger mechanic' },
            };
            if (triggerDrivers[trigger]) drivers.push(triggerDrivers[trigger]);
            else drivers.push({ driver: 'Engagement', intensity: 60, source: 'General audience engagement signals' });
        }

        // Add exclusivity if premium
        if (digest.premium_intelligence?.premium_index_score && digest.premium_intelligence.premium_index_score > 60) {
            if (!drivers.find(d => d.driver === 'Exclusivity')) {
                drivers.push({
                    driver: 'Exclusivity',
                    intensity: Math.min(digest.premium_intelligence.premium_index_score, 95),
                    source: `Premium index: ${digest.premium_intelligence.premium_index_score}`,
                });
            }
        }

        return drivers.sort((a, b) => b.intensity - a.intensity).slice(0, 5);
    }

    // ── 5. Sovereign Benchmark ────────────────────────────────────────────

    static estimateBenchmark(digest: AdDigest, forecasting?: { saturationLevel: number; estimatedLifespanDays: number }): number {
        let percentile = 50;

        // Factor in confidence
        const confidence = digest.diagnostics?.confidence?.overall || 50;
        percentile += (confidence - 50) * 0.3;

        // Factor in premium intelligence
        if (digest.premium_intelligence?.premium_index_score) {
            percentile += (digest.premium_intelligence.premium_index_score - 50) * 0.2;
        }

        // Factor in saturation (lower saturation = more unique = higher percentile)
        if (forecasting) {
            percentile += (100 - forecasting.saturationLevel) * 0.15;
        }

        // Hook clarity bonus
        if (digest.audience_strategy?.hook_clarity_score) {
            percentile += (digest.audience_strategy.hook_clarity_score - 5) * 3;
        }

        return Math.min(Math.max(Math.round(percentile), 12), 98);
    }

    // ── 6. Strategic Verdict ──────────────────────────────────────────────

    static generateVerdict(digest: AdDigest): string {
        const trigger = digest.classification?.trigger_mechanic?.replace(/_/g, ' ') || 'engagement';
        const style = digest.classification?.visual_style?.[0]?.replace(/_/g, ' ') || 'balanced';
        const tone = digest.classification?.emotion_tone?.[0]?.replace(/_/g, ' ') || 'neutral';
        const narrative = digest.classification?.narrative_framework?.replace(/_/g, ' ') || 'standard';
        const category = digest.meta?.product_category_guess || 'the category';

        const cogLoad = digest.classification?.cognitive_load || '';
        const loadDescriptors: Record<string, string> = {
            'Minimal_HighContrast': 'clean restraint',
            'Cinematic_SlowBurn': 'cinematic pacing',
            'Fast_Tense': 'rapid-fire energy',
            'Dense_InfoHeavy': 'information density',
            'Chaotic_Cluttered': 'visual disruption',
        };
        const loadDesc = loadDescriptors[cogLoad] || 'balanced composition';

        return `The ${style} aesthetic leverages ${loadDesc} to deliver a ${trigger} signal through ${narrative} storytelling, creating a high-retention ${tone} response optimized for ${category}.`;
    }
}
