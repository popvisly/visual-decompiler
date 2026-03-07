import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';
import { v4 as uuidv4 } from 'uuid';
import { getAnthropic, getClaudeModel } from '@/lib/anthropic';

export async function POST(req: Request) {
    try {
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

        // Parse FormData
        const formData = await req.formData();
        const file = formData.get('file') as File | null;

        if (!file) {
            return NextResponse.json({ error: 'No file uploaded.' }, { status: 400 });
        }

        if (!file.type.startsWith('image/')) {
            return NextResponse.json({ error: 'Only images are supported for Ingestion currently.' }, { status: 400 });
        }

        // 1. Upload to Supabase Storage Bucket 'vault-assets'
        const fileExt = file.name.split('.').pop() || 'png';
        const fileName = `${uuidv4()}.${fileExt}`;
        const filePath = `ingestions/${fileName}`;

        // supabaseAdmin uses process.env.SUPABASE_SERVICE_ROLE_KEY
        const { error: uploadError } = await supabaseAdmin.storage
            .from('vault-assets')
            .upload(filePath, file, { contentType: file.type });

        if (uploadError) throw uploadError;

        // 2. Retrieve Public URL
        const { data: publicUrlData } = supabaseAdmin.storage
            .from('vault-assets')
            .getPublicUrl(filePath);

        const publicUrl = publicUrlData.publicUrl;

        // 3. Fallback Brand (System Dummy or 'Unassigned' logic)
        let targetBrandId = null;
        const { data: brands } = await supabaseAdmin.from('brands').select('id').limit(1);
        if (brands && brands.length > 0) {
            targetBrandId = brands[0].id;
        } else {
            throw new Error("No Brands found in Intelligence Vault to attach asset to.");
        }

        // 4. Create new Asset in database
        const { data: assetData, error: insertError } = await supabaseAdmin.from('assets').insert({
            brand_id: targetBrandId,
            type: 'STATIC',
            file_url: publicUrl
        }).select().single();

        if (insertError) throw insertError;

        // 5. Trigger Claude Deconstruction
        const anthropic = getAnthropic();
        const model = getClaudeModel('agency');

        const systemPrompt = `You are an elite forensic advertising strategist. Analyze the given asset and extract its core semiotic DNA.
CRITICAL INSTRUCTION: You MUST return a valid JSON object matching this exact schema:
{
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
  "dna_prompt": "A single sentence summary combining style and mechanic"
}

Analyze the image provided. Stay clinical, elite, and forensic in your tone. Keep explanations concise.`;

        // Fetch the newly uploaded public URL to encode to base64 for Anthropic
        const imgRes = await fetch(publicUrl);
        if (!imgRes.ok) throw new Error("Failed to fetch uploaded image for Claude processing");

        const arrayBuffer = await imgRes.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);
        const base64Data = buffer.toString('base64');
        const mimeType = imgRes.headers.get('content-type') || 'image/png';

        type AuthImageMedia = "image/jpeg" | "image/png" | "image/webp" | "image/gif";
        type ContentBlock =
            | { type: "text"; text: string }
            | { type: "image"; source: { type: "base64"; media_type: AuthImageMedia; data: string } };

        const userContent: ContentBlock[] = [
            { type: "text", text: "Analyze this asset and provide the forensic extraction." },
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
            max_tokens: 4096,
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

        // 6. Save extraction to Intelligence Vault extractions table
        const { error: extractionError } = await supabaseAdmin.from('extractions').insert({
            asset_id: assetData.id,
            confidence_score: extractionResult.confidence_score,
            primary_mechanic: extractionResult.primary_mechanic,
            visual_style: extractionResult.visual_style,
            color_palette: extractionResult.color_palette,
            evidence_anchors: extractionResult.evidence_anchors,
            dna_prompt: extractionResult.dna_prompt
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
