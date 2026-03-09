'use client';

import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

export default function FooterStartNow() {
    return (
        <footer className="bg-[#141414] px-6 pb-8 pt-16 md:pt-20 border-t border-white/5">
            <div className="max-w-7xl mx-auto">

                {/* Main CTA Section */}
                <div className="bg-[#1C1C1A] rounded-[2rem] md:rounded-[3rem] px-8 py-12 md:p-16 relative overflow-hidden border border-white/8 mb-8">
                    <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-12">

                        {/* Left: Headline */}
                        <div className="flex-1 text-center lg:text-left">
                            <motion.h2
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                className="text-4xl md:text-6xl font-semibold leading-[0.95] tracking-tighter uppercase mb-4 text-[#FBF7EF]"
                            >
                                Ready to decode<br />
                                <span className="text-[#C1A67B]">your competition?</span>
                            </motion.h2>
                            <p className="text-base md:text-lg text-[#FBF7EF]/45 max-w-md mx-auto lg:mx-0 leading-relaxed">
                                Start deconstructing ads with forensic precision. No credit card required.
                            </p>
                        </div>

                        {/* Right: CTA */}
                        <div className="flex-shrink-0">
                            <motion.a
                                href="/ingest"
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                className="inline-flex items-center gap-3 bg-[#C1A67B] text-[#141414] px-10 py-5 rounded-full text-lg font-semibold shadow-xl hover:bg-[#D4B88A] transition-colors"
                            >
                                Start Now
                                <ArrowUpRight className="w-5 h-5" />
                            </motion.a>
                        </div>
                    </div>

                    {/* Gold glow */}
                    <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#C1A67B] opacity-[0.06] blur-[120px] rounded-full translate-x-1/3 -translate-y-1/3 pointer-events-none" />
                </div>

                {/* Footer Links Bar */}
                <div className="flex flex-col md:flex-row justify-between items-center gap-6 px-4 py-6 border-t border-white/5">

                    {/* Branding */}
                    <div className="flex items-center gap-3">
                        <div className="w-7 h-7 bg-[#C1A67B] flex items-center justify-center rounded-lg text-[#141414] font-bold text-sm">V</div>
                        <div className="flex flex-col">
                            <span className="text-sm font-bold tracking-tight leading-none uppercase text-[#FBF7EF]">VisualDecompiler</span>
                            <span className="text-[9px] font-semibold tracking-[0.2em] uppercase text-[#FBF7EF]/30">Strategic Intelligence</span>
                        </div>
                    </div>

                    {/* Links */}
                    <div className="flex flex-wrap justify-center gap-6 text-[11px] font-semibold uppercase tracking-[0.15em] text-[#FBF7EF]/35">
                        <a href="/pricing" className="hover:text-[#C1A67B] transition-colors">Pricing</a>
                        <a href="/intelligence" className="hover:text-[#C1A67B] transition-colors">Intelligence</a>
                        <a href="/ingest" className="hover:text-[#C1A67B] transition-colors">Login</a>
                    </div>

                    {/* Legal */}
                    <div className="flex gap-6 text-[10px] font-semibold uppercase tracking-[0.15em] text-[#FBF7EF]/20">
                        <a href="#" className="hover:text-[#FBF7EF]/50 transition-colors">Terms</a>
                        <a href="#" className="hover:text-[#FBF7EF]/50 transition-colors">Privacy</a>
                        <span>© 2026</span>
                    </div>
                </div>

            </div>
        </footer>
    );
}
