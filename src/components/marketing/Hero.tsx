'use client';

import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { LinkCta } from '@/types/homepage';
import HeroAppPreview from '@/components/marketing/HeroAppPreview';
import {
    HOMEPAGE_CTA_ICON,
    HOMEPAGE_PRIMARY_CTA,
    HOMEPAGE_SECONDARY_CTA,
} from '@/components/marketing/ctaStyles';

type Props = {
    eyebrow?: string;
    headline: string;
    subhead: string;
    ctaPrimary?: LinkCta;
    ctaSecondary?: LinkCta;
    microproof?: string;
};

export default function Hero({
    eyebrow = 'For creative strategists',
    headline,
    subhead,
    ctaPrimary,
    ctaSecondary,
    microproof,
}: Props) {
    return (
        <section className="relative z-20 -mt-12 overflow-hidden rounded-t-[40px] border-t border-black/5 bg-[#FBFBF6] pb-10 pt-24 text-[#141414] shadow-[0_-24px_50px_rgba(0,0,0,0.5)] md:-mt-20 md:rounded-t-[60px] md:pb-14 md:pt-32 lg:-mt-24 lg:rounded-t-[80px] lg:pb-28 lg:pt-32">
            <div className="pointer-events-none absolute inset-0 opacity-[0.55] [background-image:linear-gradient(rgba(20,20,20,0.028)_1px,transparent_1px),linear-gradient(90deg,rgba(20,20,20,0.028)_1px,transparent_1px)] [background-size:48px_48px]" />
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_40%_at_50%_0%,rgba(255,255,255,0.65)_0%,rgba(255,255,255,0)_60%)]" />

            <div className="relative z-10 mx-auto max-w-[1280px] px-6">
                <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-12 xl:grid-cols-[minmax(0,0.96fr)_minmax(0,1.04fr)] xl:gap-16">
                    <div className="order-1 flex flex-col pt-8 text-center lg:pt-12 lg:text-left">
                        <motion.p
                            initial={{ opacity: 0, y: 8 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.65, ease: 'easeOut' }}
                            className="flex items-center justify-center gap-3 text-[10px] font-bold uppercase tracking-[0.34em] text-[#B8A47E] lg:justify-start"
                        >
                            <span aria-hidden="true" className="h-px w-6 bg-[#B8A47E]" />
                            {eyebrow}
                        </motion.p>

                        <motion.h2
                            initial={{ opacity: 0, y: 12 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.75, ease: 'easeOut', delay: 0.05 }}
                            className="mt-5 max-w-[11ch] text-[34px] font-semibold leading-[0.96] tracking-[-0.03em] text-[#141414] sm:max-w-none sm:text-[42px] md:text-[52px] lg:text-[60px]"
                        >
                            {headline}
                        </motion.h2>

                        <motion.p
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.75, ease: 'easeOut', delay: 0.12 }}
                            className="mx-auto mt-5 max-w-[32rem] text-[16px] font-normal leading-[1.66] tracking-[-0.01em] text-[#141414]/72 md:text-[18px] lg:mx-0 lg:max-w-[31rem] lg:text-[19px]"
                        >
                            {subhead}
                        </motion.p>

                        {(ctaPrimary || ctaSecondary) && (
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.75, ease: 'easeOut', delay: 0.18 }}
                                className="mt-8 flex w-full flex-col items-center gap-3 md:flex-row md:justify-center lg:justify-start lg:items-start"
                            >
                                {ctaPrimary && (
                                    <a href={ctaPrimary.href} className={`${HOMEPAGE_PRIMARY_CTA} w-full whitespace-nowrap md:w-auto`}>
                                        <span>{ctaPrimary.label}</span>
                                        <ArrowUpRight aria-hidden="true" className={HOMEPAGE_CTA_ICON} />
                                    </a>
                                )}
                                {ctaSecondary && (
                                    <a href={ctaSecondary.href} className={`${HOMEPAGE_SECONDARY_CTA} w-full whitespace-nowrap md:w-auto`}>
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
                                transition={{ duration: 0.75, ease: 'easeOut', delay: 0.24 }}
                                className="mt-5 text-[9px] font-bold uppercase tracking-[0.22em] text-[#141414]/40 sm:text-[10px] sm:tracking-[0.24em] lg:text-left"
                            >
                                {microproof}
                            </motion.p>
                        )}
                    </div>

                    <motion.div
                        initial={{ opacity: 0, y: 18 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.85, ease: 'easeOut', delay: 0.12 }}
                        className="order-2 self-center transition-transform duration-500 ease-out lg:pl-2 lg:[transform:perspective(1200px)_rotateY(-2deg)] lg:hover:[transform:perspective(1200px)_rotateY(0deg)]"
                    >
                        <HeroAppPreview />
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
