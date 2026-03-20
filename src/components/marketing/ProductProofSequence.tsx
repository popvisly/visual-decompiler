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

const PROOF_STRIP = [
    '5 intelligence surfaces per dossier',
    'Dossiers generated in under 60 seconds',
    'Vault-backed strategic recall',
    'Built for agency teams',
];

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

function ProofStrip() {
    return (
        <section className="border-y border-[#DED5C5] bg-[#F3ECE1]/70">
            <div className="mx-auto flex max-w-7xl flex-wrap items-center gap-x-6 gap-y-3 px-6 py-5 md:flex-nowrap">
                {PROOF_STRIP.map((item, index) => (
                    <div key={item} className="flex min-w-0 items-center gap-6">
                        <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#7B7266]">
                            {item}
                        </span>
                        {index < PROOF_STRIP.length - 1 && <span className="hidden h-4 w-px bg-[#D3C7B4] md:block" />}
                    </div>
                ))}
            </div>
        </section>
    );
}

function StatsBar() {
    return (
        <section className="border-b border-[#DED5C5] bg-[#FBFBF6]">
            <div className="mx-auto grid max-w-7xl border-x border-[#E5DCCD]/70 md:grid-cols-2 xl:grid-cols-4">
                {STATS.map((stat, index) => (
                    <div
                        key={stat.label}
                        className={`px-6 py-8 md:px-8 md:py-10 ${
                            index < STATS.length - 1 ? 'border-b border-[#E5DCCD]/70 xl:border-b-0 xl:border-r' : ''
                        } ${index === STATS.length - 1 ? '' : 'md:border-r-0'} ${
                            index < 2 ? 'md:border-r md:border-[#E5DCCD]/70 xl:border-r' : ''
                        }`}
                    >
                        <p className="text-[46px] font-semibold leading-none tracking-[-0.05em] text-[#141414] md:text-[56px]">
                            {stat.value}
                        </p>
                        <p className="mt-3 text-[10px] font-bold uppercase tracking-[0.22em] text-[#8A7B64]">
                            {stat.label}
                        </p>
                        <p className="mt-1 text-sm text-[#5F5B53]">
                            {stat.detail}
                        </p>
                    </div>
                ))}
            </div>
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
                    <div
                        key={point.label}
                        className={`rounded-[24px] border px-5 py-5 ${
                            isDark
                                ? 'border-[#3A352D] bg-[#1D1B18]'
                                : 'border-[#E3D7C3] bg-[#F8F4EC]'
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
                    </div>
                ))}
            </div>
        </div>
    );
}

function FunnelSectionView({ section }: { section: FunnelSection }) {
    return (
        <section
            id={section.id}
            className="border-b border-[#E3DACB] py-16 last:border-b-0 md:py-24"
        >
            <div className="grid gap-10 xl:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)] xl:gap-14">
                <div className="space-y-5">
                    <p className="text-[10px] font-bold uppercase tracking-[0.34em] text-[#C1A67B]">
                        {section.label}
                    </p>
                    <h2 className="max-w-4xl text-4xl font-semibold uppercase leading-[0.94] tracking-tight text-[#141414] md:text-6xl">
                        {section.title}
                    </h2>
                    <p className="max-w-3xl text-lg leading-relaxed text-[#5F5B53]">
                        {section.body}
                    </p>
                </div>

                <FunnelPanel tone={section.tone} points={section.points} />
            </div>
        </section>
    );
}

export default function ProductProofSequence() {
    return (
        <div id="funnel" className="bg-[#FBFBF6]">
            <ProofStrip />
            <StatsBar />

            <section className="px-6 py-16 md:py-24">
                <div className="mx-auto max-w-7xl space-y-0">
                    {FUNNEL_SECTIONS.map((section) => (
                        <FunnelSectionView key={section.id} section={section} />
                    ))}
                </div>
            </section>
        </div>
    );
}
