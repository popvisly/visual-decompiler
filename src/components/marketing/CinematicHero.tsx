     1|"use client";
     2|
     3|import { useEffect, useState } from "react";
     4|import ParticleField from "@/components/marketing/ParticleField";
     5|
     6|export default function CinematicHero() {
     7|    const [typedIdx, setTypedIdx] = useState(0);
     8|    const [showCursor, setShowCursor] = useState(true);
     9|    const TOTAL_CHARS = 27; // "DECOMPILE THE\nVISUAL WORLD."
    10|
    11|    useEffect(() => {
    12|        const startTimeout = setTimeout(() => {
    13|            const interval = setInterval(() => {
    14|                setTypedIdx((prev) => {
    15|                    if (prev >= TOTAL_CHARS) {
    16|                        clearInterval(interval);
    17|                        setTimeout(() => setShowCursor(false), 3000);
    18|                        return prev;
    19|                    }
    20|                    return prev + 1;
    21|                });
    22|            }, 50);
    23|
    24|            return () => clearInterval(interval);
    25|        }, 800);
    26|
    27|        return () => clearTimeout(startTimeout);
    28|    }, []);
    29|
    30|    const fullText = "DECOMPILE THE\nVISUAL WORLD.";
    31|    const visibleText = fullText.substring(0, typedIdx);
    32|    const [line1, line2] = visibleText.split("\n");
    33|    const hasLine2 = visibleText.includes("\n");
    34|
    35|    return (
    36|        <section
    37|            className="relative flex min-h-[100vh] flex-col justify-center overflow-hidden bg-[#0B0B0B] px-6 py-24 sm:px-8 lg:px-10"
    38|            data-presence-tone="dark"
    39|        >
    40|            <div className="pointer-events-none absolute inset-0 z-0" aria-hidden="true">
    41|                <ParticleField />
    42|            </div>
    43|
    44|            <div className="relative z-10 mx-auto flex w-full max-w-[1400px] flex-col items-center">
    45|                <div className="flex w-full flex-col items-center text-center">
    46|                    <h1 className="text-[12vw] font-black leading-[0.82] tracking-[-0.05em] text-[#F6F1E7] xl:text-[160px]">
    47|                        <span>{line1 || " "}</span>
    48|                        <br />
    49|                        <span className="text-[#C1A674]">
    50|                            {hasLine2 ? line2 : "\u00A0"}
    51|                        </span>
    52|                        {showCursor && typedIdx < TOTAL_CHARS && (
    53|                            <span className="inline-block w-[6px] h-[0.85em] bg-[#C1A674] ml-[4px] -mb-2 animate-pulse" />
    54|                        )}
    55|                    </h1>
    56|                </div>
    57|            </div>
    58|        </section>
    59|    );
    60|}
    61|