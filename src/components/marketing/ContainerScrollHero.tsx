'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { motion, useReducedMotion } from 'framer-motion';
import { track } from '@vercel/analytics';
import { ContainerScroll } from '@/components/marketing/ContainerScroll';
import { HOMEPAGE_CTA_ICON, MARKETING_PRIMARY_CTA_LG, MARKETING_SECONDARY_CTA_LG } from '@/components/marketing/ctaStyles';
import { MARKETING_CARD_PADDED } from '@/components/marketing/cardStyles';

const STEPS = [
    {
        kicker: 'Step 01',
        title: 'Upload the asset.',
        body: 'Start with the exact creative in front of you: work in progress, competitor, or reference (single frame or sequence).',
    },
    {
        kicker: 'Step 02',
        title: 'Run the decision system.',
        body: 'Quality Gate, Mechanics, Psychology, Blueprint Trace, Stress Lab, Market Pulse, and Decision Log keep the read repeatable.',
    },
    {
        kicker: 'Step 03',
        title: 'Ship the decision artifact.',
        body: 'Export a dossier built for alignment, approval, evidence, caveats, and decision language.',
    },
] as const;

const HERO_TYPE_LINES = ['Read the ad.', 'Know the move.'] as const;

function useTypewriter<const T extends readonly string[]>(
    lines: T,
    opts: { enabled: boolean; charDelayMs: number; linePauseMs: number; startDelayMs?: number },
): { [K in keyof T]: string } {
    const { enabled, charDelayMs, linePauseMs, startDelayMs = 0 } = opts;
    const [typed, setTyped] = useState(() => lines.map(() => '') as unknown as { [K in keyof T]: string });

    useEffect(() => {
        if (!enabled) {
            setTyped(lines.map((line) => line) as unknown as { [K in keyof T]: string });
            return;
        }

        let cancelled = false;
        let lineIndex = 0;
        let charIndex = 0;
        let timeoutId: number | null = null;

        const tick = () => {
            if (cancelled) return;
            const currentLine = lines[lineIndex] ?? '';
            const nextCharIndex = Math.min(currentLine.length, charIndex + 1);

            setTyped((prev) => {
                const next = [...(prev as unknown as string[])] as string[];
                next[lineIndex] = currentLine.slice(0, nextCharIndex);
                return next as unknown as { [K in keyof T]: string };
            });

            charIndex = nextCharIndex;

            if (charIndex >= currentLine.length) {
                // Move to next line after a short pause.
                if (lineIndex >= lines.length - 1) return;
                lineIndex += 1;
                charIndex = 0;
                timeoutId = window.setTimeout(tick, linePauseMs);
                return;
            }

            timeoutId = window.setTimeout(tick, charDelayMs);
        };

        timeoutId = window.setTimeout(tick, startDelayMs);

        return () => {
            cancelled = true;
            if (timeoutId) window.clearTimeout(timeoutId);
        };
    }, [enabled, charDelayMs, linePauseMs, startDelayMs, lines]);

    return typed;
}

export default function ContainerScrollHero() {
    const prefersReducedMotion = useReducedMotion();
    const [showScrollHint, setShowScrollHint] = useState(true);
    const typed = useTypewriter(HERO_TYPE_LINES, {
        enabled: !prefersReducedMotion,
        charDelayMs: 34,
        linePauseMs: 420,
        startDelayMs: 120,
    });

    useEffect(() => {
        if (prefersReducedMotion) return;
        const handleScroll = () => {
            if (window.scrollY > 24) setShowScrollHint(false);
        };
        handleScroll();
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, [prefersReducedMotion]);

    return (
        <section className="relative min-h-screen overflow-hidden bg-[#FBFBF6] px-6 pt-[110px] pb-4 md:px-10 md:pt-[120px] md:pb-8">
            <div
                className="pointer-events-none absolute inset-0 opacity-[0.025] [background-image:linear-gradient(#1A1A1A_1.5px,transparent_1.5px),linear-gradient(90deg,#1A1A1A_1.5px,transparent_1.5px)] [background-size:48px_48px]"
                aria-hidden="true"
            />

            <div className="relative z-10 mx-auto w-full max-w-[1500px]">
                <ContainerScroll
                    titleComponent={
                        <div className="mx-auto max-w-[1100px]">
                            <div className="relative">
                                <div className="pointer-events-none absolute inset-x-0 -top-10 mx-auto h-40 max-w-4xl bg-gradient-to-b from-[#D4A574]/12 to-transparent blur-2xl" aria-hidden="true" />

                                <div className="mx-auto max-w-4xl text-center">
                                    <div className="pointer-events-none absolute -left-12 top-6 h-60 w-60 rounded-full bg-[#D4A574]/10 blur-3xl" aria-hidden="true" />

                                    {/* Give Them a Superpower — H1 */}
                                    <h1 className="mt-5 text-[clamp(38px,6.1vw,92px)] font-black uppercase leading-[0.9] tracking-[-0.02em] text-[#141414]">
                                        <span className="sr-only">Read the ad. Know the move.</span>
                                        {prefersReducedMotion ? (
                                            <>
                                                <span className="block">Read the ad.</span>
                                                <span className="block">Know the move.</span>
                                            </>
                                        ) : (
                                            <span className="inline-block text-left">
                                                <span className="block min-h-[0.9em]">{typed[0]}</span>
                                                <span className="block min-h-[0.9em]">{typed[1]}</span>
                                            </span>
                                        )}
                                    </h1>

                                    {/* Give Them a Superpower — sub-headline */}
                                    <p className="mt-8 mx-auto max-w-xl text-[15px] leading-relaxed text-[#6B6B6B] md:text-[16px]">
                                        Upload any ad. Get a forensic breakdown of what it&apos;s doing, why it works, and how to defend the decision. Client-ready in under 60 seconds.
                                    </p>

                                    <div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row sm:items-center">
                                        <Link
                                            href="/ingest"
                                            className={MARKETING_PRIMARY_CTA_LG}
                                            onClick={() => track('cta_start_free', { location: 'home_hero' })}
                                        >
                                            Start Free
                                            <ArrowUpRight className={HOMEPAGE_CTA_ICON} />
                                        </Link>
                                        <Link
                                            href="/sample"
                                            className={MARKETING_SECONDARY_CTA_LG}
                                            onClick={() => track('cta_view_sample_dossier', { location: 'home_hero' })}
                                        >
                                            View Sample Dossier
                                            <ArrowUpRight className={HOMEPAGE_CTA_ICON + ' text-[#8B6A3D]'} />
                                        </Link>
                                    </div>
                                </div>

                                <div className="mt-14">
                                <div className="mx-auto w-full max-w-[1500px]">
                                    <div className="flex items-center justify-center gap-4 md:gap-6 flex-nowrap overflow-x-auto lg:overflow-visible scrollbar-hide pb-2">
                                    {[
                                        { src: '/images/examples/Nike.jpg', alt: 'Nike ad' },
                                        { src: '/images/examples/Ulyses.jpg', alt: 'Ulysse Nardin ad' },
                                        { src: '/images/examples/Crocs.jpg', alt: 'Crocs ad' },
                                        { src: '/images/examples/Chanel_No5.webp', alt: 'Chanel No. 5 ad' },
                                    ].map((card, idx) => (
                                        <div
                                            key={card.src}
                                            className="relative shrink-0"
                                        >
                                            <div className="relative overflow-hidden rounded-[28px] border border-black/10 bg-white">
                                                <Image
                                                    src={card.src}
                                                    alt={card.alt}
                                                    width={240}
                                                    height={310}
                                                    className="h-[260px] w-[210px] object-cover md:h-[310px] md:w-[240px]"
                                                />

                                                {idx === 0 && !prefersReducedMotion ? (
                                                    <motion.div
                                                        aria-hidden="true"
                                                        initial={{ y: -40, opacity: 0 }}
                                                        animate={{ y: [-40, 360, -40], opacity: [0, 1, 0] }}
                                                        transition={{ duration: 3.6, repeat: Number.POSITIVE_INFINITY, ease: 'easeInOut' }}
                                                        className="pointer-events-none absolute left-0 right-0 h-12 bg-gradient-to-b from-transparent via-[#D4A574]/25 to-transparent"
                                                    />
                                                ) : null}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                </div>
                            </div>

                                <div className="mt-14 grid gap-4 text-center sm:grid-cols-3">
                                    {STEPS.map((item) => (
                                        <div key={item.kicker} className={MARKETING_CARD_PADDED}>
                                            <p className="text-[10px] font-bold uppercase tracking-[0.34em] text-[#8B6A3D]/80">{item.kicker}</p>
                                            <p className="mt-3 text-[13px] font-semibold leading-snug text-[#141414]">{item.title}</p>
                                            <p className="mt-2 text-[13px] font-medium leading-relaxed text-[#6B6B6B]">{item.body}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    }
                >
                    <Image
                        src="/images/marketing/decompiler-workspace.png"
                        alt="Visual Decompiler workspace"
                        width={1800}
                        height={1200}
                        className="h-full w-full origin-left scale-[1.01] object-contain"
                        priority
                    />
                </ContainerScroll>

                {!prefersReducedMotion ? (
                    <motion.div
                        initial={{ opacity: 0, y: 6 }}
                        animate={showScrollHint ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                        transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
                        className="pointer-events-none absolute inset-x-0 bottom-10 flex justify-center"
                        aria-hidden="true"
                    >
                        <div className="inline-flex items-center gap-3 rounded-full border border-black/10 bg-white/75 px-5 py-2 text-[10px] font-semibold uppercase tracking-[0.3em] text-[#6B6B6B] shadow-sm backdrop-blur">
                            <span className="h-1.5 w-1.5 rounded-full bg-[#D4A574]" />
                            Scroll to reveal
                        </div>
                    </motion.div>
                ) : null}
            </div>
        </section>
    );
}
