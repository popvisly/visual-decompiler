import { MeshService, MacroCluster } from './mesh_service';
import OpenAI from 'openai';

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

export type TrendPrediction = {
    title: string;
    description: string;
    confidence: number;
    projectedDNA: any;
    exhaustionDate: string;
    counterTrend: string;
};

export class PredictionService {
    /**
     * Generates autonomous trend predictions based on global mesh clusters.
     */
    static async predictTrends(orgId: string): Promise<TrendPrediction[]> {
        // 1. Get current mesh clusters
        const { clusters } = await MeshService.getGlobalMesh(orgId);

        if (clusters.length === 0) {
            return [this.getFallbackPrediction()];
        }

        // 2. Project future pivots using GPT-4o
        const predictionPrompt = `
            ACT AS AN AUTONOMOUS STRATEGIC ORACLE.
            You have a set of "Macro clusters" representing current synchronized market shifts across multiple brands.
            
            CURRENT CLUSTERS:
            ${clusters.map(c => `- Title: ${c.title}, Description: ${c.description}, Dimension: ${c.dominantDimension}`).join('\n')}

            TASK:
            1. Analyze the "Aesthetic Exhaustion" of these trends.
            2. Predict the next logical "Counter-Trend" (e.g., if clusters show 'Hyper-Maximalism', predict the pivot to 'Brutal Minimalism').
            3. Project the Strategic Radar dna (0-1) for this new trend.
            4. Assign a confidence score (0-100).
            5. Estimate how many days until the current trends reach peak saturation (exhaustion).

            RETURN JSON ONLY:
            {
                "predictions": [
                    { 
                        "title": string, 
                        "description": string, 
                        "confidence": int, 
                        "projectedDNA": { "emotional": float, "intellectual": float, "production": float, "aggression": float, "consistency": float },
                        "exhaustionDays": int,
                        "counterTrend": string
                    }
                ]
            }
        `;

        try {
            const response = await openai.chat.completions.create({
                model: 'gpt-4o',
                messages: [{ role: 'user', content: predictionPrompt }],
                response_format: { type: 'json_object' }
            });

            const content = response.choices[0].message.content;
            const result = content ? JSON.parse(content) : { predictions: [] };

            return result.predictions.map((p: any) => ({
                title: p.title,
                description: p.description,
                confidence: p.confidence,
                projectedDNA: p.projectedDNA,
                exhaustionDate: new Date(Date.now() + p.exhaustionDays * 24 * 60 * 60 * 1000).toISOString(),
                counterTrend: p.counterTrend
            }));
        } catch (error) {
            console.error('[PredictionService Error]', error);
            return [this.getFallbackPrediction()];
        }
    }

    private static getFallbackPrediction(): TrendPrediction {
        return {
            title: 'Synthetic Realism Pivot',
            description: 'Market saturation of AI-generated perfection leads to a high-velocity pivot toward raw, unpolished realism.',
            confidence: 82,
            projectedDNA: { emotional: 0.9, intellectual: 0.4, production: 0.2, aggression: 0.6, consistency: 0.8 },
            exhaustionDate: new Date(Date.now() + 45 * 24 * 60 * 60 * 1000).toISOString(),
            counterTrend: 'Manual Authenticity'
        };
    }
}
