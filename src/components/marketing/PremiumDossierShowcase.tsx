'use client';

import Link from 'next/link';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import CanonicalDossierArtifact from '@/components/marketing/CanonicalDossierArtifact';
import MarketingSectionHeading from '@/components/marketing/MarketingSectionHeading';
import { SAMPLE_DOSSIER_HREF } from '@/lib/sample-dossier';

const PROOF_POINTS = [
    ['Decision read', 'A clear recommendation, confidence signal, and risk/reward tension.'],
    ['Evidence anchors', 'Specific visual claims tied back to what is actually present in the asset.'],
    ['Reusable artifact', 'A saved dossier your team can revisit, compare, export, and defend later.'],
] as const;

const OUTPUT_LAYERS = [
    {
        label: 'Scores',
        title: 'Primary Scores',
        body: 'Quantified reads for clarity, attention, cohesion, intent, and distinction.',
    },
    {
        label: 'Path',
        title: 'Attention Path',
        body: 'A sequenced read of where the eye enters, travels, and drops away.',
    },
    {
        label: 'Strategy',
        title: 'Strategic Read',
        body: 'The thesis, trigger mechanic, friction points, and defensible direction.',
    },
    {
        label: 'Record',
        title: 'Decision Log',
        body: 'A captured verdict with rationale, evidence, and next-action language.',
    },
] as const;

export default function PremiumDossierShowcase() {
    const prefersReducedMotion = useReducedMotion();

    return (
        <section className="relative overflow-hidden bg-[#FBFBF6] py-24 text-[#141414] lg:py-32">
            <div className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-[#FBFBF6] via-[#FBFBF6]/70 to-transparent" aria-hidden="true" />

            <div className="relative z-10 mx-auto w-full max-w-[1240px] px-6 lg:px-12">
                <div className="grid items-start gap-14 lg:grid-cols-[0.86fr_1.14fr]">
                    <div className="max-w-xl lg:sticky lg:top-32">
                        <MarketingSectionHeading
                            kicker="Proof"
                            title="See the output before you sign up."
                            description="Visual Decompiler does not return a loose AI answer. It produces a structured artifact with decision logic, evidence anchors, caveats, and language your team can use in the room."
                        />

                        <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                            <Link
                                href={SAMPLE_DOSSIER_HREF}
                                className="inline-flex items-center justify-center gap-3 rounded-full bg-[#141414] px-7 py-4 text-[10px] font-bold uppercase tracking-[0.24em] text-[#FBF7EF] transition hover:bg-black"
                            >
                                View Sample Dossier
                                <ArrowUpRight className="h-4 w-4" />
                            </Link>
                            <Link
                                href="/ingest"
                                className="inline-flex items-center justify-center gap-3 rounded-full border border-black/10 bg-white px-7 py-4 text-[10px] font-bold uppercase tracking-[0.24em] text-[#141414] transition hover:bg-[#FBFBF6]"
                            >
                                Start Free
                            </Link>
                        </div>

                        <div className="mt-10 grid gap-3">
                            {PROOF_POINTS.map(([title, body]) => (
                                <div key={title} className="rounded-[20px] border border-black/5 bg-white px-5 py-5 shadow-sm">
                                    <p className="text-[10px] font-bold uppercase tracking-[0.26em] text-[#8B6A3D]/80">{title}</p>
                                    <p className="mt-3 text-[14px] leading-[1.65] text-[#6B6B6B]">{body}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div>
                        <motion.div
                            initial={prefersReducedMotion ? false : { opacity: 0, y: 36 }}
                            whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: '-80px' }}
                            transition={prefersReducedMotion ? undefined : { duration: 0.95, delay: 0.06, ease: [0.16, 1, 0.3, 1] }}
                            className="rounded-[28px] border border-black/5 bg-[#141414] p-3 shadow-[0_28px_80px_rgba(20,20,20,0.18)]"
                        >
                            <CanonicalDossierArtifact mode="preview" className="shadow-none" />
                        </motion.div>

                        <div className="mt-5 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
                            {OUTPUT_LAYERS.map((layer, index) => (
                                <motion.article
                                    key={layer.title}
                                    initial={prefersReducedMotion ? false : { opacity: 0, y: 22 }}
                                    whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
                                    viewport={{ once: true, margin: '-60px' }}
                                    transition={prefersReducedMotion ? undefined : { duration: 0.7, delay: index * 0.07, ease: [0.16, 1, 0.3, 1] }}
                                    className="rounded-[24px] border border-black/5 bg-white p-5 shadow-sm"
                                >
                                    <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-[#8B6A3D]/80">{layer.label}</p>
                                    <h3 className="mt-3 text-[18px] font-semibold uppercase leading-tight tracking-[-0.01em] text-[#141414]">{layer.title}</h3>
                                    <p className="mt-3 text-[13px] leading-[1.65] text-[#6B6B6B]">{layer.body}</p>
                                </motion.article>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
