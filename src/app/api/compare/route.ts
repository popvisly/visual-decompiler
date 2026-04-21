import { NextResponse } from 'next/server';
import { getAnthropic, getClaudeModel } from '@/lib/anthropic';
import { getServerSession } from '@/lib/auth-server';
import { supabaseAdmin } from '@/lib/supabase';
import { DIFFERENTIAL_DIAGNOSTIC_PROMPT } from '@/lib/prompts';

const DIFFERENTIAL_STYLE_CONTRACT = [
    'STYLE CONTRACT (MANDATORY): Use clean strategy language that is calm, direct, and boardroom-ready.',
    '- Write short, decisive sentences.',
    '- Prefer plain strategic wording over abstract jargon.',
    '- Avoid repetition, filler, and phrase stacking.',
    '- Keep findings specific, comparative, and decision-oriented.',
    '- Keep prose in sentence case (no random ALL CAPS blocks in narrative copy).',
    '- Never output truncated fragments, dangling clauses, or half-finished quotes.',
].join('\n');

// SCHEMA 1: Differential Diagnostics interface
export interface DifferentialDiagnosticResponse {
    diagnostic_id: string;
    status: 'success' | 'error';
    macro_synthesis: {
        primary_shift: string;
        strategic_delta_summary: string;
    };
    matrix_cubes: {
        winning_variant: {
            label: string;
            rationale: string;
            winner: 'a' | 'b';
        };
        psychological_edge: {
            trigger: string;
            delta: string;
        };
        fatigue_differential: {
            longevity_delta: string;
            comparison: string;
        };
    };
    behavioral_bars: {
        persuasion_density: { a: number; b: number };
        cognitive_friction: { a: number; b: number };
    };
    radar_metrics: {
        axes: string[];
        asset_a_scores: number[];
        asset_b_scores: number[];
    };
    semiotic_shifts: Array<{
        variable_isolated: string;
        asset_a_state: string;
        asset_b_state: string;
        impact_on_conversion: string;
    }>;
}


function cleanStrategyLine(value: string): string {
    const compact = value
        .replace(/\s+/g, ' ')
        .replace(/\s*([,:;.!?])\s*/g, '$1 ')
        .replace(/\s{2,}/g, ' ')
        .replace(/\bam i\b/gi, 'am I')
        .replace(/\bi'm\b/gi, "I'm")
        .trim();

    if (!compact) return compact;

    const noDangling = compact.replace(/[\u2014\-:;,]+$/g, '').trim();
    if (!noDangling) return compact;

    return noDangling.charAt(0).toUpperCase() + noDangling.slice(1);
}

function normalizeStrategyLanguage(input: unknown): unknown {
    if (typeof input === 'string') return cleanStrategyLine(input);
    if (Array.isArray(input)) return input.map((item) => normalizeStrategyLanguage(item));
    if (input && typeof input === 'object') {
        return Object.fromEntries(
            Object.entries(input as Record<string, unknown>).map(([key, value]) => [key, normalizeStrategyLanguage(value)]),
        );
    }
    return input;
}

export async function POST(req: Request) {
    try {
        const session = await getServerSession(req);
        if (!session.userId) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const { assetAId, assetBId } = await req.json();

        if (!assetAId || !assetBId) {
            return NextResponse.json({ error: 'assetAId and assetBId are required' }, { status: 400 });
        }

        // 1. Fetch assets and extractions from the intelligence vault
        const [assetA, assetB] = await Promise.all([
            supabaseAdmin.from('assets').select('*, extractions(*)').eq('id', assetAId).single(),
            supabaseAdmin.from('assets').select('*, extractions(*)').eq('id', assetBId).single()
        ]);

        if (!assetA.data || !assetB.data) {
            return NextResponse.json({ error: 'One or both assets not found' }, { status: 404 });
        }

        // 2. Prepare the Anthropic request
        const anthropic = getAnthropic();
        const model = getClaudeModel('agency'); // Use most capable model for comparison

        const systemPrompt = `${DIFFERENTIAL_DIAGNOSTIC_PROMPT}\n\n${DIFFERENTIAL_STYLE_CONTRACT}`;

        const userMessage = `Compare these two asset extractions and provide the Differential Diagnostic JSON following the requested schema.
Asset A Data:
${JSON.stringify(assetA.data, null, 2)}
Asset A Forensic Extraction:
${JSON.stringify(assetA.data.extractions?.length ? assetA.data.extractions[0] : {}, null, 2)}

Asset B Data:
${JSON.stringify(assetB.data, null, 2)}
Asset B Forensic Extraction:
${JSON.stringify(assetB.data.extractions?.length ? assetB.data.extractions[0] : {}, null, 2)}`;

        // 3. Call Claude
        const response = await anthropic!.messages.create({
            model,
            max_tokens: 4096,
            system: systemPrompt,
            messages: [{ role: 'user', content: userMessage }],
        });

        const contentBlock = response.content.find((block) => block.type === 'text');
        if (!contentBlock) throw new Error("Claude returned no text response");

        let text = contentBlock.text;
        if (text.includes('```json')) {
            text = text.split('```json')[1].split('```')[0].trim();
        } else if (text.includes('```')) {
            text = text.split('```')[1].split('```')[0].trim();
        }

        const rawResult = JSON.parse(text) as DifferentialDiagnosticResponse;
        const result = normalizeStrategyLanguage(rawResult) as DifferentialDiagnosticResponse;

        const { data: agency } = await supabaseAdmin
            .from('agencies')
            .select('id')
            .limit(1)
            .single();

        const payload = {
            ...result,
            asset_a_id: assetAId,
            asset_b_id: assetBId,
        };

        const { data: pulseResult, error: pulseError } = await supabaseAdmin
            .from('pulse_results')
            .insert({
                agency_id: agency?.id || null,
                asset_a_id: assetAId,
                asset_b_id: assetBId,
                differential_analysis: payload,
            })
            .select('id')
            .single();

        if (pulseError) {
            console.error('[Differential Diagnostic] Failed to persist pulse result:', pulseError);
        }

        return NextResponse.json({
            ...result,
            pulse_result_id: pulseResult?.id || null,
        });

    } catch (error: any) {
        console.error('[Differential Diagnostic Error]:', error);
        return NextResponse.json({ status: 'error', error: error.message }, { status: 500 });
    }
}
