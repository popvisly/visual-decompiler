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
                kicker="Transforming Creative Intelligence"
                title="Better creative decisions."
                description="Visual Decompiler simplifies the defense of creative work, accelerates alignment, and speeds up approval processes."
            />

            {/* Problem + Why + What + Commercial + Positioning + Vision */}
            <section className="pb-40 lg:pb-56">
                <div className="mx-auto w-full max-w-[1120px] px-6 lg:px-12">
                    <div className="pt-16 lg:pt-24">
                    <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16">
                        <motion.article
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                            className="rounded-[28px] border border-black/5 bg-white p-8 shadow-sm lg:p-10"
                        >
                            <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-[#8B6A3D]/80">The Challenge</p>
                            <p className="mt-5 text-[24px] font-semibold leading-[1.25] tracking-[-0.01em] text-[#141414]">
                                Creative work has been evaluated using outdated methods for over two decades.
                            </p>
                            <p className="mt-5 text-[16px] leading-[1.7] text-[#6B6B6B]">
                                Instinct. Opinion. Subjective feedback.
                                <br />
                                <br />
                                Delays accumulate. Rounds of revisions multiply. Clients hesitate.
                                <br />
                                <br />
                                Not due to shortcomings in creativity — but because the rationale behind the work remains obscured.
                            </p>
                        </motion.article>

                        <motion.article
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.7, delay: 0.05, ease: [0.16, 1, 0.3, 1] }}
                            className="rounded-[28px] border border-black/5 bg-white p-8 shadow-sm lg:p-10"
                        >
                            <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-[#8B6A3D]/80">Our Purpose</p>
                            <p className="mt-5 text-[16px] leading-[1.7] text-[#6B6B6B]">
                                Visual Decompiler was designed to revolutionize this dynamic.
                                <br />
                                <br />
                                We transform instinctive creativity into structured reasoning.
                                <br />
                                <br />
                                Our goal is to make visual work accessible, explainable, and defensible in high-stakes moments.
                            </p>
                        </motion.article>

                        <motion.article
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                            className="rounded-[28px] border border-black/5 bg-white p-8 shadow-sm lg:p-10"
                        >
                            <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-[#8B6A3D]/80">What We Offer</p>
                            <p className="mt-5 text-[16px] leading-[1.7] text-[#6B6B6B]">
                                Visual Decompiler is your go-to creative intelligence platform.
                                <br />
                                <br />
                                It examines advertising on a structural basis, crafting a dossier tailored for real-world decision-making environments.
                            </p>
                        </motion.article>

                        <motion.article
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
                            className="rounded-[28px] border border-[#8B6A3D]/15 bg-[#141414] p-8 shadow-[0_20px_60px_rgba(0,0,0,0.18)] lg:p-10"
                        >
                            <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-[#D4A574]">Understanding Commercial Realities</p>
                            <p className="mt-5 text-[16px] leading-[1.7] text-white/80">
                                Agencies don’t falter due to a lack of ideas.
                                <br />
                                <br />
                                They lose valuable time and momentum in the limbo between intuition and approval.
                                <br />
                                <br />
                                Visual Decompiler is here to bridge that gap.
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
                            This isn’t merely about generating ideas.
                            <br />
                            It’s about securing their approval.
                        </p>
                        <p className="mt-8 max-w-[760px] text-[16px] leading-[1.7] text-[#6B6B6B]">
                            We are building the system that empowers creative teams to articulate, justify, and advance their work —
                            <br />
                            from internal evaluations to final client decisions.
                        </p>
                    </motion.div>
                    </div>
                </div>
            </section>

            <FooterStartNow />
        </main>
    );
}
