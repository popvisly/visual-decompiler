import OpenAI from 'openai';
import fs from 'fs';
import path from 'path';

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

export type VisionInput =
    | { type: 'url'; url: string }
    | { type: 'base64'; data: string; mimeType: string };

export async function decompileAd(inputs: VisionInput[]) {
    // 1. Read the strict prompt from artifacts
    const promptPath = path.join(process.cwd(), 'artifacts', 'BLACK_BOX_PROMPT_V1.md');
    const systemPrompt = fs.readFileSync(promptPath, 'utf-8');

    // 2. Prepare content
    const userContent: OpenAI.Chat.Completions.ChatCompletionContentPart[] = [
        { type: "text", text: "Analyze this advertisement media and return a strict JSON digest. If multiple images are provided, they are keyframes from a single video." }
    ];

    for (const input of inputs) {
        if (input.type === 'url') {
            userContent.push({
                type: "image_url",
                image_url: { url: input.url }
            });
        } else {
            userContent.push({
                type: "image_url",
                image_url: { url: `data:${input.mimeType};base64,${input.data}` }
            });
        }
    }

    // 3. Call Vision API
    const response = await openai.chat.completions.create({
        model: "gpt-4o",
        messages: [
            {
                role: "system",
                content: systemPrompt
            },
            {
                role: "user",
                content: userContent,
            },
        ],
        response_format: { type: "json_object" }
    });

    const content = response.choices[0].message.content;
    if (!content) throw new Error("No response from Vision API");

    return JSON.parse(content);
}
