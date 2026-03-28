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
        }, 5600);
        return () => clearInterval(timer);
    }, []);

    const activeAd = AD_STACK[currentIndex];

    return (
        <div className="relative">
            <div className="relative aspect-[4/5] w-full rounded-[3rem] border border-[#FBFBF6] bg-[#F3EEE6] p-3 shadow-[0_24px_50px_rgba(20,18,15,0.08)] sm:p-4">
                <div className="relative h-full w-full overflow-hidden rounded-[2.2rem] bg-[#151310]">
                    <AnimatePresence mode="sync">
                        <motion.div
                            key={activeAd.src}
                            initial={{ opacity: 0, scale: 1.02 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.995 }}
                            transition={{
                                duration: 0.85,
                                ease: SECTION_EASE
                            }}
                            className="absolute inset-0"
                        >
                            <Image
                                src={activeAd.src}
                                alt={activeAd.label}
                                fill
                                unoptimized
                                className="object-cover"
                            />
                            
                            {/* Scanner Overlay Elements */}
                            <div className="absolute inset-0 z-20 pointer-events-none">
                                <div className="absolute inset-0 border-[0.5px] border-[#D4A574]/18" />
                                <div className="absolute inset-x-0 top-0 h-full opacity-[0.08] [background-image:linear-gradient(rgba(212,165,116,0.7)_1px,transparent_1px)] [background-size:100%_24px]" />
                                <motion.div 
                                    animate={{ top: ['0%', '100%', '0%'] }}
                                    transition={{ duration: 6.5, repeat: Infinity, ease: "linear" }}
                                    className="absolute left-0 right-0 h-px bg-[#D4A574]/80 shadow-[0_0_12px_rgba(212,165,116,0.35)]"
                                />
                                
                                {/* Live Labels */}
                                <div className="absolute top-8 left-8 rounded-md border border-white/10 bg-black/70 px-4 py-2 backdrop-blur-md">
                                    <div className="flex items-center gap-2">
                                        <div className="h-1.5 w-1.5 rounded-full bg-[#D4A574] animate-pulse" />
                                        <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#D4A574]">Extracting: {activeAd.label}</span>
                                    </div>
                                </div>
                                
                                <motion.div 
                                    initial={{ opacity: 0, y: 6 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.45, duration: 0.45, ease: SECTION_EASE }}
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
                
            </div>
        </div>
    );
}
