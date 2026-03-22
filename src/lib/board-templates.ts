export type BoardTemplate = {
    key: 'client' | 'competitor' | 'campaign-sprint';
    triggerLabel: string;
    name: string;
    description: string;
    suggestedTags: string[];
};

export const BOARD_TEMPLATES: BoardTemplate[] = [
    {
        key: 'client',
        triggerLabel: 'Client Board',
        name: 'Client Intelligence — [Client Name]',
        description:
            'Curated forensic analyses, strategic readouts, and decision-ready artifacts for [Client Name].',
        suggestedTags: ['client', 'active-account', 'review'],
    },
    {
        key: 'competitor',
        triggerLabel: 'Competitor Board',
        name: 'Competitor Intelligence — [Category]',
        description:
            'Track competitor creative mechanics, pattern shifts, and strategic deltas across the category.',
        suggestedTags: ['competitor', 'category-watch', 'pattern-tracking'],
    },
    {
        key: 'campaign-sprint',
        triggerLabel: 'Campaign Sprint Board',
        name: 'Campaign Sprint — [Campaign Name]',
        description:
            'Sprint workspace for route comparison, diagnostic feedback loops, and execution-ready direction.',
        suggestedTags: ['campaign', 'sprint', 'route-testing'],
    },
] as const;

export function hasTemplatePlaceholders(value: string) {
    return /\[[^\]]+\]/.test(value);
}
