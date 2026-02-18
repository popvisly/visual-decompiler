import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';
import { extractKeyframes, cleanupFrames } from '@/lib/video';
import { decompileAd, VisionInput } from '@/lib/vision';
import { AdDigestSchema } from '@/types/digest';
import fs from 'fs';

export async function POST(req: Request) {
    // 1. Authorization Check
    const authHeader = req.headers.get('Authorization');
    const expectedToken = process.env.WORKER_SECRET_TOKEN;

    if (!expectedToken || authHeader !== `Bearer ${expectedToken}`) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    try {
        // 2. Fetch Queued Jobs (Atomic selection)
        // We'll fetch the oldest jobs first. Using limit 3 for safety on serverless timeouts.
        const { data: jobs, error: fetchError } = await supabaseAdmin
            .from('ad_digests')
            .select('*')
            .eq('status', 'queued')
            .order('created_at', { ascending: true })
            .limit(3);

        if (fetchError) throw fetchError;
        if (!jobs || jobs.length === 0) {
            return NextResponse.json({ message: 'No jobs queued.' });
        }

        console.log(`[Worker] Processing ${jobs.length} jobs...`);

        const results = [];

        for (const job of jobs) {
            let tempDir: string | null = null;
            try {
                // 3. Mark as Processing
                await supabaseAdmin.from('ad_digests').update({ status: 'processing' }).eq('id', job.id);

                let visionInputs: VisionInput[] = [];
                let keyframeMeta: any[] = [];

                if (job.media_kind === 'video') {
                    console.log(`[Worker Job ${job.id}] Extracting video frames...`);
                    const extraction = await extractKeyframes(job.media_url, [
                        { t_ms: 1000, label: 'start' },
                        { t_ms: 5000, label: 'mid' },
                        { t_ms: 10000, label: 'end' }
                    ]);
                    tempDir = extraction.tempDir;

                    for (const result of extraction.results) {
                        visionInputs.push({
                            type: 'base64',
                            data: fs.readFileSync(result.path, { encoding: 'base64' }),
                            mimeType: 'image/jpeg'
                        });
                        keyframeMeta.push({
                            t_ms: result.t_ms,
                            label: result.label,
                            image_url: null,
                            notes: null
                        });
                    }
                } else {
                    console.log(`[Worker Job ${job.id}] Processing image...`);
                    visionInputs.push({ type: 'url', url: job.media_url });
                }

                // 4. Call Vision API
                const rawDigest = await decompileAd(visionInputs);
                if (job.media_kind === 'video' && rawDigest.extraction) {
                    rawDigest.extraction.keyframes = keyframeMeta;
                }

                // 5. Validate & Update
                const validation = AdDigestSchema.safeParse(rawDigest);
                const finalStatus = validation.success ? 'processed' : 'needs_review';

                await supabaseAdmin
                    .from('ad_digests')
                    .update({
                        status: finalStatus,
                        digest: rawDigest
                    })
                    .eq('id', job.id);

                results.push({ id: job.id, status: finalStatus });
                console.log(`[Worker Job ${job.id}] Completed: ${finalStatus}`);

            } catch (jobErr: any) {
                console.error(`[Worker Job ${job.id}] Failed:`, jobErr);
                await supabaseAdmin
                    .from('ad_digests')
                    .update({
                        status: 'needs_review',
                        digest: { error: jobErr.message || 'Worker processing failed' }
                    })
                    .eq('id', job.id);
                results.push({ id: job.id, status: 'error', error: jobErr.message });
            } finally {
                if (tempDir) cleanupFrames(tempDir);
            }
        }

        return NextResponse.json({
            success: true,
            processed_count: results.length,
            details: results
        });

    } catch (err: any) {
        console.error('[Worker] Fatal Error:', err);
        return NextResponse.json({ error: 'Internal worker error' }, { status: 500 });
    }
}
