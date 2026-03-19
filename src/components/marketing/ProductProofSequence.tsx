import Image from 'next/image';

const PLATFORM_LABELS = [
    'Analyse Ad Asset',
    'Intelligence Vault',
    'Intelligence Pulse',
    'Mechanic Intelligence',
    'Sovereign Boards',
    'Agency Settings',
    'Team & Seats',
    'Clone Engine',
    'Blueprint',
    'Market Pulse',
    'Embed Widget',
    'Macro-Diagnostic Map',
];

const vaultAssets = [
    {
        title: 'CHANEL',
        sector: 'Luxury Fragrance',
        mechanic: 'Celebrity Aspiration Transfer',
        image: '/images/examples/perfume_ad_no_logo.jpg',
    },
    {
        title: 'ACNE STUDIOS',
        sector: 'Luxury Fashion / Premium Accessories',
        mechanic: 'Ironic Juxtaposition + Heritage Weaponization',
        image: '/images/examples/ad_prompted.png',
    },
    {
        title: 'VERSACE',
        sector: 'Luxury Fragrance',
        mechanic: 'Transcendental Status Signaling',
        image: '/images/examples/valentino-voce-viva.png',
    },
    {
        title: 'CALVIN KLEIN',
        sector: 'Prestige Fragrance',
        mechanic: 'Aspirational Intimacy as Status Currency',
        image: '/images/examples/perfume.jpg',
    },
];

const psychologyWidgets = [
    {
        label: 'Persuasion Density',
        value: '91%',
        note: 'The creative compresses brand signal into a high-memory, low-friction luxury code.',
    },
    {
        label: 'Cognitive Friction',
        value: '8%',
        note: 'Low resistance indicates frictionless adoption once desire and authority are fused.',
    },
];

const blueprintCells = [
    {
        label: 'Visual Test',
        title: 'Reduce bottle to conventional scale',
        note: 'Measures whether monumentality is the primary persuasion lever or whether celebrity proximity can carry the load alone.',
    },
    {
        label: 'Chromatic Test',
        title: 'Replace scarlet boucle with Chanel black',
        note: 'Tests whether desire is being carried by warmth and chromatic echo or by house-code authority in isolation.',
    },
    {
        label: 'Hook Test',
        title: 'Shift the gaze into direct eye contact',
        note: 'Measures whether confrontational address strengthens click-through or collapses aspirational asymmetry.',
    },
];

const cloneConcepts = [
    {
        title: "The Cellar Master's Secret",
        tag: 'Restraint',
        copy: 'A private-allocation burgundy brand launched through aged authority and inherited mystique instead of overt luxury signaling.',
    },
    {
        title: 'The Weight of the Blade',
        tag: 'Reversal',
        copy: 'A heritage culinary object becomes the new icon by transferring decades of mastery into one monumental product gesture.',
    },
];

const marketSignals = [
    {
        label: 'Mechanic Velocity',
        title: 'Celebrity Aspiration Transfer',
        stat: '28% share',
        note: 'Still dominant, but beginning to flatten as adjacent luxury fragrance brands oversaturate the same desire relay.',
    },
    {
        label: 'Whitespace',
        title: 'Status through ritual precision',
        stat: 'Open',
        note: 'There is room to shift from overt aspiration into ceremonial authority without losing premium heat.',
    },
    {
        label: 'Audit Trail',
        title: 'Source assets surfaced',
        stat: '12 dossiers',
        note: 'Every market claim can be traced back to the assets creating the pressure pattern, not just an abstract score.',
    },
];

const operatingLayers = [
    {
        label: 'Sovereign Boards',
        title: 'Boardroom delivery without reformatting',
        note: 'Curate assets, export board dossiers, and present a strategic argument without rebuilding the deck from scratch.',
    },
    {
        label: 'Embed Widget',
        title: 'Share live intelligence cleanly',
        note: 'Turn a completed dossier into an external intelligence surface without exposing the whole workspace.',
    },
    {
        label: 'Team & Seats',
        title: 'Operate it like an agency system',
        note: 'Invite strategists, manage roles, and keep intelligence inside a controlled operating environment.',
    },
];

function PlatformRibbon() {
    return (
        <div className="flex flex-wrap gap-2">
            {PLATFORM_LABELS.map((label) => (
                <span
                    key={label}
                    className="rounded-full border border-[#D9CCB4] bg-white px-4 py-2 text-[10px] font-bold uppercase tracking-[0.24em] text-[#7C745F] shadow-[0_6px_18px_rgba(20,20,20,0.04)]"
                >
                    {label}
                </span>
            ))}
        </div>
    );
}

export default function ProductProofSequence() {
    return (
        <section className="border-y border-[#141414]/6 bg-[#F7F2E8]">
            <div className="mx-auto max-w-7xl px-6 py-20 md:py-28">
                <div className="space-y-20 md:space-y-24">
                    <div className="space-y-6 border-b border-[#141414]/8 pb-12">
                        <div className="space-y-3">
                            <p className="text-[10px] font-bold uppercase tracking-[0.34em] text-[#C1A67B]">Inside the Platform</p>
                            <h2 className="max-w-5xl text-4xl font-semibold uppercase leading-[0.94] tracking-tight text-[#141414] md:text-6xl">
                                The homepage should show
                                <br />
                                <span className="text-[#C1A67B]">the product they are buying.</span>
                            </h2>
                        </div>
                        <p className="max-w-4xl text-lg leading-relaxed text-[#5F5B53]">
                            Visual Decompiler is no longer a concept. It is a premium intelligence system. So the page should pull people through the actual surfaces: dossier, psychology, vault, blueprint, clone, market pulse, and the operating layer around them.
                        </p>
                        <PlatformRibbon />
                    </div>

                    <section className="grid gap-10 border-b border-[#141414]/8 pb-20 lg:grid-cols-[0.92fr_1.08fr] lg:items-start">
                        <div className="space-y-6">
                            <div className="space-y-3">
                                <p className="text-[10px] font-bold uppercase tracking-[0.34em] text-[#C1A67B]">Single-Asset Deconstruction</p>
                                <h2 className="max-w-xl text-4xl font-semibold uppercase leading-[0.94] tracking-tight text-[#141414] md:text-6xl">
                                    Open the dossier.
                                    <br />
                                    <span className="text-[#C1A67B]">See the system.</span>
                                </h2>
                            </div>
                            <p className="max-w-xl text-lg leading-relaxed text-[#5F5B53]">
                                Start with a real asset. Show the Chanel dossier exactly the way it earns belief inside the product: image, mechanic, confidence, evidence anchors, and psychology widgets already in motion.
                            </p>

                            <div className="overflow-hidden rounded-[2rem] border border-[#D9CCB4] bg-[#FBFBF6] shadow-[0_24px_60px_rgba(20,20,20,0.10)]">
                                <div className="flex items-center justify-between border-b border-[#141414]/8 px-6 py-5">
                                    <div>
                                        <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-[#C1A67B]">Intelligence Dossier</p>
                                        <p className="mt-2 text-2xl font-light tracking-tight text-[#141414]">CHANEL</p>
                                    </div>
                                    <p className="text-[11px] uppercase tracking-[0.18em] text-[#8A806D]">Luxury Fragrance</p>
                                </div>
                                <div className="p-5">
                                    <div className="overflow-hidden rounded-[1.5rem] border border-[#D9CCB4] bg-[#141414] p-3">
                                        <Image
                                            src="/images/examples/perfume_ad_no_logo.jpg"
                                            alt="Chanel dossier asset preview"
                                            width={1080}
                                            height={1350}
                                            className="aspect-[4/5] w-full rounded-[1.2rem] object-cover"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-6">
                            <div className="rounded-[2rem] border border-[#D9CCB4] bg-white p-7 shadow-[0_14px_40px_rgba(20,20,20,0.06)]">
                                <div className="flex items-center gap-5 border-b border-[#141414]/8 pb-5 text-[11px] font-bold uppercase tracking-[0.18em] text-[#8A806D]">
                                    <span className="text-[#8B4513]">Intelligence</span>
                                    <span>Signals</span>
                                    <span>Psychology</span>
                                    <span>Blueprint</span>
                                    <span>Market Pulse</span>
                                </div>

                                <div className="mt-6 grid gap-5">
                                    <div className="rounded-[1.8rem] border border-[#D4A574]/18 bg-[#141414] p-6 text-white">
                                        <div className="flex items-start justify-between gap-6">
                                            <div className="max-w-xl">
                                                <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-[#D4A574]">Primary Mechanic</p>
                                                <h3 className="mt-4 text-3xl font-light uppercase leading-[1.02] tracking-[0.08em] text-white">
                                                    Celebrity Aspiration Transfer
                                                </h3>
                                                <p className="mt-5 text-sm leading-relaxed text-white/70">
                                                    Desire and identity migrate from subject to product through proximity, chromatic unity, and monumentality.
                                                </p>
                                            </div>
                                            <div className="min-w-[120px] border-l border-white/10 pl-6">
                                                <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-[#D4A574]">Confidence</p>
                                                <p className="mt-5 text-6xl font-light text-white">99%</p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="rounded-[1.8rem] border border-[#D4A574]/18 bg-[#141414] px-6 py-5 text-white">
                                        <div className="flex items-center justify-between gap-4">
                                            <div>
                                                <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-[#D4A574]">Macro-Diagnostic Map</p>
                                                <p className="mt-2 text-sm text-white/65">Visualize optical trajectories and focal anchors.</p>
                                            </div>
                                            <span className="rounded-full bg-[#D4A574] px-5 py-3 text-[10px] font-bold uppercase tracking-[0.22em] text-[#141414]">
                                                Radiant Architecture
                                            </span>
                                        </div>
                                    </div>

                                    <div className="grid gap-5 md:grid-cols-2">
                                        <div className="rounded-[1.8rem] border border-[#D4A574]/18 bg-[#141414] p-6 text-white">
                                            <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-[#D4A574]">Trigger Distribution Map</p>
                                            <div className="mt-6 flex h-[210px] items-center justify-center rounded-[1.3rem] border border-white/6 bg-black/15">
                                                <div className="relative h-32 w-32">
                                                    <div className="absolute inset-0 rounded-full border border-[#D4A574]/12" />
                                                    <div className="absolute inset-[16px] rounded-full border border-[#D4A574]/10" />
                                                    <div className="absolute inset-[32px] rounded-full border border-[#D4A574]/8" />
                                                    <div className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-[#D4A574]/12" />
                                                    <div className="absolute left-0 top-1/2 h-px w-full -translate-y-1/2 bg-[#D4A574]/12" />
                                                    <div className="absolute inset-0">
                                                        <svg viewBox="0 0 120 120" className="h-full w-full">
                                                            <polygon points="60,14 98,46 84,96 38,90 20,54" fill="rgba(212,165,116,0.22)" stroke="#D4A574" strokeWidth="1.5" />
                                                        </svg>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="grid gap-5">
                                            <div className="rounded-[1.8rem] border border-[#D4A574]/18 bg-[#141414] p-6 text-white">
                                                <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-[#D4A574]">Strategic Posture</p>
                                                <p className="mt-5 text-sm leading-relaxed text-white/72">
                                                    Icon maintenance. The brand is not disrupting the category; it is asserting the permanence of an already-won cultural throne.
                                                </p>
                                            </div>

                                            <div className="grid gap-5 sm:grid-cols-2">
                                                {psychologyWidgets.map((widget) => (
                                                    <div key={widget.label} className="rounded-[1.8rem] border border-[#D4A574]/18 bg-[#141414] p-6 text-white">
                                                        <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-[#D4A574]">{widget.label}</p>
                                                        <p className="mt-5 text-5xl font-light text-[#D4A574]">{widget.value}</p>
                                                        <p className="mt-4 text-sm leading-relaxed text-white/72">{widget.note}</p>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    <section className="grid gap-10 border-b border-[#141414]/8 pb-20 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
                        <div className="space-y-6">
                            <div className="space-y-3">
                                <p className="text-[10px] font-bold uppercase tracking-[0.34em] text-[#C1A67B]">Intelligence Vault</p>
                                <h2 className="max-w-xl text-4xl font-semibold uppercase leading-[0.94] tracking-tight text-[#141414] md:text-6xl">
                                    Build a memory.
                                    <br />
                                    <span className="text-[#C1A67B]">Not a one-off report.</span>
                                </h2>
                            </div>
                            <p className="max-w-xl text-lg leading-relaxed text-[#5F5B53]">
                                The vault is where the product stops being a clever demo and becomes strategic infrastructure. Searchable assets, deduplicated memory, tags, boards, and future benchmark depth all start here.
                            </p>
                        </div>

                        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
                            {vaultAssets.map((asset) => (
                                <div key={asset.title} className="overflow-hidden rounded-[1.9rem] border border-[#141414]/12 bg-[#141414] text-white shadow-[0_18px_40px_rgba(20,20,20,0.10)]">
                                    <div className="relative">
                                        <Image
                                            src={asset.image}
                                            alt={`${asset.title} vault dossier preview`}
                                            width={720}
                                            height={920}
                                            className="aspect-[4/5] w-full object-cover"
                                        />
                                        <div className="absolute inset-x-0 bottom-0 flex justify-end px-4 pb-4">
                                            <span className="bg-[#D4A574] px-4 py-2 text-[10px] font-bold uppercase tracking-[0.22em] text-[#141414]">
                                                Forensic Secured
                                            </span>
                                        </div>
                                    </div>
                                    <div className="space-y-5 p-5">
                                        <div>
                                            <h3 className="text-[1.65rem] font-light uppercase tracking-tight text-white">{asset.title}</h3>
                                            <p className="mt-2 text-[11px] font-bold uppercase tracking-[0.18em] text-[#D4A574]">{asset.sector}</p>
                                        </div>
                                        <div className="border-t border-white/10 pt-4">
                                            <p className="text-[9px] font-bold uppercase tracking-[0.26em] text-[#D4A574]/70">Structural Logic</p>
                                            <p className="mt-3 text-base leading-relaxed text-white/82">{asset.mechanic}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>

                    <section className="grid gap-10 border-b border-[#141414]/8 pb-20 lg:grid-cols-[0.88fr_1.12fr] lg:items-start">
                        <div className="space-y-6">
                            <div className="space-y-3">
                                <p className="text-[10px] font-bold uppercase tracking-[0.34em] text-[#C1A67B]">Execution Outputs</p>
                                <h2 className="max-w-xl text-4xl font-semibold uppercase leading-[0.94] tracking-tight text-[#141414] md:text-6xl">
                                    Turn analysis
                                    <br />
                                    <span className="text-[#C1A67B]">into execution.</span>
                                </h2>
                            </div>
                            <p className="max-w-xl text-lg leading-relaxed text-[#5F5B53]">
                                This is where the subscription becomes hard to walk away from. The platform generates blueprint test plans, clone concepts, and DNA prompts that push the insight straight into creative development.
                            </p>
                        </div>

                        <div className="grid gap-6">
                            <div className="rounded-[2rem] border border-[#D9CCB4] bg-white p-7 shadow-[0_14px_40px_rgba(20,20,20,0.06)]">
                                <div className="flex flex-col gap-4 border-b border-[#141414]/8 pb-5 md:flex-row md:items-end md:justify-between">
                                    <div>
                                        <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-[#C1A67B]">Production Blueprint</p>
                                        <h3 className="mt-3 text-2xl font-semibold uppercase tracking-tight text-[#141414]">Iteration & test plan</h3>
                                    </div>
                                    <p className="text-[11px] uppercase tracking-[0.18em] text-[#7A7468]">Saved to each asset automatically</p>
                                </div>
                                <div className="mt-6 grid gap-4 md:grid-cols-3">
                                    {blueprintCells.map((cell) => (
                                        <div key={cell.title} className="rounded-[1.5rem] border border-[#D9CCB4] bg-[#FBF8F1] p-5">
                                            <p className="text-[9px] font-bold uppercase tracking-[0.24em] text-[#C1A67B]">{cell.label}</p>
                                            <h4 className="mt-3 text-2xl font-semibold leading-[1.02] text-[#141414]">{cell.title}</h4>
                                            <p className="mt-4 text-sm leading-relaxed text-[#5F5B53]">{cell.note}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="rounded-[2rem] border border-[#D9CCB4] bg-[#141414] p-7 text-white shadow-[0_20px_50px_rgba(20,20,20,0.14)]">
                                <div className="flex flex-col gap-4 border-b border-white/10 pb-5 md:flex-row md:items-end md:justify-between">
                                    <div>
                                        <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-[#D4A574]">Clone Engine</p>
                                        <h3 className="mt-3 text-2xl font-semibold uppercase tracking-tight text-white">Fresh campaign routes from one persuasion mechanic</h3>
                                    </div>
                                    <p className="text-[11px] uppercase tracking-[0.18em] text-white/45">Five deployable concepts per asset</p>
                                </div>
                                <div className="mt-6 grid gap-4 md:grid-cols-2">
                                    {cloneConcepts.map((concept) => (
                                        <div key={concept.title} className="rounded-[1.5rem] border border-[#D4A574]/18 bg-white/[0.03] p-5">
                                            <div className="flex items-center justify-between gap-4">
                                                <p className="text-lg font-semibold uppercase leading-[1.04] text-white">{concept.title}</p>
                                                <span className="rounded-full border border-[#D4A574]/25 px-3 py-1 text-[9px] font-bold uppercase tracking-[0.22em] text-[#D4A574]">
                                                    {concept.tag}
                                                </span>
                                            </div>
                                            <p className="mt-4 text-sm leading-relaxed text-white/72">{concept.copy}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </section>

                    <section className="grid gap-10 border-b border-[#141414]/8 pb-20 lg:grid-cols-[0.82fr_1.18fr] lg:items-start">
                        <div className="space-y-6">
                            <div className="space-y-3">
                                <p className="text-[10px] font-bold uppercase tracking-[0.34em] text-[#C1A67B]">Mechanic Intelligence</p>
                                <h2 className="max-w-xl text-4xl font-semibold uppercase leading-[0.94] tracking-tight text-[#141414] md:text-6xl">
                                    See the market,
                                    <br />
                                    <span className="text-[#C1A67B]">not just the ad.</span>
                                </h2>
                            </div>
                            <p className="max-w-xl text-lg leading-relaxed text-[#5F5B53]">
                                Cross-asset intelligence is where the premium layer becomes obvious. Market Pulse shows mechanic velocity, whitespace, audit trails, and comparative pressure across the vault. Differential Diagnostic shows lift, fatigue, and strategic delta between assets.
                            </p>
                        </div>

                        <div className="grid gap-6">
                            <div className="rounded-[2rem] border border-[#D9CCB4] bg-white p-7 shadow-[0_14px_40px_rgba(20,20,20,0.06)]">
                                <div className="flex flex-col gap-4 border-b border-[#141414]/8 pb-5 md:flex-row md:items-end md:justify-between">
                                    <div>
                                        <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-[#C1A67B]">Market Pulse</p>
                                        <h3 className="mt-3 text-2xl font-semibold uppercase tracking-tight text-[#141414]">Cross-asset signal mapping</h3>
                                    </div>
                                    <p className="text-[11px] uppercase tracking-[0.18em] text-[#7A7468]">30D / 60D / 90D windows</p>
                                </div>

                                <div className="mt-6 grid gap-4 md:grid-cols-3">
                                    {marketSignals.map((signal) => (
                                        <div key={signal.label} className="rounded-[1.5rem] border border-[#D9CCB4] bg-[#FBF8F1] p-5">
                                            <p className="text-[9px] font-bold uppercase tracking-[0.24em] text-[#C1A67B]">{signal.label}</p>
                                            <h4 className="mt-3 text-2xl font-semibold leading-[1.02] text-[#141414]">{signal.title}</h4>
                                            <p className="mt-3 text-[10px] font-bold uppercase tracking-[0.18em] text-[#8B4513]">{signal.stat}</p>
                                            <p className="mt-4 text-sm leading-relaxed text-[#5F5B53]">{signal.note}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="rounded-[2rem] border border-[#D9CCB4] bg-[#FBFBF6] p-7 shadow-[0_14px_40px_rgba(20,20,20,0.06)]">
                                <div className="flex items-center justify-between gap-5 border-b border-[#141414]/8 pb-5">
                                    <div>
                                        <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-[#C1A67B]">Differential Diagnostic</p>
                                        <h3 className="mt-3 text-2xl font-semibold uppercase tracking-tight text-[#141414]">Strategic delta between assets</h3>
                                    </div>
                                    <span className="rounded-full border border-[#D9CCB4] bg-white px-4 py-2 text-[10px] font-bold uppercase tracking-[0.22em] text-[#7A7468]">
                                        Reset laboratory
                                    </span>
                                </div>

                                <div className="mt-6 grid gap-4 md:grid-cols-2">
                                    <div className="overflow-hidden rounded-[1.6rem] border border-[#D9CCB4] bg-[#141414] text-white">
                                        <div className="relative">
                                            <Image
                                                src="/images/examples/perfume_ad_no_logo.jpg"
                                                alt="Control asset preview"
                                                width={720}
                                                height={520}
                                                className="aspect-[16/10] w-full object-cover opacity-75"
                                            />
                                            <div className="absolute inset-0 bg-black/35" />
                                            <div className="absolute inset-0 p-6">
                                                <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-[#D4A574]">Control (Asset A)</p>
                                                <p className="mt-4 text-4xl font-light tracking-tight text-white">CHANEL</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="overflow-hidden rounded-[1.6rem] border border-[#D9CCB4] bg-[#141414] text-white">
                                        <div className="relative">
                                            <Image
                                                src="/images/examples/valentino-voce-viva.png"
                                                alt="Proposed asset preview"
                                                width={720}
                                                height={520}
                                                className="aspect-[16/10] w-full object-cover opacity-60 grayscale"
                                            />
                                            <div className="absolute inset-0 bg-black/35" />
                                            <div className="absolute inset-0 p-6">
                                                <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-[#D4A574]">Proposed (Asset B)</p>
                                                <p className="mt-4 text-4xl font-light tracking-tight text-white">VERSACE</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    <section className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
                        <div className="space-y-6">
                            <div className="space-y-3">
                                <p className="text-[10px] font-bold uppercase tracking-[0.34em] text-[#C1A67B]">Agency Operating Layer</p>
                                <h2 className="max-w-xl text-4xl font-semibold uppercase leading-[0.94] tracking-tight text-[#141414] md:text-6xl">
                                    Run it like
                                    <br />
                                    <span className="text-[#C1A67B]">an agency system.</span>
                                </h2>
                            </div>
                            <p className="max-w-xl text-lg leading-relaxed text-[#5F5B53]">
                                Once the intelligence is working, the rest has to feel inevitable. Boards, embeds, white-labeled export, settings, and team seats are what turn forensic analysis into an operating system clients and strategists can actually live inside.
                            </p>
                            <a
                                href="/ingest"
                                className="inline-flex rounded-full bg-[#141414] px-7 py-4 text-[11px] font-bold uppercase tracking-[0.26em] text-[#FBF7EF] transition-colors hover:bg-black"
                            >
                                Start with 5 free analyses
                            </a>
                        </div>

                        <div className="grid gap-5 md:grid-cols-3">
                            {operatingLayers.map((layer) => (
                                <div key={layer.label} className="rounded-[2rem] border border-[#D9CCB4] bg-white p-6 shadow-[0_12px_32px_rgba(20,20,20,0.05)]">
                                    <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-[#C1A67B]">{layer.label}</p>
                                    <h3 className="mt-4 text-2xl font-semibold leading-[1.04] tracking-tight text-[#141414]">{layer.title}</h3>
                                    <p className="mt-4 text-sm leading-relaxed text-[#5F5B53]">{layer.note}</p>
                                </div>
                            ))}
                        </div>
                    </section>
                </div>
            </div>
        </section>
    );
}
