import Anthropic from '@anthropic-ai/sdk';
export { CLAUDE_MODEL, CLAUDE_MODELS, getClaudeModel } from './ai-config';

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
