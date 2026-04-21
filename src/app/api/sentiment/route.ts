import { NextResponse } from 'next/server';
import { getOpenAI } from '@/lib/vision';
import { getServerSession } from '@/lib/auth-server';

const SENTIMENT_STYLE_CONTRACT = [
    'STYLE CONTRACT (MANDATORY): Use clean strategy language that is calm, direct, and boardroom-ready.',
    '- Write short, decisive sentences.',
    '- Prefer plain strategic wording over abstract jargon.',
    '- Avoid repetition, filler, and phrase stacking.',
    '- Keep findings specific, comparative, and decision-oriented.',
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
        const { ads, pulseText } = await req.json();

        const adsContext = ads.map((ad: any) => {
            const d = ad.digest;
            return `
Brand: ${ad.brand || d.meta?.brand_guess}
Trigger: ${d.classification?.trigger_mechanic}
Semiotic Subtext: ${d.str_logic?.semiotic_subtext}
            `.trim();
        }).join('\n\n');

        const openai = getOpenAI();
        const response = await openai.chat.completions.create({
            model: 'gpt-4o',
            messages: [
                {
                    role: 'system',
                    content: `You are a Psychological Creative Strategist. Your task is to analyse a collection of advertising creatives and map their "Emotional Velocity" and "Psychological Footprint" against current market sentiment.
                    
                    Focus on:
                    1. Psychological Resonance (Trust, Urgency, Aspiration, Fear, Belonging).
                    2. Emotional Alignment (How the creative triggers land in the current cultural climate).
                    3. Strategic Impact (The predicted psychological residue left with the audience).
                    
                    Rules:
                    1. High-IQ, technical psychological language.
                    2. Objective analysis of impact, not creative suggestions.

                    ${SENTIMENT_STYLE_CONTRACT}

                    Output JSON format:
                    {
                        "metrics": [
                            { "label": string, "score": number (0-100), "resonance": "High" | "Medium" | "Low", "description": string }
                        ],
                        "psychologicalFootprint": string (1-2 sentences),
                        "alignmentScore": number (0-100)
                    }`
                },
                {
                    role: 'user',
                    content: `Market Pulse Context: ${pulseText || 'General luxury/high-fashion market'}\n\nAnalysed Collection:\n${adsContext}`
                }
            ],
            response_format: { type: "json_object" }
        });

        const rawResult = JSON.parse(response.choices[0].message.content || '{}');
        const result = normalizeStrategyLanguage(rawResult);
        return NextResponse.json(result);
    } catch (err: any) {
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}
