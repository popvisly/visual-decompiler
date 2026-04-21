import { NextResponse } from 'next/server';
import { getOpenAI } from '@/lib/vision';
import { getServerSession } from '@/lib/auth-server';

const SUMMARIZE_STYLE_CONTRACT = [
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
        const { boardName, strategicAnswer, stats, sentiment } = await req.json();

        const openai = getOpenAI();
        const response = await openai.chat.completions.create({
            model: 'gpt-4o',
            messages: [
                {
                    role: 'system',
                    content: `You are a World-Class Creative Director. Your task is to transform a complex campaign strategy into a high-impact, typographic executive presentation (5-slide deck).
                    
                    Rules:
                    1. Use extremely concise, punchy language.
                    2. High-IQ, synthetic headlines.
                    3. No filler words.

                    ${SUMMARIZE_STYLE_CONTRACT}

                    Output JSON format:
                    {
                        "slides": [
                            { 
                                "title": string, 
                                "subtitle": string, 
                                "type": "title" | "stat" | "insight" | "conclusion" | "sentiment", 
                                "content": string, 
                                "metrics": [{ "label": string, "value": string }] 
                            }
                        ]
                    }`
                },
                {
                    role: 'user',
                    content: `Project: ${boardName}\n\nStrategic Answer:\n${strategicAnswer}\n\nKey Stats:\n${JSON.stringify(stats)}\n\nSentiment Intelligence:\n${JSON.stringify(sentiment)}`
                }
            ],
            response_format: { type: "json_object" }
        });

        const rawResult = JSON.parse(response.choices[0].message.content || '{"slides": []}');
        const result = normalizeStrategyLanguage(rawResult);
        return NextResponse.json(result);
    } catch (err: any) {
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}
