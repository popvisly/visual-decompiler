'use client';

import { motion } from 'framer-motion';
import { LinkCta } from '@/types/homepage';
import NeuralParticleHero from '@/components/marketing/NeuralParticleHero';

type Props = {
    headline: string;
    headlineHighlight?: string;
    subhead: string;
    ctaPrimary?: LinkCta;
    ctaSecondary?: LinkCta;
    microproof?: string;
};

export default function Hero({ headline, headlineHighlight, subhead, ctaPrimary, ctaSecondary, microproof }: Props) {
    return (
        <section className="relative flex min-h-[70vh] flex-col justify-center overflow-hidden bg-[#FBFBF6] pb-8 pt-32 text-[#141414] md:min-h-[76vh] md:pb-10 md:pt-40">

            {/* Bone Grid Background */}
            <div className="pointer-events-none absolute inset-0 opacity-[0.55] [background-image:linear-gradient(rgba(20,20,20,0.028)_1px,transparent_1px),linear-gradient(90deg,rgba(20,20,20,0.028)_1px,transparent_1px)] [background-size:48px_48px]" />
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_40%_at_50%_0%,rgba(255,255,255,0.65)_0%,rgba(255,255,255,0)_60%)]" />

            <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-col items-center px-6 text-center">
                <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, ease: 'easeOut' }}
                    className="mb-5 text-[10px] font-bold uppercase tracking-[0.34em] text-[#C1A67B]"
                >
                    Forensic Ad Intelligence
                </motion.p>

                {/* Headline */}
                <motion.h1
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: 'easeOut' }}
                    className="mb-6 text-4xl font-semibold uppercase leading-[0.92] tracking-tighter text-[#141414] md:text-7xl"
                >
                    {headlineHighlight ? (
                        <>
                            {headline}<br />
                            <span className="text-[#C1A67B]">{headlineHighlight}</span>
                        </>
                    ) : (
                        headline
                    )}
                </motion.h1>

                {/* Subhead */}
                <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: 'easeOut', delay: 0.1 }}
                    className="mb-8 max-w-3xl text-[18px] leading-[1.45] tracking-[-0.01em] text-[#141414]/74 md:text-[21px]"
                >
                    {subhead}
                </motion.p>

                {/* CTAs */}
                {(ctaPrimary || ctaSecondary) && (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: 'easeOut', delay: 0.2 }}
                        className="mb-2 flex w-full flex-col items-center justify-center gap-4 sm:flex-row"
                    >
                        {ctaPrimary && (
                            <a
                                href={ctaPrimary.href}
                                className="
                                    inline-flex w-full items-center justify-center
                                    rounded-full bg-[#141414] px-8 py-4
                                    text-[12px] font-bold uppercase tracking-[0.2em] text-[#FBF7EF]
                                    transition-all duration-300 hover:-translate-y-[1px]
                                    hover:bg-[#000000] hover:shadow-[0_16px_30px_rgba(20,20,20,0.2)]
                                    sm:w-auto
                                "
                            >
                                {ctaPrimary.label}
                            </a>
                        )}
                        {ctaSecondary && (
                            <a
                                href={ctaSecondary.href}
                                className="
                                    inline-flex w-full items-center justify-center
                                    border-b border-[#D5CCBD] px-2 pb-1
                                    text-[11px] font-bold uppercase tracking-[0.24em] text-[#756E63]
                                    transition-all duration-300 hover:border-[#141414]
                                    hover:text-[#141414] sm:w-auto
                                "
                            >
                                {ctaSecondary.label}
                            </a>
                        )}
                    </motion.div>
                )}

                {microproof && (
                    <motion.p
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: 'easeOut', delay: 0.3 }}
                        className="mb-2 text-[10px] font-bold uppercase tracking-[0.26em] text-[#8A7B64]"
                    >
                        {microproof}
                    </motion.p>
                )}

                {/* Neural Intelligence Hero */}
                <div className="w-full mt-1">
                    <NeuralParticleHero />
                </div>

            </div>
        </section>
    );
}
