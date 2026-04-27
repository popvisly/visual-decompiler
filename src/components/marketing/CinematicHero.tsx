"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

const HERO_ADS = [
    { src: "/images/examples/Chanel_No5.webp", alt: "Chanel No.5 campaign" },
    { src: "/images/examples/Sony.jpg", alt: "Sony campaign creative" },
    { src: "/images/examples/ACNE.png", alt: "Acne Studios campaign" },
    { src: "/images/examples/CHLOE.jpg", alt: "Luxury fragrance campaign" },
    { src: "/images/examples/Miss_DIOR.jpg", alt: "Miss Dior campaign" },
    { src: "/images/examples/valentino-voce-viva.png", alt: "Valentino Voce Viva campaign" },
];

const HERO_TYPED_WORDS = ["Decoded.", "Scored.", "Mapped.", "Read.", "Deconstructed."];

const HERO_TITLE_ADS = HERO_ADS.slice(0, 3);

export default function CinematicHero() {
    const [heroVisible, setHeroVisible] = useState(false);
    const [wordIndex, setWordIndex] = useState(0);
    const [charIndex, setCharIndex] = useState(0);
    const [isDeleting, setIsDeleting] = useState(false);
    const [isComplete, setIsComplete] = useState(false);

    const finalWordIndex = HERO_TYPED_WORDS.length - 1;
    const currentWord = HERO_TYPED_WORDS[wordIndex] ?? HERO_TYPED_WORDS[finalWordIndex];

    const typedWord = useMemo(() => currentWord.slice(0, charIndex), [currentWord, charIndex]);

    useEffect(() => {
        const revealTimer = window.setTimeout(() => setHeroVisible(true), 140);
        return () => window.clearTimeout(revealTimer);
    }, []);

    useEffect(() => {
        if (typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
            setWordIndex(finalWordIndex);
            setCharIndex(HERO_TYPED_WORDS[finalWordIndex].length);
            setIsDeleting(false);
            setIsComplete(true);
            return;
        }

        if (isComplete) return;

        let timer: number | undefined;

        if (!isDeleting && charIndex < currentWord.length) {
            timer = window.setTimeout(() => setCharIndex((prev) => prev + 1), 82);
        } else if (!isDeleting && charIndex === currentWord.length) {
            if (wordIndex === finalWordIndex) {
                timer = window.setTimeout(() => setIsComplete(true), 520);
            } else {
                timer = window.setTimeout(() => setIsDeleting(true), 620);
            }
        } else if (isDeleting && charIndex > 0) {
            timer = window.setTimeout(() => setCharIndex((prev) => prev - 1), 44);
        } else if (isDeleting && charIndex === 0) {
            setIsDeleting(false);
            setWordIndex((prev) => Math.min(prev + 1, finalWordIndex));
        }

        return () => {
            if (timer) window.clearTimeout(timer);
        };
    }, [charIndex, currentWord, finalWordIndex, isComplete, isDeleting, wordIndex]);

    return (
        <section className="relative overflow-hidden bg-[#0B0B0B] px-6 md:px-10" data-presence-tone="dark">
            <div className="relative z-10 mx-auto w-full max-w-[1200px]">
                <div className="relative flex min-h-[100svh] items-center justify-center overflow-hidden pt-28 pb-16 md:pt-32 md:pb-20">
                    <div className="pointer-events-none absolute inset-0 hidden grid-cols-3 gap-4 md:grid" aria-hidden="true">
                        {HERO_TITLE_ADS.map((ad) => (
                            <div
                                key={`hero-bg-${ad.src}`}
                                className="relative overflow-hidden rounded-[30px] border border-[rgba(193,166,116,0.20)] bg-[#111111]"
                            >
                                <Image
                                    src={ad.src}
                                    alt={ad.alt}
                                    fill
                                    sizes="33vw"
                                    className="object-cover opacity-30"
                                />
                            </div>
                        ))}
                    </div>
                    <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.5),rgba(0,0,0,0.62))]" aria-hidden="true" />

                    <h1
                        className={`relative z-10 mx-auto w-full text-center text-[clamp(52px,8.8vw,132px)] font-black leading-[0.9] tracking-[-0.04em] text-[#F6F1E7] transition-all duration-[1400ms] ease-out ${heroVisible ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"}`}
                    >
                        <span>Advertising </span>
                        <span className="font-serif italic font-medium tracking-[-0.02em] text-[#F6F1E7]/96">intelligence.</span>{" "}
                        <span className="inline-flex min-w-[14ch] items-baseline justify-center whitespace-nowrap text-center align-baseline">
                            <span className="bg-gradient-to-r from-[#FFD600] to-[#F28C28] bg-clip-text text-transparent">{typedWord}</span>
                            {!isComplete && (
                                <span className="ml-[0.02em] inline-block bg-gradient-to-r from-[#FFD600] to-[#F28C28] bg-clip-text text-transparent animate-pulse">
                                    |
                                </span>
                            )}
                        </span>
                    </h1>
                </div>

                <div className="relative pb-20 md:pb-24">
                    <div className="pointer-events-none absolute inset-0 flex items-center justify-center" aria-hidden="true">
                        <div className="h-[520px] w-full max-w-[1120px] rounded-[44px] bg-[radial-gradient(circle_at_center,rgba(0,0,0,0.62),rgba(0,0,0,0.34)_48%,transparent_78%)] blur-2xl" />
                    </div>

                    <div className="relative overflow-hidden rounded-[34px] border border-[rgba(193,166,116,0.22)] bg-[linear-gradient(180deg,rgba(10,10,10,0.72),rgba(5,5,5,0.58))] p-6 shadow-[0_18px_60px_rgba(0,0,0,0.34)] backdrop-blur-2xl md:p-9 lg:p-10">
                        <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-[linear-gradient(180deg,rgba(255,255,255,0.04),transparent)]" />

                        <div className="relative grid gap-8 lg:grid-cols-[1fr_1.02fr] lg:items-center lg:gap-10">
                            <div className="max-w-[560px]">
                                <p className="text-[20px] leading-[1.58] tracking-[-0.01em] text-[#F3EEE3] md:text-[24px]">
                                    Visual Decompiler helps strategists, creative leads, and agency teams turn visual instinct into structured reasoning for pitches, reviews, and client approvals.
                                </p>

                                <div className="mt-8 flex flex-wrap items-center gap-3 sm:gap-4">
                                    <Link
                                        href="/ingest"
                                        className="group relative inline-flex h-12 items-center justify-center overflow-hidden rounded-2xl border border-[#8B6A3D]/20 bg-white px-8 text-[15px] font-medium tracking-[0.01em] text-black shadow-[0_8px_24px_rgba(255,255,255,0.08)] transition-all duration-500 hover:-translate-y-[1px] hover:border-[#F7B43A]/70 hover:bg-gradient-to-r hover:from-[#FFD600] hover:to-[#F28C28] hover:shadow-[0_14px_34px_rgba(242,140,40,0.25)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F7B43A]/70 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0B0B0B] active:translate-y-0"
                                    >
                                        <span className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_22%,rgba(255,255,255,0.45),transparent_38%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                                        Decompile an Ad
                                        <span className="ml-2 text-[15px] transition-transform duration-500 group-hover:translate-x-[2px] group-hover:-translate-y-[1px]">↗</span>
                                    </Link>

                                    <Link
                                        href="/share/sample-dossier"
                                        className="inline-flex h-12 items-center justify-center rounded-2xl border border-[#8B6A3D]/20 bg-white/[0.04] px-6 text-[14px] text-[#F3EEE3] transition-all duration-200 hover:border-[#D4A574]/35 hover:bg-white/[0.1] hover:text-white"
                                    >
                                        View Sample Dossier
                                    </Link>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-3 md:grid-cols-3">
                                {HERO_ADS.map((ad) => (
                                    <div
                                        key={ad.src}
                                        className="relative overflow-hidden rounded-[18px] border border-[rgba(193,166,116,0.20)] bg-[#101010] aspect-[3/4]"
                                    >
                                        <Image
                                            src={ad.src}
                                            alt={ad.alt}
                                            fill
                                            sizes="(max-width: 768px) 45vw, (max-width: 1200px) 22vw, 16vw"
                                            className="object-cover"
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
