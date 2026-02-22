import { NextResponse } from 'next/server';
import { getOpenAI } from '@/lib/vision';
import { auth } from '@clerk/nextjs/server';

export async function POST(req: Request) {
    const { userId } = await auth();
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
                    content: `You are a Psychological Creative Strategist. Your task is to analyze a collection of advertising creatives and map their "Emotional Velocity" and "Psychological Footprint" against current market sentiment.
                    
                    Focus on:
                    1. Psychological Resonance (Trust, Urgency, Aspiration, Fear, Belonging).
                    2. Emotional Alignment (How the creative triggers land in the current cultural climate).
                    3. Strategic Impact (The predicted psychological residue left with the audience).
                    
                    Rules:
                    1. High-IQ, technical psychological language.
                    2. Objective analysis of impact, not creative suggestions.
                    
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
                    content: `Market Pulse Context: ${pulseText || 'General luxury/high-fashion market'}\n\nAnalyzed Collection:\n${adsContext}`
                }
            ],
            response_format: { type: "json_object" }
        });

        const result = JSON.parse(response.choices[0].message.content || '{}');
        return NextResponse.json(result);
    } catch (err: any) {
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}
