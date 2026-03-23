import { readFile } from 'node:fs/promises';
import path from 'node:path';

export type EnablementObjection = {
    slug: string;
    objection: string;
    meaning: string;
    shortResponse: string;
    longResponse: string;
    proofPoints: string[];
};

export const ENABLEMENT_POSITIONING_LOCK = 'Forensic Advertising Intelligence OS';

export const ENABLEMENT_POSITIONING_ANCHOR =
    'Faster than manual analysis. Deeper than ChatGPT alone. Built for white-label agency authority.';

export const ENABLEMENT_DEMO_FLOW = [
    'Ingest an ad',
    'Show dossier surfaces',
    'Compare two assets (Differential)',
    'Open Vault memory',
    'Show Market Pulse threshold/context',
    'Show Agency Settings white-label',
    'Close with boardroom-ready output line',
] as const;

export const ENABLEMENT_PROOF_MAP = [
    {
        objection: 'ChatGPT objection',
        screens: 'Trust & Method + dossier structure',
    },
    {
        objection: 'Ad generator objection',
        screens: 'Live Deconstruction + diagnosis',
    },
    {
        objection: 'Dashboard objection',
        screens: 'Differential + strategy outputs',
    },
    {
        objection: 'Reliability objection',
        screens: 'Trust & Method + repeatable surfaces',
    },
    {
        objection: 'Team adoption objection',
        screens: 'Boards + Team & Seats',
    },
] as const;

export const ENABLEMENT_HOMEPAGE_READOUT_TARGETS = [
    {
        metric: 'View rate',
        event: 'homepage_ad_to_intelligence_view',
        target: '55%+ of homepage sessions',
        meaning: 'Confirms the section is being seen often enough to judge persuasion rather than placement.',
    },
    {
        metric: 'Primary CTR',
        event: 'homepage_ad_to_intelligence_cta_primary_click / views',
        target: '6-10%',
        meaning: 'Healthy signal that the block is moving users from proof to action.',
    },
    {
        metric: 'Secondary CTR',
        event: 'homepage_ad_to_intelligence_cta_secondary_click / views',
        target: '2-5%',
        meaning: 'Shows validation-seeking behavior without overwhelming the primary path.',
    },
    {
        metric: 'Primary vs Secondary',
        event: 'primary clicks vs secondary clicks',
        target: 'Primary at roughly 2x secondary',
        meaning: 'Indicates confidence is translating into action, not just curiosity.',
    },
] as const;

export const ENABLEMENT_HOMEPAGE_READOUT_RULES = [
    {
        title: 'Low views',
        threshold: '<45% of homepage sessions',
        action: 'Placement issue. Move the block higher or tighten the section immediately above it.',
    },
    {
        title: 'Good views, weak primary CTR',
        threshold: 'Primary CTR <4%',
        action: 'Persuasion issue. Sharpen the headline, lead image, or primary CTA emphasis.',
    },
    {
        title: 'Secondary beating primary',
        threshold: 'Secondary interest unusually high',
        action: 'Users want proof first. Keep the dossier CTA visible and clarify what happens after Start Decompiling Free.',
    },
    {
        title: 'Strong primary CTR',
        threshold: 'Primary CTR 8%+',
        action: 'Leave the structure stable. Only make minor visual or copy polish changes.',
    },
] as const;

export const ENABLEMENT_HOMEPAGE_SOURCE_NOTES = [
    {
        label: 'Source',
        value: 'PostHog event explorer or insight chart',
    },
    {
        label: 'Event set',
        value: 'homepage_ad_to_intelligence_view, homepage_ad_to_intelligence_cta_primary_click, homepage_ad_to_intelligence_cta_secondary_click',
    },
    {
        label: 'Scope',
        value: 'Homepage only. Events already include page = homepage and section_id = ad-to-intelligence.',
    },
    {
        label: 'Date window',
        value: 'Use a rolling 7-day window for the first read, then compare against the previous 7 days once traffic settles.',
    },
    {
        label: 'Counting rule',
        value: 'Use total events for CTR calculations. Use unique persons only as a secondary sanity check, not the primary KPI.',
    },
    {
        label: 'Variant filter',
        value: 'Keep variant = v1 fixed until a deliberate test version exists.',
    },
] as const;

export const ENABLEMENT_GUARDRAILS = [
    'Don’t call it “just AI.”',
    'Don’t lead with model/provider.',
    'Don’t overclaim prediction certainty.',
    'Don’t position as ad generator.',
    'Don’t position as media spend dashboard.',
] as const;

export const ENABLEMENT_SNIPPETS = [
    {
        title: '1-line opener',
        body: 'Visual Decompiler is a forensic advertising intelligence OS that shows exactly why creative works and what to do next.',
    },
    {
        title: '30-second positioning pitch',
        body: 'Most tools help teams generate ads, track spend, or run tests. Visual Decompiler does something different: it turns creative assets into structured strategic intelligence teams can defend in client rooms. You get forensic diagnosis, differential comparison, compounding vault memory, and white-label delivery — so agencies can present premium analytics as their own strategic authority.',
    },
    {
        title: 'Follow-up email paragraph',
        body: 'Great speaking today. As discussed, Visual Decompiler is built to be faster than manual analysis and deeper than using ChatGPT alone. It converts ad creative into client-defensible strategic readouts, supports differential diagnosis across assets, and compounds intelligence over time through a searchable vault. With white-label controls, your team can deliver boardroom-ready outputs under your own brand.',
    },
] as const;

function toSlug(objection: string) {
    return objection
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '');
}

function cleanText(value: string) {
    return value.replace(/\s+/g, ' ').trim();
}

function extractSection(body: string, heading: string, nextHeadings: string[]) {
    const lines = body.split('\n');
    const start = lines.findIndex((line) => line.trim() === heading);

    if (start === -1) {
        return '';
    }

    const content: string[] = [];

    for (let index = start + 1; index < lines.length; index += 1) {
        const line = lines[index];
        if (nextHeadings.includes(line.trim())) {
            break;
        }
        content.push(line);
    }

    return cleanText(content.join(' '));
}

export async function loadSalesObjections(): Promise<EnablementObjection[]> {
    const filePath = path.join(process.cwd(), 'SALES-OBJECTION-SHEET.md');
    const markdown = await readFile(filePath, 'utf8');

    const objectionMatches = [...markdown.matchAll(/## \d+\) ([\s\S]*?)(?=\n## \d+\)|\n## Close line for calls)/g)];

    return objectionMatches.map((match) => {
        const block = match[1].trim();
        const lines = block.split('\n');
        const objection = cleanText(lines[0]);

        const meaning = extractSection(block, '### What they really mean', [
            '### 20-second response',
            '### 60-second response',
            '### Proof points to show',
        ]);
        const shortResponse = extractSection(block, '### 20-second response', [
            '### What they really mean',
            '### 60-second response',
            '### Proof points to show',
        ]);
        const longResponse = extractSection(block, '### 60-second response', [
            '### What they really mean',
            '### 20-second response',
            '### Proof points to show',
        ]);

        const proofSection = block
            .split('### Proof points to show')[1]
            ?.split(/\n## \d+\)|\n## Close line for calls/)[0] || '';

        const proofPoints = proofSection
            .split('\n')
            .map((line) => line.trim())
            .filter((line) => line.startsWith('- '))
            .map((line) => line.slice(2).trim());

        return {
            slug: toSlug(objection),
            objection,
            meaning,
            shortResponse,
            longResponse,
            proofPoints,
        };
    });
}
