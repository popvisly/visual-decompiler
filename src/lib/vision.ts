import OpenAI from 'openai';
import fs from 'fs';
import path from 'path';

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

export async function decompileAd(mediaUrl: string) {
    // 1. Read the strict prompt from artifacts
    // Path: /Volumes/850EVO/visual-decompiler/artifacts/BLACK_BOX_PROMPT_V1.md
    const promptPath = path.join(process.cwd(), 'artifacts', 'BLACK_BOX_PROMPT_V1.md');
    const systemPrompt = fs.readFileSync(promptPath, 'utf-8');

    // 2. Call Vision API
    const response = await openai.chat.completions.create({
        model: "gpt-4o",
        messages: [
            {
                role: "system",
                content: systemPrompt
            },
            {
                role: "user",
                content: [
                    { type: "text", text: "Analyze this advertisement media and return a strict JSON digest." },
                    {
                        type: "image_url",
                        image_url: {
                            url: mediaUrl,
                        },
                    },
                ],
            },
        ],
        response_format: { type: "json_object" }
    });

    const content = response.choices[0].message.content;
    if (!content) throw new Error("No response from Vision API");

    return JSON.parse(content);
}
