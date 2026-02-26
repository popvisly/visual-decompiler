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


            {/* NODES CONTAINER - GRID LAYOUT */}
            <div className="relative z-10 w-full h-full flex flex-col md:grid md:grid-cols-12 md:grid-rows-12 gap-4 md:gap-6 p-2 md:p-6">

                {/* LEFT COLUMN: VISUAL ASSETS */}

                {/* Main Input - Top Left */}
                <motion.div
                    custom={0} initial="hidden" animate="visible" variants={nodeVariants}
                    className="md:col-span-4 md:row-span-7 bg-white rounded-2xl shadow-[0_15px_40px_rgba(20,20,20,0.12)] overflow-hidden border border-[#E7DED1] flex flex-col relative h-64 md:h-auto"
                >
                    <div className="absolute top-0 left-0 right-0 z-20 bg-gradient-to-b from-[#141414]/80 to-transparent pt-3 pb-6 px-4 flex justify-between items-start">
                        <span className="text-white text-[9px] font-bold tracking-[0.2em] uppercase drop-shadow-md">Input Asset</span>
                        <span className="text-white/60 text-[9px] font-mono tracking-widest uppercase bg-[#141414]/50 px-2 py-0.5 rounded backdrop-blur-sm">RAW</span>
                    </div>
                    <img src={stageImage.src} alt="Main Ad" className="absolute inset-0 w-full h-full object-cover" />
                </motion.div>

                {/* Color Palette - Bottom Left */}
                <motion.div
                    custom={1} initial="hidden" animate="visible" variants={nodeVariants}
                    className="md:col-span-4 md:row-span-5 bg-white/95 backdrop-blur-md rounded-xl shadow-lg border border-[#E7DED1] p-5 flex flex-col justify-center"
                >
                    <div className="text-[10px] font-bold tracking-[0.2em] text-[#141414]/50 uppercase mb-3">Palette Logic</div>
                    <div className="flex w-full h-8 rounded-lg overflow-hidden mb-3 shadow-inner">
                        <div className="w-1/3 bg-[#2B2132]" />
                        <div className="w-1/4 bg-[#7D5A7B]" />
                        <div className="w-1/4 bg-[#AF8D9E]" />
                        <div className="w-1/6 bg-[#E6D4D3]" />
                    </div>
                    <p className="text-[11px] text-[#6B6B6B] leading-snug">Muted deep tones trigger associations with mystery, elegance, and exclusivity.</p>
                </motion.div>

                {/* MIDDLE COLUMN: DEEP CROPS */}

                {/* Eyes Crop */}
                <motion.div
                    custom={2} initial="hidden" animate="visible" variants={nodeVariants}
                    className="md:col-span-4 md:row-span-3 bg-white rounded-xl shadow-md overflow-hidden border border-[#E7DED1] relative h-32 md:h-auto"
                >
                    <img src="/images/examples/eyes.jpg" alt="Gaze Analysis" className="absolute inset-0 w-full h-full object-cover object-center" />
                </motion.div>

                {/* Mouth Crop */}
                <motion.div
                    custom={3} initial="hidden" animate="visible" variants={nodeVariants}
                    className="md:col-span-4 md:row-span-3 bg-white rounded-xl shadow-md overflow-hidden border border-[#E7DED1] relative h-32 md:h-auto"
                >
                    <img src="/images/examples/mouth.jpg" alt="Sensual Cue" className="absolute inset-0 w-full h-full object-cover object-[center_30%]" />
                </motion.div>

                {/* Perfume Crop */}
                <motion.div
                    custom={4} initial="hidden" animate="visible" variants={nodeVariants}
                    className="md:col-span-4 md:row-span-6 bg-white rounded-xl shadow-lg border border-[#E7DED1] p-1 h-64 md:h-auto"
                >
                    <div className="w-full h-full relative rounded-lg overflow-hidden">
                        <img src="/images/examples/perfume.jpg" alt="Product Hero" className="absolute inset-0 w-full h-full object-cover object-bottom" />
                    </div>
                </motion.div>

                {/* RIGHT COLUMN: INTELLIGENCE NODES */}

                {/* Semiotics Text Node */}
                <motion.div
                    custom={5} initial="hidden" animate="visible" variants={nodeVariants}
                    className="md:col-span-4 md:row-span-4 bg-white/95 backdrop-blur-md rounded-xl shadow-lg border border-[#E7DED1] p-5 md:p-6 flex flex-col justify-center"
                >
                    <div className="text-[10px] font-bold tracking-[0.2em] text-[#141414]/50 uppercase mb-2">Semiotics</div>
                    <p className="text-[#141414] text-sm leading-relaxed">
                        <strong>Restraint as Status.</strong> The absence of aggressive claims implies undeniable authority and legacy power.
                    </p>
                </motion.div>

                {/* Mechanic Text Node */}
                <motion.div
                    custom={6} initial="hidden" animate="visible" variants={nodeVariants}
                    className="md:col-span-4 md:row-span-4 bg-white/95 backdrop-blur-md rounded-xl shadow-lg border border-[#E7DED1] p-5 md:p-6 flex flex-col justify-center"
                >
                    <div className="text-[10px] font-bold tracking-[0.2em] text-[#141414]/50 uppercase mb-3 text-center">Trigger Mechanic</div>
                    <div className="bg-[#F6F1E7] border border-[#E7DED1] rounded-lg px-4 py-2 text-sm font-medium text-[#141414] text-center mx-auto shadow-sm">
                        Status Signaling
                    </div>
                    <p className="text-[11px] text-[#6B6B6B] mt-3 leading-snug text-center max-w-[90%] mx-auto">
                        Viewer elevates perceived self-worth through subliminal association with austere aesthetics.
                    </p>
                </motion.div>

                {/* Final Report Node */}
                <motion.div
                    custom={7} initial="hidden" animate="visible" variants={nodeVariants}
                    className="md:col-span-4 md:row-span-4 bg-[#141414] text-white rounded-xl shadow-2xl border border-[#333] p-5 md:p-6 flex flex-col justify-center"
                >
                    <div className="flex items-center gap-2 mb-4">
                        <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse shadow-[0_0_8px_rgba(74,222,128,0.5)]" />
                        <span className="text-[10px] font-bold tracking-[0.2em] text-white/50 uppercase">Intelligence Extracted</span>
                    </div>
                    <div className="space-y-4">
                        <div>
                            <div className="text-[9px] text-white/40 uppercase tracking-widest mb-1">Confidence Score</div>
                            <div className="text-[22px] tracking-tight font-light text-white">94% — High</div>
                        </div>
                        <div className="h-px w-[80%] bg-[#333]" />
                        <div>
                            <div className="text-[9px] text-white/40 uppercase tracking-widest mb-1">Primary Vector</div>
                            <div className="text-[14px] text-white/90 font-medium">Aesthetic Authority</div>
                        </div>
                    </div>
                </motion.div>

            </div>
        </div>
    );
}
