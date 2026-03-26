'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import {
    ArrowUpRight,
    BarChart3,
    FlaskConical,
    MessageSquare,
    Sparkles,
} from 'lucide-react';
import { SAMPLE_DOSSIER_HREF } from '@/lib/sample-dossier';
import {
    HOMEPAGE_CTA_ICON,
    HOMEPAGE_PRIMARY_CTA,
    HOMEPAGE_SECONDARY_CTA,
    HOMEPAGE_TEXT_CTA,
} from '@/components/marketing/ctaStyles';

type ProofPoint = {
    label: string;
    body: string;
};

type FunnelSection = {
    id: string;
    label: string;
    title: string;
    body: string;
    tone: 'light' | 'dark';
    points: ProofPoint[];
};

const DIFFERENTIAL_METRICS = [
    { label: 'Strategic Delta', value: '+27% novelty advantage' },
    { label: 'Persuasion Lift', value: '+18% identity pull' },
    { label: 'Fatigue Gap', value: '-22% repetition risk' },
] as const;

const DIFFERENTIATION_BLOCKS = [
    {
        title: 'Generation Tools',
        theyDo: 'Create ad variations fast.',
        weDo: 'Map persuasion mechanics, trigger signals, and friction risk into a forensic dossier.',
        icon: Sparkles,
    },
    {
        title: 'Media Dashboards',
        theyDo: 'Track spend, distribution, and movement.',
        weDo: 'Turn creative signals into strategic readouts, decision layers, and next moves.',
        icon: BarChart3,
    },
    {
        title: 'One-Off Testing Workflows',
        theyDo: 'Validate single assets in isolation.',
        weDo: 'Store pattern memory, cross-asset deltas, and reusable blueprint context.',
        icon: FlaskConical,
    },
    {
        title: 'Generic AI Chat',
        theyDo: 'Offer broad reasoning on demand.',
        weDo: 'Produce structured signals, dossier logic, and client-ready strategic outputs.',
        icon: MessageSquare,
    },
] as const;

const DIFFERENTIATION_PROOF_ROWS = [
    {
        label: 'Signals',
        value: 'Trigger profile, friction cues, and narrative pressure in one readout.',
    },
    {
        label: 'Mechanics',
        value: 'Primary persuasion system, blueprint logic, and strategic posture.',
    },
    {
        label: 'Dossier',
        value: 'A client-ready object built for review rooms, decks, and follow-up moves.',
    },
] as const;


const FUNNEL_SECTIONS: FunnelSection[] = [
    {
        id: 'deconstruction',
        label: 'Single-Asset Deconstruction',
        title: 'Open one ad. See exactly why it works.',
        body: 'Start with one competitor asset and get a complete strategic read: dominant mechanic, confidence score, trigger distribution, friction profile, and action-ready interpretation.',
        tone: 'dark',
        points: [
            {
                label: 'Primary Mechanic',
                body: 'Identify the winning persuasion system instantly',
            },
            {
                label: 'Confidence Layer',
                body: 'Scored readout you can defend in client rooms',
            },
            {
                label: 'Psychology Map',
                body: 'Trigger density and friction surfaced clearly',
            },
        ],
    },
    {
        id: 'vault',
        label: 'Intelligence Vault',
        title: 'Build strategic memory, not one-off reports.',
        body: 'Every dossier compounds future value inside Vault: searchable assets, deduplicated analyses, shared tags/boards, and stronger benchmarking with every ingest.',
        tone: 'light',
        points: [
            {
                label: 'Searchable Recall',
                body: 'Find assets by brand, category, mechanic, or tag',
            },
            {
                label: 'Deduplication',
                body: 'Avoid re-analysing the same asset twice',
            },
            {
                label: 'Benchmark Depth',
                body: 'Comparative intelligence gets sharper over time',
            },
        ],
    },
    {
        id: 'execution',
        label: 'Execution Outputs',
        title: 'Turn analysis into client-ready execution.',
        body: 'Visual Decompiler doesn’t stop at diagnosis. Convert dossier intelligence into deployable outputs your team can pitch, build from, and ship.',
        tone: 'dark',
        points: [
            {
                label: 'Blueprint Output',
                body: 'Structural pattern and strategic route extracted',
            },
            {
                label: 'Clone Engine',
                body: 'Generate fresh directions from winning mechanics',
            },
            {
                label: 'White-Label Export',
                body: 'Boardroom-ready strategic artifact in minutes',
            },
        ],
    },
    {
        id: 'intelligence',
        label: 'Mechanic Intelligence',
        title: 'See category patterns, not just single ads.',
        body: 'Market Pulse reveals mechanic velocity, saturation, whitespace, and strategic deltas across assets — so decisions are based on market structure, not isolated examples.',
        tone: 'light',
        points: [
            {
                label: 'Velocity Tracking',
                body: 'See which mechanics are rising or flattening',
            },
            {
                label: 'Whitespace Detection',
                body: 'Spot underexploited strategic positions',
            },
            {
                label: 'Differential Diagnostic',
                body: 'Compare assets by lift, fatigue, and delta',
            },
        ],
    },
    {
        id: 'operating',
        label: 'Agency Operating Layer',
        title: 'Run intelligence like an agency system.',
        body: 'Boards, team seats, settings, and export controls turn forensic analysis into a repeatable operating layer across strategy, creative, and leadership.',
        tone: 'light',
        points: [
            {
                label: 'Boards',
                body: 'Shared strategic workspaces for ongoing programs',
            },
            {
                label: 'Agency Settings',
                body: 'White-label identity and output standards',
            },
            {
                label: 'Team & Seats',
                body: 'Analysts and strategists in one coordinated system',
            },
        ],
    },
];

const REVEAL = {
    initial: { opacity: 0, y: 24 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.2 },
    transition: { duration: 0.75, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
};

const STEP_PUNCH: Record<string, string> = {
    deconstruction: 'From creative surface to true mechanism.',
    vault: 'Turn one-off findings into strategic memory.',
    execution: 'Move from diagnosis to deployable output.',
    intelligence: 'Read category momentum before competitors do.',
    operating: 'Run the whole system like an agency engine.',
};

const SECTION_EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];
const SECONDARY_CARD_RADIUS = 'rounded-[1.7rem]';
const SECTION_BAND = 'px-6 py-16 md:py-24';

function DifferentialDiagnosisSection() {
    return (
        <section className={`relative overflow-hidden border-b border-[#E3DACB] bg-[#FBFBF6] ${SECTION_BAND}`}>
            <div className="pointer-events-none absolute inset-0 opacity-[0.55] [background-image:linear-gradient(rgba(20,20,20,0.028)_1px,transparent_1px),linear-gradient(90deg,rgba(20,20,20,0.028)_1px,transparent_1px)] [background-size:48px_48px]" />
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_40%_at_50%_0%,rgba(255,255,255,0.65)_0%,rgba(255,255,255,0)_60%)]" />

            <motion.div {...REVEAL} className="relative z-10 mx-auto max-w-7xl">
                <div className="mb-6 flex items-center gap-3">
                    <span className="h-px w-12 bg-gradient-to-r from-[#D4A574] to-transparent" />
                    <p className="text-[11px] font-bold uppercase tracking-[0.4em] text-[#9B8662]">Intelligence Pulse</p>
                </div>

                <h3 className="max-w-4xl text-[34px] font-bold leading-[1.1] tracking-tight text-[#151310] md:text-5xl">
                    Differential Diagnosis
                </h3>
                <p className="mt-5 max-w-3xl text-[16px] leading-relaxed text-[#6A6257] md:text-[18px] font-medium tracking-tight">
                    Compare two assets and surface strategic delta, persuasion lift, and fatigue risk before you commit creative direction.
                </p>

                <div className="mt-8 grid gap-4 lg:grid-cols-2">
                    <div className="group relative overflow-hidden rounded-[26px] border border-[#D8CCB5] bg-[#191713] shadow-[0_18px_40px_rgba(20,20,20,0.08)]">
                        <div className="absolute left-4 top-4 z-20 rounded-full border border-[#5A4A34] bg-[#171510]/85 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.2em] text-[#D5B386]">
                            Asset A · Reference
                        </div>
                        <Image
                            src="/images/examples/Chanel_No5.webp"
                            alt="Reference asset for differential diagnosis"
                            width={1000}
                            height={1333}
                            className="aspect-[3/4] w-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                        />
                        <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-[#0E0D0B] to-transparent" />
                        <div className="absolute bottom-4 left-4 z-20 text-sm text-[#E7D7BF] font-medium italic">Heritage-led prestige framing</div>
                    </div>

                    <div className="group relative overflow-hidden rounded-[26px] border border-[#D8CCB5] bg-[#191713] shadow-[0_18px_40px_rgba(20,20,20,0.08)]">
                        <div className="absolute left-4 top-4 z-20 rounded-full border border-[#5A4A34] bg-[#171510]/85 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.2em] text-[#D5B386]">
                            Asset B · Target
                        </div>
                        <Image
                            src="/images/examples/Miss%20DIOR.jpg"
                            alt="Target variant for differential diagnosis"
                            width={1000}
                            height={1333}
                            className="aspect-[3/4] w-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                        />
                        <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-[#0E0D0B] to-transparent" />
                        <div className="absolute bottom-4 left-4 z-20 text-sm text-[#E7D7BF] font-medium italic">Modern identity-led persuasion</div>
                    </div>
                </div>

                <div className="mt-4 flex items-center justify-center">
                    <span className="rounded-full border border-[#D8CCB5] bg-[#F8F3EA] px-4 py-2 text-[10px] font-bold uppercase tracking-[0.2em] text-[#8E7450]">
                        Differential Read
                    </span>
                </div>

                <div className="mt-6 grid gap-3 md:grid-cols-3">
                    {DIFFERENTIAL_METRICS.map((metric, i) => (
                        <motion.div
                            key={metric.label}
                            initial={{ opacity: 0, y: 12 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.35 }}
                            transition={{ delay: i * 0.08, duration: 0.45 }}
                            className="rounded-xl border border-[#D8CCB5] bg-[#FBF8F2] px-4 py-4 shadow-[0_10px_24px_rgba(20,20,20,0.04)]"
                        >
                            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#B89A70]">{metric.label}</p>
                            <p className="mt-2 text-base font-semibold text-[#141414]">{metric.value}</p>
                        </motion.div>
                    ))}
                </div>

                <div className="mt-6">
                    <a
                        href="/compare"
                        className={HOMEPAGE_PRIMARY_CTA}
                    >
                        <span>Run Differential Diagnosis</span>
                        <ArrowUpRight aria-hidden="true" className={HOMEPAGE_CTA_ICON} />
                    </a>
                </div>
            </motion.div>
        </section>
    );
}

function WhyDifferentSection() {
    return (
        <section className={`border-b border-[#E3DACB] bg-[#F7F1E7] ${SECTION_BAND}`}>
            <motion.div {...REVEAL} className="mx-auto max-w-7xl">
                <div className="max-w-4xl">
                    <p className="text-[11px] font-bold uppercase tracking-[0.4em] text-[#9B8662]">
                        WHY TEAMS SWITCH
                    </p>
                    <h2 className="mt-5 text-[34px] font-bold leading-[1] tracking-tight text-[#151310] md:text-5xl">
                        Forensic intelligence your team can act on in minutes.
                    </h2>
                    <p className="mt-5 max-w-3xl text-[16px] leading-relaxed text-[#6A6257] md:text-[18px] font-medium tracking-tight">
                        See exactly where generic spy tools stop and where Visual Decompiler creates client-ready strategic outputs.
                    </p>
                </div>

                <div className="mt-12 rounded-[1.8rem] border border-[#2B2721] bg-[#171512] px-5 py-5 text-[#F5EFE3] shadow-[0_18px_44px_rgba(18,16,12,0.10)] md:px-6 md:py-6">
                    <div className="grid gap-5 lg:grid-cols-[0.82fr_1.18fr] lg:items-center">
                        <div className="max-w-[26rem]">
                            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#B89A70]">
                                SAMPLE PROOF OBJECT
                            </p>
                            <p className="mt-3 text-lg leading-relaxed text-[#EEE4D3] md:text-lg">
                                Signals, mechanics, blueprint logic, and recommendation layers held in one restrained dossier object.
                            </p>
                        </div>
                        <div className="grid gap-3 md:grid-cols-3">
                            {DIFFERENTIATION_PROOF_ROWS.map((row) => (
                                <div
                                    key={row.label}
                                    className="min-h-[112px] rounded-[1.15rem] border border-[#3A342B] bg-[#201C17] px-4 py-4"
                                >
                                    <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#B89A70]">
                                        {row.label}
                                    </p>
                                    <p className="mt-2 text-sm leading-[1.55] text-[#E5D9C7]">
                                        {row.value}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="mt-16 grid gap-6 md:grid-cols-2">
                    {DIFFERENTIATION_BLOCKS.map((block, index) => (
                        <motion.article
                            key={block.title}
                            initial={{ opacity: 0, y: 16 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.28 }}
                            transition={{ duration: 0.45, delay: index * 0.06, ease: SECTION_EASE }}
                            className="group relative overflow-hidden rounded-[2.5rem] border border-[#E6DDCF] bg-[#FBFBF6] shadow-[0_4px_20px_rgba(0,0,0,0.02)]"
                        >
                            {/* Card Header */}
                            <div className="flex items-center gap-4 border-b border-[#E6DDCF]/60 px-8 py-6">
                                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#D4A574]/10 border border-[#D4A574]/20">
                                    <block.icon className="h-5 w-5 text-[#D4A574]" strokeWidth={1.5} />
                                </div>
                                <h3 className="text-[14px] font-bold uppercase tracking-[0.35em] text-[#9B8662]">{block.title}</h3>
                            </div>

                            <div className="p-8 space-y-8">
                                {/* Conventional / Muted Perspective */}
                                <div className="relative pl-6">
                                    <div className="absolute left-0 top-0 bottom-0 w-px bg-[#E6DDCF]" />
                                    <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#9B8662]/60 mb-2">Conventional</p>
                                    <p className="text-[14px] leading-relaxed text-[#6A6257] font-light">
                                        {block.theyDo}
                                    </p>
                                </div>

                                {/* Sovereign / Premium Advantage */}
                                <div className="relative pl-6 py-4 border-l-[3px] border-[#D4A574] bg-[#F7F1E7]/40 rounded-r-2xl">
                                    <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#D4A574] mb-2">Sovereign Advantage</p>
                                    <p className="text-[15px] leading-relaxed font-medium text-[#151310] tracking-tight">
                                        {block.weDo}
                                    </p>
                                </div>
                            </div>
                        </motion.article>
                    ))}
                </div>

                <div className="mt-8 flex justify-start md:justify-center">
                    <a
                        href={SAMPLE_DOSSIER_HREF}
                        className={HOMEPAGE_SECONDARY_CTA}
                    >
                        <span>View Sample Dossier</span>
                        <ArrowUpRight aria-hidden="true" className={HOMEPAGE_CTA_ICON} />
                    </a>
                </div>
            </motion.div>
        </section>
    );
}

function PlatformSystemGrid() {
    return (
        <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-5">
            {FUNNEL_SECTIONS.map((section, index) => (
                <motion.article
                    key={section.id}
                    id={section.id}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ delay: index * 0.05, duration: 0.35, ease: SECTION_EASE }}
                    className={`group relative overflow-hidden ${SECONDARY_CARD_RADIUS} border p-4 ${
                        index % 2 === 0
                            ? 'border-[#DCCDB7] bg-[#FCF9F3]'
                            : 'border-[#D4C3AA] bg-[#F6EFE3]'
                    }`}
                >
                    <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#8E7450]">0{index + 1}</p>
                    <h3 className="mt-2 text-[15px] font-semibold leading-snug text-[#141414]">{section.label}</h3>
                    <p className="mt-2 max-w-[25ch] text-sm leading-6 text-[#5E584F]">{STEP_PUNCH[section.id]}</p>
                </motion.article>
            ))}
        </div>
    );
}

export default function ProductProofSequence() {
    return (
        <div id="funnel" className="bg-[#FBFBF6]">
            <DifferentialDiagnosisSection />
            <WhyDifferentSection />

            <section className={`border-b border-[#E3DACB] bg-[#FBFBF6] ${SECTION_BAND}`}>
                <motion.div
                    initial={{ opacity: 1, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.06 }}
                    transition={{ duration: 0.5, ease: SECTION_EASE }}
                    className="mx-auto max-w-7xl"
                >
                    <div className="mb-10 md:mb-14">
                        <p className="text-[11px] font-bold uppercase tracking-[0.4em] text-[#D4A574]">System Architecture</p>
                        <h2 className="mt-5 max-w-5xl text-[34px] font-bold leading-[1] tracking-tight text-[#151310] md:text-5xl">
                            The operating layer behind every forensic readout.
                        </h2>
                        <p className="mt-5 max-w-3xl text-[16px] leading-relaxed text-[#6A6257] md:text-[18px] font-medium tracking-tight">
                            Move from one asset to compounding intelligence, execution-ready outputs, and agency delivery without adding workflow noise.
                        </p>
                    </div>

                    <PlatformSystemGrid />
                </motion.div>
            </section>
        </div>
    );
}
