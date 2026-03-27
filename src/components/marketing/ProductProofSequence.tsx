'use client';

import React from 'react';
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
} from '@/components/marketing/ctaStyles';
import HeroAppPreview from '@/components/marketing/HeroAppPreview';

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

function AccentBar() {
    return (
        <div className="flex items-center gap-1.5">
            <span className="h-1.5 w-8 rounded-full bg-[#F4A700]" />
            <span className="h-1.5 w-5 rounded-full bg-[#C8230A]" />
            <span className="h-1.5 w-4 rounded-full bg-[#D4A574]" />
            <span className="h-1.5 w-3 rounded-full bg-[#F5EDE3]" />
            <span className="h-1.5 w-5 rounded-full bg-[#D7B07A]" />
        </div>
    );
}

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

const SECTION_BAND = 'px-6 py-16 md:py-24';
const DARK_SURFACE = 'border-b border-[#2B241A] bg-[#141414]';
const TAN_CTA =
    'group inline-flex items-center justify-center gap-2 rounded-full border border-[#D4A574] bg-[#D4A574] px-7 py-3.5 text-[11px] font-bold uppercase tracking-[0.18em] text-[#141414] shadow-[0_12px_24px_rgba(0,0,0,0.18)] transition-all duration-300 hover:-translate-y-[1px] hover:bg-[#D7B07A] hover:border-[#D7B07A] hover:shadow-[0_16px_30px_rgba(0,0,0,0.22)] sm:min-w-[220px] sm:w-auto sm:px-8 sm:py-4 sm:text-[12px] sm:tracking-[0.2em]';
const OUTLINE_TAN_CTA =
    'group inline-flex items-center justify-center gap-2 rounded-full border border-[rgba(212,165,116,0.32)] px-5 py-3 text-[10px] font-semibold uppercase tracking-[0.18em] text-[#D4A574] transition-all duration-300 hover:-translate-y-[1px] hover:border-[#D7B07A] hover:bg-[#1B1814] hover:text-[#D7B07A] sm:min-w-[220px] sm:w-auto sm:px-6 sm:text-[11px] sm:tracking-[0.2em]';

function DifferentialDiagnosisSection() {
    return (
        <section className={`relative overflow-hidden ${DARK_SURFACE} ${SECTION_BAND}`}>
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_62%_42%_at_74%_12%,rgba(212,165,116,0.08)_0%,rgba(212,165,116,0)_62%)]" />

            <motion.div {...REVEAL} className="relative z-10 mx-auto max-w-7xl">
                <div className="mb-6 flex items-center gap-3">
                    <span className="h-px w-12 bg-gradient-to-r from-[#D4A574] to-transparent" />
                    <p className="text-[11px] font-bold uppercase tracking-[0.4em] text-[#D4A574]">Intelligence Pulse</p>
                </div>
                <AccentBar />

                <h3 className="max-w-4xl text-[34px] font-bold leading-[1.1] tracking-tight text-[#FBFBF6] md:text-5xl">
                    Differential <span className="text-[#F4A700]">Diagnostic</span>
                </h3>
                <p className="mt-5 max-w-3xl text-[16px] leading-relaxed text-[#9A9A94] md:text-[18px] font-medium tracking-tight">
                    Choose two assets and surface the strategic delta, persuasion lift, and fatigue gap before you commit creative direction.
                </p>

                <div className="mt-8 mx-auto max-w-5xl grid gap-6 lg:grid-cols-2">
                    {/* Asset A */}
                    <div className="group relative overflow-hidden rounded-[3rem] border border-[rgba(212,165,116,0.2)] bg-[#1F1F1F] p-3 sm:p-4">
                        <div className="relative h-full w-full overflow-hidden rounded-[2.2rem] bg-[#151310]">
                            <div className="absolute left-4 top-4 z-20 rounded-full border border-[#5A4A34] bg-[#171510]/85 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.2em] text-[#D5B386]">
                                CONTROL (ASSET A)
                            </div>
                            <Image
                                src="/images/examples/Chanel_No5.webp"
                                alt="Control asset for differential diagnostic"
                                fill
                                unoptimized
                                className="object-cover transition-transform duration-500 group-hover:scale-[1.02] opacity-90"
                            />
                            <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-[#0E0D0B] to-transparent" />
                            <div className="absolute bottom-5 left-6 z-20 text-sm text-[#E7D7BF] font-medium italic">Heritage-led prestige framing</div>
                        </div>
                    </div>

                    {/* Asset B */}
                    <div className="group relative overflow-hidden rounded-[3rem] border border-[rgba(212,165,116,0.2)] bg-[#1F1F1F] p-3 sm:p-4">
                        <div className="relative h-full w-full overflow-hidden rounded-[2.2rem] bg-[#151310] aspect-[4/5]">
                            <div className="absolute left-4 top-4 z-20 rounded-full border border-[#5A4A34] bg-[#171510]/85 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.2em] text-[#D5B386]">
                                PROPOSED (ASSET B)
                            </div>
                            <Image
                                src="/images/examples/Miss_DIOR.jpg"
                                alt="Proposed route for differential diagnostic"
                                fill
                                unoptimized
                                className="object-cover transition-transform duration-500 group-hover:scale-[1.02] opacity-90"
                            />
                            <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-[#0E0D0B] to-transparent" />
                            <div className="absolute bottom-5 left-6 z-20 text-sm text-[#E7D7BF] font-medium italic">Modern identity-led persuasion</div>
                        </div>
                    </div>
                </div>

                <div className="mt-4 flex items-center justify-center">
                    <span className="rounded-full border border-[rgba(212,165,116,0.24)] bg-[#1F1F1F] px-4 py-2 text-[10px] font-bold uppercase tracking-[0.2em] text-[#D4A574]">
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
                            className="rounded-xl border border-[rgba(212,165,116,0.2)] bg-[#1F1F1F] px-4 py-4"
                        >
                            <p className={`text-[10px] font-bold uppercase tracking-[0.2em] ${
                                i === 0 ? 'text-[#F4A700]' : i === 1 ? 'text-[#D4A574]' : 'text-[#C8230A]'
                            }`}>{metric.label}</p>
                            <p className="mt-2 text-base font-semibold text-[#FBFBF6]">{metric.value}</p>
                        </motion.div>
                    ))}
                </div>

                <div className="mt-6">
                    <a
                        href="/compare"
                        className={TAN_CTA}
                    >
                        <span>Run Differential Diagnostic</span>
                        <ArrowUpRight aria-hidden="true" className={HOMEPAGE_CTA_ICON} />
                    </a>
                </div>
            </motion.div>
        </section>
    );
}

function WhyDifferentSection() {
    return (
        <section className={`relative overflow-hidden ${DARK_SURFACE} ${SECTION_BAND}`}>
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_58%_38%_at_20%_14%,rgba(212,165,116,0.06)_0%,rgba(212,165,116,0)_66%)]" />
            <motion.div {...REVEAL} className="mx-auto max-w-7xl">
                <div className="max-w-4xl">
                    <p className="text-[11px] font-bold uppercase tracking-[0.4em] text-[#9B8662]">
                        WHY TEAMS SWITCH
                    </p>
                    <AccentBar />
                    <h2 className="mt-5 text-[34px] font-bold leading-[1] tracking-tight text-[#FBFBF6] md:text-5xl">
                        Forensic intelligence your team can <span className="text-[#D4A574]">act</span> on in minutes.
                    </h2>
                    <p className="mt-5 max-w-3xl text-[16px] leading-relaxed text-[#9A9A94] md:text-[18px] font-medium tracking-tight">
                        See exactly where generic spy tools stop and where Visual Decompiler creates client-ready strategic outputs.
                    </p>
                </div>

                <div className="mt-12 rounded-[1.8rem] border border-[rgba(212,165,116,0.18)] bg-transparent px-5 py-5 text-[#F5EFE3] md:px-6 md:py-6">
                    <div className="max-w-[30rem]">
                        <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#B89A70]">
                            SAMPLE PROOF OBJECT
                        </p>
                        <p className="mt-3 text-lg leading-relaxed text-[#EEE4D3] md:text-lg">
                            Signals, mechanics, blueprint logic, and recommendation layers held in one restrained dossier object.
                        </p>
                    </div>
                </div>

                <div className="mt-16 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
                    {DIFFERENTIATION_BLOCKS.map((block, index) => (
                        <motion.article
                            key={block.title}
                            initial={{ opacity: 0, y: 16 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.2 }}
                            transition={{ duration: 0.45, delay: index * 0.06, ease: [0.22, 1, 0.36, 1] }}
                            className="group relative flex flex-col overflow-hidden rounded-[2.5rem] border border-[rgba(212,165,116,0.2)] bg-[#1F1F1F]"
                        >
                            <div className="flex items-center gap-3 border-b border-[rgba(212,165,116,0.16)] px-6 py-5">
                                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl border border-[rgba(212,165,116,0.2)] bg-[#171512]">
                                    <block.icon className="h-5 w-5 text-[#D4A574]" strokeWidth={1.5} />
                                </div>
                                <h3 className="text-[11px] font-bold uppercase tracking-[0.3em] text-[#D4A574]">{block.title}</h3>
                            </div>

                            <div className="flex flex-col gap-5 p-6 flex-1">
                                <div className="relative pl-5">
                                    <div className="absolute left-0 top-0 bottom-0 w-px bg-[rgba(212,165,116,0.14)]" />
                                    <p className="mb-1.5 text-[9px] font-bold uppercase tracking-[0.25em] text-[#9A9A94]">They Do</p>
                                    <p className="text-[13px] leading-relaxed text-[#9A9A94] font-light">
                                        {block.theyDo}
                                    </p>
                                </div>

                                <div className="relative rounded-r-xl border-l-[3px] border-[#D4A574] bg-[#171512] py-3 pl-5">
                                    <p className="mb-1.5 text-[9px] font-bold uppercase tracking-[0.25em] text-[#D4A574]">We Do</p>
                                    <p className="text-[13px] leading-relaxed font-semibold tracking-tight text-[#FBFBF6]">
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
                        className={OUTLINE_TAN_CTA}
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
                    transition={{ delay: index * 0.05, duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                    className="group relative overflow-hidden rounded-[1.7rem] border border-[rgba(212,165,116,0.2)] bg-[#1F1F1F] p-4"
                >
                    <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#D4A574]">0{index + 1}</p>
                    <h3 className="mt-2 text-[15px] font-semibold leading-snug text-[#FBFBF6]">{section.label}</h3>
                    <p className="mt-2 max-w-[25ch] text-sm leading-6 text-[#9A9A94]">{STEP_PUNCH[section.id]}</p>
                </motion.article>
            ))}
        </div>
    );
}

function SingleAssetDeconstruction() {
    return (
        <section className="relative overflow-hidden border-b border-[#2B241A] bg-[#141414] px-6 py-14 md:py-16">
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_38%_at_72%_10%,rgba(212,165,116,0.06)_0%,rgba(212,165,116,0)_64%)]" />
            <motion.div {...REVEAL} className="relative z-10 mx-auto max-w-7xl">
                <div className="grid gap-10 lg:grid-cols-[1.05fr_0.8fr] lg:items-start lg:gap-12">
                    <div>
                        <div className="mb-5 flex items-center gap-3">
                            <span className="h-px w-12 bg-gradient-to-r from-[#D4A574] to-transparent" />
                            <p className="text-[11px] font-bold uppercase tracking-[0.4em] text-[#D4A574]">Dossier Construction</p>
                        </div>
                        <AccentBar />
                        <h2 className="max-w-2xl text-[32px] font-bold leading-[1.06] tracking-tight text-[#FBFBF6] md:text-[42px]">
                            Deconstruct the hidden <span className="text-[#D7B07A]">persuasion</span> architecture.
                        </h2>
                        <p className="mt-5 max-w-xl text-[16px] leading-relaxed text-[#9A9A94] md:text-[17px] font-medium tracking-tight">
                            Upload any competitor ad and get a client-ready strategic dossier — psychology, signals, and a reconstruction blueprint — in under 60 seconds.
                        </p>

                        <div className="mt-8 grid gap-5 sm:grid-cols-2">
                            <div className="rounded-r-xl border-l-[3px] border-[#D4A574] bg-[#1B1814] py-3 pl-6">
                                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#D4A574] mb-2">Automated Extraction</p>
                                <p className="text-[14px] leading-relaxed text-[#9A9A94]">Hidden signals and subtext surfaced instantly.</p>
                            </div>
                            <div className="rounded-r-xl border-l-[3px] border-[#D4A574] bg-[#1B1814] py-3 pl-6">
                                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#D4A574] mb-2">Strategic Interpretation</p>
                                <p className="text-[14px] leading-relaxed text-[#9A9A94]">Raw data turned into clinical, action-ready moves.</p>
                            </div>
                        </div>
                    </div>

                    <div className="relative lg:pt-1">
                        <div className="mx-auto max-w-[520px] lg:mr-0">
                            <HeroAppPreview />
                        </div>
                    </div>
                </div>
            </motion.div>
        </section>
    );
}

export default function ProductProofSequence() {
    return (
        <div id="funnel" className="bg-[#141414]">
            <SingleAssetDeconstruction />
            <DifferentialDiagnosisSection />
            <WhyDifferentSection />

            <section className={`relative overflow-hidden ${DARK_SURFACE} ${SECTION_BAND}`}>
                <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_56%_34%_at_82%_18%,rgba(212,165,116,0.05)_0%,rgba(212,165,116,0)_64%)]" />
                <motion.div
                    initial={{ opacity: 1, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.06 }}
                    transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                    className="mx-auto max-w-7xl"
                >
                    <div className="mb-10 md:mb-14">
                        <p className="text-[11px] font-bold uppercase tracking-[0.4em] text-[#D4A574]">System Architecture</p>
                        <AccentBar />
                        <h2 className="mt-5 max-w-5xl text-[34px] font-bold leading-[1] tracking-tight text-[#FBFBF6] md:text-5xl">
                            The <span className="text-[#F5EDE3]">operating</span> layer behind every forensic readout.
                        </h2>
                        <p className="mt-5 max-w-3xl text-[16px] leading-relaxed text-[#9A9A94] md:text-[18px] font-medium tracking-tight">
                            Move from one asset to compounding intelligence, execution-ready outputs, and agency delivery without adding workflow noise.
                        </p>
                    </div>

                    <PlatformSystemGrid />
                </motion.div>
            </section>
        </div>
    );
}
