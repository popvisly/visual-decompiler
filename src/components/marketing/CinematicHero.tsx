"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import ParticleField from "@/components/marketing/ParticleField";
import { SAMPLE_DOSSIER_HREF } from "@/lib/sample-dossier";

export default function CinematicHero() {
    const [typedIdx, setTypedIdx] = useState(0);
    const [showCursor, setShowCursor] = useState(true);
    const TOTAL_CHARS = 18; // "SEE THE\nINVISIBLE."

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

    const fullText = "SEE THE\nINVISIBLE.";
    const visibleText = fullText.substring(0, typedIdx);
    const [line1, line2] = visibleText.split("\n");
    const hasLine2 = visibleText.includes("\n");

    return (
        <section
            className="relative flex min-h-[100vh] flex-col justify-center overflow-hidden bg-[#0B0B0B] px-6 py-24 sm:px-8 lg:px-10"
            data-presence-tone="dark"
        >
            <div className="absolute inset-0 z-0" aria-hidden="true">
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

                    <p className="mt-10 max-w-[900px] text-[22px] leading-[1.6] text-[#D1D1CB] lg:text-[28px]">
                        Visual Decompiler helps creatives, strategists, and brands analyze ads with structured visual intelligence — turning instinct into clear, defensible creative reasoning. Because in the room, "it feels right" is not enough.
                    </p>

                    <div className="mt-10 flex flex-col gap-5 sm:flex-row sm:items-center">
                        <Link
                            href="/ingest"
                            className="inline-flex items-center gap-3 bg-[#141414] px-8 py-4 text-[10px] font-black uppercase tracking-[0.25em] text-white transition hover:bg-[#C1A674] hover:text-[#141414]"
                        >
                            Decompile an Ad
                            <ArrowUpRight size={16} />
                        </Link>
                        <Link
                            href={SAMPLE_DOSSIER_HREF}
                            className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.2em] text-[#B7B7B2] transition hover:text-[#F6F1E7]"
                        >
                            <span className="w-6 h-px bg-[#F6F1E7]/25" />
                            View Sample Dossier
                        </Link>
                    </div>

                    <p className="mt-8 text-[11px] font-bold uppercase tracking-[0.3em] text-[#C1A674]">
                        Walk in with answers.
                    </p>

                    <div className="mt-12 w-full border-t border-[#242424] pt-8">
                        <p className="text-[13px] font-bold uppercase tracking-[0.22em] text-[#E2E2DD]">
                            Not a gallery. Not a prompt.
                        </p>
                        <p className="mt-2 text-[17px] leading-[1.6] text-[#9C9C95]">
                            A system for reading why work lands.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}
