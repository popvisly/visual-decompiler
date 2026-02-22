'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { LinkCta, StageImage } from '@/types/homepage';

type Props = {
    headline: string[];
    subhead: string;
    ctaPrimary: LinkCta;
    ctaSecondary: LinkCta;
    stageImage: StageImage;
};

export default function Hero({ headline, subhead, ctaPrimary, ctaSecondary, stageImage }: Props) {
    const { scrollY } = useScroll();
    // Subtle parallax for the main tile
    const tileY = useTransform(scrollY, [0, 500], [0, 60]);

    return (
        <section className="relative bg-[#F6F1E7] text-[#141414] min-h-[78vh] md:min-h-[82vh] flex flex-col justify-center pt-24 md:pt-28 pb-20 md:pb-24 overflow-hidden">

            {/* Bone Grid Background */}
            <div className="pointer-events-none absolute inset-0 opacity-[0.55] [background-image:linear-gradient(rgba(20,20,20,0.028)_1px,transparent_1px),linear-gradient(90deg,rgba(20,20,20,0.028)_1px,transparent_1px)] [background-size:48px_48px]" />
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_40%_at_50%_0%,rgba(255,255,255,0.65)_0%,rgba(255,255,255,0)_60%)]" />

            <div className="relative z-10 max-w-7xl mx-auto px-6 w-full flex flex-col items-center text-center">

                {/* Headline (Upward Fade) */}
                <motion.h1
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="text-5xl md:text-7xl xl:text-[84px] font-semibold leading-[1.02] tracking-[-0.03em] mb-5"
                >
                    {headline[0]}<br />
                    <span className="text-[#6B6B6B]">{headline[1]}</span>
                </motion.h1>

                {/* Subhead */}
                <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut", delay: 0.1 }}
                    className="text-[18px] md:text-[21px] text-[#141414]/75 max-w-2xl leading-[1.4] mb-9 tracking-[-0.01em]"
                >
                    {subhead}
                </motion.p>

                {/* CTAs */}
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
                    className="flex flex-col sm:flex-row items-center gap-6 mb-5"
                >
                    <a
                        href={ctaPrimary.href}
                        className="
                            inline-flex items-center justify-center
                            rounded-full border border-[#E7DED1]
                            bg-[#FBF7EF] backdrop-blur
                            px-8 py-3.5
                            text-[14px] font-medium tracking-[-0.01em] text-[#141414]
                            shadow-[0_10px_30px_rgba(20,20,20,0.07)]
                            transition-all duration-300
                            hover:-translate-y-[1px]
                            hover:border-[#D8CCBC]
                            hover:shadow-[0_16px_40px_rgba(20,20,20,0.10)]
                        "
                    >
                        {ctaPrimary.label} &rarr;
                    </a>
                    <a
                        href={ctaSecondary.href}
                        className="text-[13px] font-medium text-[#6B6B6B] hover:text-[#141414] transition-colors uppercase tracking-[0.1em]"
                    >
                        {ctaSecondary.label}
                    </a>
                </motion.div>

                {/* Proof line (print-ad style) */}
                <div className="text-[10px] md:text-[11px] font-semibold uppercase tracking-[0.22em] text-[#141414]/45 mb-10">
                    Image • Video • YouTube&nbsp;&nbsp;·&nbsp;&nbsp;PDF export&nbsp;&nbsp;·&nbsp;&nbsp;Share-ready reports
                </div>

                {/* Hero collage plate (print-layout) */}
                <motion.div
                    style={{ y: tileY }}
                    className="relative w-full max-w-6xl rounded-[28px] overflow-hidden border border-[#E7DED1] shadow-[0_30px_90px_rgba(20,20,20,0.10)] bg-[#FBF7EF]"
                >
                    <img
                        src={stageImage.src}
                        alt={stageImage.alt}
                        className="w-full h-auto object-cover"
                    />

                    {/* Editorial label (very subtle) */}
                    <div className="pointer-events-none absolute left-5 top-5 md:left-7 md:top-7">
                        <div className="inline-flex items-center gap-2 rounded-full border border-[#E7DED1] bg-[#FBF7EF]/70 backdrop-blur px-3 py-2 shadow-[0_10px_30px_rgba(20,20,20,0.06)]">
                            <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#141414]/55">
                                Decompiled layers
                            </span>
                            <span className="text-[#141414]/25">•</span>
                            <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#141414]/45">
                                7 extracted cues
                            </span>
                        </div>
                    </div>
                </motion.div>

                {/* Caption line under plate */}
                <div className="mt-6 text-[11px] md:text-[12px] text-[#141414]/55 tracking-[-0.01em]">
                    We deconstruct the ad into observable persuasion cues.
                </div>

                {/* Section divider (keeps the fine line anchored to the hero, so it doesn’t drift with content) */}
                <div className="mt-14 w-full max-w-6xl h-px bg-[#141414]/10" />

            </div>


        </section>
    );
}
