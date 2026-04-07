'use client';

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { SAMPLE_DOSSIER_HREF } from '@/lib/sample-dossier';

const SHOWCASE_ITEMS = [
    {
        id: 'technology',
        label: 'Feature Hierarchy',
        kicker: 'Signal Architecture',
        statement: 'See the hierarchy of features before a single spec explains it.',
        highlightWord: 'hierarchy',
        highlightColor: '#D4A574',
        detail: 'Consumer tech ads must balance innovation with accessibility. The strongest work leads with one dominant mechanic — visual, intuitive — and lets the product do the talking.',
        metrics: [
            { label: 'Signal', value: 'Feature Lead' },
            { label: 'Risk', value: 'Spec overload' }
        ],
        img: '/images/examples/Sony.jpg',
        alt: 'Sony campaign analyzing feature hierarchy'
    },
    {
        id: 'luxury',
        label: 'Scarcity Architecture',
        kicker: 'Exclusionary Positioning',
        statement: 'Trace how scarcity is built into the frame without stating a single limitation.',
        highlightWord: 'scarcity',
        highlightColor: '#D4A574',
        detail: 'Luxury timepieces sell through absence — what is withheld matters as much as what is shown. The dial, the light, the weight of the frame. Every element encodes exclusion.',
        metrics: [
            { label: 'Signal', value: 'Scarcity' },
            { label: 'Risk', value: 'Overt luxury signals' }
        ],
        img: '/images/examples/Watch.png',
        alt: 'Luxury watch campaign analyzing scarcity architecture'
    },
    {
        id: 'fashion',
        label: 'Texture Restraint',
        kicker: 'Signal Compression',
        statement: 'See where the image withholds, compresses, and stays expensive.',
        highlightWord: 'expensive',
        highlightColor: '#D4A574',
        detail: 'Restraint keeps the frame alive. Once every signal is obvious, the image loses its aftertaste. We map the exact compression of palette and texture.',
        metrics: [
            { label: 'Signal', value: 'Restraint' },
            { label: 'Risk', value: 'Visual exhaustion' }
        ],
        img: '/images/examples/ACNE.png',
        alt: 'ACNE Studios campaign analyzing texture'
    }
];

function ImageReveal({ src, alt }: { src: string, alt: string }) {
    const containerRef = useRef<HTMLDivElement>(null);
    const [mousePos, setMousePos] = useState({ x: -1000, y: -1000 });
    const springConfig = { damping: 25, stiffness: 150 };
    const mouseX = useSpring(mousePos.x, springConfig);
    const mouseY = useSpring(mousePos.y, springConfig);

    useEffect(() => {
        mouseX.set(mousePos.x);
        mouseY.set(mousePos.y);
    }, [mousePos, mouseX, mouseY]);

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!containerRef.current) return;
        const rect = containerRef.current.getBoundingClientRect();
        setMousePos({
            x: e.clientX - rect.left,
            y: e.clientY - rect.top
        });
    };

    const handleMouseLeave = () => {
        setMousePos({ x: -1000, y: -1000 });
    };

    return (
        <div 
            ref={containerRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className="group relative aspect-[0.75] w-full max-w-[640px] overflow-hidden rounded-[40px] border border-white/20 shadow-2xl transition-transform duration-700 hover:scale-[1.02] cursor-crosshair select-none"
        >
            {/* Obscured Base Layer (Blurry/Grayscale/Noisy) */}
            <div className="absolute inset-0 grayscale blur-xl opacity-20 scale-110 transition-all duration-700 group-hover:opacity-40">
                <Image 
                    src={src} 
                    alt={alt} 
                    fill 
                    className="object-cover pointer-events-none" 
                    draggable={false}
                />
            </div>

            {/* High-Fidelity Clarity Reveal Layer */}
            <motion.div 
                className="absolute inset-0 pointer-events-none"
                style={{
                    maskImage: `radial-gradient(circle 240px at var(--mouse-x) var(--mouse-y), black 100%, transparent 100%)`,
                    WebkitMaskImage: `radial-gradient(circle 240px at var(--mouse-x) var(--mouse-y), black 100%, transparent 100%)`,
                } as any}
            >
                <motion.div 
                    className="absolute inset-0"
                    style={{
                        '--mouse-x': useTransform(mouseX, x => `${x}px`),
                        '--mouse-y': useTransform(mouseY, y => `${y}px`),
                    } as any}
                >
                    <Image 
                        src={src} 
                        alt={alt} 
                        fill 
                        className="object-cover pointer-events-none" 
                        draggable={false}
                    />
                </motion.div>
            </motion.div>
            
            {/* Target HUD UI */}
            <motion.div 
                className="absolute pointer-events-none border border-white/30 rounded-full w-[480px] h-[480px] -translate-x-1/2 -translate-y-1/2 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{
                    left: mouseX,
                    top: mouseY,
                }}
            >
                <div className="w-10 h-10 border border-white/40 border-dashed rounded-full animate-[spin_8s_linear_infinite]" />
                <div className="absolute w-full h-px bg-white/10" />
                <div className="absolute h-full w-px bg-white/10" />
            </motion.div>

            {/* Status Badge */}
            <div className="absolute top-10 lg:top-14 left-10 lg:left-14 border border-white/20 bg-black/40 px-5 py-2.5 backdrop-blur-3xl rounded-full">
                <p className="text-[10px] font-black uppercase tracking-[0.3em] text-white">Neurolensing Active</p>
            </div>
        </div>
    );
}

function HighlightedStatement({ text, word, color }: { text: string, word: string, color: string }) {
    const parts = text.split(new RegExp(`(${word})`, 'gi'));
    return (
        <h3 className="text-[42px] lg:text-[64px] xl:text-[84px] font-black leading-[0.88] tracking-[-0.05em] mb-12 text-white uppercase">
            {parts.map((part, i) => 
                part.toLowerCase() === word.toLowerCase() ? (
                    <span key={i} style={{ color }}>{part}</span>
                ) : part
            )}
        </h3>
    );
}

export default function InteractiveReadStage() {
    return (
        <section className="bg-[#050505] text-white py-32 lg:py-64" data-presence-tone="dark">
            <div className="mx-auto max-w-[1600px] px-6 lg:px-12">
                
                {/* Massive Header */}
                <motion.div 
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                    className="mb-32 lg:mb-64 border-t border-white/10 pt-10"
                >
                    <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-10">
                        <h2 className="text-[12vw] lg:text-[7vw] font-black leading-[0.82] tracking-[-0.05em] uppercase text-white max-w-[12ch]">
                            Extract the <span className="text-[#00E5FF]">absolute</span> signals.
                        </h2>
                        <div className="max-w-[400px]">
                            <p className="text-[18px] leading-[1.6] text-[#A0A0A0] mb-8">
                                Filter the frame through specialized analytical modes: from posture authority down to texture restraint. Zero overlapping. Pure focused sight.
                            </p>
                            <a href={SAMPLE_DOSSIER_HREF} className="inline-flex items-center gap-3 border-b border-[#00E5FF] pb-1 text-[11px] font-black uppercase tracking-[0.2em] text-[#00E5FF] transition hover:text-white hover:border-white">
                                Open Sample Read
                                <ArrowUpRight size={16} />
                            </a>
                        </div>
                    </div>
                </motion.div>

                {/* Staggered Grid List */}
                <div className="flex flex-col gap-48 lg:gap-80">
                    {SHOWCASE_ITEMS.map((item, idx) => {
                        const isEven = idx % 2 === 0;

                        return (
                            <div key={item.id} className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-0 items-center">
                                
                                {/* Image Column - Slimmer to reduce blur and add presence */}
                                <motion.div 
                                    initial={{ opacity: 0, x: isEven ? -40 : 40 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true, margin: "-10%" }}
                                    transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                                    className={`relative flex ${isEven ? 'lg:col-span-6 lg:col-start-1 justify-start' : 'lg:col-span-6 lg:col-start-7 lg:row-start-1 justify-end'}`}
                                >
                                    <ImageReveal src={item.img} alt={item.alt} />
                                </motion.div>

                                {/* Text Column */}
                                <motion.div 
                                    initial={{ opacity: 0, y: 50 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true, margin: "-10%" }}
                                    transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                                    className={`${isEven ? 'lg:col-span-5 lg:col-start-8 xl:col-start-8' : 'lg:col-span-5 lg:col-start-1 lg:row-start-1'}`}
                                >
                                    <div className="flex items-center gap-5 mb-14">
                                        {/* Removed intense red line */}
                                        <div className="h-px w-10 bg-white/40" />
                                        <p className="text-[12px] font-black uppercase tracking-[0.5em] text-white">
                                            {item.kicker}
                                        </p>
                                    </div>

                                    <HighlightedStatement 
                                        text={item.statement} 
                                        word={item.highlightWord} 
                                        color={item.highlightColor} 
                                    />
                                    
                                    <p className="text-[18px] lg:text-[22px] leading-[1.65] text-[#A0A0A0] mb-20">
                                        {item.detail}
                                    </p>

                                    <div className="grid grid-cols-2 gap-12 border-t border-white/10 pt-10">
                                        {item.metrics.map(metric => (
                                            <div key={metric.label}>
                                                <p className="text-[10px] font-black uppercase tracking-[0.25em] text-white/40 mb-3">{metric.label}</p>
                                                <p className="text-[16px] font-bold text-white tracking-tight">{metric.value}</p>
                                            </div>
                                        ))}
                                    </div>
                                </motion.div>

                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
