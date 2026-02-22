import { NextResponse } from 'next/server';
import { getOpenAI } from '@/lib/vision';
import { auth } from '@clerk/nextjs/server';
import { supabaseAdmin } from '@/lib/supabase';

export async function POST(req: Request) {
    const { userId } = await auth();
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
                    1. CATEGORY INERTIA: Analyze the current state of the category based on competitive deconstructions and market velocity.
                    2. THE PSYCHOLOGICAL BREACH: Detailing where current strategies are failing to address the audience's latent emotional needs (using Sentiment Mirror data).
                    3. STRATEGIC SOVEREIGNTY: Outlining the exact "Answer" and why it represents a dominant move in the category.
                    
                    Rules:
                    1. Minimum 300 words per section.
                    2. Cite specific "Evidence Anchors" (mechanics found in the deconstructions).
                    3. Do NOT make ads. Provide pure strategic analysis and production directives.
                    
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

        const result = JSON.parse(response.choices[0].message.content || '{}');
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
