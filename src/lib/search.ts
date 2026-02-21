import { supabaseAdmin } from './supabase';
import { generateEmbedding } from './embeddings';

/**
 * Performs a semantic search across the entire ad library.
 * Converts the query into an embedding and calls the 'match_ads' RPC.
 */
export async function semanticSearch(query: string, userId: string, limit: number = 20, orgId?: string | null) {
    try {
        const embedding = await generateEmbedding(query);

        const { data, error } = await supabaseAdmin.rpc('match_ads', {
            query_embedding: embedding,
            match_threshold: 0.1, // Adjust based on calibration
            match_count: limit,
            user_id_filter: userId,
            org_id_filter: orgId
        });

        if (error) throw error;
        return data || [];
    } catch (err: any) {
        console.error('[Search] Semantic Search failed:', err);
        return [];
    }
}

/**
 * Finds ads similar to a specific ad ID based on vector distance.
 */
export async function getRelatedAds(adId: string, userId: string, limit: number = 5, orgId?: string | null) {
    try {
        // 1. Get the embedding for the source ad
        const { data: source, error: sourceError } = await supabaseAdmin
            .from('ad_digests')
            .select('embedding')
            .eq('id', adId)
            .single();

        if (sourceError || !source?.embedding) return [];

        // 2. Find matches
        const { data, error } = await supabaseAdmin.rpc('match_ads', {
            query_embedding: source.embedding,
            match_threshold: 0.5, // High threshold for "related"
            match_count: limit + 1, // +1 because it will likely find itself
            user_id_filter: userId,
            org_id_filter: orgId
        });

        if (error) throw error;

        // Filter out the source ad itself
        return (data || []).filter((ad: any) => ad.id !== adId).slice(0, limit);
    } catch (err: any) {
        console.error('[Search] Get Related Ads failed:', err);
        return [];
    }
}
