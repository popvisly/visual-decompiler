import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';
import crypto from 'crypto';
import sharp from 'sharp';
import { getAnthropic, getClaudeModel } from '@/lib/anthropic';
import { getServerSession } from '@/lib/auth-server';
import { assertUsageAvailable } from '@/lib/usage';
import { normalizeSector } from '@/lib/sector-taxonomy';
import { safeJsonParseWithOptionalModelRepair } from '@/lib/safe-json';

export const maxDuration = 300; // 5 minutes max function duration for Pro/Enterprise tier
export const dynamic = 'force-dynamic';

function normalizeAgencyTier(rawTier?: string | null) {
    const tier = (rawTier || '').toLowerCase().trim();
    if (tier === 'agency' || tier === 'agency sovereignty' || tier === 'enterprise') return 'Agency Sovereignty';
    if (tier === 'professional') return 'Professional';
    if (tier === 'pro' || tier === 'strategic') return 'Strategic';
    return 'Observer';
}

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

        const { data: currentUser } = await supabaseAdmin
            .from('users')
            .select('tier')
            .eq('id', session.userId)
            .maybeSingle();

        const normalizedEmail = (session.email || `${session.userId}@local.visualdecompiler`).toLowerCase();

        const { data: membershipByUser } = await supabaseAdmin
            .from('agency_members')
            .select('agency_id')
            .eq('user_id', session.userId)
            .eq('status', 'active')
            .order('created_at', { ascending: true })
            .limit(1)
            .maybeSingle();

        const membership = membershipByUser
            ? membershipByUser
            : await (async () => {
                  const { data: membershipByEmail } = await supabaseAdmin
                      .from('agency_members')
                      .select('agency_id')
                      .ilike('email', normalizedEmail)
                      .eq('status', 'active')
                      .order('created_at', { ascending: true })
                      .limit(1)
                      .maybeSingle();
                  return membershipByEmail;
              })();

        let workspaceAgencyId = membership?.agency_id || null;

        if (!workspaceAgencyId) {
            const { data: newAgency, error: newAgencyError } = await supabaseAdmin
                .from('agencies')
                .insert({
                    name: `${normalizedEmail.split("@")[0] || "visual decompiler"} studio`,
                    tier: normalizeAgencyTier(currentUser?.tier),
                })
                .select('id')
                .single();

            if (newAgencyError || !newAgency) {
                return NextResponse.json({ error: 'Failed to initialize workspace.' }, { status: 500 });
            }

            workspaceAgencyId = newAgency.id;

            await supabaseAdmin.from('agency_members').upsert(
                {
                    agency_id: workspaceAgencyId,
                    user_id: session.userId,
                    email: normalizedEmail,
                    role: 'owner',
                    status: 'active',
                    joined_at: new Date().toISOString(),
                    updated_at: new Date().toISOString(),
                },
                { onConflict: 'agency_id,email' },
            );
        }

        // Handle both FormData (file/files) and JSON (mediaUrl)
        const contentType = req.headers.get('content-type') || '';
        let buffers: Buffer[] = [];
        let fileExt = 'png';
        let mimeTypes: string[] = [];
        let brandHint = '';
        let sectorHint = '';
        let platformHint = '';

        if (contentType.includes('application/json')) {
            const body = await req.json();
            const mediaUrl = body.mediaUrl;
            brandHint = typeof body.brandName === 'string' ? body.brandName.trim() : '';
            sectorHint = normalizeSector(typeof body.marketSector === 'string' ? body.marketSector : '');
            platformHint = typeof body.platform === 'string' ? body.platform.trim() : '';
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
            
            const mimeType = fetchRes.headers.get('content-type') || 'image/jpeg';
            if (!mimeType.startsWith('image/')) {
                return NextResponse.json({ error: 'Only images are supported for Ingestion currently.' }, { status: 400 });
            }
            
            const arrayBuffer = await fetchRes.arrayBuffer();
            buffers = [Buffer.from(new Uint8Array(arrayBuffer))];
            fileExt = mimeType.split('/')[1] || 'png';
            mimeTypes = [mimeType];
        } else if (contentType.includes('multipart/form-data')) {
            const formData = await req.formData();
            const files = (formData.getAll('files') as unknown[])
                .filter((value) => value instanceof File) as File[];
            const legacyFile = formData.get('file') as File | null;
            brandHint = typeof formData.get('brandName') === 'string' ? String(formData.get('brandName')).trim() : '';
            sectorHint = normalizeSector(typeof formData.get('marketSector') === 'string' ? String(formData.get('marketSector')) : '');
            platformHint = typeof formData.get('platform') === 'string' ? String(formData.get('platform')).trim() : '';

            const resolvedFiles = files.length > 0 ? files : legacyFile ? [legacyFile] : [];

            if (!resolvedFiles.length) {
                return NextResponse.json({ error: 'No file uploaded.' }, { status: 400 });
            }
            if (resolvedFiles.length > 5) {
                return NextResponse.json({ error: 'Too many files. Maximum is 5 frames.' }, { status: 400 });
            }

            buffers = [];
            mimeTypes = [];
            for (const file of resolvedFiles) {
                if (!file.type.startsWith('image/')) {
                    return NextResponse.json({ error: 'Only images are supported for Ingestion currently.' }, { status: 400 });
                }
                fileExt = file.name.split('.').pop() || 'png';
                mimeTypes.push(file.type || 'image/jpeg');
                const arrayBuffer = await file.arrayBuffer();
                buffers.push(Buffer.from(new Uint8Array(arrayBuffer)));
            }
        } else {
            return NextResponse.json({ error: 'Unsupported Content-Type. Use multipart/form-data or application/json.' }, { status: 400 });
        }

        // Compress images to max 1024px longest side
        const compressedBuffers: Buffer[] = [];
        for (const buf of buffers) {
            compressedBuffers.push(
                await sharp(buf).resize({ width: 1024, height: 1024, fit: 'inside', withoutEnlargement: true }).toBuffer(),
            );
        }

        const primaryBuffer = compressedBuffers[0];
        const primaryMimeType = mimeTypes[0] || 'image/jpeg';

        // 2. Semantic Hash Check (Deduplication) - single-frame only
        const primaryHash = crypto.createHash('sha256').update(primaryBuffer).digest('hex');
        if (compressedBuffers.length === 1) {
            const { data: existingAssets } = await supabaseAdmin
                .from('assets')
                .select('id')
                .eq('user_id', session.userId)
                .ilike('file_url', `%${primaryHash}%`)
                .limit(1);

            if (existingAssets && existingAssets.length > 0) {
                const existingAsset = existingAssets[0];
                console.log(`[Ingest] Semantic hit for hash ${primaryHash}. Bypassing Claude.`);

                // Check ownership and claim if unowned (legacy/test asset)
                const { data: assetCheck } = await supabaseAdmin.from('assets').select('user_id').eq('id', existingAsset.id).single();
                if (assetCheck && !assetCheck.user_id) {
                    console.log(`[Ingest] Claiming unowned asset ${existingAsset.id} for user ${session.userId}`);
                    await supabaseAdmin.from('assets').update({ user_id: session.userId }).eq('id', existingAsset.id);
                }

                return NextResponse.json({ success: true, assetId: existingAsset.id, cached: true });
            }
        }

        // 3. Upload to Supabase Storage Bucket 'vault-assets' (all frames)
        const uploadedUrls: string[] = [];
        for (let i = 0; i < compressedBuffers.length; i++) {
            const frameHash = crypto.createHash('sha256').update(compressedBuffers[i]).digest('hex');
            const fileName = `${frameHash}.${fileExt}`;
            const filePath = `ingestions/${fileName}`;

            const { error: uploadError } = await supabaseAdmin.storage
                .from('vault-assets')
                .upload(filePath, compressedBuffers[i], {
                    contentType: mimeTypes[i] || primaryMimeType,
                    upsert: true,
                });

            if (uploadError) throw uploadError;

            const { data: publicUrlData } = supabaseAdmin.storage.from('vault-assets').getPublicUrl(filePath);
            uploadedUrls.push(publicUrlData.publicUrl);
        }

        // 4. Retrieve Public URL (string for single frame, JSON string for multi-frame)
        const publicUrl = uploadedUrls.length === 1 ? uploadedUrls[0] : JSON.stringify(uploadedUrls);

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
STYLE CONTRACT (MANDATORY): Use clean strategy language that is calm, direct, and boardroom-ready.
- Write short, decisive sentences.
- Prefer plain strategic wording over abstract jargon.
- Avoid repetition, filler, and phrase stacking.
- Never output truncated fragments, dangling clauses, or half-finished quotes.
- Keep all recommendations executable and specific.
- Keep copy in sentence case (no random ALL CAPS blocks in prose).

QUALITY GATE WRITING RULES (MANDATORY):
- Strategic Recommendation: exactly 1 clear decision sentence + 1 rationale sentence.
- Action Protocol: exactly 3 numbered actions, one sentence each, imperative voice.
- Known Unknowns: concise and factual, no speculative flourish.
- System Verdict: one-line verdict + one-line reason.`;

        const base64Data = primaryBuffer.toString('base64');

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
                    media_type: primaryMimeType as AuthImageMedia,
                    data: base64Data
                }
            }
        ];

        const response = await anthropic.messages.create({
            model,
            max_tokens: 8192,
            temperature: 0,
            system: systemPrompt,
            messages: [{ role: 'user', content: userContent }],
        });

        const contentBlock = response.content.find((block) => block.type === 'text');
        if (!contentBlock) throw new Error("Claude returned no text response");

        const text = contentBlock.text;
        const responseLength = text.length;
        const stopReason = response.stop_reason;

        console.log(`[Ingest] Claude Response Length: ${responseLength}, Stop Reason: ${stopReason}`);

        let extractionResult;
        try {
            const parsed = await safeJsonParseWithOptionalModelRepair({
                text,
                logPrefix: 'Ingest',
                repair: async ({ candidate, errorMessage }) => {
                    const fixResponse = await anthropic.messages.create({
                        model,
                        max_tokens: 2048,
                        temperature: 0,
                        system:
                            "You are a strict JSON repair utility. Return ONLY valid JSON (no markdown, no commentary). Preserve the original structure and keys. Do not add new keys unless necessary to make JSON valid.",
                        messages: [
                            {
                                role: 'user',
                                content: `Fix the following invalid JSON so it parses. Parse error: ${errorMessage}\n\nINVALID_JSON:\n${candidate}`,
                            },
                        ],
                    });

                    const block = fixResponse.content.find((b) => b.type === 'text');
                    return block?.text || '';
                },
            });

            if (!parsed.ok) throw parsed.error;
            extractionResult = parsed.value;
            extractionResult = {
                ...extractionResult,
                primary_mechanic: cleanStrategyLine(String(extractionResult?.primary_mechanic || '')),
                visual_style: cleanStrategyLine(String(extractionResult?.visual_style || '')),
                dna_prompt: cleanStrategyLine(String(extractionResult?.dna_prompt || '')),
                full_dossier: normalizeStrategyLanguage(extractionResult?.full_dossier),
            };
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

        // Phase 1: Multi-frame sequence analysis (non-fatal, stored inside full_dossier)
        if (compressedBuffers.length > 1) {
            const sequenceSystem = `You are Visual Decompiler operating in Multi-Frame mode.
Return ONLY valid JSON. No markdown. No commentary.

Schema:
{
  "platform": "TikTok|Instagram|Facebook|X|YouTube|Other",
  "frames": [
    {
      "index": 1,
      "role": "hook|proof|cta|other",
      "what_grabs_first": "short",
      "where_the_eye_goes_next": "short",
      "likely_endpoint": "short",
      "biggest_problem": "short",
      "single_best_fix": "short"
    }
  ],
  "sequence": {
    "hook_to_cta_coherence": "high|medium|low",
    "main_failure_mode": "short",
    "fix_order": ["short", "short", "short"]
  }
}`;

            const frameBlocks: ContentBlock[] = [
                {
                    type: 'text',
                    text: `Analyze this ${compressedBuffers.length}-frame ad sequence.${platformHint ? ` Platform target: ${platformHint}.` : ''} Identify hook/proof/CTA roles and a prioritized fix order. Be decisive.`,
                },
                ...compressedBuffers.map((buf, idx) => ({
                    type: 'image' as const,
                    source: {
                        type: 'base64' as const,
                        media_type: (mimeTypes[idx] || primaryMimeType) as AuthImageMedia,
                        data: buf.toString('base64'),
                    },
                })),
            ];

            try {
                const sequenceResp = await anthropic.messages.create({
                    model,
                    max_tokens: 2048,
                    temperature: 0,
                    system: sequenceSystem,
                    messages: [{ role: 'user', content: frameBlocks }],
                });

                const seqText = sequenceResp.content.find((block) => block.type === 'text')?.text || '';
                const parsedSeq = await safeJsonParseWithOptionalModelRepair({
                    text: seqText,
                    logPrefix: 'IngestSequence',
                });

                if (parsedSeq.ok) {
                    extractionResult = {
                        ...extractionResult,
                        full_dossier: {
                            ...(extractionResult.full_dossier as any),
                            platform_target: platformHint || null,
                            frames_count: compressedBuffers.length,
                            sequence_analysis: parsedSeq.value,
                        },
                    };
                }
            } catch (err) {
                console.warn('[Ingest] Sequence analysis failed (non-fatal):', err);
            }
        }

        // 6. Dynamic Brand Binding
        let targetBrandId = null;
        const resolvedBrandName = brandHint || extractionResult.brand_name_guess || 'Unknown Brand';
        const marketSector = normalizeSector(sectorHint || extractionResult.market_sector_guess || 'Other');

        // Check if brand exists in Intelligence Vault
        const { data: existingBrand } = await supabaseAdmin.from('brands')
            .select('id')
            .eq('agency_id', workspaceAgencyId)
            .ilike('name', resolvedBrandName)
            .limit(1)
            .maybeSingle();

        if (existingBrand) {
            targetBrandId = existingBrand.id;
        } else {
            if (!workspaceAgencyId) throw new Error('No agency context found for this workspace.');

            const { data: newBrand, error: newBrandError } = await supabaseAdmin.from('brands').insert({
                name: resolvedBrandName,
                market_sector: marketSector,
                agency_id: workspaceAgencyId
            }).select('id').single();

            if (newBrandError) throw newBrandError;
            targetBrandId = newBrand.id;
        }

        // 7. Create new Asset in database
        const { data: assetData, error: insertError } = await supabaseAdmin.from('assets').insert({
            brand_id: targetBrandId,
            user_id: session.userId,
            type: compressedBuffers.length > 1 ? 'CAROUSEL' : 'STATIC',
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
