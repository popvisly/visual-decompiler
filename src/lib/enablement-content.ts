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
