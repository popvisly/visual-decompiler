import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';
import { extractKeyframes, cleanupFrames, extractAudio } from '@/lib/video';
import { decompileAd, VisionInput, transcribeAudio } from '@/lib/vision';
import { DeepAuditService } from '@/lib/deep_audit';
import { AdDigestSchema } from '@/types/digest';
import { normalizeDigest } from '@/lib/digest_normalize';
import { hashFile } from '@/lib/hashing';
import { generateEmbedding } from '@/lib/embeddings';
import { RoutingService } from '@/lib/routing_service';
import fs from 'fs';
import path from 'path';
import os from 'os';

export const runtime = 'nodejs';
export const maxDuration = 300; // 5 minutes for Vision API process

// Basic in-memory throttle to prevent spam-triggering the worker (especially in dev)
const WORKER_MIN_INTERVAL_MS = Number(process.env.WORKER_MIN_INTERVAL_MS || 8000);
let lastWorkerRunAt = 0;

export async function POST(req: Request) {
    const now = Date.now();
    if (now - lastWorkerRunAt < WORKER_MIN_INTERVAL_MS) {
        return NextResponse.json({ error: 'Worker throttled. Please wait a moment.' }, { status: 429 });
    }
    lastWorkerRunAt = now;

    console.log(`\n[Worker] Route Hit | timestamp: ${new Date().toISOString()}`);

    // 1. Authorization Check (Vercel Cron OR Bearer Token)
    const authHeader = req.headers.get('Authorization');
    const vercelCronHeader = req.headers.get('x-vercel-cron');
    const qstashSignature = req.headers.get('upstash-signature');
    const expectedToken = process.env.WORKER_SECRET_TOKEN;

    const isAuthorized =
        (authHeader === 'Bearer OPEN') || // Manual override
        (expectedToken && authHeader === `Bearer ${expectedToken}`) ||
        (process.env.NODE_ENV === 'production' && vercelCronHeader === 'true') || // Vercel native cron
        (!!qstashSignature) || // Trusted QStash trigger (should ideally verify signature in follow-up)
        (process.env.NODE_ENV === 'development'); // Allow local dev testing

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

        // 2b. Atomic Claim via Postgres RPC (Reduced batch size to 3 for stability)
        console.log(`[Worker] Attempting to claim jobs via RPC 'claim_queued_jobs'...`);
        const { data: jobs, error: claimError } = await supabaseAdmin
            .rpc('claim_queued_jobs', { batch_size: 3 });

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
        const startTime = Date.now();
        const TIME_LIMIT_MS = 4 * 60 * 1000; // 4 minutes safety threshold

        for (const job of jobs) {
            // Self-preemption if running near Vercel timeout
            if (Date.now() - startTime > TIME_LIMIT_MS) {
                console.log(`[Worker] Reached time limit. Re-queueing remaining ${jobs.length - results.length} jobs.`);
                // Update remaining jobs back to queued
                const remainingIds = jobs.slice(results.length).map((j: any) => j.id);
                await supabaseAdmin.from('ad_digests').update({ status: 'queued' }).in('id', remainingIds);
                break;
            }
            let tempDir: string | null = null;
            try {
                // Job is already 'processing' thanks to the RPC
                let visionInputs: VisionInput[] = [];
                let keyframeMeta: any[] = [];
                let mediaHash: string | null = null;
                tempDir = fs.mkdtempSync(path.join(os.tmpdir(), 'vd-worker-'));

                // 3. Download and Hash for Deduplication
                const mediaPath = path.join(tempDir, 'source_media');
                console.log(`[Worker Job ${job.id}] Downloading media for hashing...`);

                const res = await fetch(job.media_url);
                const buffer = await res.arrayBuffer();
                fs.writeFileSync(mediaPath, Buffer.from(buffer));

                mediaHash = await hashFile(mediaPath);
                console.log(`[Worker Job ${job.id}] Media Hash: ${mediaHash}`);

                // Check for duplicate content (already processed with same prompt)
                const { data: existing } = await supabaseAdmin
                    .from('ad_digests')
                    .select('digest, status, embedding')
                    .eq('media_hash', mediaHash)
                    .eq('prompt_version', job.prompt_version)
                    .eq('status', 'processed')
                    .neq('id', job.id)
                    .limit(1)
                    .single();

                if (existing) {
                    console.log(`[Worker Job ${job.id}] Found duplicate content! Reusing digest from existing job.`);
                    await supabaseAdmin
                        .from('ad_digests')
                        .update({
                            status: 'processed',
                            digest: existing.digest,
                            media_hash: mediaHash,
                            embedding: existing.embedding
                        })
                        .eq('id', job.id);

                    results.push({ id: job.id, status: 'processed', reused: true });
                    continue;
                }

                // 4. Extract Frames or Prepare Inputs
                if (job.media_kind === 'video') {
                    console.log(`[Worker Job ${job.id}] Extracting video frames...`);
                    // We can reuse the already downloaded mediaPath if we update extractKeyframes to accept local paths
                    // But for now, we'll let extractKeyframes do its thing (it has its own tempDir)
                    const extraction = await extractKeyframes(job.media_url, [
                        { t_ms: 0, label: 'Hook' },
                        { t_ms: -0.25, label: 'Body 1' },
                        { t_ms: -0.5, label: 'Body 2' },
                        { t_ms: -0.75, label: 'Body 3' },
                        { t_ms: -1, label: 'CTA' }
                    ]);
                    // If we want to be super efficient, we should update extractKeyframes to use our mediaPath
                    // but keeping it simple for now.

                    const videoTempDir = extraction.tempDir;

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
                    // Cleanup extra video temp dir
                    cleanupFrames(videoTempDir);
                } else {
                    visionInputs.push({
                        type: 'base64',
                        data: fs.readFileSync(mediaPath, { encoding: 'base64' }),
                        mimeType: job.media_type || 'image/jpeg'
                    });
                }

                // 5. Deep Multimodal: Audio Extraction & Transcription (MS14)
                let transcription = null;
                try {
                    if (job.media_kind === 'video') {
                        const audioRes = await extractAudio(job.media_url);
                        transcription = await transcribeAudio(audioRes.audioPath);
                        cleanupFrames(audioRes.tempDir);
                    }
                } catch (audioErr) {
                    console.warn(`[Worker Job ${job.id}] Audio extraction/STT failed:`, audioErr);
                }

                // 6. Call Vision API (Use V4 for videos to get Narrative Arc + OCR)
                const promptVersion = job.media_kind === 'video' ? 'V4' : job.prompt_version;
                const rawDigest = await decompileAd(visionInputs, promptVersion);

                if (job.media_kind === 'video' && rawDigest.extraction) {
                    rawDigest.extraction.keyframes = keyframeMeta;

                    // Attach transcription to narrative_arc
                    if (transcription && rawDigest.extraction.narrative_arc) {
                        rawDigest.extraction.narrative_arc.transcription = transcription;
                    }
                }

                // 5. Validate & Auto-Repair (Zod)
                // Models sometimes return arrays longer than our UI/schema expects.
                // We clamp a few known fields to keep the digest usable.
                try {
                    const cls: any = (rawDigest as any)?.classification;
                    if (cls) {
                        const clamp2 = (v: any) => (Array.isArray(v) ? v.slice(0, 2) : v);
                        cls.proof_type = clamp2(cls.proof_type);
                        cls.visual_style = clamp2(cls.visual_style);
                        cls.emotion_tone = clamp2(cls.emotion_tone);
                    }
                } catch { /* ignore */ }

                // Stamp schema metadata so downstream UI / exports can rely on a stable contract.
                (rawDigest as any).meta = {
                    ...(rawDigest as any).meta,
                    schema_version: '2026-02-23',
                    generated_at: new Date().toISOString(),
                };

                const normalizedDigest = normalizeDigest(rawDigest);

                const validation = AdDigestSchema.safeParse(normalizedDigest);
                let finalStatus = 'processed';
                const digestToPersist: any = validation.success ? validation.data : normalizedDigest;

                if (!validation.success) {
                    finalStatus = 'needs_review';
                    console.error(`[Worker Job ${job.id}] Zod Validation Failed:`, validation.error.issues);
                }

                // 6. Generate Embedding for Semantic Search
                console.log(`[Worker Job ${job.id}] Generating strategic embedding...`);
                const embeddingText = [
                    digestToPersist.meta?.brand_guess,
                    digestToPersist.extraction?.on_screen_copy?.primary_headline,
                    digestToPersist.strategy?.semiotic_subtext,
                    digestToPersist.strategy?.competitive_advantage,
                    digestToPersist.classification?.trigger_mechanic,
                    digestToPersist.classification?.claim_type,
                    digestToPersist.extraction?.narrative_arc?.hook_analysis
                ].filter(Boolean).join(' | ');

                const embedding = await generateEmbedding(embeddingText);

                // 6.5 Pattern Shift Detection (Milestone 13)
                let isAnomaly = false;
                let anomalyScore = 0;
                let anomalyReason = null;

                const brand = digestToPersist.meta?.brand_guess;
                if (brand && embedding) {
                    const { data: baselineAds } = await supabaseAdmin
                        .from('ad_digests')
                        .select('embedding')
                        .eq('status', 'processed')
                        .filter('digest->meta->>brand_guess', 'eq', brand)
                        .order('created_at', { ascending: false })
                        .limit(10);

                    if (baselineAds && baselineAds.length >= 3) {
                        // Calculate average baseline embedding
                        const baselineCount = baselineAds.length;
                        const baselineSum = new Array(embedding.length).fill(0);
                        baselineAds.forEach((b: any) => {
                            const vec = typeof b.embedding === 'string'
                                ? b.embedding.replace('[', '').replace(']', '').split(',').map(Number)
                                : b.embedding;
                            vec.forEach((val: number, i: number) => baselineSum[i] += val);
                        });
                        const baselineAvg = baselineSum.map(v => v / baselineCount);

                        // Cosine Similarity (Dot product since OpenAI vectors are normalized)
                        const similarity = embedding.reduce((acc, val, i) => acc + (val * baselineAvg[i]), 0);
                        anomalyScore = 1 - similarity; // Distance

                        if (anomalyScore > 0.25) { // Threshold for "Significant Shift"
                            isAnomaly = true;
                            anomalyReason = `Strategic pivot detected: Creative distance ${anomalyScore.toFixed(2)} from brand baseline.`;
                            console.log(`[Worker Job ${job.id}] 🚨 PATTERN SHIFT DETECTED for ${brand}. Score: ${anomalyScore.toFixed(2)}`);

                            // Milestone 33: Advanced Anomaly Routing
                            await RoutingService.routeAnomaly(job.id, {
                                dimension: 'general', // In future, extract specific dimension from embedding delta
                                type: 'Pattern Shift',
                                severity: anomalyScore > 0.5 ? 'critical' : 'warning'
                            });
                        }
                    }
                }

                // Persist the digest itself. Several columns in this schema (e.g. brand_guess)
                // appear to be generated/computed and cannot be directly updated.
                // Keep writes minimal and let DB triggers/computed columns derive fields.
                const updatePayload: any = {
                    status: finalStatus,
                    digest: digestToPersist,
                };

                const { error: updateErr } = await supabaseAdmin
                    .from('ad_digests')
                    .update(updatePayload)
                    .eq('id', job.id);

                if (updateErr) throw updateErr;

                // Increment usage only when a job is truly processed.
                // (Queueing/retries should not consume quota.)
                if (finalStatus === 'processed' && job.user_id) {
                    const { data: u } = await supabaseAdmin
                        .from('users')
                        .select('usage_count')
                        .eq('id', job.user_id)
                        .single();

                    const nextCount = (u?.usage_count || 0) + 1;
                    await supabaseAdmin
                        .from('users')
                        .update({ usage_count: nextCount })
                        .eq('id', job.user_id);
                }

                results.push({ id: job.id, status: finalStatus });
                console.log(`[Worker Job ${job.id}] Completed: ${finalStatus}`);

                // 6.7 Persist Deep Audit Hooks (Milestone 24)
                if (finalStatus === 'processed') {
                    console.log(`[Worker Job ${job.id}] Persisting Deep Audit forensic hooks...`);
                    const auditResult = DeepAuditService.perform(digestToPersist);

                    const hooksToInsert = [
                        { ad_id: job.id, hook_type: 'pacing', intelligence_data: auditResult.pacing },
                        { ad_id: job.id, hook_type: 'color', intelligence_data: auditResult.color },
                        { ad_id: job.id, hook_type: 'semiotics', intelligence_data: auditResult.semiotics }
                    ];

                    const { error: hookError } = await supabaseAdmin
                        .from('deep_hooks')
                        .insert(hooksToInsert);

                    if (hookError) {
                        // deep_hooks is optional in some deployments; avoid spamming logs if the table doesn't exist.
                        if (hookError.code !== 'PGRST205') {
                            console.error(`[Worker Job ${job.id}] Failed to persist deep hooks:`, hookError);
                        }
                    }
                }

                // 7. Dispatch Webhooks (Milestone 13)
                if (finalStatus === 'processed') {
                    const { data: hooks } = await supabaseAdmin
                        .from('webhooks')
                        .select('*')
                        .eq('is_active', true);

                    if (hooks && hooks.length > 0) {
                        for (const hook of hooks) {
                            const isAnomalyEvent = isAnomaly && hook.event_types.includes('strategic_anomaly');
                            const isCompleteEvent = hook.event_types.includes('analysis_complete');

                            if (isAnomalyEvent || isCompleteEvent) {
                                console.log(`[Worker Job ${job.id}] Dispatching Webhook to ${hook.url}`);
                                fetch(hook.url, {
                                    method: 'POST',
                                    headers: {
                                        'Content-Type': 'application/json',
                                        'X-VD-Secret': hook.secret_token || ''
                                    },
                                    body: JSON.stringify({
                                        event: isAnomalyEvent ? 'strategic_anomaly' : 'analysis_complete',
                                        ad_id: job.id,
                                        brand: brand,
                                        is_anomaly: isAnomaly,
                                        anomaly_reason: anomalyReason,
                                        digest: digestToPersist
                                    })
                                }).catch(err => console.error(`[Webhook Error] ${hook.url}:`, err));
                            }
                        }
                    }
                }

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
