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
        <div className="w-full max-w-[1440px] mx-auto min-h-[600px] rounded-[32px] overflow-hidden border border-[#E7DED1] shadow-[0_30px_90px_rgba(20,20,20,0.08)] bg-[#F8F5EE] p-6 lg:p-10 my-10 relative flex flex-col xl:flex-row gap-8">

            {/* Background grid for technical feel */}
            <div className="pointer-events-none absolute inset-0 opacity-[0.35] [background-image:linear-gradient(rgba(20,20,20,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(20,20,20,0.04)_1px,transparent_1px)] [background-size:24px_24px]" />

            {/* Global Ingest Stream (Anti-Pigeonhole Queue) */}
            <div className="relative z-10 hidden xl:flex flex-col justify-center w-[160px] shrink-0 border-r border-[#141414]/10 pr-6">
                <div className="text-[10px] font-mono tracking-[0.15em] text-[#141414]/60 uppercase mb-8">
                    Ingest Queue
                </div>
                <div className="flex flex-col gap-5">
                    <div className="flex items-center gap-2 opacity-30">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#141414]" />
                        <span className="text-[9px] font-mono truncate">AUTO_SUV_Q3.mp4</span>
                    </div>
                    <div className="flex items-center gap-2 opacity-40">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#141414]" />
                        <span className="text-[9px] font-mono truncate">FMCG_Snack.jpg</span>
                    </div>
                    <div className="flex items-center gap-2 opacity-60">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#141414]" />
                        <span className="text-[9px] font-mono truncate">B2B_SaaS_Hero.mp4</span>
                    </div>

                    {/* Active Processing Target */}
                    <div className="flex items-center gap-2 opacity-100 bg-white/80 p-2 rounded border border-[#141414]/10 shadow-[0_4px_12px_rgba(20,20,20,0.05)] relative -ml-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-[pulse_1.5s_ease-in-out_infinite] shadow-[0_0_5px_rgba(34,197,94,0.5)]" />
                        <span className="text-[9px] font-mono font-bold truncate">LUX_FRAGR.jpeg</span>

                        {/* Connection Line to Grid */}
                        <div className="absolute right-[-24px] top-1/2 -translate-y-1/2 w-[24px] h-px bg-[#141414]/10 border-b border-[#141414]/10 border-dashed" />
                    </div>

                    <div className="flex items-center gap-2 opacity-20">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#141414]" />
                        <span className="text-[9px] font-mono truncate">TECH_Launch.mov</span>
                    </div>
                </div>
            </div>

            {/* Faint Horizontal Joining Lines */}
            <div className="pointer-events-none absolute inset-0 hidden xl:block" style={{ zIndex: 1 }}>
                <div className="absolute top-[22%] left-[230px] w-[calc(100%-270px)] h-px bg-[#141414]/10 border-b border-[#141414]/5 border-dashed" />
                <div className="absolute top-[48%] left-[230px] w-[calc(100%-270px)] h-px bg-[#141414]/10 border-b border-[#141414]/5 border-dashed" />
                <div className="absolute top-[75%] left-[230px] w-[calc(100%-270px)] h-px bg-[#141414]/10 border-b border-[#141414]/5 border-dashed" />
            </div>

            {/* Evidence Board Grid */}
            <div className="relative z-10 w-full flex flex-col md:grid md:grid-cols-4 gap-4 md:gap-6 flex-1">

                {/* COLUMN 1: MACRO ASSET */}
                <div className="flex flex-col gap-4 md:gap-6">
                    <motion.div custom={1} initial="hidden" animate="visible" variants={nodeVariants}
                        className="bg-white rounded-xl shadow-[0_15px_40px_rgba(20,20,20,0.1)] overflow-hidden border border-[#E7DED1] flex flex-col relative aspect-[4/5] w-full"
                    >
                        <div className="bg-[#141414] text-white text-[9px] font-bold tracking-[0.2em] px-3 py-2.5 uppercase flex justify-between items-center z-10 absolute top-0 left-0 right-0">
                            <span>Input Asset</span>
                            <span className="text-white/50 tracking-widest font-mono">RAW</span>
                        </div>
                        <img src={stageImage.src} alt="Main Ad" className="w-full h-full object-cover absolute inset-0 pt-8 bg-[#141414]" />
                    </motion.div>

                    <motion.div custom={2} initial="hidden" animate="visible" variants={nodeVariants}
                        className="bg-white/95 backdrop-blur-md rounded-xl shadow-lg border border-[#E7DED1] p-5 flex flex-col justify-center"
                    >
                        <div className="text-[10px] font-bold tracking-[0.2em] text-[#141414]/40 uppercase mb-3 text-center">Trigger Mechanic</div>
                        <div className="bg-[#F6F1E7] border border-[#E7DED1] rounded-lg px-4 py-2 text-xs font-semibold text-[#141414] text-center mx-auto shadow-sm w-full">
                            Status Signaling
                        </div>
                        <p className="text-[11px] text-[#6B6B6B] mt-3 leading-snug text-center">
                            Viewer elevates perceived self-worth through subliminal association with austere aesthetics.
                        </p>
                    </motion.div>

                    <motion.div custom={3} initial="hidden" animate="visible" variants={nodeVariants}
                        className="bg-white/95 backdrop-blur-md rounded-xl shadow-lg border border-[#E7DED1] p-5 flex flex-col justify-center text-center flex-1 min-h-[140px]"
                    >
                        <div className="text-[10px] font-bold tracking-[0.2em] text-[#141414]/40 uppercase mb-2">Archetype</div>
                        <p className="text-[11px] text-[#141414] leading-snug">
                            <strong>The Sovereign.</strong> Appeals aggressively to desires for control, admiration, and exclusionary status.
                        </p>
                    </motion.div>
                </div>

                {/* COLUMN 2: MICRO CROPS */}
                <div className="flex flex-col gap-4 md:gap-6">
                    <motion.div custom={4} initial="hidden" animate="visible" variants={nodeVariants}
                        className="bg-white rounded-xl shadow-[0_15px_30px_rgba(20,20,20,0.08)] overflow-hidden border border-[#E7DED1] aspect-[2/1] relative group"
                    >
                        <div className="absolute font-mono text-[9px] bg-white/90 backdrop-blur px-1.5 py-0.5 bottom-2 right-2 text-[#141414]/60 rounded z-10 shadow-sm border border-[#E7DED1]">CROP_A</div>
                        <img src="/images/examples/eyes.jpg" alt="Eyes Crop" className="w-full h-full absolute inset-0 object-cover object-[center_30%] group-hover:scale-105 transition-transform duration-700" />
                    </motion.div>

                    <motion.div custom={5} initial="hidden" animate="visible" variants={nodeVariants}
                        className="bg-white rounded-xl shadow-[0_15px_30px_rgba(20,20,20,0.08)] overflow-hidden border border-[#E7DED1] aspect-[2/1] relative group"
                    >
                        <div className="absolute font-mono text-[9px] bg-white/90 backdrop-blur px-1.5 py-0.5 bottom-2 right-2 text-[#141414]/60 rounded z-10 shadow-sm border border-[#E7DED1]">CROP_B</div>
                        <img src="/images/examples/mouth.jpg" alt="Mouth Crop" className="w-full h-full absolute inset-0 object-cover object-[center_10%] group-hover:scale-105 transition-transform duration-700" />
                    </motion.div>

                    <motion.div custom={6} initial="hidden" animate="visible" variants={nodeVariants}
                        className="bg-white rounded-xl shadow-lg border border-[#E7DED1] p-1.5 flex flex-col justify-center flex-1 relative min-h-[300px] group"
                    >
                        <div className="absolute font-mono text-[9px] bg-white/90 backdrop-blur px-1.5 py-0.5 bottom-3 right-3 text-[#141414]/60 rounded z-20 shadow-sm border border-[#E7DED1]">CROP_C</div>
                        <div className="w-full h-full rounded-lg overflow-hidden relative border border-[#E7DED1]/50 bg-[#F6F1E7]">
                            <img src="/images/examples/perfume.jpg" alt="Perfume Crop" className="absolute inset-0 w-full h-full object-cover object-bottom group-hover:scale-105 transition-transform duration-700" />
                        </div>
                    </motion.div>
                </div>

                {/* COLUMN 3: DIRECT ANALYSIS */}
                <div className="flex flex-col gap-4 md:gap-6">
                    <motion.div custom={7} initial="hidden" animate="visible" variants={nodeVariants}
                        className="bg-white/95 backdrop-blur-md rounded-xl shadow-lg border border-[#E7DED1] p-5 flex flex-col justify-center lg:aspect-[2/1] min-h-[140px] text-center"
                    >
                        <div className="text-[10px] font-bold tracking-[0.2em] text-[#141414]/40 uppercase mb-2">Palette Logic</div>
                        <div className="flex w-full h-4 rounded-md overflow-hidden mb-3 shadow-inner">
                            <div className="w-1/3 bg-[#2B2132]" />
                            <div className="w-1/4 bg-[#7D5A7B]" />
                            <div className="w-1/4 bg-[#AF8D9E]" />
                            <div className="w-1/6 bg-[#E6D4D3]" />
                        </div>
                        <p className="text-[11px] text-[#6B6B6B] leading-snug">Muted deep tones trigger associations with mystery, elegance, and exclusivity.</p>
                    </motion.div>

                    <motion.div custom={8} initial="hidden" animate="visible" variants={nodeVariants}
                        className="bg-white/95 backdrop-blur-md rounded-xl shadow-lg border border-[#E7DED1] p-5 flex flex-col justify-center lg:aspect-[2/1] min-h-[140px] text-center"
                    >
                        <div className="text-[10px] font-bold tracking-[0.2em] text-[#141414]/40 uppercase mb-2">Sensual Cue</div>
                        <p className="text-[11px] text-[#141414] leading-snug">
                            Parted lips indicate openness, functioning as a primal driver for audience capture.
                        </p>
                    </motion.div>

                    <motion.div custom={9} initial="hidden" animate="visible" variants={nodeVariants}
                        className="bg-white/95 backdrop-blur-md rounded-xl shadow-lg border border-[#E7DED1] p-5 flex flex-col justify-center flex-1 min-h-[300px] text-center"
                    >
                        <div className="text-[10px] font-bold tracking-[0.2em] text-[#141414]/40 uppercase mb-3">Semiotics</div>
                        <p className="text-[11px] text-[#141414] leading-relaxed mb-4">
                            <strong>Restraint as Status.</strong> The absence of aggressive claims implies undeniable legacy power.
                            <br /><br />
                            <strong>Physical Prominence.</strong> The refraction of light through the glass intersecting the Z-axis highlights product tangibility over subject identity.
                        </p>
                    </motion.div>
                </div>

                {/* COLUMN 4: SYNTHESIS */}
                <div className="flex flex-col gap-4 md:gap-6">
                    <motion.div custom={10} initial="hidden" animate="visible" variants={nodeVariants}
                        className="bg-white/95 backdrop-blur-md rounded-xl shadow-lg border border-[#E7DED1] p-5 flex flex-col justify-center lg:aspect-[2/1] min-h-[140px] text-center"
                    >
                        <div className="text-[10px] font-bold tracking-[0.2em] text-[#141414]/40 uppercase mb-2">Gaze Vector</div>
                        <p className="text-[11px] text-[#141414] leading-snug">
                            Direct engagement establishes dominant power dynamic typical of high luxury branding.
                        </p>
                    </motion.div>

                    <motion.div custom={11} initial="hidden" animate="visible" variants={nodeVariants}
                        className="bg-white/95 backdrop-blur-md rounded-xl shadow-lg border border-[#E7DED1] p-5 flex flex-col justify-center lg:aspect-[2/1] min-h-[140px] text-center"
                    >
                        <div className="text-[10px] font-bold tracking-[0.2em] text-[#141414]/40 uppercase mb-2">Materiality</div>
                        <p className="text-[11px] text-[#141414] leading-snug">
                            Heavy metallic accents consistently signal a premium positioning tier, separating it from mass-market visual codes.
                        </p>
                    </motion.div>

                    <motion.div custom={12} initial="hidden" animate="visible" variants={nodeVariants}
                        className="bg-[#141414] text-white rounded-xl shadow-[0_20px_50px_rgba(20,20,20,0.3)] border border-[#333] p-6 flex flex-col justify-center flex-1 min-h-[300px]"
                    >
                        <div className="flex items-center gap-2 mb-6 justify-center">
                            <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse shadow-[0_0_8px_rgba(74,222,128,0.5)]" />
                            <span className="text-[9px] font-bold tracking-[0.2em] text-white/50 uppercase">Intelligence Extracted</span>
                        </div>

                        <div className="space-y-6 text-center">
                            <div>
                                <div className="text-[8px] text-white/40 uppercase tracking-widest mb-1.5 font-mono">Confidence Score</div>
                                <div className="text-[32px] tracking-tight font-light text-white leading-none">94%</div>
                                <div className="text-[11px] text-green-400 opacity-80 mt-1 uppercase max-w-[60%] mx-auto py-1 border border-green-400/20 rounded bg-green-400/10 hidden lg:block">High Confidence</div>
                            </div>

                            <div className="h-px w-[60%] mx-auto bg-[#333]" />

                            <div>
                                <div className="text-[8px] text-white/40 uppercase tracking-widest mb-1.5 font-mono">Primary Vector</div>
                                <div className="text-[14px] text-white/90 font-medium tracking-wide">Aesthetic Authority</div>
                            </div>
                        </div>
                    </motion.div>
                </div>

            </div>
        </div>
    );
}
