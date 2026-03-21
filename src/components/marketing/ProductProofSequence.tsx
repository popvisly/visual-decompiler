'use client';

import Image from 'next/image';
import { useRef, useState } from 'react';
import { motion, useMotionValueEvent, useScroll } from 'framer-motion';

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

type Stat = {
    label: string;
    value: string;
    detail: string;
};

type MiroNode = {
    title: string;
    body: string;
};


const STATS: Stat[] = [
    {
        value: '5',
        label: 'Intelligence surfaces',
        detail: 'per analysis',
    },
    {
        value: '<60s',
        label: 'Typical dossier',
        detail: 'generation time',
    },
    {
        value: '100%',
        label: 'White-label export',
        detail: 'ready',
    },
    {
        value: '∞',
        label: 'Compounding strategic memory',
        detail: 'in Vault',
    },
];

const MIRO_FLOW_NODES: MiroNode[] = [
    {
        title: 'Input Cluster',
        body: 'Ingest your WIP, competitor, and client campaign assets into one visual field.',
    },
    {
        title: 'Visual Mechanics',
        body: 'Decompiler isolates composition, chromatic cues, framing, and hierarchy patterns.',
    },
    {
        title: 'Psychology Map',
        body: 'Surface the persuasion levers behind response: identity, scarcity, authority, and friction.',
    },
    {
        title: 'Strategic Move',
        body: 'Translate findings into a concrete creative direction your team can execute next.',
    },
];

const LIVE_AD_STACK = [
    {
        src: '/images/examples/Chanel_No5.webp',
        alt: 'Fragrance campaign visual for analysis stack',
        brand: 'Chanel',
        sector: 'Fragrance',
        rotate: -4,
        x: 0,
        y: 0,
    },
    {
        src: '/images/examples/Watch.png',
        alt: 'Luxury watch campaign visual for analysis stack',
        brand: 'Tag',
        sector: 'Watch',
        rotate: 3,
        x: 56,
        y: 20,
    },
    {
        src: '/images/examples/dior.png',
        alt: 'Beauty campaign visual for analysis stack',
        brand: 'Dior',
        sector: 'Beauty',
        rotate: -2,
        x: 112,
        y: 40,
    },
    {
        src: '/images/examples/ACNE.png',
        alt: 'Fashion campaign visual for analysis stack',
        brand: 'Acne',
        sector: 'Fashion',
        rotate: 4,
        x: 168,
        y: 60,
    },
] as const;

const LIVE_DECONSTRUCTION_CARDS = [
    {
        label: 'Primary Read',
        value: 'Status transfer through premium composition and controlled product framing.',
    },
    {
        label: 'Psychological Lever',
        value: 'Identity mirroring + aspiration pressure creating high social compliance.',
    },
    {
        label: 'Friction Risk',
        value: 'Low resistance: message clarity is high but distinctiveness can decay with repetition.',
    },
    {
        label: 'Recommended Move',
        value: 'Keep prestige cues, then introduce one disruptive structural element to reclaim novelty.',
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



function StatsBar() {
    return (
        <section className="border-y border-[#DED5C5] bg-[#FBFBF6]">
            <div className="mx-auto max-w-7xl px-6 py-6 md:py-8">
                <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#9A8A73]">Analysis Surfaces</p>
                <p className="mt-3 max-w-3xl text-sm leading-relaxed text-[#625D54] md:text-base">
                    One analysis returns five structured outputs. Start with the primary read first, then move through speed, export readiness, and memory depth.
                </p>
                <a
                    href="#deconstruction"
                    className="mt-4 inline-flex items-center text-[10px] font-bold uppercase tracking-[0.2em] text-[#7D6748] transition hover:text-[#1A1712]"
                >
                    See Decompiler Output ↓
                </a>
            </div>

            <div className="mx-auto grid max-w-7xl gap-px bg-[#E5DCCD]/70 sm:grid-cols-2 xl:grid-cols-4">
                {STATS.map((stat, index) => (
                    <motion.div
                        key={stat.label}
                        initial={{ opacity: 0, y: 24 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.65, delay: index * 0.1 }}
                        className={`px-6 py-8 md:px-8 md:py-10 ${
                            index === 0 ? 'rounded-t-2xl bg-[#181613] text-[#F5EBDD]' : 'bg-[#FBFBF6]'
                        }`}
                    >
                        <p className={`text-[46px] font-semibold leading-none tracking-[-0.05em] md:text-[56px] ${index === 0 ? 'text-[#F5EBDD]' : 'text-[#141414]'}`}>
                            {stat.value}
                        </p>
                        <p className={`mt-3 text-[10px] font-bold uppercase tracking-[0.22em] ${index === 0 ? 'text-[#D4B387]' : 'text-[#8A7B64]'}`}>
                            {stat.label}
                        </p>
                        <p className={`mt-1 text-sm ${index === 0 ? 'text-[#DCCBB3]' : 'text-[#5F5B53]'}`}>{stat.detail}</p>
                    </motion.div>
                ))}
            </div>
        </section>
    );
}

function MiroFlowSection() {
    const sectionRef = useRef<HTMLElement | null>(null);
    const [activeIndex, setActiveIndex] = useState(0);
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ['start 75%', 'end 30%'],
    });

    useMotionValueEvent(scrollYProgress, 'change', (latest) => {
        const next = Math.min(MIRO_FLOW_NODES.length - 1, Math.floor(latest * MIRO_FLOW_NODES.length));
        setActiveIndex(next);
    });

    return (
        <section ref={sectionRef} className="border-b border-[#E3DACB] bg-[#F7F1E7] px-6 py-14 md:py-16">
            <motion.div {...REVEAL} className="mx-auto max-w-7xl">
                <div className="mb-6 flex items-center gap-3">
                    <span className="h-px w-10 bg-gradient-to-r from-[#CDA468] to-transparent" />
                    <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#9A8A73]">Discovery Flow</p>
                </div>
                <h3 className="max-w-4xl text-3xl font-semibold leading-[1] tracking-tight text-[#141414] md:text-5xl">
                    Insights connect as you scroll — like a living strategy board.
                </h3>

                <div className="mt-8 grid gap-3 md:grid-cols-4 md:gap-0">
                    {MIRO_FLOW_NODES.map((node, index) => (
                        <motion.div
                            key={node.title}
                            initial={{ opacity: 0, y: 18 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.35 }}
                            transition={{ delay: index * 0.12, duration: 0.55, ease: SECTION_EASE }}
                            className={`group relative rounded-2xl border px-4 py-4 md:rounded-none md:border-l-0 md:first:rounded-l-2xl md:first:border-l md:last:rounded-r-2xl ${
                                index === activeIndex ? 'border-[#CDA468] bg-[#F7F0E5]' : 'border-[#DCCDB7] bg-[#FCF9F3]'
                            }`}
                        >
                            {index < MIRO_FLOW_NODES.length - 1 && (
                                <>
                                    <span className="pointer-events-none absolute -right-2 top-1/2 z-10 hidden h-px w-4 -translate-y-1/2 bg-[#CDB792] md:block" />
                                    {index === activeIndex && (
                                        <motion.span
                                            aria-hidden
                                            className="pointer-events-none absolute -right-1 top-1/2 z-20 hidden h-1.5 w-1.5 -translate-y-1/2 rounded-full bg-[#CDA468] md:block"
                                            animate={{ opacity: [0.25, 1, 0.25], x: [0, 6, 0] }}
                                            transition={{
                                                duration: 1.4,
                                                repeat: Infinity,
                                                ease: 'easeInOut',
                                            }}
                                        />
                                    )}
                                </>
                            )}
                            <p className={`text-[10px] font-bold uppercase tracking-[0.2em] ${index === activeIndex ? 'text-[#7D5F37]' : 'text-[#8E7A5E]'}`}>Step {index + 1}</p>
                            <p className="mt-2 text-lg font-semibold text-[#171410]">{node.title}</p>
                            <p className="mt-2 text-sm leading-relaxed text-[#5D584F]">{node.body}</p>
                        </motion.div>
                    ))}
                </div>

                <div className="mt-6 flex justify-end">
                    <a
                        href="#operating"
                        className="inline-flex items-center text-[10px] font-bold uppercase tracking-[0.2em] text-[#7D6748] transition hover:text-[#1A1712]"
                    >
                        Continue to Operating Layer ↓
                    </a>
                </div>
            </motion.div>
        </section>
    );
}

function LiveDeconstruction() {
    return (
        <section className="border-b border-[#E3DACB] bg-[#F8F3EA] px-6 py-14 md:py-18">
            <motion.div {...REVEAL} className="mx-auto max-w-7xl">
                <p className="text-[10px] font-bold uppercase tracking-[0.34em] text-[#C1A67B]">Live Deconstruction</p>
                <h2 className="mt-4 max-w-4xl text-4xl font-semibold uppercase leading-[0.94] tracking-tight text-[#141414] md:text-5xl lg:text-6xl">
                    Visual inputs in. Strategic intelligence out.
                </h2>
                <p className="mt-5 max-w-3xl text-lg leading-relaxed text-[#5F5B53]">
                    A rotating asset stack across categories feeds one analysis machine — so visual teams see range, and strategy teams trust the output.
                </p>

                <div className="mt-10 grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
                    <motion.div
                        initial={{ opacity: 0, x: -26 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, amount: 0.35 }}
                        transition={{ duration: 0.8, ease: SECTION_EASE }}
                        className="rounded-[30px] border border-[#D9CCB8] bg-[#131210] p-4 shadow-[0_24px_70px_rgba(18,16,12,0.15)] md:p-5"
                    >
                        <div className="relative min-h-[430px] overflow-hidden rounded-[22px] border border-[#2E2A24] bg-[#1A1815] p-4 md:p-5">
                            <div className="mb-4 flex items-center justify-between">
                                <p className="rounded-full border border-[#CDA468]/55 bg-[#181612]/70 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.24em] text-[#E5C18A]">
                                    Incoming Ad Stack
                                </p>
                                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#B89A70]">Multi-Category</p>
                            </div>

                            <div className="relative h-[320px] md:h-[340px]">
                                {LIVE_AD_STACK.map((ad, index) => (
                                    <motion.div
                                        key={`${ad.brand}-${ad.sector}`}
                                        initial={{ opacity: 0, x: ad.x - 10, y: ad.y + 14, rotate: ad.rotate - 0.6 }}
                                        whileInView={{ opacity: 1, x: ad.x, y: ad.y, rotate: ad.rotate }}
                                        viewport={{ once: true, amount: 0.45 }}
                                        animate={{
                                            x: ad.x,
                                            y: [ad.y, ad.y - (3 + index), ad.y],
                                            rotate: [ad.rotate, ad.rotate + (index % 2 === 0 ? 0.7 : -0.7), ad.rotate],
                                        }}
                                        transition={{
                                            delay: index * 0.24,
                                            duration: 0.68,
                                            ease: [0.22, 1, 0.36, 1],
                                            y: {
                                                delay: 1.05 + index * 0.16,
                                                duration: 4.9 + index * 0.55,
                                                ease: 'easeInOut',
                                                repeat: Infinity,
                                                repeatType: 'mirror',
                                            },
                                            rotate: {
                                                delay: 1.15 + index * 0.16,
                                                duration: 5.1 + index * 0.6,
                                                ease: 'easeInOut',
                                                repeat: Infinity,
                                                repeatType: 'mirror',
                                            },
                                        }}
                                        whileHover={{ scale: 1.02, y: ad.y - 3 }}
                                        className="absolute left-2 top-2 w-[62%] overflow-hidden rounded-2xl border border-[#3A342B] bg-[#11100E] shadow-[0_20px_45px_rgba(0,0,0,0.35)]"
                                    >
                                        <Image
                                            src={ad.src}
                                            alt={ad.alt}
                                            width={800}
                                            height={1000}
                                            className="h-[220px] w-full object-cover"
                                        />
                                        {index === 1 && (
                                            <motion.span
                                                aria-hidden
                                                className="pointer-events-none absolute inset-0 border border-[#D8B178]/70"
                                                animate={{ opacity: [0.15, 0.45, 0.15] }}
                                                transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
                                            />
                                        )}
                                        <div className="border-t border-[#2E2A24] bg-[#14120F] px-3 py-2">
                                            <p className="text-[9px] font-bold uppercase tracking-[0.18em] text-[#D1B086]">{ad.brand}</p>
                                            <p className="mt-1 text-[10px] text-[#D7C3A6]/85">{ad.sector}</p>
                                        </div>
                                    </motion.div>
                                ))}


                            </div>

                            <div className="mt-4 rounded-2xl border border-[#312B23] bg-[#15130F] px-4 py-4">
                                <p className="text-[9px] font-bold uppercase tracking-[0.22em] text-[#BFA37A]">For Art Directors & Visual Teams</p>
                                <p className="mt-2 text-sm leading-relaxed text-[#E8D7BF]">
                                    Feed in your own work-in-progress ads, competitor campaigns, or client references. Visual Decompiler breaks each asset apart from surface craft to psychological structure, so you can see <span className="text-[#F1C98E]">what is driving response</span> and what to change next.
                                </p>
                            </div>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 26 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, amount: 0.35 }}
                        transition={{ duration: 0.8, ease: SECTION_EASE }}
                        className="rounded-[30px] border border-[#2F2A23] bg-[#141310] p-5 md:p-6"
                    >
                        <div className="mb-4 flex items-center gap-3">
                            <span className="h-px w-10 bg-gradient-to-r from-[#CDA468] to-transparent" />
                            <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-[#CFAE80]">Diagnosis · Decompiler Output</p>
                        </div>

                        <div className="grid gap-3 sm:grid-cols-2">
                            {LIVE_DECONSTRUCTION_CARDS.map((card, i) => (
                                <motion.div
                                    key={card.label}
                                    initial={{ opacity: 0, y: 14 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.08, duration: 0.55 }}
                                    whileHover={{ y: -3 }}
                                    className="group relative overflow-hidden rounded-2xl border border-[#363027] bg-[#1A1814] px-4 py-4"
                                >
                                    <span className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#D0B896] to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                                    <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#CFAE80]">{card.label}</p>
                                    <p className="mt-2 text-[15px] leading-relaxed text-[#F1E4D1]">{card.value}</p>
                                </motion.div>
                            ))}
                        </div>

                        <div className="mt-4 rounded-2xl border border-[#363027] bg-[#1A1814] px-4 py-4">
                            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#CFAE80]">Discovery Expands as You Scroll</p>
                            <p className="mt-2 text-sm leading-relaxed text-[#DCCBB1]">
                                Next layer reveals pattern deltas, psychological distribution, and strategic posture across each asset — a Miro-style intelligence flow, not static cards.
                            </p>
                        </div>

                        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                            <a
                                href="/ingest"
                                className="inline-flex items-center justify-center rounded-md bg-[#E2C08B] px-5 py-3 text-[11px] font-bold uppercase tracking-[0.18em] text-[#1A1712] transition hover:-translate-y-[1px] hover:bg-[#EACB9A]"
                            >
                                Start Analysis
                            </a>
                            <a
                                href="/asset/1cb30400-1ba3-4dda-8fe2-7650674aeb4a"
                                className="inline-flex items-center justify-center rounded-md border border-[#4A3F30] px-5 py-3 text-[11px] font-bold uppercase tracking-[0.18em] text-[#D7C3A5] transition hover:-translate-y-[1px] hover:bg-[#201C17]"
                            >
                                Open Sample Dossier
                            </a>
                        </div>
                    </motion.div>
                </div>
            </motion.div>
        </section>
    );
}

function FunnelPanel({
    tone,
    points,
}: {
    tone: FunnelSection['tone'];
    points: ProofPoint[];
}) {
    const isDark = tone === 'dark';

    return (
        <div
            className={`rounded-[34px] border px-6 py-6 shadow-[0_20px_60px_rgba(23,22,19,0.06)] md:px-8 md:py-8 ${
                isDark
                    ? 'border-[#2B2822] bg-[#171614] text-[#F5EFE3]'
                    : 'border-[#D8CCB5] bg-[#FBFAF7] text-[#171614]'
            }`}
        >
            <div className="space-y-6">
                {points.map((point, index) => (
                    <motion.div
                        key={point.label}
                        initial={{ opacity: 0, y: 12 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: index * 0.08 }}
                        whileHover={{ y: -2 }}
                        className={`rounded-[24px] border px-5 py-5 ${
                            isDark ? 'border-[#3A352D] bg-[#1D1B18]' : 'border-[#E3D7C3] bg-[#F8F4EC]'
                        }`}
                    >
                        <p
                            className={`text-[10px] font-bold uppercase tracking-[0.28em] ${
                                isDark ? 'text-[#D4A574]' : 'text-[#8F7D63]'
                            }`}
                        >
                            {point.label}
                        </p>
                        <p
                            className={`mt-4 text-[22px] leading-[1.18] tracking-tight md:text-[28px] ${
                                isDark ? 'text-[#F7F1E6]' : 'text-[#171614]'
                            }`}
                        >
                            {point.body}
                        </p>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}

function FunnelSectionView({ section, index }: { section: FunnelSection; index: number }) {
    return (
        <motion.section
            id={section.id}
            initial={{ opacity: 1, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.08 }}
            transition={{ duration: 0.6, delay: index * 0.03, ease: [0.22, 1, 0.36, 1] }}
            className={`border-b border-[#E3DACB] py-10 last:border-b-0 md:py-14 ${
                index % 2 === 0 ? 'bg-[#FBFBF6]' : 'bg-[#F8F3EA]'
            }`}
        >
            <div className="grid gap-10 lg:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)] lg:gap-14">
                <div className="space-y-5">
                    <div className="flex items-center gap-3">
                        <span className="rounded-full border border-[#D5C3A8] px-2 py-1 text-[9px] font-bold uppercase tracking-[0.16em] text-[#8E7450]">Step {index + 1}</span>
                        <span className="h-px w-10 bg-gradient-to-r from-[#C8B49A] to-transparent" />
                        <p className="text-[10px] font-bold uppercase tracking-[0.34em] text-[#C1A67B]">{section.label}</p>
                    </div>
                    <p className="max-w-3xl text-sm font-semibold uppercase tracking-[0.12em] text-[#7D6748]">
                        {STEP_PUNCH[section.id]}
                    </p>
                    <h2 className="max-w-4xl text-3xl font-semibold leading-[0.98] tracking-tight text-[#141414] md:text-4xl lg:text-5xl">
                        {section.title}
                    </h2>
                    <p className="max-w-3xl text-[16px] leading-[1.65] text-[#5F5B53] md:text-[17px]">{section.body}</p>
                    {index === 0 && (
                        <a
                            href="#vault"
                            className="inline-flex items-center text-[10px] font-bold uppercase tracking-[0.2em] text-[#7D6748] transition hover:text-[#1A1712]"
                        >
                            Continue to Vault Intelligence ↓
                        </a>
                    )}
                </div>

                <FunnelPanel tone={section.tone} points={section.points} />
            </div>
        </motion.section>
    );
}

export default function ProductProofSequence() {
    return (
        <div id="funnel" className="bg-[#FBFBF6]">
            <StatsBar />
            <LiveDeconstruction />
            <MiroFlowSection />

            <section className="px-6 py-12 md:py-16">
                <motion.div
                    initial={{ opacity: 1, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.06 }}
                    transition={{ duration: 0.5, ease: SECTION_EASE }}
                    className="mx-auto max-w-7xl"
                >
                    <div className="mb-7 md:mb-10">
                        <p className="text-[10px] font-bold uppercase tracking-[0.36em] text-[#C1A67B]">Inside the platform</p>
                        <h2 className="mt-4 max-w-5xl text-4xl font-semibold leading-[0.96] tracking-tight text-[#141414] md:text-5xl lg:text-6xl">
                            A strategic intelligence system. Not another swipe file.
                        </h2>

                    </div>

                    <div className="space-y-0">
                        {FUNNEL_SECTIONS.map((section, index) => (
                            <FunnelSectionView key={section.id} section={section} index={index} />
                        ))}
                    </div>
                </motion.div>
            </section>
        </div>
    );
}
