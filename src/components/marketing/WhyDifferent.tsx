'use client';

import { motion, useReducedMotion } from 'framer-motion';
import MarketingSectionHeading from '@/components/marketing/MarketingSectionHeading';
import { MARKETING_CARD_PADDED } from '@/components/marketing/cardStyles';

const FIT_BLOCKS = [
    {
        title: 'Strategists',
        body: 'Turn visual instinct into structured rationale for decks, presentations, and pitch narratives.',
    },
    {
        title: 'Creative Directors',
        body: 'Defend bold creative decisions with clearer alignment and strategic framing.',
    },
    {
        title: 'Agency Teams',
        body: 'Reduce subjective feedback loops during reviews and approvals.',
    },
    {
        title: 'Freelancers & Consultants',
        body: 'Present work with stronger rationale and more client confidence.',
    },
];

export default function WhyDifferent() {
    const prefersReducedMotion = useReducedMotion();

    return (
        <section className="relative overflow-hidden bg-[#FBFBF6] py-24 text-[#141414] lg:py-32">
            <div className="relative z-10 mx-auto max-w-[1200px] px-6 lg:px-12">
                <MarketingSectionHeading kicker="Use cases" title="Where it fits" className="mb-10" />

                <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                    {FIT_BLOCKS.map((block, idx) => (
                        <motion.article
                            key={block.title}
                            initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
                            whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: '-50px' }}
                            transition={prefersReducedMotion ? undefined : { duration: 0.65, delay: idx * 0.08, ease: [0.16, 1, 0.3, 1] }}
                            className={MARKETING_CARD_PADDED}
                        >
                            <h3 className="text-[11px] font-bold uppercase tracking-[0.24em] text-[#8B6A3D]/80">{block.title}</h3>
                            <p className="mt-4 text-[16px] leading-[1.65] text-[#6B6B6B]">{block.body}</p>
                        </motion.article>
                    ))}
                </div>
            </div>
        </section>
    );
}
