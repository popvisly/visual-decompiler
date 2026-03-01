import Anthropic from '@anthropic-ai/sdk';

let _anthropic: Anthropic | null = null;

export function getAnthropic() {
    if (!_anthropic) {
        const apiKey = process.env.ANTHROPIC_API_KEY;
        if (!apiKey || apiKey === 'your-anthropic-key-here') {
            return null;
        }
        _anthropic = new Anthropic({
            apiKey,
        });
    }
    return _anthropic;
}

// Model Configuration
export const CLAUDE_MODELS = {
    // Haiku 4.5 - Fast & cheap (~$0.01/analysis) - Perfect for free tier & development
    HAIKU: "claude-haiku-4-5-20251001",
    // Sonnet 4.5 - Balanced (~$0.15/analysis) - Perfect for pro tier
    SONNET: "claude-sonnet-4-5-20250929",
    // Opus 4.6 - Most capable (~$0.50/analysis) - Perfect for agency tier
    OPUS: "claude-opus-4-6"
} as const;

// Default model selection based on environment and tier
export function getClaudeModel(tier: 'free' | 'pro' | 'agency' = 'pro'): string {
    // Use Haiku in development to save costs
    if (process.env.NODE_ENV === 'development') {
        return CLAUDE_MODELS.HAIKU;
    }

    // Production: tier-based model selection
    switch (tier) {
        case 'free':
            return CLAUDE_MODELS.HAIKU;
        case 'pro':
            return CLAUDE_MODELS.SONNET;
        case 'agency':
            return CLAUDE_MODELS.OPUS;
        default:
            return CLAUDE_MODELS.SONNET;
    }
}

// Legacy export for backward compatibility
export const CLAUDE_MODEL = CLAUDE_MODELS.SONNET;
