import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';
import { getOpenAI } from '@/lib/vision';
import { AdDigest } from '@/types/digest';

export async function GET() {
    try {
        // 1. Fetch ads from the last 7 days
        const sevenDaysAgo = new Date();
        sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

        const { data: ads, error } = await supabaseAdmin
            .from('ad_digests')
            .select('*')
            .gte('created_at', sevenDaysAgo.toISOString())
            .eq('status', 'processed');

        if (error) throw error;
        if (!ads || ads.length === 0) {
            return NextResponse.json({ message: 'No new ads to synthesize.' });
        }

        // 2. Prepare context for AI
        const context = ads.map((ad: any) => {
            const d = ad.digest as AdDigest;
            return `Brand: ${ad.brand_guess} | Trigger: ${d.classification?.trigger_mechanic} | Position: ${d.strategy?.positioning_claim}`;
        }).join('\n');

        // 3. Generate Synthesis
        const openai = getOpenAI();
        const response = await openai.chat.completions.create({
            model: "gpt-4o",
            messages: [
                {
                    role: "system",
                    content: `Analyze these recent ad deconstructions and summarize the week's strategic landscape. 
                    Identify:
                    1. Dominant Psychological Triggers.
                    2. Creative Convergence (where competitors are doing the same thing).
                    3. Outliers (who is breaking the mold).
                    Format as professional, concise markdown.`
                },
                {
                    role: "user",
                    content: `Ads from the last 7 days:\n${context}`
                }
            ]
        });

        // 4. Save Pulse report (optional: we could have a pulses table, 
        // but for now let's just return it or save to a log)
        // For Milestone 11, we'll return it as a "Live Pulse".

        return NextResponse.json({
            date: new Date().toISOString(),
            adCount: ads.length,
            report: response.choices[0].message.content
        });

    } catch (err: any) {
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}
