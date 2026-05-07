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
                            <div className="relative grid items-start gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14">
                                <div className="relative text-left">
                                    <div className="pointer-events-none absolute -left-12 top-6 h-60 w-60 rounded-full bg-[#D4A574]/10 blur-3xl" aria-hidden="true" />
                                    <div className="flex flex-wrap items-center gap-3">
                                        <p className="text-[10px] font-bold uppercase tracking-[0.34em] text-[#8B6A3D]">
                                            Forensic Extraction System
                                        </p>
                                        <span className="h-1.5 w-1.5 rounded-full bg-[#D4A574]" aria-hidden="true" />
                                        <p className="text-[10px] font-bold uppercase tracking-[0.34em] text-[#6B6B6B]">
                                            Built for the room
                                        </p>
                                    </div>

                                    <h1 className="mt-7 max-w-[22ch] text-[clamp(44px,5.4vw,88px)] font-black uppercase leading-[0.92] tracking-[-0.045em] text-[#141414]">
                                        Creative intelligence
                                        <span className="block">
                                            for{' '}
                                            <span className="relative inline-block text-[#D4A574]">
                                                decisions
                                                <span className="absolute -bottom-2 left-0 h-[10px] w-full rounded-full bg-[#D4A574]/22" aria-hidden="true" />
                                            </span>
                                            .
                                        </span>
                                    </h1>

                                    <p className="mt-6 max-w-xl text-[16px] font-medium leading-relaxed text-[#141414] md:text-[18px]">
                                        Stop guessing. Decompile an ad into a dossier you can defend — with evidence, constraints, and a clear next move.
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

                                    <div className="mt-10 flex flex-wrap items-center gap-2">
                                        {[
                                            { icon: Layers3, label: 'Multi-frame' },
                                            { icon: Orbit, label: 'Gaze overlay' },
                                            { icon: BadgeInfo, label: 'Micro-clarifiers' },
                                            { icon: Archive, label: 'Vault memory' },
                                        ].map((pill) => {
                                            const Icon = pill.icon;
                                            return (
                                                <span
                                                    key={pill.label}
                                                    className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-white/70 px-4 py-2 text-[10px] font-bold uppercase tracking-[0.28em] text-[#6B6B6B] shadow-sm backdrop-blur"
                                                >
                                                    <Icon className="h-3.5 w-3.5 text-[#8B6A3D]" />
                                                    {pill.label}
                                                </span>
                                            );
                                        })}
                                    </div>
                                </div>

                                <aside className="min-w-0">
                                    <div className="overflow-hidden rounded-[28px] border border-black/10 bg-[#0c0c0c] text-white shadow-[0_30px_90px_rgba(0,0,0,0.20)]">
                                        <div className="border-b border-white/10 px-7 py-6">
                                            <p className="text-[10px] font-bold uppercase tracking-[0.34em] text-[#D4A574]">
                                                Dossier Snapshot
                                            </p>
                                            <p className="mt-3 text-[14px] font-medium leading-relaxed text-white/70">
                                                What you get back is structured, not vibes — designed to travel into approvals, briefs, and client rooms.
                                            </p>
                                        </div>

                                        <div className="grid gap-4 px-7 py-7">
                                            <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
                                                <p className="text-[9px] font-black uppercase tracking-[0.34em] text-white/55">Sequence Verdict</p>
                                                <p className="mt-3 text-[14px] font-semibold leading-relaxed text-white/85">
                                                    Hook and CTA disagree — tighten the promise and route attention back to the endpoint.
                                                </p>
                                                <div className="mt-5 flex flex-wrap gap-2">
                                                    {['Hook', 'Proof', 'CTA'].map((tag) => (
                                                        <span key={tag} className="rounded-full border border-white/10 bg-black/30 px-3 py-1 text-[9px] font-black uppercase tracking-[0.26em] text-white/70">
                                                            {tag}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>

                                            <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
                                                <div className="flex items-center justify-between gap-4">
                                                    <p className="text-[9px] font-black uppercase tracking-[0.34em] text-white/55">Gaze Route</p>
                                                    <span className="rounded-full border border-white/10 bg-black/30 px-3 py-1 text-[9px] font-black uppercase tracking-[0.26em] text-[#D4A574]/90">
                                                        heuristic
                                                    </span>
                                                </div>
                                                <svg viewBox="0 0 320 116" className="mt-5 h-[90px] w-full" aria-hidden="true">
                                                    <defs>
                                                        <linearGradient id="vdHeroGaze" x1="0%" y1="0%" x2="100%" y2="0%">
                                                            <stop offset="0%" stopColor="#8B6A3D" />
                                                            <stop offset="50%" stopColor="#D4A574" />
                                                            <stop offset="100%" stopColor="#E0B882" />
                                                        </linearGradient>
                                                    </defs>
                                                    <path d="M 34 84 C 78 30, 132 30, 170 54 C 216 82, 260 90, 288 46" fill="none" stroke="url(#vdHeroGaze)" strokeWidth="3" strokeLinecap="round" />
                                                    <circle cx="34" cy="84" r="6" fill="#8B6A3D" />
                                                    <circle cx="170" cy="54" r="6" fill="#D4A574" />
                                                    <circle cx="288" cy="46" r="6" fill="#E0B882" />
                                                </svg>
                                                <p className="mt-4 text-[12px] font-medium leading-relaxed text-white/65">
                                                    Entry → recognition → endpoint. Useful for routing, not proof.
                                                </p>
                                            </div>
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
