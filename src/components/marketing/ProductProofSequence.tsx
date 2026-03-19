'use client';

import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Image from 'next/image';

const PLATFORM_SURFACE_GROUPS = [
    {
        label: 'Analysis Layer',
        surfaces: [
            {
                label: 'Analyse Ad Asset',
                title: 'Deconstruct any static creative in minutes',
                what: 'Drop in a JPG, PNG, or WebP and the platform reads the hidden persuasion system inside the ad.',
                why: 'This is the fastest route from raw creative to a strategic point of view you can actually defend in front of a client.',
            },
            {
                label: 'Macro-Diagnostic Map',
                title: 'Show the visual logic with instant wow-factor',
                what: 'Map focal anchors, optical trajectories, and the hierarchy of attention directly onto the creative.',
                why: 'It makes the invisible system visible in one frame, which is exactly where premium belief starts.',
            },
            {
                label: 'Intelligence Vault',
                title: 'A permanent memory layer for every asset',
                what: 'Every completed dossier is stored, searchable, deduplicated, and ready to be recalled later by brand, sector, mechanic, or tag.',
                why: 'It stops the platform being a one-off report generator and turns it into long-term agency memory.',
            },
        ],
    },
    {
        label: 'Intelligence Layer',
        surfaces: [
            {
                label: 'Intelligence Pulse',
                title: 'Compare assets and surface the strategic delta',
                what: 'Run differential diagnostics between control and proposed assets to reveal persuasion lift, fatigue gaps, and performance direction.',
                why: 'You stop arguing from taste and start showing why one route should win.',
            },
            {
                label: 'Mechanic Intelligence',
                title: 'See the market pressure, not just one ad',
                what: 'Cross-asset intelligence tracks mechanic velocity, trigger pressure, whitespace, and audit trails across the vault.',
                why: 'It gives agencies a premium planning layer competitors cannot fake with surface-level creative reviews.',
            },
            {
                label: 'Market Pulse',
                title: 'Benchmark pressure across categories',
                what: 'Run 30, 60, and 90-day views of mechanic velocity, whitespace, source assets, and category direction.',
                why: 'It helps agencies pitch from market intelligence, not isolated opinions.',
            },
        ],
    },
    {
        label: 'Execution Layer',
        surfaces: [
            {
                label: 'Blueprint',
                title: 'Convert insight into structured tests',
                what: 'Each asset can generate an iteration plan with hook, chromatic, copy, and visual tests ready for production teams.',
                why: 'You do not just diagnose what worked. You know what to test next.',
            },
            {
                label: 'Clone Engine',
                title: 'Generate fresh campaign routes from one mechanic',
                what: 'Take a persuasion architecture and spin out new campaign concepts, scenes, psychology, and DNA prompts from it.',
                why: 'It turns forensic insight into a live creative advantage instead of a post-mortem.',
            },
            {
                label: 'Embed Widget',
                title: 'Share intelligence cleanly outside the vault',
                what: 'Turn selected dossier surfaces into a polished external widget without opening the entire workspace.',
                why: 'It is the cleanest way to circulate proof without creating presentation sprawl.',
            },
        ],
    },
    {
        label: 'Agency Layer',
        surfaces: [
            {
                label: 'Sovereign Boards',
                title: 'Curate live strategy without rebuilding decks',
                what: 'Group assets into board-ready collections, export board dossiers, and present a strategic narrative cleanly.',
                why: 'It makes the jump from analysis to presentation feel immediate instead of laborious.',
            },
            {
                label: 'Agency Settings',
                title: 'White-label the intelligence layer',
                what: 'Brand dossier identity, exports, and client-facing presentation surfaces so the system feels like your agency, not ours.',
                why: 'Premium tools win faster when they slot into the agency’s own operating aesthetic.',
            },
            {
                label: 'Team & Seats',
                title: 'Operate as a real agency system',
                what: 'Invite strategists, assign roles, and control who can access intelligence, exports, and operating surfaces.',
                why: 'It turns a powerful solo tool into something a whole strategy unit can live inside.',
            },
        ],
    },
];

const vaultAssets = [
    {
        title: 'CHANEL',
        sector: 'Luxury Fragrance',
        mechanic: 'Celebrity Aspiration Transfer',
        image: '/images/examples/Chanel_No5.webp',
    },
    {
        title: 'ACNE STUDIOS',
        sector: 'Luxury Fashion / Premium Accessories',
        mechanic: 'Ironic Juxtaposition + Heritage Weaponization',
        image: '/images/examples/ACNE.png',
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

const dossierEvidence = [
    {
        label: 'Evidence Anchors',
        title: 'Bottle scale, red boucle, intimate gaze',
        note: 'The product is elevated to icon status while the subject remains its aspirational delivery system.',
    },
    {
        label: 'Semiotic Subtext',
        title: 'Heritage coded as warmth and ritual status',
        note: 'House-code signals read as permanence rather than trend, pushing authority below the threshold of overt claims.',
    },
];

const dossierActions = [
    'Open Clone Engine',
    'Copy Embed Widget',
    'Export Dossier (Print/PDF)',
    'Add to Board',
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

const outputActions = [
    'Open Clone Engine',
    'Copy Embed Widget',
    'Export Dossier (Print/PDF)',
    'Add to Board',
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
    const [activeSurface, setActiveSurface] = useState<(typeof PLATFORM_SURFACE_GROUPS)[number]['surfaces'][number] | null>(null);

    useEffect(() => {
        if (!activeSurface) return;

        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                setActiveSurface(null);
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [activeSurface]);

    return (
        <>
            <div className="flex flex-wrap gap-2">
                {PLATFORM_SURFACE_GROUPS.map((group) => (
                    <div key={group.label} className="flex flex-wrap items-center gap-2">
                        <span className="mr-1 text-[10px] font-bold uppercase tracking-[0.32em] text-[#B6A17E]">
                            {group.label}
                        </span>
                        {group.surfaces.map((surface) => (
                            <button
                                key={surface.label}
                                type="button"
                                onClick={() => setActiveSurface(surface)}
                                className="rounded-full border border-[#D9CCB4] bg-white px-4 py-2 text-[10px] font-bold uppercase tracking-[0.24em] text-[#7C745F] shadow-[0_6px_18px_rgba(20,20,20,0.04)] transition-all duration-200 hover:-translate-y-px hover:border-[#CBB28A] hover:bg-[#F5E8D1] hover:text-[#141414]"
                            >
                                {surface.label}
                            </button>
                        ))}
                        {group !== PLATFORM_SURFACE_GROUPS[PLATFORM_SURFACE_GROUPS.length - 1] && (
                            <span className="mx-1 hidden h-7 w-px bg-[#D9CCB4] md:block" aria-hidden="true" />
                        )}
                    </div>
                ))}
            </div>

            <AnimatePresence>
                {activeSurface && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.22, ease: 'easeOut' }}
                        className="fixed inset-0 z-50 flex items-center justify-center bg-[rgba(20,20,20,0.20)] px-6 py-10 backdrop-blur-[6px]"
                        onClick={() => setActiveSurface(null)}
                    >
                        <motion.div
                            initial={{ opacity: 0, y: 18, scale: 0.985 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 12, scale: 0.99 }}
                            transition={{ duration: 0.26, ease: [0.22, 1, 0.36, 1] }}
                            className="w-full max-w-3xl rounded-[2.2rem] border border-[#D9CCB4] bg-[#FBFBF6] p-8 shadow-[0_28px_80px_rgba(20,20,20,0.18)] md:p-10"
                            onClick={(event) => event.stopPropagation()}
                        >
                            <div className="flex items-start justify-between gap-6 border-b border-[#141414]/8 pb-6">
                                <div className="space-y-3">
                                    <p className="text-[10px] font-bold uppercase tracking-[0.34em] text-[#C1A67B]">Inside the Platform</p>
                                    <h3 className="max-w-2xl text-3xl font-semibold uppercase leading-[0.96] tracking-tight text-[#141414] md:text-5xl">
                                        {activeSurface.title}
                                    </h3>
                                </div>
                                <button
                                    type="button"
                                    onClick={() => setActiveSurface(null)}
                                    className="rounded-full border border-[#D9CCB4] bg-white px-4 py-2 text-[10px] font-bold uppercase tracking-[0.22em] text-[#7C745F] transition-colors hover:border-[#CBB28A] hover:text-[#141414]"
                                >
                                    Close
                                </button>
                            </div>

                            <div className="mt-8 grid gap-5 md:grid-cols-2">
                                <div className="rounded-[1.7rem] border border-[#D9CCB4] bg-white p-6">
                                    <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-[#C1A67B]">What it is</p>
                                    <p className="mt-4 text-lg leading-relaxed text-[#3F3B34]">{activeSurface.what}</p>
                                </div>
                                <div className="rounded-[1.7rem] border border-[#D9CCB4] bg-[#141414] p-6 text-white">
                                    <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-[#D4A574]">Why you want it</p>
                                    <p className="mt-4 text-lg leading-relaxed text-white/82">{activeSurface.why}</p>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
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
                                Premium intelligence,
                                <br />
                                <span className="text-[#C1A67B]">not abstract promise.</span>
                            </h2>
                        </div>
                        <p className="max-w-4xl text-lg leading-relaxed text-[#5F5B53]">
                            Explore the surfaces that make Visual Decompiler valuable in practice: forensic deconstruction, psychology readouts, vault memory, execution outputs, market intelligence, and the operating layer around them. Click any surface below to see what it does and why agencies keep it close.
                        </p>
                        <PlatformRibbon />
                    </div>

                    <section className="space-y-10 border-b border-[#141414]/8 pb-20">
                        <div className="grid gap-10 lg:grid-cols-[0.78fr_1.22fr] lg:items-start">
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
                                Start with the actual dossier experience. The asset stays visible, the mechanic reads instantly, and the confidence, map logic, and strategic posture tell you why the ad is working before you ever get to export, clone, or market benchmarking.
                            </p>

                            <div className="overflow-hidden rounded-[2rem] border border-[#D9CCB4] bg-[#FBFBF6] shadow-[0_20px_50px_rgba(20,20,20,0.08)]">
                                <div className="overflow-hidden rounded-[1.6rem] border-b border-[#141414]/8">
                                    <div className="relative p-4">
                                        <div className="overflow-hidden rounded-[1.35rem] border border-[#BCA27D] bg-[#141414] p-2">
                                            <Image
                                                src="/images/examples/Chanel_No5.webp"
                                                alt="Chanel asset preview with macro-diagnostic overlay"
                                                width={1080}
                                                height={1400}
                                                className="aspect-[4/5] w-full rounded-[1.15rem] object-cover"
                                            />
                                        </div>

                                        <div className="pointer-events-none absolute inset-0 flex items-center justify-center p-8">
                                            <div className="relative h-full w-full">
                                                <div className="absolute left-[40%] top-[18%] h-[45%] w-px bg-[#E7C79B]/78" />
                                                <div className="absolute left-[40%] top-[18%] h-4 w-4 -translate-x-1/2 rounded-full border border-[#E7C79B] bg-white/90" />
                                                <div className="absolute left-[50%] top-[40%] h-4 w-4 -translate-x-1/2 rounded-full border border-[#E7C79B] bg-white/90" />
                                                <div className="absolute left-[42%] top-[63%] h-4 w-4 -translate-x-1/2 rounded-full border border-[#E7C79B] bg-white/90" />
                                                <div className="absolute left-[40%] top-[18%] h-px w-[18%] bg-[#E7C79B]/78" />
                                                <div className="absolute left-[42%] top-[63%] h-px w-[8%] bg-[#E7C79B]/78" />
                                                <div className="absolute left-[50%] top-[40%] h-px w-[12%] bg-[#E7C79B]/78" />
                                                <div className="absolute left-[32%] top-[12%] text-xl text-[#E7C79B]/65">01</div>
                                                <div className="absolute left-[43%] top-[58%] text-xl text-[#E7C79B]/65">02</div>
                                                <div className="absolute left-[56%] top-[31%] text-xl text-[#E7C79B]/45">03</div>
                                                <div className="absolute left-[8%] top-[6%] h-10 w-10 border-l border-t border-[#E7C79B]/35" />
                                                <div className="absolute right-[8%] top-[6%] h-10 w-10 border-r border-t border-[#E7C79B]/35" />
                                                <div className="absolute left-[8%] bottom-[8%] h-10 w-10 border-b border-l border-[#E7C79B]/35" />
                                                <div className="absolute right-[8%] bottom-[8%] h-10 w-10 border-b border-r border-[#E7C79B]/35" />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-5 px-5 py-5">
                                    <div className="flex items-end justify-between gap-6">
                                        <div>
                                            <p className="text-4xl font-light tracking-tight text-[#C1A67B]">CHANEL</p>
                                            <p className="mt-2 text-[11px] font-bold uppercase tracking-[0.22em] text-[#C1A67B]">Luxury Fragrance</p>
                                        </div>
                                        <p className="text-[11px] uppercase tracking-[0.18em] text-[#B79E7A]">ID: 1cb30400</p>
                                    </div>

                                    <div className="flex flex-wrap gap-3">
                                        {dossierActions.map((action, index) => (
                                            <span
                                                key={action}
                                                className={`inline-flex items-center rounded-full px-5 py-3 text-[11px] font-bold uppercase tracking-[0.22em] ${
                                                    index === 0
                                                        ? 'bg-[#D4A574] text-[#141414]'
                                                        : index === 1
                                                          ? 'bg-[#141414] text-[#F5EBDC]'
                                                          : 'bg-[#4B4B4B] text-white'
                                                }`}
                                            >
                                                {action}
                                            </span>
                                        ))}
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

                                    <div className="grid gap-5 md:grid-cols-[0.95fr_1.05fr]">
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
                                            <div className="mt-6 grid h-[180px] grid-cols-6 gap-2 rounded-[1.4rem] border border-white/6 bg-black/15 p-4">
                                                <div className="col-span-2 rounded-[1.1rem] border border-[#D4A574]/14 bg-white/[0.03] p-4">
                                                    <p className="text-[9px] font-bold uppercase tracking-[0.24em] text-[#D4A574]/70">Focus Path</p>
                                                    <div className="mt-5 space-y-4">
                                                        <div className="h-2 w-10 rounded-full bg-[#D4A574]" />
                                                        <div className="h-2 w-16 rounded-full bg-[#D4A574]/70" />
                                                        <div className="h-2 w-8 rounded-full bg-[#D4A574]/55" />
                                                    </div>
                                                </div>
                                                <div className="col-span-4 rounded-[1.1rem] border border-[#D4A574]/14 bg-white/[0.03] p-4">
                                                    <div className="relative h-full overflow-hidden rounded-[0.9rem]">
                                                        <div className="absolute left-[18%] top-[12%] h-[60%] w-px bg-[#D4A574]/38" />
                                                        <div className="absolute left-[18%] top-[12%] h-3 w-3 -translate-x-1/2 rounded-full border border-[#D4A574] bg-white" />
                                                        <div className="absolute left-[48%] top-[38%] h-3 w-3 -translate-x-1/2 rounded-full border border-[#D4A574] bg-white" />
                                                        <div className="absolute left-[42%] top-[64%] h-3 w-3 -translate-x-1/2 rounded-full border border-[#D4A574] bg-white" />
                                                        <div className="absolute left-[18%] top-[12%] h-px w-[30%] bg-[#D4A574]/38" />
                                                        <div className="absolute left-[18%] top-[64%] h-px w-[24%] bg-[#D4A574]/38" />
                                                        <div className="absolute left-[48%] top-[38%] h-px w-[24%] bg-[#D4A574]/38" />
                                                        <div className="absolute right-[12%] top-[22%] h-2 w-2 rounded-full bg-white/80" />
                                                        <div className="absolute right-[9%] top-[49%] h-2 w-2 rounded-full bg-white/60" />
                                                        <div className="absolute left-[6%] top-[49%] h-2 w-2 rounded-full bg-white/55" />
                                                        <div className="absolute bottom-[10%] left-[50%] h-10 w-10 -translate-x-1/2 rounded-full border border-[#D4A574]/18" />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="grid gap-5">
                                            <div className="rounded-[1.8rem] border border-[#D4A574]/18 bg-[#141414] p-6 text-white">
                                                <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-[#D4A574]">Semiotic Subtext</p>
                                                <p className="mt-4 text-sm leading-relaxed text-white/72">
                                                    Heritage authority, chromatic desire, and product monumentality are running as one compressed system rather than as separate visual signals.
                                                </p>
                                            </div>

                                            <div className="rounded-[1.8rem] border border-[#D4A574]/18 bg-[#141414] p-6 text-white">
                                                <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-[#D4A574]">Strategic Posture</p>
                                                <p className="mt-5 text-sm leading-relaxed text-white/72">
                                                    Icon maintenance. The brand is not disrupting the category; it is asserting the permanence of an already-won cultural throne.
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        </div>

                        <div className="grid gap-6 lg:grid-cols-[0.78fr_1.22fr]">
                            <div className="rounded-[2rem] border border-[#D9CCB4] bg-white p-7 shadow-[0_14px_40px_rgba(20,20,20,0.06)]">
                                <div className="grid gap-5">
                                    {dossierEvidence.map((evidence) => (
                                        <div key={evidence.label} className="rounded-[1.8rem] border border-[#D9CCB4] bg-[#FBFBF6] p-6">
                                            <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-[#C1A67B]">{evidence.label}</p>
                                            <h3 className="mt-4 text-[1.8rem] font-semibold uppercase leading-[1.02] tracking-tight text-[#141414]">
                                                {evidence.title}
                                            </h3>
                                            <p className="mt-4 text-sm leading-relaxed text-[#5F5B53]">{evidence.note}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="rounded-[2rem] border border-[#D9CCB4] bg-white p-7 shadow-[0_14px_40px_rgba(20,20,20,0.06)]">
                                <div className="grid gap-5 md:grid-cols-[1.1fr_0.9fr]">
                                    <div className="rounded-[1.8rem] border border-[#D4A574]/18 bg-[#141414] p-6 text-white">
                                        <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-[#D4A574]">Trigger Distribution Map</p>
                                        <div className="mt-6 rounded-[1.3rem] border border-white/12 bg-[#171717] p-4">
                                            <div className="relative grid h-[220px] place-items-center overflow-hidden rounded-[1rem] border border-white/12 [background-image:linear-gradient(rgba(255,255,255,0.045)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.045)_1px,transparent_1px)] [background-size:56px_56px]">
                                                <div className="pointer-events-none absolute left-1/2 top-5 -translate-x-1/2 text-[11px] font-bold uppercase tracking-[0.18em] text-[#D4A574]">
                                                    Status
                                                </div>
                                                <div className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[10px] font-bold uppercase leading-[1.35] tracking-[0.16em] text-[#D4A574]">
                                                    Social
                                                    <br />
                                                    Proof
                                                </div>
                                                <div className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-right text-[10px] font-bold uppercase tracking-[0.16em] text-[#D4A574]">
                                                    Utility
                                                </div>
                                                <div className="pointer-events-none absolute bottom-4 left-7 text-[10px] font-bold uppercase tracking-[0.16em] text-[#D4A574]">
                                                    Authority
                                                </div>
                                                <div className="pointer-events-none absolute bottom-4 right-5 text-[10px] font-bold uppercase tracking-[0.16em] text-[#D4A574]">
                                                    Scarcity
                                                </div>

                                                <svg viewBox="0 0 220 220" className="h-[168px] w-[168px]">
                                                    <g fill="none" strokeLinecap="round">
                                                        <circle cx="110" cy="110" r="60" stroke="rgba(255,255,255,0.26)" strokeWidth="1.4" />
                                                        <circle cx="110" cy="110" r="40" stroke="rgba(255,255,255,0.16)" strokeWidth="1.2" />
                                                        <circle cx="110" cy="110" r="20" stroke="rgba(255,255,255,0.12)" strokeWidth="1" />
                                                        <path d="M110 50 L146 82 L135 132 L86 144 L64 94 Z" stroke="rgba(255,255,255,0.16)" strokeWidth="1.2" />
                                                        <path d="M110 30 L110 170 M48 90 L172 90 M68 148 L152 148 M68 148 L48 90 M152 148 L172 90" stroke="rgba(255,255,255,0.08)" strokeWidth="1" />
                                                        <polygon points="110,50 146,82 135,132 86,144 64,94" fill="rgba(212,165,116,0.22)" stroke="#D4A574" strokeWidth="2.3" />
                                                    </g>
                                                    <g fill="#F6F1E7">
                                                        <circle cx="110" cy="50" r="4.5" />
                                                        <circle cx="146" cy="82" r="4.5" />
                                                        <circle cx="135" cy="132" r="4.5" />
                                                        <circle cx="86" cy="144" r="4.5" />
                                                        <circle cx="64" cy="94" r="4.5" />
                                                    </g>
                                                </svg>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="grid gap-5 sm:grid-cols-2 md:grid-cols-1">
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
                                This is where the subscription becomes hard to walk away from. The platform does not stop at analysis. It opens clone routes, produces boardroom-ready dossier output, creates an embeddable intelligence panel, and gives strategy teams something they can actually ship.
                            </p>
                        </div>

                        <div className="grid gap-6">
                            <div className="rounded-[2rem] border border-[#D9CCB4] bg-white p-7 shadow-[0_14px_40px_rgba(20,20,20,0.06)]">
                                <div className="flex flex-wrap gap-3">
                                    {outputActions.map((action, index) => (
                                        <span
                                            key={action}
                                            className={`inline-flex items-center rounded-full px-5 py-3 text-[11px] font-bold uppercase tracking-[0.22em] ${
                                                index === 0
                                                    ? 'bg-[#D4A574] text-[#141414]'
                                                    : index === 1
                                                      ? 'bg-[#141414] text-[#F5EBDC]'
                                                      : 'bg-[#4B4B4B] text-white'
                                            }`}
                                        >
                                            {action}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            <div className="rounded-[2rem] border border-[#D9CCB4] bg-[#FBFBF6] p-7 shadow-[0_14px_40px_rgba(20,20,20,0.06)]">
                                <div className="flex flex-col gap-4 border-b border-[#141414]/8 pb-5 md:flex-row md:items-end md:justify-between">
                                    <div>
                                        <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-[#C1A67B]">Embed Widget</p>
                                        <h3 className="mt-3 text-2xl font-semibold uppercase tracking-tight text-[#141414]">A self-contained forensic intelligence panel</h3>
                                    </div>
                                    <p className="text-[11px] uppercase tracking-[0.18em] text-[#7A7468]">Client reports · strategy decks · dashboards</p>
                                </div>

                                <div className="mt-6 grid gap-5 lg:grid-cols-[0.9fr_1.1fr]">
                                    <div className="space-y-4 rounded-[1.6rem] border border-[#D9CCB4] bg-white p-6">
                                        <p className="text-base leading-relaxed text-[#3F3B34]">
                                            Paste this iFrame into a client portal, strategy deck, Notion page, or internal dashboard to display a self-contained forensic intelligence panel.
                                        </p>
                                        <div className="rounded-[1.3rem] border border-[#E3D6BF] bg-[#FBF8F1] p-4">
                                            <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-[#C1A67B]">Use for</p>
                                            <p className="mt-3 text-sm leading-relaxed text-[#5F5B53]">client-facing reports · internal strategy decks · agency dashboards</p>
                                        </div>
                                    </div>

                                    <div className="rounded-[1.6rem] border border-[#D9CCB4] bg-[#141414] p-6 text-white">
                                        <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-[#D4A574]">Embed Snippet</p>
                                        <div className="mt-4 overflow-hidden rounded-[1.2rem] border border-white/10 bg-black/20 p-5">
                                            <code className="block whitespace-pre-wrap break-all text-[13px] leading-relaxed text-white/82">
                                                {`<iframe src="visualdecompiler.com/embed/1cb30400-1ba3-4dda-8fe2-7650674aeb4a" width="100%" height="600px" />`}
                                            </code>
                                        </div>
                                    </div>
                                </div>
                            </div>

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
                                                src="/images/examples/Chanel_No5.webp"
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
