'use client';

import { motion } from 'framer-motion';
import ParticleField from '@/components/marketing/ParticleField';

export default function CinematicHero() {
    return (
        <section
            className="relative flex min-h-[100vh] flex-col justify-center overflow-hidden bg-[#050505] px-6 py-24 sm:px-8 lg:px-10"
            data-presence-tone="dark"
        >
            <div className="pointer-events-none absolute inset-0 z-0" aria-hidden="true">
                <div className="absolute inset-x-0 top-0 h-px bg-white/[0.04]" />
                <ParticleField />
                <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-[#050505] to-transparent" />
            </div>

            <div className="relative z-10 mx-auto flex w-full max-w-[1400px] flex-col items-center">
                <motion.div
                    initial={{ opacity: 0, scale: 0.96, y: 30 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                    className="flex w-full flex-col items-center text-center"
                >
                    <h1 className="text-[12vw] font-black leading-[0.82] tracking-[-0.05em] text-white xl:text-[160px]">
                        DECOMPILE THE
                        <br />
                        <span className="bg-gradient-to-r from-[#FF00E5] via-[#7B00FF] to-[#00E5FF] bg-clip-text text-transparent">
                            VISUAL WORLD.
                        </span>
                    </h1>
                </motion.div>
            </div>
        </section>
    );
}
