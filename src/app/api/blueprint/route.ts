import { NextResponse } from 'next/server';
import { getAnthropic, getClaudeModel } from '@/lib/anthropic';
import { getServerSession } from '@/lib/auth-server';
import { supabaseAdmin } from '@/lib/supabase';
import { assertUsageAvailable } from '@/lib/usage';

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

        const { assetId, brandId } = await req.json();

        if (!assetId) {
            return NextResponse.json({ error: 'assetId is required' }, { status: 400 });
        }

        // 1. Fetch asset and its latest extraction
        const { data: asset, error } = await supabaseAdmin
            .from('assets')
            .select('*, extractions(*)')
            .eq('id', assetId)
            .single();

        if (error || !asset) {
            return NextResponse.json({ error: 'Asset not found in the Intelligence Vault' }, { status: 404 });
        }

        const extraction = asset.extractions?.length ? asset.extractions[0] : null;

        if (!extraction) {
            return NextResponse.json({ error: 'No extraction data available to build a blueprint' }, { status: 400 });
        }

        // 2. Prepare Claude API to generate the Production Blueprint based on Forensic Extraction
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

        // 3. Call Claude
        const response = await anthropic.messages.create({
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

        const result = JSON.parse(text) as ProductionBlueprintResponse;

        // Optional: Could insert the blueprint back into another table, updating DB states.
        // e.g., await supabaseAdmin.from('blueprints').insert({ ... })

        return NextResponse.json(result);

    } catch (error) {
        return NextResponse.json({ status: 'error', error: error instanceof Error ? error.message : "Unknown Error" }, { status: 500 });
    }
}
