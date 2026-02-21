import OpenAI from 'openai';

let _openai: OpenAI | null = null;
function getOpenAI() {
    if (!_openai) {
        _openai = new OpenAI({
            apiKey: process.env.OPENAI_API_KEY,
        });
    }
    return _openai;
}

/**
 * Generates a vector embedding for the given text using OpenAI.
 * Defaults to text-embedding-3-small (1536 dimensions).
 */
export async function generateEmbedding(text: string): Promise<number[]> {
    if (!text || text.trim().length === 0) {
        return new Array(1536).fill(0);
    }

    try {
        const openai = getOpenAI();
        const response = await openai.embeddings.create({
            model: "text-embedding-3-small",
            input: text.replace(/\n/g, ' '), // Recommended pre-processing
        });

        return response.data[0].embedding;
    } catch (err: any) {
        console.error('[Embeddings] Error generating embedding:', err);
        throw new Error(`Embedding generation failed: ${err.message}`);
    }
}
