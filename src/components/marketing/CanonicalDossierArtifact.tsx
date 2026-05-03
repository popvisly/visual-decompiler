'use client';

import React from 'react';
import { motion } from 'framer-motion';

type CanonicalDossierArtifactProps = {
    mode?: 'preview' | 'hero-slice' | 'attention-zoom';
    className?: string;
};

// ─── Sub-components for Forensic Visuals ─────────────────────────────────────

const ScoreRing = ({ value, label, delay = 0 }: { value: number; label: string; delay?: number }) => (
    <div className="flex flex-col items-center gap-2">
        <div className="relative h-12 w-12">
            <svg className="h-full w-full" viewBox="0 0 36 36">
                <circle cx="18" cy="18" r="16" fill="none" className="stroke-white/5" strokeWidth="2" />
                <motion.circle
                    cx="18" cy="18" r="16" fill="none"
                    stroke="#D4A574" strokeWidth="2.5" strokeLinecap="round"
                    initial={{ pathLength: 0 }}
                    whileInView={{ pathLength: value / 100 }}
                    transition={{ duration: 1.5, delay, ease: "easeOut" }}
                />
            </svg>
            <span className="absolute inset-0 flex items-center justify-center text-[11px] font-bold text-white">
                {value}
            </span>
        </div>
        <p className="text-[8px] font-bold uppercase tracking-[0.2em] text-white/40">{label}</p>
    </div>
);

const AttentionPathGraph = () => (
    <div className="relative mt-6 h-32 w-full rounded-xl bg-white/[0.02] p-4 border border-white/5">
        <p className="text-[9px] font-bold uppercase tracking-[0.3em] text-[#D4A574]">Focal Route</p>
        <svg className="mt-2 h-20 w-full" viewBox="0 0 300 80">
            <motion.path
                d="M10 60 Q 60 10, 120 40 T 290 30"
                fill="none" stroke="rgba(212,165,116,0.1)" strokeWidth="1"
            />
            <motion.path
                d="M10 60 Q 60 10, 120 40 T 290 30"
                fill="none" stroke="#D4A574" strokeWidth="2"
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                transition={{ duration: 2, ease: "easeInOut" }}
            />
            {[
                { x: 10, y: 60, l: 'Entry' },
                { x: 100, y: 32, l: 'Lock' },
                { x: 290, y: 30, l: 'Exit' }
            ].map((p, i) => (
                <motion.g key={i} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ delay: 1 + i * 0.4 }}>
                    <circle cx={p.x} cy={p.y} r="3" fill="#D4A574" />
                    <text x={p.x} y={p.y + 12} textAnchor="middle" style={{ fontSize: '8px', fill: 'rgba(255,255,255,0.3)', fontWeight: 'bold' }}>{p.l}</text>
                </motion.g>
            ))}
        </svg>
    </div>
);

export default function CanonicalDossierArtifact({ mode = 'preview', className = '' }: CanonicalDossierArtifactProps) {
    
    const isHeroSlice = mode === 'hero-slice';
    
    return (
        <div className={`relative overflow-hidden rounded-[2.5rem] border border-[#D4A574]/20 bg-[#12110F] shadow-[0_40px_100px_rgba(0,0,0,0.6)] ${className}`}>
            
            {/* Scanning Line Animation */}
            <motion.div 
                animate={{ top: ['0%', '100%', '0%'] }}
                transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
                className="absolute inset-x-0 h-px bg-gradient-to-r from-transparent via-[#D4A574]/30 to-transparent z-20 pointer-events-none"
            />

            {/* Header */}
            <div className="border-b border-white/5 px-8 py-6">
                <div className="flex items-center justify-between">
                    <div>
                        <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-[#D4A574]">Forensic Dossier</p>
                        <p className="mt-1 text-[9px] font-medium uppercase tracking-[0.2em] text-white/30 italic">v2.44 // READ_ONLY_SAMPLE</p>
                    </div>
                    <div className="h-2 w-2 rounded-full bg-[#D4A574] animate-pulse" />
                </div>
            </div>

            {/* Content */}
            <div className="p-8">
                {/* Score Row */}
                <div className="flex justify-between">
                    <ScoreRing label="Clarity" value={82} delay={0.1} />
                    <ScoreRing label="Attention" value={91} delay={0.2} />
                    <ScoreRing label="Cohesion" value={76} delay={0.3} />
                    <ScoreRing label="Intent" value={88} delay={0.4} />
                    <ScoreRing label="Distinction" value={67} delay={0.5} />
                </div>

                {/* Main Visual */}
                <AttentionPathGraph />

                {/* Strategy Snippet */}
                <div className="mt-8 space-y-5 border-t border-white/5 pt-8">
                    <div>
                        <p className="text-[9px] font-bold uppercase tracking-[0.3em] text-[#D4A574]">Strategic Thesis</p>
                        <p className="mt-3 text-[13px] leading-relaxed text-white/70">
                            Positions the product as <span className="text-white font-semibold italic underline decoration-[#D4A574]/40 underline-offset-4">premium</span> through controlled visual aggression and subject isolation.
                        </p>
                    </div>
                    
                    <div className="flex gap-4">
                        <div className="flex-1 rounded-xl bg-white/[0.03] p-4 border border-white/5">
                            <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-white/40 italic">Trigger</p>
                            <p className="mt-2 text-[11px] font-medium text-white/80">High-contrast subject lock.</p>
                        </div>
                        <div className="flex-1 rounded-xl bg-[#8B6A3D]/10 p-4 border border-[#8B6A3D]/20">
                            <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-[#D4A574] italic">Friction</p>
                            <p className="mt-2 text-[11px] font-medium text-[#F6F1E7]">Copy layer competes with focal route.</p>
                        </div>
                    </div>
                </div>

                {/* Footer Metadata */}
                <div className="mt-10 flex items-center justify-between border-t border-white/5 pt-6 opacity-30">
                    <p className="text-[8px] font-mono tracking-widest text-white uppercase">confidence_index: 0.94</p>
                    <p className="text-[8px] font-mono tracking-widest text-white uppercase">export_hash: 8f2_9a1_7c</p>
                </div>
            </div>

            {/* Gradient Overlay for Hero Slice */}
            {isHeroSlice && (
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#12110F]/20 to-[#12110F] z-30" />
            )}
        </div>
    );
}

