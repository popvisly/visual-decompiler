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
        <section className="relative bg-[#F6F1E7] text-[#141414] min-h-screen flex flex-col justify-center pt-36 pb-24 overflow-hidden">
            {/* Bone Grid Background */}
            <div className="pointer-events-none absolute inset-0 opacity-[0.55] [background-image:linear-gradient(rgba(20,20,20,0.028)_1px,transparent_1px),linear-gradient(90deg,rgba(20,20,20,0.028)_1px,transparent_1px)] [background-size:48px_48px]" />
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_40%_at_50%_0%,rgba(255,255,255,0.65)_0%,rgba(255,255,255,0)_60%)]" />

            <div className="relative z-10 max-w-7xl mx-auto px-6 w-full flex flex-col items-center text-center">

                {/* Headline (Upward Fade) */}
                <motion.h1
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="text-5xl md:text-7xl xl:text-[84px] font-semibold leading-[1.05] tracking-[-0.03em] mb-6"
                >
                    {headline[0]}<br />
                    <span className="text-[#6B6B6B]">{headline[1]}</span>
                </motion.h1>

                {/* Subhead */}
                <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut", delay: 0.1 }}
                    className="text-[19px] md:text-[22px] text-[#141414]/75 max-w-2xl leading-[1.4] mb-12 tracking-[-0.01em]"
                >
                    {subhead}
                </motion.p>

                {/* CTAs */}
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
                    className="flex flex-col sm:flex-row items-center gap-6 mb-20"
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

                {/* Stage Tile with Parallax */}
                <motion.div
                    style={{ y: tileY }}
                    className="relative w-[280px] md:w-[360px] aspect-[4/5] rounded-[24px] overflow-hidden border border-[#E7DED1] shadow-[0_30px_90px_rgba(20,20,20,0.1)] bg-[#FBF7EF]"
                >
                    <img src={stageImage.src} alt={stageImage.alt} className="w-full h-full object-cover" />
                </motion.div>

            </div>

            {/* Minimal Scroll Cue */}
            <motion.div
                style={{ opacity: useTransform(scrollY, [0, 400], [1, 0]) }}
                className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 pointer-events-none"
            >
                <div className="text-[#141414]/40 text-[9px] font-bold uppercase tracking-[0.2em]">Scroll</div>
                <div className="w-[1px] h-12 bg-gradient-to-b from-[#141414]/20 to-transparent" />
            </motion.div>

        </section>
    );
}
