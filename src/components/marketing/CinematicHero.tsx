"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import ParticleField from "@/components/marketing/ParticleField";
import { SAMPLE_DOSSIER_HREF } from "@/lib/sample-dossier";

export default function CinematicHero() {
    const [typedIdx, setTypedIdx] = useState(0);
    const [showCursor, setShowCursor] = useState(true);
    const fullText = "ADVERTISING INTELLIGENCE.\nDECONSTRUCTED.";
    const TOTAL_CHARS = fullText.length;

    useEffect(() => {
        const startTimeout = setTimeout(() => {
            const interval = setInterval(() => {
                setTypedIdx((prev) => {
                    if (prev >= TOTAL_CHARS) {
                        clearInterval(interval);
                        setTimeout(() => setShowCursor(false), 3000);
                        return prev;
                    }
                    return prev + 1;
                });
            }, 50);

            return () => clearInterval(interval);
        }, 800);

        return () => clearTimeout(startTimeout);
    }, []);

    const visibleText = fullText.substring(0, typedIdx);
    const [line1, line2] = visibleText.split("\n");
    const hasLine2 = visibleText.includes("\n");

    return (
        <section
            className="relative flex min-h-[100vh] flex-col justify-center bg-[#0B0B0B] px-6 pb-36 pt-24 sm:px-8 lg:px-10 lg:pb-44"
            data-presence-tone="dark"
        >
            <div
                className="pointer-events-none absolute inset-x-0 top-0 bottom-[-6vh] z-0 opacity-44 [mask-image:linear-gradient(to_bottom,black_0%,black_58%,transparent_92%)] [-webkit-mask-image:linear-gradient(to_bottom,black_0%,black_58%,transparent_92%)]"
                aria-hidden="true"
            >
                <ParticleField />
            </div>

            <div
                className="pointer-events-none absolute inset-x-0 top-[46%] z-0 mx-auto h-[360px] w-full max-w-[980px] -translate-y-1/2 bg-[radial-gradient(circle_at_center,rgba(8,8,8,0.72)_0%,rgba(8,8,8,0.44)_48%,transparent_100%)]"
                aria-hidden="true"
            />

            <div className="relative z-10 mx-auto flex w-full max-w-[1400px] flex-col items-center">
                <div className="flex w-full flex-col items-center text-center">
                    <h1 className="text-[12vw] font-black leading-[0.82] tracking-[-0.05em] xl:text-[160px]">
                        <span className="text-[#F6F1E7]">{line1 || " "}</span>
                        <br />
                        <span className="bg-gradient-to-r from-[#FFD600] to-[#F28C28] bg-clip-text text-transparent">
                            {hasLine2 ? line2 : "\u00A0"}
                        </span>
                        {showCursor && typedIdx < TOTAL_CHARS && (
                            <span className="ml-[4px] -mb-2 inline-block h-[0.85em] w-[6px] animate-pulse bg-[#FFD600]" />
                        )}
                    </h1>

                    <div className="relative mx-auto mt-14 max-w-2xl rounded-2xl border border-white/[0.06] bg-[linear-gradient(180deg,rgba(8,8,8,0.34),rgba(8,8,8,0.24))] px-8 py-7 text-center shadow-[0_0_52px_rgba(0,0,0,0.42)] ring-1 ring-white/[0.04] backdrop-blur-xl">
                        <div
                            className="pointer-events-none absolute inset-0 rounded-2xl bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.06),transparent_56%)]"
                            aria-hidden="true"
                        />

                        <p className="relative text-lg leading-relaxed text-white/80">
                            <span className="block">The sovereign system for elite agencies.</span>
                            <span className="mt-4 block">
                                Read the architecture of persuasion —
                                <br />
                                and defend high-stakes creative with clarity.
                            </span>
                        </p>

                        <div className="relative mt-8 flex flex-col items-center justify-center">
                            <Link
                                href="/ingest"
                                className="inline-flex items-center gap-3 rounded-lg bg-white px-6 py-3 text-sm tracking-wide text-black shadow-[0_8px_24px_rgba(0,0,0,0.28)] transition hover:bg-white/90"
                            >
                                Decompile Your Ad
                                <ArrowUpRight size={16} />
                            </Link>

                            <p className="mt-2 text-[11px] uppercase tracking-[0.18em] text-white/42">No setup. Instant output.</p>

                            <Link
                                href={SAMPLE_DOSSIER_HREF}
                                className="mt-5 px-6 py-1 text-sm tracking-wide text-white/58 transition hover:text-white/85"
                            >
                                View Sample Dossier
                            </Link>
                        </div>
                    </div>
                </div>

                <div className="mt-16 h-px w-full max-w-[1240px] bg-gradient-to-r from-transparent via-[#C1A674]/45 to-transparent" aria-hidden="true" />
            </div>
        </section>
    );
}
