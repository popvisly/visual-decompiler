export type ClaudeTier = 'free' | 'pro' | 'agency';

export const CLAUDE_MODELS = {
    HAIKU: 'claude-haiku-4-5-20251001',
    SONNET: 'claude-sonnet-4-6',
    OPUS: 'claude-opus-4-6',
} as const;

const DEFAULT_PRODUCTION_MODEL = process.env.CLAUDE_MODEL || CLAUDE_MODELS.SONNET;
const DEFAULT_DEVELOPMENT_MODEL = process.env.CLAUDE_DEV_MODEL || DEFAULT_PRODUCTION_MODEL;

export function getClaudeModel(_tier: ClaudeTier = 'pro'): string {
    if (process.env.NODE_ENV === 'development') {
        return DEFAULT_DEVELOPMENT_MODEL;
    }

    return DEFAULT_PRODUCTION_MODEL;
}

export const CLAUDE_MODEL = getClaudeModel('pro');
