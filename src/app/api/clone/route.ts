import { NextResponse } from 'next/server';

import { getAnthropic, getClaudeModel } from '@/lib/anthropic';
import { getServerSession } from '@/lib/auth-server';
import { supabaseAdmin } from '@/lib/supabase';

const extractJsonObject = (value: string) => {
    const fenced = value.match(/```json\s*([\s\S]*?)```/i) || value.match(/```\s*([\s\S]*?)```/i);
    const candidate = fenced?.[1] || value;
    const start = candidate.indexOf('{');
    const end = candidate.lastIndexOf('}');

    if (start === -1 || end === -1 || end <= start) {
        throw new Error('Clone Engine returned malformed JSON.');
    }

    return JSON.parse(candidate.slice(start, end + 1));
};

export async function POST(req: Request) {
    const session = await getServerSession(req);
    if (!session.userId) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    try {
        const { assetId, briefOverride } = await req.json();

        if (!assetId || typeof assetId !== 'string') {
            return NextResponse.json({ error: 'Asset ID is required' }, { status: 400 });
        }

        const { data: asset, error: assetError } = await supabaseAdmin
            .from('assets')
            .select(`
                id,
                user_id,
                brand_id,
                brands ( name, market_sector )
            `)
            .eq('id', assetId)
            .single();

        if (assetError || !asset) {
            return NextResponse.json({ error: 'Asset not found' }, { status: 404 });
        }

        if (asset.user_id !== session.userId) {
            return NextResponse.json({ error: 'Unauthorized for this asset' }, { status: 403 });
        }

        const { data: extraction, error: extractionError } = await supabaseAdmin
            .from('extractions')
            .select(`
                id,
                primary_mechanic,
                evidence_anchors,
                dna_prompt,
                full_dossier,
                clone_output
            `)
            .eq('asset_id', assetId)
            .order('created_at', { ascending: false })
            .limit(1)
            .maybeSingle();

        if (extractionError) {
            return NextResponse.json({ error: 'Failed to load extraction data for Clone Engine' }, { status: 500 });
        }

        const dossier = extraction?.full_dossier;

        if (!extraction || !dossier) {
            return NextResponse.json({ error: 'A completed dossier is required before cloning this mechanic.' }, { status: 400 });
        }

        const anthropic = getAnthropic();
        if (!anthropic) {
            return NextResponse.json({ error: 'AI service unavailable' }, { status: 500 });
        }

        const systemPrompt = `You are an elite creative strategist. You receive forensic intelligence about a competitor advertisement and generate 5 completely original campaign concepts that deploy the same underlying persuasion architecture through an entirely different aesthetic, narrative, and visual language.

You are NOT copying the ad. You are extracting the MECHANISM and deploying it freshly.

Return a single valid JSON object. No markdown. No preamble.

Keep every field concise and production-useful. Do not write essays.`;

        const userMessage = `Generate 5 original campaign concepts that use the same persuasion architecture as this forensic extraction.

Asset:
Brand: ${asset.brands?.name || 'Unknown'}
Category: ${asset.brands?.market_sector || 'Unknown'}

Dossier:
Primary Mechanic: ${extraction.primary_mechanic}
Trigger Distribution: ${JSON.stringify((dossier as any)?.archetype_mapping?.trigger_distribution || {})}
Semiotic Overture: ${typeof (dossier as any)?.semiotic_subtext === 'string' ? (dossier as any).semiotic_subtext : (dossier as any)?.semiotic_subtext?.overture || ''}
Target Posture: ${(dossier as any)?.archetype_mapping?.target_posture || ''}
Strategic Moves: ${JSON.stringify((dossier as any)?.archetype_mapping?.strategic_moves || [])}
Evidence Anchors: ${JSON.stringify(extraction.evidence_anchors || [])}
DNA Prompt: ${extraction.dna_prompt || ''}
${briefOverride ? `Creative Brief Override: ${briefOverride}` : ''}

Return this JSON structure:
{
  "extracted_mechanism": "string — the pure persuasion mechanic, stripped of all aesthetic",
  "deployment_principle": "string — how to redeploy this mechanic in a fresh context",
  "concepts": [
    {
      "concept_id": 1,
      "title": "string",
      "hook_type": "string — e.g. Reversal, Juxtaposition, Documentary, Restraint",
      "logline": "string — one sentence concept",
      "scene": "string — what we see in this ad",
      "psychological_mechanism": "string — how this deploys the extracted mechanic",
      "copy_direction": "string — headline/tagline direction",
      "casting_direction": "string",
      "visual_language": "string",
      "production_complexity": "LOW | MEDIUM | HIGH",
      "dna_prompt": "string — Midjourney/DALL-E ready prompt for this concept"
    }
  ]
}`;

        const response = await anthropic.messages.create({
            model: getClaudeModel('agency'),
            max_tokens: 5000,
            system: systemPrompt,
            messages: [{ role: 'user', content: userMessage }],
        });

        const textResponse = response.content
            .filter((block) => block.type === 'text')
            .map((block) => block.text)
            .join('\n');

        let cloneOutput;
        try {
            cloneOutput = extractJsonObject(textResponse);
        } catch (parseError) {
            console.error('[Clone API] JSON parse failure:', {
                stopReason: response.stop_reason,
                responseLength: textResponse.length,
                tail: textResponse.slice(-500),
            });

            if (response.stop_reason === 'max_tokens') {
                return NextResponse.json(
                    { error: 'Clone Engine hit the response ceiling before concepts finished rendering. Retry once to regenerate a shorter pass.' },
                    { status: 502 }
                );
            }

            return NextResponse.json(
                { error: parseError instanceof Error ? parseError.message : 'Clone Engine returned malformed JSON.' },
                { status: 502 }
            );
        }

        const { error: updateError } = await supabaseAdmin
            .from('extractions')
            .update({
                clone_output: cloneOutput,
            })
            .eq('id', extraction.id);

        if (updateError) {
            console.error('[Clone API] Failed to save clone output:', updateError);
            return NextResponse.json({ error: `Failed to persist clone output: ${updateError.message}` }, { status: 500 });
        }

        return NextResponse.json(cloneOutput);
    } catch (error) {
        console.error('[Clone API] Critical error:', error);
        return NextResponse.json(
            { error: error instanceof Error ? error.message : 'Failed to generate clone concepts' },
            { status: 500 }
        );
    }
}
