import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { supabaseAdmin } from '@/lib/supabase';
import { getOpenAI } from '@/lib/vision';

export async function POST(req: Request) {
    const { userId, orgId } = await auth();
    if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    try {
        const { boardId } = await req.json();
        if (!boardId) throw new Error('boardId is required');

        // 1. Fetch Board and its Ads
        const { data: board } = await supabaseAdmin
            .from('boards')
            .select('*')
            .eq('id', boardId)
            .single();

        if (!board) throw new Error('Board not found');

        const { data: items } = await supabaseAdmin
            .from('board_items')
            .select('ad_digests(*)')
            .eq('board_id', boardId);

        const ads = items?.map((i: any) => i.ad_digests) || [];
        if (ads.length === 0) throw new Error('Board has no ads to analyze');

        // 2. Prepare Synthesis Context
        const context = ads.map((ad: any) => {
            const d = ad.digest;
            return `
Brand: ${ad.brand || d.meta?.brand_guess}
Headline: ${d.extraction?.on_screen_copy?.primary_headline}
Trigger: ${d.classification?.trigger_mechanic}
Semiotic Subtext: ${d.strategy?.semiotic_subtext}
Narrative Hook: ${d.extraction?.narrative_arc?.hook_analysis || 'N/A'}
Strategic Anomaly: ${ad.is_anomaly ? 'YES - Significant Pivot Detected' : 'No'}
            `.trim();
        }).join('\n---\n');

        // 3. Generate Brief with GPT-4o
        const openai = getOpenAI();
        const response = await openai.chat.completions.create({
            model: 'gpt-4o',
            messages: [
                {
                    role: 'system',
                    content: 'You are an elite Creative Strategist. Your task is to synthesize a collection of competitive ads into a formal Creative Brief for a new campaign. You must account for narrative hooks and strategic shifts (anomalies) in the competitor behavior.'
                },
                {
                    role: 'user',
                    content: `Here are the competitive deconstructions from the board "${board.name}":\n\n${context}\n\nGenerate a structured Creative Brief in Markdown with these sections:\n1. CAMPAIGN OBJECTIVE\n2. TARGET AUDIENCE INSIGHT\n3. THE BARRIER\n4. STRATEGIC POSITIONING (The "Remixed" Angle)\n5. CREATIVE TRIGGERS & NARRATIVE ARCHITECTURE (Suggest specific hook/body/CTA patterns based on the deconstructions)\n6. COMPETITIVE VULNERABILITY (Identify shifts or gaps where competitors are deviating)`
                }
            ],
            temperature: 0.7
        });

        const brief = response.choices[0].message.content;

        return NextResponse.json({ brief });

    } catch (err: any) {
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}
