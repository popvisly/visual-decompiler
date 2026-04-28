'use client';

import { useMemo, useRef } from 'react';
import Image from 'next/image';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';

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
    const containerRef = useRef<HTMLDivElement>(null);
    const prefersReducedMotion = useReducedMotion();
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ['start end', 'end start'],
    });

    const rotateX = useTransform(scrollYProgress, [0.05, 0.35], [12, 0]);
    const scale = useTransform(scrollYProgress, [0.05, 0.35], [0.92, 1]);
    const y = useTransform(scrollYProgress, [0.05, 0.35], [48, 0]);
    const shadowOpacity = useTransform(scrollYProgress, [0.05, 0.35], [0.06, 0.16]);

    const heroMotion = useMemo(() => {
        if (prefersReducedMotion) {
            return { transform: 'none' };
        }
        return {
            rotateX,
            scale,
            y,
        };
    }, [prefersReducedMotion, rotateX, scale, y]);

    return (
        <section className="relative overflow-hidden bg-[#FBFBF6] px-6 pt-28 pb-20 md:px-10 md:pt-32 md:pb-28">
            <div
                className="pointer-events-none absolute inset-0 opacity-[0.025] [background-image:linear-gradient(#1A1A1A_1.5px,transparent_1.5px),linear-gradient(90deg,#1A1A1A_1.5px,transparent_1.5px)] [background-size:48px_48px]"
                aria-hidden="true"
            />

            <div className="relative z-10 mx-auto w-full max-w-7xl">
                <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,560px)] lg:items-start">
                    <div className="max-w-2xl">
                        <div className="inline-flex items-center gap-3 rounded-full border border-black/10 bg-white/70 px-5 py-2 text-[10px] font-bold uppercase tracking-[0.28em] text-[#6B6B6B] shadow-sm backdrop-blur">
                            <span className="h-2 w-2 rounded-full bg-[#D4A574]" aria-hidden="true" />
                            Forensic Creative Intelligence
                        </div>

                        <h1 className="mt-8 text-[clamp(44px,6vw,74px)] font-semibold leading-[0.95] tracking-tight text-[#141414]">
                            Turn ads into
                            <span className="block text-[#8B6A3D]">decision-grade intelligence.</span>
                        </h1>

                        <p className="mt-6 max-w-xl text-[15px] leading-relaxed text-[#6B6B6B] md:text-[16px]">
                            Decompile any asset. Get mechanics, psychology, blueprint trace, stress tests, and a decision log—structured for teams, clients, and fast iteration.
                        </p>

                        <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center">
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

                        <div className="mt-12 grid gap-4 sm:grid-cols-3">
                            {STEPS.map((item) => (
                                <div key={item.kicker} className="rounded-[1.75rem] border border-black/5 bg-white p-6 shadow-sm">
                                    <p className="text-[10px] font-bold uppercase tracking-[0.34em] text-[#8B6A3D]/80">{item.kicker}</p>
                                    <p className="mt-3 text-[13px] font-semibold leading-snug text-[#141414]">{item.title}</p>
                                    <p className="mt-2 text-[13px] font-medium leading-relaxed text-[#6B6B6B]">{item.body}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div ref={containerRef} className="relative">
                        <div className="sticky top-24">
                            <motion.div
                                style={{
                                    perspective: 1200,
                                }}
                                className="relative rounded-[2.25rem] border border-black/5 bg-white shadow-sm"
                            >
                                <motion.div
                                    style={{
                                        transformStyle: 'preserve-3d',
                                        ...(heroMotion as any),
                                    }}
                                    className="relative overflow-hidden rounded-[2.25rem]"
                                >
                                    <Image
                                        src="/images/marketing/decompiler-workspace.png"
                                        alt="Visual Decompiler workspace"
                                        width={1800}
                                        height={1200}
                                        className="h-auto w-full object-cover"
                                        priority
                                    />
                                </motion.div>

                                {!prefersReducedMotion ? (
                                    <motion.div
                                        aria-hidden="true"
                                        style={{ opacity: shadowOpacity }}
                                        className="pointer-events-none absolute -inset-6 rounded-[2.75rem] bg-black blur-3xl"
                                    />
                                ) : null}
                            </motion.div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

