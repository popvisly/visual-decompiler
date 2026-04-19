'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

const PRESSURE_CARDS = [
    {
        label: 'Review Clarity',
        title: 'Creative reviews stall when everything is subjective.',
        lead: 'Feedback becomes opinion. Decisions slow.',
        body: 'Visual Decompiler replaces instinct with structure — so teams can align faster, with clearer reasoning behind the work.',
    },
    {
        label: 'Pitch Preparation',
        title: 'Pitch preparation is manual and inconsistent.',
        lead: 'Reference gathering. Breakdowns. Guesswork.',
        body: 'Visual Decompiler turns any ad into a structured read — ready for decks, internal discussion, and clearer creative reasoning.',
    },
    {
        label: 'Client Confidence',
        title: "Clients don\'t trust what they can\'t see.",
        lead: 'Strong ideas collapse into hesitation.',
        body: 'Visual Decompiler makes creative reasoning visible — so decisions feel grounded, defensible, and easier to approve.',
    },
];

export default function BuiltForTheRoomSection() {
    return (
        <section className="relative bg-[#0B0B0B] py-24 text-[#F6F1E7] md:py-32" data-presence-tone="dark">
            <div className="mx-auto w-full max-w-[1200px] px-6 lg:px-12">
                <motion.div
                    className="mb-14 max-w-3xl"
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-80px' }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                >
                    <div className="mb-5 inline-flex items-center rounded-full border border-white/10 bg-white/[0.03] px-4 py-1.5 text-[11px] font-medium uppercase tracking-[0.28em] text-[#C1A674]">
                        Built for the Room
                    </div>

                    <h2 className="max-w-4xl text-4xl font-semibold uppercase leading-[0.95] tracking-[-0.03em] text-white sm:text-5xl md:text-6xl">
                        Where creative decisions actually get made.
                    </h2>

                    <p className="mt-6 max-w-2xl text-base leading-8 text-white/70 sm:text-lg">
                        Creative reviews stall when everything is subjective.
                        <br />
                        <br />
                        Feedback turns into opinion. Rounds drag. Decisions slow.
                        <br />
                        <br />
                        Visual Decompiler replaces opinion with structure — so teams align faster and clients move forward.
                    </p>
                </motion.div>

                <div className="grid gap-6 lg:grid-cols-3">
                    {PRESSURE_CARDS.map((card, idx) => (
                        <motion.article
                            key={card.label}
                            className="group relative overflow-hidden rounded-[28px] border border-white/10 bg-white/[0.025] p-8 shadow-[0_25px_80px_rgba(0,0,0,0.35)] backdrop-blur-sm transition duration-500 hover:bg-white/[0.04]"
                            initial={{ opacity: 0, y: 24 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: '-60px' }}
                            transition={{ duration: 0.65, delay: idx * 0.08, ease: [0.16, 1, 0.3, 1] }}
                        >
                            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(193,166,116,0.10),transparent_45%)] opacity-80" />
                            <div className="relative">
                                <div className="text-[10px] uppercase tracking-[0.28em] text-[#C1A674]">{card.label}</div>

                                <div className="mt-5 rounded-2xl border border-[#C1A674]/28 bg-[linear-gradient(180deg,rgba(193,166,116,0.12),rgba(18,18,18,0.92)_72%)] px-4 py-4">
                                    <h3 className="text-2xl font-semibold uppercase leading-tight tracking-[-0.02em] text-[#F8F3E9]">
                                        {card.title}
                                    </h3>
                                </div>

                                <p className="mt-5 text-sm leading-7 text-white/62 sm:text-[15px]">{card.lead}</p>

                                <p className="mt-5 text-sm leading-7 text-white/82 sm:text-[15px]">{card.body}</p>
                            </div>
                        </motion.article>
                    ))}
                </div>

                <motion.div
                    className="mt-12 flex flex-col gap-4 rounded-[28px] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.03),rgba(255,255,255,0.015))] px-8 py-7 shadow-[0_20px_70px_rgba(0,0,0,0.28)] sm:flex-row sm:items-center sm:justify-between"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-60px' }}
                    transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
                >
                    <div>
                        <div className="text-[10px] uppercase tracking-[0.28em] text-[#C1A674]">Positioning</div>
                        <p className="mt-3 text-lg leading-8 text-white/82 sm:text-xl">Less back-and-forth. Faster approvals. Stronger outcomes.</p>
                    </div>

                    <Link
                        href="/ingest"
                        className="inline-flex items-center justify-center rounded-xl border border-white/10 bg-white px-6 py-3 text-sm font-medium uppercase tracking-[0.18em] text-black transition hover:bg-white/90"
                    >
                        Decompile an Ad
                    </Link>
                </motion.div>
            </div>
        </section>
    );
}
