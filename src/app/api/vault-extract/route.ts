import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';
import { getAnthropic, getClaudeModel } from '@/lib/anthropic';
import { getServerSession } from '@/lib/auth-server';

export const maxDuration = 300; // 5 minutes max function duration for Pro/Enterprise tier
export const dynamic = 'force-dynamic';

export async function POST(req: Request) {
    try {
        const session = await getServerSession(req);
        if (!session.userId) {
            return NextResponse.json({ error: 'Unauthorized: No active sovereign session found.' }, { status: 401 });
        }

        const body = await req.json();
        const assetId = body.assetId;
        if (!assetId) {
            return NextResponse.json({ error: 'No assetId provided.' }, { status: 400 });
        }

        // 1. Get asset details and verify ownership
        const { data: assetData, error: assetError } = await supabaseAdmin
            .from('assets')
            .select('file_url, user_id, brand_id')
            .eq('id', assetId)
            .single();

        if (assetError || !assetData) {
            return NextResponse.json({ error: 'Asset not found.' }, { status: 404 });
        }
        if (assetData.user_id !== session.userId) {
            return NextResponse.json({ error: 'Unauthorized for this asset.' }, { status: 403 });
        }

        // If extraction already exists, we can return early
        const { data: existingExtraction } = await supabaseAdmin
            .from('extractions')
            .select('id')
            .eq('asset_id', assetId)
            .maybeSingle();
            
        if (existingExtraction) {
            return NextResponse.json({ success: true, extractionId: existingExtraction.id, cached: true });
        }

        // 2. Fetch the image to pass to Claude
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 10000);
        let fetchRes;
        try {
            fetchRes = await fetch(assetData.file_url, { signal: controller.signal });
            clearTimeout(timeoutId);
        } catch (err: any) {
            clearTimeout(timeoutId);
            return NextResponse.json({ error: 'Failed to fetch media from Cloud.' }, { status: 500 });
        }

        if (!fetchRes.ok) {
            return NextResponse.json({ error: 'Failed to fetch media from Cloud.' }, { status: 500 });
        }

        const mimeType = fetchRes.headers.get('content-type') || 'image/jpeg';
        const arrayBuffer = await fetchRes.arrayBuffer();
        const base64Data = Buffer.from(new Uint8Array(arrayBuffer)).toString('base64');

        // 3. Trigger Claude Deconstruction
        const anthropic = getAnthropic();
        const model = getClaudeModel('agency');

        const systemPrompt = `You are an elite forensic advertising strategist, creative director, and semiotician. Analyze the given asset (static image or video frame) and extract its core strategic and semiotic DNA.
CRITICAL INSTRUCTION: You MUST return a valid JSON object matching this exact schema. Do NOT omit any keys. Provide forensic, multi-paragraph deep-dives for Narrative, Semiotics, and Archetypes. Maintain an elite, clinical, and highly specialized tone.

{
  "brand_name_guess": "Brand Name",
  "market_sector_guess": "Industry Category",
  "confidence_score": 95,
  "primary_mechanic": "Status Signaling via Negative Space",
  "visual_style": "Brutalist Minimalism",
  "color_palette": ["#000000", "#FFFFFF", "#FF0000"],
  "evidence_anchors": [
    {
      "claim": "string",
      "evidence_vector": "string",
      "confidence_score": 90,
      "visual_anchor": "string"
    }
  ],
  "dna_prompt": "A single sentence summary combining style and mechanic",
  "full_dossier": {
    "narrative_framework": "Multi-paragraph deep-dive explanation of the core storytelling device.",
    "semiotic_subtext": "Multi-paragraph deep-dive into the psychological subtext.",
    "possible_readings": [
      { "reading": "string", "support": ["string"], "note": "string|null" }
    ],
    "objection_dismantling": "Detailed explanation of the customer friction neutralized.",
    "archetype_mapping": {
      "target_posture": "The overarching strategic posture",
      "strategic_moves": ["string", "string"],
      "trigger_distribution": {
        "Status": 85,
        "Scarcity": 10,
        "Utility": 0,
        "Authority": 90,
        "Social Proof": 20
      }
    },
    "persuasion_metrics": {
      "predictive_longevity": "Fatigue at Day 32 (Estimate creative exhaustion window)",
      "cognitive_friction": 15,
      "persuasion_density": 92
    },
    "test_plan": {
      "hypothesis": "Detailed hypothesis for testing.",
      "test_cells": [
        { "lever": "Hook|CTA|Visual|Copy", "change": "string", "rationale": "string" }
      ]
    }
  }
}

Analyze the media provided. Stay clinical, elite, and provide maximum depth. Ensure the 'trigger_distribution' keys (Status, Scarcity, Utility, Authority, Social Proof) map to integers 0-100. Similarly 'cognitive_friction' and 'persuasion_density' should be integers 0-100.`;

        type AuthImageMedia = "image/jpeg" | "image/png" | "image/webp" | "image/gif";
        type ContentBlock =
            | { type: "text"; text: string }
            | { type: "image"; source: { type: "base64"; media_type: AuthImageMedia; data: string } };

        const userContent: ContentBlock[] = [
            { type: "text", text: "Analyze this asset and provide the full 5-page forensic extraction dossier." },
            {
                type: "image",
                source: {
                    type: "base64",
                    media_type: mimeType as AuthImageMedia,
                    data: base64Data
                }
            }
        ];

        const response = await anthropic!.messages.create({
            model,
            max_tokens: 8192,
            system: systemPrompt,
            messages: [{ role: 'user', content: userContent }],
        });

        const contentBlock = response.content.find((block) => block.type === 'text');
        if (!contentBlock) throw new Error("Claude returned no text response");

        let text = contentBlock.text;
        if (text.includes('```json')) {
            text = text.split('```json')[1].split('```')[0].trim();
        } else if (text.includes('```')) {
            text = text.split('```')[1].split('```')[0].trim();
        }

        const extractionResult = JSON.parse(text);

        // 4. Dynamic Brand Binding (if brand_id is null on the asset)
        let targetBrandId = assetData.brand_id;
        
        if (!targetBrandId) {
            const brandName = extractionResult.brand_name_guess || 'Unknown Brand';
            const marketSector = extractionResult.market_sector_guess || 'Uncategorized';

            const { data: existingBrand } = await supabaseAdmin.from('brands')
                .select('id')
                .ilike('name', brandName)
                .limit(1)
                .maybeSingle();

            if (existingBrand) {
                targetBrandId = existingBrand.id;
            } else {
                const { data: agencies } = await supabaseAdmin.from('agencies').select('id').limit(1).single();
                if (agencies) {
                    const { data: newBrand } = await supabaseAdmin.from('brands').insert({
                        name: brandName,
                        market_sector: marketSector,
                        agency_id: agencies.id
                    }).select('id').maybeSingle();
                    if (newBrand) targetBrandId = newBrand.id;
                }
            }

            // Update the asset with the located or created brand_id
            if (targetBrandId) {
                await supabaseAdmin.from('assets').update({ brand_id: targetBrandId }).eq('id', assetId);
            }
        }

        // 5. Save extraction to Intelligence Vault extractions table
        const { error: extractionError } = await supabaseAdmin.from('extractions').insert({
            asset_id: assetId,
            confidence_score: extractionResult.confidence_score,
            primary_mechanic: extractionResult.primary_mechanic,
            visual_style: extractionResult.visual_style,
            color_palette: extractionResult.color_palette,
            evidence_anchors: extractionResult.evidence_anchors,
            dna_prompt: extractionResult.dna_prompt,
            full_dossier: extractionResult.full_dossier
        });

        if (extractionError) {
            console.error('[Extraction DB Error]:', extractionError);
            throw new Error('Failed to save extraction to database');
        }

        return NextResponse.json({ success: true, extractionResult });

    } catch (e) {
        const error = e as Error;
        console.error('[Vault Extract Error]:', error);
        return NextResponse.json({ error: error.message || 'Server error during extraction' }, { status: 500 });
    }
}
