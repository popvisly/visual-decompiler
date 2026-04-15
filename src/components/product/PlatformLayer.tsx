'use client';

import { motion } from 'framer-motion';

const WORKFLOW = [
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

export default function PlatformLayer() {
    return (
        <>
            <section className="pt-28 pb-[5.5rem] lg:pt-[8.5rem] lg:pb-[6.5rem]" data-presence-tone="dark">
                <div className="mx-auto max-w-[1120px] px-6 lg:px-12">
                    <div className="max-w-[900px]">
                        <p className="text-[10px] font-semibold uppercase tracking-[0.38em] text-[#C1A674]">Workflow</p>
                        <h2 className="mt-6 text-[11vw] font-semibold uppercase leading-[0.9] tracking-[-0.04em] text-[#F6F1E7] sm:text-[8vw] lg:text-[62px]">
                            Built into the way agencies already work.
                        </h2>
                    </div>

                    <div className="mt-14 divide-y divide-white/12 border-y border-white/10">
                        {WORKFLOW.map((item, index) => (
                            <motion.article
                                key={item.title}
                                initial={{ opacity: 0, y: 14 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: '-60px' }}
                                transition={{ duration: 0.55, delay: index * 0.05, ease: [0.16, 1, 0.3, 1] }}
                                className="grid gap-5 py-10 md:grid-cols-[220px_1fr]"
                            >
                                <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[#C1A674]">{item.title}</p>
                                <p className="text-[17px] leading-[1.8] text-[#F6F1E7]/70">{item.body}</p>
                            </motion.article>
                        ))}
                    </div>
                </div>
            </section>

            <section className="pt-24 pb-20 lg:pt-[7.5rem] lg:pb-24" data-presence-tone="dark">
                <div className="mx-auto max-w-[1120px] px-6 lg:px-12">
                    <div className="max-w-[760px]">
                        <p className="text-[10px] font-semibold uppercase tracking-[0.38em] text-[#C1A674]">White Label</p>
                        <h2 className="mt-6 text-[11vw] font-semibold uppercase leading-[0.9] tracking-[-0.04em] text-[#F6F1E7] sm:text-[8vw] lg:text-[62px]">
                            Your thinking. Your system.
                        </h2>
                        <p className="mt-7 text-[19px] leading-[1.8] text-[#F6F1E7]/70">
                            Deliver Visual Decompiler outputs under your agency or brand.
                        </p>
                    </div>
                </div>
            </section>
        </>
    );
}
