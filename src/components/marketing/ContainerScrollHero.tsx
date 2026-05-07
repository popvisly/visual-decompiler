'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { motion, useReducedMotion } from 'framer-motion';
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

export default function ContainerScrollHero() {
    const prefersReducedMotion = useReducedMotion();
    const [showScrollHint, setShowScrollHint] = useState(true);

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
        <section className="relative overflow-hidden bg-[#FBFBF6] px-6 pt-52 pb-28 md:px-10 md:pt-60 md:pb-40">
            <div
                className="pointer-events-none absolute inset-0 opacity-[0.025] [background-image:linear-gradient(#1A1A1A_1.5px,transparent_1.5px),linear-gradient(90deg,#1A1A1A_1.5px,transparent_1.5px)] [background-size:48px_48px]"
                aria-hidden="true"
            />

            <div className="relative z-10 mx-auto w-full max-w-[1200px]">
                <ContainerScroll
                    titleComponent={
                        <div className="mx-auto max-w-[1100px]">
                            <div className="relative grid items-start gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14">
                                <div className="relative text-left">
                                    <div className="pointer-events-none absolute -left-12 top-6 h-60 w-60 rounded-full bg-[#D4A574]/10 blur-3xl" aria-hidden="true" />
                                    <p className="text-[10px] font-bold uppercase tracking-[0.34em] text-[#8B6A3D]/80">
                                        Forensic Extraction System
                                    </p>

                                    <h1 className="mt-7 max-w-[18ch] text-[clamp(50px,6.1vw,100px)] font-black uppercase leading-[0.9] tracking-[-0.045em] text-[#141414]">
                                        Turn creative
                                        <span className="block">into</span>
                                        <span className="block text-[#D4A574]">decision-grade</span>
                                        <span className="block text-[#D4A574]">intelligence.</span>
                                    </h1>

                                    <div className="mt-8 max-w-xl space-y-1">
                                        <p className="text-[18px] font-medium leading-relaxed text-[#141414] md:text-[20px]">
                                            Most content doesn&apos;t fail because it&apos;s bad.
                                        </p>
                                        <p className="text-[18px] font-medium leading-relaxed text-[#141414] md:text-[20px]">
                                            It fails because it has no role.
                                        </p>
                                    </div>

                                    <p className="mt-7 max-w-xl text-[15px] leading-relaxed text-[#6B6B6B] md:text-[16px]">
                                        Decompile single frames or sequences into a saved, comparable dossier. Understand what it does, how it performs in the feed, and where it fits in a content system.
                                    </p>

                                    <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
                                        <Link href="/ingest" className={MARKETING_PRIMARY_CTA_LG}>
                                            Start Free
                                            <ArrowUpRight className={HOMEPAGE_CTA_ICON} />
                                        </Link>
                                        <Link href="/share/sample-dossier" className={MARKETING_SECONDARY_CTA_LG}>
                                            View Sample Dossier
                                            <ArrowUpRight className={HOMEPAGE_CTA_ICON + ' text-[#8B6A3D]'} />
                                        </Link>
                                    </div>
                                </div>

                                <aside className="min-w-0">
                                    <div className="relative">
                                        <div className="pointer-events-none absolute inset-x-0 -top-10 h-40 bg-gradient-to-b from-[#D4A574]/14 to-transparent blur-2xl" aria-hidden="true" />

                                        <div className="relative mx-auto flex h-[420px] max-w-[520px] items-end justify-center">
                                            {[
                                                { src: '/images/examples/Sony.jpg', alt: 'Example ad 1', x: -90, r: -8, z: 30, s: 1 },
                                                { src: '/images/examples/Watch.png', alt: 'Example ad 2', x: -20, r: -2, z: 20, s: 0.98 },
                                                { src: '/images/examples/ACNE.png', alt: 'Example ad 3', x: 55, r: 4, z: 10, s: 0.96 },
                                                { src: '/images/examples/Chanelad.jpg', alt: 'Example ad 4', x: 120, r: 10, z: 0, s: 0.94 },
                                            ].map((card, idx) => (
                                                <div
                                                    key={card.src}
                                                    className="absolute bottom-0"
                                                    style={{
                                                        transform: `translateX(${card.x}px) rotate(${card.r}deg) scale(${card.s})`,
                                                        zIndex: card.z,
                                                    }}
                                                >
                                                    <div className="relative overflow-hidden rounded-[1.4rem] border border-black/10 bg-white shadow-[0_28px_80px_rgba(20,20,20,0.16)]">
                                                        <Image
                                                            src={card.src}
                                                            alt={card.alt}
                                                            width={280}
                                                            height={350}
                                                            className="h-[350px] w-[280px] object-cover"
                                                        />

                                                        {idx === 0 && !prefersReducedMotion ? (
                                                            <motion.div
                                                                aria-hidden="true"
                                                                initial={{ y: -40, opacity: 0 }}
                                                                animate={{ y: [ -40, 390, -40 ], opacity: [0, 1, 0] }}
                                                                transition={{ duration: 3.6, repeat: Number.POSITIVE_INFINITY, ease: 'easeInOut' }}
                                                                className="pointer-events-none absolute left-0 right-0 h-12 bg-gradient-to-b from-transparent via-[#D4A574]/25 to-transparent"
                                                            />
                                                        ) : null}
                                                    </div>
                                                </div>
                                            ))}
                                        </div>

                                        <div className="mt-6 text-center">
                                            <p className="text-[10px] font-bold uppercase tracking-[0.34em] text-[#8B6A3D]/80">
                                                Intelligence Vault Preview
                                            </p>
                                            <p className="mt-3 text-[14px] font-medium leading-relaxed text-[#6B6B6B]">
                                                Every decompile becomes a comparable artifact in your Vault.
                                            </p>
                                        </div>
                                    </div>
                                </aside>
                            </div>

                            <div className="mt-14 grid gap-4 text-left sm:grid-cols-3">
                                {STEPS.map((item) => (
                                    <div key={item.kicker} className={MARKETING_CARD_PADDED}>
                                        <p className="text-[10px] font-bold uppercase tracking-[0.34em] text-[#8B6A3D]/80">{item.kicker}</p>
                                        <p className="mt-3 text-[13px] font-semibold leading-snug text-[#141414]">{item.title}</p>
                                        <p className="mt-2 text-[13px] font-medium leading-relaxed text-[#6B6B6B]">{item.body}</p>
                                    </div>
                                ))}
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
