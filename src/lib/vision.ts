import OpenAI from 'openai';
import { BLACK_BOX_PROMPT_V1, BLACK_BOX_PROMPT_V2, BLACK_BOX_PROMPT_V3, BLACK_BOX_PROMPT_V4 } from './prompts';
import fs from 'fs';

let _openai: OpenAI | null = null;
export function getOpenAI() {
    if (!_openai) {
        _openai = new OpenAI({
            apiKey: process.env.OPENAI_API_KEY,
        });
    }
    return _openai;
}

export type VisionInput =
    | { type: 'url'; url: string }
    | { type: 'base64'; data: string; mimeType: string };

export async function decompileAd(inputs: VisionInput[], version: string = 'V1') {
    // 1. Select the strict prompt (inlined at build time)
    let systemPrompt = BLACK_BOX_PROMPT_V1;
    if (version === 'V2') systemPrompt = BLACK_BOX_PROMPT_V2;
    else if (version === 'V3') systemPrompt = BLACK_BOX_PROMPT_V3;
    else if (version === 'V4') systemPrompt = BLACK_BOX_PROMPT_V4;

    // 2. Prepare content
    const userContent: OpenAI.Chat.Completions.ChatCompletionContentPart[] = [
        { type: "text", text: "Analyze this advertisement media and return a strict JSON digest. If multiple images are provided, they are keyframes from a single video." }
    ];

    for (const input of inputs) {
        if (input.type === 'url') {
            try {
                // Fetch the image and convert it to base64 to bypass OpenAI URL download errors
                console.log(`[Vision] Fetching remote image to convert to base64: ${input.url}`);
                const imgRes = await fetch(input.url, {
                    headers: {
                        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
                    }
                });
                if (!imgRes.ok) throw new Error(`Failed to fetch image: ${imgRes.status} ${imgRes.statusText}`);
                const arrayBuffer = await imgRes.arrayBuffer();
                const buffer = Buffer.from(arrayBuffer);

                // utfs.io sometimes returns application/octet-stream for images, so we fallback to jpeg
                let mimeType = imgRes.headers.get('content-type');
                if (!mimeType || mimeType === 'application/octet-stream') {
                    mimeType = input.url.toLowerCase().endsWith('.png') ? 'image/png' : 'image/jpeg';
                }

                const base64Data = buffer.toString('base64');
                console.log(`[Vision] Successfully converted to base64 (${Math.round(base64Data.length / 1024)}KB). Mime: ${mimeType}`);

                userContent.push({
                    type: "image_url",
                    image_url: { url: `data:${mimeType};base64,${base64Data}` }
                });
            } catch (err) {
                console.error(`[Vision] FATAL: Image download failed for ${input.url}:`, err);
                throw new Error(`Could not download media from URL: ${err}`);
            }
        } else {
            userContent.push({
                type: "image_url",
                image_url: { url: `data:${input.mimeType};base64,${input.data}` }
            });
        }
    }

    // 3. Call Vision API
    const openai = getOpenAI();
    const visionModel = process.env.OPENAI_VISION_MODEL || (process.env.NODE_ENV === 'development' ? 'gpt-4o-mini' : 'gpt-4o');

    const response = await openai.chat.completions.create({
        model: visionModel,
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

export async function transcribeAudio(audioPath: string) {
    const openai = getOpenAI();
    console.log(`[Vision] Calling Whisper-1 for transcription: ${audioPath}`);
    const transcription = await openai.audio.transcriptions.create({
        file: fs.createReadStream(audioPath),
        model: (process.env.OPENAI_WHISPER_MODEL || "whisper-1"),
    });
    return transcription.text;
}
