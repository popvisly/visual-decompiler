'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';

function InputCard() {
    return (
        <div className="relative w-full aspect-[4/5] max-w-[180px] mx-auto rounded-2xl overflow-hidden bg-[#141414] border-0 shadow-[0_8px_32px_rgba(0,0,0,0.3)]">
            {/* Corner brackets */}
            <div className="absolute top-2 left-2 w-4 h-4 border-l-[1.5px] border-t-[1.5px] border-[#D4A574]/40 pointer-events-none" />
            <div className="absolute top-2 right-2 w-4 h-4 border-r-[1.5px] border-t-[1.5px] border-[#D4A574]/40 pointer-events-none" />
            <div className="absolute bottom-2 left-2 w-4 h-4 border-l-[1.5px] border-b-[1.5px] border-[#D4A574]/40 pointer-events-none" />
            <div className="absolute bottom-2 right-2 w-4 h-4 border-r-[1.5px] border-b-[1.5px] border-[#D4A574]/40 pointer-events-none" />
            {/* Header bar */}
            <div className="absolute top-0 left-0 right-0 bg-black/20 backdrop-blur-sm text-white/70 text-[8px] font-bold tracking-[0.2em] px-3 py-2 uppercase flex justify-between items-center">
                <span className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 bg-[#D4A574] rounded-full animate-pulse shadow-[0_0_6px_rgba(212,165,116,0.5)]" />
                    Input Target
                </span>
                <span className="text-white/20 font-mono">ASSET_01</span>
            </div>
        </div>
    );
}

function MiniCard({ tag, value, accent = '#D4A574' }: { tag: string; value: string; accent?: string }) {
    return (
        <div className="rounded-[1.4rem] border border-[#4E3D2A] bg-[#171512] px-3 py-2.5">
            <p className="text-[8px] font-bold tracking-[0.2em] uppercase mb-1.5" style={{ color: accent + '60' }}>{tag}</p>
            <div
                className="rounded-md px-2.5 py-1 text-[10px] font-semibold text-white"
                style={{ backgroundColor: accent + '12', color: accent }}
            >
                {value}
            </div>
        </div>
    );
}

function DecisionTriad() {
    const states = [
        { label: 'KEEP', active: true },
        { label: 'REFINE' },
        { label: 'KILL' },
    ];

    return (
        <div className="grid grid-cols-3 gap-2">
            {states.map(s => (
                <div
                    key={s.label}
                    className={`rounded-[1.4rem] border px-2 py-2.5 ${
                        s.active
                            ? 'border-[#6B5337] bg-[#171512]'
                            : 'border-[#4E3D2A] bg-[#171512]'
                    }`}
                >
                    <p className={`text-[8px] font-bold uppercase tracking-[0.2em] text-center ${s.active ? 'text-[#D4A574]' : 'text-white/15'}`}>
                        {s.label}
                    </p>
                    <p className={`mt-1 text-[8px] leading-[1.4] text-center ${s.active ? 'text-white/50' : 'text-white/10'}`}>
                        {s.active ? 'Recommended' : s.label === 'KEEP' ? 'Move forward' : s.label === 'REFINE' ? 'Tighten' : 'Rework'}
                    </p>
                </div>
            ))}
        </div>
    );
}

export default function HowItWorks() {
    const phases = [
        {
            number: '01',
            phase: 'Phase 01',
            label: 'Ingest',
            headline: 'Drop any ad.',
            detail: 'Upload JPG, PNG, WebP, MP4 or paste a URL. The asset is secured, fingerprinted, and queued for decomposition.',
            type: 'input' as const,
        },
        {
            number: '02',
            phase: 'Phase 02',
            label: 'Decompose',
            headline: '13 forensic dimensions.',
            detail: 'Trigger mechanics, semiotic subtext, gaze topology, persuasion density, friction mapping — every signal catalogued.',
            type: 'mechanics' as const,
        },
        {
            number: '03',
            phase: 'Phase 03',
            label: 'Dossier',
            headline: 'A read you can defend.',
            detail: 'Keep, Refine, or Kill. Fix priorities ranked by impact. Output that travels straight into client rooms.',
            type: 'triad' as const,
        },
    ];

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
                    className="mb-16 lg:mb-20 border-t border-[#141414]/10 pt-10"
                >
                    <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-10">
                        <h2 className="text-[11vw] lg:text-[6vw] font-black leading-[0.82] tracking-[-0.04em] uppercase text-[#141414] max-w-[14ch]">
                            See exactly <span className="text-[#C1A674]">what any ad is doing.</span>
                        </h2>
                        <div className="max-w-[440px]">
                            <p className="text-[18px] leading-[1.6] text-[#6B6B6B] mb-8">
                                Three steps from raw creative to boardroom-ready strategic direction. No prompt engineering. No guesswork. Just structured judgment.
                            </p>
                            <Link
                                href="/ingest"
                                className="group inline-flex items-center gap-3 border-b border-[#141414] pb-1 text-[11px] font-black uppercase tracking-[0.2em] text-[#141414] transition hover:text-[#C1A674] hover:border-[#C1A674]"
                            >
                                Start Decompiling Free
                                <ArrowUpRight size={16} />
                            </Link>
                        </div>
                    </div>
                </motion.div>

                {/* Three phase cards */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-6">
                    {phases.map((phase, idx) => (
                        <motion.div
                            key={phase.number}
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: '-50px' }}
                            transition={{ duration: 0.8, delay: idx * 0.15, ease: [0.16, 1, 0.3, 1] }}
                        >
                            <div className="rounded-[1.4rem] bg-[#1F1F1F] text-white border border-[rgba(212,165,116,0.2)] p-7 lg:p-8 h-full flex flex-col">
                                {/* Phase label */}
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="h-px w-5 bg-[#D4A574]/30" />
                                    <p className="text-[9px] font-bold uppercase tracking-[0.3em] text-[#D4A574]/60">
                                        {phase.phase}
                                    </p>
                                </div>

                                {/* Ghost number */}
                                <p className="text-[64px] font-black leading-none text-white/[0.04] select-none -mt-2 mb-3">
                                    {phase.number}
                                </p>

                                {/* Headline */}
                                <h3 className="text-[20px] font-black leading-[1.05] tracking-[-0.02em] uppercase text-white mb-4">
                                    {phase.headline}
                                </h3>

                                {/* Detail */}
                                <p className="text-[13px] leading-[1.65] text-white/40 mb-6">
                                    {phase.detail}
                                </p>

                                {/* Visual card — per phase */}
                                <div className="mt-auto pt-5 border-t border-white/[0.06]">
                                    {phase.type === 'input' && <InputCard />}
                                    {phase.type === 'mechanics' && (
                                        <div className="space-y-2.5">
                                            <MiniCard tag="Trigger Mechanic" value="Craftsmanship Authority" accent="#D4A574" />
                                            <MiniCard tag="Semiotics" value="Precision as Legacy" accent="white" />
                                            <MiniCard tag="Gaze Topology" value="Product-centric" accent="white" />
                                        </div>
                                    )}
                                    {phase.type === 'triad' && <DecisionTriad />}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
