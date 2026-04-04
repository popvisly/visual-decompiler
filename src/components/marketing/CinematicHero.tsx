'use client';

import { useRef } from 'react';
import Image from 'next/image';
import { motion, useScroll, useTransform, type MotionValue } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { HOMEPAGE_PRIMARY_CTA, HOMEPAGE_CTA_ICON } from '@/components/marketing/ctaStyles';
import { SAMPLE_DOSSIER_HREF } from '@/lib/sample-dossier';

const FINDINGS = [
    { label: `What it's doing`, value: 'Status-coded restraint creates desire without tipping into explanation.' },
    { label: 'What weakens it', value: 'The product read lands a touch late once atmosphere takes over.' },
    { label: 'What to change', value: 'Keep the authority. Tighten the moment of product arrival.' },
] as const;

function EditorialPanel({
    src,
    alt,
    y,
    className,
    priority = false,
    caption,
}: {
    src: string;
    alt: string;
    y: MotionValue<string>;
    className: string;
    priority?: boolean;
    caption?: string;
}) {
    return (
        <motion.div
            style={{ y }}
            className={`relative overflow-hidden border border-[#D8CCB5] bg-[#F7F1E7] shadow-[0_24px_48px_rgba(20,20,20,0.08)] ${className}`}
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

export default function CinematicHero() {
    const containerRef = useRef<HTMLElement>(null);
    const { scrollYProgress } = useScroll({ target: containerRef, offset: ['start start', 'end start'] });

    const heroY = useTransform(scrollYProgress, [0, 1], ['0%', '10%']);
    const leftRailY = useTransform(scrollYProgress, [0, 1], ['0px', '32px']);
    const mainPanelY = useTransform(scrollYProgress, [0, 1], ['0px', '-26px']);
    const rightRailY = useTransform(scrollYProgress, [0, 1], ['0px', '18px']);
    const dossierY = useTransform(scrollYProgress, [0, 1], ['0px', '-34px']);

    return (
        <section
            ref={containerRef}
            className="relative overflow-hidden bg-[#F3EEE4]"
            style={{ minHeight: '980px' }}
            data-presence-tone="bone"
        >
            <div className="pointer-events-none absolute inset-0" aria-hidden="true">
                <motion.div
                    style={{ y: heroY }}
                    className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(212,165,116,0.18)_0%,rgba(212,165,116,0)_34%),radial-gradient(circle_at_80%_18%,rgba(20,20,20,0.07)_0%,rgba(20,20,20,0)_32%)]"
                />
                <div className="absolute inset-x-0 top-0 h-px bg-[#DED4C3]" />
                <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#FBFBF6] to-transparent" />
            </div>

            <div className="relative mx-auto max-w-[1400px] px-6 pb-20 pt-28 sm:px-8 lg:px-10 lg:pb-28 lg:pt-36">
                <div className="grid gap-14 lg:grid-cols-[0.37fr_0.63fr] lg:items-end lg:gap-12">
                    <motion.div
                        initial={{ opacity: 0, y: 24 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                        className="relative z-10 max-w-[440px] lg:pb-20"
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

                        <p className="mt-8 max-w-[32rem] text-[16px] leading-[1.78] text-[#4E463C]">
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
                        <div className="mt-10 flex items-center gap-4 text-[#8C7A60]">
                            <div className="h-px w-14 bg-[#D8CCB5]" />
                            <div className="h-7 w-7">
                                <HeroSignalGlyph />
                            </div>
                            <div className="h-px w-24 bg-[#D8CCB5]" />
                        </div>
                    </motion.div>

                    <div className="relative min-h-[760px] lg:min-h-[840px]">
                        <motion.div
                            style={{ y: leftRailY }}
                            className="absolute left-0 top-8 z-10 hidden w-[19%] flex-col gap-6 lg:flex"
                        >
                            <EditorialPanel
                                src="/images/examples/Miss_DIOR.jpg"
                                alt="Miss Dior campaign"
                                y={leftRailY}
                                className="aspect-[0.72] rounded-[1.8rem]"
                                caption="Held posture"
                            />
                            <div className="border-t border-[#D8CCB5] pt-4">
                                <p className="text-[10px] font-black uppercase tracking-[0.34em] text-[#B18B5E]">For Working Creatives</p>
                                <p className="mt-3 text-[14px] leading-[1.7] text-[#534A3E]">
                                    A visual read that belongs in reviews, pitches, and internal creative rooms.
                                </p>
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 24 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 1, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
                            style={{ y: mainPanelY }}
                            className="absolute left-0 right-0 top-0 mx-auto w-full max-w-[760px] lg:left-[18%] lg:right-[16%]"
                        >
                            <EditorialPanel
                                src="/images/examples/Chanel_No5.webp"
                                alt="Chanel No.5 campaign"
                                y={mainPanelY}
                                className="aspect-[0.9] rounded-[2.4rem]"
                                priority
                                caption="Reference frame"
                            />
                        </motion.div>

                        <motion.div
                            style={{ y: rightRailY }}
                            className="absolute right-0 top-10 z-10 hidden w-[22%] flex-col gap-6 lg:flex"
                        >
                            <EditorialPanel
                                src="/images/examples/valentino-voce-viva.png"
                                alt="Valentino Voce Viva campaign"
                                y={rightRailY}
                                className="aspect-[0.72] rounded-[1.8rem]"
                                caption="Identity signal"
                            />
                            <EditorialPanel
                                src="/images/examples/ACNE.png"
                                alt="ACNE Studios campaign"
                                y={rightRailY}
                                className="aspect-[0.78] rounded-[1.8rem]"
                                caption="Texture restraint"
                            />
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 40 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 1, delay: 0.28, ease: [0.16, 1, 0.3, 1] }}
                            style={{ y: dossierY }}
                            className="absolute bottom-0 left-0 right-0 z-20 lg:left-auto lg:right-[2%] lg:w-[390px]"
                        >
                            <div className="border border-[#D9CCB8] bg-[rgba(255,251,244,0.96)] p-5 shadow-[0_34px_68px_rgba(20,20,20,0.14)] backdrop-blur-xl sm:p-6">
                                <div className="mb-5 flex items-center justify-between gap-4">
                                    <div>
                                        <p className="text-[9px] font-black uppercase tracking-[0.38em] text-[#D4A574]">Creative Reading</p>
                                        <p className="mt-1 text-[12px] font-medium tracking-tight text-[#5E5A53]">Miss Dior · print still</p>
                                    </div>
                                    <div className="flex items-center gap-1.5 border border-[#D4A574]/30 bg-[#F8F3EA] px-3 py-1.5">
                                        <span className="h-1.5 w-1.5 rounded-full bg-[#D4A574]" />
                                        <span className="text-[10px] font-bold text-[#5E5A53]">Creative read</span>
                                    </div>
                                </div>

                                <div className="space-y-3">
                                    {FINDINGS.map((f) => (
                                        <div key={f.label} className="border border-[#E6DDCF] bg-[#FBFBF6] px-4 py-3">
                                            <p className="text-[9px] font-black uppercase tracking-[0.3em] text-[#D4A574]">{f.label}</p>
                                            <p className="mt-1.5 text-[13px] leading-snug text-[#141414]">{f.value}</p>
                                        </div>
                                    ))}
                                </div>

                                <div className="mt-5 flex flex-col gap-3 sm:flex-row">
                                    <a href={SAMPLE_DOSSIER_HREF} className={`${HOMEPAGE_PRIMARY_CTA} flex-1 text-center justify-center`}>
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
                            </div>
                        </motion.div>

                        <div className="mt-10 grid gap-4 pt-[28rem] sm:pt-[34rem] lg:hidden">
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
