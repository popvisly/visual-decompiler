'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowUpRight, Brush, Target, Briefcase, Users } from 'lucide-react';
import { SAMPLE_DOSSIER_HREF } from '@/lib/sample-dossier';

const PERSONAS = [
    {
        icon: Brush,
        role: 'Art Directors',
        pain: 'Need to articulate why a layout works or fails without vague language.',
        how: 'Get structured reads on composition, gaze, hierarchy, and visual tension — the vocabulary to back instinct.',
    },
    {
        icon: Target,
        role: 'Strategists',
        pain: 'Spelling out persuasive mechanics takes hours. The brief is always behind the work.',
        how: 'Decompose any asset in under 3 minutes. Standardized output, compounding vault memory, defensible analysis.',
    },
    {
        icon: Briefcase,
        role: 'Founders & Brand Leads',
        pain: 'Reviewing creative without a strategic framework — it all looks good or nothing does.',
        how: 'See every ad through the same forensic lens. Compare, rank, and direct with evidence, not taste.',
    },
    {
        icon: Users,
        role: 'Creative Teams',
        pain: 'Internal reviews devolve into opinion. No shared language for what the work is doing.',
        how: 'A common read. The whole team works from the same intelligence surface before the client room.',
    },
];

export default function WhoItsFor() {
    return (
        <section className="relative bg-[#F6F1E7] text-[#141414] py-24 lg:py-40 overflow-hidden" data-presence-tone="light">
            <div className="pointer-events-none absolute inset-0 opacity-[0.3] [background-image:linear-gradient(rgba(20,20,20,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(20,20,20,0.02)_1px,transparent_1px)] [background-size:48px_48px]" />

            <div className="relative z-10 mx-auto max-w-[1400px] px-6 lg:px-12">
                {/* Section header */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-100px' }}
                    transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                    className="mb-20 lg:mb-32 border-t border-[#141414]/10 pt-10"
                >
                    <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-10">
                        <h2 className="text-[11vw] lg:text-[6vw] font-black leading-[0.82] tracking-[-0.04em] uppercase text-[#141414] max-w-[12ch]">
                            Built for <span className="text-[#C1A674]">the people</span> who ship creative.
                        </h2>
                        <div className="max-w-[440px]">
                            <p className="text-[18px] leading-[1.6] text-[#6B6B6B] mb-8">
                                Not for social media managers or media buyers. Visual Decompiler is for the people who make, judge, and defend the work.
                            </p>
                            <Link
                                href={SAMPLE_DOSSIER_HREF}
                                className="group inline-flex items-center gap-3 border-b border-[#141414] pb-1 text-[11px] font-black uppercase tracking-[0.2em] text-[#141414] transition hover:text-[#C1A674] hover:border-[#C1A674]"
                            >
                                See What It Reads Like
                                <ArrowUpRight size={16} />
                            </Link>
                        </div>
                    </div>
                </motion.div>

                {/* Persona cards - dark cards on light canvas */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-6">
                    {PERSONAS.map((persona, idx) => (
                        <motion.div
                            key={persona.role}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: '-50px' }}
                            transition={{ duration: 0.8, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
                        >
                            <div className="rounded-[32px] bg-[#1A1A1A] text-white p-10 lg:p-12 h-full border border-[#D4A574]/10 group hover:border-[#D4A574]/25 transition-colors duration-500">
                                {/* Icon + role */}
                                <div className="flex items-center gap-4 mb-8">
                                    <div className="flex items-center justify-center w-12 h-12 rounded-xl border border-white/[0.08] bg-white/[0.04] text-[#C1A674]">
                                        <persona.icon size={20} strokeWidth={1.5} />
                                    </div>
                                    <h3 className="text-[20px] font-black uppercase tracking-[-0.01em] text-white">
                                        {persona.role}
                                    </h3>
                                </div>

                                {/* Pain point */}
                                <div className="mb-6">
                                    <p className="text-[9px] font-bold uppercase tracking-[0.3em] text-[#C1A674]/60 mb-3">
                                        The Friction
                                    </p>
                                    <p className="text-[15px] leading-[1.6] text-white/70">
                                        {persona.pain}
                                    </p>
                                </div>

                                {/* How VD helps */}
                                <div>
                                    <p className="text-[9px] font-bold uppercase tracking-[0.3em] text-white/25 mb-3">
                                        The Read
                                    </p>
                                    <p className="text-[15px] leading-[1.6] text-white/45">
                                        {persona.how}
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
