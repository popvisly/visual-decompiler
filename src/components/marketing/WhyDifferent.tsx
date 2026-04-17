'use client';

import { motion } from 'framer-motion';

const FIT_BLOCKS = [
    {
        title: 'Pre-Pitch',
        body: 'Break down references before the room does.',
    },
    {
        title: 'Creative Review',
        body: 'Remove opinion. Align on structure.',
    },
    {
        title: 'Client Presentation',
        body: 'Defend decisions with clarity, not instinct.',
    },
];

export default function WhyDifferent() {
    return (
        <section className="relative overflow-hidden bg-[#0B0B0B] py-24 text-[#F6F1E7] lg:py-32" data-presence-tone="dark">
            <div className="relative z-10 mx-auto max-w-[1200px] px-6 lg:px-12">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-80px' }}
                    transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
                    className="mb-10"
                >
                    <p className="mb-4 text-[10px] font-bold uppercase tracking-[0.4em] text-[#C1A674]">Use cases</p>
                    <h2 className="text-[10vw] font-black uppercase leading-[0.9] tracking-[-0.04em] text-[#F6F1E7] lg:text-[64px]">
                        Where it fits
                    </h2>
                </motion.div>

                <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
                    {FIT_BLOCKS.map((block, idx) => (
                        <motion.article
                            key={block.title}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: '-50px' }}
                            transition={{ duration: 0.7, delay: idx * 0.08, ease: [0.16, 1, 0.3, 1] }}
                            className="rounded-[20px] border border-white/10 bg-white/[0.02] p-6"
                        >
                            <h3 className="text-[11px] font-bold uppercase tracking-[0.24em] text-[#C1A674]">{block.title}</h3>
                            <p className="mt-4 text-[16px] leading-[1.6] text-[#F6F1E7]/82">{block.body}</p>
                        </motion.article>
                    ))}
                </div>
            </div>
        </section>
    );
}
