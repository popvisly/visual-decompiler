"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import HeroAppPreview from "@/components/marketing/HeroAppPreview";
import { HOMEPAGE_CTA_ICON, MARKETING_PRIMARY_CTA_LG, MARKETING_SECONDARY_CTA_LG } from "@/components/marketing/ctaStyles";

export default function HomeHero() {
    return (
        <section className="relative overflow-hidden bg-[#FBFBF6] px-6 pt-28 pb-16 md:px-10 md:pt-32 md:pb-24">
            <div
                className="pointer-events-none absolute inset-0 opacity-[0.025] [background-image:linear-gradient(#1A1A1A_1.5px,transparent_1.5px),linear-gradient(90deg,#1A1A1A_1.5px,transparent_1.5px)] [background-size:48px_48px]"
                aria-hidden="true"
            />

            <div className="relative z-10 mx-auto w-full max-w-7xl">
                <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_520px] lg:items-start">
                    <div className="max-w-2xl">
                        <div className="inline-flex items-center gap-3 rounded-full border border-black/10 bg-white/70 px-5 py-2 text-[10px] font-bold uppercase tracking-[0.28em] text-[#6B6B6B] shadow-sm backdrop-blur">
                            <span className="h-2 w-2 rounded-full bg-[#D4A574]" aria-hidden="true" />
                            Forensic Creative Intelligence
                        </div>

                        <h1 className="mt-8 text-[clamp(44px,6vw,74px)] font-semibold leading-[0.95] tracking-tight text-[#141414]">
                            Turn ads into
                            <span className="block text-[#8B6A3D]">decision-grade intelligence.</span>
                        </h1>

                        <p className="mt-6 max-w-xl text-[15px] leading-relaxed text-[#6B6B6B] md:text-[16px]">
                            Decompile any asset. Get mechanics, psychology, blueprint trace, stress tests, and a decision log—structured for teams, clients, and
                            fast iteration.
                        </p>

                        <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center">
                            <Link
                                href="/ingest"
                                className={MARKETING_PRIMARY_CTA_LG}
                            >
                                Start Free
                                <ArrowUpRight className={HOMEPAGE_CTA_ICON} />
                            </Link>
                            <Link
                                href="/share/sample-dossier"
                                className={MARKETING_SECONDARY_CTA_LG}
                            >
                                View Sample Dossier
                                <ArrowUpRight className={HOMEPAGE_CTA_ICON + " text-[#8B6A3D]"} />
                            </Link>
                        </div>

                        <div className="mt-12 grid gap-4 sm:grid-cols-3">
                            {[
                                { label: "Mechanics", value: "Signal stack + routing cues" },
                                { label: "Blueprint Trace", value: "Rebuild logic + constraints" },
                                { label: "Stress Lab", value: "Causal lift + risk control" },
                            ].map((item) => (
                                <div key={item.label} className="rounded-[1.75rem] border border-black/5 bg-white p-6 shadow-sm">
                                    <p className="text-[10px] font-bold uppercase tracking-[0.34em] text-[#8B6A3D]/80">{item.label}</p>
                                    <p className="mt-3 text-[13px] font-medium leading-relaxed text-[#6B6B6B]">{item.value}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="lg:sticky lg:top-28">
                        <HeroAppPreview />
                    </div>
                </div>
            </div>
        </section>
    );
}
