import { supabaseAdmin } from './supabase';

export type BenchmarkMetrics = {
    emotionalResonance: number;
    intellectualComplexity: number;
    productionVelocity: number;
    strategicAggression: number;
    brandConsistency: number;
};

export type BenchmarkData = {
    category: string;
    average: BenchmarkMetrics;
    board: BenchmarkMetrics;
    ideal: {
        title: string;
        description: string;
        strategy: string;
    };
    gaps: {
        dimension: keyof BenchmarkMetrics;
        opportunity: 'high' | 'medium' | 'low';
        description: string;
    }[];
};

export class BenchmarkService {
    /**
     * Aggregates metrics from a board and compares them against a category benchmark.
     */
    static async getBenchmark(boardId: string): Promise<BenchmarkData> {
        // 1. Fetch Board & Items
        const { data: board, error: boardError } = await supabaseAdmin
            .from('boards')
            .select(`
                name,
                board_items(ad_id)
            `)
            .eq('id', boardId)
            .single();

        if (boardError || !board) throw new Error("Board not found");

        const adIds = board.board_items.map((i: any) => i.ad_id);
        if (adIds.length === 0) throw new Error("No assets in board to benchmark");

        // 2. Fetch Digests for these ads
        const { data: digests, error: digestsError } = await supabaseAdmin
            .from('ad_digests')
            .select('digest')
            .in('id', adIds)
            .eq('status', 'processed');

        if (digestsError || !digests) throw new Error("Failed to fetch deconstructions");

        // 3. Calculate Board DNA (Average of metrics if we had them, otherwise heuristic from sentiment/strategy)
        const boardMetrics = this.calculateAverageMetrics(digests.map((d: any) => d.digest));

        // 4. Determine Category (Guess based on brand or first few ads)
        const category = digests[0].digest.meta?.brand_guess || 'General Performance';

        // 5. Simulate/Fetch Category Baseline (In a real system, this would be a query across all ads in that category)
        const categoryAverage: BenchmarkMetrics = {
            emotionalResonance: 0.65,
            intellectualComplexity: 0.45,
            productionVelocity: 0.75,
            strategicAggression: 0.55,
            brandConsistency: 0.8,
        };

        // 6. Generate "The Platonic Ideal" & Gaps via API (or Mock for now, then move to LLM)
        const gaps = this.identifyGaps(boardMetrics, categoryAverage);

        return {
            category,
            average: categoryAverage,
            board: boardMetrics,
            ideal: {
                title: "The Silent Authority Move",
                description: `The ${category} category is currently over-saturated with high-production, low-resonance noise.`,
                strategy: "Shift toward 'Clinical Minimalism.' Use high-contrast macro shots and zero background music to create a vacuum of attention. The goal is to under-index on production velocity but over-index on intellectual complexity."
            },
            gaps
        };
    }

    private static calculateAverageMetrics(digests: any[]): BenchmarkMetrics {
        // This is a placeholder for real metric extraction from LLM output
        // For now, we generate stable heuristics based on the digest content
        const count = digests.length || 1;

        const sum = digests.reduce((acc, d: any) => {
            acc.emotionalResonance += (d.strategy?.psychological_hook ? 0.8 : 0.4);
            acc.intellectualComplexity += (d.strategy?.semiotic_subtext ? 0.7 : 0.3);
            acc.productionVelocity += (d.extraction?.pacing === 'fast' ? 0.9 : 0.5);
            acc.strategicAggression += (d.strategy?.competitive_advantage ? 0.75 : 0.4);
            acc.brandConsistency += 0.7; // Default
            return acc;
        }, { emotionalResonance: 0, intellectualComplexity: 0, productionVelocity: 0, strategicAggression: 0, brandConsistency: 0 });

        return {
            emotionalResonance: sum.emotionalResonance / count,
            intellectualComplexity: sum.intellectualComplexity / count,
            productionVelocity: sum.productionVelocity / count,
            strategicAggression: sum.strategicAggression / count,
            brandConsistency: sum.brandConsistency / count,
        };
    }

    private static identifyGaps(board: BenchmarkMetrics, avg: BenchmarkMetrics): BenchmarkData['gaps'] {
        const dimensions: (keyof BenchmarkMetrics)[] = ['emotionalResonance', 'intellectualComplexity', 'productionVelocity', 'strategicAggression', 'brandConsistency'];

        return dimensions.map(d => {
            const diff = board[d] - avg[d];
            let opportunity: 'high' | 'medium' | 'low' = 'low';
            let description = '';

            if (diff < -0.2) {
                opportunity = 'high';
                description = `Significant whitespace. The category relies on this dimension but your board is under-indexed.`;
            } else if (diff > 0.2) {
                opportunity = 'low';
                description = `Market saturated. You are out-pacing the category average, leading to Diminishing returns.`;
            } else {
                opportunity = 'medium';
                description = `Maintaining parity with category leaders.`;
            }

            return { dimension: d, opportunity, description };
        });
    }
}
