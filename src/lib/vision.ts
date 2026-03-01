import OpenAI from 'openai';
import { BLACK_BOX_PROMPT_V1, BLACK_BOX_PROMPT_V2, BLACK_BOX_PROMPT_V3, BLACK_BOX_PROMPT_V4 } from './prompts';
import fs from 'fs';
import { getAnthropic, getClaudeModel } from './anthropic';
import { getCachedAnalysis, setCachedAnalysis, hashImageData } from './analysis_cache';

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

export async function decompileAd(
    inputs: VisionInput[],
    version: string = 'V1',
    tier: 'free' | 'pro' | 'agency' = 'pro',
    useCache: boolean = true
) {
    // 1. Select the strict prompt (inlined at build time)
    let systemPrompt = BLACK_BOX_PROMPT_V1;
    if (version === 'V2') systemPrompt = BLACK_BOX_PROMPT_V2;
    else if (version === 'V3') systemPrompt = BLACK_BOX_PROMPT_V3;
    else if (version === 'V4') systemPrompt = BLACK_BOX_PROMPT_V4;

    const anthropic = getAnthropic();
    const isClaude = !!anthropic;

    // 2. Check cache if enabled
    if (useCache && inputs.length === 1) {
        const firstInput = inputs[0];
        let imageData: string;

        if (firstInput.type === 'url') {
            const imgRes = await fetch(firstInput.url);
            if (imgRes.ok) {
                const buffer = Buffer.from(await imgRes.arrayBuffer());
                imageData = buffer.toString('base64');
            } else {
                imageData = firstInput.url; // fallback to URL as identifier
            }
        } else {
            imageData = firstInput.data;
        }

        const imageHash = hashImageData(imageData);
        const modelName = isClaude ? getClaudeModel(tier) : 'gpt-4o';

        const cached = await getCachedAnalysis(imageHash, modelName, version);
        if (cached) {
            return cached;
        }

        // Continue with API call and cache result at the end
        try {
            const result = await performAnalysis(inputs, systemPrompt, anthropic, isClaude, tier, version, imageHash, modelName);
            return result;
        } catch (error) {
            throw error;
        }
    }

    // No cache or multiple images - proceed directly
    return performAnalysis(inputs, systemPrompt, anthropic, isClaude, tier, version);
}

async function performAnalysis(
    inputs: VisionInput[],
    systemPrompt: string,
    anthropic: any,
    isClaude: boolean,
    tier: 'free' | 'pro' | 'agency',
    version: string,
    imageHash?: string,
    modelName?: string
) {

    if (isClaude) {
        const selectedModel = getClaudeModel(tier);
        const modelLabel = tier === 'free' ? 'Haiku (Fast)' : tier === 'agency' ? 'Opus (Premium)' : 'Sonnet (Pro)';
        console.log(`[Vision] Using Claude ${modelLabel} for deconstruction (${version})`);

        const messageContent: any[] = [
            { type: "text", text: "Analyze this advertisement media and return a strict JSON digest. If multiple images are provided, they are keyframes from a single video." }
        ];

        for (const input of inputs) {
            let base64Data: string;
            let mimeType: string;

            if (input.type === 'url') {
                const imgRes = await fetch(input.url);
                if (!imgRes.ok) throw new Error(`Failed to fetch image: ${imgRes.status}`);
                const arrayBuffer = await imgRes.arrayBuffer();
                const buffer = Buffer.from(arrayBuffer);
                base64Data = buffer.toString('base64');
                mimeType = imgRes.headers.get('content-type') || (input.url.toLowerCase().endsWith('.png') ? 'image/png' : 'image/jpeg');
            } else {
                base64Data = input.data;
                mimeType = input.mimeType;
            }

            // Anthropic vision block
            messageContent.push({
                type: "image",
                source: {
                    type: "base64",
                    media_type: mimeType as any,
                    data: base64Data
                }
            });
        }

        const response = await anthropic.messages.create({
            model: selectedModel,
            max_tokens: 8192, // Increased for extended thinking + JSON output
            // Enable prompt caching to save 90% on input token costs
            // The system prompt will be cached for 5 minutes
            system: [
                {
                    type: "text",
                    text: systemPrompt,
                    cache_control: { type: "ephemeral" }
                }
            ],
            // Extended thinking for complex strategic analysis (disabled for Haiku)
            thinking: tier !== 'free' ? {
                type: "enabled",
                budget_tokens: tier === 'agency' ? 4000 : 2000
            } : undefined,
            messages: [
                { role: "user", content: messageContent }
            ],
        });

        const contentBlock = response.content[0];
        if (contentBlock.type !== 'text') throw new Error("Claude returned non-text response");

        // Claude sometimes wraps JSON in triple backticks even if told not to
        let text = contentBlock.text;
        if (text.includes('```json')) {
            text = text.split('```json')[1].split('```')[0].trim();
        } else if (text.includes('```')) {
            text = text.split('```')[1].split('```')[0].trim();
        }

        const result = JSON.parse(text);

        // Cache the result if hash and model provided
        if (imageHash && modelName) {
            setCachedAnalysis(imageHash, modelName, version, result).catch(console.error);
        }

        return result;
    }

    // 2. OpenAI Fallback
    console.log(`[Vision] Using OpenAI engine for deconstruction (${version})`);
    const userContent: OpenAI.Chat.Completions.ChatCompletionContentPart[] = [
        { type: "text", text: "Analyze this advertisement media and return a strict JSON digest. If multiple images are provided, they are keyframes from a single video." }
    ];

    for (const input of inputs) {
        if (input.type === 'url') {
            try {
                // Fetch the image and convert it to base64 to bypass OpenAI URL download errors
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
