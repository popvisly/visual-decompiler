'use client';

import { motion } from 'framer-motion';

type Props = {
    compact?: boolean;
};

export default function BeforeAfterContrast({ compact = false }: Props) {
    return (
        <section
            className={compact ? 'relative overflow-hidden bg-[#0B0B0B] pt-14 pb-16 text-[#F6F1E7] lg:pt-18 lg:pb-20' : 'relative overflow-hidden bg-[#0B0B0B] pt-16 pb-20 text-[#F6F1E7] lg:pt-20 lg:pb-24'}
            data-presence-tone="dark"
        >
            <div className="relative z-10 mx-auto max-w-[1200px] px-6 lg:px-12">
                <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-80px' }}
                    transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
                    className="max-w-[860px]"
                >
                    <p className="mb-4 text-[10px] font-semibold uppercase tracking-[0.36em] text-[#C1A674]">Contrast</p>
                    <h2 className="text-[10vw] font-black uppercase leading-[0.9] tracking-[-0.04em] text-[#F6F1E7] sm:text-[7vw] lg:text-[56px]">
                        Before the room starts asking questions.
                    </h2>
                </motion.div>

                <div className="mt-10 grid gap-5 md:grid-cols-2">
                    <motion.article
                        initial={{ opacity: 0, y: 18 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: '-50px' }}
                        transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
                        className="rounded-[22px] border border-[rgba(193,166,116,0.22)] bg-white/[0.02] p-6"
                    >
                        <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[#C1A674]">Without Visual Decompiler</p>
                        <ul className="mt-4 space-y-2 text-[16px] leading-[1.7] text-[#F6F1E7]/76">
                            <li>Subjective feedback loops</li>
                            <li>Unclear rationale</li>
                            <li>Conflicting opinions</li>
                            <li>Weak pitch narratives</li>
                            <li>Approval hesitation</li>
                        </ul>
                    </motion.article>

                    <motion.article
                        initial={{ opacity: 0, y: 18 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: '-50px' }}
                        transition={{ duration: 0.65, delay: 0.06, ease: [0.16, 1, 0.3, 1] }}
                        className="rounded-[22px] border border-[rgba(193,166,116,0.22)] bg-white/[0.03] p-6"
                    >
                        <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[#C1A674]">With Visual Decompiler</p>
                        <ul className="mt-4 space-y-2 text-[16px] leading-[1.7] text-[#F6F1E7]/90">
                            <li>Structured reasoning</li>
                            <li>Clearer alignment</li>
                            <li>Stronger presentation narratives</li>
                            <li>More confident reviews</li>
                            <li>Defensible creative decisions</li>
                        </ul>
                    </motion.article>
                </div>
            </div>
        </section>
    );
}
