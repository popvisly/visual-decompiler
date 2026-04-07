'use client';

import { motion } from 'framer-motion';
import ParticleField from '@/components/marketing/ParticleField';

export default function CinematicHero() {
    return (
        <section
            className="relative flex min-h-[100vh] flex-col justify-center overflow-hidden bg-[#F6F1E7] px-6 py-24 sm:px-8 lg:px-10"
            data-presence-tone="light"
        >
            {/* Background effects */}
            <div className="pointer-events-none absolute inset-0 z-0" aria-hidden="true">
                <div className="absolute inset-x-0 top-0 h-px bg-[#141414]/[0.04]" />
                <ParticleField />
                <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-[#F6F1E7] to-transparent" />
            </div>

            <div className="relative z-10 mx-auto flex w-full max-w-[1400px] flex-col items-center">
                <motion.div
                    initial={{ opacity: 0, scale: 0.96, y: 30 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                    className="flex w-full flex-col items-center text-center"
                >
                    <h1 className="text-[12vw] font-black leading-[0.82] tracking-[-0.05em] text-[#141414] xl:text-[160px]">
                        DECOMPILE THE
                        <br />
                        <span className="text-[#C1A674]">
                            VISUAL WORLD.
                        </span>
                    </h1>
                </motion.div>
            </div>
        </section>
    );
}
