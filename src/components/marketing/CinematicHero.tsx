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
            className="relative flex min-h-[100vh] flex-col justify-center overflow-hidden bg-[#0B0B0B] px-6 py-24 sm:px-8 lg:px-10"
            data-presence-tone="dark"
        >
            <div className="absolute inset-x-0 top-0 bottom-[170px] z-0 opacity-55 [mask-image:radial-gradient(circle_at_center,black_40%,transparent_80%)] [-webkit-mask-image:radial-gradient(circle_at_center,black_40%,transparent_80%)]" aria-hidden="true">
                    <ParticleField />
                </div>

            <div className="relative z-10 mx-auto flex w-full max-w-[1400px] flex-col items-center">
                <div className="flex w-full flex-col items-center text-center">
                    <h1 className="text-[12vw] font-black leading-[0.82] tracking-[-0.05em] xl:text-[160px]">
                        <span className="text-[#F6F1E7]">{line1 || " "}</span>
                        <br />
                        <span className="bg-gradient-to-r from-[#FFD600] to-[#F28C28] bg-clip-text text-transparent">
                            {hasLine2 ? line2 : "\u00A0"}
                        </span>
                        {showCursor && typedIdx < TOTAL_CHARS && (
                            <span className="inline-block w-[6px] h-[0.85em] bg-[#FFD600] ml-[4px] -mb-2 animate-pulse" />
                        )}
                    </h1>

                    <div className="relative mx-auto mt-10 max-w-2xl rounded-2xl border border-white/10 bg-black/30 backdrop-blur-md ring-1 ring-white/5 px-8 py-6 text-center shadow-[0_0_40px_rgba(0,0,0,0.4)]">
                        <p className="text-lg text-white/80 leading-relaxed">
                            The sovereign system for elite agencies.
                            <br />
                            Read the architecture of persuasion — and defend high-stakes creative with clarity.
                        </p>

                        <div className="mt-6 flex flex-col items-center justify-center gap-4 sm:flex-row">
                            <Link
                                href="/ingest"
                                className="inline-flex items-center gap-3 rounded-lg bg-white px-6 py-3 text-sm tracking-wide text-black transition hover:bg-white/90"
                            >
                                Decompile Your Ad
                                <ArrowUpRight size={16} />
                            </Link>
                            <Link
                                href={SAMPLE_DOSSIER_HREF}
                                className="px-6 py-3 text-sm tracking-wide text-white/70 transition hover:text-white"
                            >
                                View Sample Dossier
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
