import { NextResponse } from 'next/server';
import { getAnthropic, getClaudeModel } from '@/lib/anthropic';
import { getServerSession } from '@/lib/auth-server';
import { supabaseAdmin } from '@/lib/supabase';
import { assertUsageAvailable } from '@/lib/usage';

const extractJsonObject = (value: string) => {
    const fenced = value.match(/```json\s*([\s\S]*?)```/i) || value.match(/```\s*([\s\S]*?)```/i);
    const candidate = fenced?.[1] || value;
    const start = candidate.indexOf('{');
    const end = candidate.lastIndexOf('}');

    if (start === -1 || end === -1 || end <= start) {
        throw new Error('Blueprint Engine returned malformed JSON.');
    }

    return JSON.parse(candidate.slice(start, end + 1));
};

// SCHEMA 3: Production Blueprints interface
export interface ProductionBlueprintResponse {
    blueprint_id: string;
    status: 'success' | 'error';
    verified_dna_prompt: string;
    execution_constraints: {
        primary_trigger: string;
        must_include: string[];
        must_not_include: string[];
    };
    technical_specs: {
        lighting_architecture: string;
        material_cues: string[];
        gaze_vector: string;
    };
    ad_copy_remixes: {
        angle: string;
        copy: string;
    }[];
    visual_variant_prompts: {
        concept: string;
        prompt: string;
    }[];
}

export async function POST(req: Request) {
    try {
        const session = await getServerSession(req);
        if (!session.userId) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        try {
            await assertUsageAvailable(session.userId, session.email);
        } catch (error) {
            if (error instanceof Error && error.message === 'LIMIT_REACHED') {
                const usage = (error as Error & { usage?: unknown }).usage;
                return NextResponse.json(
                    { error: 'LIMIT_REACHED', message: 'Usage limit reached for this billing cycle.', usage },
                    { status: 402 }
                );
            }
            throw error;
        }

        const { assetId } = await req.json();

        if (!assetId) {
            return NextResponse.json({ error: 'assetId is required' }, { status: 400 });
        }

        // 1. Verify asset ownership first.
        const { data: asset, error } = await supabaseAdmin
            .from('assets')
            .select('id, user_id')
            .eq('id', assetId)
            .eq('user_id', session.userId)
            .single();

        if (error || !asset) {
            return NextResponse.json({ error: 'Asset not found in the Intelligence Vault' }, { status: 404 });
        }

        // 2. Fetch the most recent extraction directly instead of relying on an embedded relationship shape.
        const { data: extraction, error: extractionError } = await supabaseAdmin
            .from('extractions')
            .select('*')
            .eq('asset_id', assetId)
            .order('created_at', { ascending: false })
            .limit(1)
            .maybeSingle();

        if (extractionError) {
            return NextResponse.json({ error: 'Failed to load extraction data for blueprint generation' }, { status: 500 });
        }

        if (!extraction) {
            return NextResponse.json({ error: 'No extraction data available to build a blueprint yet. Retry once the forensic dossier has finished persisting.' }, { status: 400 });
        }

        // 3. Prepare Claude API to generate the Production Blueprint based on Forensic Extraction
        const anthropic = getAnthropic();
        if (!anthropic) {
            throw new Error('Anthropic client unavailable');
        }
        const model = getClaudeModel('agency');

        const systemPrompt = `You are a high-end creative director generating a Production Blueprint based on forensic asset extractions.
CRITICAL INSTRUCTION: You MUST return a valid JSON object matching this exact schema:
{
  "blueprint_id": "bp_[random_id]",
  "status": "success",
  "verified_dna_prompt": "string",
  "execution_constraints": {
    "primary_trigger": "string",
    "must_include": ["string"],
    "must_not_include": ["string"]
  },
  "technical_specs": {
    "lighting_architecture": "string",
    "material_cues": ["string"],
    "gaze_vector": "string"
  },
  "ad_copy_remixes": [
    {
      "angle": "Status Pivot",
      "copy": "string"
    }
  ],
  "visual_variant_prompts": [
    {
      "concept": "Minimalist Iteration",
      "prompt": "string"
    }
  ]
}`;

        const userMessage = `Based on the following Forensic Extraction from our Intelligence Vault, synthesize a highly actionable, premium Production Blueprint. Keep language clinical, forensic, and elite.
Extraction Data:
${JSON.stringify(extraction, null, 2)}`;

        // 4. Call Claude
        const response = await anthropic.messages.create({
            model,
            max_tokens: 4096,
            system: systemPrompt,
            messages: [{ role: 'user', content: userMessage }],
        });

        const contentBlock = response.content.find((block) => block.type === 'text');
        if (!contentBlock) throw new Error("Claude returned no text response");

        let result: ProductionBlueprintResponse;
        try {
            result = extractJsonObject(contentBlock.text) as ProductionBlueprintResponse;
        } catch (parseError) {
            console.error('[Blueprint API] JSON parse failure:', {
                stopReason: response.stop_reason,
                responseLength: contentBlock.text.length,
                tail: contentBlock.text.slice(-500),
            });

            if (response.stop_reason === 'max_tokens') {
                return NextResponse.json(
                    { error: 'Blueprint generation hit the response ceiling before the JSON finished. Retry once to regenerate a tighter pass.' },
                    { status: 502 }
                );
            }

            return NextResponse.json(
                { error: parseError instanceof Error ? parseError.message : 'Blueprint Engine returned malformed JSON.' },
                { status: 502 }
            );
        }

        const { error: persistError } = await supabaseAdmin
            .from('extractions')
            .update({
                blueprint: result,
            })
            .eq('id', extraction.id);

        if (persistError) {
            throw new Error(`Failed to persist blueprint: ${persistError.message}`);
        }

        return NextResponse.json(result);

    } catch (error) {
        return NextResponse.json({ status: 'error', error: error instanceof Error ? error.message : "Unknown Error" }, { status: 500 });
    }
}
