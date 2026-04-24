"use client";

import Link from "next/link";
import ParticleField from "@/components/marketing/ParticleField";

export default function CinematicHero() {
    return (
        <section
            className="relative flex min-h-[100svh] items-center justify-center overflow-hidden bg-[#0B0B0B] px-6 pb-20 pt-28 md:px-10 md:pb-24 md:pt-32"
            data-presence-tone="dark"
        >
            <div
                className="pointer-events-none absolute inset-x-0 top-0 bottom-[-6vh] z-0 opacity-44 [mask-image:linear-gradient(to_bottom,black_0%,black_58%,transparent_92%)] [-webkit-mask-image:linear-gradient(to_bottom,black_0%,black_58%,transparent_92%)]"
                aria-hidden="true"
            >
                <ParticleField />
            </div>

            <div className="relative z-10 mx-auto flex w-full max-w-[1200px] flex-col items-center text-center">
                <h1 className="max-w-[18ch] text-[clamp(48px,8.2vw,118px)] font-black leading-[0.9] tracking-[-0.04em] text-[#F6F1E7]">
                    <span className="bg-gradient-to-r from-[#FFD600] to-[#F28C28] bg-clip-text text-transparent">Creative analysis</span>{' '}
                    <span>for pitches, reviews, and approvals.</span>
                </h1>

                <div className="relative mt-12 w-full max-w-[860px]">
                    <div className="pointer-events-none absolute inset-0 flex items-center justify-center" aria-hidden="true">
                        <div className="h-[420px] w-[860px] rounded-[40px] bg-[radial-gradient(circle_at_center,rgba(0,0,0,0.62),rgba(0,0,0,0.32)_48%,transparent_78%)] blur-2xl" />
                    </div>

                    <div className="relative overflow-hidden rounded-[30px] border border-[rgba(193,166,116,0.22)] bg-[linear-gradient(180deg,rgba(10,10,10,0.72),rgba(5,5,5,0.58))] px-7 py-7 shadow-[0_18px_60px_rgba(0,0,0,0.34)] backdrop-blur-2xl md:px-12 md:py-10">
                                                <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-[linear-gradient(180deg,rgba(255,255,255,0.04),transparent)]" />

                        <div className="relative mx-auto max-w-[700px] text-center">
                            <p className="text-[20px] leading-[1.6] tracking-[-0.01em] text-[#F3EEE3] md:text-[24px]">
                                Visual Decompiler helps strategists, creative leads, and agency teams turn visual instinct into structured reasoning for pitches, reviews, and client approvals.
                            </p>

                            <div className="mt-8 flex flex-wrap items-center justify-center gap-3 sm:flex-nowrap sm:gap-4">
                                <Link
                                    href="/ingest"
                                    className="inline-flex h-12 items-center justify-center rounded-2xl bg-white px-8 text-[15px] font-medium tracking-[0.01em] text-black shadow-[0_8px_24px_rgba(255,255,255,0.08)] transition-all duration-200 hover:bg-white/92 hover:shadow-[0_10px_30px_rgba(255,255,255,0.1)]"
                                >
                                    Decompile an Ad
                                    <span className="ml-2 text-[15px]">↗</span>
                                </Link>

                                <Link
                                    href="/share/sample-dossier"
                                    className="inline-flex h-12 items-center justify-center rounded-2xl border border-white/20 bg-white/[0.04] px-6 text-[14px] text-[#F3EEE3] transition-all duration-200 hover:border-white/35 hover:bg-white/[0.1] hover:text-white"
                                >
                                    View Sample Dossier
                                </Link>
                            </div>


                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
