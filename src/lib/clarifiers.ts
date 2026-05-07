export type ClarifierKey =
    | 'heuristic_guide'
    | 'verified_dna_prompt';

export type Clarifier = {
    label: string;
    title: string;
    body: string;
};

export const CLARIFIERS: Record<ClarifierKey, Clarifier> = {
    heuristic_guide: {
        label: "What's a heuristic?",
        title: 'Heuristic Guide',
        body: "A heuristic guide is a best-practice reading of how attention usually behaves (faces, contrast, size, edges, and reading order) — not literal eye-tracking. Use it to sanity-check routing, not as proof.",
    },
    verified_dna_prompt: {
        label: "What's DNA?",
        title: 'Verified DNA Prompt',
        body: 'A “DNA prompt” is the reusable recipe for rebuilding the same strategic feel: subject role, hierarchy, gaze route, palette discipline, and constraint boundaries. It is meant for controlled variants, not random restyling.',
    },
};

