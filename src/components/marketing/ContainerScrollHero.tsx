'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight, Layers3, BadgeInfo, Orbit, Archive } from 'lucide-react';
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
                            <div className="relative grid items-start gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-14">
                                <div className="relative text-left">
                                    <div className="pointer-events-none absolute -left-10 top-10 h-56 w-56 rounded-full bg-[#D4A574]/12 blur-3xl" aria-hidden="true" />
                                    <p className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-white/70 px-4 py-2 text-[10px] font-bold uppercase tracking-[0.34em] text-[#8B6A3D] shadow-sm backdrop-blur">
                                        Forensic archive
                                        <span className="h-1.5 w-1.5 rounded-full bg-[#D4A574]" />
                                        Decision-grade
                                    </p>

                                    <h1 className="mt-7 max-w-[18ch] text-[clamp(46px,5.8vw,92px)] font-black uppercase leading-[0.92] tracking-[-0.045em] text-[#141414]">
                                        Turn creative into{' '}
                                        <span className="relative inline-block text-[#141414]">
                                            decision-grade
                                            <span className="absolute -bottom-2 left-0 h-[10px] w-full rounded-full bg-[#D4A574]/35" aria-hidden="true" />
                                        </span>
                                        <span className="block text-[#D4A574]">intelligence.</span>
                                    </h1>

                                    <div className="mt-7 max-w-xl space-y-1">
                                        <p className="text-[18px] font-medium leading-relaxed text-[#141414] md:text-[20px]">
                                            Most content doesn&apos;t fail because it&apos;s bad.
                                        </p>
                                        <p className="text-[18px] font-medium leading-relaxed text-[#141414] md:text-[20px]">
                                            It fails because it has no role.
                                        </p>
                                    </div>

                                    <p className="mt-6 max-w-xl text-[15px] leading-relaxed text-[#6B6B6B] md:text-[16px]">
                                        Decompile single frames or sequences into a saved, comparable dossier — built for modern social workflows and client-room decisions.
                                    </p>

                                    <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center">
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
                                    <div className="rounded-[28px] border border-black/10 bg-white/80 p-7 text-left shadow-[0_24px_80px_rgba(20,20,20,0.10)] backdrop-blur">
                                        <p className="text-[10px] font-bold uppercase tracking-[0.34em] text-[#8B6A3D]/80">New analysis modules</p>
                                        <p className="mt-3 text-[15px] font-semibold leading-relaxed text-[#141414]">
                                            Built to refine fast AI creative before it turns into slop.
                                        </p>

                                        <div className="mt-7 space-y-3">
                                            {[
                                                {
                                                    icon: Layers3,
                                                    title: 'Multi-frame sequences',
                                                    body: 'Hook → proof → CTA coherence + fix order.',
                                                },
                                                {
                                                    icon: Orbit,
                                                    title: 'Gaze overlay',
                                                    body: 'Heuristic attention routing you can explain.',
                                                },
                                                {
                                                    icon: BadgeInfo,
                                                    title: 'Micro-clarifiers',
                                                    body: 'Inline definitions for non-specialists.',
                                                },
                                                {
                                                    icon: Archive,
                                                    title: 'Vault memory',
                                                    body: 'Every read becomes a comparable archive.',
                                                },
                                            ].map((item) => {
                                                const Icon = item.icon;
                                                return (
                                                    <div
                                                        key={item.title}
                                                        className="rounded-2xl border border-black/5 bg-[#FBFBF6] p-5 transition-all hover:bg-white hover:shadow-md"
                                                    >
                                                        <div className="flex items-start gap-4">
                                                            <div className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-white text-[#8B6A3D] shadow-sm">
                                                                <Icon className="h-5 w-5" />
                                                            </div>
                                                            <div className="min-w-0">
                                                                <p className="text-[11px] font-black uppercase tracking-[0.22em] text-[#141414]">
                                                                    {item.title}
                                                                </p>
                                                                <p className="mt-2 text-[13px] font-medium leading-relaxed text-[#6B6B6B]">
                                                                    {item.body}
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                );
                                            })}
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
