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

const CompoundingVaultCard = () => (
    <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        className="mt-12 overflow-hidden rounded-[2.5rem] border border-[#D4A574]/20 bg-[#141414] shadow-2xl"
    >
        <div className="border-b border-white/5 px-8 py-5">
            <div className="flex items-center justify-between">
                <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#D4A574]">Intelligence Vault</p>
                <div className="flex gap-1.5">
                    {[1, 2, 3].map(i => <div key={i} className="h-1 w-4 rounded-full bg-white/10" />)}
                </div>
            </div>
        </div>
        <div className="p-8">
            <div className="space-y-4">
                {[
                    { label: 'Asset 882-B', score: 92, date: '2h ago' },
                    { label: 'Asset 879-C', score: 84, date: '5h ago' },
                    { label: 'Asset 875-A', score: 76, date: '1d ago' },
                ].map((item, i) => (
                    <motion.div 
                        key={i}
                        initial={{ x: -20, opacity: 0 }}
                        whileInView={{ x: 0, opacity: 1 }}
                        transition={{ delay: 0.2 + (i * 0.1) }}
                        className="flex items-center justify-between rounded-xl border border-white/5 bg-white/[0.03] p-4"
                    >
                        <div className="flex items-center gap-4">
                            <div className="h-2 w-2 rounded-full bg-[#D4A574]" />
                            <p className="text-[12px] font-mono font-bold text-white/60">{item.label}</p>
                        </div>
                        <div className="flex items-center gap-6">
                            <span className="text-[11px] font-bold text-[#D4A574]">{item.score}%</span>
                            <span className="text-[10px] font-medium text-white/20 uppercase tracking-widest">{item.date}</span>
                        </div>
                    </motion.div>
                ))}
                <div className="pt-4 text-center">
                    <p className="text-[9px] font-bold uppercase tracking-[0.4em] text-white/30 italic">+ 1,248 assets archived</p>
                </div>
            </div>
        </div>
    </motion.div>
);

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
                <div className="grid gap-20 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
                    
                    {/* Sticky Control Panel (Left) */}
                    <div className="lg:sticky lg:top-32">
                        <MarketingSectionHeading
                            kicker="Strategic Moat"
                            title="Built for repeatability, not one-off chats."
                            description="AI chat is a vacuum. Visual Decompiler is an operating system for creative intelligence, not just what works but what role it plays—turning every analysis into reusable memory that compounds over time."
                        />

                        <div className="mt-10 flex flex-col gap-3 sm:flex-row">
                            <Link
                                href="/product"
                                className="inline-flex items-center justify-center gap-3 rounded-full bg-[#141414] px-8 py-4 text-[11px] font-bold uppercase tracking-[0.2em] text-[#FBF7EF] transition hover:bg-black"
                            >
                                Product Tour
                                <ArrowUpRight className="h-4 w-4" />
                            </Link>
                            <Link
                                href={SAMPLE_DOSSIER_HREF}
                                className="inline-flex items-center justify-center gap-3 rounded-full border border-black/10 bg-white px-8 py-4 text-[11px] font-bold uppercase tracking-[0.2em] text-[#141414] transition hover:bg-[#FBFBF6]"
                            >
                                View Sample
                            </Link>
                        </div>

                        {/* New Visual Component */}
                        <CompoundingVaultCard />
                    </div>

                    {/* Sequential Workflow (Right) */}
                    <div className="space-y-4">
                        {WORKFLOW_STEPS.map((step, index) => {
                            const Icon = step.icon;
                            return (
                                <motion.article
                                    key={step.label}
                                    initial={prefersReducedMotion ? false : { opacity: 0, x: 20 }}
                                    whileInView={prefersReducedMotion ? undefined : { opacity: 1, x: 0 }}
                                    viewport={{ once: true, margin: '-100px' }}
                                    transition={prefersReducedMotion ? undefined : { duration: 0.8, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
                                    className="group relative grid gap-8 rounded-[2.5rem] border border-black/5 bg-white p-8 transition-all hover:border-[#D4A574]/30 hover:shadow-xl hover:shadow-[#D4A574]/5 md:grid-cols-[auto_minmax(0,1fr)]"
                                >
                                    <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#FBFBF6] text-[#8B6A3D] transition-colors group-hover:bg-[#8B6A3D] group-hover:text-white">
                                        <Icon className="h-6 w-6" />
                                    </div>
                                    <div>
                                        <div className="flex items-center justify-between">
                                            <p className="text-[12px] font-bold uppercase tracking-[0.3em] text-[#8B6A3D]">
                                                {step.label}
                                            </p>
                                            <span className="text-[11px] font-mono font-bold text-[#141414]/20 uppercase tracking-widest">
                                                Sequence 0{index + 1}
                                            </span>
                                        </div>
                                        <h3 className="mt-4 text-[22px] font-semibold uppercase leading-tight tracking-tight text-[#141414]">
                                            {step.title}
                                        </h3>
                                        <p className="mt-4 max-w-[54ch] text-[15px] leading-[1.6] text-[#6B6B6B]">
                                            {step.body}
                                        </p>
                                    </div>
                                </motion.article>
                            );
                        })}

                        {/* Summary / Advantage Card */}
                        <div className="rounded-[2.5rem] bg-[#141414] p-10 text-white shadow-2xl">
                            <div className="flex items-center gap-3 text-[#D4A574]">
                                <GitCompare className="h-5 w-5" />
                                <p className="text-[11px] font-bold uppercase tracking-[0.3em]">The Compounding Moat</p>
                            </div>
                            <p className="mt-6 text-[20px] font-light leading-relaxed text-white/90">
                                Every análisis you run saves to your <span className="font-bold text-[#D4A574]">Vault</span>, creating a persistent memory of what works—something a one-off AI chat or agent will never provide.
                            </p>
                        </div>
                    </div>
                </div>

            </div>
        </section>
    );
}
