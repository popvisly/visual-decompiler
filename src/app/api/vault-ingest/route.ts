import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';
import crypto from 'crypto';
import sharp from 'sharp';
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

        if (contentType.includes('application/json')) {
            const body = await req.json();
            const mediaUrl = body.mediaUrl;
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
            console.log(`[Ingest] Semantic hit for hash ${fileHash}. Bypassing Claude.`);
            return NextResponse.json({ success: true, assetId: existingAssets[0].id, cached: true });
        }

        // 3. Upload to Supabase Storage Bucket 'vault-assets'
        // supabaseAdmin uses process.env.SUPABASE_SERVICE_ROLE_KEY
        const { error: uploadError } = await supabaseAdmin.storage
            .from('vault-assets')
            .upload(filePath, buffer, { contentType: mimeType });

        if (uploadError) throw uploadError;

        // 4. Retrieve Public URL
        const { data: publicUrlData } = supabaseAdmin.storage
            .from('vault-assets')
            .getPublicUrl(filePath);

        const publicUrl = publicUrlData.publicUrl;

        // 5. Trigger Claude Deconstruction FIRST to get Brand Intelligence
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

        const base64Data = buffer.toString('base64');

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

        // 6. Dynamic Brand Binding
        let targetBrandId = null;
        const brandName = extractionResult.brand_name_guess || 'Unknown Brand';
        const marketSector = extractionResult.market_sector_guess || 'Uncategorized';

        // Check if brand exists in Intelligence Vault
        const { data: existingBrand } = await supabaseAdmin.from('brands')
            .select('id')
            .ilike('name', brandName)
            .limit(1)
            .maybeSingle();

        if (existingBrand) {
            targetBrandId = existingBrand.id;
        } else {
            // Need an agency context to create a new Brand
            const { data: agencies } = await supabaseAdmin.from('agencies').select('id').limit(1).single();
            if (!agencies) throw new Error("No Agency found to anchor new Brand.");
            
            const { data: newBrand, error: newBrandError } = await supabaseAdmin.from('brands').insert({
                name: brandName,
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

        return NextResponse.json({ success: true, assetId: assetData.id });

    } catch (e) {
        const error = e as Error;
        console.error('[Ingestion Route Error]:', error);
        return NextResponse.json({ error: error.message || 'Server error during ingestion' }, { status: 500 });
    }
}
