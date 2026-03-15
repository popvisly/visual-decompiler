import { NextResponse } from 'next/server';

import { CLAUDE_MODEL, getAnthropic } from '@/lib/anthropic';
import { getServerSession } from '@/lib/auth-server';
import { supabaseAdmin } from '@/lib/supabase';

const FALLBACK_TRIGGERS = ['Status', 'Scarcity', 'Utility', 'Authority', 'Social Proof'];

const averageMap = (totals: Record<string, number>, divisor: number) =>
    Object.entries(totals)
        .map(([label, value]) => ({
            label,
            value: Math.round(value / Math.max(divisor, 1)),
        }))
        .sort((a, b) => b.value - a.value);

const percentileLabel = (position: number, total: number) => {
    if (total <= 1) return 'Insufficient benchmark depth';

    const percentile = position / total;
    if (percentile <= 0.2) return 'Top quintile for persuasion density';
    if (percentile <= 0.5) return 'Above category median';
    if (percentile <= 0.8) return 'Within category baseline';
    return 'Below category benchmark';
};

async function generateOpportunityGaps(mechanics: string[]) {
    const anthropic = getAnthropic();
    if (!anthropic || mechanics.length === 0) {
        return FALLBACK_TRIGGERS.filter((label) => !mechanics.some((item) => item.toLowerCase().includes(label.toLowerCase()))).slice(0, 3);
    }

    try {
        const response = await anthropic.messages.create({
            model: CLAUDE_MODEL,
            max_tokens: 300,
            system: 'You identify strategic whitespace in creative category mechanics. Return only valid JSON.',
            messages: [{
                role: 'user',
                content: `Given these dominant persuasion mechanics in a category: ${JSON.stringify(mechanics)}.

Return JSON:
{
  "opportunity_gaps": ["3 short whitespace opportunities phrased as strategic mechanic gaps"]
}`,
            }],
        });

        const text = response.content
            .filter((block) => block.type === 'text')
            .map((block) => block.text)
            .join('\n');
        const start = text.indexOf('{');
        const end = text.lastIndexOf('}');
        const parsed = JSON.parse(text.slice(start, end + 1));
        return Array.isArray(parsed.opportunity_gaps)
            ? parsed.opportunity_gaps.filter((item: unknown) => typeof item === 'string').slice(0, 3)
            : [];
    } catch (error) {
        console.error('[Market Pulse] Failed to generate opportunity gaps:', error);
        return FALLBACK_TRIGGERS.filter((label) => !mechanics.some((item) => item.toLowerCase().includes(label.toLowerCase()))).slice(0, 3);
    }
}

export async function POST(req: Request) {
    const session = await getServerSession(req);
    if (!session.userId) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    try {
        const { marketSector, assetId } = await req.json();

        const { data: assets, error } = await supabaseAdmin
            .from('assets')
            .select(`
                id,
                brands ( name, market_sector ),
                extractions!inner (
                    primary_mechanic,
                    color_palette,
                    full_dossier
                )
            `);

        if (error) {
            throw error;
        }

        const scopedAssets = (assets || []).filter((asset: any) => {
            if (!marketSector) return true;
            return asset.brands?.market_sector === marketSector;
        });

        const pulseAssets = scopedAssets
            .map((asset: any) => {
                const extraction = Array.isArray(asset.extractions) ? asset.extractions[0] : asset.extractions;
                return extraction ? { ...asset, extraction } : null;
            })
            .filter(Boolean) as any[];

        if (pulseAssets.length === 0) {
            return NextResponse.json({
                status: 'success',
                scope: marketSector || 'Vault-wide',
                assetCount: 0,
                dominant_mechanics: [],
                category_trigger_profile: [],
                category_persuasion_benchmark: {
                    avg_density: 0,
                    avg_friction: 0,
                    your_rank: 'Insufficient benchmark depth',
                },
                chromatic_saturation: [],
                opportunity_gaps: [],
            });
        }

        const mechanicCounts: Record<string, number> = {};
        const triggerTotals: Record<string, number> = {};
        const colorCounts: Record<string, number> = {};
        const densities: { assetId: string; value: number }[] = [];
        const frictions: number[] = [];

        for (const asset of pulseAssets) {
            const extraction = asset.extraction;
            const dossier = extraction.full_dossier || {};

            if (extraction.primary_mechanic) {
                mechanicCounts[extraction.primary_mechanic] = (mechanicCounts[extraction.primary_mechanic] || 0) + 1;
            }

            const triggerDistribution = dossier?.archetype_mapping?.trigger_distribution || {};
            for (const [label, value] of Object.entries(triggerDistribution)) {
                if (typeof value === 'number') {
                    triggerTotals[label] = (triggerTotals[label] || 0) + value;
                }
            }

            for (const color of Array.isArray(extraction.color_palette) ? extraction.color_palette : []) {
                if (typeof color === 'string') {
                    colorCounts[color] = (colorCounts[color] || 0) + 1;
                }
            }

            const metrics = dossier?.persuasion_metrics;
            if (typeof metrics?.persuasion_density === 'number') {
                densities.push({ assetId: asset.id, value: metrics.persuasion_density });
            }
            if (typeof metrics?.cognitive_friction === 'number') {
                frictions.push(metrics.cognitive_friction);
            }
        }

        const dominantMechanics = Object.entries(mechanicCounts)
            .map(([mechanic, count]) => ({
                mechanic,
                count,
                share: Math.round((count / pulseAssets.length) * 100),
            }))
            .sort((a, b) => b.count - a.count)
            .slice(0, 5);

        const categoryTriggerProfile = averageMap(triggerTotals, pulseAssets.length);
        const avgDensity = densities.length > 0
            ? Math.round(densities.reduce((sum, item) => sum + item.value, 0) / densities.length)
            : 0;
        const avgFriction = frictions.length > 0
            ? Math.round(frictions.reduce((sum, value) => sum + value, 0) / frictions.length)
            : 0;

        const densityRanking = [...densities].sort((a, b) => b.value - a.value);
        const assetPosition = assetId
            ? Math.max(1, densityRanking.findIndex((item) => item.assetId === assetId) + 1)
            : 0;

        const chromaticSaturation = Object.entries(colorCounts)
            .map(([hex, count]) => ({ hex, count }))
            .sort((a, b) => b.count - a.count)
            .slice(0, 6);

        const opportunityGaps = await generateOpportunityGaps(dominantMechanics.map((item) => item.mechanic));

        return NextResponse.json({
            status: 'success',
            scope: marketSector || 'Vault-wide',
            assetCount: pulseAssets.length,
            dominant_mechanics: dominantMechanics,
            category_trigger_profile: categoryTriggerProfile,
            category_persuasion_benchmark: {
                avg_density: avgDensity,
                avg_friction: avgFriction,
                your_rank: assetPosition ? percentileLabel(assetPosition, densityRanking.length) : 'Category-wide benchmark',
            },
            chromatic_saturation: chromaticSaturation,
            opportunity_gaps: opportunityGaps,
        });
    } catch (error) {
        console.error('[Market Pulse] Failed to build pulse:', error);
        return NextResponse.json({ error: 'Failed to build Market Pulse' }, { status: 500 });
    }
}
