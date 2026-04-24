"use client";

import Image from "next/image";
import Link from "next/link";
import ParticleField from "@/components/marketing/ParticleField";

const HERO_ADS = [
    { src: "/images/examples/Chanel_No5.webp", alt: "Chanel No.5 campaign" },
    { src: "/images/examples/Sony.jpg", alt: "Sony campaign creative" },
    { src: "/images/examples/ACNE.png", alt: "Acne Studios campaign" },
    { src: "/images/examples/CHLOE.jpg", alt: "Luxury fragrance campaign" },
];

export default function CinematicHero() {
    return (
        <section className="relative overflow-hidden bg-[#0B0B0B] px-6 md:px-10" data-presence-tone="dark">
            <div
                className="pointer-events-none absolute inset-x-0 top-0 bottom-[-10vh] z-0 opacity-44 [mask-image:linear-gradient(to_bottom,black_0%,black_72%,transparent_96%)] [-webkit-mask-image:linear-gradient(to_bottom,black_0%,black_72%,transparent_96%)]"
                aria-hidden="true"
            >
                <ParticleField />
            </div>

            <div className="relative z-10 mx-auto w-full max-w-[1200px]">
                <div className="flex min-h-[100svh] items-center justify-center pt-28 pb-16 md:pt-32 md:pb-20">
                    <h1 className="mx-auto w-full text-center text-[clamp(52px,8.8vw,132px)] font-black leading-[0.9] tracking-[-0.04em] text-[#F6F1E7]">
                        <span>Advertising intelligence.</span>{" "}
                        <span className="bg-gradient-to-r from-[#FFD600] to-[#F28C28] bg-clip-text text-transparent">Deconstructed.</span>
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
                                        className="group relative inline-flex h-12 items-center justify-center overflow-hidden rounded-2xl border border-white/20 bg-white px-8 text-[15px] font-medium tracking-[0.01em] text-black shadow-[0_8px_24px_rgba(255,255,255,0.08)] transition-all duration-500 hover:-translate-y-[1px] hover:border-[#F7B43A]/70 hover:bg-gradient-to-r hover:from-[#FFD600] hover:to-[#F28C28] hover:shadow-[0_14px_34px_rgba(242,140,40,0.25)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F7B43A]/70 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0B0B0B] active:translate-y-0"
                                    >
                                        <span className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_22%,rgba(255,255,255,0.45),transparent_38%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                                        Decompile an Ad
                                        <span className="ml-2 text-[15px] transition-transform duration-500 group-hover:translate-x-[2px] group-hover:-translate-y-[1px]">↗</span>
                                    </Link>

                                    <Link
                                        href="/share/sample-dossier"
                                        className="inline-flex h-12 items-center justify-center rounded-2xl border border-white/20 bg-white/[0.04] px-6 text-[14px] text-[#F3EEE3] transition-all duration-200 hover:border-white/35 hover:bg-white/[0.1] hover:text-white"
                                    >
                                        View Sample Dossier
                                    </Link>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-3">
                                {HERO_ADS.map((ad) => (
                                    <div
                                        key={ad.src}
                                        className="relative overflow-hidden rounded-[18px] border border-[rgba(193,166,116,0.20)] bg-[#101010] aspect-[0.95]"
                                    >
                                        <Image
                                            src={ad.src}
                                            alt={ad.alt}
                                            fill
                                            sizes="(max-width: 1024px) 50vw, 26vw"
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
