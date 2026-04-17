'use client';

import { motion } from 'framer-motion';

const SYSTEM_PILLARS = [
    {
        title: 'Primary Scores',
        body: 'Clarity, attention, cohesion, intent, and distinction.',
    },
    {
        title: 'Attention Path',
        body: 'A mapped reading of how the eye moves through the work.',
    },
    {
        title: 'Structural Signals',
        body: 'Hierarchy, balance, contrast, density, and focus integrity.',
    },
    {
        title: 'Strategic Read',
        body: 'A concise explanation of what the work is doing, why it works, and where it breaks.',
    },
];

export default function NeuralMapSection() {
    return (
        <section className="relative overflow-hidden bg-[#0B0B0B] py-32 text-[#F6F1E7] lg:py-48" data-presence-tone="dark">
            <div className="relative z-10 mx-auto max-w-[1200px] px-6 lg:px-12">
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-100px' }}
                    transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                    className="mb-14"
                >
                    <p className="mb-6 text-[10px] font-bold uppercase tracking-[0.4em] text-[#C1A674]">
                        Platform frame
                    </p>
                    <h2 className="mb-4 max-w-[14ch] text-[10vw] font-black uppercase leading-[0.88] tracking-[-0.04em] text-[#F6F1E7] lg:text-[72px]">
                        A complete creative intelligence system.
                    </h2>
                    <p className="max-w-[680px] text-[16px] leading-[1.7] text-white/72">
                        A structured system for explaining why the work works.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                    {SYSTEM_PILLARS.map((pillar, idx) => (
                        <motion.article
                            key={pillar.title}
                            initial={{ opacity: 0, y: 22 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: '-60px' }}
                            transition={{ duration: 0.75, delay: idx * 0.08, ease: [0.16, 1, 0.3, 1] }}
                            className="rounded-[24px] border border-white/10 bg-white/[0.02] p-7 md:p-8"
                        >
                            <h3 className="text-[10px] font-bold uppercase tracking-[0.28em] text-[#C1A674]">
                                {pillar.title}
                            </h3>
                            <p className="mt-4 text-[17px] leading-[1.65] text-[#F6F1E7]/82">{pillar.body}</p>
                        </motion.article>
                    ))}
                </div>
            </div>
        </section>
    );
}
