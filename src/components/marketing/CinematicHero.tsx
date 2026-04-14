"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
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
            className="relative flex min-h-[100vh] flex-col justify-center bg-[#0B0B0B] px-6 pb-40 pt-24 sm:px-8 lg:px-10 lg:pb-48"
            data-presence-tone="dark"
        >
            <div
                className="pointer-events-none absolute inset-x-0 top-0 bottom-[-6vh] z-0 opacity-44 [mask-image:linear-gradient(to_bottom,black_0%,black_58%,transparent_92%)] [-webkit-mask-image:linear-gradient(to_bottom,black_0%,black_58%,transparent_92%)]"
                aria-hidden="true"
            >
                <ParticleField />
            </div>

            <div
                className="pointer-events-none absolute inset-x-0 top-[60%] z-0 mx-auto h-[420px] w-full max-w-[980px] -translate-y-1/2 bg-[radial-gradient(circle_at_center,rgba(4,4,4,0.74)_0%,rgba(4,4,4,0.56)_42%,transparent_78%)]"
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

                    <div className="relative mx-auto mt-16 max-w-[760px]">
                        <div className="absolute inset-0 -z-10 rounded-[32px] bg-[radial-gradient(circle_at_center,rgba(0,0,0,0.62),transparent_75%)]" />

                        <div className="relative rounded-[28px] border border-white/10 bg-black/48 px-6 py-6 shadow-[0_10px_40px_rgba(0,0,0,0.28)] backdrop-blur-xl before:pointer-events-none before:absolute before:inset-0 before:rounded-[28px] before:border before:border-white/7 md:px-10 md:py-8">
                            <div className="mx-auto max-w-[560px] text-center">
                                <p className="text-[17px] font-normal leading-[1.5] text-white/96 drop-shadow-[0_1px_1px_rgba(0,0,0,0.45)] md:text-[18px]">
                                    The sovereign system for elite agencies.
                                </p>

                                <p className="mt-5 text-[19px] font-normal leading-[1.6] text-white/93 drop-shadow-[0_1px_1px_rgba(0,0,0,0.45)] md:text-[20px]">
                                    Read the architecture of persuasion —
                                    <br className="hidden md:block" />
                                    <span className="md:hidden"> </span>
                                    and defend high-stakes creative with clarity.
                                </p>

                                <div className="mt-8 flex flex-col items-center">
                                    <Link
                                        href="/ingest"
                                        className="inline-flex h-11 items-center justify-center rounded-xl bg-white px-7 text-[15px] font-medium tracking-[0.01em] text-black shadow-[0_6px_20px_rgba(255,255,255,0.08)] transition-all duration-200 hover:bg-white/92"
                                    >
                                        Decompile Your Ad
                                        <span className="ml-2">↗</span>
                                    </Link>

                                    <Link
                                        href={SAMPLE_DOSSIER_HREF}
                                        className="mt-5 text-[15px] text-white/62 transition-colors duration-200 hover:text-white/88"
                                    >
                                        View Sample Dossier
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mt-20 h-px w-full max-w-[1240px] bg-gradient-to-r from-transparent via-[#C1A674]/45 to-transparent" aria-hidden="true" />
            </div>
        </section>
    );
}
