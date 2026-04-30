'use client';

import Link from 'next/link';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowUpRight, CheckCircle2, FileText, GitCompare, Layers3, Library, ShieldCheck } from 'lucide-react';
import MarketingSectionHeading from '@/components/marketing/MarketingSectionHeading';
import { SAMPLE_DOSSIER_HREF } from '@/lib/sample-dossier';

const WORKFLOW_STEPS = [
    {
        label: 'Import',
        title: 'Start with the real asset',
        body: 'Upload the creative your team is actually judging, not a pasted description or generic prompt.',
        icon: Layers3,
    },
    {
        label: 'Diagnose',
        title: 'Read through a fixed system',
        body: 'Quality Gate, Intelligence, Mechanics, Psychology, Stress Lab, Market Pulse, and Decision Log keep every read consistent.',
        icon: ShieldCheck,
    },
    {
        label: 'Compare',
        title: 'Use the Vault as memory',
        body: 'Each dossier becomes reusable evidence for future comparisons, boards, and category-level pattern recognition.',
        icon: Library,
    },
    {
        label: 'Decide',
        title: 'Package the recommendation',
        body: 'The final output is a client-ready artifact with rationale, caveats, and decision language your team can defend.',
        icon: FileText,
    },
] as const;

const CHAT_BOX_LIMITS = [
    'One-off answer',
    'No persistent vault',
    'No fixed audit trail',
    'Hard to rerun or compare',
] as const;

const VD_ADVANTAGES = [
    'Structured dossier',
    'Compounding archive',
    'Decision log and evidence anchors',
    'Exportable review artifact',
] as const;

export default function RepeatableWorkflowSection() {
    const prefersReducedMotion = useReducedMotion();

    return (
        <section className="relative overflow-hidden border-y border-black/5 bg-[#F6F1E7] py-24 text-[#141414] lg:py-32">
            <div
                className="pointer-events-none absolute inset-0 opacity-[0.035] [background-image:linear-gradient(#1A1A1A_1px,transparent_1px),linear-gradient(90deg,#1A1A1A_1px,transparent_1px)] [background-size:48px_48px]"
                aria-hidden="true"
            />

            <div className="relative z-10 mx-auto w-full max-w-[1240px] px-6 lg:px-12">
                <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
                    <div className="lg:sticky lg:top-28">
                        <MarketingSectionHeading
                            kicker="Workflow Moat"
                            title="Not a prompt. A repeatable intelligence loop."
                            description="Chat can critique an ad once. Visual Decompiler turns that read into a saved, comparable, reviewable workflow your team can rerun across campaigns, competitors, and client conversations."
                        />

                        <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                            <Link
                                href="/product"
                                className="inline-flex items-center justify-center gap-3 rounded-full bg-[#141414] px-7 py-4 text-[10px] font-black uppercase tracking-[0.24em] text-[#FBF7EF] transition hover:bg-black"
                            >
                                See Product Workflow
                                <ArrowUpRight className="h-4 w-4" />
                            </Link>
                            <Link
                                href={SAMPLE_DOSSIER_HREF}
                                className="inline-flex items-center justify-center gap-3 rounded-full border border-black/10 bg-white px-7 py-4 text-[10px] font-black uppercase tracking-[0.24em] text-[#141414] transition hover:bg-[#FBFBF6]"
                            >
                                View Artifact
                            </Link>
                        </div>

                        <div className="mt-10 grid gap-4 rounded-[24px] border border-black/5 bg-white p-5 shadow-sm md:grid-cols-2 lg:grid-cols-1">
                            <div>
                                <p className="text-[10px] font-black uppercase tracking-[0.28em] text-[#8B6A3D]/80">Generic AI chat</p>
                                <div className="mt-4 space-y-3">
                                    {CHAT_BOX_LIMITS.map((item) => (
                                        <p key={item} className="flex items-center gap-3 text-[13px] leading-relaxed text-[#6B6B6B]">
                                            <span className="h-px w-4 bg-black/20" />
                                            {item}
                                        </p>
                                    ))}
                                </div>
                            </div>

                            <div className="rounded-[18px] border border-black/5 bg-[#141414] p-5 text-[#FBF7EF]">
                                <p className="text-[10px] font-black uppercase tracking-[0.28em] text-[#D4A574]">Visual Decompiler</p>
                                <div className="mt-4 space-y-3">
                                    {VD_ADVANTAGES.map((item) => (
                                        <p key={item} className="flex items-center gap-3 text-[13px] leading-relaxed text-white/75">
                                            <CheckCircle2 className="h-4 w-4 shrink-0 text-[#D4A574]" />
                                            {item}
                                        </p>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="grid gap-5">
                        {WORKFLOW_STEPS.map((step, index) => {
                            const Icon = step.icon;
                            return (
                                <motion.article
                                    key={step.label}
                                    initial={prefersReducedMotion ? false : { opacity: 0, y: 22 }}
                                    whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
                                    viewport={{ once: true, margin: '-70px' }}
                                    transition={prefersReducedMotion ? undefined : { duration: 0.7, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
                                    className={`grid gap-5 rounded-[24px] border p-6 shadow-sm md:grid-cols-[auto_minmax(0,1fr)] ${
                                        index === 1
                                            ? 'border-[#8B6A3D]/18 bg-[#141414] text-[#FBF7EF] shadow-[0_24px_70px_rgba(20,20,20,0.16)]'
                                            : 'border-black/5 bg-white'
                                    }`}
                                >
                                    <div
                                        className={`flex h-14 w-14 items-center justify-center rounded-2xl border ${
                                            index === 1
                                                ? 'border-white/10 bg-white/5 text-[#D4A574]'
                                                : 'border-black/5 bg-[#FBFBF6] text-[#8B6A3D]'
                                        }`}
                                    >
                                        <Icon className="h-5 w-5" />
                                    </div>
                                    <div>
                                        <div className="flex items-center gap-4">
                                            <p className={`text-[10px] font-black uppercase tracking-[0.3em] ${index === 1 ? 'text-[#D4A574]' : 'text-[#8B6A3D]/80'}`}>
                                                {step.label}
                                            </p>
                                            <span className={`h-px flex-1 ${index === 1 ? 'bg-white/10' : 'bg-black/5'}`} />
                                            <span className={`text-[10px] font-black uppercase tracking-[0.2em] ${index === 1 ? 'text-white/35' : 'text-black/25'}`}>
                                                0{index + 1}
                                            </span>
                                        </div>
                                        <h3 className={`mt-4 text-[24px] font-semibold uppercase leading-none tracking-tight ${index === 1 ? 'text-white' : 'text-[#141414]'}`}>
                                            {step.title}
                                        </h3>
                                        <p className={`mt-4 max-w-[62ch] text-[15px] leading-[1.72] ${index === 1 ? 'text-white/68' : 'text-[#6B6B6B]'}`}>
                                            {step.body}
                                        </p>
                                    </div>
                                </motion.article>
                            );
                        })}

                        <div className="rounded-[24px] border border-black/5 bg-white p-6 shadow-sm">
                            <div className="flex items-center gap-3">
                                <GitCompare className="h-5 w-5 text-[#8B6A3D]" />
                                <p className="text-[10px] font-black uppercase tracking-[0.28em] text-[#8B6A3D]/80">Compounding advantage</p>
                            </div>
                            <p className="mt-5 text-[20px] font-semibold leading-tight tracking-tight text-[#141414]">
                                Every analysis makes the next one easier to compare, defend, and turn into action.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
