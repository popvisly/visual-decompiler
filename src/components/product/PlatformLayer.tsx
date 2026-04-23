'use client';

import { motion } from 'framer-motion';

const OUTCOME_CARDS = [
    {
        title: 'Creative Reviews',
        body: 'When feedback stays subjective, strong work gets diluted. Visual Decompiler creates a shared language for discussing the work — helping teams align faster and reduce endless opinion loops.',
    },
    {
        title: 'Pitch Preparation',
        body: 'Creative rationale often gets rebuilt from scratch before every presentation. Visual Decompiler turns ads and references into structured reasoning ready for decks, reviews, and client conversations.',
    },
    {
        title: 'Client Confidence',
        body: 'Clients hesitate when they can’t clearly see the reasoning behind the work. Visual Decompiler makes creative intent visible — helping decisions feel grounded, strategic, and easier to approve.',
    },
];

export default function PlatformLayer() {
    return (
        <section className="pt-24 pb-24 lg:pt-30 lg:pb-32" data-presence-tone="dark">
            <div className="mx-auto max-w-[1120px] px-6 lg:px-12">
                <div className="max-w-[900px]">
                    <p className="text-[10px] font-semibold uppercase tracking-[0.38em] text-[#C1A674]">Built for the Room</p>
                    <h2 className="mt-6 text-[11vw] font-semibold uppercase leading-[0.9] tracking-[-0.04em] text-[#F6F1E7] sm:text-[8vw] lg:text-[62px]">
                        Where creative decisions actually get made.
                    </h2>
                    <p className="mt-8 text-[19px] leading-[1.8] text-[#F6F1E7]/72">
                        Creative reviews break down when everything stays subjective.
                        <br />
                        <br />
                        Feedback turns into opinion. Strong ideas get diluted. Decisions slow down.
                        <br />
                        <br />
                        Visual Decompiler creates a shared language for discussing the work — helping teams align faster and defend creative decisions more clearly.
                    </p>
                </div>

                <div className="mt-12 grid gap-6 lg:grid-cols-3">
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
                            <p className="mt-5 text-[17px] leading-[1.75] text-[#F6F1E7]/80">{card.body}</p>
                        </motion.article>
                    ))}
                </div>
            </div>
        </section>
    );
}
