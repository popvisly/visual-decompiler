'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// 8 deep analysis layers — shows the full intelligence stack
const CARDS = [
    {
        id: 'trigger',
        label: 'Trigger Mechanic',
        value: 'Status Signaling',
        detail: 'Viewer elevates perceived self-worth through subliminal association with austere aesthetics.',
    },
    {
        id: 'archetype',
        label: 'Archetype',
        value: 'The Sovereign',
        detail: 'Appeals to desires for control, admiration, and exclusionary status.',
    },
    {
        id: 'semiotic',
        label: 'Semiotic Layer',
        value: 'Restraint as Status',
        detail: 'Absence of aggressive claims implies undeniable legacy power.',
    },
    {
        id: 'palette',
        label: 'Palette Logic',
        value: 'Authority / Exclusivity',
        detail: 'Muted deep tones trigger associations with mystery, elegance, and scarcity.',
        swatches: ['#2B2132', '#7D5A7B', '#AF8D9E', '#E6D4D3'],
    },
    {
        id: 'gaze',
        label: 'Gaze Vector',
        value: 'Direct Dominance Signal',
        detail: 'Eye contact establishes power dynamic typical of ultra-luxury brand codes.',
    },
    {
        id: 'objection',
        label: 'Objection Tackle',
        value: 'Price Friction Neutralized',
        detail: 'No price anchoring. Purchase resistance dissolved through implicit premium framing.',
    },
    {
        id: 'evidence',
        label: 'Evidence Anchors',
        value: '6 signals detected',
        detail: 'Macro texture · Negative space · Color restraint · Eye contact · Product Z-axis · Minimal copy',
    },
    {
        id: 'confidence',
        label: 'Confidence Score',
        value: '94%',
        detail: 'HIGH CONFIDENCE',
        isScore: true,
    },
];

// Each card gets ~1.1s, scan takes 1.8s, complete holds 2s
const SCAN_DURATION = 1800;
const CARD_DURATION = 1100;
const HOLD_DURATION = 2200;

export default function LiveDecompileHero() {
    const [phase, setPhase] = useState<'idle' | 'scanning' | 'cards' | 'complete'>('idle');
    const [visibleCards, setVisibleCards] = useState<string[]>([]);
    const [complete, setComplete] = useState(false);

    useEffect(() => {
        let cancelled = false;

        const runCycle = async () => {
            // Reset
            setPhase('idle');
            setVisibleCards([]);
            setComplete(false);
            await delay(400);
            if (cancelled) return;

            // Scan
            setPhase('scanning');
            await delay(SCAN_DURATION);
            if (cancelled) return;

            // Cards appear one by one
            setPhase('cards');
            for (const card of CARDS) {
                await delay(200);
                if (cancelled) return;
                setVisibleCards(prev => [...prev, card.id]);
                await delay(CARD_DURATION - 200);
                if (cancelled) return;
            }

            // Complete
            setComplete(true);
            setPhase('complete');
            await delay(HOLD_DURATION);
            if (cancelled) return;

            runCycle();
        };

        runCycle();
        return () => { cancelled = true; };
    }, []);

    return (
        <div className="w-full max-w-[1200px] mx-auto mt-10 mb-4">
            <div
                className="rounded-[28px] border border-[#E7DED1] bg-[#F8F5EE] shadow-[0_24px_80px_rgba(20,20,20,0.07)] overflow-hidden"
                style={{ height: '520px' }}
            >
                {/* Header bar */}
                <div className="flex items-center gap-2 px-5 py-3 border-b border-[#E7DED1] bg-white/60 backdrop-blur shrink-0">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#FF5F57]" />
                    <span className="w-2.5 h-2.5 rounded-full bg-[#FEBC2E]" />
                    <span className="w-2.5 h-2.5 rounded-full bg-[#28C840]" />
                    <span className="ml-3 text-[10px] font-mono text-[#141414]/40 uppercase tracking-[0.2em]">
                        Visual Decompiler — Forensic Engine v2
                    </span>
                    <div className="ml-auto flex items-center gap-2">
                        <AnimatePresence mode="wait">
                            {phase === 'scanning' && (
                                <motion.span key="scan" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                                    className="flex items-center gap-1.5 text-[10px] font-mono text-[#C1A67B] uppercase tracking-widest">
                                    <span className="w-1.5 h-1.5 rounded-full bg-[#C1A67B] animate-pulse" />
                                    Scanning
                                </motion.span>
                            )}
                            {phase === 'cards' && (
                                <motion.span key="proc" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                                    className="flex items-center gap-1.5 text-[10px] font-mono text-amber-600 uppercase tracking-widest">
                                    <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
                                    Processing
                                </motion.span>
                            )}
                            {phase === 'complete' && (
                                <motion.span key="done" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                                    className="flex items-center gap-1.5 text-[10px] font-mono text-green-600 uppercase tracking-widest">
                                    <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
                                    Complete
                                </motion.span>
                            )}
                        </AnimatePresence>
                    </div>
                </div>

                {/* Body — fixed height, no flex stretch */}
                <div className="flex" style={{ height: 'calc(100% - 45px)' }}>

                    {/* Left: Ad image — fixed width, fills remaining height */}
                    <div className="relative w-[280px] shrink-0 overflow-hidden bg-[#141414]">

                        {/* Ad image */}
                        <div
                            className="absolute inset-0 bg-cover bg-center"
                            style={{ backgroundImage: "url('/images/examples/perfume_ad_no_logo.jpg')" }}
                        />

                        {/* Scan line */}
                        <AnimatePresence>
                            {phase === 'scanning' && (
                                <motion.div
                                    key="scanline"
                                    className="absolute left-0 right-0 h-[2px] pointer-events-none z-20"
                                    style={{
                                        background: 'linear-gradient(90deg, transparent 0%, rgba(193,166,123,0.8) 20%, rgba(255,255,255,0.95) 50%, rgba(193,166,123,0.8) 80%, transparent 100%)',
                                        boxShadow: '0 0 14px 4px rgba(193,166,123,0.5)',
                                    }}
                                    initial={{ top: '0%' }}
                                    animate={{ top: '100%' }}
                                    transition={{ duration: 1.4, ease: 'linear' }}
                                />
                            )}
                        </AnimatePresence>

                        {/* File label */}
                        <div className="absolute top-3 left-3 z-30">
                            <div className="bg-[#141414]/90 backdrop-blur text-white text-[8px] font-mono tracking-[0.2em] uppercase px-2.5 py-1.5 rounded-md flex items-center gap-2">
                                <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse shadow-[0_0_6px_rgba(74,222,128,0.6)]" />
                                LUX_FRAGR.jpeg
                            </div>
                        </div>

                        {/* Evidence box 1 — eyes */}
                        <AnimatePresence>
                            {visibleCards.includes('gaze') && (
                                <motion.div key="box1" className="absolute z-20 pointer-events-none"
                                    style={{ top: '14%', left: '10%', width: '75%', height: '28%' }}
                                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    <div className="w-full h-full border border-[#C1A67B]/70 rounded-sm"
                                        style={{ background: 'rgba(193,166,123,0.05)' }} />
                                    <div className="absolute -top-5 left-0 text-[7px] font-mono text-[#C1A67B] bg-[#141414]/85 px-1.5 py-0.5 rounded whitespace-nowrap">
                                        GAZE_VECTOR
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        {/* Evidence box 2 — product */}
                        <AnimatePresence>
                            {visibleCards.includes('evidence') && (
                                <motion.div key="box2" className="absolute z-20 pointer-events-none"
                                    style={{ bottom: '12%', right: '8%', width: '55%', height: '32%' }}
                                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    <div className="w-full h-full border border-[#C1A67B]/60 rounded-sm"
                                        style={{ background: 'rgba(193,166,123,0.03)' }} />
                                    <div className="absolute -top-5 left-0 text-[7px] font-mono text-[#C1A67B] bg-[#141414]/85 px-1.5 py-0.5 rounded whitespace-nowrap">
                                        PRODUCT_ANCHOR
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    {/* Right: Analysis panel — scrollable internally */}
                    <div className="flex-1 flex flex-col overflow-hidden">
                        {/* Phase label */}
                        <div className="flex items-center gap-3 px-6 pt-5 pb-3 shrink-0">
                            <div className="h-px flex-1 bg-[#E7DED1]" />
                            <span className="text-[9px] font-mono text-[#141414]/40 uppercase tracking-[0.3em] whitespace-nowrap">
                                {phase === 'idle' && 'Awaiting input'}
                                {phase === 'scanning' && 'Scanning asset...'}
                                {phase === 'cards' && 'Extracting signals...'}
                                {phase === 'complete' && 'Intelligence extracted'}
                            </span>
                            <div className="h-px flex-1 bg-[#E7DED1]" />
                        </div>

                        {/* 2-column cards grid — all 8 visible without scrolling */}
                        <div className="flex-1 px-6 pb-5">
                        <div className="grid grid-cols-2 gap-2 h-full">

                            {/* Idle placeholders */}
                            {phase === 'idle' && (
                                <>
                                    {[1, 2, 3, 4, 5, 6, 7, 8].map(i => (
                                        <div key={i} className="rounded-xl border border-[#E7DED1] bg-[#F6F1E7] animate-pulse"
                                            style={{ animationDelay: `${i * 0.08}s` }} />
                                    ))}
                                </>
                            )}

                            {/* Analysis cards */}
                            {CARDS.map((card) => (
                                <AnimatePresence key={card.id}>
                                    {visibleCards.includes(card.id) && (
                                        <motion.div
                                            key={card.id}
                                            initial={{ opacity: 0, x: 14, filter: 'blur(3px)' }}
                                            animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
                                            exit={{ opacity: 0 }}
                                            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                                            className={`rounded-xl border px-4 py-3 flex items-start gap-3 ${card.isScore
                                                    ? 'bg-[#141414] border-[#333] shadow-[0_8px_30px_rgba(20,20,20,0.2)]'
                                                    : 'bg-white border-[#E7DED1] shadow-[0_2px_12px_rgba(20,20,20,0.04)]'
                                                }`}
                                        >
                                            <div className={`w-1.5 h-1.5 rounded-full mt-1.5 shrink-0 ${card.isScore ? 'bg-green-400 shadow-[0_0_8px_rgba(74,222,128,0.6)]' : 'bg-[#C1A67B]'}`} />

                                            <div className="flex-1 min-w-0">
                                                <div className={`text-[8px] font-bold tracking-[0.25em] uppercase mb-0.5 ${card.isScore ? 'text-white/40' : 'text-[#141414]/40'}`}>
                                                    {card.label}
                                                </div>

                                                {card.isScore ? (
                                                    <div className="flex items-baseline gap-3">
                                                        <span className="text-[26px] font-light text-white leading-none">{card.value}</span>
                                                        <span className="text-[9px] font-bold text-green-400 uppercase tracking-widest">{card.detail}</span>
                                                    </div>
                                                ) : (
                                                    <>
                                                        <div className="text-[13px] font-semibold text-[#141414] leading-tight mb-0.5">
                                                            {card.value}
                                                        </div>
                                                        {/* Color swatches for palette card */}
                                                        {card.swatches && (
                                                            <div className="flex gap-1 mb-1">
                                                                {card.swatches.map((c, i) => (
                                                                    <div key={i} className="w-4 h-3 rounded-sm border border-black/10"
                                                                        style={{ backgroundColor: c }} />
                                                                ))}
                                                            </div>
                                                        )}
                                                        <div className="text-[10px] text-[#141414]/50 leading-snug">
                                                            {card.detail}
                                                        </div>
                                                    </>
                                                )}
                                            </div>

                                            {/* Typing cursor on latest card */}
                                            {visibleCards[visibleCards.length - 1] === card.id && !complete && (
                                                <motion.div
                                                    className={`w-[2px] h-3 rounded-full self-center shrink-0 ${card.isScore ? 'bg-green-400' : 'bg-[#C1A67B]'}`}
                                                    animate={{ opacity: [1, 0, 1] }}
                                                    transition={{ repeat: Infinity, duration: 0.8 }}
                                                />
                                            )}
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            ))}

                            {/* Complete badge */}
                            <AnimatePresence>
                                {complete && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 6 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0 }}
                                        transition={{ duration: 0.4, ease: 'easeOut' }}
                                        className="col-span-2 flex items-center justify-center gap-2 py-3 rounded-xl border border-green-200 bg-green-50"
                                    >
                                        <svg className="w-3.5 h-3.5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                        </svg>
                                        <span className="text-[9px] font-bold text-green-700 uppercase tracking-[0.25em]">
                                            Intelligence Extracted — 8 Layers Deep
                                        </span>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

function delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
}
