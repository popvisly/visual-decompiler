'use client';

import { motion } from 'framer-motion';

const OUTCOME_CARDS = [
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

export default function PlatformLayer() {
    return (
        <section className="pt-20 pb-20 lg:pt-24 lg:pb-24" data-presence-tone="dark">
            <div className="mx-auto max-w-[1120px] px-6 lg:px-12">
                <div className="max-w-[900px]">
                    <p className="text-[10px] font-semibold uppercase tracking-[0.38em] text-[#C1A674]">Built for the Room</p>
                    <h2 className="mt-6 text-[11vw] font-semibold uppercase leading-[0.9] tracking-[-0.04em] text-[#F6F1E7] sm:text-[8vw] lg:text-[56px]">
                        Where creative decisions actually get made.
                    </h2>
                    <p className="mt-7 text-[18px] leading-[1.75] text-[#F6F1E7]/72">
                        Built for the people defending the work.
                        <br />
                        <br />
                        Whether you&apos;re a strategist preparing rationale, a creative director defending a campaign, or an agency team aligning around creative decisions, Visual Decompiler helps structure the conversation around the work.
                    </p>
                </div>

                <div className="mt-10 grid gap-6 md:grid-cols-2">
                    {OUTCOME_CARDS.map((card, idx) => (
                        <motion.article
                            key={card.title}
                            initial={{ opacity: 0, y: 24 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: '-60px' }}
                            transition={{ duration: 0.65, delay: idx * 0.08, ease: [0.16, 1, 0.3, 1] }}
                            className="rounded-[26px] border border-white/10 bg-white/[0.025] p-8"
                        >
                            <h3 className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[#C1A674]">{card.title}</h3>
                            <p className="mt-5 text-[16px] leading-[1.72] text-[#F6F1E7]/80">{card.body}</p>
                        </motion.article>
                    ))}
                </div>
            </div>
        </section>
    );
}
