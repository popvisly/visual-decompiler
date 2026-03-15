import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';
import crypto from 'crypto';
import sharp from 'sharp';
import { getAnthropic, getClaudeModel } from '@/lib/anthropic';
import { getServerSession } from '@/lib/auth-server';
import { assertUsageAvailable } from '@/lib/usage';
import { normalizeSector } from '@/lib/sector-taxonomy';

export const maxDuration = 300; // 5 minutes max function duration for Pro/Enterprise tier
export const dynamic = 'force-dynamic';

function coerceString(value: unknown, fallback = '') {
    if (typeof value === 'string') {
        return value;
    }

    if (value == null) {
        return fallback;
    }

    try {
        return JSON.stringify(value);
    } catch {
        return fallback;
    }
}

export async function POST(req: Request) {
    try {
        const session = await getServerSession(req);
        if (!session.userId) {
            return NextResponse.json({ error: 'Unauthorized: No active sovereign session found.' }, { status: 401 });
        }

        try {
            await assertUsageAvailable(session.userId, session.email);
        } catch (error) {
            if (error instanceof Error && error.message === 'LIMIT_REACHED') {
                const usage = (error as Error & { usage?: unknown }).usage;
                return NextResponse.json(
                    { error: 'LIMIT_REACHED', message: 'You have reached your monthly analysis limit.', usage },
                    { status: 402 }
                );
            }
            throw error;
        }

        // Upsert user to ensure they exist in our tracking and satisfy foreign keys
        const { error: userErr } = await supabaseAdmin
            .from('users')
            .upsert({ id: session.userId, email: session.email || '' }, { onConflict: 'id' });

        if (userErr) {
            console.error('[Ingest] User sync failed:', userErr);
            return NextResponse.json({ error: 'Failed to verify account status' }, { status: 500 });
        }

        // Enforce Server-Side checking with strictly parsed strings
        const { data: agency, error: agencyError } = await supabaseAdmin.from('agencies').select('tier').limit(1).single();
        if (agencyError || !agency) {
            return NextResponse.json({ error: 'No agency found in the vault to validate tier.' }, { status: 401 });
        }

        const rawTier = (agency.tier || '').toLowerCase().trim();
        const isSovereign = rawTier === 'agency sovereignty' || rawTier === 'pro';

        if (!isSovereign) {
            return NextResponse.json({ error: 'Agency Sovereignty Tier Required' }, { status: 403 });
        }

        // Handle both FormData (file) and JSON (mediaUrl)
        const contentType = req.headers.get('content-type') || '';
        let buffer: Buffer;
        let fileExt = 'png';
        let mimeType = 'image/jpeg';
        let brandHint = '';
        let sectorHint = '';

        if (contentType.includes('application/json')) {
            const body = await req.json();
            const mediaUrl = body.mediaUrl;
            brandHint = typeof body.brandName === 'string' ? body.brandName.trim() : '';
            sectorHint = normalizeSector(typeof body.marketSector === 'string' ? body.marketSector : '');
            if (!mediaUrl) {
                return NextResponse.json({ error: 'No mediaUrl provided.' }, { status: 400 });
            }
            
            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), 5000);
            let fetchRes;
            try {
                fetchRes = await fetch(mediaUrl, { signal: controller.signal });
                clearTimeout(timeoutId);
            } catch (err: any) {
                clearTimeout(timeoutId);
                if (err.name === 'AbortError') {
                    return NextResponse.json({ error: 'Image retrieval timed out. Does this URL allow public hotlinking?' }, { status: 408 });
                }
                return NextResponse.json({ error: 'Failed to fetch media from URL.' }, { status: 400 });
            }

            if (!fetchRes.ok) {
                return NextResponse.json({ error: 'Failed to fetch media from URL.' }, { status: 400 });
            }
            
            mimeType = fetchRes.headers.get('content-type') || 'image/jpeg';
            if (!mimeType.startsWith('image/')) {
                return NextResponse.json({ error: 'Only images are supported for Ingestion currently.' }, { status: 400 });
            }
            
            const arrayBuffer = await fetchRes.arrayBuffer();
            buffer = Buffer.from(new Uint8Array(arrayBuffer));
            fileExt = mimeType.split('/')[1] || 'png';
        } else if (contentType.includes('multipart/form-data')) {
            const formData = await req.formData();
            const file = formData.get('file') as File | null;
            brandHint = typeof formData.get('brandName') === 'string' ? String(formData.get('brandName')).trim() : '';
            sectorHint = normalizeSector(typeof formData.get('marketSector') === 'string' ? String(formData.get('marketSector')) : '');

            if (!file) {
                return NextResponse.json({ error: 'No file uploaded.' }, { status: 400 });
            }

            if (!file.type.startsWith('image/')) {
                return NextResponse.json({ error: 'Only images are supported for Ingestion currently.' }, { status: 400 });
            }

            fileExt = file.name.split('.').pop() || 'png';
            mimeType = file.type;
            const arrayBuffer = await file.arrayBuffer();
            buffer = Buffer.from(new Uint8Array(arrayBuffer));
        } else {
            return NextResponse.json({ error: 'Unsupported Content-Type. Use multipart/form-data or application/json.' }, { status: 400 });
        }

        // Compress image to max 1024px longest side
        buffer = await sharp(buffer)
            .resize({ width: 1024, height: 1024, fit: 'inside', withoutEnlargement: true })
            .toBuffer();

        // 2. Semantic Hash Check (Deduplication)
        const fileHash = crypto.createHash('sha256').update(buffer).digest('hex');
        const fileName = `${fileHash}.${fileExt}`;
        const filePath = `ingestions/${fileName}`;

        const { data: existingAssets } = await supabaseAdmin.from('assets')
            .select('id')
            .ilike('file_url', `%${fileHash}%`)
            .limit(1);

        if (existingAssets && existingAssets.length > 0) {
            const existingAsset = existingAssets[0];
            console.log(`[Ingest] Semantic hit for hash ${fileHash}. Bypassing Claude.`);
            
            // Check ownership and claim if unowned (legacy/test asset)
            const { data: assetCheck } = await supabaseAdmin.from('assets').select('user_id').eq('id', existingAsset.id).single();
            if (assetCheck && !assetCheck.user_id) {
                console.log(`[Ingest] Claiming unowned asset ${existingAsset.id} for user ${session.userId}`);
                await supabaseAdmin.from('assets').update({ user_id: session.userId }).eq('id', existingAsset.id);
            }
            
            return NextResponse.json({ success: true, assetId: existingAsset.id, cached: true });
        }

        // 3. Upload to Supabase Storage Bucket 'vault-assets'
        // supabaseAdmin uses process.env.SUPABASE_SERVICE_ROLE_KEY
        const { error: uploadError } = await supabaseAdmin.storage
            .from('vault-assets')
            .upload(filePath, buffer, { 
                contentType: mimeType,
                upsert: true 
            });

        if (uploadError) throw uploadError;

        // 4. Retrieve Public URL
        const { data: publicUrlData } = supabaseAdmin.storage
            .from('vault-assets')
            .getPublicUrl(filePath);

        const publicUrl = publicUrlData.publicUrl;

        // 5. Trigger Claude Deconstruction FIRST to get Brand Intelligence
        const anthropic = getAnthropic();
        if (!anthropic) {
            throw new Error('Anthropic client unavailable');
        }
        const model = getClaudeModel('agency');

        const systemPrompt = `You are the Visual Decompiler: an elite forensic intelligence system that reverse-engineers the persuasion architecture of advertising.
You are not a sentiment analyzer. You are not a description tool. You are a structural X-ray machine for commercial creative.
Return a single valid JSON object matching this schema exactly. No markdown. No commentary outside the JSON.

{
  "brand_name_guess": "Brand Name",
  "market_sector_guess": "Industry Category",
  "confidence_score": 95,
  "primary_mechanic": "Specific named persuasion mechanic",
  "visual_style": "Dense synthesized visual style summary",
  "color_palette": ["#000000", "#FFFFFF", "#FF0000"],
  "evidence_anchors": [
    {
      "claim": "string",
      "evidence_vector": "string",
      "confidence_score": 90,
      "visual_anchor": "string"
    }
  ],
  "dna_prompt": "A single dense sentence that can reconstruct the aesthetic in image-generation tools",
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
      { "lens": "Post-Colonial", "reading": "One precise sentence on cultural/racial address, including any inadvertent cultural appropriation risks or First Nations (Indigenous Australian) representation concerns" },
      { "lens": "Queer Theory", "reading": "One precise sentence on heteronormativity or subversion" }
    ],
    "competitive_displacement": "One concise paragraph explaining how this asset displaces category norms or where it fails to create strategic distance."
  }
}

RULES:
- Treat this as a 13-dimension forensic extraction, with competitive_displacement as Dimension 13.
- Every claim must be grounded in something visually present in the asset.
- The narrative_framework MUST use ACT I / ACT II / ACT III headings.
- The semiotic_subtext MUST use CHANNEL 1 / CHANNEL 2 / CHANNEL 3 headings.
- For radiant_architecture, use realistic coordinates based on the actual composition.
- For gaze_topology and counter_reading_matrix, be precise and genuinely critical rather than softened.
- Ensure trigger_distribution values are integers from 0-100.
- Ensure cognitive_friction and persuasion_density are integers from 0-100.
- Keep the writing dense, clinical, and premium, but concise enough to fit within the response window.`;

        const base64Data = buffer.toString('base64');

        type AuthImageMedia = "image/jpeg" | "image/png" | "image/webp" | "image/gif";
        type ContentBlock =
            | { type: "text"; text: string }
            | { type: "image"; source: { type: "base64"; media_type: AuthImageMedia; data: string } };

        const userContent: ContentBlock[] = [
            {
                type: "text",
                text: `Perform a complete forensic extraction on this advertisement and return the full 13-dimension dossier.${brandHint ? ` Brand hint: ${brandHint}. Use it only if the asset evidence supports it.` : ''}${sectorHint ? ` Sector taxonomy hint: ${sectorHint}. Use this controlled sector label unless the visual evidence strongly contradicts it.` : ''}`
            },
            {
                type: "image",
                source: {
                    type: "base64",
                    media_type: mimeType as AuthImageMedia,
                    data: base64Data
                }
            }
        ];

        const response = await anthropic.messages.create({
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

        console.log(`[Ingest] Claude Response Length: ${responseLength}, Stop Reason: ${stopReason}`);

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
            console.error(`[Ingest] JSON Parse Error at length ${responseLength}. Stop Reason: ${stopReason}`);
            console.error(`[Ingest] Last 100 chars of response: ${text.slice(-100)}`);
            
            if (stopReason === 'max_tokens') {
                throw new Error(`The forensic dossier exceeded the maximum allowed depth (8,192 tokens) and was truncated. Try a simpler asset or retry to see if the engine provides a more concise deconstruction.`);
            }
            throw new Error(`Forensic data corruption (Invalid JSON). Technical: ${jsonError.message}`);
        }

        const normalizedColorPalette = Array.isArray(extractionResult.color_palette)
            ? extractionResult.color_palette.filter((value: unknown) => typeof value === 'string')
            : [];
        const normalizedEvidenceAnchors = Array.isArray(extractionResult.evidence_anchors)
            ? extractionResult.evidence_anchors
            : [];
        const normalizedVisualStyle = coerceString(extractionResult.visual_style, 'Forensic visual style unavailable.');
        const normalizedDnaPrompt = coerceString(extractionResult.dna_prompt, 'DNA prompt unavailable.');

        // 6. Dynamic Brand Binding
        let targetBrandId = null;
        const resolvedBrandName = brandHint || extractionResult.brand_name_guess || 'Unknown Brand';
        const marketSector = normalizeSector(sectorHint || extractionResult.market_sector_guess || 'Other');

        // Check if brand exists in Intelligence Vault
        const { data: existingBrand } = await supabaseAdmin.from('brands')
            .select('id')
            .ilike('name', resolvedBrandName)
            .limit(1)
            .maybeSingle();

        if (existingBrand) {
            targetBrandId = existingBrand.id;
        } else {
            // Need an agency context to create a new Brand
            const { data: agencies } = await supabaseAdmin.from('agencies').select('id').limit(1).single();
            if (!agencies) throw new Error("No Agency found to anchor new Brand.");
            
            const { data: newBrand, error: newBrandError } = await supabaseAdmin.from('brands').insert({
                name: resolvedBrandName,
                market_sector: marketSector,
                agency_id: agencies.id
            }).select('id').single();

            if (newBrandError) throw newBrandError;
            targetBrandId = newBrand.id;
        }

        // 7. Create new Asset in database
        const { data: assetData, error: insertError } = await supabaseAdmin.from('assets').insert({
            brand_id: targetBrandId,
            user_id: session.userId,
            type: 'STATIC',
            file_url: publicUrl
        }).select().single();

        if (insertError) throw insertError;

        // 8. Save extraction to Intelligence Vault extractions table
        const { error: extractionError } = await supabaseAdmin.from('extractions').insert({
            asset_id: assetData.id,
            confidence_score: extractionResult.confidence_score,
            primary_mechanic: extractionResult.primary_mechanic,
            visual_style: normalizedVisualStyle,
            color_palette: normalizedColorPalette,
            evidence_anchors: normalizedEvidenceAnchors,
            dna_prompt: normalizedDnaPrompt,
            full_dossier: extractionResult.full_dossier
        });

        if (extractionError) {
            console.error('[Extraction DB Error]:', extractionError);
            throw new Error('Failed to save extraction to database');
        }

        return NextResponse.json({ success: true, assetId: assetData.id });

    } catch (e) {
        const error = e as Error;
        console.error('[Ingestion Route Error]:', error);
        return NextResponse.json({ error: error.message || 'Server error during ingestion' }, { status: 500 });
    }
}
