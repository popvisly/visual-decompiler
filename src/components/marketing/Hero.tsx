'use client';

import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { useEffect, useState } from 'react';
import { LinkCta } from '@/types/homepage';
import HeroVisualComposer from '@/components/marketing/HeroVisualComposer';
import { HERO_VISUAL_FEATURED, HERO_VISUAL_SUPPORTING } from '@/components/marketing/heroVisualData';
import {
    HOMEPAGE_CTA_ICON,
    HOMEPAGE_PRIMARY_CTA,
    HOMEPAGE_SECONDARY_CTA,
} from '@/components/marketing/ctaStyles';

type Props = {
    eyebrow?: string;
    rotatingEyebrows?: string[];
    headline: string;
    headlineLineTwo?: string;
    headlineHighlight?: string;
    subhead: string;
    ctaPrimary?: LinkCta;
    ctaSecondary?: LinkCta;
    microproof?: string;
};

export default function Hero({
    eyebrow = 'Intelligence Platform',
    rotatingEyebrows,
    headline,
    headlineLineTwo,
    headlineHighlight,
    subhead,
    ctaPrimary,
    ctaSecondary,
    microproof,
}: Props) {
    const [eyebrowIndex, setEyebrowIndex] = useState(0);
    const [shouldRotate, setShouldRotate] = useState(false);

    useEffect(() => {
        if (!rotatingEyebrows || rotatingEyebrows.length <= 1) return;

        const media = window.matchMedia('(min-width: 768px)');

        const syncRotation = () => {
            setShouldRotate(media.matches);
            setEyebrowIndex(0);
        };

        syncRotation();
        media.addEventListener('change', syncRotation);

        return () => {
            media.removeEventListener('change', syncRotation);
        };
    }, [rotatingEyebrows]);

    useEffect(() => {
        if (!rotatingEyebrows || rotatingEyebrows.length <= 1 || !shouldRotate) return;

        const intervalId = window.setInterval(() => {
            setEyebrowIndex((current) => (current + 1) % rotatingEyebrows.length);
        }, 3500);

        return () => {
            window.clearInterval(intervalId);
        };
    }, [rotatingEyebrows, shouldRotate]);

    const activeEyebrow =
        rotatingEyebrows && rotatingEyebrows.length > 0
            ? shouldRotate
                ? rotatingEyebrows[eyebrowIndex]
                : rotatingEyebrows[0]
            : eyebrow;

    return (
        <section className="relative flex min-h-[72vh] flex-col justify-center overflow-hidden bg-[#FBFBF6] pb-6 pt-28 text-[#141414] md:min-h-[74vh] md:pb-10 md:pt-36 lg:min-h-[76vh] lg:pt-40">

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
                    {activeEyebrow}
                </motion.p>

                {/* Headline */}
                <motion.h1
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: 'easeOut' }}
                    className="mb-5 max-w-5xl text-[34px] font-semibold leading-[0.96] tracking-[-0.03em] text-[#141414] sm:text-4xl md:mb-6 md:text-7xl"
                >
                    {headlineHighlight ? (
                        <>
                            {headline}<br />
                            {headlineLineTwo && (
                                <>
                                    {headlineLineTwo}<br />
                                </>
                            )}
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
                    className="mb-8 max-w-[46rem] text-[16px] font-normal leading-[1.66] tracking-[-0.01em] text-[#141414]/64 sm:text-[17px] md:mb-10 md:text-[20px] md:leading-[1.72]"
                >
                    {subhead}
                </motion.p>

                {/* CTAs */}
                {(ctaPrimary || ctaSecondary) && (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: 'easeOut', delay: 0.2 }}
                        className="mb-2 flex w-full flex-col items-center justify-center gap-3 md:flex-row md:gap-4"
                    >
                        {ctaPrimary && (
                            <a
                                href={ctaPrimary.href}
                                className={`${HOMEPAGE_PRIMARY_CTA} w-full`}
                            >
                                <span>{ctaPrimary.label}</span>
                                <ArrowUpRight aria-hidden="true" className={HOMEPAGE_CTA_ICON} />
                            </a>
                        )}
                        {ctaSecondary && (
                            <a
                                href={ctaSecondary.href}
                                className={`${HOMEPAGE_SECONDARY_CTA} w-full`}
                            >
                                <span>{ctaSecondary.label}</span>
                                <ArrowUpRight aria-hidden="true" className={HOMEPAGE_CTA_ICON} />
                            </a>
                        )}
                    </motion.div>
                )}

                {microproof && (
                    <motion.p
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: 'easeOut', delay: 0.3 }}
                        className="mb-1 text-[9px] font-bold uppercase tracking-[0.23em] text-[#8A7B64] sm:text-[10px] sm:tracking-[0.26em]"
                    >
                        {microproof}
                    </motion.p>
                )}

                <div className="w-full mt-1">
                    <HeroVisualComposer
                        featured={HERO_VISUAL_FEATURED}
                        supporting={HERO_VISUAL_SUPPORTING}
                    />
                </div>


            </div>
        </section>
    );
}
