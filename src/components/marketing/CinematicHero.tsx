"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import ParticleField from "@/components/marketing/ParticleField";

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
            className="relative flex min-h-[100svh] items-center justify-center overflow-hidden bg-[#0B0B0B] px-6 pb-24 pt-32 md:px-10 md:pb-28 md:pt-36"
            data-presence-tone="dark"
        >
            <div
                className="pointer-events-none absolute inset-x-0 top-0 bottom-[-6vh] z-0 opacity-44 [mask-image:linear-gradient(to_bottom,black_0%,black_58%,transparent_92%)] [-webkit-mask-image:linear-gradient(to_bottom,black_0%,black_58%,transparent_92%)]"
                aria-hidden="true"
            >
                <ParticleField />
            </div>

            <div className="relative z-10 mx-auto flex w-full max-w-[1400px] flex-col items-center text-center">
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

                <div className="relative mt-16 w-full max-w-[760px]">
                    <div className="pointer-events-none absolute inset-0 flex items-center justify-center" aria-hidden="true">
                        <div className="h-[420px] w-[820px] rounded-[40px] bg-[radial-gradient(circle_at_center,rgba(0,0,0,0.62),rgba(0,0,0,0.32)_48%,transparent_78%)] blur-2xl" />
                    </div>

                    <div className="relative mx-auto w-full max-w-[760px]">
                        <div className="relative overflow-hidden rounded-[30px] border border-white/10 bg-[linear-gradient(180deg,rgba(10,10,10,0.72),rgba(5,5,5,0.58))] px-7 py-6 shadow-[0_18px_60px_rgba(0,0,0,0.34)] backdrop-blur-2xl md:px-12 md:py-10">
                            <div className="pointer-events-none absolute inset-0 rounded-[30px] ring-1 ring-inset ring-white/5" />
                            <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-[linear-gradient(180deg,rgba(255,255,255,0.04),transparent)]" />

                            <div className="relative mx-auto max-w-[560px] text-center">
                                <p className="text-[18px] leading-[1.45] text-[#F3EEE3] md:text-[19px]">
                                    The sovereign system for elite agencies.
                                </p>

                                <p className="mt-6 text-[22px] leading-[1.5] tracking-[-0.015em] text-[#F3EEE3] md:text-[25px]">
                                    Read the architecture of persuasion —
                                    <br className="hidden md:block" />
                                    <span className="md:hidden"> </span>
                                    and defend high-stakes creative with clarity.
                                </p>

                                <div className="mt-8 flex flex-col items-center">
                                    <Link
                                        href="/ingest"
                                        className="inline-flex h-12 items-center justify-center rounded-2xl bg-white px-8 text-[15px] font-medium tracking-[0.01em] text-black shadow-[0_8px_24px_rgba(255,255,255,0.08)] transition-all duration-200 hover:bg-white/92 hover:shadow-[0_10px_30px_rgba(255,255,255,0.1)]"
                                    >
                                        Decompile Your Ad
                                        <span className="ml-2 text-[15px]">↗</span>
                                    </Link>

                                    <Link
                                        href="/share/sample-dossier"
                                        className="mt-5 text-[15px] text-[#F3EEE3] transition-colors duration-200 hover:text-white"
                                    >
                                        View Sample Dossier
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
