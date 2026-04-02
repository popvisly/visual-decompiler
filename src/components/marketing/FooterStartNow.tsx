'use client';

import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { HOMEPAGE_CTA_ICON, HOMEPAGE_PRIMARY_CTA } from '@/components/marketing/ctaStyles';

export default function FooterStartNow() {
    return (
        <footer className="relative overflow-hidden scroll-mt-20 bg-transparent px-6 pb-8 pt-14 text-[#141414] md:scroll-mt-24 md:pt-[4.5rem] lg:scroll-mt-[104px]">
            <div className="max-w-7xl mx-auto">

                {/* Main CTA Section */}
                <div className="relative mb-6 overflow-hidden rounded-[2.25rem] border border-[#D2C3AA] bg-[#FBFBF6] px-8 py-10 shadow-[0_30px_76px_rgba(20,20,20,0.09)] md:rounded-[3rem] md:px-10 md:py-12 lg:px-14 lg:py-14">
                    <div className="pointer-events-none absolute inset-0 opacity-[0.05] [background-image:linear-gradient(#D4A574_1px,transparent_1px),linear-gradient(90deg,#D4A574_1px,transparent_1px)] [background-size:56px_56px]" />
                    <div className="relative z-10 grid gap-8 lg:grid-cols-[1.05fr_0.72fr] lg:items-center lg:gap-10">

                        {/* Left: Headline */}
                        <div className="text-center lg:text-left">
                            <div className="mb-4 flex items-center justify-center gap-3 lg:justify-start">
                                <span className="h-px w-8 bg-gradient-to-r from-[#D4A574] to-transparent" />
                                <p className="text-[10px] font-bold uppercase tracking-[0.42em] text-[#C1A67B]">
                                    Observer Tier
                                </p>
                            </div>
                            <div className="mb-5 flex items-center justify-center gap-1.5 lg:justify-start">
                                <span className="h-1.5 w-8 rounded-full bg-[#F4A700]" />
                                <span className="h-1.5 w-5 rounded-full bg-[#C8230A]" />
                                <span className="h-1.5 w-4 rounded-full bg-[#D4A574]" />
                                <span className="h-1.5 w-3 rounded-full bg-[#F5EDE3]" />
                                <span className="h-1.5 w-5 rounded-full bg-[#D7B07A]" />
                            </div>
                            <motion.h2
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                className="mb-5 max-w-3xl text-[34px] font-bold uppercase leading-[0.96] tracking-tight text-[#141414] md:text-5xl lg:max-w-2xl"
                            >
                                Start free. See real <span className="text-[#F4A700]">output</span> in minutes.
                            </motion.h2>
                            <p className="mx-auto max-w-xl text-[16px] leading-relaxed text-[#4F4941] md:text-[18px] font-medium tracking-tight lg:mx-0">
                                Upload a competitor ad and get your first client-ready dossier. No card required.
                            </p>
                        </div>

                        {/* Right: CTA */}
                        <div className="w-full">
                            <div className="rounded-[2rem] border border-[#D2C3AA] bg-[#F5EDE3] px-6 py-7 text-center shadow-[0_22px_48px_rgba(20,20,20,0.1)] md:px-8 md:py-8 lg:text-left">
                                <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-[#C9A56F]">
                                    Start with Observer
                                </p>
                                <p className="mt-3 text-[15px] leading-relaxed text-[#4F4941]">
                                    Get real analysis first, then scale into team workflows when it matters.
                                </p>

                                <motion.a
                                    href="/ingest"
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    className={`${HOMEPAGE_PRIMARY_CTA} mt-6 w-full !shadow-[0_18px_36px_rgba(20,20,20,0.18)] text-base sm:w-auto sm:px-10 sm:py-5 sm:text-lg`}
                                >
                                    <span>Start Decompiling Free</span>
                                    <ArrowUpRight className={HOMEPAGE_CTA_ICON} />
                                </motion.a>
                                <p className="mt-4 text-center text-[10px] font-bold uppercase tracking-[0.22em] text-[#8A7B64] lg:text-left">
                                    Observer tier: 5 free analyses (no card required)
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Footer Links Bar */}
                <div className="flex flex-col items-center justify-between gap-5 px-4 py-5 md:flex-row">

                    {/* Branding */}
                    <div className="flex items-center gap-3">
                        <img
                            src="/images/logo/Visual_Decompiler_Logo_v2_400px.png"
                            alt="Visual Decompiler Graphic"
                            className="h-7 w-7 object-contain"
                        />
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
