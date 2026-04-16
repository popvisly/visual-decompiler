'use client';

import { motion } from 'framer-motion';
import UnifiedSovereignHeader from '@/components/UnifiedSovereignHeader';
import FooterStartNow from '@/components/marketing/FooterStartNow';

export default function AboutPage() {
    return (
        <main className="min-h-screen bg-[#050505] text-white">
            <UnifiedSovereignHeader forceDark primaryCta={{ label: 'Open Sample Read', href: '/share/sample-dossier' }} />

            {/* Hero Section */}
            <section className="px-6 pb-28 pt-32 lg:pt-40 lg:pb-36">
                <div className="mx-auto max-w-[1400px]">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                    >
                        <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-[#C1A674] mb-6">
                            A Forensic Intelligence OS
                        </p>
                        <h1 className="text-[clamp(56px,9vw,102px)] font-semibold leading-[0.9] tracking-[-0.04em] uppercase text-white max-w-[15ch]">
                            Built for defensible decisions.
                        </h1>
                    </motion.div>

                    <div className="mt-24 lg:mt-48 grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-0 items-start">
                        <motion.div 
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 1.5, delay: 0.2 }}
                            className="lg:col-span-12 border-t border-white/10 pt-10"
                        >
                            <div className="flex flex-col lg:flex-row justify-between gap-12 lg:gap-24">
                                <div className="max-w-[500px]">
                                    <h2 className="text-[24px] font-semibold leading-[1.25] uppercase tracking-[-0.01em] mb-5">
                                        More than generic AI outputs.
                                    </h2>
                                    <p className="text-[16px] leading-[1.7] text-white/62">
                                        Visual Decompiler was built for teams who need more than subjective creative opinion. 
                                        It is designed to be more convenient than manual analysis, while going significantly 
                                        deeper than using ChatGPT alone.
                                    </p>
                                </div>
                                <div className="max-w-[500px]">
                                    <h2 className="text-[24px] font-semibold leading-[1.25] uppercase tracking-[-0.01em] mb-5">
                                        Trust, reuse, and authority.
                                    </h2>
                                    <p className="text-[16px] leading-[1.7] text-white/62">
                                        By combining visual signal detection, strategic structure, and market context, 
                                        we turn creative assets into strategic readouts teams can trust and hand to 
                                        clients with absolute confidence.
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Split Narrative Section */}
            <section className="px-6 pb-64 lg:pb-96">
                <div className="mx-auto max-w-[1400px]">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-24 lg:gap-0 border-t border-white/10 pt-24">
                        <div className="lg:col-span-5">
                            <h2 className="text-[42px] lg:text-[64px] font-black leading-[0.95] tracking-[-0.04em] uppercase">
                                From forensic prototype to agency standard.
                            </h2>
                        </div>
                        <div className="lg:col-span-6 lg:col-start-7">
                            <div className="space-y-12 text-[20px] leading-[1.65] text-[#A0A0A0]">
                                <p>
                                    What began as a forensic prototype has evolved into a full agency intelligence platform. 
                                    Teams can ingest and compare assets, generate structured dossiers, build persistent 
                                    vault memory, and collaborate through boards—without losing context.
                                </p>
                                <div className="h-px w-24 bg-[#C1A674]/45" />
                                <p className="text-white font-bold italic">
                                    With white-label controls, agencies and consultants can deliver this intelligence 
                                    as their own premium client-facing system — turning analysis into branded strategic authority.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <FooterStartNow />
        </main>
    );
}
