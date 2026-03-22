'use client';

import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

const FINAL_CTA_HEADLINE = 'Start free. See real output in minutes.'

export default function FooterStartNow() {
    return (
        <footer className="border-t border-[#E2D8C8] bg-[#FBFBF6] px-6 pb-8 pt-16 md:pt-20">
            <div className="max-w-7xl mx-auto">

                {/* Main CTA Section */}
                <div className="relative mb-8 overflow-hidden rounded-[2rem] border border-[#D8CCB5] bg-[radial-gradient(circle_at_top,rgba(212,165,116,0.12),transparent_42%),#FBFBF6] px-8 py-12 md:rounded-[3rem] md:p-16">
                    <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-12">

                        {/* Left: Headline */}
                        <div className="flex-1 text-center lg:text-left">
                            <p className="mb-4 text-[10px] font-bold uppercase tracking-[0.34em] text-[#C1A67B]">
                                Observer Tier
                            </p>
                            <motion.h2
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                className="mb-4 text-4xl font-semibold uppercase leading-[0.95] tracking-tighter text-[#141414] md:text-6xl"
                            >
                                {FINAL_CTA_HEADLINE}
                            </motion.h2>
                            <p className="mx-auto max-w-xl text-base leading-relaxed text-[#5E5A53] md:text-lg lg:mx-0">
                                Upload a competitor ad and get your first client-ready dossier. No card required.
                            </p>
                        </div>

                        {/* Right: CTA */}
                        <div className="w-full flex-shrink-0 lg:w-auto">
                            <motion.a
                                href="/ingest"
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                className="inline-flex w-full items-center justify-center gap-3 rounded-full bg-[#141414] px-8 py-4 text-base font-semibold text-[#FBF7EF] shadow-[0_18px_36px_rgba(20,20,20,0.14)] transition-colors hover:bg-black sm:w-auto sm:px-10 sm:py-5 sm:text-lg"
                            >
                                Start Analysis
                                <ArrowUpRight className="w-5 h-5" />
                            </motion.a>
                            <p className="mt-4 text-center text-[10px] font-bold uppercase tracking-[0.22em] text-[#8A7B64]">
                                Observer tier: 5 free analyses (no card required)
                            </p>
                        </div>
                    </div>
                </div>

                <div className="mb-8 rounded-[2rem] border border-[#D8CCB5] bg-[#F8F3EA] px-6 py-6 md:px-8">
                    <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-[#8A7B64]">About Visual Decompiler</p>
                    <p className="mt-3 max-w-5xl text-[15px] leading-7 text-[#5E5A53] md:text-base">
                        Visual Decompiler is designed to be more convenient than manual analysis, but significantly deeper than using ChatGPT on its own. It combines visual intelligence, strategic structure, and market context into outputs teams can trust and act on quickly. With white-label delivery, agencies and consultants can present premium analytics as their own client-facing system.
                    </p>
                </div>

                <div className="mb-8 grid gap-4 md:grid-cols-3">
                    <div className="group rounded-[2rem] border border-[#D8CCB5] bg-[#FBFBF6] px-6 py-6 transition-colors hover:border-[#D0B896]">
                        <div className="mb-3 h-px w-16 bg-gradient-to-r from-[#D0B896] to-transparent opacity-60 transition-opacity group-hover:opacity-100" />
                        <p className="text-lg font-semibold leading-snug text-[#141414]">
                            Is this just another AI writer?
                        </p>
                        <p className="mt-3 text-[15px] leading-7 text-[#5E5A53]">
                            No. Visual Decompiler analyses existing ads and returns structured strategic intelligence.
                        </p>
                    </div>
                    <div className="group rounded-[2rem] border border-[#D8CCB5] bg-[#FBFBF6] px-6 py-6 transition-colors hover:border-[#D0B896]">
                        <div className="mb-3 h-px w-16 bg-gradient-to-r from-[#D0B896] to-transparent opacity-60 transition-opacity group-hover:opacity-100" />
                        <p className="text-lg font-semibold leading-snug text-[#141414]">
                            How is this different from ad libraries?
                        </p>
                        <p className="mt-3 text-[15px] leading-7 text-[#5E5A53]">
                            Libraries show what exists; Visual Decompiler explains why it works and how to act on it.
                        </p>
                    </div>
                    <div className="group rounded-[2rem] border border-[#D8CCB5] bg-[#FBFBF6] px-6 py-6 transition-colors hover:border-[#D0B896]">
                        <div className="mb-3 h-px w-16 bg-gradient-to-r from-[#D0B896] to-transparent opacity-60 transition-opacity group-hover:opacity-100" />
                        <p className="text-lg font-semibold leading-snug text-[#141414]">
                            Will my team actually use this?
                        </p>
                        <p className="mt-3 text-[15px] leading-7 text-[#5E5A53]">
                            Yes — built for team workflows: boards, vault memory, white-label export, and shared seats.
                        </p>
                    </div>
                </div>

                {/* Footer Links Bar */}
                <div className="flex flex-col items-center justify-between gap-6 border-t border-[#E2D8C8] px-4 py-6 md:flex-row">

                    {/* Branding */}
                    <div className="flex items-center gap-3">
                        <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#141414] text-sm font-bold text-[#FBF7EF]">V</div>
                        <div className="flex flex-col">
                            <span className="text-sm font-bold leading-none tracking-tight uppercase text-[#141414]">Visual Decompiler</span>
                            <span className="text-[9px] font-semibold uppercase tracking-[0.2em] text-[#8A7B64]">Advertising Intelligence</span>
                        </div>
                    </div>

                    {/* Links */}
                    <div className="flex flex-wrap justify-center gap-6 text-[11px] font-semibold uppercase tracking-[0.15em] text-[#8A7B64]">
                        <a href="/about" className="transition-colors hover:text-[#141414]">About</a>
                        <a href="/pricing" className="transition-colors hover:text-[#141414]">Pricing</a>
                        <a href="/for-art-directors" className="transition-colors hover:text-[#141414]">Persona Guides</a>
                        <a href="/trust-method" className="transition-colors hover:text-[#141414]">Trust & Method</a>
                        <a href="/vault" className="transition-colors hover:text-[#141414]">Vault</a>
                        <a href="/docs/user-guide" className="transition-colors hover:text-[#141414]">Help Center</a>
                        <a href="/login" className="transition-colors hover:text-[#141414]">Login</a>
                    </div>

                    {/* Legal */}
                    <div className="flex gap-6 text-[10px] font-semibold uppercase tracking-[0.15em] text-[#9A9082]">
                        <a href="#" className="transition-colors hover:text-[#141414]">Terms</a>
                        <a href="#" className="transition-colors hover:text-[#141414]">Privacy</a>
                        <span>© 2026</span>
                    </div>
                </div>

            </div>
        </footer>
    );
}
