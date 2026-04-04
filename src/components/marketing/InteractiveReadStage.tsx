'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { SAMPLE_DOSSIER_HREF } from '@/lib/sample-dossier';

const SHOWCASE_ITEMS = [
    {
        id: 'posture',
        label: 'Held Posture',
        kicker: 'Authority Read',
        statement: 'Read how the frame holds authority before a single word explains it.',
        detail: 'Status-coded restraint creates desire without tipping into explanation. The strongest luxury work arrives already decided. The posture is what makes the room trust the image.',
        metrics: [
            { label: 'Signal', value: 'Authority' },
            { label: 'Risk', value: 'Over-explanation' }
        ],
        img: '/images/examples/Chanel_No5.webp',
        alt: 'Chanel No.5 campaign analyzing posture'
    },
    {
        id: 'arrival',
        label: 'Product Arrival',
        kicker: 'Moment of entry',
        statement: 'Trace the exact moment the product enters the read and earns its place.',
        detail: 'This is where strategy becomes visible. Too late and the work floats. Too early and it collapses into selling. The read evaluates narrative timing and inevitability.',
        metrics: [
            { label: 'Signal', value: 'Arrival Timing' },
            { label: 'Risk', value: 'Selling too early' }
        ],
        img: '/images/examples/valentino-voce-viva.png',
        alt: 'Valentino Voce Viva campaign analyzing product arrival'
    },
    {
        id: 'restraint',
        label: 'Texture Restraint',
        kicker: 'Signal compression',
        statement: 'See where the image withholds, compresses, and stays expensive.',
        detail: 'Restraint keeps the frame alive. Once every signal is obvious, the image loses its aftertaste. We map the exact compression of palette and texture.',
        metrics: [
            { label: 'Signal', value: 'Restraint' },
            { label: 'Risk', value: 'Visual exhaustion' }
        ],
        img: '/images/examples/ACNE.png',
        alt: 'ACNE Studios campaign analyzing texture'
    }
];

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
                        <h2 className="text-[12vw] lg:text-[7vw] font-black leading-[0.88] tracking-[-0.05em] uppercase text-white max-w-[12ch]">
                            Extract the absolute signals.
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
                <div className="flex flex-col gap-32 lg:gap-64">
                    {SHOWCASE_ITEMS.map((item, idx) => {
                        const isEven = idx % 2 === 0;

                        return (
                            <div key={item.id} className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-0 items-center">
                                
                                {/* Image Column */}
                                <motion.div 
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    viewport={{ once: true, margin: "-20%" }}
                                    transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                                    className={`relative ${isEven ? 'lg:col-span-7 lg:col-start-1' : 'lg:col-span-7 lg:col-start-6 lg:row-start-1'}`}
                                >
                                    <div className="relative aspect-[0.75] w-full overflow-hidden bg-[#0A0A0A] border border-white/10">
                                        <Image 
                                            src={item.img} 
                                            alt={item.alt} 
                                            fill 
                                            className="object-cover mix-blend-luminosity hover:mix-blend-normal hover:scale-105 transition-all duration-[1.5s] ease-[cubic-bezier(0.16,1,0.3,1)]" 
                                        />
                                        
                                        {/* Minimal UI Badge */}
                                        <div className="absolute top-6 lg:top-10 left-6 lg:left-10 border border-[#00E5FF]/30 bg-black/80 px-4 py-2 backdrop-blur-md">
                                            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-[#00E5FF]">System Target</p>
                                        </div>
                                    </div>
                                </motion.div>

                                {/* Text Column */}
                                <motion.div 
                                    initial={{ opacity: 0, y: 50 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true, margin: "-20%" }}
                                    transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                                    className={`${isEven ? 'lg:col-span-4 lg:col-start-9' : 'lg:col-span-4 lg:col-start-1 lg:row-start-1'}`}
                                >
                                    <div className="flex items-center gap-4 mb-10">
                                        <div className="h-px w-10 bg-[#FF003C]" />
                                        <p className="text-[11px] font-black uppercase tracking-[0.4em] text-[#FF003C]">
                                            {item.kicker}
                                        </p>
                                    </div>

                                    <h3 className="text-[42px] lg:text-[64px] xl:text-[80px] font-black leading-[0.95] tracking-[-0.04em] mb-10 text-white">
                                        {item.statement}
                                    </h3>
                                    
                                    <p className="text-[18px] lg:text-[20px] leading-[1.65] text-[#A0A0A0] mb-16">
                                        {item.detail}
                                    </p>

                                    <div className="grid grid-cols-2 gap-8 border-t border-white/10 pt-8">
                                        {item.metrics.map(metric => (
                                            <div key={metric.label}>
                                                <p className="text-[9px] font-black uppercase tracking-[0.2em] text-white/40 mb-2">{metric.label}</p>
                                                <p className="text-[14px] font-bold text-white">{metric.value}</p>
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
