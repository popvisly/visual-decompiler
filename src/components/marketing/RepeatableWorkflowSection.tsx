'use client';

import Link from 'next/link';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowUpRight, CheckCircle2, FileText, GitCompare, Layers3, Library, ShieldCheck } from 'lucide-react';
import MarketingSectionHeading from '@/components/marketing/MarketingSectionHeading';
import { SAMPLE_DOSSIER_HREF } from '@/lib/sample-dossier';
import { MARKETING_CARD_PADDED, MARKETING_CARD_PADDED_SM } from '@/components/marketing/cardStyles';

const WORKFLOW_STEPS = [
    {
        label: 'Import',
        title: 'Start with the real asset',
        body: 'Upload the creative your team is actually judging, not a pasted description or generic prompt.',
        icon: Layers3,
    },
    {
        label: 'Decompile',
        title: 'Map the Visual DNA',
        body: 'Semiotic dynamics, structural signals, and market pulse keep every read clinical and defensible.',
        icon: ShieldCheck,
    },
    {
        label: 'Reference',
        title: 'Access Studio Memory',
        body: 'Every dossier becomes reusable evidence for future comparisons, moodboards, and category-level patterns.',
        icon: Library,
    },
    {
        label: 'Verdict',
        title: 'Defend the Creative Move',
        body: 'The final output is a client-ready artifact with the rationale and visual evidence your team needs to survive the room.',
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
        <section className="relative overflow-hidden border-y border-black/5 bg-[#FBFBF6] py-24 text-[#141414] lg:py-32">
            {/* Subtler forensic grid */}
            <div
                className="pointer-events-none absolute inset-0 opacity-[0.02] [background-image:linear-gradient(#1A1A1A_1px,transparent_1px),linear-gradient(90deg,#1A1A1A_1px,transparent_1px)] [background-size:48px_48px]"
                aria-hidden="true"
            />

            <div className="relative z-10 mx-auto w-full max-w-[1200px] px-6 lg:px-12">
                <div className="rounded-[2.5rem] border border-black/5 bg-white p-10 shadow-sm lg:p-16">
                    <MarketingSectionHeading
                        kicker="Strategic Moat"
                        title="Built for repeatability, not unpredictable Ai chats."
                        description="AI chat is a vacuum. Visual Decompiler is a shared grammar for creative logic—turning every analysis into studio memory that compounds over time."
                        align="center"
                        className="max-w-4xl"
                    />

                    {/* Sequential Workflow Grid */}
                    <div className="mt-16 grid gap-6 md:grid-cols-2">
                        {WORKFLOW_STEPS.map((step, index) => {
                            const Icon = step.icon;
                            return (
                                <motion.article
                                    key={step.label}
                                    initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
                                    whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
                                    viewport={{ once: true, margin: '-100px' }}
                                    transition={prefersReducedMotion ? undefined : { duration: 0.8, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
                                    className="group relative flex flex-col rounded-[2rem] border border-black/5 bg-[#FBFBF6] p-8 transition-all hover:border-[#D4A574]/30 hover:bg-white hover:shadow-xl hover:shadow-[#D4A574]/5"
                                >
                                    <div className="mb-8 flex h-14 w-14 items-center justify-center rounded-2xl bg-white text-[#8B6A3D] shadow-sm transition-colors group-hover:bg-[#8B6A3D] group-hover:text-white">
                                        <Icon className="h-6 w-6" />
                                    </div>
                                    
                                    <div className="flex items-center justify-between">
                                        <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-[#8B6A3D]">
                                            {step.label}
                                        </p>
                                        <span className="text-[10px] font-mono font-bold text-[#141414]/20 uppercase tracking-widest">
                                            Sequence 0{index + 1}
                                        </span>
                                    </div>
                                    <h3 className="mt-4 text-[20px] font-semibold uppercase leading-tight tracking-tight text-[#141414]">
                                        {step.title}
                                    </h3>
                                    <p className="mt-4 text-[15px] leading-[1.6] text-[#6B6B6B]">
                                        {step.body}
                                    </p>
                                </motion.article>
                            );
                        })}
                    </div>

                    {/* Summary / Advantage Card */}
                    <div className="mt-8 rounded-[2rem] bg-[#141414] p-10 text-white shadow-2xl">
                        <div className="flex items-center gap-3 text-[#D4A574]">
                            <GitCompare className="h-5 w-5" />
                            <p className="text-[11px] font-bold uppercase tracking-[0.3em]">The Compounding Moat</p>
                        </div>
                        <p className="mt-6 text-[20px] font-light leading-relaxed text-white/90">
                            Every analysis you run saves to your <span className="font-bold text-[#D4A574]">Vault</span>, creating a persistent memory of what works—something a one-off AI chat or agent will never provide.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}
