'use client';

import { motion } from 'framer-motion';
import { Target, Users, Briefcase, Award } from 'lucide-react';

const OUTCOME_CARDS = [
    {
        title: 'Strategists',
        body: 'Turn visual instinct into structured rationale, evidence anchors, and pitch-ready decision language.',
        icon: Target,
    },
    {
        title: 'Creative Directors',
        body: 'Defend bold creative decisions with clearer alignment and framing that survives the room.',
        icon: Award,
    },
    {
        title: 'Agency Teams',
        body: 'Reduce subjective feedback loops with a shared archive, repeatable workflow, and exportable dossier.',
        icon: Users,
    },
    {
        title: 'Consultants',
        body: 'Present work with stronger rationale, more client confidence, and a clinical edge over competitors.',
        icon: Briefcase,
    },
];

export default function PlatformLayer() {
    return (
        <section className="py-24 lg:py-32 bg-[#FBFBF6]">
            <div className="mx-auto max-w-[1200px] px-6 lg:px-12">
                <div className="max-w-[960px]">
                    <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-[#8B6A3D]">Outcome Oriented</p>
                    <h2 className="mt-6 text-[clamp(40px,5.5vw,72px)] font-black uppercase leading-[0.92] tracking-[-0.045em] text-[#141414]">
                        Built for the people defending the work.
                    </h2>
                    <div className="mt-10 max-w-[840px] space-y-6 text-[19px] leading-[1.8] text-[#515151]">
                        <p>Whether you&apos;re a strategist preparing rationale, a creative director defending a campaign, or an agency team aligning around creative decisions, Visual Decompiler helps structure the conversation around a repeatable evidence trail.</p>
                    </div>
                </div>

                <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                    {OUTCOME_CARDS.map((card, idx) => {
                        const Icon = card.icon;
                        return (
                            <motion.article
                                key={card.title}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: '-60px' }}
                                transition={{ duration: 0.65, delay: idx * 0.08, ease: [0.16, 1, 0.3, 1] }}
                                className="group relative flex flex-col justify-between rounded-[2rem] border border-black/5 bg-white p-8 transition-all hover:border-[#D4A574]/30 hover:shadow-xl hover:shadow-[#D4A574]/5"
                            >
                                <div>
                                    <div className="mb-8 flex h-10 w-10 items-center justify-center rounded-xl bg-[#FBFBF6] text-[#8B6A3D] transition-colors group-hover:bg-[#8B6A3D] group-hover:text-white">
                                        <Icon className="h-5 w-5" />
                                    </div>
                                    <h3 className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#8B6A3D]">{card.title}</h3>
                                    <p className="mt-5 text-[15px] leading-[1.65] text-[#515151]">{card.body}</p>
                                </div>
                            </motion.article>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}

