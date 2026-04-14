'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { SAMPLE_DOSSIER_HREF } from '@/lib/sample-dossier';

const ANALYSIS_LAYERS = [
    {
        title: 'Primary Scores',
        body: 'Clarity. Attention. Cohesion. Intent. Distinction. High-level signals that define how the work performs.',
    },
    {
        title: 'Attention Path',
        body: 'A mapped sequence of how the eye moves — and where it drops.',
    },
    {
        title: 'Structural Signals',
        body: 'Hierarchy, balance, contrast, density, and focus integrity — expressed as controlled diagnostics.',
    },
    {
        title: 'Strategic Read',
        body: 'A clear articulation of what the work is doing, why it works, and where it breaks.',
    },
];

export default function AnalysisSurfaces() {
    return (
        <>
            <section className="border-b border-white/10 py-20 lg:py-24" data-presence-tone="dark">
                <div className="mx-auto max-w-[1120px] px-6 lg:px-12">
                    <div className="max-w-[920px]">
                        <p className="text-[10px] font-semibold uppercase tracking-[0.38em] text-[#C1A674]">The System</p>
                        <h2 className="mt-6 text-[12vw] font-semibold uppercase leading-[0.9] tracking-[-0.04em] text-[#F6F1E7] sm:text-[9vw] lg:text-[64px]">
                            Visual Decompiler makes creative reasoning readable.
                        </h2>
                    </div>

                    <div className="mt-14 divide-y divide-white/10 border-y border-white/10">
                        {ANALYSIS_LAYERS.map((layer, index) => (
                            <motion.article
                                key={layer.title}
                                initial={{ opacity: 0, y: 18 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: '-80px' }}
                                transition={{ duration: 0.6, delay: index * 0.06, ease: [0.16, 1, 0.3, 1] }}
                                className="grid gap-6 py-9 md:grid-cols-[280px_1fr] md:items-start"
                            >
                                <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[#C1A674]">{layer.title}</p>
                                <p className="max-w-[64ch] text-[17px] leading-[1.82] text-[#F6F1E7]/74">{layer.body}</p>
                            </motion.article>
                        ))}
                    </div>
                </div>
            </section>

            <section className="border-b border-white/10 py-20 lg:py-28" data-presence-tone="dark">
                <div className="mx-auto max-w-[1120px] px-6 lg:px-12">
                    <div className="grid items-center gap-14 lg:grid-cols-[0.9fr_1.1fr]">
                        <div className="max-w-[520px]">
                            <p className="text-[10px] font-semibold uppercase tracking-[0.38em] text-[#C1A674]">Dossier Preview</p>
                            <h3 className="mt-6 text-[10vw] font-semibold uppercase leading-[0.9] tracking-[-0.04em] text-[#F6F1E7] sm:text-[7vw] lg:text-[56px]">
                                Output designed for the room.
                            </h3>
                            <p className="mt-7 text-[19px] leading-[1.8] text-[#F6F1E7]/72">
                                Not a chat response.
                                <br />
                                A structured document built for presentation, alignment, and decision-making.
                            </p>
                            <Link
                                href={SAMPLE_DOSSIER_HREF}
                                className="mt-9 inline-flex items-center justify-center border border-white/12 bg-white px-6 py-3 text-[10px] font-semibold uppercase tracking-[0.24em] text-[#0B0B0B] transition hover:bg-[#F6F1E7]"
                            >
                                View Sample Dossier
                            </Link>
                        </div>

                        <div className="rounded-[2rem] border border-white/12 bg-[#12110F] p-7 shadow-[0_30px_100px_rgba(0,0,0,0.42)] sm:p-9">
                            <div className="flex items-center justify-between border-b border-white/10 pb-6">
                                <div>
                                    <p className="text-[10px] font-semibold uppercase tracking-[0.34em] text-[#C1A674]">Visual Decompiler</p>
                                    <p className="mt-2 text-[10px] font-semibold uppercase tracking-[0.3em] text-[#F6F1E7]/55">Creative Intelligence Dossier</p>
                                </div>
                                <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-[#C1A674]">Sample Export</p>
                            </div>

                            <div className="space-y-8 pt-8">
                                <div>
                                    <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-[#C1A674]">Primary Scores</p>
                                    <div className="mt-4 grid grid-cols-5 gap-3">
                                        {[
                                            ['Clarity', '82'],
                                            ['Attention', '91'],
                                            ['Cohesion', '76'],
                                            ['Intent', '88'],
                                            ['Distinction', '67'],
                                        ].map(([label, value]) => (
                                            <div key={label}>
                                                <p className="text-[9px] font-semibold uppercase tracking-[0.23em] text-[#F6F1E7]/52">{label}</p>
                                                <p className="mt-2 text-[24px] font-semibold leading-none tracking-[-0.02em] text-[#F6F1E7]">{value}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div className="border-t border-white/10 pt-6">
                                    <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-[#C1A674]">Strategic Read</p>
                                    <div className="mt-4 space-y-4">
                                        <p className="text-[12px] leading-relaxed text-[#F6F1E7]/74">Strategic Thesis: Positions the product as premium through restraint and visual isolation.</p>
                                        <p className="text-[12px] leading-relaxed text-[#F6F1E7]/74">Trigger Mechanic: High contrast subject lock drives immediate attention entry.</p>
                                        <p className="text-[12px] leading-relaxed text-[#F6F1E7]/74">Friction Points: Supporting copy competes with the primary focal route.</p>
                                    </div>
                                </div>

                                <div className="border-t border-white/10 pt-6">
                                    <p className="text-[13px] font-semibold text-[#F6F1E7]">Confidence Index: High</p>
                                    <p className="mt-2 text-[12px] leading-relaxed text-[#F6F1E7]/66">Based on alignment between clarity, attention control, and strategic intent.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
