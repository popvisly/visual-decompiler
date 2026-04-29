'use client';

import { motion } from 'framer-motion';
import MarketingSectionHeading from '@/components/marketing/MarketingSectionHeading';

type Props = {
    compact?: boolean;
};

export default function BeforeAfterContrast({ compact = false }: Props) {
    return (
        <section
            className={
                compact
                    ? 'relative overflow-hidden bg-[#FBFBF6] pt-14 pb-16 text-[#141414] lg:pt-18 lg:pb-20'
                    : 'relative overflow-hidden bg-[#FBFBF6] py-24 text-[#141414] lg:py-32'
            }
        >
            <div className="relative z-10 mx-auto max-w-[1120px] px-6 lg:px-12">
                <MarketingSectionHeading kicker="Contrast" title="Before the room starts asking questions." className="max-w-[900px]" />

                <div className="mt-10 grid gap-5 md:grid-cols-2">
                    <motion.article
                        initial={{ opacity: 0, y: 18 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: '-50px' }}
                        transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
                        className="rounded-[22px] border border-black/5 bg-white p-6 shadow-sm"
                    >
                        <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[#6B6B6B]">Without Visual Decompiler</p>
                        <ul className="mt-4 space-y-2 text-[16px] leading-[1.7] text-[#6B6B6B]">
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
                        className="rounded-[22px] border border-black/5 bg-[#FBFBF6] p-6 shadow-sm"
                    >
                        <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[#8B6A3D]/80">With Visual Decompiler</p>
                        <ul className="mt-4 space-y-2 text-[16px] leading-[1.7] text-[#5E5A53]">
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
