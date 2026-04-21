import { NextResponse } from 'next/server';
import { getOpenAI } from '@/lib/vision';
import { getServerSession } from '@/lib/auth-server';
import { supabaseAdmin } from '@/lib/supabase';

const NARRATIVE_STYLE_CONTRACT = [
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
        const { boardId, boardName, strategicAnswer, sentiment, forecasting, visualDna } = await req.json();
        if (!boardId) throw new Error("boardId is required");

        const openai = getOpenAI();
        const response = await openai.chat.completions.create({
            model: 'gpt-4o',
            messages: [
                {
                    role: 'system',
                    content: `You are a Senior Strategic Advisor at a world-class management consultancy (e.g., McKinsey, BCG). Your task is to transform a collection of advertising deconstructions into a long-form, evidentiary Strategic White Paper.
                    
                    Tone: Professional, clinical, evidentiary, and highly authoritative.
                    
                    Structure:
                    1. CATEGORY INERTIA: Analyse the current state of the category based on competitive deconstructions and market velocity.
                    2. THE PSYCHOLOGICAL BREACH: Detailing where current strategies are failing to address the audience's latent emotional needs (using Sentiment Mirror data).
                    3. STRATEGIC SOVEREIGNTY: Outlining the exact "Answer" and why it represents a dominant move in the category.
                    
                    Rules:
                    1. Minimum 300 words per section.
                    2. Cite specific "Evidence Anchors" (mechanics found in the deconstructions).
                    3. Do NOT make ads. Provide pure strategic analysis and production directives.

                    ${NARRATIVE_STYLE_CONTRACT}

                    Output JSON format:
                    {
                        "title": string (Technical and authoritative),
                        "description": string (Executive summary overview),
                        "sections": [
                            { "title": string, "content": string (Markdown), "type": "analysis" | "evidence" | "hypothesis" }
                        ]
                    }`
                },
                {
                    role: 'user',
                    content: `
                    Collection: ${boardName}
                    
                    Strategic Answer Baseline:
                    ${strategicAnswer}
                    
                    Psychological Data (Sentiment):
                    ${JSON.stringify(sentiment)}
                    
                    Market Forecasting:
                    ${JSON.stringify(forecasting)}
                    
                    Aesthetic DNA:
                    ${visualDna}
                    `.trim()
                }
            ],
            response_format: { type: "json_object" }
        });

        const rawResult = JSON.parse(response.choices[0].message.content || '{}');
        const result = normalizeStrategyLanguage(rawResult) as Record<string, unknown>;
        const whitePaper = {
            ...result,
            generatedAt: new Date().toISOString()
        };

        // Persist to board
        await supabaseAdmin
            .from('boards')
            .update({
                white_paper: whitePaper
            })
            .eq('id', boardId);

        return NextResponse.json(whitePaper);
    } catch (err: any) {
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}
