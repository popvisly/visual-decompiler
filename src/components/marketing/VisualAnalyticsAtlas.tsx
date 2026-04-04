import type { ReactNode } from 'react';
import { ArrowUpRight } from 'lucide-react';

const ANALYSIS_TABS = [
    'QUALITY GATE',
    'INTELLIGENCE',
    'MECHANICS',
    'PSYCHOLOGY',
    'CONSTRAINT MAP',
    'BLUEPRINT TRACE',
    'STRESS LAB',
    'MARKET PULSE',
] as const;

function CircularMazeGlyph() {
    return (
        <svg viewBox="0 0 240 240" className="h-full w-full" aria-hidden="true">
            <g fill="none" stroke="currentColor" strokeWidth="5" strokeLinecap="square">
                <path d="M120 26 A94 94 0 1 1 53 52" />
                <path d="M120 46 A74 74 0 1 1 66 66" />
                <path d="M120 66 A54 54 0 1 1 80 80" />
                <path d="M120 86 A34 34 0 1 1 95 95" />
                <path d="M120 106 A14 14 0 1 1 110 110" />
                <path d="M120 214 L120 148 L138 148 L138 122" />
                <path d="M52 120 L70 120" />
                <path d="M170 120 L188 120" />
                <path d="M120 26 L120 40" />
            </g>
        </svg>
    );
}

function SquareMazeGlyph() {
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
        </svg>
    );
}

function RouteGlyph() {
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
            <g fill="none" stroke="#C76E3A" strokeWidth="4.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M32 118 H60 V88 H104 V50 H120 V102 H76 V132 H152 V88 H188" />
                <path d="M120 102 L168 62" opacity="0.7" />
                <path d="M188 88 V144 H132 V176 H208" />
            </g>
            <circle cx="32" cy="118" r="4.5" fill="#4E9A67" />
            <circle cx="188" cy="88" r="4.5" fill="#4C72E0" />
        </svg>
    );
}

function RouteDivider() {
    return (
        <div className="flex items-center justify-center py-6 text-[#7E7568]" aria-hidden="true">
            <svg viewBox="0 0 420 56" className="h-10 w-full max-w-[420px]">
                <g fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M10 40 H92 L132 12 L188 44 L262 14 L326 42 H410" opacity="0.38" />
                    <path d="M10 40 H92 L132 12 L188 44 L262 14 L326 42 H410" />
                </g>
                <circle cx="10" cy="40" r="3.5" fill="#4E9A67" />
                <circle cx="410" cy="42" r="3.5" fill="#4C72E0" />
            </svg>
        </div>
    );
}

function DiagramCard({
    eyebrow,
    title,
    body,
    children,
}: {
    eyebrow: string;
    title: string;
    body: string;
    children: ReactNode;
}) {
    return (
        <article className="border border-[#DED4C3] bg-[#FBF8F1] p-6 shadow-[0_20px_40px_rgba(20,20,20,0.04)]">
            <div className="flex items-start justify-between gap-4 border-b border-[#E3DACA] pb-4">
                <div>
                    <p className="text-[9px] font-black uppercase tracking-[0.3em] text-[#A9875E]">{eyebrow}</p>
                    <h3 className="mt-3 max-w-[16ch] text-[24px] font-black leading-[1.02] tracking-[-0.04em] text-[#141414]">
                        {title}
                    </h3>
                </div>
            </div>
            <div className="mx-auto mt-8 aspect-square w-full max-w-[240px] text-[#141414]">
                {children}
            </div>
            <p className="mt-8 border-t border-[#E3DACA] pt-4 text-[14px] leading-[1.7] text-[#50483D]">{body}</p>
        </article>
    );
}

export default function VisualAnalyticsAtlas() {
    return (
        <section className="relative overflow-hidden bg-[#F6F1E7] py-28 lg:py-40" data-presence-tone="bone">
            <div className="pointer-events-none absolute inset-0 opacity-[0.55]" aria-hidden="true">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_10%_20%,rgba(212,165,116,0.12)_0%,rgba(212,165,116,0)_26%),radial-gradient(circle_at_84%_74%,rgba(20,20,20,0.06)_0%,rgba(20,20,20,0)_28%)]" />
            </div>

            <div className="relative mx-auto max-w-[1400px] px-6 sm:px-8 lg:px-10">
                <div className="overflow-x-auto border-y border-[#DED4C3] py-4">
                    <div className="flex min-w-max items-center gap-6 pr-6">
                        {ANALYSIS_TABS.map((tab) => {
                            const active = tab === 'PSYCHOLOGY';
                            return (
                                <span
                                    key={tab}
                                    className={`border px-3 py-2 text-[10px] font-black uppercase tracking-[0.24em] ${
                                        active
                                            ? 'border-[#4C72E0] text-[#B27F49]'
                                            : 'border-transparent text-[#8B8478]'
                                    }`}
                                >
                                    {tab}
                                </span>
                            );
                        })}
                    </div>
                </div>

                <div className="mt-10 grid gap-12 lg:grid-cols-[0.38fr_0.62fr] lg:gap-16">
                    <div>
                        <p className="text-[10px] font-black uppercase tracking-[0.46em] text-[#B18B5E]">
                            The Visual Side Of Analytics
                        </p>
                        <h2 className="mt-6 max-w-[10ch] text-[40px] font-black leading-[0.92] tracking-[-0.05em] text-[#141414] sm:text-[56px] lg:text-[82px]">
                            Analysis with a visual language.
                        </h2>
                        <p className="mt-8 max-w-[34rem] text-[16px] leading-[1.8] text-[#524A3E]">
                            These maps give the homepage a directional system. They feel analytical, but they stay visual, editorial, and native to the product. More blueprint than dashboard. More route than metric.
                        </p>
                        <p className="mt-5 max-w-[30rem] text-[11px] font-black uppercase tracking-[0.22em] text-[#8C7A60]">
                            Psychology, mechanics, constraint, and blueprint rendered as forms you can read at a glance.
                        </p>
                        <a
                            href="/trust-method"
                            className="mt-9 inline-flex items-center gap-2 border-b border-transparent pb-1 text-[10px] font-black uppercase tracking-[0.28em] text-[#7D6748] transition hover:border-[#7D6748]/30 hover:text-[#1A1712]"
                        >
                            Read The Method
                            <ArrowUpRight size={14} />
                        </a>
                    </div>

                    <div className="grid gap-5 md:grid-cols-3">
                        <DiagramCard
                            eyebrow="Psychology"
                            title="Trigger distribution map"
                            body="Use maze forms to visualize how a frame holds attention, withholds meaning, and routes identity cues toward a central emotional read."
                        >
                            <CircularMazeGlyph />
                        </DiagramCard>

                        <DiagramCard
                            eyebrow="Blueprint"
                            title="Constraint and composition trace"
                            body="Square routing diagrams can break up the long-form page while echoing the inside product: structural, precise, and directional without feeling like a chart."
                        >
                            <SquareMazeGlyph />
                        </DiagramCard>

                        <DiagramCard
                            eyebrow="Mechanics"
                            title="Strategic route overlay"
                            body="A live route line suggests how the system thinks: tracing the strongest path through tension, friction, and decision momentum instead of flattening the work into a score."
                        >
                            <RouteGlyph />
                        </DiagramCard>
                    </div>
                </div>

                <RouteDivider />
            </div>
        </section>
    );
}
