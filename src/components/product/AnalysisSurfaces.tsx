'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { Database, Search, Share2, ShieldCheck, Zap, Target, MousePointer2, Fingerprint } from 'lucide-react';

const WORKFLOW = [
    {
        title: 'Diagnostic Ingest',
        body: 'Bring in the work, or the references shaping it. Every frame is normalized for deep analytical reading.',
        icon: Database,
    },
    {
        title: 'Structural Scan',
        body: 'Break down hierarchy, attention flow, tone, and strategic intent through the same forensic modules every time.',
        icon: Search,
    },
    {
        title: 'Export the Verdict',
        body: 'Walk into the room with a structured dossier, evidence anchors, and recommendations built for defensive alignment.',
        icon: Share2,
    },
];

const REVEALS = [
    { label: 'Attention flow', icon: MousePointer2 },
    { label: 'Visual hierarchy', icon: Zap },
    { label: 'Strategic intent', icon: Target },
    { label: 'Brand posture', icon: ShieldCheck },
    { label: 'Friction points', icon: Zap },
    { label: 'Evidence anchors', icon: Fingerprint },
];

export default function AnalysisSurfaces() {
    return (
        <div className="bg-[#FBFBF6]">
            {/* Main Product Showcase */}
            <section className="py-24 lg:py-32">
                <div className="mx-auto max-w-[1200px] px-6 lg:px-12">
                    <div className="grid gap-20 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
                        <div>
                            <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-[#8B6A3D]">Product Interface</p>
                            <h2 className="mt-6 text-[clamp(40px,5vw,64px)] font-black uppercase leading-[0.92] tracking-[-0.04em] text-[#141414]">
                                A workspace built for clinical precision.
                            </h2>
                            <p className="mt-8 text-[18px] leading-[1.8] text-[#515151]">
                                Visual Decompiler does not return loose summaries. It produces a structured, multi-layered dossier designed for clarity, validation, and defensive reasoning.
                            </p>
                        </div>

                        <motion.div
                            initial={{ opacity: 0, scale: 0.98, y: 30 }}
                            whileInView={{ opacity: 1, scale: 1, y: 0 }}
                            viewport={{ once: true, margin: '-80px' }}
                            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                            className="relative"
                        >
                            <div className="overflow-hidden rounded-[2.5rem] border border-black/5 bg-[#141414] p-3 shadow-[0_40px_100px_rgba(0,0,0,0.12)]">
                                <div className="relative aspect-video w-full overflow-hidden rounded-[2rem] bg-[#1a1a1a]">
                                    <Image
                                        src="/images/marketing/decompiler-workspace.png"
                                        alt="Visual Decompiler Workspace"
                                        fill
                                        className="object-cover opacity-90 transition-opacity hover:opacity-100"
                                        priority
                                    />
                                    {/* Scanning Line Animation */}
                                    <motion.div 
                                        animate={{ top: ['0%', '100%', '0%'] }}
                                        transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                                        className="absolute inset-x-0 h-[2px] bg-[#D4A574]/40 z-20 pointer-events-none blur-[1px]"
                                    />
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Workflow Sequence */}
            <section className="py-24 bg-[#141414] text-white overflow-hidden">
                <div className="mx-auto max-w-[1200px] px-6 lg:px-12">
                    <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-[#D4A574] text-center">The Forensic Read</p>
                    <h2 className="mt-6 text-center text-[clamp(32px,4vw,56px)] font-black uppercase leading-[0.92] tracking-[-0.03em]">
                        From raw asset to definitive verdict.
                    </h2>

                    <div className="mt-20 grid gap-8 md:grid-cols-3">
                        {WORKFLOW.map((step, idx) => {
                            const Icon = step.icon;
                            return (
                                <motion.article
                                    key={step.title}
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.7, delay: idx * 0.1 }}
                                    className="relative flex flex-col items-start rounded-[2rem] border border-white/5 bg-white/[0.03] p-10"
                                >
                                    <div className="mb-8 flex h-12 w-12 items-center justify-center rounded-2xl bg-[#D4A574]/10 text-[#D4A574]">
                                        <Icon className="h-6 w-6" />
                                    </div>
                                    <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-[#D4A574]">Step 0{idx + 1}</p>
                                    <h3 className="mt-4 text-[24px] font-black uppercase leading-tight tracking-tight">{step.title}</h3>
                                    <p className="mt-4 text-[15px] leading-[1.7] text-white/50">{step.body}</p>
                                </motion.article>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* Feature Inventory (Forensic Chips) */}
            <section className="py-24 lg:py-32">
                <div className="mx-auto max-w-[1200px] px-6 lg:px-12">
                    <div className="grid gap-16 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
                        <div className="grid grid-cols-2 gap-4">
                            {REVEALS.map((item, i) => {
                                const Icon = item.icon;
                                return (
                                    <motion.div
                                        key={item.label}
                                        initial={{ opacity: 0, scale: 0.95 }}
                                        whileInView={{ opacity: 1, scale: 1 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.5, delay: i * 0.05 }}
                                        className="flex items-center gap-4 rounded-2xl border border-black/5 bg-white p-6 shadow-sm transition-all hover:border-[#D4A574]/40 hover:shadow-md"
                                    >
                                        <div className="h-8 w-8 shrink-0 flex items-center justify-center rounded-lg bg-[#FBFBF6] text-[#8B6A3D]">
                                            <Icon className="h-4 w-4" />
                                        </div>
                                        <span className="text-[13px] font-bold uppercase tracking-[0.1em] text-[#141414]">{item.label}</span>
                                    </motion.div>
                                );
                            })}
                        </div>
                        
                        <div>
                            <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-[#8B6A3D]">Intelligence Stack</p>
                            <h2 className="mt-6 text-[clamp(32px,4vw,56px)] font-black uppercase leading-[0.92] tracking-[-0.04em] text-[#141414]">
                                A shared language for the work.
                            </h2>
                            <p className="mt-8 text-[18px] leading-[1.8] text-[#515151]">
                                Every asset is processed through a consistent analytical stack, ensuring your team has the same structured reasoning for every creative decision.
                            </p>
                            <div className="mt-10 h-px w-full bg-black/5" />
                            <p className="mt-6 text-[11px] font-bold uppercase tracking-[0.25em] text-[#8B6A3D] italic">
                                Less opinion loops. Faster approvals. Defensible results.
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
