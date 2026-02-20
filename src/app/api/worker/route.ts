import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';
import { extractKeyframes, cleanupFrames } from '@/lib/video';
import { decompileAd, VisionInput } from '@/lib/vision';
import { AdDigestSchema } from '@/types/digest';
import fs from 'fs';

export async function POST(req: Request) {
    console.log(`\n[Worker] Route Hit | timestamp: ${new Date().toISOString()}`);

    // 1. Authorization Check (Vercel Cron OR Bearer Token)
    const authHeader = req.headers.get('Authorization');
    const vercelCronHeader = req.headers.get('x-vercel-cron');
    const expectedToken = process.env.WORKER_SECRET_TOKEN;

    const isAuthorized =
        (authHeader === 'Bearer OPEN') || // Manual override
        (expectedToken && authHeader === `Bearer ${expectedToken}`) ||
        (process.env.NODE_ENV === 'production' && vercelCronHeader === 'true') || // Vercel native cron
        (process.env.NODE_ENV === 'development'); // Allow local dev testing without hassle

    if (!isAuthorized) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    try {
        // 2a. Zombie Cleanup (Release jobs stuck in 'processing' for > 1 hour)
        const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000).toISOString();
        await supabaseAdmin
            .from('ad_digests')
            .update({ status: 'queued' })
            .eq('status', 'processing')
            .lt('created_at', oneHourAgo);

        // 2b. Atomic Claim via Postgres RPC
        console.log(`[Worker] Attempting to claim jobs via RPC 'claim_queued_jobs'...`);
        const { data: jobs, error: claimError } = await supabaseAdmin
            .rpc('claim_queued_jobs', { batch_size: 10 });

        if (claimError) {
            console.error(`[Worker] RPC Claim Error:`, claimError);
            throw claimError;
        }
        if (!jobs || jobs.length === 0) {
            console.log(`[Worker] No queued jobs found or claimed. Exiting.`);
            return NextResponse.json({ message: 'No jobs queued.' });
        }

        console.log(`[Worker] Atomically claimed ${jobs.length} jobs. Job IDs: ${jobs.map((j: any) => j.id).join(', ')}`);

        const results = [];

        for (const job of jobs) {
            let tempDir: string | null = null;
            try {
                // Job is already 'processing' thanks to the RPC
                let visionInputs: VisionInput[] = [];
                let keyframeMeta: any[] = [];

                if (job.media_kind === 'video') {
                    console.log(`[Worker Job ${job.id}] Extracting video frame (1-frame stability strategy)...`);
                    const extraction = await extractKeyframes(job.media_url, [
                        { t_ms: 1000, label: 'start' }
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
                const rawDigest = await decompileAd(visionInputs, job.prompt_version);
                if (job.media_kind === 'video' && rawDigest.extraction) {
                    rawDigest.extraction.keyframes = keyframeMeta;
                }

                // 5. Validate & Update
                const validation = AdDigestSchema.safeParse(rawDigest);
                let finalStatus = 'processed';

                if (!validation.success) {
                    finalStatus = 'needs_review';
                    console.error(`[Worker Job ${job.id}] Zod Validation Failed:`, validation.error.message);
                }

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
