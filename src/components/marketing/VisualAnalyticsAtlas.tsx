'use client';

import { startTransition, useState, type ReactNode } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';

type TabKey =
    | 'QUALITY GATE'
    | 'INTELLIGENCE'
    | 'MECHANICS'
    | 'PSYCHOLOGY'
    | 'CONSTRAINT MAP'
    | 'BLUEPRINT TRACE'
    | 'STRESS LAB'
    | 'MARKET PULSE';

type GlyphKind = 'circular' | 'square' | 'route';

type DiagramCardContent = {
    eyebrow: string;
    title: string;
    body: string;
    detail: string;
    glyph: GlyphKind;
};

type TabContent = {
    eyebrow: string;
    title: string;
    body: string;
    note: string;
    cta: string;
    cards: [DiagramCardContent, DiagramCardContent, DiagramCardContent];
};

const ANALYSIS_TABS: TabKey[] = [
    'QUALITY GATE',
    'INTELLIGENCE',
    'MECHANICS',
    'PSYCHOLOGY',
    'CONSTRAINT MAP',
    'BLUEPRINT TRACE',
    'STRESS LAB',
    'MARKET PULSE',
];

const TAB_CONTENT: Record<TabKey, TabContent> = {
    'QUALITY GATE': {
        eyebrow: 'Quality Gate',
        title: 'Judge the piece before the room does.',
        body: 'A first-pass read on whether the work is carrying authority, clarity, and enough restraint to survive a tougher conversation.',
        note: 'Useful before reviews, before launch, and before a strong visual starts getting trusted too quickly.',
        cta: 'Review the quality gate',
        cards: [
            {
                eyebrow: 'Authority',
                title: 'Posture signal read',
                body: 'Tests whether the frame arrives with conviction or compensates with unnecessary drama.',
                detail: 'A good read feels held. A weak read performs confidence instead of carrying it.',
                glyph: 'circular',
            },
            {
                eyebrow: 'Clarity',
                title: 'Message pressure map',
                body: 'Looks at where the work starts over-explaining and where hierarchy begins to fog.',
                detail: 'The goal is not simplification. It is precise compression.',
                glyph: 'square',
            },
            {
                eyebrow: 'Readiness',
                title: 'Release path',
                body: 'Tracks whether the eye lands where it should before the message begins asking for trust.',
                detail: 'If the path drifts, the room starts improvising its own story.',
                glyph: 'route',
            },
        ],
    },
    INTELLIGENCE: {
        eyebrow: 'Intelligence',
        title: 'See what the creative knows about the audience.',
        body: 'Not sentiment. Not vanity metrics. A visual read of how the work frames aspiration, status, and category understanding.',
        note: 'This is where the page starts feeling like a thinking tool for art directors, not a SaaS report.',
        cta: 'Read the intelligence layer',
        cards: [
            {
                eyebrow: 'Audience',
                title: 'Identity cue concentration',
                body: 'Maps which social and cultural cues are doing the heaviest work inside the image.',
                detail: 'It reveals whether the piece is speaking to a person or merely styling for one.',
                glyph: 'circular',
            },
            {
                eyebrow: 'Category',
                title: 'Position contour',
                body: 'Plots how the work sits inside the category without flattening it into a benchmark graph.',
                detail: 'The question is whether the brand enters as peer, challenger, or sovereign.',
                glyph: 'square',
            },
            {
                eyebrow: 'Perception',
                title: 'Interpretation route',
                body: 'Shows the most likely route from first glance to perceived value and desire.',
                detail: 'A strong route directs attention while leaving enough unresolved to hold interest.',
                glyph: 'route',
            },
        ],
    },
    MECHANICS: {
        eyebrow: 'Mechanics',
        title: 'Trace the route the eye is being asked to take.',
        body: 'This is the visual side of sequencing: entry point, pressure, diversion, release, and whether the structure supports the intent.',
        note: 'Interaction here should feel like diagramming a move, not revealing a gimmick.',
        cta: 'Study the mechanics',
        cards: [
            {
                eyebrow: 'Entry',
                title: 'Attention intake map',
                body: 'Identifies the first visual anchor and whether the opening move is earned or forced.',
                detail: 'The first hold should feel inevitable, not accidental.',
                glyph: 'circular',
            },
            {
                eyebrow: 'Flow',
                title: 'Compositional routing grid',
                body: 'Breaks the frame into directional lanes to show where energy gets held, leaked, or redirected.',
                detail: 'Good composition routes motion before the viewer notices it is happening.',
                glyph: 'square',
            },
            {
                eyebrow: 'Outcome',
                title: 'Decision momentum path',
                body: 'Draws the line between intrigue and product arrival so the strategy remains visible.',
                detail: 'If the line is too smooth, the piece becomes obvious. If too broken, it loses purchase.',
                glyph: 'route',
            },
        ],
    },
    PSYCHOLOGY: {
        eyebrow: 'Psychology',
        title: 'Read the emotional architecture inside the frame.',
        body: 'The work is not just visual. It is cueing reassurance, distance, authority, desire, and permission all at once. These diagrams make that legible.',
        note: 'More blueprint than dashboard. More route than metric.',
        cta: 'Read the psychology layer',
        cards: [
            {
                eyebrow: 'Psychology',
                title: 'Trigger distribution map',
                body: 'Visualize how a frame holds attention, withholds meaning, and routes identity cues toward a central emotional read.',
                detail: 'The strongest work balances emotional charge with deliberate restraint.',
                glyph: 'circular',
            },
            {
                eyebrow: 'Blueprint',
                title: 'Constraint and composition trace',
                body: 'Square routing diagrams echo the inside product: structural, precise, and directional without collapsing into a chart.',
                detail: 'The composition becomes readable as an argument, not just a style choice.',
                glyph: 'square',
            },
            {
                eyebrow: 'Mechanics',
                title: 'Strategic route overlay',
                body: 'A live route line suggests how the system thinks through tension, friction, and decision momentum.',
                detail: 'It feels like seeing the logic under the image rather than a score applied on top.',
                glyph: 'route',
            },
        ],
    },
    'CONSTRAINT MAP': {
        eyebrow: 'Constraint Map',
        title: 'See where the work is boxed in, and whether that helps.',
        body: 'Some tension creates precision. Some tension creates collapse. This layer reads the limits shaping the piece and what they cost.',
        note: 'Constraint can sharpen a visual system, but it can also make the work over-controlled.',
        cta: 'Map the constraints',
        cards: [
            {
                eyebrow: 'Boundaries',
                title: 'Pressure ring',
                body: 'Measures how tightly the visual world is being held around one idea or promise.',
                detail: 'If the ring is too tight, the creative cannot breathe.',
                glyph: 'circular',
            },
            {
                eyebrow: 'Structure',
                title: 'Compression grid',
                body: 'Shows where layout, product, and copy are competing for limited space and attention.',
                detail: 'Useful when a piece looks expensive but still feels overcrowded.',
                glyph: 'square',
            },
            {
                eyebrow: 'Release',
                title: 'Escape route',
                body: 'Traces the visual exits that let the viewer recover from density and return with clarity.',
                detail: 'Without a release path, complexity becomes exhaustion.',
                glyph: 'route',
            },
        ],
    },
    'BLUEPRINT TRACE': {
        eyebrow: 'Blueprint Trace',
        title: 'Turn the composition into a readable plan.',
        body: 'This mode surfaces the skeleton behind the frame so teams can talk about construction, not just instinct or taste.',
        note: 'It helps creative conversations stay specific without becoming sterile.',
        cta: 'Trace the blueprint',
        cards: [
            {
                eyebrow: 'Framework',
                title: 'Core geometry read',
                body: 'Reduces the image to its essential holding structure and rhythm.',
                detail: 'You can see what the work stands on before discussing styling or mood.',
                glyph: 'circular',
            },
            {
                eyebrow: 'Build',
                title: 'Grid and alignment study',
                body: 'Exposes the invisible discipline carrying the image so teams can refine it intentionally.',
                detail: 'The best compositions feel free because the structure underneath is exact.',
                glyph: 'square',
            },
            {
                eyebrow: 'Route',
                title: 'Narrative line',
                body: 'Follows how the visual structure guides the reading order from first signal to final proposition.',
                detail: 'This is where direction becomes tangible.',
                glyph: 'route',
            },
        ],
    },
    'STRESS LAB': {
        eyebrow: 'Stress Lab',
        title: 'Push the piece until its weak points show up.',
        body: 'A useful homepage needs moments of tension. This mode suggests how the work behaves when attention is fragmented or patience is low.',
        note: 'The point is not failure. It is discovering what survives pressure.',
        cta: 'Enter the stress lab',
        cards: [
            {
                eyebrow: 'Load',
                title: 'Signal durability map',
                body: 'Tests which cues still read when the viewer gives the frame less time and less generosity.',
                detail: 'Durable signals stay legible even when attention is thin.',
                glyph: 'circular',
            },
            {
                eyebrow: 'Failure',
                title: 'Breakpoint grid',
                body: 'Reveals where density, ambiguity, or hierarchy start to fracture under pressure.',
                detail: 'This turns vague discomfort into something a team can actually fix.',
                glyph: 'square',
            },
            {
                eyebrow: 'Recovery',
                title: 'Correction route',
                body: 'Highlights the fastest path back to clarity once the work starts losing control of the read.',
                detail: 'A smart correction preserves the tone while repairing the sequence.',
                glyph: 'route',
            },
        ],
    },
    'MARKET PULSE': {
        eyebrow: 'Market Pulse',
        title: 'Place the work in the field without turning it into ad surveillance.',
        body: 'The point is category sensitivity, not scraping. It is about understanding visual pressure and brand posture in context.',
        note: 'This keeps the tool clearly on the side of creative analysis, not ad spying.',
        cta: 'Read the market pulse',
        cards: [
            {
                eyebrow: 'Field',
                title: 'Category pressure map',
                body: 'Surfaces the dominant visual cues shaping expectation across the surrounding market.',
                detail: 'It clarifies what feels current, overused, or still distinct.',
                glyph: 'circular',
            },
            {
                eyebrow: 'Position',
                title: 'Competitive shape trace',
                body: 'Shows where the piece overlaps the category and where it establishes its own territory.',
                detail: 'Useful when a creative is polished but not yet ownable.',
                glyph: 'square',
            },
            {
                eyebrow: 'Motion',
                title: 'Differentiation route',
                body: 'Draws the line from familiar entry point to distinctive finish without forcing novelty for its own sake.',
                detail: 'Distinctiveness should feel authored, not performative.',
                glyph: 'route',
            },
        ],
    },
};

function CircularMazeGlyph({ active }: { active: boolean }) {
    const reduceMotion = useReducedMotion();

    return (
        <svg viewBox="0 0 240 240" className="h-full w-full" aria-hidden="true">
            <g fill="none" stroke="currentColor" strokeWidth="5" strokeLinecap="square">
                <path d="M120 26 A94 94 0 1 1 53 52" opacity="0.94" />
                <path d="M120 46 A74 74 0 1 1 66 66" opacity="0.88" />
                <path d="M120 66 A54 54 0 1 1 80 80" opacity="0.82" />
                <path d="M120 86 A34 34 0 1 1 95 95" opacity="0.78" />
                <path d="M120 106 A14 14 0 1 1 110 110" opacity="0.72" />
                <path d="M120 214 L120 148 L138 148 L138 122" />
                <path d="M52 120 L70 120" />
                <path d="M170 120 L188 120" />
                <path d="M120 26 L120 40" />
            </g>
            <motion.circle
                cx="138"
                cy="122"
                r="7"
                fill="#00E5FF"
                initial={false}
                animate={
                    reduceMotion
                        ? { opacity: active ? 1 : 0.5, scale: 1 }
                        : { opacity: active ? 1 : 0.45, scale: active ? [1, 1.14, 1] : 1 }
                }
                transition={{ duration: 1.8, repeat: active && !reduceMotion ? Number.POSITIVE_INFINITY : 0, ease: 'easeInOut' }}
            />
        </svg>
    );
}

function SquareMazeGlyph({ active }: { active: boolean }) {
    const reduceMotion = useReducedMotion();

    return (
        <svg viewBox="0 0 240 240" className="h-full w-full" aria-hidden="true">
            <g fill="none" stroke="currentColor" strokeWidth="5" strokeLinecap="square" strokeLinejoin="miter">
                <rect x="30" y="30" width="180" height="180" />
                <path d="M30 70 H90 V50 H130 V90 H170 V50 H210" />
                <path d="M50 30 V90 H90 V130 H50 V170 H110" />
                <path d="M150 30 V70 H190 V110 H150 V150 H210" />
                <path d="M70 210 V170 H130 V130 H170 V190 H110" />
                <path d="M110 90 V50" />
                <path d="M130 110 V170" />
                <path d="M90 130 H150" />
                <path d="M70 150 H110" />
            </g>
            <motion.path
                d="M30 70 H90 V50 H130 V90 H170 V50 H210"
                fill="none"
                stroke="#00E5FF"
                strokeWidth="4"
                strokeLinecap="round"
                initial={false}
                animate={reduceMotion ? { opacity: active ? 1 : 0.35 } : { pathLength: active ? 1 : 0.42, opacity: active ? 1 : 0.35 }}
                transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            />
        </svg>
    );
}

function RouteGlyph({ active }: { active: boolean }) {
    const reduceMotion = useReducedMotion();

    return (
        <svg viewBox="0 0 240 240" className="h-full w-full" aria-hidden="true">
            <g fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="square">
                <rect x="32" y="32" width="176" height="176" />
                <path d="M32 70 H88 V50 H120 V102 H76 V132 H152 V88 H188 V144 H132 V176 H208" />
                <path d="M60 208 V160 H104 V118 H168 V62 H208" />
                <path d="M32 118 H60 V88 H104" />
                <path d="M152 208 V144" />
                <path d="M120 32 V70" />
            </g>
            <motion.g
                fill="none"
                stroke="#00E5FF"
                strokeWidth="4.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                initial={false}
                animate={reduceMotion ? { opacity: active ? 1 : 0.5 } : { opacity: active ? 1 : 0.5 }}
                transition={{ duration: 0.6 }}
            >
                <motion.path
                    d="M32 118 H60 V88 H104 V50 H120 V102 H76 V132 H152 V88 H188"
                    initial={false}
                    animate={reduceMotion ? { opacity: active ? 1 : 0.45 } : { pathLength: active ? 1 : 0.2, opacity: active ? 1 : 0.45 }}
                    transition={{ duration: 0.95, ease: [0.16, 1, 0.3, 1] }}
                />
                <motion.path
                    d="M120 102 L168 62"
                    initial={false}
                    animate={reduceMotion ? { opacity: active ? 0.7 : 0.2 } : { pathLength: active ? 1 : 0, opacity: active ? 0.7 : 0.2 }}
                    transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                />
                <motion.path
                    d="M188 88 V144 H132 V176 H208"
                    initial={false}
                    animate={reduceMotion ? { opacity: active ? 1 : 0.45 } : { pathLength: active ? 1 : 0.24, opacity: active ? 1 : 0.45 }}
                    transition={{ duration: 1, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
                />
            </motion.g>
            <circle cx="32" cy="118" r="4.5" fill="#00FF66" />
            <motion.circle
                cx="188"
                cy="88"
                r="4.5"
                fill="#FF003C"
                initial={false}
                animate={reduceMotion ? { scale: 1, opacity: active ? 1 : 0.65 } : { scale: active ? [1, 1.3, 1] : 1, opacity: active ? 1 : 0.65 }}
                transition={{ duration: 1.6, repeat: active && !reduceMotion ? Number.POSITIVE_INFINITY : 0, ease: 'easeInOut' }}
            />
        </svg>
    );
}

function RouteDivider() {
    const reduceMotion = useReducedMotion();

    return (
        <div className="flex items-center justify-center py-6 text-white/20" aria-hidden="true">
            <svg viewBox="0 0 420 56" className="h-10 w-full max-w-[420px]">
                <g fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M10 40 H92 L132 12 L188 44 L262 14 L326 42 H410" opacity="0.28" />
                    <motion.path
                        d="M10 40 H92 L132 12 L188 44 L262 14 L326 42 H410"
                        initial={reduceMotion ? false : { pathLength: 0.22 }}
                        whileInView={reduceMotion ? undefined : { pathLength: 1 }}
                        viewport={{ once: true, amount: 0.8 }}
                        transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
                    />
                </g>
                <circle cx="10" cy="40" r="3.5" fill="#00FF66" />
                <circle cx="410" cy="42" r="3.5" fill="#FF003C" />
            </svg>
        </div>
    );
}

function DiagramGlyph({ kind, active }: { kind: GlyphKind; active: boolean }) {
    if (kind === 'circular') {
        return <CircularMazeGlyph active={active} />;
    }

    if (kind === 'square') {
        return <SquareMazeGlyph active={active} />;
    }

    return <RouteGlyph active={active} />;
}

function DiagramCard({
    card,
    active,
    onFocus,
    onBlur,
}: {
    card: DiagramCardContent;
    active: boolean;
    onFocus: () => void;
    onBlur: () => void;
}) {
    return (
        <motion.article
            layout
            onMouseEnter={onFocus}
            onFocus={onFocus}
            onMouseLeave={onBlur}
            onBlur={onBlur}
            whileHover={{ y: -6 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className={`group relative border p-6 shadow-[0_20px_40px_rgba(0,0,0,0.8)] transition-colors duration-300 ${
                active ? 'border-[#00E5FF] bg-[#00E5FF]/10 text-white' : 'border-white/10 bg-[#0A0A0A] text-white'
            }`}
        >
            <motion.div
                initial={false}
                animate={{ opacity: active ? 1 : 0, scaleX: active ? 1 : 0.65 }}
                className="absolute inset-x-0 top-0 h-px origin-left bg-[#00E5FF]"
            />
            <div className="flex items-start justify-between gap-4 border-b border-white/10 pb-4">
                <div>
                    <p className="text-[9px] font-black uppercase tracking-[0.3em] text-[#00E5FF]">{card.eyebrow}</p>
                    <h3 className="mt-3 max-w-[16ch] text-[24px] font-black leading-[1.02] tracking-[-0.04em] text-white">
                        {card.title}
                    </h3>
                </div>
                <div className="mt-1 hidden text-[9px] font-black uppercase tracking-[0.26em] text-white/40 sm:block">
                    {active ? 'Active read' : 'Hover to trace'}
                </div>
            </div>

            <div className="mx-auto mt-8 aspect-square w-full max-w-[240px] text-white">
                <DiagramGlyph kind={card.glyph} active={active} />
            </div>

            <p className="mt-8 text-[14px] leading-[1.7] text-white/60">{card.body}</p>
            <p className="mt-4 border-t border-white/10 pt-4 text-[10px] font-black uppercase tracking-[0.2em] text-[#00E5FF]">
                {card.detail}
            </p>
        </motion.article>
    );
}

export default function VisualAnalyticsAtlas() {
    const [activeTab, setActiveTab] = useState<TabKey>('PSYCHOLOGY');
    const [hoveredCard, setHoveredCard] = useState(2);
    const activeContent = TAB_CONTENT[activeTab];

    const handleTabChange = (tab: TabKey) => {
        startTransition(() => {
            setActiveTab(tab);
            setHoveredCard(2);
        });
    };

    return (
        <section className="relative overflow-hidden bg-[#050505] text-white py-28 lg:py-40" data-presence-tone="dark">
            <div className="pointer-events-none absolute inset-0 opacity-[0.55]" aria-hidden="true">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_10%_20%,rgba(0,229,255,0.08)_0%,rgba(0,229,255,0)_26%),radial-gradient(circle_at_84%_74%,rgba(255,0,60,0.08)_0%,rgba(255,0,60,0)_28%)]" />
            </div>

            <div className="relative mx-auto max-w-[1400px] px-6 sm:px-8 lg:px-10">
                <div className="overflow-x-auto border-y border-white/10 py-4">
                    <div className="flex min-w-max items-center gap-2 pr-6">
                        {ANALYSIS_TABS.map((tab) => {
                            const active = tab === activeTab;

                            return (
                                <motion.button
                                    key={tab}
                                    type="button"
                                    onClick={() => handleTabChange(tab)}
                                    whileHover={{ y: -1 }}
                                    whileTap={{ scale: 0.985 }}
                                    className={`relative overflow-hidden border px-3 py-2 text-[10px] font-black uppercase tracking-[0.24em] transition-colors duration-300 ${
                                        active
                                            ? 'border-[#00E5FF] bg-[#00E5FF]/10 text-white text-[#00E5FF]'
                                            : 'border-transparent text-white/40 hover:border-white/10 hover:bg-[#0A0A0A] text-white'
                                    }`}
                                >
                                    {active ? (
                                        <motion.span
                                            layoutId="atlas-tab-highlight"
                                            className="absolute inset-0 border border-[#FF003C] mix-blend-multiply"
                                            transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                                        />
                                    ) : null}
                                    <span className="relative">{tab}</span>
                                </motion.button>
                            );
                        })}
                    </div>
                </div>

                <div className="mt-10 grid gap-12 lg:grid-cols-[0.34fr_0.66fr] lg:gap-16">
                    <div className="flex flex-col justify-between">
                        <div>
                            <p className="text-[10px] font-black uppercase tracking-[0.46em] text-[#FF003C]">
                                The Visual Side Of Analytics
                            </p>

                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={activeTab}
                                    initial={{ opacity: 0, y: 18 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -12 }}
                                    transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                                >
                                    <p className="mt-7 text-[10px] font-black uppercase tracking-[0.28em] text-[#00FF66]">
                                        {activeContent.eyebrow}
                                    </p>
                                    <h2 className="mt-5 max-w-[11ch] text-[40px] font-black leading-[0.92] tracking-[-0.05em] text-white sm:text-[56px] lg:text-[82px]">
                                        {activeContent.title}
                                    </h2>
                                    <p className="mt-8 max-w-[34rem] text-[16px] leading-[1.8] text-[#A0A0A0]">
                                        {activeContent.body}
                                    </p>
                                    <p className="mt-5 max-w-[31rem] text-[11px] font-black uppercase tracking-[0.22em] text-[#00FF66]">
                                        {activeContent.note}
                                    </p>
                                </motion.div>
                            </AnimatePresence>
                        </div>

                        <div className="mt-10 border-t border-white/10 pt-5">
                            <p className="text-[9px] font-black uppercase tracking-[0.3em] text-[#00E5FF]">Interaction note</p>
                            <p className="mt-3 max-w-[28rem] text-[14px] leading-[1.75] text-white/60">
                                Click through the analytical modes, then hover a card to trace its route. The motion is there to explain the system, not decorate it.
                            </p>
                            <a
                                href="/trust-method"
                                className="mt-7 inline-flex items-center gap-2 border-b border-transparent pb-1 text-[10px] font-black uppercase tracking-[0.28em] text-white transition hover:border-white/30 hover:text-[#00E5FF]"
                            >
                                {activeContent.cta}
                                <ArrowUpRight size={14} />
                            </a>
                        </div>
                    </div>

                    <div className="grid gap-5 md:grid-cols-3">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={activeTab}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -16 }}
                                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                                className="grid gap-5 md:col-span-3 md:grid-cols-3"
                            >
                                {activeContent.cards.map((card, index) => (
                                    <DiagramCard
                                        key={`${activeTab}-${card.title}`}
                                        card={card}
                                        active={hoveredCard === index}
                                        onFocus={() => setHoveredCard(index)}
                                        onBlur={() => setHoveredCard(2)}
                                    />
                                ))}
                            </motion.div>
                        </AnimatePresence>
                    </div>
                </div>

                <RouteDivider />
            </div>
        </section>
    );
}
