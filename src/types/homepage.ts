export type LinkCta = { label: string; href: string };

export type StageImage = { src: string; alt: string };

export type Pill = {
    key: string;
    label: string;
    micro: string;
    // positions are relative to the stage box (0..100)
    x: number;
    y: number;
};

export type PreviewCard = {
    title: string;
    micro: string;
    bullets?: string[];
};

export type CaseCard = {
    title: string;
    micro: string;
    evidence?: string[]; // shown as chips
};
