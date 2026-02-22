import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { supabaseAdmin } from '@/lib/supabase';
import { getOpenAI } from '@/lib/vision';
import { VisualDNAService } from '@/lib/visual_dna';
import { extractKeyframes, cleanupFrames } from '@/lib/video';
import fs from 'fs';
import path from 'path';
import os from 'os';

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
        const adsContext = ads.map((ad: any) => {
            const d = ad.digest;
            return `
Brand: ${ad.brand || d.meta?.brand_guess}
Headline: ${d.extraction?.on_screen_copy?.primary_headline}
Trigger: ${d.classification?.trigger_mechanic}
Semiotic Subtext: ${d.strategy?.semiotic_subtext}
Narrative Hook: ${d.extraction?.narrative_arc?.hook_analysis || 'N/A'}
Visual Pacing: ${d.extraction?.narrative_arc?.pacing_notes || 'N/A'}
Strategic Anomaly: ${ad.is_anomaly ? 'YES - Significant Pivot Detected' : 'No'}
            `.trim();
        }).join('\n---\n');

        const visualDNAPatterns = VisualDNAService.aggregate(ads.map((ad: any) => ad.digest));

        // 2.5 Extract Representative Frames for Multimodal Context
        console.log(`[Synthesis] Extracting frames for multimodal context...`);
        const visualContext: any[] = [];
        const topAds = ads.slice(0, 3); // Sample the top 3 ads

        for (const ad of topAds) {
            try {
                if (ad.media_kind === 'video') {
                    const extraction = await extractKeyframes(ad.media_url, [{ t_ms: 0, label: 'Hook' }]);
                    const framePath = extraction.results[0].path;
                    const base64 = fs.readFileSync(framePath, { encoding: 'base64' });
                    visualContext.push({
                        type: "image_url",
                        image_url: { url: `data:image/jpeg;base64,${base64}` }
                    });
                    cleanupFrames(extraction.tempDir);
                } else {
                    // For images, we fetch and convert to base64
                    const imgRes = await fetch(ad.media_url);
                    const buffer = Buffer.from(await imgRes.arrayBuffer());
                    const base64 = buffer.toString('base64');
                    const mimeType = imgRes.headers.get('content-type') || 'image/jpeg';
                    visualContext.push({
                        type: "image_url",
                        image_url: { url: `data:${mimeType};base64,${base64}` }
                    });
                }
            } catch (err) {
                console.warn(`[Synthesis] Visual context extraction failed for ad ${ad.id}:`, err);
            }
        }

        // 3. Fetch Latest Pulse Intelligence
        const { data: latestPulse } = await supabaseAdmin
            .from('pulse_reports')
            .select('report_text')
            .order('created_at', { ascending: false })
            .limit(1)
            .single();

        // 4. Generate Neural Answer with GPT-4o
        const openai = getOpenAI();
        const response = await openai.chat.completions.create({
            model: 'gpt-4o',
            messages: [
                {
                    role: 'system',
                    content: `You are an elite Creative Strategist and Film Director. Your task is to provide "The Answer": a high-IQ, synthetic campaign strategy based on a Client Brief and a collection of competitive deconstructions.
                    
                    Current Strategic Landscape (Industry-wide):
                    ${latestPulse?.report_text || 'No recent macro-trends detected.'}

                    Agency's Client Brief:
                    ${board.client_brief_text || 'No specific client brief provided. Use general category intelligence.'}

                    Competitive Aesthetic DNA (Aggregated Metadata):
                    ${visualDNAPatterns}

                    Instructions:
                    1. FIND THE GAP: Analyze where the competitive ads (provided as text data AND visual frames) are failing to address the objectives in the Client Brief.
                    2. VISUAL VERIFICATION: Use the provided images to verify the "Aesthetic DNA." If the metadata says "Minimalist" but you see "Chaotic," prioritize your visual observation.
                    3. THE SYNTHETIC HOOK: Provide a mechanical, 3-second hook that beats current competitor patterns.
                    4. VISUAL DNA DIRECTIVE: Give exact instructions on lenses, lighting, and motion (Visual DNA) to contrast or dominate the competitors.
                    5. NARRATIVE ARCHITECTURE: Provide the exact 15-30s script framework based on deconstructed pattern mastery.
                    
                    OUTPUT FORMAT: Return a JSON object with:
                    - "brief": The Markdown strategic answer.
                    - "visual_mirror": { "title": string, "directive": string, "rationale": string } based on the most significant visual contrast detected.`
                },
                {
                    role: 'user',
                    content: [
                        { type: "text", text: `Competitive Deconstructions (Text Data) from collection "${board.name}":\n\n${adsContext}\n\nReview these reference images for visual confirmation:` },
                        ...visualContext,
                        { type: "text", text: `Generate "The Strategic Answer" in Markdown with these EXACT sections:\n\n1. PATTERN CONGRUENCY (Key competitor mechanics to adopt)\n2. THE STRATEGIC GAP (Where competitors are blind to our brief)\n3. THE SYNTHETIC HOOK (Exact mechanical hook to win in 3 seconds)\n4. VISUAL DNA DIRECTIVE (Lenses, Lighting, and Motion specifics to dominate the category)\n5. NARRATIVE SCRIPT ARCHITECTURE (The psychological script framework)` }
                    ]
                }
            ],
            temperature: 0.6,
            response_format: { type: "json_object" }
        });

        const result = JSON.parse(response.choices[0].message.content || '{}');
        const brief = result.brief;
        const visualMirror = result.visual_mirror;

        // 5. Persist the Strategic Answer for Shared Portal access
        await supabaseAdmin
            .from('boards')
            .update({
                strategic_answer: {
                    content: brief,
                    visual_mirror: visualMirror,
                    generated_at: new Date().toISOString(),
                    visual_dna: visualDNAPatterns
                }
            })
            .eq('id', boardId);

        return NextResponse.json({ brief, visualMirror });

    } catch (err: any) {
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}
