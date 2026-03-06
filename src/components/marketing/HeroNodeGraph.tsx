'use client';

import { motion } from 'framer-motion';
import { StageImage } from '@/types/homepage';

interface Props {
    stageImage: StageImage;
}

export default function HeroNodeGraph({ stageImage }: Props) {
    const nodeVariants = {
        hidden: { opacity: 0, y: 15, filter: 'blur(4px)' },
        visible: (custom: number) => ({
            opacity: 1,
            y: 0,
            filter: 'blur(0px)',
            transition: { delay: custom * 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] as any }
        })
    };

    return (
        <div className="w-full max-w-[1440px] mx-auto min-h-[600px] rounded-[32px] overflow-hidden border border-[rgba(0,240,255,0.15)] shadow-[0_30px_90px_rgba(0,0,0,0.4)] bg-[#0D0D0D] p-6 lg:p-12 mt-8 mb-16 relative flex flex-col gap-8">
            {/* Background Grid - Dark/Cyan Forensic Style */}
            <div
                className="pointer-events-none absolute inset-0 opacity-40 mix-blend-screen"
                style={{
                    backgroundImage: 'linear-gradient(rgba(0,240,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(0,240,255,0.05) 1px, transparent 1px)',
                    backgroundSize: '32px 32px'
                }}
            />
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_50%,rgba(0,240,255,0.03)_0%,transparent_100%)]" />

            {/* SVG Connecting Lines (Absolute behind cards) */}
            <div className="hidden lg:block absolute inset-0 pointer-events-none z-0">
                <svg className="w-full h-full opacity-30" style={{ filter: 'drop-shadow(0 0 4px rgba(0,240,255,0.5))' }}>
                    {/* Horizontal Main Spine */}
                    <path d="M 30% 50% L 70% 50%" stroke="#00F0FF" strokeWidth="1" strokeDasharray="4 4" fill="none" className="animate-[dash_30s_linear_infinite]" />
                    {/* Vertical Branches to Top/Bottom cards */}
                    <path d="M 50% 50% V 25%" stroke="#00F0FF" strokeWidth="1" strokeDasharray="4 4" fill="none" />
                    <path d="M 50% 50% V 75%" stroke="#00F0FF" strokeWidth="1" strokeDasharray="4 4" fill="none" />
                </svg>
            </div>

            <style dangerouslySetInnerHTML={{
                __html: `
                @keyframes dash {
                    to { stroke-dashoffset: -1000; }
                }
            `}} />

            {/* Neural Network Layout */}
            <div className="relative z-10 w-full flex flex-col lg:grid lg:grid-cols-3 gap-6 lg:gap-10">
                {/* COLUMN 1: INPUT ASSET */}
                <div className="flex flex-col gap-6 justify-center">
                    <motion.div custom={1} initial="hidden" animate="visible" variants={nodeVariants}
                        className="bg-[#141414]/90 backdrop-blur-md rounded-2xl overflow-hidden border border-[#00F0FF]/20 shadow-[0_0_30px_rgba(0,240,255,0.05)] flex flex-col relative aspect-[4/5] w-full"
                    >
                        {/* Brackets */}
                        <div className="absolute top-0 left-0 w-4 h-4 border-l border-t border-[#00F0FF]/50 m-2 z-20 pointer-events-none" />
                        <div className="absolute top-0 right-0 w-4 h-4 border-r border-t border-[#00F0FF]/50 m-2 z-20 pointer-events-none" />

                        <div className="bg-[#00F0FF]/5 border-b border-[#00F0FF]/10 text-[#00F0FF] text-[9px] font-bold tracking-[0.2em] px-4 py-3 uppercase flex justify-between items-center z-10 relative">
                            <span className="flex items-center gap-2">
                                <span className="w-1.5 h-1.5 bg-[#00F0FF] rounded-full animate-pulse shadow-[0_0_8px_#00F0FF]" />
                                Input Target
                            </span>
                            <span className="text-white/30 tracking-widest font-mono">ASSET_01</span>
                        </div>
                        <img src={stageImage.src} alt="Main Ad" className="w-full h-full object-cover absolute inset-0 pt-10" style={{ filter: 'brightness(0.85) contrast(1.1)' }} />
                    </motion.div>
                </div>

                {/* COLUMN 2: DECONSTRUCTION NODES (MIDDLE) */}
                <div className="flex flex-col gap-6 justify-center">
                    {/* Node 1: Palette */}
                    <motion.div custom={2} initial="hidden" animate="visible" variants={nodeVariants}
                        className="bg-[#141414]/80 backdrop-blur-md rounded-xl border border-white/5 shadow-2xl p-5 flex flex-col relative group hover:border-[#00F0FF]/30 transition-colors"
                    >
                        <div className="absolute top-3 right-3 text-[8px] font-mono text-white/20">[HEX_EXTRACT]</div>
                        <div className="text-[10px] font-bold tracking-[0.2em] text-[#00F0FF]/70 uppercase mb-3 flex items-center gap-2">
                            Palette Logic
                        </div>
                        <div className="flex w-full h-5 rounded overflow-hidden mb-3 border border-white/5">
                            <div className="w-1/3 bg-[#2B2132]" />
                            <div className="w-1/4 bg-[#7D5A7B]" />
                            <div className="w-1/4 bg-[#AF8D9E]" />
                            <div className="w-1/6 bg-[#E6D4D3]" />
                        </div>
                        <p className="text-[11px] text-white/60 leading-relaxed font-light">Muted deep tones trigger associations with mystery, elegance, and high-status exclusivity.</p>
                    </motion.div>

                    {/* Node 2: Trigger Mechanic */}
                    <motion.div custom={3} initial="hidden" animate="visible" variants={nodeVariants}
                        className="bg-[#141414]/80 backdrop-blur-md rounded-xl border border-[#00F0FF]/20 shadow-[0_0_20px_rgba(0,240,255,0.05)] p-5 flex flex-col relative"
                    >
                        <div className="absolute top-3 right-3 text-[8px] font-mono text-[#00F0FF]/30">[CORE_DRIVE]</div>
                        <div className="text-[10px] font-bold tracking-[0.2em] text-[#00F0FF] uppercase mb-3">Trigger Mechanic</div>
                        <div className="bg-[#00F0FF]/5 border border-[#00F0FF]/20 rounded px-4 py-2 text-[12px] text-white font-medium mb-3 shadow-[0_0_10px_rgba(0,240,255,0.1)_inset]">
                            Status Signaling
                        </div>
                        <p className="text-[11px] text-white/60 leading-relaxed font-light mt-1">
                            Viewer elevates perceived self-worth through subliminal association with austere aesthetics.
                        </p>
                    </motion.div>

                    {/* Node 3: Semiotics */}
                    <motion.div custom={4} initial="hidden" animate="visible" variants={nodeVariants}
                        className="bg-[#141414]/80 backdrop-blur-md rounded-xl border border-white/5 shadow-2xl p-5 flex flex-col relative hover:border-[#00F0FF]/30 transition-colors"
                    >
                        <div className="absolute top-3 right-3 text-[8px] font-mono text-white/20">[SUBTEXT]</div>
                        <div className="text-[10px] font-bold tracking-[0.2em] text-[#00F0FF]/70 uppercase mb-3">Semiotics</div>
                        <p className="text-[11px] text-white/90 leading-relaxed font-light mb-2 border-l-2 border-[#00F0FF]/40 pl-3">
                            <strong>Restraint as Status.</strong><br />
                            <span className="text-white/50">The absence of aggressive claims implies undeniable legacy power.</span>
                        </p>
                        <p className="text-[11px] text-white/90 leading-relaxed font-light border-l-2 border-[#00F0FF]/40 pl-3">
                            <strong>Physical Prominence.</strong><br />
                            <span className="text-white/50">Glass intersection highlights product tangibility over subject identity.</span>
                        </p>
                    </motion.div>
                </div>

                {/* COLUMN 3: OUTPUT / INTELLIGENCE */}
                <div className="flex flex-col gap-6 justify-center h-full pt-4 lg:pt-0">
                    <motion.div custom={5} initial="hidden" animate="visible" variants={nodeVariants}
                        className="bg-[#0D0D0D] text-white rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.8)] border border-[#00F0FF]/30 p-8 flex flex-col justify-center relative overflow-hidden h-[400px]"
                    >
                        {/* Scanning beam effect inside card */}
                        <div className="absolute inset-x-0 h-[2px] bg-[#00F0FF] opacity-50 shadow-[0_0_15px_#00F0FF] animate-[scan_3s_ease-in-out_infinite_alternate]" />
                        <style dangerouslySetInnerHTML={{
                            __html: `
                            @keyframes scan {
                                0% { top: 0%; opacity: 0; }
                                10% { opacity: 0.5; }
                                90% { opacity: 0.5; }
                                100% { top: 100%; opacity: 0; }
                            }
                        `}} />

                        <div className="flex items-center gap-3 mb-8 justify-center relative z-10">
                            <span className="w-2 h-2 rounded-sm bg-[#00F0FF] shadow-[0_0_12px_#00F0FF]" />
                            <span className="text-[11px] font-bold tracking-[0.3em] text-white uppercase">Neural Extraction</span>
                        </div>

                        <div className="space-y-10 text-center relative z-10">
                            <div>
                                <div className="text-[9px] text-[#00F0FF]/60 uppercase tracking-widest mb-2 font-mono">[CERTAINTY_INDEX]</div>
                                <div className="text-[54px] tracking-tight font-light text-white leading-none drop-shadow-[0_0_20px_rgba(255,255,255,0.2)]">94%</div>
                                <div className="text-[10px] text-[#00F0FF] mt-3 uppercase tracking-widest py-1.5 border border-[#00F0FF]/30 rounded bg-[#00F0FF]/5 w-fit mx-auto px-4">High Confidence</div>
                            </div>

                            <div className="h-px w-full bg-gradient-to-r from-transparent via-[#00F0FF]/30 to-transparent" />

                            <div>
                                <div className="text-[9px] text-[#00F0FF]/60 uppercase tracking-widest mb-2 font-mono">[DOMINANT_VECTOR]</div>
                                <div className="text-[16px] text-white font-medium tracking-wide">Aesthetic Authority</div>
                            </div>
                        </div>
                    </motion.div>
                </div>

            </div>
        </div>
    );
}
