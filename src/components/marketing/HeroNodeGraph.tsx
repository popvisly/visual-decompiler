'use client';

import { motion } from 'framer-motion';
import { StageImage } from '@/types/homepage';

interface Props {
    stageImage: StageImage;
}

export default function HeroNodeGraph({ stageImage }: Props) {
    // Weavy-style node graph layout
    // Main image on the left, nodes spreading out to the right.
    // SVG lines will draw the connections.

    const nodeVariants = {
        hidden: { opacity: 0, y: 15, scale: 0.95 },
        visible: (custom: number) => ({
            opacity: 1,
            y: 0,
            scale: 1,
            transition: { delay: custom * 0.15, duration: 0.8, ease: [0.22, 1, 0.36, 1] as any }
        })
    };

    return (
        <div className="relative w-full max-w-[1200px] mx-auto h-[600px] md:h-[700px] lg:h-[800px] rounded-[32px] overflow-hidden border border-[#E7DED1] shadow-[0_30px_90px_rgba(20,20,20,0.08)] bg-gradient-to-br from-[#FBF7EF] to-[#F2EBE0] p-4 md:p-8 lg:p-12">

            {/* Background grid for technical feel */}
            <div className="pointer-events-none absolute inset-0 opacity-[0.35] [background-image:linear-gradient(rgba(20,20,20,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(20,20,20,0.04)_1px,transparent_1px)] [background-size:24px_24px]" />

            {/* SVG Connector Lines */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 1 }}>
                <defs>
                    <linearGradient id="lineGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="rgba(20,20,20,0.3)" />
                        <stop offset="100%" stopColor="rgba(20,20,20,0.1)" />
                    </linearGradient>
                </defs>

                {/* Lines from center of main image to various nodes */}
                <g className="hidden md:block">
                    {/* Input to Semiotics */}
                    <path d="M 30% 50% C 34% 50%, 35% 22%, 38% 22%" fill="none" stroke="url(#lineGrad)" strokeWidth="1.5" strokeDasharray="4 4" />
                    {/* Input to Mechanics */}
                    <path d="M 30% 50% C 34% 50%, 35% 78%, 38% 78%" fill="none" stroke="url(#lineGrad)" strokeWidth="1.5" strokeDasharray="4 4" />
                    {/* Input to Color */}
                    <path d="M 30% 50% C 45% 50%, 55% 62%, 70% 62%" fill="none" stroke="url(#lineGrad)" strokeWidth="1.5" strokeDasharray="4 4" />

                    {/* Semiotics to Final Report */}
                    <path d="M 60% 22% C 65% 22%, 65% 30%, 70% 30%" fill="none" stroke="url(#lineGrad)" strokeWidth="1.5" />
                    {/* Mechanics to Final Report */}
                    <path d="M 60% 78% C 65% 78%, 65% 38%, 70% 38%" fill="none" stroke="url(#lineGrad)" strokeWidth="1.5" />
                </g>

                {/* Connection Dots */}
                <g className="hidden md:block" fill="#FBF7EF" stroke="#141414" strokeWidth="2">
                    <circle cx="30%" cy="50%" r="4" />
                    <circle cx="38%" cy="22%" r="4" />
                    <circle cx="38%" cy="78%" r="4" />
                    <circle cx="70%" cy="62%" r="4" />
                    <circle cx="60%" cy="22%" r="4" />
                    <circle cx="60%" cy="78%" r="4" />
                    <circle cx="70%" cy="30%" r="4" />
                    <circle cx="70%" cy="38%" r="4" />
                </g>
            </svg>

            {/* NODES CONTAINER */}
            <div className="relative w-full h-full z-10 flex flex-col md:block">

                {/* 1. MAIN INPUT NODE (Left) */}
                <motion.div
                    custom={0} initial="hidden" animate="visible" variants={nodeVariants}
                    className="md:absolute top-1/2 md:-translate-y-1/2 left-[4%] w-[80%] md:w-[26%] max-w-[280px] bg-white rounded-2xl shadow-xl overflow-hidden border border-[#E7DED1] flex flex-col mx-auto md:mx-0 mb-8 md:mb-0"
                >
                    <div className="bg-[#141414] text-white text-[9px] font-mono tracking-widest px-4 py-2 uppercase flex justify-between items-center">
                        <span>Input Asset</span>
                        <span className="opacity-50">RAW</span>
                    </div>
                    <div className="w-full aspect-[4/5] relative">
                        <img src={stageImage.src} alt={stageImage.alt} className="absolute inset-0 w-full h-full object-cover" />
                    </div>
                </motion.div>

                {/* 2. SEMIOTIC SUBTEXT (Top Middle) */}
                <motion.div
                    custom={1} initial="hidden" animate="visible" variants={nodeVariants}
                    className="md:absolute top-[12%] left-[38%] w-[80%] md:w-[22%] max-w-[240px] bg-white/90 backdrop-blur rounded-xl shadow-lg border border-[#E7DED1] p-4 mx-auto md:mx-0 mb-4 md:mb-0"
                >
                    <div className="text-[10px] font-bold tracking-[0.2em] text-[#6B6B6B] uppercase mb-2">Semiotics</div>
                    <p className="text-[#141414] text-sm leading-snug">
                        <strong>Restraint as Status.</strong> The absence of logos or aggressive claims implies undeniable authority.
                    </p>
                </motion.div>

                {/* 3. TRIGGER MECHANIC (Bottom Middle) */}
                <motion.div
                    custom={3} initial="hidden" animate="visible" variants={nodeVariants}
                    className="md:absolute top-[70%] left-[38%] w-[80%] md:w-[22%] max-w-[240px] bg-white/90 backdrop-blur rounded-xl shadow-lg border border-[#E7DED1] p-4 mx-auto md:mx-0 mb-4 md:mb-0"
                >
                    <div className="text-[10px] font-bold tracking-[0.2em] text-[#6B6B6B] uppercase mb-2">Mechanic</div>
                    <div className="bg-[#F6F1E7] border border-[#E7DED1] rounded-lg px-3 py-2 text-xs font-medium text-[#141414]">
                        Status Signaling
                    </div>
                    <p className="text-[11px] text-[#6B6B6B] mt-2 leading-tight">Viewer elevates perceived self-worth through association with austere aesthetics.</p>
                </motion.div>

                {/* 4. COLOR PSYCHOLOGY (Middle Right) */}
                <motion.div
                    custom={2} initial="hidden" animate="visible" variants={nodeVariants}
                    className="md:absolute top-[55%] left-[70%] w-[80%] md:w-[22%] max-w-[220px] bg-white/90 backdrop-blur rounded-xl shadow-lg border border-[#E7DED1] p-4 mx-auto md:mx-0 mb-4 md:mb-0"
                >
                    <div className="flex justify-between items-end mb-3">
                        <div className="text-[10px] font-bold tracking-[0.2em] text-[#6B6B6B] uppercase">Palette Logic</div>
                    </div>
                    <div className="flex h-6 w-full rounded-md overflow-hidden mb-2 shadow-inner">
                        <div className="w-2/5 bg-[#2B2132]" />
                        <div className="w-1/5 bg-[#7D5A7B]" />
                        <div className="w-1/5 bg-[#AF8D9E]" />
                        <div className="w-1/5 bg-[#E6D4D3]" />
                    </div>
                    <p className="text-[11px] text-[#6B6B6B] leading-tight">Muted deep tones trigger associations with mystery, elegance, and exclusivity.</p>
                </motion.div>

                {/* 5. FINAL REPORT NODE (Top Right) */}
                <motion.div
                    custom={4} initial="hidden" animate="visible" variants={nodeVariants}
                    className="md:absolute top-[18%] left-[70%] w-[80%] md:w-[26%] max-w-[280px] bg-[#141414] text-white rounded-xl shadow-2xl border border-[#333] p-5 mx-auto md:mx-0"
                >
                    <div className="flex items-center gap-2 mb-4">
                        <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                        <span className="text-[10px] font-bold tracking-[0.2em] text-[#888] uppercase">Intelligence Extracted</span>
                    </div>
                    <div className="space-y-3">
                        <div>
                            <div className="text-[10px] text-[#888] uppercase tracking-wider mb-1">Confidence Score</div>
                            <div className="text-xl font-light">94% — High</div>
                        </div>
                        <div className="h-px w-full bg-[#333]" />
                        <div>
                            <div className="text-[10px] text-[#888] uppercase tracking-wider mb-1">Primary Vector</div>
                            <div className="text-[13px] text-[#ccc]">Aesthetic Authority</div>
                        </div>
                    </div>
                </motion.div>

            </div>
        </div>
    );
}
