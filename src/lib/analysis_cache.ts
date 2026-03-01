import { createHash } from 'crypto';
import { supabaseAdmin } from './supabase';

/**
 * Analysis Cache Service
 *
 * Caches AI analysis results to avoid redundant API calls.
 * Saves significant costs by reusing analyses for duplicate images.
 *
 * Cost Impact:
 * - Cached hit: $0.00 (free!)
 * - Cache miss: Normal API cost
 * - Expected cache hit rate: 20-40% for typical usage
 */

export interface CachedAnalysis {
    id: string;
    image_hash: string;
    model_used: string;
    prompt_version: string;
    analysis_result: any;
    created_at: string;
    hit_count: number;
}

/**
 * Generate a hash for image data to use as cache key
 */
export function hashImageData(data: string | Buffer): string {
    const buffer = typeof data === 'string' ? Buffer.from(data, 'base64') : data;
    return createHash('sha256').update(buffer).digest('hex');
}

/**
 * Get cached analysis result
 * Returns null if not found or expired (30 days)
 */
export async function getCachedAnalysis(
    imageHash: string,
    modelUsed: string,
    promptVersion: string
): Promise<any | null> {
    try {
        const { data, error } = await supabaseAdmin
            .from('analysis_cache')
            .select('*')
            .eq('image_hash', imageHash)
            .eq('model_used', modelUsed)
            .eq('prompt_version', promptVersion)
            .gte('created_at', new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString()) // 30 days
            .single();

        if (error || !data) {
            return null;
        }

        // Increment hit count
        await supabaseAdmin
            .from('analysis_cache')
            .update({ hit_count: (data.hit_count || 0) + 1 })
            .eq('id', data.id);

        console.log(`[Cache] HIT for ${imageHash.slice(0, 8)}... (saved API call!)`);
        return data.analysis_result;
    } catch (err) {
        console.error('[Cache] Error retrieving:', err);
        return null;
    }
}

/**
 * Store analysis result in cache
 */
export async function setCachedAnalysis(
    imageHash: string,
    modelUsed: string,
    promptVersion: string,
    analysisResult: any
): Promise<void> {
    try {
        const { error } = await supabaseAdmin
            .from('analysis_cache')
            .insert({
                image_hash: imageHash,
                model_used: modelUsed,
                prompt_version: promptVersion,
                analysis_result: analysisResult,
                hit_count: 0,
            });

        if (error) {
            console.error('[Cache] Error storing:', error);
        } else {
            console.log(`[Cache] STORED ${imageHash.slice(0, 8)}...`);
        }
    } catch (err) {
        console.error('[Cache] Error storing:', err);
    }
}

/**
 * Get cache statistics
 */
export async function getCacheStats(): Promise<{
    total_entries: number;
    total_hits: number;
    estimated_savings: number;
}> {
    try {
        const { data, error } = await supabaseAdmin
            .from('analysis_cache')
            .select('hit_count');

        if (error || !data) {
            return { total_entries: 0, total_hits: 0, estimated_savings: 0 };
        }

        const total_entries = data.length;
        const total_hits = data.reduce((sum, entry) => sum + (entry.hit_count || 0), 0);

        // Assume $0.15 per Sonnet analysis
        const estimated_savings = total_hits * 0.15;

        return { total_entries, total_hits, estimated_savings };
    } catch (err) {
        console.error('[Cache] Error getting stats:', err);
        return { total_entries: 0, total_hits: 0, estimated_savings: 0 };
    }
}
