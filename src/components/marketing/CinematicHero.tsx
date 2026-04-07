"use client";

import { useEffect, useState } from "react";
import ParticleField from "@/components/marketing/ParticleField";

export default function CinematicHero() {
    const [typedIdx, setTypedIdx] = useState(0);
    const [showCursor, setShowCursor] = useState(true);
    const BREAK_AT = 14; // length of "DECOMPILE THE\n"
    const TOTAL_CHARS = 28; // "DECOMPILE THE\nVISUAL WORLD."

    useEffect(() => {
        // Delay before typing starts
        const startTimeout = setTimeout(() => {
            const interval = setInterval(() => {
                setTypedIdx((prev) => {
                    if (prev >= TOTAL_CHARS + 1) {
                        clearInterval(interval);
                        // Hide cursor after a moment
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

    // Build the visible text
    const fullText = "DECOMPILE THE\nVISUAL WORLD.";
    const visibleText = fullText.substring(0, typedIdx);

    // Split on the newline to separate dark/gold lines
    const [line1, line2] = visibleText.split("\n");

    const hasLine2 = visibleText.includes("\n");

    return (
        <section
            className="relative flex min-h-[100vh] flex-col justify-center overflow-hidden bg-[#F6F1E7] px-6 py-24 sm:px-8 lg:px-10"
            data-presence-tone="light"
        >
            {/* Particle background */}
            <div className="pointer-events-none absolute inset-0 z-0" aria-hidden="true">
                <ParticleField />
            </div>

            {/* Typewriter text */}
            <div className="relative z-10 mx-auto flex w-full max-w-[1400px] flex-col items-center">
                <div className="flex w-full flex-col items-center text-center">
                    <h1 className="text-[12vw] font-black leading-[0.82] tracking-[-0.05em] text-[#141414] xl:text-[160px]">
                        <span>{line1 || " "}</span>
                        <br />
                        <span className="text-[#C1A674]">
                            {hasLine2 ? line2 : "\u00A0"}
                        </span>
                        {showCursor && typedIdx < TOTAL_CHARS + 1 && (
                            <span className="inline-block w-[6px] h-[0.85em] bg-[#C1A674] ml-[4px] -mb-2 animate-pulse" />
                        )}
                    </h1>
                </div>
            </div>
        </section>
    );
}
