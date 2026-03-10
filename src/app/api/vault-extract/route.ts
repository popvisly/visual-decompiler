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

        // 1. Get asset details and verify ownership (Check V2 assets first, then fallback to V1 ad_digests)
        let { data: assetData, error: assetError } = await supabaseAdmin
            .from('assets')
            .select('id, file_url, user_id, brand_id')
            .eq('id', assetId)
            .maybeSingle();
            
        if (!assetData) {
            const { data: v1Data, error: v1Error } = await supabaseAdmin
                .from('ad_digests')
                .select('id, media_url, user_id, brand')
                .eq('id', assetId)
                .maybeSingle();
            
            if (v1Data) {
                // Skeleton migration: create the asset record so extraction can link to it
                const { data: newAsset, error: insertError } = await supabaseAdmin
                    .from('assets')
                    .insert({
                        id: v1Data.id,
                        file_url: v1Data.media_url,
                        user_id: v1Data.user_id,
                        type: 'STATIC' // Defaulting to static for V1 legacy
                    })
                    .select('id, file_url, user_id, brand_id')
                    .single();
                
                if (insertError) {
                    console.error('[Migration Error]:', insertError);
                    return NextResponse.json({ error: 'Failed to migrate legacy asset for analysis.' }, { status: 500 });
                }
                assetData = newAsset;
            } else {
                return NextResponse.json({ error: 'Asset not found in any vault version.' }, { status: 404 });
            }
        }

        if (assetData.user_id !== session.userId) {
            return NextResponse.json({ error: 'Unauthorized for this asset.' }, { status: 403 });
        }

        // 1.5 Check if extraction exists AND has the deep forensic dossier
        const { data: existingExtraction } = await supabaseAdmin
            .from('extractions')
            .select('id, full_dossier')
            .eq('asset_id', assetId)
            .maybeSingle();
            
        if (existingExtraction?.full_dossier) {
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

        const systemPrompt = `You are an elite forensic advertising strategist, creative director, and semiotician. Analyse the given asset (static image or video frame) and extract its core strategic and semiotic DNA.
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
    "narrative_framework": "[OVERTURE] A brief one-paragraph intro. \n\nACT I: THE HOOK — Multi-paragraph forensic deconstruction. \n\nACT II: THE CONFLICT — Multi-paragraph strategic deconstruction. \n\nACT III: THE RESOLUTION — Multi-paragraph resolution deconstruction.",
    "semiotic_subtext": "[OVERTURE] A brief intro. \n\nCHANNEL 1: VISUAL GRAMMAR — Analysis. \n\nCHANNEL 2: CULTURAL SEMIOTICS — Analysis. \n\nCHANNEL 3: PSYCHOLOGICAL TRIGGERS — Analysis.",
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
    },
    "radiant_architecture": {
      "anchors": [
        { "x": 20, "y": 30, "label": "Primary Visual Anchor (e.g. Logo, Headline)", "gravity": "high|critical|medium" },
        { "x": 50, "y": 50, "label": "Hero Element (e.g. Product, Model Face)", "gravity": "high|critical|medium" },
        { "x": 80, "y": 70, "label": "Secondary Anchor (e.g. CTA, Tagline)", "gravity": "high|critical|medium" }
      ],
      "escape_vector": { "from_x": 80, "from_y": 70, "angle": 135 }
    },
    "gaze_topology": {
      "mode_of_address": "direct|averted|mixed",
      "viewer_position": "voyeur|participant|aspirant|confronted",
      "power_holder": "subject|viewer|shared|ambiguous",
      "reading": "One clinical sentence explaining how gaze positions the audience psychologically"
    },
    "counter_reading_matrix": [
      { "lens": "Marxist", "reading": "One precise sentence on class/power dynamics encoded" },
      { "lens": "Feminist", "reading": "One precise sentence on gender power structures" },
      { "lens": "Post-Colonial", "reading": "One precise sentence on cultural/racial address" },
      { "lens": "Queer Theory", "reading": "One precise sentence on heteronormativity or subversion" }
    ]
  }
}

CRITICAL: The 'narrative_framework' MUST use the 'ACT I: [TITLE]' format and the 'semiotic_subtext' MUST use the 'CHANNEL 1: [TITLE]' format.
CRITICAL: For 'radiant_architecture', analyse the actual image composition. 'x' and 'y' are percentage coordinates (0-100) of where the viewer's eye is drawn. Anchor 1 should be where the eye FIRST lands, Anchor 2 where it travels next, and Anchor 3 where it settles. The 'escape_vector' angle (0-360 degrees, 0=right, 90=down) marks where visual momentum exits the frame. Provide realistic coordinates based on the ACTUAL layout, do NOT use the example values.
CRITICAL: For 'gaze_topology', analyse whether the subject(s) look directly at the camera (direct) or away (averted). Determine if the viewer is positioned as a voyeur, participant, aspirant, or confronted. For 'counter_reading_matrix', provide genuinely critical readings — do NOT soften or hedge. Each lens must identify a specific power dynamic or ideological tension.

STYLE: Use a "Dense Forensic" style. Provide maximum depth but avoid repetitive fluff to ensure the entire JSON payload fits within the 8,192 token window. Ensure 'trigger_distribution' keys (Status, Scarcity, Utility, Authority, Social Proof) map to integers 0-100. Similarly 'cognitive_friction' and 'persuasion_density' should be integers 0-100.`;

        type AuthImageMedia = "image/jpeg" | "image/png" | "image/webp" | "image/gif";
        type ContentBlock =
            | { type: "text"; text: string }
            | { type: "image"; source: { type: "base64"; media_type: AuthImageMedia; data: string } };

        const userContent: ContentBlock[] = [
            { type: "text", text: "Analyse this asset and provide the full 5-page forensic extraction dossier." },
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
        const responseLength = text.length;
        const stopReason = response.stop_reason;

        console.log(`[Extract] Claude Response Length: ${responseLength}, Stop Reason: ${stopReason}`);

        if (text.includes('```json')) {
            text = text.split('```json')[1];
            if (text.includes('```')) {
                text = text.split('```')[0];
            }
        } else if (text.includes('```')) {
            text = text.split('```')[1];
            if (text.includes('```')) {
                text = text.split('```')[0];
            }
        }
        text = text.trim();

        let extractionResult;
        try {
            extractionResult = JSON.parse(text);
        } catch (jsonError: any) {
            console.error(`[Extract] JSON Parse Error at length ${responseLength}. Stop Reason: ${stopReason}`);
            console.error(`[Extract] Last 100 chars of response: ${text.slice(-100)}`);
            
            if (stopReason === 'max_tokens') {
                throw new Error(`The forensic dossier exceeded the maximum allowed depth (8,192 tokens) and was truncated. Try a simpler asset or retry to see if the engine provides a more concise deconstruction.`);
            }
            throw new Error(`Forensic data corruption (Invalid JSON). Technical: ${jsonError.message}`);
        }

        // 4. Dynamic Brand Binding (Identify and update the asset's brand)
        let targetBrandId = null;
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
                }).select('id').single();
                if (newBrand) targetBrandId = newBrand.id;
            }
        }

        // Always update the asset with the located or created brand_id
        if (targetBrandId) {
            await supabaseAdmin.from('assets').update({ brand_id: targetBrandId }).eq('id', assetId);
        }

        // 5. Save extraction to Intelligence Vault extractions table (Upsert to handle deep upgrades)
        const { error: extractionError } = await supabaseAdmin.from('extractions').upsert({
            asset_id: assetId,
            confidence_score: extractionResult.confidence_score,
            primary_mechanic: extractionResult.primary_mechanic,
            visual_style: extractionResult.visual_style,
            color_palette: extractionResult.color_palette,
            evidence_anchors: extractionResult.evidence_anchors,
            dna_prompt: extractionResult.dna_prompt,
            full_dossier: extractionResult.full_dossier
        }, { onConflict: 'asset_id' });

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
