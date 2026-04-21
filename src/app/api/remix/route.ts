import { NextResponse } from 'next/server';
import { getServerSession } from '@/lib/auth-server';
import OpenAI from 'openai';

const openai = process.env.OPENAI_API_KEY ? new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
}) : null as unknown as OpenAI;

const REMIX_STYLE_CONTRACT = [
    'STYLE CONTRACT (MANDATORY): Use clean strategy language that is calm, direct, and boardroom-ready.',
    '- Write short, decisive sentences.',
    '- Prefer plain strategic wording over abstract jargon.',
    '- Avoid repetition, filler, and phrase stacking.',
    '- Keep each remix commercially clear and execution-ready.',
    '- Keep prose in sentence case (no random ALL CAPS blocks in narrative copy).',
    '- Never output truncated fragments, dangling clauses, or half-finished quotes.',
].join('\n');

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
    const { userId } = await getServerSession();
    if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    try {
        const { digest, adId } = await req.json();

        if (!digest) {
            return NextResponse.json({ error: 'Ad digest is required.' }, { status: 400 });
        }

        const systemPrompt = `
You are an Elite Creative Director at a top-tier global agency (Droga5, Wieden+Kennedy style).
Your task is to take a deconstructed ad strategy and "REMIX" it into 3 distinct new creative directions.

CRITICAL RULES:
1. Maintain the core Brand Association Values.
2. Pivot the Trigger Mechanic or Narrative Framework for each variant to show range.
3. Each variant must include:
   - "Angle Name": High-concept title.
   - "Headline": The main hero copy.
   - "Strategic Logic": Why this works (1 sentence).
   - "Visual Scene Description": What we see.
4. Return ONLY a valid JSON array of 3 objects. No markdown.

${REMIX_STYLE_CONTRACT}

Input Digest Context:
- Brand: ${digest.meta?.brand_guess}
- Original Trigger: ${digest.classification?.trigger_mechanic}
- Original Headline: ${digest.extraction?.on_screen_copy?.primary_headline}
- Competitive Moat: ${digest.strategy?.competitive_advantage}
`;

        const response = await openai.chat.completions.create({
            model: "gpt-4o",
            messages: [
                { role: "system", content: systemPrompt },
                { role: "user", content: "Generate 3 strategic remixes." }
            ],
            response_format: { type: "json_object" }
        });

        const content = response.choices[0].message.content;
        const parsed = JSON.parse(content || '{"remixes": []}');
        const remixes = normalizeStrategyLanguage(parsed.remixes || parsed.variants || parsed);

        return NextResponse.json({
            success: true,
            remixes
        });

    } catch (err: any) {
        console.error('[Remix] Error:', err);
        return NextResponse.json({ error: err.message || 'Failed to generate remix' }, { status: 500 });
    }
}
