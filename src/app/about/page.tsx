'use client';

import { motion } from 'framer-motion';
import UnifiedSovereignHeader from '@/components/UnifiedSovereignHeader';
import FooterStartNow from '@/components/marketing/FooterStartNow';

export default function AboutPage() {
    return (
        <main className="min-h-screen bg-[#050505] text-white">
            <UnifiedSovereignHeader forceDark primaryCta={{ label: 'Open Sample Read', href: '/share/sample-dossier' }} />

            {/* Hero */}
            <section className="pt-30 pb-24 lg:pt-36 lg:pb-28">
                <div className="mx-auto w-full max-w-[1120px] px-6 lg:px-12">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                        className="max-w-[900px]"
                    >
                        <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-[#C1A674]">
                            A Forensic Intelligence OS
                        </p>
                        <h1 className="mt-5 text-[clamp(52px,6.4vw,102px)] font-black leading-[0.9] tracking-[-0.045em] uppercase text-white max-w-[15ch]">
                            Creative decisions deserve better tools.
                        </h1>
                        <p className="mt-10 max-w-[760px] text-[16px] leading-[1.7] text-[#F6F1E7]/78">
                            Visual Decompiler exists to make creative work easier to defend, faster to align, and faster to get approved.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Problem + Why + What + Commercial + Positioning + Vision */}
            <section className="px-6 pb-40 lg:pb-56">
                <div className="mx-auto max-w-[1400px] border-t border-white/10 pt-16 lg:pt-24">
                    <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16">
                        <motion.article
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                            className="rounded-[28px] border border-white/10 bg-white/[0.03] p-8 lg:p-10"
                        >
                            <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-[#C1A674]">The Problem</p>
                            <p className="mt-5 text-[24px] font-semibold leading-[1.25] tracking-[-0.01em] text-[#F6F1E7]">
                                Creative work is still judged the same way it was 20 years ago.
                            </p>
                            <p className="mt-5 text-[16px] leading-[1.7] text-white/70">
                                Instinct. Opinion. Subjective feedback.
                                <br />
                                <br />
                                Work gets delayed. Rounds stack up. Clients hesitate.
                                <br />
                                <br />
                                Not because the work is wrong, but because the reasoning isn’t visible.
                            </p>
                        </motion.article>

                        <motion.article
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.7, delay: 0.05, ease: [0.16, 1, 0.3, 1] }}
                            className="rounded-[28px] border border-white/10 bg-white/[0.03] p-8 lg:p-10"
                        >
                            <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-[#C1A674]">Why This Exists</p>
                            <p className="mt-5 text-[16px] leading-[1.7] text-white/78">
                                Visual Decompiler was built to change that.
                                <br />
                                <br />
                                To turn creative instinct into structured reasoning.
                                <br />
                                <br />
                                To make visual work readable, explainable, and defensible in the moments that matter.
                            </p>
                        </motion.article>

                        <motion.article
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                            className="rounded-[28px] border border-white/10 bg-white/[0.03] p-8 lg:p-10"
                        >
                            <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-[#C1A674]">What It Is</p>
                            <p className="mt-5 text-[16px] leading-[1.7] text-white/78">
                                Visual Decompiler is a creative intelligence system.
                                <br />
                                <br />
                                It analyzes advertising at a structural level and produces a dossier designed for real-world decision environments.
                            </p>
                        </motion.article>

                        <motion.article
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
                            className="rounded-[28px] border border-[#C1A674]/30 bg-[#0F0F0F] p-8 lg:p-10"
                        >
                            <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-[#C1A674]">Commercial Reality</p>
                            <p className="mt-5 text-[16px] leading-[1.7] text-white/78">
                                Agencies don’t lose work because they lack ideas.
                                <br />
                                <br />
                                They lose time and momentum in the gap between instinct and approval.
                                <br />
                                <br />
                                Visual Decompiler exists to close that gap.
                            </p>
                        </motion.article>
                    </div>

                    <motion.div
                        initial={{ opacity: 0, y: 24 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.75, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                        className="mt-12 rounded-[28px] border border-white/10 bg-white/[0.02] px-8 py-10 lg:px-10"
                    >
                        <p className="text-[24px] font-semibold leading-[1.25] tracking-[-0.01em] text-[#F6F1E7]">
                            This isn’t about generating ideas.
                            <br />
                            It’s about getting them approved.
                        </p>
                        <p className="mt-8 max-w-[760px] text-[16px] leading-[1.7] text-white/72">
                            We’re building the system creative teams use to explain, defend, and move work forward.
                            <br />
                            From internal reviews to final client decisions.
                        </p>
                    </motion.div>
                </div>
            </section>

            <FooterStartNow />
        </main>
    );
}
