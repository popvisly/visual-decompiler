import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';
import { getOpenAI } from '@/lib/vision';
import { generateEmbedding } from '@/lib/embeddings';
import { triggerWebhook } from '@/lib/webhooks';
import { AdDigest } from '@/types/digest';

export async function GET() {
    try {
        const now = new Date();
        const sevenDaysAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
        const twentyEightDaysAgo = new Date(now.getTime() - 28 * 24 * 60 * 60 * 1000);

        // 1. Fetch Recent Ads (7 Days) for Anomaly Detection & Reporting
        const { data: recentAds, error: recentError } = await supabaseAdmin
            .from('ad_digests')
            .select('*')
            .gte('created_at', sevenDaysAgo.toISOString())
            .eq('status', 'processed');

        if (recentError) throw recentError;
        if (!recentAds || recentAds.length === 0) {
            return NextResponse.json({ message: 'No new ads to synthesize.' });
        }

        // 2. Fetch Baseline Ads (Previous 21 Days) for Surge Detection
        const { data: baselineAds, error: baselineError } = await supabaseAdmin
            .from('ad_digests')
            .select('digest')
            .eq('status', 'processed')
            .lt('created_at', sevenDaysAgo.toISOString())
            .gte('created_at', twentyEightDaysAgo.toISOString());

        if (baselineError) throw baselineError;

        // 3. Macro-Trend Aggregation (Surge Detection)
        const getTacticStats = (ads: any[]) => {
            const triggers: Record<string, number> = {};
            const frameworks: Record<string, number> = {};
            ads.forEach(ad => {
                const d = ad.digest as AdDigest;
                if (d.classification?.trigger_mechanic) {
                    triggers[d.classification.trigger_mechanic] = (triggers[d.classification.trigger_mechanic] || 0) + 1;
                }
                if (d.classification?.narrative_framework) {
                    frameworks[d.classification.narrative_framework] = (frameworks[d.classification.narrative_framework] || 0) + 1;
                }
            });
            return { triggers, frameworks };
        };

        const recentStats = getTacticStats(recentAds);
        const baselineStats = getTacticStats(baselineAds || []);

        const surges: any[] = [];
        Object.entries(recentStats.triggers).forEach(([trigger, count]) => {
            const baseCount = (baselineStats.triggers[trigger] || 0) / 3; // Normalize to weekly
            const increase = baseCount === 0 ? count * 100 : ((count - baseCount) / baseCount) * 100;
            if (increase >= 30 && count >= 2) {
                surges.push({ type: 'trigger', name: trigger, increase: Math.round(increase) });
            }
        });

        // 4. Pattern Shift Detection (Vector Anomaly)
        const anomaliesFound: any[] = [];
        for (const ad of recentAds) {
            const brand = ad.brand || ad.brand_guess;
            if (!brand) continue;

            let currentEmbedding = ad.embedding;
            if (!currentEmbedding) {
                const textToEmbed = `${brand} ${ad.digest?.classification?.trigger_mechanic} ${ad.digest?.strategy?.positioning_claim} ${ad.digest?.strategy?.semiotic_subtext}`;
                currentEmbedding = await generateEmbedding(textToEmbed);
                await supabaseAdmin.from('ad_digests').update({ embedding: currentEmbedding }).eq('id', ad.id);
            }

            const { data: brandBaseline } = await supabaseAdmin
                .from('ad_digests')
                .select('embedding')
                .eq('status', 'processed')
                .or(`brand.eq."${brand}",brand_guess.eq."${brand}"`)
                .neq('id', ad.id)
                .not('embedding', 'is', null)
                .order('created_at', { ascending: false })
                .limit(10);

            if (brandBaseline && brandBaseline.length >= 3) {
                const vectors = brandBaseline.map((b: any) => typeof b.embedding === 'string' ? JSON.parse(b.embedding) : b.embedding);
                const dim = vectors[0].length;
                const centroid = new Array(dim).fill(0);
                vectors.forEach((v: any) => v.forEach((val: number, i: number) => centroid[i] += val / vectors.length));

                const dotProduct = currentEmbedding.reduce((acc: number, val: number, i: number) => acc + val * centroid[i], 0);
                const magA = Math.sqrt(currentEmbedding.reduce((acc: number, val: number) => acc + val * val, 0));
                const magB = Math.sqrt(centroid.reduce((acc: number, val: number) => acc + val * val, 0));
                const similarity = dotProduct / (magA * magB);

                if (similarity < 0.85) {
                    const reason = `Strategic shift detected. Dissimilarity to brand centroid: ${Math.round((1 - similarity) * 100)}%`;
                    await supabaseAdmin.from('ad_digests').update({ is_anomaly: true, anomaly_score: 1 - similarity, anomaly_reason: reason }).eq('id', ad.id);
                    anomaliesFound.push({ ...ad, anomaly_reason: reason });

                    if (ad.org_id) {
                        await triggerWebhook(ad.org_id, 'strategic_anomaly', { ad_id: ad.id, brand, reason, score: 1 - similarity });
                    }
                }
            }
        }

        // 5. Global Pulse Synthesis
        const contextAds = recentAds.map((ad: any) => {
            const d = ad.digest as AdDigest;
            const anomalyMarker = anomaliesFound.find(a => a.id === ad.id) ? ' [STRATEGIC PIVOT]' : '';
            return `Brand: ${ad.brand || ad.brand_guess} | Trigger: ${d.classification?.trigger_mechanic} | Position: ${d.strategy?.positioning_claim}${anomalyMarker}`;
        }).join('\n');

        const surgeContext = surges.map(s => `SURGE: ${s.name} (${s.increase}% increase vs baseline)`).join('\n');

        const openai = getOpenAI();
        const response = await openai.chat.completions.create({
            model: "gpt-4o",
            messages: [
                {
                    role: "system",
                    content: `Analyze these recent ad deconstructions and summarize the week's strategic landscape. 
                    Identify:
                    1. Dominant Psychological Triggers & Macro Surges.
                    2. Creative Convergence (where competitors are doing the same thing).
                    3. Strategic Pivots (marked as [STRATEGIC PIVOT]). Explain why these are significant deviations.
                    Format as professional, concise markdown.`
                },
                {
                    role: "user",
                    content: `Macro Surges:\n${surgeContext}\n\nRecent Ads:\n${contextAds}`
                }
            ]
        });

        const reportText = response.choices[0].message.content;

        // 6. Store Report
        await supabaseAdmin.from('pulse_reports').insert({
            report_text: reportText,
            ad_count: recentAds.length,
            anomalies_detected: anomaliesFound.length,
            surges: surges
        });

        return NextResponse.json({
            date: new Date().toISOString(),
            adCount: recentAds.length,
            anomaliesDetected: anomaliesFound.length,
            report: reportText,
            surges
        });

    } catch (err: any) {
        console.error('[Pulse Cron] Error:', err);
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}
