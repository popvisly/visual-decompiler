import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import OpenAI from 'openai';

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request) {
    const { userId } = await auth();
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

        return NextResponse.json({
            success: true,
            remixes: parsed.remixes || parsed.variants || parsed
        });

    } catch (err: any) {
        console.error('[Remix] Error:', err);
        return NextResponse.json({ error: err.message || 'Failed to generate remix' }, { status: 500 });
    }
}
