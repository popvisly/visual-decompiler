"use client";

import { useEffect, useState } from "react";
import ParticleField from "@/components/marketing/ParticleField";

export default function CinematicHero() {
    const [typedIdx, setTypedIdx] = useState(0);
    const [showCursor, setShowCursor] = useState(true);
    const TOTAL_CHARS = 27; // "DECOMPILE THE\nVISUAL WORLD."

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

    const fullText = "DECOMPILE THE\nVISUAL WORLD.";
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
                </div>
            </div>
        </section>
    );
}
