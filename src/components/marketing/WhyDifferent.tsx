'use client';

import { motion } from 'framer-motion';

const FIT_BLOCKS = [
    {
        title: 'Client Presentations',
        body: 'Walk in with clear reasoning behind every visual decision.',
    },
    {
        title: 'Pre-Pitch Refinement',
        body: 'Pressure-test the work before it leaves the building.',
    },
    {
        title: 'Internal Reviews',
        body: 'Reduce taste debates and align faster around what matters.',
    },
    {
        title: 'Campaign Analysis',
        body: 'Study reference or competitor work beyond surface-level inspiration.',
    },
];

export default function WhyDifferent() {
    return (
        <section className="relative overflow-hidden bg-[#0B0B0B] pt-20 pb-24 text-[#F6F1E7] lg:pt-24 lg:pb-28" data-presence-tone="dark">
            <div className="relative z-10 mx-auto max-w-[1200px] px-6 lg:px-12">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-80px' }}
                    transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
                    className="mb-8"
                >
                    <p className="mb-4 text-[10px] font-bold uppercase tracking-[0.4em] text-[#C1A674]">Use cases</p>
                    <h2 className="text-[10vw] font-black uppercase leading-[0.9] tracking-[-0.04em] text-[#F6F1E7] lg:text-[56px]">
                        Where it fits
                    </h2>
                </motion.div>

                <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                    {FIT_BLOCKS.map((block, idx) => (
                        <motion.article
                            key={block.title}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: '-50px' }}
                            transition={{ duration: 0.65, delay: idx * 0.08, ease: [0.16, 1, 0.3, 1] }}
                            className="rounded-[20px] border border-white/10 bg-white/[0.02] p-6"
                        >
                            <h3 className="text-[11px] font-bold uppercase tracking-[0.24em] text-[#C1A674]">{block.title}</h3>
                            <p className="mt-4 text-[16px] leading-[1.65] text-[#F6F1E7]/82">{block.body}</p>
                        </motion.article>
                    ))}
                </div>
            </div>
        </section>
    );
}
