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

export const CLAUDE_MODEL = "claude-3-5-sonnet-latest";
