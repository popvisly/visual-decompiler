type ProofRow = {
    label: string;
    value: string;
    detail: string;
};

type FunnelSection = {
    id: string;
    label: string;
    title: string;
    accent: string;
    body: string;
    panelLabel: string;
    tone: 'light' | 'dark';
    rows: ProofRow[];
};

const PROOF_STRIP = [
    'Observer tier includes 5 free analyses',
    '5 intelligence surfaces per dossier',
    'Vault-backed recall',
    'White-label dossier export',
    'Built for agency teams',
];

const FUNNEL_SECTIONS: FunnelSection[] = [
    {
        id: 'deconstruction',
        label: 'Single-Asset Deconstruction',
        title: 'Open the dossier.',
        accent: 'See the system.',
        body: 'Start with the actual dossier experience. The asset stays visible, the mechanic reads instantly, and the confidence, map logic, and strategic posture tell you why the ad is working before you ever get to export, clone, or market benchmarking.',
        panelLabel: 'Live dossier surface',
        tone: 'dark',
        rows: [
            {
                label: 'Primary Mechanic',
                value: 'Celebrity Aspirational Transfer',
                detail: 'Read the dominant persuasion system before you ever export, clone, or benchmark the asset.',
            },
            {
                label: 'Confidence',
                value: '99% signal certainty',
                detail: 'The winning logic is scored, not implied, so the readout feels defensible in a room.',
            },
            {
                label: 'Psychology',
                value: 'Trigger distribution, density, and friction',
                detail: 'Surface the pressure pattern under the creative instead of relying on taste-based interpretation.',
            },
        ],
    },
    {
        id: 'vault',
        label: 'Intelligence Vault',
        title: 'Build a memory.',
        accent: 'Not a one-off report.',
        body: 'The vault is where the product stops being a clever demo and becomes strategic infrastructure. Searchable assets, deduplicated memory, tags, boards, and future benchmark depth all start here.',
        panelLabel: 'Indexed memory layer',
        tone: 'light',
        rows: [
            {
                label: 'Search',
                value: 'Brand, sector, mechanic, or tag',
                detail: 'Every finished dossier stays searchable instead of disappearing into screenshots and folders.',
            },
            {
                label: 'Deduplication',
                value: 'Exact assets are remembered before you burn credits twice',
                detail: 'The system protects agency memory instead of asking the team to remember what was already analysed.',
            },
            {
                label: 'Benchmark Depth',
                value: 'Future comparisons get sharper over time',
                detail: 'Each extraction compounds the strategic value of the vault instead of resetting back to zero.',
            },
        ],
    },
    {
        id: 'execution',
        label: 'Execution Outputs',
        title: 'Turn analysis',
        accent: 'into execution.',
        body: 'This is where the subscription becomes hard to walk away from. The platform does not stop at analysis. It opens clone routes, produces boardroom-ready dossier output, creates an embeddable intelligence panel, and gives strategy teams something they can actually ship.',
        panelLabel: 'Execution surfaces',
        tone: 'dark',
        rows: [
            {
                label: 'Clone Engine',
                value: 'Fresh campaign routes from one winning mechanic',
                detail: 'Open new deployable directions without losing the persuasion architecture that made the reference work.',
            },
            {
                label: 'Dossier Export',
                value: 'White-label strategic output ready for boardrooms',
                detail: 'Turn the intelligence into something an agency can present, circulate, and defend immediately.',
            },
            {
                label: 'Embed Widget',
                value: 'Drop live intelligence into decks, Notion, or client portals',
                detail: 'Move the system into the workflow instead of forcing strategy teams to rebuild it by hand.',
            },
        ],
    },
    {
        id: 'intelligence',
        label: 'Mechanic Intelligence',
        title: 'See the market,',
        accent: 'not just the ad.',
        body: 'Cross-asset intelligence is where the premium layer becomes obvious. Market Pulse shows mechanic velocity, whitespace, audit trails, and comparative pressure across the vault. Differential Diagnostic shows lift, fatigue, and strategic delta between assets.',
        panelLabel: 'Cross-asset intelligence',
        tone: 'light',
        rows: [
            {
                label: 'Market Pulse',
                value: 'Velocity, whitespace, and audit trails across the vault',
                detail: 'See which mechanics are still dominant, which are flattening, and where the opportunity is opening up.',
            },
            {
                label: 'Differential Diagnostic',
                value: 'Lift, fatigue, and strategic delta between assets',
                detail: 'Compare two dossiers directly when the real decision is relative strength, not isolated opinion.',
            },
            {
                label: 'Premium Layer',
                value: 'The platform stops being a report and becomes intelligence',
                detail: 'This is where the product becomes hard to copy, because it starts surfacing market structure rather than single-ad commentary.',
            },
        ],
    },
    {
        id: 'operating',
        label: 'Agency Operating Layer',
        title: 'Run it like',
        accent: 'an agency system.',
        body: 'Once the intelligence is working, the rest has to feel inevitable. Boards, embeds, white-labeled export, settings, and team seats are what turn forensic analysis into an operating system clients and strategists can actually live inside.',
        panelLabel: 'Agency operating layer',
        tone: 'light',
        rows: [
            {
                label: 'Boards',
                value: 'Shared strategic workspaces, not floating references',
                detail: 'Turn promising findings into durable boards that can be reused across pitches, categories, and internal planning.',
            },
            {
                label: 'Agency Settings',
                value: 'White-label identity, export controls, and dossier standards',
                detail: 'Make the system feel native to the agency rather than borrowed from a generic SaaS product.',
            },
            {
                label: 'Team & Seats',
                value: 'Analysts, strategists, and founders inside one operating layer',
                detail: 'The value increases when the whole team can work in the same intelligence system instead of passing PDFs around.',
            },
        ],
    },
];

function ProofStrip() {
    return (
        <section className="border-y border-[#DED5C5] bg-[#F3ECE1]/70">
            <div className="mx-auto flex max-w-7xl flex-wrap items-center gap-x-6 gap-y-3 px-6 py-5">
                {PROOF_STRIP.map((item, index) => (
                    <div key={item} className="flex min-w-0 items-center gap-6">
                        <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#7B7266]">
                            {item}
                        </span>
                        {index < PROOF_STRIP.length - 1 && <span className="hidden h-4 w-px bg-[#D3C7B4] lg:block" />}
                    </div>
                ))}
            </div>
        </section>
    );
}

function FunnelPanel({
    tone,
    panelLabel,
    rows,
}: {
    tone: FunnelSection['tone'];
    panelLabel: string;
    rows: ProofRow[];
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
            <p
                className={`text-[10px] font-bold uppercase tracking-[0.34em] ${
                    isDark ? 'text-[#D4A574]' : 'text-[#C1A67B]'
                }`}
            >
                {panelLabel}
            </p>

            <div className="mt-6 divide-y divide-[#D9D0C2]/12">
                {rows.map((row, index) => (
                    <div
                        key={row.label}
                        className={`grid gap-3 py-5 ${
                            index === 0 ? 'pt-0' : ''
                        } md:grid-cols-[170px_minmax(0,1fr)]`}
                    >
                        <p
                            className={`text-[10px] font-bold uppercase tracking-[0.28em] ${
                                isDark ? 'text-[#D4A574]' : 'text-[#8F7D63]'
                            }`}
                        >
                            {row.label}
                        </p>
                        <div>
                            <p
                                className={`text-[24px] leading-[1.08] tracking-tight md:text-[30px] ${
                                    isDark ? 'text-[#F7F1E6]' : 'text-[#171614]'
                                }`}
                            >
                                {row.value}
                            </p>
                            <p
                                className={`mt-3 text-[16px] leading-8 ${
                                    isDark ? 'text-[#E3DDD1]/82' : 'text-[#615C54]'
                                }`}
                            >
                                {row.detail}
                            </p>
                        </div>
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
                        <br />
                        <span className="text-[#C1A67B]">{section.accent}</span>
                    </h2>
                    <p className="max-w-3xl text-lg leading-relaxed text-[#5F5B53]">
                        {section.body}
                    </p>
                </div>

                <FunnelPanel tone={section.tone} panelLabel={section.panelLabel} rows={section.rows} />
            </div>
        </section>
    );
}

export default function ProductProofSequence() {
    return (
        <div id="funnel" className="bg-[#FBFBF6]">
            <ProofStrip />

            <section className="px-6 py-16 md:py-24">
                <div className="mx-auto max-w-7xl">
                    <div className="mb-12 md:mb-16">
                        <p className="text-[10px] font-bold uppercase tracking-[0.36em] text-[#C1A67B]">
                            Inside the platform
                        </p>
                        <h2 className="mt-5 max-w-5xl text-4xl font-semibold uppercase leading-[0.94] tracking-tight text-[#141414] md:text-6xl">
                            A premium intelligence system.
                            <br />
                            <span className="text-[#C1A67B]">Not another swipe file.</span>
                        </h2>
                        <p className="mt-6 max-w-4xl text-lg leading-relaxed text-[#5F5B53]">
                            Visual Decompiler starts with one ad, then opens into vault memory, execution outputs, market intelligence, and an agency operating layer. The sections below show the real surfaces teams subscribe for when the work needs to become durable.
                        </p>
                    </div>

                    <div className="space-y-0">
                        {FUNNEL_SECTIONS.map((section) => (
                            <FunnelSectionView key={section.id} section={section} />
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}
