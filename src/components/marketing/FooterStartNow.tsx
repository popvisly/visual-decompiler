'use client';

import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { HOMEPAGE_CTA_ICON, HOMEPAGE_PRIMARY_CTA } from '@/components/marketing/ctaStyles';

const FINAL_CTA_HEADLINE = 'Start free. See real output in minutes.'

export default function FooterStartNow() {
    return (
        <footer className="border-t border-[#E2D8C8] bg-[#FBFBF6] px-6 pb-8 pt-14 md:pt-[4.5rem]">
            <div className="max-w-7xl mx-auto">

                {/* Main CTA Section */}
                <div className="relative mb-6 overflow-hidden rounded-[2.25rem] border border-[#D8CCB5] bg-[radial-gradient(circle_at_top_left,rgba(212,165,116,0.18),transparent_34%),linear-gradient(180deg,#FBFBF6_0%,#F7F1E7_100%)] px-8 py-10 shadow-[0_20px_44px_rgba(20,18,15,0.06)] md:rounded-[3rem] md:px-10 md:py-12 lg:px-14 lg:py-14">
                    <div className="pointer-events-none absolute inset-0 opacity-[0.22] [background-image:linear-gradient(rgba(20,20,20,0.028)_1px,transparent_1px),linear-gradient(90deg,rgba(20,20,20,0.028)_1px,transparent_1px)] [background-size:56px_56px]" />
                    <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.85),rgba(255,255,255,0)_72%)]" />

                    <div className="relative z-10 grid gap-8 lg:grid-cols-[1.05fr_0.72fr] lg:items-center lg:gap-10">

                        {/* Left: Headline */}
                        <div className="text-center lg:text-left">
                            <div className="mb-4 flex items-center justify-center gap-3 lg:justify-start">
                                <span className="h-px w-8 bg-gradient-to-r from-[#D4A574] to-transparent" />
                                <p className="text-[10px] font-bold uppercase tracking-[0.42em] text-[#C1A67B]">
                                    Observer Tier
                                </p>
                            </div>
                            <motion.h2
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                className="mb-5 max-w-3xl text-[34px] font-bold uppercase leading-[0.96] tracking-tight text-[#141414] md:text-5xl lg:max-w-2xl"
                            >
                                {FINAL_CTA_HEADLINE}
                            </motion.h2>
                            <p className="mx-auto max-w-xl text-[16px] leading-relaxed text-[#5E5A53] md:text-[18px] font-medium tracking-tight lg:mx-0">
                                Upload a competitor ad and get your first client-ready dossier. No card required.
                            </p>
                        </div>

                        {/* Right: CTA */}
                        <div className="w-full">
                            <div className="rounded-[2rem] border border-[#2B241A] bg-[#151310] px-6 py-7 text-center shadow-[0_26px_50px_rgba(20,18,15,0.18)] md:px-8 md:py-8 lg:text-left">
                                <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-[#C9A56F]">
                                    Start with Observer
                                </p>
                                <p className="mt-3 text-[15px] leading-relaxed text-[#E7D9C3]">
                                    Get real analysis first, then scale into team workflows when it matters.
                                </p>

                                <motion.a
                                    href="/ingest"
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    className={`${HOMEPAGE_PRIMARY_CTA} mt-6 w-full text-base sm:w-auto sm:px-10 sm:py-5 sm:text-lg`}
                                >
                                    <span>Start Decompiling Free</span>
                                    <ArrowUpRight className={HOMEPAGE_CTA_ICON} />
                                </motion.a>
                                <p className="mt-4 text-center text-[10px] font-bold uppercase tracking-[0.22em] text-[#A9987E] lg:text-left">
                                    Observer tier: 5 free analyses (no card required)
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mb-6 rounded-[2rem] border border-[#D8CCB5] bg-[#F8F3EA] px-6 py-6 md:px-8 border-l-[3px] border-[#D4A574]">
                    <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-[#8A7B64]">About Visual Decompiler</p>
                    <p className="mt-4 max-w-5xl text-[15px] leading-7 text-[#5E5A53] md:text-base font-medium tracking-tight">
                        Visual Decompiler is a Forensic Advertising Intelligence OS designed to be faster than manual analysis and deeper than ChatGPT alone. It combines forensic diagnosis, strategic readouts, compounding intelligence, and white-label agency delivery into outputs teams can trust and hand to clients confidently.
                    </p>
                </div>

                {/* Footer Links Bar */}
                <div className="flex flex-col items-center justify-between gap-5 border-t border-[#E2D8C8] px-4 py-5 md:flex-row">

                    {/* Branding */}
                    <div className="flex items-center gap-3">
                        <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#141414] text-sm font-bold text-[#FBF7EF]">V</div>
                        <div className="flex flex-col">
                            <span className="text-sm font-bold leading-none tracking-tight uppercase text-[#141414]">Visual Decompiler</span>
                            <span className="text-[9px] font-semibold uppercase tracking-[0.2em] text-[#8A7B64]">Advertising Intelligence</span>
                        </div>
                    </div>

                    {/* Links */}
                    <div className="flex max-w-[34rem] flex-wrap justify-center gap-x-4 gap-y-2 text-[10px] font-semibold uppercase tracking-[0.14em] text-[#8A7B64]">
                        <a href="/about" className="transition-colors hover:text-[#141414]">About</a>
                        <a href="/pricing" className="transition-colors hover:text-[#141414]">Pricing</a>
                        <a href="/for-art-directors" className="transition-colors hover:text-[#141414]">Persona Guides</a>
                        <a href="/trust-method" className="transition-colors hover:text-[#141414]">Trust & Method</a>
                        <a href="/vault" className="transition-colors hover:text-[#141414]">Vault</a>
                        <a href="/docs/user-guide" className="transition-colors hover:text-[#141414]">Help Center</a>
                        <a href="/login" className="transition-colors hover:text-[#141414]">Login</a>
                    </div>

                    {/* Legal */}
                    <div className="flex gap-4 text-[10px] font-medium uppercase tracking-[0.14em] text-[#8F8476]">
                        <a href="#" className="transition-colors hover:text-[#141414]">Terms</a>
                        <a href="#" className="transition-colors hover:text-[#141414]">Privacy</a>
                        <span>© 2026</span>
                    </div>
                </div>

            </div>
        </footer>
    );
}
