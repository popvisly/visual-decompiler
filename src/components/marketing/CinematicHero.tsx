'use client';

import { startTransition, useRef, useState } from 'react';
import Image from 'next/image';
import { motion, type MotionValue } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { HOMEPAGE_PRIMARY_CTA, HOMEPAGE_CTA_ICON } from '@/components/marketing/ctaStyles';
import { SAMPLE_DOSSIER_HREF } from '@/lib/sample-dossier';

type HeroMode = 'posture' | 'arrival' | 'restraint';

const HERO_MODES: {
    id: HeroMode;
    label: string;
    kicker: string;
    statement: string;
    detail: string;
    findingTitle: string;
    findingBody: string;
}[] = [
    {
        id: 'posture',
        label: 'Posture',
        kicker: 'Held posture',
        statement: 'Read how the frame holds authority before a single word explains it.',
        detail: 'The strongest luxury work arrives already decided. The posture is what makes the room trust the image.',
        findingTitle: 'What the posture is doing',
        findingBody: 'Status-coded restraint creates desire without tipping into explanation.',
    },
    {
        id: 'arrival',
        label: 'Arrival',
        kicker: 'Product arrival',
        statement: 'Trace the exact moment the product enters the read and earns its place.',
        detail: 'This is where strategy becomes visible. Too late and the work floats. Too early and it collapses into selling.',
        findingTitle: 'What the arrival controls',
        findingBody: 'The product appears after the emotional hook, but before the frame gives too much away.',
    },
    {
        id: 'restraint',
        label: 'Restraint',
        kicker: 'Texture restraint',
        statement: 'See where the image withholds, compresses, and stays expensive.',
        detail: 'Restraint keeps the frame alive. Once every signal is obvious, the image loses its aftertaste.',
        findingTitle: 'What the restraint protects',
        findingBody: 'Compressed palette and controlled texture keep the read expensive, authored, and difficult to exhaust.',
    },
] as const;

const FINDINGS: Record<HeroMode, { label: string; value: string }[]> = {
    posture: [
        { label: `What it's doing`, value: 'Status-coded restraint creates desire without tipping into explanation.' },
        { label: 'What weakens it', value: 'Message clarity slips once the atmosphere starts carrying too much of the proposition.' },
        { label: 'What to change', value: 'Hold the confidence, then let the product arrive one beat earlier.' },
    ],
    arrival: [
        { label: 'What it controls', value: 'The product reveal lands after intrigue, which preserves premium tension.' },
        { label: 'What weakens it', value: 'Arrival timing loosens when the eye spends too long in atmosphere first.' },
        { label: 'What to change', value: 'Tighten the route from face to object so the product enters with more inevitability.' },
    ],
    restraint: [
        { label: 'What it protects', value: 'The image stays editorial because texture and color never overshare.' },
        { label: 'What weakens it', value: 'One extra signal would tip the composition from luxury control into styling.' },
        { label: 'What to change', value: 'Preserve the restraint and sharpen the product edge rather than adding more cues.' },
    ],
};

function EditorialPanel({
    src,
    alt,
    y,
    className,
    priority = false,
    caption,
    active = true,
}: {
    src: string;
    alt: string;
    y: MotionValue<string> | string;
    className: string;
    priority?: boolean;
    caption?: string;
    active?: boolean;
}) {
    return (
        <motion.div
            style={{ y, opacity: active ? 1 : 0.46, scale: active ? 1 : 0.965 }}
            className={`relative overflow-hidden border border-[#D8CCB5] bg-[#F7F1E7] shadow-[0_24px_48px_rgba(20,20,20,0.08)] transition-[opacity,transform] duration-500 ${className}`}
        >
            <Image src={src} alt={alt} fill className="object-cover" priority={priority} />
            <div className="absolute inset-0 bg-gradient-to-t from-black/18 via-transparent to-transparent" />
            {caption ? (
                <div className="absolute bottom-0 left-0 right-0 border-t border-white/20 bg-[linear-gradient(180deg,rgba(20,20,20,0)_0%,rgba(20,20,20,0.34)_100%)] px-5 py-4">
                    <p className="text-[9px] font-black uppercase tracking-[0.3em] text-white/74">{caption}</p>
                </div>
            ) : null}
        </motion.div>
    );
}

function HeroSignalGlyph() {
    return (
        <svg viewBox="0 0 96 96" className="h-full w-full" aria-hidden="true">
            <g fill="none" stroke="currentColor" strokeWidth="3.25" strokeLinecap="square">
                <path d="M48 10 A38 38 0 1 1 21 21" />
                <path d="M48 24 A24 24 0 1 1 31 31" />
                <path d="M48 86 V58 H58 V48" />
                <path d="M18 48 H28" />
                <path d="M68 48 H78" />
                <path d="M48 10 V18" />
            </g>
        </svg>
    );
}

function HeroRouteOverlay({ mode }: { mode: HeroMode }) {
    const paths: Record<HeroMode, string> = {
        posture: 'M34 212 H120 L170 112 L256 112 L318 78',
        arrival: 'M34 212 H120 L120 160 L196 160 L196 110 L318 110',
        restraint: 'M34 212 H98 L146 164 L212 164 L268 116 L318 116',
    };

    return (
        <svg viewBox="0 0 360 240" className="h-full w-full" aria-hidden="true">
            <g fill="none" stroke="rgba(244,237,226,0.36)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M34 212 H120 L170 112 L256 112 L318 78" opacity="0.32" />
                <path d="M34 212 H120 L120 160 L196 160 L196 110 L318 110" opacity="0.26" />
                <path d="M34 212 H98 L146 164 L212 164 L268 116 L318 116" opacity="0.22" />
            </g>
            <motion.path
                key={mode}
                d={paths[mode]}
                fill="none"
                stroke="#D4A574"
                strokeWidth="3.25"
                strokeLinecap="round"
                strokeLinejoin="round"
                initial={{ pathLength: 0.08, opacity: 0.28 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            />
            <circle cx="34" cy="212" r="4" fill="#4E9A67" />
            <motion.circle
                key={`${mode}-target`}
                cx={mode === 'posture' ? 318 : mode === 'arrival' ? 318 : 318}
                cy={mode === 'posture' ? 78 : mode === 'arrival' ? 110 : 116}
                r="4.5"
                fill="#4C72E0"
                initial={{ scale: 0.8, opacity: 0.5 }}
                animate={{ scale: [1, 1.2, 1], opacity: 1 }}
                transition={{ duration: 1.2, ease: 'easeInOut' }}
            />
        </svg>
    );
}

export default function CinematicHero() {
    const containerRef = useRef<HTMLElement>(null);
    const [activeMode, setActiveMode] = useState<HeroMode>('posture');
    const activeHeroMode = HERO_MODES.find((mode) => mode.id === activeMode) ?? HERO_MODES[0];

    const mainCaption =
        activeMode === 'posture' ? 'Authority frame' : activeMode === 'arrival' ? 'Product arrival' : 'Restraint study';

    return (
        <section
            ref={containerRef}
            className="relative overflow-hidden bg-[#F3EEE4]"
            style={{ minHeight: '1020px' }}
            data-presence-tone="bone"
        >
            <div className="pointer-events-none absolute inset-0" aria-hidden="true">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(212,165,116,0.18)_0%,rgba(212,165,116,0)_34%),radial-gradient(circle_at_80%_18%,rgba(20,20,20,0.07)_0%,rgba(20,20,20,0)_32%)]" />
                <div className="absolute inset-x-0 top-0 h-px bg-[#DED4C3]" />
                <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#FBFBF6] to-transparent" />
            </div>

            <div className="relative mx-auto max-w-[1400px] px-6 pb-20 pt-28 sm:px-8 lg:px-10 lg:pb-28 lg:pt-36">
                <div className="grid gap-16 lg:grid-cols-[0.35fr_0.65fr] lg:items-end lg:gap-12">
                    <motion.div
                        initial={{ opacity: 0, y: 24 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                        className="relative z-10 max-w-[460px] lg:pb-14"
                    >
                        <div className="flex items-end gap-4 border-t border-[#D8CCB5] pt-5">
                            <div className="h-12 w-12 text-[#141414]">
                                <HeroSignalGlyph />
                            </div>
                            <p className="pb-1 text-[10px] font-black uppercase tracking-[0.46em] text-[#B18B5E]">
                                Analysis For Creatives
                            </p>
                        </div>

                        <h1 className="mt-10 text-[42px] font-black leading-[0.9] tracking-[-0.06em] text-[#141414] sm:text-[60px] lg:text-[92px]">
                            See the creative.
                            <br />
                            Read the structure.
                        </h1>

                        <p className="mt-8 max-w-[34rem] text-[16px] leading-[1.78] text-[#4E463C]">
                            Visual Decompiler is built for art directors, strategists, founders, and teams shaping perception. It reads hierarchy, posture, identity pull, and where a piece starts giving too much away.
                        </p>

                        <p className="mt-5 max-w-[26rem] text-[10px] font-black uppercase tracking-[0.26em] text-[#8C7A60]">
                            Not an ad spy tool. Not a scraper. Not AI taste theatre.
                        </p>

                        <div className="mt-10 flex flex-col items-start gap-3 sm:flex-row">
                            <a href={SAMPLE_DOSSIER_HREF} className={HOMEPAGE_PRIMARY_CTA}>
                                <span>Open Sample Read</span>
                                <ArrowUpRight className={HOMEPAGE_CTA_ICON} />
                            </a>
                            <a
                                href="/ingest"
                                className="inline-flex items-center gap-2 border-b border-transparent pb-1 text-[10px] font-black uppercase tracking-[0.28em] text-[#7D6748] transition hover:border-[#7D6748]/30 hover:text-[#1A1712]"
                            >
                                Bring In A Frame
                                <ArrowUpRight size={14} />
                            </a>
                        </div>

                        <div className="mt-12 border-y border-[#D8CCB5] py-5">
                            <div className="flex items-center justify-between gap-4">
                                <p className="text-[9px] font-black uppercase tracking-[0.34em] text-[#B18B5E]">Change the read</p>
                                <p className="hidden text-[9px] font-black uppercase tracking-[0.24em] text-[#8C7A60] sm:block">
                                    One frame. Three analytical entries.
                                </p>
                            </div>
                            <div className="mt-4 grid gap-2 sm:grid-cols-3">
                                {HERO_MODES.map((mode) => {
                                    const active = mode.id === activeMode;

                                    return (
                                        <button
                                            key={mode.id}
                                            type="button"
                                            onClick={() => startTransition(() => setActiveMode(mode.id))}
                                            className={`border px-4 py-4 text-left transition-colors duration-300 ${
                                                active
                                                    ? 'border-[#CBB08F] bg-[#FFF9F0] text-[#141414]'
                                                    : 'border-[#DED4C3] bg-[#F7F1E7] text-[#6A6154] hover:border-[#CBB08F]'
                                            }`}
                                        >
                                            <p className="text-[9px] font-black uppercase tracking-[0.28em] text-[#B18B5E]">{mode.kicker}</p>
                                            <p className="mt-2 text-[16px] font-black leading-tight tracking-[-0.03em]">{mode.label}</p>
                                        </button>
                                    );
                                })}
                            </div>
                            <motion.div
                                key={activeMode}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                                className="mt-5"
                            >
                                <p className="text-[10px] font-black uppercase tracking-[0.28em] text-[#8C7A60]">{activeHeroMode.kicker}</p>
                                <p className="mt-2 text-[18px] font-black leading-[1.15] tracking-[-0.03em] text-[#141414]">
                                    {activeHeroMode.statement}
                                </p>
                                <p className="mt-3 text-[14px] leading-[1.75] text-[#534A3E]">{activeHeroMode.detail}</p>
                            </motion.div>
                        </div>

                        <div className="mt-10 flex items-center gap-4 text-[#8C7A60]">
                            <div className="h-px w-14 bg-[#D8CCB5]" />
                            <div className="h-7 w-7">
                                <HeroSignalGlyph />
                            </div>
                            <div className="h-px w-24 bg-[#D8CCB5]" />
                        </div>
                    </motion.div>

                    <div className="relative min-h-[780px] lg:min-h-[860px]">
                        <div className="absolute left-0 top-12 z-10 hidden w-[18%] flex-col gap-6 lg:flex">
                            <EditorialPanel
                                src="/images/examples/Miss_DIOR.jpg"
                                alt="Miss Dior campaign"
                                y="0px"
                                className="aspect-[0.72] rounded-[1.8rem]"
                                caption="Held posture"
                                active={activeMode === 'posture'}
                            />
                            <div className="border-t border-[#D8CCB5] pt-4">
                                <p className="text-[10px] font-black uppercase tracking-[0.34em] text-[#B18B5E]">For Working Creatives</p>
                                <p className="mt-3 text-[14px] leading-[1.7] text-[#534A3E]">
                                    A visual read that belongs in reviews, pitches, and internal creative rooms.
                                </p>
                            </div>
                        </div>

                        <motion.div
                            initial={{ opacity: 0, y: 24 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 1, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
                            className="absolute left-0 right-0 top-0 mx-auto w-full max-w-[760px] lg:left-[16%] lg:right-[12%]"
                        >
                            <div className="relative">
                                <EditorialPanel
                                    src="/images/examples/Chanel_No5.webp"
                                    alt="Chanel No.5 campaign"
                                    y="0px"
                                    className="aspect-[0.9] rounded-[2.8rem]"
                                    priority
                                    caption={mainCaption}
                                    active
                                />
                                <div className="pointer-events-none absolute inset-x-[8%] bottom-[12%] hidden lg:block">
                                    <div className="rounded-[1.5rem] border border-white/18 bg-[linear-gradient(180deg,rgba(20,20,20,0.1)_0%,rgba(20,20,20,0.38)_100%)] p-4 backdrop-blur-sm">
                                        <div className="flex items-center justify-between gap-6">
                                            <div>
                                                <p className="text-[9px] font-black uppercase tracking-[0.34em] text-white/70">Live entry</p>
                                                <p className="mt-2 max-w-[16rem] text-[18px] font-black leading-[1.05] tracking-[-0.03em] text-white">
                                                    {activeHeroMode.statement}
                                                </p>
                                            </div>
                                            <div className="h-24 w-36 text-white/86">
                                                <HeroRouteOverlay mode={activeMode} />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>

                        <div className="absolute right-0 top-14 z-10 hidden w-[22%] flex-col gap-6 lg:flex">
                            <EditorialPanel
                                src="/images/examples/valentino-voce-viva.png"
                                alt="Valentino Voce Viva campaign"
                                y="0px"
                                className="aspect-[0.72] rounded-[1.8rem]"
                                caption="Product arrival"
                                active={activeMode === 'arrival'}
                            />
                            <EditorialPanel
                                src="/images/examples/ACNE.png"
                                alt="ACNE Studios campaign"
                                y="0px"
                                className="aspect-[0.78] rounded-[1.8rem]"
                                caption="Texture restraint"
                                active={activeMode === 'restraint'}
                            />
                        </div>

                        <motion.div
                            initial={{ opacity: 0, y: 40 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 1, delay: 0.28, ease: [0.16, 1, 0.3, 1] }}
                            className="absolute bottom-0 left-0 right-0 z-20 lg:left-auto lg:right-[1%] lg:w-[410px]"
                        >
                            <motion.div
                                key={activeMode}
                                initial={{ opacity: 0, y: 16 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                                className="border border-[#D9CCB8] bg-[rgba(255,251,244,0.97)] p-5 shadow-[0_34px_68px_rgba(20,20,20,0.14)] backdrop-blur-xl sm:p-6"
                            >
                                <div className="mb-5 flex items-center justify-between gap-4">
                                    <div>
                                        <p className="text-[9px] font-black uppercase tracking-[0.38em] text-[#D4A574]">Creative Reading</p>
                                        <p className="mt-1 text-[12px] font-medium tracking-tight text-[#5E5A53]">Miss Dior · {activeHeroMode.kicker.toLowerCase()}</p>
                                    </div>
                                    <div className="flex items-center gap-1.5 border border-[#D4A574]/30 bg-[#F8F3EA] px-3 py-1.5">
                                        <span className="h-1.5 w-1.5 rounded-full bg-[#D4A574]" />
                                        <span className="text-[10px] font-bold text-[#5E5A53]">{activeHeroMode.label} read</span>
                                    </div>
                                </div>

                                <div className="rounded-[1.25rem] border border-[#E6DDCF] bg-[#FBFBF6] px-4 py-4">
                                    <p className="text-[9px] font-black uppercase tracking-[0.3em] text-[#D4A574]">{activeHeroMode.findingTitle}</p>
                                    <p className="mt-1.5 text-[14px] leading-snug text-[#141414]">{activeHeroMode.findingBody}</p>
                                </div>

                                <div className="mt-3 space-y-3">
                                    {FINDINGS[activeMode].map((finding) => (
                                        <div key={finding.label} className="border border-[#E6DDCF] bg-[#FBFBF6] px-4 py-3">
                                            <p className="text-[9px] font-black uppercase tracking-[0.3em] text-[#D4A574]">{finding.label}</p>
                                            <p className="mt-1.5 text-[13px] leading-snug text-[#141414]">{finding.value}</p>
                                        </div>
                                    ))}
                                </div>

                                <div className="mt-5 flex flex-col gap-3 sm:flex-row">
                                    <a href={SAMPLE_DOSSIER_HREF} className={`${HOMEPAGE_PRIMARY_CTA} flex-1 justify-center text-center`}>
                                        <span>Open Sample Read</span>
                                        <ArrowUpRight className={HOMEPAGE_CTA_ICON} />
                                    </a>
                                    <a
                                        href="/ingest"
                                        className="inline-flex items-center justify-center gap-2 border border-[#D4A574]/30 px-4 py-3 text-[10px] font-black uppercase tracking-[0.18em] text-[#7B6544] transition hover:border-[#D4A574]/60"
                                    >
                                        Bring In A Frame
                                    </a>
                                </div>

                                <p className="mt-4 text-center text-[9px] font-black uppercase tracking-[0.25em] text-[#9A9486]">
                                    Built for reviews, pitches, and internal creative rooms
                                </p>
                            </motion.div>
                        </motion.div>

                        <div className="mt-10 grid gap-4 pt-[31rem] sm:pt-[36rem] lg:hidden">
                            <div className="rounded-[1.5rem] border border-[#D8CCB5] bg-[#FBF8F1] p-4">
                                <p className="text-[9px] font-black uppercase tracking-[0.3em] text-[#B18B5E]">{activeHeroMode.kicker}</p>
                                <p className="mt-2 text-[18px] font-black leading-[1.1] tracking-[-0.03em] text-[#141414]">
                                    {activeHeroMode.statement}
                                </p>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="relative aspect-[0.76] overflow-hidden rounded-[1.5rem] border border-[#D8CCB5]">
                                    <Image src="/images/examples/valentino-voce-viva.png" alt="Valentino Voce Viva campaign" fill className="object-cover" />
                                </div>
                                <div className="relative aspect-[0.76] overflow-hidden rounded-[1.5rem] border border-[#D8CCB5]">
                                    <Image src="/images/examples/ACNE.png" alt="ACNE Studios campaign" fill className="object-cover" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
