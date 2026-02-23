import { supabaseAdmin } from './supabase';
import OpenAI from 'openai';

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

        const rawScore = boardDensityFactor + adDensityFactor + confidenceFactor + anomalyDensityFactor + marketVelocityFactor + resonanceFactor + edgyFactor;
        return Math.min(Math.round(rawScore), 100);
    }

    /**
     * Aggregates agency-wide metrics from Supabase.
     */
    static async getAgencyMetrics(): Promise<AgencyMetrics> {
        const { count: boardCount } = await supabaseAdmin.from('strategic_boards').select('*', { count: 'exact', head: true });
        const { count: adCount } = await supabaseAdmin.from('ad_digests').select('*', { count: 'exact', head: true });

        // In a real scenario, we'd query anomaly trends and prediction performance
        // For now, we simulate high-density aggregate stats
        return {
            totalBoards: boardCount || 0,
            totalAds: adCount || 0,
            avgConfidence: 0.88,
            anomalyCount: 24,
            marketVelocity: 0.75,
            predictionAccuracy: 0.92,
            trendResonance: 0.68,
            edgySignalDensity: 0.42
        };
    }

    /**
     * Generates a high-level executive briefing using GPT-4o.
     */
    static async generateBriefing(metrics: AgencyMetrics): Promise<ExecutiveBriefing> {
        const response = await openai.chat.completions.create({
            model: "gpt-4o",
            messages: [
                {
                    role: "system",
                    content: `You are the Executive Command Intelligence of the Strategic Laboratory. 
                    Your task is to synthesize agency-wide metrics into actionable directives for the CEO.
                    
                    Metrics:
                    - Total Strategic Boards: ${metrics.totalBoards}
                    - Active Analytics: ${metrics.totalAds} ads
                    - Anomaly Detection: ${metrics.anomalyCount} active clusters
                    - Prediction Accuracy: ${metrics.predictionAccuracy * 100}%
                    - Trend Resonance: ${metrics.trendResonance * 100}%
                    - Edgy Signal Density: ${metrics.edgySignalDensity * 100}%
                    
                    Return a JSON object with:
                    - macroNarrative: A 2-sentence summary of the current market state.
                    - commandDirectives: 3-4 bullet-point executive orders.
                    - criticalRiskLevel: LOW, MEDIUM, or HIGH.
                    - strategicMoat: 1 sentence on the agency's current competitive advantage.`
                }
            ],
            response_format: { type: "json_object" }
        });

        const content = response.choices[0].message.content;
        if (!content) throw new Error("Executive Briefing failed generation.");

        return JSON.parse(content) as ExecutiveBriefing;
    }
}
