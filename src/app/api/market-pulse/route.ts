import { NextResponse } from 'next/server';
import * as Sentry from '@sentry/nextjs';

import { CLAUDE_MODEL, getAnthropic } from '@/lib/anthropic';
import { getServerSession } from '@/lib/auth-server';
import { supabaseAdmin } from '@/lib/supabase';

const FALLBACK_TRIGGERS = ['Status', 'Scarcity', 'Utility', 'Authority', 'Social Proof'];

const WINDOW_OPTIONS = [30, 60, 90] as const;
const CACHE_TTL_HOURS = 24;

type IntelligenceFlag = {
    type: 'SATURATION SIGNAL' | 'UNTAPPED MECHANIC' | 'VELOCITY ALERT';
    finding: string;
    recommendation: string;
    asset_count: number;
};

type SourceAsset = {
    id: string;
    brand: string;
    sector: string;
    created_at: string;
};

type TriggerSourceAsset = SourceAsset & {
    score: number;
};

const averageMap = (totals: Record<string, number>, divisor: number) =>
    Object.entries(totals)
        .map(([label, value]) => ({
            label,
            value: Math.round(value / Math.max(divisor, 1)),
        }))
        .sort((a, b) => b.value - a.value);

const buildTriggerTotals = (assets: any[]) => {
    const totals: Record<string, number> = {};

    for (const asset of assets) {
        const dossier = asset.extraction?.full_dossier || {};
        const triggerDistribution = dossier?.archetype_mapping?.trigger_distribution || {};

        for (const [label, value] of Object.entries(triggerDistribution)) {
            if (typeof value === 'number') {
                totals[label] = (totals[label] || 0) + value;
            }
        }
    }

    return totals;
};

const percentileLabel = (position: number, total: number) => {
    if (total <= 1) return 'Insufficient benchmark depth';

    const percentile = position / total;
    if (percentile <= 0.2) return 'Top quintile for persuasion density';
    if (percentile <= 0.5) return 'Above category median';
    if (percentile <= 0.8) return 'Within category baseline';
    return 'Below category benchmark';
};

const clampWindowDays = (value: unknown) => {
    if (typeof value !== 'number') {
        return 30;
    }

    return WINDOW_OPTIONS.includes(value as (typeof WINDOW_OPTIONS)[number]) ? value : 30;
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

async function generateIntelligenceFlags(input: {
    dominantMechanics: { mechanic: string; count: number; share: number }[];
    mechanicVelocity: { mechanic: string; share: number; delta: number; direction: string }[];
    triggerProfile: { label: string; value: number }[];
    assetCount: number;
    sector: string;
}) {
    const fallbackFlags: IntelligenceFlag[] = [];

    const saturation = input.dominantMechanics.find((item) => item.share >= 60);
    if (saturation) {
        fallbackFlags.push({
            type: 'SATURATION SIGNAL',
            finding: `${saturation.mechanic} appears in ${saturation.share}% of ${input.sector} assets in your vault, suggesting mechanic fatigue may be building.`,
            recommendation: `Reduce direct dependence on ${saturation.mechanic} and introduce a contrasting posture before the category signal collapses into sameness.`,
            asset_count: saturation.count,
        });
    }

    const velocity = input.mechanicVelocity.find((item) => item.delta >= 25);
    if (velocity) {
        fallbackFlags.push({
            type: 'VELOCITY ALERT',
            finding: `${velocity.mechanic} has accelerated by ${velocity.delta}% across the active ${input.sector} window.`,
            recommendation: `Decide whether to ride ${velocity.mechanic} early or deliberately counter-program against it before the window closes.`,
            asset_count: Math.round((velocity.share / 100) * input.assetCount),
        });
    }

    const untapped = FALLBACK_TRIGGERS.find((trigger) => !input.triggerProfile.some((item) => item.label.toLowerCase() === trigger.toLowerCase() && item.value > 20));
    if (untapped) {
        fallbackFlags.push({
            type: 'UNTAPPED MECHANIC',
            finding: `${untapped} is materially underrepresented in this sector snapshot, leaving a usable persuasion gap.`,
            recommendation: `Prototype a creative route that makes ${untapped} the dominant signal while the category remains light on that trigger.`,
            asset_count: 0,
        });
    }

    const anthropic = getAnthropic();
    if (!anthropic || (input.dominantMechanics.length === 0 && input.mechanicVelocity.length === 0)) {
        return fallbackFlags.slice(0, 3);
    }

    try {
        const response = await anthropic.messages.create({
            model: CLAUDE_MODEL,
            max_tokens: 500,
            system: 'You generate concise strategic intelligence flags from aggregate market data. Return only valid JSON.',
            messages: [{
                role: 'user',
                content: `Given this aggregated Mechanic Intelligence data for ${input.sector}:
${JSON.stringify(input)}

Generate 3 JSON flags with this schema:
{
  "flags": [
    {
      "type": "SATURATION SIGNAL | UNTAPPED MECHANIC | VELOCITY ALERT",
      "finding": "string",
      "recommendation": "string",
      "asset_count": 0
    }
  ]
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
        const flags = Array.isArray(parsed.flags) ? parsed.flags : [];

        return flags
            .filter((flag: unknown): flag is IntelligenceFlag => {
                if (!flag || typeof flag !== 'object') return false;
                const candidate = flag as Record<string, unknown>;
                return typeof candidate.type === 'string'
                    && typeof candidate.finding === 'string'
                    && typeof candidate.recommendation === 'string'
                    && typeof candidate.asset_count === 'number';
            })
            .slice(0, 3);
    } catch (error) {
        console.error('[Market Pulse] Failed to generate intelligence flags:', error);
        return fallbackFlags.slice(0, 3);
    }
}

export async function POST(req: Request) {
    const session = await getServerSession(req);
    if (!session.userId) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    try {
        const { marketSector, assetId, windowDays } = await req.json();
        const selectedWindow = clampWindowDays(windowDays);
        const normalizedSector = typeof marketSector === 'string' && marketSector.trim().length > 0
            ? marketSector.trim()
            : null;
        const cacheKey = `${session.userId}:market-pulse:${selectedWindow}:${normalizedSector || 'ALL'}`;
        const now = Date.now();
        const currentWindowStart = now - selectedWindow * 24 * 60 * 60 * 1000;
        const previousWindowStart = now - selectedWindow * 2 * 24 * 60 * 60 * 1000;

        const { data: cachedSnapshot, error: cacheReadError } = await supabaseAdmin
            .from('intelligence_cache')
            .select('payload, computed_at, expires_at')
            .eq('cache_key', cacheKey)
            .eq('user_id', session.userId)
            .gt('expires_at', new Date().toISOString())
            .maybeSingle();

        if (cacheReadError) {
            throw cacheReadError;
        }

        if (cachedSnapshot?.payload && typeof cachedSnapshot.payload === 'object' && !Array.isArray(cachedSnapshot.payload)) {
            return NextResponse.json({
                ...(cachedSnapshot.payload as Record<string, unknown>),
                cached: true,
                computed_at: cachedSnapshot.computed_at,
            });
        }

        const { data: assets, error } = await supabaseAdmin
            .from('assets')
            .select(`
                id,
                created_at,
                user_id,
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

        const agencyAssets = (assets || []).filter((asset: any) => {
            return asset.user_id === session.userId;
        });

        const scopedAssets = agencyAssets.filter((asset: any) => {
            if (!normalizedSector) return true;
            return asset.brands?.market_sector === normalizedSector;
        });

        const pulseAssets = scopedAssets
            .map((asset: any) => {
                const extraction = Array.isArray(asset.extractions) ? asset.extractions[0] : asset.extractions;
                return extraction ? { ...asset, extraction } : null;
            })
            .filter(Boolean) as any[];
        const agencyPulseAssets = agencyAssets
            .map((asset: any) => {
                const extraction = Array.isArray(asset.extractions) ? asset.extractions[0] : asset.extractions;
                return extraction ? { ...asset, extraction } : null;
            })
            .filter(Boolean) as any[];

        if (pulseAssets.length === 0) {
            const emptyPayload = {
                status: 'success',
                scope: normalizedSector || 'Vault-wide',
                sector_options: [],
                window_days: selectedWindow,
                assetCount: 0,
                mechanic_velocity: [],
                intelligence_flags: [],
                dominant_mechanics: [],
                category_trigger_profile: [],
                vault_trigger_profile: [],
                category_persuasion_benchmark: {
                    avg_density: 0,
                    avg_friction: 0,
                    your_rank: 'Insufficient benchmark depth',
                },
                chromatic_saturation: [],
                opportunity_gaps: [],
            };

            await supabaseAdmin
                .from('intelligence_cache')
                .upsert({
                    user_id: session.userId,
                    cache_key: cacheKey,
                    route: 'market-pulse',
                    sector_filter: normalizedSector,
                    window_days: selectedWindow,
                    payload: emptyPayload,
                    computed_at: new Date().toISOString(),
                    expires_at: new Date(Date.now() + CACHE_TTL_HOURS * 60 * 60 * 1000).toISOString(),
                }, { onConflict: 'cache_key' });

            return NextResponse.json({
                ...emptyPayload,
                cached: false,
                computed_at: new Date().toISOString(),
            });
        }

        const mechanicCounts: Record<string, number> = {};
        const currentWindowMechanics: Record<string, number> = {};
        const previousWindowMechanics: Record<string, number> = {};
        const triggerTotals: Record<string, number> = {};
        const colorCounts: Record<string, number> = {};
        const mechanicAssets: Record<string, SourceAsset[]> = {};
        const triggerAssets: Record<string, TriggerSourceAsset[]> = {};
        const densities: { assetId: string; value: number }[] = [];
        const frictions: number[] = [];

        for (const asset of pulseAssets) {
            const extraction = asset.extraction;
            const dossier = extraction.full_dossier || {};

            if (extraction.primary_mechanic) {
                mechanicCounts[extraction.primary_mechanic] = (mechanicCounts[extraction.primary_mechanic] || 0) + 1;
                mechanicAssets[extraction.primary_mechanic] = mechanicAssets[extraction.primary_mechanic] || [];
                mechanicAssets[extraction.primary_mechanic].push({
                    id: asset.id,
                    brand: typeof asset.brands?.name === 'string' && asset.brands.name.trim().length > 0 ? asset.brands.name : 'Untitled Brand',
                    sector: typeof asset.brands?.market_sector === 'string' && asset.brands.market_sector.trim().length > 0 ? asset.brands.market_sector : 'Other',
                    created_at: asset.created_at,
                });
            }

            const createdAt = new Date(asset.created_at).getTime();
            if (!Number.isNaN(createdAt) && extraction.primary_mechanic) {
                if (createdAt >= currentWindowStart) {
                    currentWindowMechanics[extraction.primary_mechanic] = (currentWindowMechanics[extraction.primary_mechanic] || 0) + 1;
                } else if (createdAt >= previousWindowStart) {
                    previousWindowMechanics[extraction.primary_mechanic] = (previousWindowMechanics[extraction.primary_mechanic] || 0) + 1;
                }
            }

            const triggerDistribution = dossier?.archetype_mapping?.trigger_distribution || {};
            for (const [label, value] of Object.entries(triggerDistribution)) {
                if (typeof value === 'number') {
                    triggerTotals[label] = (triggerTotals[label] || 0) + value;
                    triggerAssets[label] = triggerAssets[label] || [];
                    triggerAssets[label].push({
                        id: asset.id,
                        brand: typeof asset.brands?.name === 'string' && asset.brands.name.trim().length > 0 ? asset.brands.name : 'Untitled Brand',
                        sector: typeof asset.brands?.market_sector === 'string' && asset.brands.market_sector.trim().length > 0 ? asset.brands.market_sector : 'Other',
                        created_at: asset.created_at,
                        score: value,
                    });
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

        const sectorOptions = Array.from<string>(
            new Set(
                agencyAssets
                    .map((asset: any) => asset.brands?.market_sector)
                    .filter((value: unknown): value is string => typeof value === 'string' && value.trim().length > 0)
            )
        ).sort((a, b) => a.localeCompare(b));

        const currentWindowTotal = Object.values(currentWindowMechanics).reduce((sum, value) => sum + value, 0);
        const previousWindowTotal = Object.values(previousWindowMechanics).reduce((sum, value) => sum + value, 0);

        const mechanicVelocity = Object.entries(currentWindowMechanics)
            .map(([mechanic, count]) => {
                const currentShare = currentWindowTotal > 0 ? Math.round((count / currentWindowTotal) * 100) : 0;
                const previousCount = previousWindowMechanics[mechanic] || 0;
                const previousShare = previousWindowTotal > 0 ? Math.round((previousCount / previousWindowTotal) * 100) : 0;
                const delta = currentShare - previousShare;

                return {
                    mechanic,
                    share: currentShare,
                    delta,
                    direction: delta > 3 ? 'up' : delta < -3 ? 'down' : 'flat',
                    assets: (mechanicAssets[mechanic] || [])
                        .slice()
                        .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
                        .slice(0, 6),
                };
            })
            .sort((a, b) => b.share - a.share)
            .slice(0, 6);

        const categoryTriggerProfile = averageMap(triggerTotals, pulseAssets.length);
        const vaultTriggerProfile = averageMap(buildTriggerTotals(agencyPulseAssets), agencyPulseAssets.length);
        const triggerDrivers = Object.fromEntries(
            Object.entries(triggerAssets).map(([label, assets]) => [
                label,
                assets
                    .slice()
                    .sort((a, b) => {
                        if (b.score !== a.score) return b.score - a.score;
                        return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
                    })
                    .slice(0, 3),
            ])
        );
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
        const intelligenceFlags = await generateIntelligenceFlags({
            dominantMechanics,
            mechanicVelocity,
            triggerProfile: categoryTriggerProfile,
            assetCount: pulseAssets.length,
            sector: normalizedSector || 'Vault-wide',
        });

        const payload = {
            status: 'success',
            scope: normalizedSector || 'Vault-wide',
            sector_options: sectorOptions,
            window_days: selectedWindow,
            assetCount: pulseAssets.length,
            mechanic_velocity: mechanicVelocity,
            intelligence_flags: intelligenceFlags,
            dominant_mechanics: dominantMechanics,
            category_trigger_profile: categoryTriggerProfile,
            vault_trigger_profile: vaultTriggerProfile,
            trigger_drivers: triggerDrivers,
            category_persuasion_benchmark: {
                avg_density: avgDensity,
                avg_friction: avgFriction,
                your_rank: assetPosition ? percentileLabel(assetPosition, densityRanking.length) : 'Category-wide benchmark',
            },
            chromatic_saturation: chromaticSaturation,
            opportunity_gaps: opportunityGaps,
        };
        const computedAt = new Date().toISOString();

        await supabaseAdmin
            .from('intelligence_cache')
            .upsert({
                user_id: session.userId,
                cache_key: cacheKey,
                route: 'market-pulse',
                sector_filter: normalizedSector,
                window_days: selectedWindow,
                payload,
                computed_at: computedAt,
                expires_at: new Date(Date.now() + CACHE_TTL_HOURS * 60 * 60 * 1000).toISOString(),
            }, { onConflict: 'cache_key' });

        return NextResponse.json({
            ...payload,
            cached: false,
            computed_at: computedAt,
        });
    } catch (error) {
        Sentry.captureException(error, {
            extra: {
                route: 'market-pulse',
                userId: session.userId,
            },
        });
        console.error('[Market Pulse] Failed to build pulse:', error);
        return NextResponse.json({ error: 'Failed to build Market Pulse' }, { status: 500 });
    }
}
