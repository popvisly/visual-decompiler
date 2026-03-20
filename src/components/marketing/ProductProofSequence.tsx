import Image from 'next/image';

const FUNNEL_SECTIONS = [
    {
        id: 'deconstruction',
        label: 'Single-Asset Deconstruction',
        title: 'Open the dossier.',
        accent: 'See the system.',
        body: 'Start with the actual dossier experience. The asset stays visible, the mechanic reads instantly, and the confidence, map logic, and strategic posture tell you why the ad is working before you ever get to export, clone, or market benchmarking.',
        railTitle: 'Dossier Surface',
        railSignals: ['Mechanic readout', 'Confidence', 'Psychology pressure'],
    },
    {
        id: 'vault',
        label: 'Intelligence Vault',
        title: 'Build a memory.',
        accent: 'Not a one-off report.',
        body: 'The vault is where the product stops being a clever demo and becomes strategic infrastructure. Searchable assets, deduplicated memory, tags, boards, and future benchmark depth all start here.',
        railTitle: 'Memory Layer',
        railSignals: ['Searchable assets', 'Deduplicated recall', 'Benchmark depth'],
    },
    {
        id: 'execution',
        label: 'Execution Outputs',
        title: 'Turn analysis',
        accent: 'into execution.',
        body: 'This is where the subscription becomes hard to walk away from. The platform does not stop at analysis. It opens clone routes, produces boardroom-ready dossier output, creates an embeddable intelligence panel, and gives strategy teams something they can actually ship.',
        railTitle: 'Action Layer',
        railSignals: ['Clone routes', 'Blueprint tests', 'Embeddable output'],
    },
    {
        id: 'intelligence',
        label: 'Mechanic Intelligence',
        title: 'See the market,',
        accent: 'not just the ad.',
        body: 'Cross-asset intelligence is where the premium layer becomes obvious. Market Pulse shows mechanic velocity, whitespace, audit trails, and comparative pressure across the vault. Differential Diagnostic shows lift, fatigue, and strategic delta between assets.',
        railTitle: 'Pressure Layer',
        railSignals: ['Velocity', 'Whitespace', 'Audit trails'],
    },
    {
        id: 'operating',
        label: 'Agency Operating Layer',
        title: 'Run it like',
        accent: 'an agency system.',
        body: 'Once the intelligence is working, the rest has to feel inevitable. Boards, embeds, white-labeled export, settings, and team seats are what turn forensic analysis into an operating system clients and strategists can actually live inside.',
        railTitle: 'Operating Layer',
        railSignals: ['Boards', 'White-label', 'Team seats'],
    },
];

function SectionRail() {
    return (
        <aside className="hidden lg:block">
            <div className="sticky top-28 pl-4">
                <div className="mb-8">
                    <p className="text-[10px] font-bold uppercase tracking-[0.36em] text-[#C1A67B]">Neural Continuation</p>
                    <p className="mt-4 max-w-[14rem] text-[15px] leading-7 text-[#6B655C]">
                        The homepage should feel like one continuous intelligence field, not a set of unrelated marketing blocks.
                    </p>
                </div>

                <div className="relative pl-10">
                    <div className="absolute left-[13px] top-1 bottom-1 w-px bg-gradient-to-b from-[#CBA66E]/80 via-[#CBA66E]/28 to-transparent" />

                    <div className="space-y-10">
                        {FUNNEL_SECTIONS.map((section, index) => (
                            <div key={section.id} className="relative">
                                <div className="absolute left-[-28px] top-1 h-[27px] w-[27px] rounded-full border border-[#CBA66E]/35 bg-[#FBF8F1] shadow-[0_0_0_8px_rgba(251,248,241,0.92)]">
                                    <div className="absolute inset-[7px] rounded-full bg-[#CBA66E]" />
                                </div>
                                <div className="absolute left-[-1px] top-[14px] h-px w-8 bg-[#CBA66E]/45" />

                                <p className="text-[10px] font-bold uppercase tracking-[0.34em] text-[#9E8A6D]">
                                    {String(index + 1).padStart(2, '0')} // {section.railTitle}
                                </p>
                                <p className="mt-2 text-[14px] font-semibold uppercase leading-5 tracking-[0.1em] text-[#1A1917]">
                                    {section.label}
                                </p>
                                <div className="mt-3 flex flex-wrap gap-2">
                                    {section.railSignals.map((signal) => (
                                        <span
                                            key={signal}
                                            className="rounded-full border border-[#D8C9AF] bg-white/75 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.24em] text-[#8A7B64]"
                                        >
                                            {signal}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </aside>
    );
}

function FunnelHeader({
    label,
    title,
    accent,
    body,
}: {
    label: string;
    title: string;
    accent: string;
    body: string;
}) {
    return (
        <div className="space-y-5">
            <p className="text-[10px] font-bold uppercase tracking-[0.34em] text-[#C1A67B]">{label}</p>
            <h2 className="max-w-4xl text-4xl font-semibold uppercase leading-[0.94] tracking-tight text-[#141414] md:text-6xl">
                {title}
                <br />
                <span className="text-[#C1A67B]">{accent}</span>
            </h2>
            <p className="max-w-4xl text-lg leading-relaxed text-[#5F5B53]">{body}</p>
        </div>
    );
}

function SingleAssetProof() {
    return (
        <div className="overflow-hidden rounded-[34px] border border-[#D8CCB5] bg-[#FBFAF7] shadow-[0_20px_60px_rgba(23,22,19,0.08)]">
            <div className="flex flex-wrap items-center gap-5 border-b border-[#141414]/10 px-6 py-5 text-[11px] font-bold uppercase tracking-[0.28em] text-[#8B8376]">
                <span className="text-[#9F7441]">Intelligence</span>
                <span>Signals</span>
                <span>Psychology</span>
                <span>Blueprint</span>
                <span>Market Pulse</span>
            </div>

            <div className="grid gap-0 xl:grid-cols-[0.43fr_0.57fr]">
                <div className="border-b border-[#141414]/8 p-6 xl:border-b-0 xl:border-r">
                    <div className="overflow-hidden rounded-[30px] border border-[#181716]/14 bg-[#F5EEE1]">
                        <div className="relative aspect-[0.74]">
                            <Image
                                src="/images/examples/Chanel_No5.webp"
                                alt="Chanel No5 fragrance ad"
                                fill
                                className="object-cover"
                                sizes="(min-width: 1280px) 28vw, (min-width: 768px) 44vw, 100vw"
                            />
                            <div
                                className="absolute inset-0 opacity-[0.14]"
                                style={{
                                    backgroundImage:
                                        'linear-gradient(rgba(212,165,116,0.85) 1px, transparent 1px), linear-gradient(90deg, rgba(212,165,116,0.85) 1px, transparent 1px)',
                                    backgroundSize: '76px 76px',
                                }}
                            />
                            <div className="absolute inset-5 border border-[#D4A574]/45" />
                        </div>
                    </div>

                    <div className="mt-5 flex items-end justify-between gap-4">
                        <div>
                            <p className="text-[44px] leading-none tracking-tight text-[#D39E5B] sm:text-[52px]">CHANEL</p>
                            <p className="mt-3 text-[12px] font-bold uppercase tracking-[0.28em] text-[#D39E5B]">Luxury Fragrance</p>
                        </div>
                        <p className="pb-1 text-[10px] font-bold uppercase tracking-[0.28em] text-[#B69B77]">ID: 1cb30400</p>
                    </div>
                </div>

                <div className="bg-[#171614] text-[#F5EFE3]">
                    <div className="grid gap-0 border-b border-white/8 sm:grid-cols-[1fr_190px]">
                        <div className="border-b border-white/8 px-6 py-6 sm:border-b-0 sm:border-r sm:px-8 sm:py-8">
                            <p className="text-[10px] font-bold uppercase tracking-[0.34em] text-[#D4A574]">Primary Mechanic</p>
                            <h3 className="mt-4 text-[32px] font-light uppercase leading-[1.02] tracking-[0.06em] text-[#F5EFE3] sm:text-[44px]">
                                Celebrity Aspirational Transfer
                            </h3>
                            <p className="mt-5 text-[18px] leading-8 text-[#E3DDD1]/84">
                                Desire and identity migrate from subject to product through proximity, chromatic unity, and monumentality.
                            </p>
                        </div>
                        <div className="px-6 py-6 sm:px-8 sm:py-8">
                            <p className="text-[10px] font-bold uppercase tracking-[0.34em] text-[#D4A574]">Confidence</p>
                            <p className="mt-3 text-[74px] font-light leading-none tracking-[-0.05em] text-[#F8F2E6]">99%</p>
                        </div>
                    </div>

                    <div className="grid gap-0 border-b border-white/8 lg:grid-cols-[0.42fr_0.58fr]">
                        <div className="border-b border-white/8 px-6 py-6 lg:border-b-0 lg:border-r lg:px-8">
                            <div className="flex items-center justify-between gap-4">
                                <div>
                                    <p className="text-[10px] font-bold uppercase tracking-[0.34em] text-[#D4A574]">Macro-Diagnostic Map</p>
                                    <p className="mt-3 max-w-[13rem] text-[18px] leading-8 text-[#E3DDD1]/82">
                                        Visualize optical trajectories and focal anchors with a live forensic overlay.
                                    </p>
                                </div>
                                <span className="rounded-full border border-[#D4A574]/35 bg-[#D4A574] px-4 py-2 text-[10px] font-bold uppercase tracking-[0.24em] text-[#171614]">
                                    Radiant Architecture
                                </span>
                            </div>

                            <div className="mt-6 rounded-[28px] border border-white/14 p-4">
                                <div className="grid grid-cols-[0.38fr_0.62fr] gap-3 rounded-[22px] border border-white/12 p-3">
                                    <div className="rounded-[20px] border border-white/16 p-4">
                                        <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-[#D4A574]">Focus Path</p>
                                        <div className="mt-8 space-y-4">
                                            <div className="h-3 w-16 rounded-full bg-[#D7A764]" />
                                            <div className="h-3 w-24 rounded-full bg-[#B98953]" />
                                            <div className="h-3 w-14 rounded-full bg-[#906B45]" />
                                        </div>
                                    </div>
                                    <div className="relative rounded-[20px] border border-white/16 bg-[linear-gradient(rgba(255,255,255,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.06)_1px,transparent_1px)] [background-size:34px_34px]">
                                        <div className="absolute left-[30%] top-[28%] h-[10px] w-[10px] rounded-full bg-[#F7E3C3]" />
                                        <div className="absolute left-[45%] top-[38%] h-[10px] w-[10px] rounded-full bg-[#E8B874]" />
                                        <div className="absolute left-[39%] top-[54%] h-[10px] w-[10px] rounded-full bg-[#FFF2DE]" />
                                        <div className="absolute left-[58%] top-[46%] h-[7px] w-[7px] rounded-full bg-[#D1CEC6]" />
                                        <div className="absolute left-[24%] top-[48%] h-[7px] w-[7px] rounded-full bg-[#B1ADA6]" />
                                        <div className="absolute left-[70%] top-[54%] h-[7px] w-[7px] rounded-full bg-[#B1ADA6]" />
                                        <div className="absolute left-[40%] top-[42%] h-[62px] w-[62px] rounded-full border border-white/70" />
                                        <div className="absolute left-[35%] top-[39%] h-[1px] w-[17%] origin-left rotate-[31deg] bg-[#E8C184]/85" />
                                        <div className="absolute left-[28%] top-[49%] h-[1px] w-[16%] origin-left rotate-[19deg] bg-[#E8C184]/75" />
                                        <div className="absolute left-[45%] top-[43%] h-[1px] w-[18%] origin-left rotate-[18deg] bg-[#E8C184]/75" />
                                        <div className="absolute bottom-5 right-5 text-[10px] font-bold uppercase tracking-[0.22em] text-[#8B8376]">
                                            Map Live
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="grid gap-0 sm:grid-cols-2">
                            <div className="border-b border-white/8 px-6 py-6 sm:border-b-0 sm:border-r sm:px-8">
                                <p className="text-[10px] font-bold uppercase tracking-[0.34em] text-[#D4A574]">Strategic Posture</p>
                                <p className="mt-4 text-[19px] leading-8 text-[#F6F1E8]">
                                    Icon maintenance. The brand is not challenging the category; it is asserting the permanence of an already-won cultural throne.
                                </p>
                            </div>
                            <div className="px-6 py-6 sm:px-8">
                                <p className="text-[10px] font-bold uppercase tracking-[0.34em] text-[#D4A574]">Evidence Anchors</p>
                                <p className="mt-4 text-[24px] font-semibold uppercase leading-[1.02] tracking-tight text-[#F7F1E6]">
                                    Bottle Scale, Red Boucle, Intimate Gaze
                                </p>
                                <p className="mt-4 text-[17px] leading-8 text-[#E3DDD1]/84">
                                    The product is elevated to icon status while the subject remains its aspirational delivery system.
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="grid gap-0 sm:grid-cols-[1.1fr_0.9fr]">
                        <div className="border-b border-white/8 px-6 py-6 sm:border-b-0 sm:border-r sm:px-8">
                            <p className="text-[10px] font-bold uppercase tracking-[0.34em] text-[#D4A574]">Trigger Distribution Map</p>
                            <div className="mt-5 flex items-center justify-center rounded-[28px] border border-white/12 bg-[linear-gradient(rgba(255,255,255,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.06)_1px,transparent_1px)] [background-size:48px_48px] px-5 py-8">
                                <svg className="h-[200px] w-full max-w-[260px]" viewBox="0 0 260 200" role="img" aria-label="Trigger distribution radar">
                                    <g opacity="0.16" stroke="#C6A36C" strokeWidth="1">
                                        <circle cx="130" cy="94" r="58" fill="none" />
                                        <circle cx="130" cy="94" r="38" fill="none" />
                                        <circle cx="130" cy="94" r="18" fill="none" />
                                        <line x1="130" y1="36" x2="130" y2="152" />
                                        <line x1="74" y1="68" x2="186" y2="120" />
                                        <line x1="74" y1="120" x2="186" y2="68" />
                                    </g>
                                    <polygon points="130,48 173,74 162,124 108,118 92,84" fill="rgba(225,177,113,0.22)" stroke="#E1B171" strokeWidth="2" />
                                    <g fill="#F5EFE4">
                                        <circle cx="130" cy="48" r="4" />
                                        <circle cx="173" cy="74" r="4" />
                                        <circle cx="162" cy="124" r="4" />
                                        <circle cx="108" cy="118" r="4" />
                                        <circle cx="92" cy="84" r="4" />
                                    </g>
                                    <g fill="#C6A36C" fontSize="10" fontWeight="700" letterSpacing="0.28em">
                                        <text x="112" y="16">STATUS</text>
                                        <text x="6" y="86">SOCIAL</text>
                                        <text x="8" y="100">PROOF</text>
                                        <text x="192" y="86">UTILITY</text>
                                        <text x="34" y="156">AUTHORITY</text>
                                        <text x="188" y="156">SCARCITY</text>
                                    </g>
                                </svg>
                            </div>
                            <p className="mt-4 text-[17px] leading-8 text-[#E3DDD1]/78">
                                This distribution quantifies the creative&apos;s psychological surface area, identifying which aspiration levers are being engaged to command consumer compliance.
                            </p>
                        </div>

                        <div className="grid gap-0 sm:grid-rows-2">
                            <div className="border-b border-white/8 px-6 py-6 sm:px-8">
                                <p className="text-[10px] font-bold uppercase tracking-[0.34em] text-[#D4A574]">Persuasion Density</p>
                                <p className="mt-4 text-[66px] font-light leading-none tracking-[-0.04em] text-[#D9A865]">91%</p>
                                <p className="mt-3 text-[17px] leading-8 text-[#E3DDD1]/84">
                                    The creative compresses brand signal into a high-memory, low-friction luxury code.
                                </p>
                            </div>
                            <div className="px-6 py-6 sm:px-8">
                                <p className="text-[10px] font-bold uppercase tracking-[0.34em] text-[#D4A574]">Cognitive Friction</p>
                                <p className="mt-4 text-[66px] font-light leading-none tracking-[-0.04em] text-[#D9A865]">8%</p>
                                <p className="mt-3 text-[17px] leading-8 text-[#E3DDD1]/84">
                                    Low resistance indicates frictionless adoption once desire and authority are fused.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

function VaultProof() {
    return (
        <div className="overflow-hidden rounded-[34px] border border-[#D8CCB5] bg-[#FBFAF7] shadow-[0_18px_60px_rgba(23,22,19,0.06)]">
            <div className="grid gap-0 xl:grid-cols-[0.38fr_0.62fr]">
                <div className="border-b border-[#141414]/8 px-6 py-7 xl:border-b-0 xl:border-r xl:px-8">
                    <p className="text-[10px] font-bold uppercase tracking-[0.34em] text-[#C1A67B]">Searchable Memory Layer</p>
                    <h3 className="mt-4 max-w-[18rem] text-[34px] font-semibold uppercase leading-[1.02] tracking-tight text-[#161514]">
                        Every finished dossier becomes recallable infrastructure
                    </h3>
                    <p className="mt-5 text-[18px] leading-8 text-[#5E5A52]">
                        The vault is not where analysis goes to rest. It is where signals accumulate, recall sharpens, and future comparisons become more valuable than the first extraction.
                    </p>
                </div>

                <div className="px-6 py-7 xl:px-8">
                    <div className="rounded-[28px] border border-[#D7C8B1] bg-[#F8F2E8] p-5">
                        <div className="rounded-full border border-[#D7C8B1] bg-white/75 px-5 py-4 text-[12px] font-bold uppercase tracking-[0.26em] text-[#7A6F61]">
                            Search by brand, sector, mechanic, or tag
                        </div>
                        <div className="mt-4 flex flex-wrap gap-3">
                            {['All sectors', 'All mechanics', 'Newest'].map((chip) => (
                                <span
                                    key={chip}
                                    className="rounded-full border border-[#D7C8B1] bg-white/75 px-5 py-3 text-[11px] font-bold uppercase tracking-[0.24em] text-[#7A6F61]"
                                >
                                    {chip}
                                </span>
                            ))}
                        </div>
                    </div>

                    <div className="mt-5 space-y-4">
                        <div className="rounded-[28px] border border-[#171614] bg-[#171614] px-4 py-4 text-[#F5EFE3]">
                            <div className="grid gap-4 sm:grid-cols-[84px_1fr_auto] sm:items-center">
                                <div className="relative h-[84px] overflow-hidden rounded-[20px] border border-white/10">
                                    <Image src="/images/examples/Chanel_No5.webp" alt="Chanel dossier" fill className="object-cover" sizes="84px" />
                                </div>
                                <div>
                                    <div className="flex flex-wrap items-center gap-3">
                                        <p className="text-[28px] leading-none tracking-tight">CHANEL</p>
                                        <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-[#D4A574]">Luxury Fragrance</p>
                                    </div>
                                    <p className="mt-3 text-[18px] leading-8 text-[#F0E8D8]">Celebrity Aspirational Transfer</p>
                                </div>
                                <div className="flex flex-wrap gap-2">
                                    {['House Codes', 'Monumentality', 'Desire Transfer'].map((signal) => (
                                        <span key={signal} className="rounded-full border border-white/55 px-4 py-2 text-[10px] font-bold uppercase tracking-[0.22em] text-[#F4EEE4]">
                                            {signal}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className="rounded-[28px] border border-[#171614] bg-[#171614] px-4 py-4 text-[#F5EFE3]">
                            <div className="grid gap-4 sm:grid-cols-[84px_1fr_auto] sm:items-center">
                                <div className="relative h-[84px] overflow-hidden rounded-[20px] border border-white/10">
                                    <Image src="/images/examples/ACNE.png" alt="Acne Studios dossier" fill className="object-cover" sizes="84px" />
                                </div>
                                <div>
                                    <div className="flex flex-wrap items-center gap-3">
                                        <p className="text-[28px] leading-none tracking-tight">ACNE STUDIOS</p>
                                        <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-[#D4A574]">Luxury Fashion / Premium Accessories</p>
                                    </div>
                                    <p className="mt-3 text-[18px] leading-8 text-[#F0E8D8]">Ironic Juxtaposition + Heritage Weaponization</p>
                                </div>
                                <div className="flex flex-wrap gap-2">
                                    {['Culture Signal', 'Status Absurdity', 'Craft Authority'].map((signal) => (
                                        <span key={signal} className="rounded-full border border-white/55 px-4 py-2 text-[10px] font-bold uppercase tracking-[0.22em] text-[#F4EEE4]">
                                            {signal}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="mt-5 grid gap-4 md:grid-cols-3">
                        {[
                            'Search by brand, sector, mechanic, or tag',
                            'Deduplicate exact assets before you burn credits',
                            'Recall previous dossiers when the next pitch arrives',
                        ].map((line) => (
                            <div key={line} className="rounded-[22px] border border-[#D7C8B1] bg-white/72 px-5 py-4">
                                <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#C1A67B]">Why it matters</p>
                                <p className="mt-3 text-[17px] leading-8 text-[#5F5B53]">{line}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

function ExecutionProof() {
    return (
        <div className="overflow-hidden rounded-[34px] border border-[#D8CCB5] bg-[#171614] text-[#F7F1E6] shadow-[0_22px_60px_rgba(23,22,19,0.12)]">
            <div className="border-b border-white/8 px-6 py-5">
                <div className="flex flex-wrap gap-3">
                    {['Open Clone Engine', 'Copy Embed Widget', 'Export Dossier (Print/PDF)', 'Add to Board'].map((action, index) => (
                        <span
                            key={action}
                            className={`rounded-full px-5 py-3 text-[11px] font-bold uppercase tracking-[0.24em] ${index === 0 ? 'bg-[#D4A574] text-[#171614]' : 'border border-white/12 bg-[#242321] text-[#F5EFE3]'}`}
                        >
                            {action}
                        </span>
                    ))}
                </div>
            </div>

            <div className="grid gap-0 xl:grid-cols-[0.46fr_0.54fr]">
                <div className="border-b border-white/8 px-6 py-7 xl:border-b-0 xl:border-r xl:px-8">
                    <p className="text-[10px] font-bold uppercase tracking-[0.34em] text-[#D4A574]">Production Blueprint</p>
                    <h3 className="mt-4 text-[34px] font-semibold uppercase leading-[1.02] tracking-tight text-[#F6F1E8]">
                        Iteration & Test Plan
                    </h3>
                    <div className="mt-6 space-y-4">
                        {[
                            {
                                label: 'Visual test',
                                title: 'Reduce bottle to conventional scale',
                                copy: 'Measures whether monumentality is the primary persuasion lever or whether celebrity proximity can carry the load alone.',
                            },
                            {
                                label: 'Chromatic test',
                                title: 'Replace scarlet boucle with Chanel black',
                                copy: 'Tests whether desire is being carried by warmth and chromatic echo or by house-code authority in isolation.',
                            },
                            {
                                label: 'Hook test',
                                title: 'Shift the gaze into direct eye contact',
                                copy: 'Measures whether confrontational address strengthens click-through or collapses aspirational asymmetry.',
                            },
                        ].map((item) => (
                            <div key={item.title} className="rounded-[24px] border border-white/12 bg-[#1F1E1B] px-5 py-4">
                                <p className="text-[10px] font-bold uppercase tracking-[0.32em] text-[#D4A574]">{item.label}</p>
                                <p className="mt-3 text-[20px] leading-8 text-[#F7F1E6]">{item.title}</p>
                                <p className="mt-3 text-[16px] leading-7 text-[#DDD6CB]/82">{item.copy}</p>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="px-6 py-7 xl:px-8">
                    <p className="text-[10px] font-bold uppercase tracking-[0.34em] text-[#D4A574]">Clone Engine</p>
                    <h3 className="mt-4 text-[34px] font-semibold uppercase leading-[1.02] tracking-tight text-[#F6F1E8]">
                        Fresh campaign routes from one persuasion mechanic
                    </h3>
                    <div className="mt-6 space-y-4">
                        {[
                            {
                                tag: 'Restraint',
                                title: "The Cellar Master's Secret",
                                copy: 'A private-allocation burgundy brand launched through aged authority and inherited mystique instead of overt luxury signaling.',
                            },
                            {
                                tag: 'Reversal',
                                title: 'The Weight of the Blade',
                                copy: 'A heritage culinary object becomes the new icon by transferring decades of mastery into one monumental product gesture.',
                            },
                        ].map((item) => (
                            <div key={item.title} className="rounded-[26px] border border-white/16 px-5 py-5">
                                <div className="flex items-start justify-between gap-4">
                                    <p className="max-w-[18rem] text-[30px] font-semibold uppercase leading-[0.96] tracking-tight text-[#F6F1E8]">{item.title}</p>
                                    <span className="rounded-full border border-[#D4A574]/35 px-4 py-2 text-[10px] font-bold uppercase tracking-[0.22em] text-[#D4A574]">
                                        {item.tag}
                                    </span>
                                </div>
                                <p className="mt-4 text-[17px] leading-8 text-[#DDD6CB]/82">{item.copy}</p>
                            </div>
                        ))}
                    </div>

                    <div className="mt-5 rounded-[26px] border border-white/10 bg-[#F8F2E8] px-5 py-5 text-[#171614]">
                        <div className="flex items-start justify-between gap-4">
                            <div>
                                <p className="text-[10px] font-bold uppercase tracking-[0.32em] text-[#C1A67B]">Embed Widget</p>
                                <p className="mt-3 text-[17px] leading-8 text-[#5B584F]">
                                    Paste this iFrame into a client portal, strategy deck, Notion page, or internal dashboard to display a self-contained forensic intelligence panel.
                                </p>
                            </div>
                            <span className="rounded-full border border-[#D8CCB5] px-4 py-2 text-[10px] font-bold uppercase tracking-[0.22em] text-[#8A7B64]">
                                Copy ready
                            </span>
                        </div>
                        <div className="mt-4 overflow-x-auto rounded-[18px] border border-[#D8CCB5] bg-white/80 px-4 py-3 font-mono text-[12px] text-[#5F5B53]">
                            &lt;iframe src=&quot;visualdecompiler.com/embed/1cb30400-1ba3-4dda-8fe2-7650674aeb4a&quot; width=&quot;100%&quot; height=&quot;600px&quot; /&gt;
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

function IntelligenceProof() {
    return (
        <div className="overflow-hidden rounded-[34px] border border-[#D8CCB5] bg-[#FBFAF7] shadow-[0_20px_60px_rgba(23,22,19,0.08)]">
            <div className="grid gap-0 xl:grid-cols-[0.42fr_0.58fr]">
                <div className="border-b border-[#141414]/8 px-6 py-7 xl:border-b-0 xl:border-r xl:px-8">
                    <p className="text-[10px] font-bold uppercase tracking-[0.34em] text-[#C1A67B]">Market Pulse</p>
                    <h3 className="mt-4 text-[34px] font-semibold uppercase leading-[1.02] tracking-tight text-[#141414]">
                        Cross-asset signal mapping
                    </h3>
                    <p className="mt-5 text-[18px] leading-8 text-[#5F5B53]">
                        Once assets are in the vault, the platform stops being a report generator and becomes an intelligence layer. It shows mechanic velocity, trigger pressure, whitespace, and the source assets creating each signal.
                    </p>
                </div>

                <div className="px-6 py-7 xl:px-8">
                    <div className="rounded-[30px] border border-[#D7C8B1] bg-white/80 p-5">
                        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#141414]/10 pb-4">
                            <p className="text-[10px] font-bold uppercase tracking-[0.34em] text-[#C1A67B]">Market Pulse</p>
                            <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-[#8A7B64]">30D / 60D / 90D windows</p>
                        </div>
                        <div className="mt-5 grid gap-4 md:grid-cols-3">
                            {[
                                {
                                    label: 'Mechanic velocity',
                                    title: 'Celebrity Aspiration Transfer',
                                    sub: '28% share',
                                    copy: 'Still dominant, but beginning to flatten as adjacent luxury fragrance brands oversaturate the same desire relay.',
                                },
                                {
                                    label: 'Whitespace',
                                    title: 'Status through ritual precision',
                                    sub: 'Open',
                                    copy: 'There is room for brands to shift from overt aspiration into ceremonial authority without losing premium heat.',
                                },
                                {
                                    label: 'Audit trail',
                                    title: 'Source assets surfaced',
                                    sub: '12 dossiers',
                                    copy: 'Every market claim can now be traced back to the assets creating the pressure pattern, not just an abstract score.',
                                },
                            ].map((card) => (
                                <div key={card.title} className="rounded-[24px] border border-[#D7C8B1] bg-[#F8F2E8] px-5 py-5">
                                    <p className="text-[10px] font-bold uppercase tracking-[0.32em] text-[#C1A67B]">{card.label}</p>
                                    <p className="mt-4 text-[26px] font-semibold leading-[1.02] tracking-tight text-[#161514]">{card.title}</p>
                                    <p className="mt-3 text-[11px] font-bold uppercase tracking-[0.26em] text-[#B07841]">{card.sub}</p>
                                    <p className="mt-4 text-[16px] leading-7 text-[#5F5B53]">{card.copy}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="mt-5 grid gap-4 lg:grid-cols-[0.55fr_0.45fr]">
                        <div className="rounded-[30px] border border-[#D7C8B1] bg-[#171614] px-6 py-6 text-[#F5EFE3]">
                            <p className="text-[10px] font-bold uppercase tracking-[0.34em] text-[#D4A574]">Differential Diagnostic</p>
                            <p className="mt-4 text-[30px] font-semibold uppercase leading-[1.02] tracking-tight text-[#F6F1E8]">
                                Strategic delta between assets
                            </p>
                            <div className="mt-5 grid grid-cols-2 gap-4">
                                <div className="overflow-hidden rounded-[24px] border border-white/10">
                                    <div className="relative aspect-[0.95]">
                                        <Image src="/images/examples/Chanel_No5.webp" alt="Chanel control asset" fill className="object-cover opacity-85" sizes="(min-width: 1024px) 18vw, 50vw" />
                                    </div>
                                </div>
                                <div className="overflow-hidden rounded-[24px] border border-white/10">
                                    <div className="relative aspect-[0.95]">
                                        <Image src="/images/examples/dior.png" alt="Dior comparison asset" fill className="object-cover opacity-65 grayscale" sizes="(min-width: 1024px) 18vw, 50vw" />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="rounded-[30px] border border-[#D7C8B1] bg-[#F8F2E8] px-6 py-6">
                            <p className="text-[10px] font-bold uppercase tracking-[0.34em] text-[#C1A67B]">What it shows</p>
                            <ul className="mt-5 space-y-4 text-[17px] leading-8 text-[#5F5B53]">
                                <li>Lift between control and proposed asset</li>
                                <li>Fatigue risk before a pattern flattens</li>
                                <li>Where one brand holds strategic pressure the other does not</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

function OperatingProof() {
    return (
        <div className="overflow-hidden rounded-[34px] border border-[#D8CCB5] bg-[#FBFAF7] shadow-[0_20px_60px_rgba(23,22,19,0.06)]">
            <div className="grid gap-0 xl:grid-cols-[0.42fr_0.58fr]">
                <div className="border-b border-[#141414]/8 px-6 py-7 xl:border-b-0 xl:border-r xl:px-8">
                    <p className="text-[10px] font-bold uppercase tracking-[0.34em] text-[#C1A67B]">Agency Operating Layer</p>
                    <h3 className="mt-4 text-[34px] font-semibold uppercase leading-[1.02] tracking-tight text-[#141414]">
                        Boards, embeds, export, settings, and team seats
                    </h3>
                    <p className="mt-5 text-[18px] leading-8 text-[#5F5B53]">
                        Once the intelligence is working, the rest has to feel inevitable. This is where the product stops being an insight engine and starts behaving like agency infrastructure.
                    </p>
                </div>

                <div className="px-6 py-7 xl:px-8">
                    <div className="rounded-[30px] border border-[#D7C8B1] bg-[#171614] px-6 py-6 text-[#F5EFE3]">
                        <div className="flex flex-wrap gap-3">
                            {['Sovereign Boards', 'Embed Widget', 'Export Dossier', 'Agency Settings', 'Team & Seats'].map((item, index) => (
                                <span
                                    key={item}
                                    className={`rounded-full px-4 py-2 text-[10px] font-bold uppercase tracking-[0.24em] ${index === 0 ? 'bg-[#D4A574] text-[#171614]' : 'border border-white/12 bg-[#242321] text-[#F5EFE3]'}`}
                                >
                                    {item}
                                </span>
                            ))}
                        </div>

                        <div className="mt-6 grid gap-5 md:grid-cols-3">
                            {[
                                {
                                    label: 'Boards',
                                    title: 'Shared strategic workspaces',
                                    copy: 'Turn isolated findings into live thinking environments the team can actually organize and present from.',
                                },
                                {
                                    label: 'White-label',
                                    title: 'Client-ready output',
                                    copy: 'Export a boardroom artifact that feels native to the agency, not borrowed from a software tool.',
                                },
                                {
                                    label: 'Team seats',
                                    title: 'Operate together',
                                    copy: 'Seats, invites, permissions, and repeatable systems make the platform viable beyond a single strategist.',
                                },
                            ].map((item) => (
                                <div key={item.label} className="rounded-[24px] border border-white/12 px-5 py-5">
                                    <p className="text-[10px] font-bold uppercase tracking-[0.32em] text-[#D4A574]">{item.label}</p>
                                    <p className="mt-4 text-[25px] font-semibold leading-[1.04] tracking-tight text-[#F6F1E8]">{item.title}</p>
                                    <p className="mt-4 text-[16px] leading-7 text-[#DDD6CB]/82">{item.copy}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

function SectionProof({ id }: { id: string }) {
    switch (id) {
        case 'deconstruction':
            return <SingleAssetProof />;
        case 'vault':
            return <VaultProof />;
        case 'execution':
            return <ExecutionProof />;
        case 'intelligence':
            return <IntelligenceProof />;
        case 'operating':
            return <OperatingProof />;
        default:
            return null;
    }
}

export default function ProductProofSequence() {
    return (
        <section className="border-y border-[#141414]/6 bg-[#F7F2E8]">
            <div className="mx-auto max-w-[1480px] px-6 py-20 md:py-28">
                <div className="grid gap-10 lg:grid-cols-[280px_minmax(0,1fr)] lg:gap-14">
                    <SectionRail />

                    <div className="space-y-20 md:space-y-24">
                        {FUNNEL_SECTIONS.map((section) => (
                            <section key={section.id} className="relative border-b border-[#141414]/8 pb-16 last:border-b-0 last:pb-0">
                                <div className="hidden lg:block absolute -left-[92px] top-[56px] h-px w-[76px] bg-[#D8CCB5]" />

                                <div className="space-y-8">
                                    <FunnelHeader
                                        label={section.label}
                                        title={section.title}
                                        accent={section.accent}
                                        body={section.body}
                                    />

                                    <SectionProof id={section.id} />
                                </div>
                            </section>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
