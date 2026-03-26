'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';

const AD_STACK = [
    { src: '/images/examples/Miss_DIOR.jpg', label: 'Identity/Beauty', mechanic: 'Identity-Led' },
    { src: '/images/examples/balenciaga-high-summer-campaign-photosb.webp', label: 'High Fashion', mechanic: 'Avant-Garde' },
    { src: '/images/examples/Watch.png', label: 'Precision Watch', mechanic: 'Product Authority' },
    { src: '/images/examples/ACNE.png', label: 'Minimalist Fashion', mechanic: 'Contemporary' },
    { src: '/images/examples/Chanel_No5.webp', label: 'Heritage Luxury', mechanic: 'Archetypal' },
];

const SECTION_EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

export default function AdRolodexScanner() {
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % AD_STACK.length);
        }, 3500);
        return () => clearInterval(timer);
    }, []);

    const activeAd = AD_STACK[currentIndex];

    return (
        <div className="relative">
            <div className="relative aspect-[4/5] w-full rounded-[3rem] border border-[#E6DDCF] bg-[#F7F1E7]/30 p-3 shadow-[0_24px_50px_rgba(20,18,15,0.08)] sm:p-4">
                <div className="relative h-full w-full overflow-hidden rounded-[2.2rem] bg-[#151310]">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeAd.src}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            transition={{ 
                                duration: 0.6, 
                                ease: SECTION_EASE
                            }}
                            className="absolute inset-0"
                        >
                            <Image
                                src={activeAd.src}
                                alt={activeAd.label}
                                fill
                                unoptimized
                                className="object-cover opacity-60 grayscale-[0.3] transition-all duration-700"
                            />
                            
                            {/* Scanner Overlay Elements */}
                            <div className="absolute inset-0 z-20 pointer-events-none">
                                <div className="absolute inset-0 border-[0.5px] border-[#D4A574]/30" />
                                <motion.div 
                                    animate={{ top: ['0%', '100%', '0%'] }}
                                    transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                                    className="absolute left-0 right-0 h-px bg-[#D4A574] shadow-[0_0_15px_rgba(212,165,116,0.6)]"
                                />
                                
                                {/* Live Labels */}
                                <div className="absolute top-8 left-8">
                                    <div className="flex items-center gap-2">
                                        <div className="h-1.5 w-1.5 rounded-full bg-[#D4A574] animate-pulse" />
                                        <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#D4A574]">Extracting: {activeAd.label}</span>
                                    </div>
                                </div>
                                
                                <motion.div 
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 1 }}
                                    className="absolute bottom-12 right-12 text-right bg-[#151310]/80 backdrop-blur-md border border-[#D4A574]/20 p-2.5 rounded-lg sm:p-3"
                                >
                                    <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#D4A574] mb-1">{activeAd.mechanic}</p>
                                    <p className="text-[9px] uppercase tracking-[0.1em] text-[#E7DDCF]">Diagnostic Accuracy 98.4%</p>
                                </motion.div>
                                
                                {/* Scanning Crosshairs */}
                                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-32 w-32 border-[0.5px] border-[#D4A574]/30 rounded-full sm:h-44 sm:w-44">
                                    <div className="absolute top-[-4px] left-1/2 -translate-x-1/2 h-2 w-px bg-[#D4A574]" />
                                    <div className="absolute bottom-[-4px] left-1/2 -translate-x-1/2 h-2 w-px bg-[#D4A574]" />
                                    <div className="absolute left-[-4px] top-1/2 -translate-y-1/2 w-2 h-px bg-[#D4A574]" />
                                    <div className="absolute right-[-4px] top-1/2 -translate-y-1/2 w-2 h-px bg-[#D4A574]" />
                                </div>
                            </div>
                        </motion.div>
                    </AnimatePresence>
                </div>
                
                {/* Outer "Clinical" Annotations */}
                <div className="absolute -left-4 top-1/4 rounded-lg border border-[#D4A574]/20 bg-white/95 backdrop-blur px-2.5 py-1.5 shadow-xl sm:-left-6 sm:px-3 sm:py-2">
                    <p className="text-[9px] font-bold uppercase tracking-[0.15em] text-[#D4A574]">Sovereign Extract v2.0</p>
                </div>
                <div className="absolute -right-4 bottom-1/4 rounded-lg border border-[#D4A574]/20 bg-white/95 backdrop-blur px-2.5 py-1.5 shadow-xl sm:-right-6 sm:px-3 sm:py-2">
                    <p className="text-[9px] font-bold uppercase tracking-[0.15em] text-[#D4A574]">Neural Map Engaged</p>
                </div>
            </div>
        </div>
    );
}
