import OpenAI from 'openai';

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

export type ShockTemplate = {
    id: string;
    alias: string;
    description: string;
};

export const SHOCK_TEMPLATES: ShockTemplate[] = [
    { id: 'recession', alias: 'Luxury Recession', description: 'Consumer spending pivots to deep value and utility-first messaging.' },
    { id: 'ai-reg', alias: 'AI Regulation Surge', description: 'Sudden legal constraints on synthetic media and algorithmic targeting.' },
    { id: 'viral-backlash', alias: 'Viral Backlash', description: 'Category-wide trust collapse due to transparency failures.' },
    { id: 'aesthetic-shift', alias: 'Hyper-Minimalist Pivot', description: 'Market abandons maximalism in favor of extreme, raw simplicity.' }
];

export type ProjectionResult = {
    durabilityScore: number;
    shiftedMetrics: any;
    impactReport: string;
};

export class SimulationService {
    /**
     * Projects the impact of a market shock on board metrics using GPT-4o.
     */
    static async runSimulation(boardMetrics: any, shockId: string): Promise<ProjectionResult> {
        const shock = SHOCK_TEMPLATES.find(s => s.id === shockId) || SHOCK_TEMPLATES[0];

        const prompt = `
            ACT AS A STRATEGIC FORECASTER.
            A marketing agency has an ad collection (Board) with the following DNA metrics:
            Emotional: ${boardMetrics.emotional * 100}%
            Intellectual: ${boardMetrics.intellectual * 100}%
            Production: ${boardMetrics.production * 100}%
            Aggression: ${boardMetrics.aggression * 100}%
            Consistency: ${boardMetrics.consistency * 100}%

            MARKET SHOCK EVENT: ${shock.alias}
            DESCRIPTION: ${shock.description}

            TASK:
            1. Project how these metrics will realistically shift under this shock (0-1 range).
            2. Calculate a "Strategic Durability Score" (0-100) based on how well the current DNA survives the shock.
            3. Provide a concise (2-3 sentence) "Impact Report" identifying the biggest vulnerability.

            RETURN JSON ONLY in this format:
            {
                "shiftedMetrics": { "emotional": float, "intellectual": float, "production": float, "aggression": float, "consistency": float },
                "durabilityScore": int,
                "impactReport": string
            }
        `;

        try {
            const response = await openai.chat.completions.create({
                model: 'gpt-4o',
                messages: [{ role: 'user', content: prompt }],
                response_format: { type: 'json_object' }
            });

            const content = response.choices[0].message.content;
            if (!content) throw new Error('Empty AI response');

            const result = JSON.parse(content);
            return {
                durabilityScore: result.durabilityScore,
                shiftedMetrics: result.shiftedMetrics,
                impactReport: result.impactReport
            };
        } catch (error) {
            console.error('[Simulation Error]', error);
            // Fallback mock
            return {
                durabilityScore: 65,
                shiftedMetrics: {
                    emotional: boardMetrics.emotional * 0.8,
                    intellectual: boardMetrics.intellectual * 1.2,
                    production: boardMetrics.production * 0.7,
                    aggression: boardMetrics.aggression,
                    consistency: boardMetrics.consistency * 0.9
                },
                impactReport: 'Fallback: Significant degradation in production value resonance detected. Pivot towards intellectual utility recommended.'
            };
        }
    }
}
