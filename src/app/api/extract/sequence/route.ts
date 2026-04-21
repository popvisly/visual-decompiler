import { NextResponse } from 'next/server';
import { getAnthropic, getClaudeModel } from '@/lib/anthropic';
import { supabaseAdmin } from '@/lib/supabase';

// SCHEMA 2: Sequential Architecture interface
export interface SequentialArchitectureResponse {
    sequence_id: string;
    status: 'success' | 'error';
    tension_graph: {
        labels: string[];
        cognitive_load_scores: number[];
        aesthetic_retention_scores: number[];
    };
    frames: Array<{
        frame_index: number;
        role: string;
        visual_mechanic: string;
        friction_warnings: string[] | null;
    }>;
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
        const { assetId, fileUrls } = await req.json();

        if (!assetId || !fileUrls || !Array.isArray(fileUrls) || fileUrls.length === 0) {
            return NextResponse.json({ error: 'assetId and an array of fileUrls are required' }, { status: 400 });
        }

        // 1. Prepare Claude API call to analyse Carousel sequence
        const anthropic = getAnthropic();
        const model = getClaudeModel('agency');

        const systemPrompt = `You are a forensic advertising strategist conducting a Sequential Architecture analysis of a carousel or multi-frame ad.
CRITICAL INSTRUCTION: You MUST return a valid JSON object matching this exact schema:
{
  "sequence_id": "seq_[random_id]",
  "status": "success",
  "tension_graph": {
    "labels": ["Slide 1", "Slide 2", "Slide 3"],
    "cognitive_load_scores": [number, number, number],
    "aesthetic_retention_scores": [number, number, number]
  },
  "frames": [
    {
      "frame_index": number,
      "role": "string",
      "visual_mechanic": "string",
      "friction_warnings": ["string"] | null
    }
  ]
}

Analyse the narrative arc, cognitive load, and visual hooks across the frames. Keep your textual explanations concise (1-2 sentences max).

STYLE CONTRACT (MANDATORY): Use clean strategy language that is calm, direct, and boardroom-ready.
- Write short, decisive sentences.
- Prefer plain strategic wording over abstract jargon.
- Avoid repetition, filler, and phrase stacking.
- Never output truncated fragments, dangling clauses, or half-finished quotes.
- Keep findings specific and executable.
- Keep copy in sentence case (no random ALL CAPS blocks in prose).`;

        type AuthImageMedia = "image/jpeg" | "image/png" | "image/webp" | "image/gif";
        type ContentBlock =
            | { type: "text"; text: string }
            | { type: "image"; source: { type: "base64"; media_type: AuthImageMedia; data: string } };

        // Map each image URL to Anthropics image block
        const userContent: ContentBlock[] = [
            { type: "text", text: "Analyse this image sequence for Sequential Architecture:" }
        ];

        for (const url of fileUrls) {
            try {
                const res = await fetch(url);
                if (!res.ok) throw new Error(`Failed to fetch image: ${url}`);
                const arrayBuffer = await res.arrayBuffer();
                const buffer = Buffer.from(arrayBuffer);
                const base64Data = buffer.toString('base64');
                const mimeType = res.headers.get('content-type') || 'image/jpeg';

                userContent.push({
                    type: "image",
                    source: {
                        type: "base64",
                        media_type: mimeType as "image/jpeg" | "image/png" | "image/webp" | "image/gif",
                        data: base64Data
                    }
                });
            } catch (err) {
                // Silently skip un-fetchable images
            }
        }

        if (userContent.length === 1) {
            return NextResponse.json({ error: 'Could not load any images from given URLs' }, { status: 400 });
        }

        // 2. Call Claude
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

        const rawResult = JSON.parse(text) as SequentialArchitectureResponse;
        const result = normalizeStrategyLanguage(rawResult) as SequentialArchitectureResponse;

        // 3. Save sequence extraction to Intelligence Vault (Phase 2 tables)
        // Note: To match Phase 2 schema strictly `extractions` expects specific fields. 
        // Usually, sequenced data is either merged or placed in `evidence_anchors` as JSONB. 
        await supabaseAdmin.from('extractions').upsert({
            asset_id: assetId,
            confidence_score: 90, // Example placeholder
            primary_mechanic: 'Sequential Architecture',
            visual_style: 'Multi-frame Narrative',
            color_palette: [], // Needs dominant colors fallback or extraction logic
            evidence_anchors: result.frames,
            dna_prompt: result.tension_graph.labels.join(', ')
        });

        return NextResponse.json(result);

    } catch (error) {
        return NextResponse.json({ status: 'error', error: error instanceof Error ? error.message : "Unknown Error" }, { status: 500 });
    }
}
