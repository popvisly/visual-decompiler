import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';

export async function POST(req: Request) {
    try {
        const { adId, trigger_mechanic, narrative_framework } = await req.json();

        // 1. Fetch global tactical density for this combination
        const { data: patterns } = await supabaseAdmin
            .from('global_strategic_patterns')
            .select('*')
            .eq('trigger_mechanic', trigger_mechanic)
            .eq('narrative_framework', narrative_framework)
            .single();

        // 2. Heuristic: If pattern is ubiquitous (high count), ROI might be lower due to saturation
        // If pattern is rare but has high confidence, ROI might be an "Innovation Opportunity"
        let roiScore = 70; // Baseline
        let rationale = "Healthy strategic alignment with market standards.";

        if (patterns) {
            const volume = patterns.occurrence_count;
            if (volume > 50) {
                roiScore -= 15;
                rationale = "Strategic saturation detected. This tactical combination is highly competitive.";
            } else if (volume < 5 && patterns.avg_confidence > 0.85) {
                roiScore += 20;
                rationale = "Innovation Opportunity: Rare but high-confidence strategic pattern identified.";
            }
        }

        return NextResponse.json({
            score: Math.min(100, Math.max(0, roiScore)),
            rationale,
            market_volume: patterns?.occurrence_count || 0
        });
    } catch (err: any) {
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}
