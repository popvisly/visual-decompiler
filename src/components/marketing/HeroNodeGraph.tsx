'use client';

import { motion } from 'framer-motion';
import { StageImage } from '@/types/homepage';

interface Props {
    stageImage: StageImage;
}

export default function HeroNodeGraph({ stageImage }: Props) {

    const nodeVariants = {
        hidden: { opacity: 0, y: 15, scale: 0.95 },
        visible: (custom: number) => ({
            opacity: 1,
            y: 0,
            scale: 1,
            transition: { delay: custom * 0.15, duration: 0.8, ease: [0.22, 1, 0.36, 1] as any }
        })
    };

    // Explicit technical "elbow" paths for the circuit board look
    const paths = [
        "M 12 50 L 14 50", // Queue to Input
        "M 32 50 L 35 50 L 35 20 L 38 20", // Input to Eyes
        "M 32 50 L 35 50 L 35 45 L 38 45", // Input to Mouth
        "M 32 50 L 35 50 L 35 75 L 38 75", // Input to Perfume
        "M 54 20 L 60 20", // Eyes to Palette
        "M 54 45 L 60 45", // Mouth to Trigger
        "M 54 75 L 60 75", // Perfume to Semiotics
        "M 76 20 L 79 20 L 79 50 L 82 50", // Palette to Final
        "M 76 45 L 79 45 L 79 50 L 82 50", // Trigger to Final
        "M 76 75 L 79 75 L 79 50 L 82 50", // Semiotics to Final
    ];

    const dots = [
        [14, 50], [32, 50],
        [38, 20], [54, 20],
        [38, 45], [54, 45],
        [38, 75], [54, 75],
        [60, 20], [76, 20],
        [60, 45], [76, 45],
        [60, 75], [76, 75],
        [82, 50]
    ];

    return (
        <div className="relative w-full max-w-[1240px] mx-auto min-h-[600px] md:h-[750px] lg:h-[800px] rounded-[32px] overflow-hidden border border-[#E7DED1] shadow-[0_30px_90px_rgba(20,20,20,0.08)] bg-[#F8F5EE] p-4 md:p-0 my-10">

            {/* Background scanner grid */}
            <div className="pointer-events-none absolute inset-0 opacity-[0.35] [background-image:linear-gradient(rgba(20,20,20,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(20,20,20,0.04)_1px,transparent_1px)] [background-size:24px_24px]" />

            {/* SVG Circuit Lines (Desktop Only) */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none hidden md:block" style={{ zIndex: 1 }}>
                <defs>
                    <linearGradient id="lineGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="rgba(20,20,20,0.4)" />
                        <stop offset="100%" stopColor="rgba(20,20,20,0.1)" />
                    </linearGradient>
                </defs>
                {paths.map((p, i) => (
                    <path
                        key={i}
                        d={p}
                        fill="none"
                        stroke="url(#lineGrad)"
                        strokeWidth="1.5"
                    />
                ))}

                {dots.map((d, i) => (
                    <g key={i}>
                        <circle cx={`${d[0]}%`} cy={`${d[1]}%`} r="3" fill="#F8F5EE" stroke="#141414" strokeWidth="1.5" strokeOpacity="0.4" />
                        <circle cx={`${d[0]}%`} cy={`${d[1]}%`} r="1" fill="#141414" fillOpacity="0.8" />
                    </g>
                ))}
            </svg>

            {/* NODES CONTAINER - Mobile: Flex Col | Desktop: Absolute Graph */}
            <div className="relative z-10 w-full h-full flex flex-col md:block gap-4 py-8 md:py-0 overflow-y-auto md:overflow-visible hide-scroll">

                {/* 0. INGEST QUEUE (Proves Industry Agnosticism) */}
                <motion.div custom={0} initial="hidden" animate="visible" variants={nodeVariants}
                    className="relative md:absolute flex flex-col gap-2 md:left-[2%] md:top-[10%] md:w-[10%] md:h-[80%] w-full"
                >
                    <div className="text-[9px] font-mono tracking-widest text-[#141414]/40 uppercase mb-4 text-center md:text-left rotate-0 md:-rotate-90 md:absolute md:-left-8 md:top-1/2 md:-translate-y-1/2 md:transform-origin-center whitespace-nowrap">
                        Global Ingest Stream
                    </div>

                    <div className="flex flex-col gap-3 justify-center h-full pl-4 md:pl-8 border-l border-[#141414]/10">
                        {/* Fake incoming ads from different industries */}
                        <div className="flex items-center gap-2 opacity-30">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#141414]" />
                            <span className="text-[9px] font-mono truncate">AUTO_SUV_Campaign.mp4</span>
                        </div>
                        <div className="flex items-center gap-2 opacity-40">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#141414]" />
                            <span className="text-[9px] font-mono truncate">FMCG_Snack_Vertical.jpg</span>
                        </div>
                        <div className="flex items-center gap-2 opacity-60">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#141414]" />
                            <span className="text-[9px] font-mono truncate">B2B_SaaS_Hero.mp4</span>
                        </div>
                        <div className="flex items-center gap-2 opacity-100 bg-white/60 p-1.5 rounded border border-[#141414]/10 shadow-sm relative -ml-1.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                            <span className="text-[9px] font-mono font-bold truncate">LUX_FRAGRANCE.jpeg</span>
                        </div>
                        <div className="flex items-center gap-2 opacity-20">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#141414]" />
                            <span className="text-[9px] font-mono truncate">TECH_Launch_16x9.mov</span>
                        </div>
                    </div>
                </motion.div>

                {/* 1. INPUT ASSET */}
                <motion.div custom={1} initial="hidden" animate="visible" variants={nodeVariants}
                    className="relative md:absolute bg-white rounded-xl shadow-[0_15px_40px_rgba(20,20,20,0.1)] overflow-hidden border border-[#E7DED1] flex flex-col md:left-[14%] md:top-[20%] md:w-[18%] md:h-[60%] w-full min-h-[400px]"
                >
                    <div className="bg-[#141414] text-white text-[9px] font-bold tracking-[0.2em] px-3 py-2.5 uppercase flex justify-between items-center z-10 absolute top-0 left-0 right-0">
                        <span>Input Asset</span>
                        <span className="text-white/50 tracking-widest font-mono">RAW</span>
                    </div>
                    <img src={stageImage.src} alt="Main Ad" className="w-full h-full object-cover absolute inset-0" />
                </motion.div>

                {/* --- EVIDENCE CROPS --- */}

                {/* 2A. Eyes */}
                <motion.div custom={2} initial="hidden" animate="visible" variants={nodeVariants}
                    className="relative md:absolute bg-white rounded-xl shadow-md overflow-hidden border border-[#E7DED1] md:left-[38%] md:top-[12.5%] md:w-[16%] md:h-[15%] w-full min-h-[120px]"
                >
                    <div className="absolute font-mono text-[8px] bg-white/80 backdrop-blur px-1 py-0.5 bottom-1 right-1 text-[#141414]/50 rounded z-10">CROP_A</div>
                    <img src="/images/examples/eyes.jpg" alt="Eyes Crop" className="w-full h-full absolute inset-0 object-cover object-center" />
                </motion.div>

                {/* 2B. Mouth */}
                <motion.div custom={3} initial="hidden" animate="visible" variants={nodeVariants}
                    className="relative md:absolute bg-white rounded-xl shadow-md overflow-hidden border border-[#E7DED1] md:left-[38%] md:top-[37.5%] md:w-[16%] md:h-[15%] w-full min-h-[120px]"
                >
                    <div className="absolute font-mono text-[8px] bg-white/80 backdrop-blur px-1 py-0.5 bottom-1 right-1 text-[#141414]/50 rounded z-10">CROP_B</div>
                    <img src="/images/examples/mouth.jpg" alt="Mouth Crop" className="w-full h-full absolute inset-0 object-cover object-[center_30%]" />
                </motion.div>

                {/* 2C. Perfume */}
                <motion.div custom={4} initial="hidden" animate="visible" variants={nodeVariants}
                    className="relative md:absolute bg-white rounded-xl shadow-lg border border-[#E7DED1] p-1.5 md:left-[38%] md:top-[60%] md:w-[16%] md:h-[30%] w-full min-h-[250px]"
                >
                    <div className="absolute font-mono text-[8px] bg-white/80 backdrop-blur px-1 py-0.5 bottom-2 right-2 text-[#141414]/50 rounded z-10 shadow-sm">CROP_C</div>
                    <div className="w-full h-full rounded-lg overflow-hidden relative border border-[#E7DED1]/50 bg-[#F6F1E7]">
                        <img src="/images/examples/perfume.jpg" alt="Perfume Crop" className="absolute inset-0 w-full h-full object-cover object-center" />
                    </div>
                </motion.div>


                {/* --- INTELLIGENCE LOGIC --- */}

                {/* 3A. Palette */}
                <motion.div custom={5} initial="hidden" animate="visible" variants={nodeVariants}
                    className="relative md:absolute bg-white/95 backdrop-blur-md rounded-xl shadow-lg border border-[#E7DED1] p-4 flex flex-col justify-center md:left-[60%] md:top-[12.5%] md:w-[16%] md:h-[15%] w-full min-h-[120px]"
                >
                    <div className="text-[9px] font-bold tracking-[0.2em] text-[#141414]/50 uppercase mb-2">Palette Logic</div>
                    <div className="flex w-full h-4 rounded-md overflow-hidden mb-2 shadow-inner">
                        <div className="w-1/3 bg-[#2B2132]" />
                        <div className="w-1/4 bg-[#7D5A7B]" />
                        <div className="w-1/4 bg-[#AF8D9E]" />
                        <div className="w-1/6 bg-[#E6D4D3]" />
                    </div>
                    <p className="text-[9px] md:text-[10px] text-[#6B6B6B] leading-tight">Muted deep tones trigger luxury/mystery associations.</p>
                </motion.div>

                {/* 3B. Mechanic */}
                <motion.div custom={6} initial="hidden" animate="visible" variants={nodeVariants}
                    className="relative md:absolute bg-white/95 backdrop-blur-md rounded-xl shadow-lg border border-[#E7DED1] p-4 flex flex-col justify-center md:left-[60%] md:top-[37.5%] md:w-[16%] md:h-[15%] w-full min-h-[120px]"
                >
                    <div className="text-[9px] font-bold tracking-[0.2em] text-[#141414]/50 uppercase mb-2">Trigger Mechanic</div>
                    <p className="text-[10px] md:text-[11px] text-[#141414] leading-snug">
                        <strong>Status Signaling.</strong> Sensory openness combined with elevated eye contact establishes dominance.
                    </p>
                </motion.div>

                {/* 3C. Semiotics */}
                <motion.div custom={7} initial="hidden" animate="visible" variants={nodeVariants}
                    className="relative md:absolute bg-white/95 backdrop-blur-md rounded-xl shadow-lg border border-[#E7DED1] p-4 flex flex-col justify-center md:left-[60%] md:top-[60%] md:w-[16%] md:h-[30%] w-full min-h-[250px]"
                >
                    <div className="text-[9px] font-bold tracking-[0.2em] text-[#141414]/50 uppercase mb-2">Semiotics</div>
                    <p className="text-[10px] md:text-[11px] text-[#141414] leading-relaxed mb-4">
                        <strong>Materiality & Restraint.</strong>
                        <br /><br />
                        The refraction of light through the glass intersecting the Z-axis highlights product tangibility over subject identity.
                        <br /><br />
                        Absence of overt text implies undeniable legacy authority.
                    </p>
                </motion.div>


                {/* --- FINAL REPORT --- */}

                <motion.div custom={8} initial="hidden" animate="visible" variants={nodeVariants}
                    className="relative md:absolute bg-[#141414] text-white rounded-xl shadow-[0_20px_50px_rgba(20,20,20,0.3)] border border-[#333] p-5 md:p-6 flex flex-col justify-center md:left-[82%] md:top-[35%] md:w-[16%] md:h-[30%] w-full min-h-[200px]"
                >
                    <div className="flex items-center gap-2 mb-6">
                        <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse shadow-[0_0_8px_rgba(74,222,128,0.5)]" />
                        <span className="text-[8px] md:text-[9px] font-bold tracking-[0.2em] text-white/50 uppercase">Extracted</span>
                    </div>

                    <div className="space-y-5">
                        <div>
                            <div className="text-[7px] md:text-[8px] text-white/40 uppercase tracking-widest mb-1.5 font-mono">Confidence</div>
                            <div className="text-[20px] md:text-[24px] tracking-tight font-light text-white">94% <span className="text-sm text-green-400 opacity-80">(High)</span></div>
                        </div>

                        <div className="h-px w-full bg-[#333]" />

                        <div>
                            <div className="text-[7px] md:text-[8px] text-white/40 uppercase tracking-widest mb-1.5 font-mono">Primary Vector</div>
                            <div className="text-[12px] md:text-[13px] text-white/90 font-medium tracking-wide">Aesthetic Authority</div>
                        </div>
                    </div>
                </motion.div>

            </div>
        </div>
    );
}
