import { NextResponse } from 'next/server';
import { getOpenAI } from '@/lib/vision';
import { auth } from '@clerk/nextjs/server';

export async function POST(req: Request) {
    const { userId } = await auth();
    if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    try {
        const { boardName, strategicAnswer, stats } = await req.json();

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
                    
                    Output JSON format:
                    {
                        "slides": [
                            { "title": string, "subtitle": string, "type": "title" | "stat" | "insight" | "conclusion", "content": string, "metrics": [{ "label": string, "value": string }] }
                        ]
                    }`
                },
                {
                    role: 'user',
                    content: `Project: ${boardName}\n\nStrategic Answer:\n${strategicAnswer}\n\nKey Stats:\n${JSON.stringify(stats)}`
                }
            ],
            response_format: { type: "json_object" }
        });

        const result = JSON.parse(response.choices[0].message.content || '{"slides": []}');
        return NextResponse.json(result);
    } catch (err: any) {
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}
