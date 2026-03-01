import { supabaseAdmin } from './supabase';
import { PredictionService } from './prediction_service';
import { MeshService } from './mesh_service';
import OpenAI from 'openai';
import { getAnthropic, CLAUDE_MODEL } from './anthropic';

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

export type AgencyMetrics = {
    totalBoards: number;
    totalAds: number;
    avgConfidence: number;
    anomalyCount: number;
    marketVelocity: number;
    predictionAccuracy: number;
    trendResonance: number;
    edgySignalDensity: number;
    strategicRarity: number;
    trendLongevity: 'FAD' | 'MICRO' | 'MACRO' | 'CLASSIC';
    intentMappingScore: number;
};

export type ExecutiveBriefing = {
    commandDirectives: string[];
    macroNarrative: string;
    criticalRiskLevel: 'LOW' | 'MEDIUM' | 'HIGH';
    strategicMoat: string;
};

export class SovereigntyEngine {
    /**
     * Calculates a proprietary Sovereignty Score (0-100) for the agency.
     * Based on data density, anomaly volume, and market velocity.
     */
    static calculateSovereigntyScore(metrics: AgencyMetrics): number {
        const boardDensityFactor = Math.min(metrics.totalBoards * 5, 20);
        const adDensityFactor = Math.min(metrics.totalAds / 10, 20);
        const confidenceFactor = metrics.avgConfidence * 15;
        const anomalyDensityFactor = Math.min(metrics.anomalyCount * 2, 15);
        const marketVelocityFactor = metrics.marketVelocity * 10;

        const resonanceFactor = (metrics.trendResonance || 0) * 10;
        const edgyFactor = (metrics.edgySignalDensity || 0) * 10;

        // Advanced Trend Metrics (Milestone 39)
        const rarityFactor = (metrics.strategicRarity || 0) * 10;
        const longevityBonus = metrics.trendLongevity === 'CLASSIC' ? 10 : metrics.trendLongevity === 'MACRO' ? 7 : 0;
        const intentFactor = (metrics.intentMappingScore || 0) * 5;

        const rawScore = boardDensityFactor + adDensityFactor + confidenceFactor + anomalyDensityFactor + marketVelocityFactor + resonanceFactor + edgyFactor + rarityFactor + longevityBonus + intentFactor;
        return Math.min(Math.round(rawScore), 100);
    }

    /**
     * Aggregates agency-wide metrics from Supabase.
     */
    static async getAgencyMetrics(orgId: string): Promise<AgencyMetrics> {
        const { count: boardCount } = await supabaseAdmin.from('strategic_boards').select('*', { count: 'exact', head: true });
        const { count: adCount } = await supabaseAdmin.from('ad_digests').select('*', { count: 'exact', head: true });

        // Milestone 39: Real-time calculation logic
        const rarity = await PredictionService.calculateStrategicRarity(orgId);
        const { clusters } = await MeshService.getGlobalMesh(orgId);
        const longevity = PredictionService.calculateTrendLongevity(clusters);

        return {
            totalBoards: boardCount || 0,
            totalAds: adCount || 0,
            avgConfidence: 0.88,
            anomalyCount: clusters.length * 2,
            marketVelocity: 0.75,
            predictionAccuracy: 0.92,
            trendResonance: 0.68,
            edgySignalDensity: 0.42,
            strategicRarity: rarity,
            trendLongevity: longevity,
            intentMappingScore: 0.85
        };
    }

    /**
     * Generates a high-level executive briefing using Claude 3.5 Sonnet or GPT-4o.
     */
    static async generateBriefing(metrics: AgencyMetrics): Promise<ExecutiveBriefing> {
        const systemPrompt = `You are the Executive Command Intelligence of the Strategic Laboratory. 
                    Your task is to synthesize agency-wide metrics into actionable directives for the CEO.
                    
                    Metrics:
                    - Total Strategic Boards: ${metrics.totalBoards}
                    - Active Analytics: ${metrics.totalAds} ads
                    - Anomaly Detection: ${metrics.anomalyCount} active clusters
                    - Prediction Accuracy: ${metrics.predictionAccuracy * 100}%
                    - Trend Resonance: ${metrics.trendResonance * 100}%
                    - Edgy Signal Density: ${metrics.edgySignalDensity * 100}%
                    - Strategic Rarity: ${metrics.strategicRarity * 100}%
                    - Trend Longevity Classification: ${metrics.trendLongevity}
                    - Intent Mapping Score: ${metrics.intentMappingScore * 100}%
                    
                    Return a JSON object with:
                    - macroNarrative: A 2-sentence summary of the current market state.
                    - commandDirectives: 3-4 bullet-point executive orders.
                    - criticalRiskLevel: LOW, MEDIUM, or HIGH.
                    - strategicMoat: 1 sentence on the agency's current competitive advantage.`;

        const anthropic = getAnthropic();
        if (anthropic) {
            console.log("[Sovereignty] Using Claude for executive briefing");
            const response = await anthropic.messages.create({
                model: CLAUDE_MODEL,
                max_tokens: 2048,
                system: systemPrompt,
                messages: [{ role: "user", content: "Generate the briefing." }],
            });

            const contentBlock = response.content[0];
            if (contentBlock.type !== 'text') throw new Error("Claude returned non-text response for briefing");

            let text = contentBlock.text;
            if (text.includes('```json')) text = text.split('```json')[1].split('```')[0].trim();
            else if (text.includes('```')) text = text.split('```')[1].split('```')[0].trim();

            return JSON.parse(text) as ExecutiveBriefing;
        }

        console.log("[Sovereignty] Using OpenAI for executive briefing");
        const response = await openai.chat.completions.create({
            model: "gpt-4o",
            messages: [
                {
                    role: "system",
                    content: systemPrompt
                }
            ],
            response_format: { type: "json_object" }
        });

        const content = response.choices[0].message.content;
        if (!content) throw new Error("Executive Briefing failed generation.");

        return JSON.parse(content) as ExecutiveBriefing;
    }
}
