'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { motion, useReducedMotion } from 'framer-motion';
import { ContainerScroll } from '@/components/marketing/ContainerScroll';

const STEPS = [
    {
        kicker: 'Step 01',
        title: 'Upload the asset.',
        body: 'Start with the exact creative in front of you — work in progress, competitor, or reference.',
    },
    {
        kicker: 'Step 02',
        title: 'Read the system tabs.',
        body: 'Mechanics, Psychology, Blueprint Trace, Stress Lab, Market Pulse — the same order you use in the app.',
    },
    {
        kicker: 'Step 03',
        title: 'Walk into the room ready.',
        body: 'Export a dossier built for alignment, approval, and decision language.',
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
        <section className="relative overflow-hidden bg-[#FBFBF6] px-6 pt-28 pb-28 md:px-10 md:pt-32 md:pb-40">
            <div
                className="pointer-events-none absolute inset-0 opacity-[0.025] [background-image:linear-gradient(#1A1A1A_1.5px,transparent_1.5px),linear-gradient(90deg,#1A1A1A_1.5px,transparent_1.5px)] [background-size:48px_48px]"
                aria-hidden="true"
            />

            <div className="relative z-10 mx-auto w-full max-w-[1200px]">
                <ContainerScroll
                    titleComponent={
                        <div className="mx-auto max-w-4xl">
                            <div className="inline-flex items-center gap-3 rounded-full border border-black/10 bg-white/70 px-5 py-2 text-[10px] font-semibold uppercase tracking-[0.28em] text-[#6B6B6B] shadow-sm backdrop-blur">
                                <span className="h-2 w-2 rounded-full bg-[#D4A574]" aria-hidden="true" />
                                Forensic Creative Intelligence
                            </div>

                            <h1 className="mt-8 text-[clamp(44px,6vw,74px)] font-semibold uppercase leading-[0.95] tracking-tight text-[#141414]">
                                Turn ads into
                                <span className="block text-[#D4A574]">decision-grade intelligence.</span>
                            </h1>

                            <p className="mx-auto mt-6 max-w-2xl text-[15px] leading-relaxed text-[#6B6B6B] md:text-[16px]">
                                Decompile any asset. Get mechanics, psychology, blueprint trace, stress tests, and a decision log—structured for teams, clients, and fast iteration.
                            </p>

                            <div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row sm:items-center">
                                <Link
                                    href="/ingest"
                                    className="inline-flex items-center justify-center gap-3 rounded-full bg-[#141414] px-8 py-4 text-[11px] font-bold uppercase tracking-[0.26em] text-[#FBF7EF] shadow-sm transition-all hover:bg-black active:scale-[0.99]"
                                >
                                    Decompile an ad
                                    <ArrowUpRight className="h-4 w-4" />
                                </Link>
                                <Link
                                    href="/share/sample-dossier"
                                    className="inline-flex items-center justify-center gap-3 rounded-full border border-black/10 bg-white px-8 py-4 text-[11px] font-bold uppercase tracking-[0.26em] text-[#141414] shadow-sm transition-all hover:bg-[#FBFBF6] active:scale-[0.99]"
                                >
                                    Sample read
                                    <ArrowUpRight className="h-4 w-4 text-[#8B6A3D]" />
                                </Link>
                            </div>

                            <div className="mt-14 grid gap-4 text-left sm:grid-cols-3">
                                {STEPS.map((item) => (
                                    <div key={item.kicker} className="rounded-[24px] border border-black/5 bg-white p-6 shadow-sm">
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
