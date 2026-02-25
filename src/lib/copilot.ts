import { supabaseAdmin } from '@/lib/supabase';
import { generateEmbedding } from '@/lib/embeddings';
import { getOpenAI } from '@/lib/vision';
import { AdDigest } from '@/types/digest';

export async function queryCopilot(
    prompt: string,
    context: {
        userId: string;
        orgId?: string | null;
        boardId?: string | null;
    }
) {
    try {
        // 1. Generate embedding for the user's query
        const queryEmbedding = await generateEmbedding(prompt);

        // 2. Search for relevant ads using upgraded match_ads RPC
        const { data: ads, error: searchError } = await supabaseAdmin.rpc('match_ads', {
            query_embedding: queryEmbedding,
            match_threshold: 0.1, // Relaxed threshold for RAG context
            match_count: 8,
            user_id_filter: context.userId,
            org_id_filter: context.orgId,
            board_id_filter: context.boardId
        });

        if (searchError) throw searchError;

        // 3. Construct context from retrieved ads
        const strategicContext = (ads || []).map((ad: any, index: number) => {
            const digest = ad.digest as AdDigest;
            return `--- AD #${index + 1} (${ad.brand_guess || 'Unknown Brand'}) ---
Trigger: ${digest.classification?.trigger_mechanic}
Claim: ${digest.classification?.claim_type}
Subtext: ${digest.strategy?.semiotic_subtext}
Positioning: ${digest.strategy?.positioning_claim}
Objection Dismantling: ${digest.strategy?.objection_tackle}
`;
        }).join('\n\n');

        // 4. Generate AI response
        const openai = getOpenAI();
        const response = await openai.chat.completions.create({
            model: "gpt-4o",
            messages: [
                {
                    role: "system",
                    content: `You are the Strategy Copilot for VisualDecompiler.com. Your goal is to analyze the provided creative intel and answer the user's strategic questions.
                    
USE THE PROVIDED CONTEXT ONLY. If the context is empty, inform the user that you don't have enough data in their current library or board yet.

Context from user's library:
${strategicContext}

Format your response in professional, concise markdown. Focus on psychological mechanics and strategic patterns.`
                },
                {
                    role: "user",
                    content: prompt
                }
            ],
            temperature: 0.7,
        });

        return {
            answer: response.choices[0].message.content,
            sources: (ads || []).map((ad: any) => ({
                id: ad.id,
                brand: ad.brand_guess,
                headline: ad.digest?.extraction?.on_screen_copy?.primary_headline
            }))
        };

    } catch (err: any) {
        console.error('[Copilot] Error:', err);
        throw new Error(`Copilot query failed: ${err.message}`);
    }
}
