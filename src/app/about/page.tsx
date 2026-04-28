'use client';

import { motion } from 'framer-motion';
import UnifiedSovereignHeader from '@/components/UnifiedSovereignHeader';
import FooterStartNow from '@/components/marketing/FooterStartNow';
import MarketingPageHeader from '@/components/marketing/MarketingPageHeader';

export default function AboutPage() {
    return (
        <main className="min-h-screen bg-[#FBFBF6] text-[#141414]">
            <UnifiedSovereignHeader primaryCta={{ label: 'Open Sample Read', href: '/share/sample-dossier' }} />
            <MarketingPageHeader
                kicker="A Forensic Intelligence OS"
                title="Creative decisions deserve better tools."
                description="Visual Decompiler exists to make creative work easier to defend, faster to align, and faster to get approved."
            />

            {/* Problem + Why + What + Commercial + Positioning + Vision */}
            <section className="pb-40 lg:pb-56">
                <div className="mx-auto w-full max-w-[1120px] px-6 lg:px-12">
                    <div className="border-t border-black/5 pt-16 lg:pt-24">
                    <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16">
                        <motion.article
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                            className="rounded-[28px] border border-black/5 bg-white p-8 shadow-sm lg:p-10"
                        >
                            <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-[#8B6A3D]/80">The Problem</p>
                            <p className="mt-5 text-[24px] font-semibold leading-[1.25] tracking-[-0.01em] text-[#141414]">
                                Creative work is still judged the same way it was 20 years ago.
                            </p>
                            <p className="mt-5 text-[16px] leading-[1.7] text-[#6B6B6B]">
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
                            className="rounded-[28px] border border-black/5 bg-white p-8 shadow-sm lg:p-10"
                        >
                            <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-[#8B6A3D]/80">Why This Exists</p>
                            <p className="mt-5 text-[16px] leading-[1.7] text-[#6B6B6B]">
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
                            className="rounded-[28px] border border-black/5 bg-white p-8 shadow-sm lg:p-10"
                        >
                            <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-[#8B6A3D]/80">What It Is</p>
                            <p className="mt-5 text-[16px] leading-[1.7] text-[#6B6B6B]">
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
                            className="rounded-[28px] border border-[#8B6A3D]/15 bg-[#141414] p-8 shadow-[0_20px_60px_rgba(0,0,0,0.18)] lg:p-10"
                        >
                            <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-[#D4A574]">Commercial Reality</p>
                            <p className="mt-5 text-[16px] leading-[1.7] text-white/80">
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
                        className="mt-12 rounded-[28px] border border-black/5 bg-white px-8 py-10 shadow-sm lg:px-10"
                    >
                        <p className="text-[24px] font-semibold leading-[1.25] tracking-[-0.01em] text-[#141414]">
                            This isn’t about generating ideas.
                            <br />
                            It’s about getting them approved.
                        </p>
                        <p className="mt-8 max-w-[760px] text-[16px] leading-[1.7] text-[#6B6B6B]">
                            We’re building the system creative teams use to explain, defend, and move work forward.
                            <br />
                            From internal reviews to final client decisions.
                        </p>
                    </motion.div>
                    </div>
                </div>
            </section>

            <FooterStartNow />
        </main>
    );
}
