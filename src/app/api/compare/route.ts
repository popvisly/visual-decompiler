import { NextResponse } from 'next/server';
import { getAnthropic, getClaudeModel } from '@/lib/anthropic';
import { supabaseAdmin } from '@/lib/supabase';

// SCHEMA 1: Differential Diagnostics interface
export interface DifferentialDiagnosticResponse {
    diagnostic_id: string;
    status: 'success' | 'error';
    macro_synthesis: {
        primary_shift: string;
        strategic_delta_summary: string;
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

export async function POST(req: Request) {
    try {
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

        const systemPrompt = `You are a forensic advertising strategist analyzing two assets for a Differential Diagnostic.
CRITICAL INSTRUCTION: You MUST return a valid JSON object matching this exact schema:
{
  "diagnostic_id": "diff_req_[random_id]",
  "status": "success",
  "macro_synthesis": {
    "primary_shift": "string",
    "strategic_delta_summary": "string"
  },
  "radar_metrics": {
    "axes": ["Aesthetic Authority", "Cognitive Load", "Status Signaling", "Materiality", "Narrative Tension"],
    "asset_a_scores": [number, number, number, number, number],
    "asset_b_scores": [number, number, number, number, number]
  },
  "semiotic_shifts": [
    {
      "variable_isolated": "string",
      "asset_a_state": "string",
      "asset_b_state": "string",
      "impact_on_conversion": "string"
    }
  ]
}`;

        const userMessage = `Compare these two asset extractions and provide the Differential Diagnostic JSON.
Asset A Extraction:
${JSON.stringify(assetA.data.extractions?.length ? assetA.data.extractions[0] : {}, null, 2)}

Asset B Extraction:
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

        const result = JSON.parse(text) as DifferentialDiagnosticResponse;

        // Optional: Save the diagnostic result to the database if needed
        // await supabaseAdmin.from('comparisons').insert({...})

        return NextResponse.json(result);

    } catch (error: any) {
        console.error('[Differential Diagnostic Error]:', error);
        return NextResponse.json({ status: 'error', error: error.message }, { status: 500 });
    }
}
