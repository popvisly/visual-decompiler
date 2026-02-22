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
    const tileY = useTransform(scrollY, [0, 800], [0, 120]);
    const opacity = useTransform(scrollY, [0, 400], [1, 0]);

    return (
        <section className="relative bg-[#F6F1E7] text-[#141414] min-h-[120vh] flex flex-col items-center justify-start pt-48 pb-32 overflow-hidden">
            {/* Bone Grid Background */}
            <div className="pointer-events-none absolute inset-0 opacity-[0.55] [background-image:linear-gradient(rgba(20,20,20,0.028)_1px,transparent_1px),linear-gradient(90deg,rgba(20,20,20,0.028)_1px,transparent_1px)] [background-size:48px_48px]" />
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_40%_at_50%_0%,rgba(255,255,255,0.65)_0%,rgba(255,255,255,0)_60%)]" />

            <div className="relative z-10 w-full px-4 md:px-12 flex flex-col items-center">

                {/* MASSIVE HEADLINE (The 12vw Statement) */}
                <div className="w-full max-w-[1700px] mb-12 flex flex-col items-center text-center">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.98, filter: "blur(10px)" }}
                        animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
                        className="flex flex-col"
                    >
                        <h1 className="text-massive tracking- luxury leading-tightest text-center select-none uppercase">
                            {headline[0]}<br />
                            <span className="text-[#6B6B6B]/40 block md:inline">{headline[1]}</span>
                        </h1>
                    </motion.div>
                </div>

                <div className="max-w-4xl mx-auto flex flex-col items-center text-center">
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.4 }}
                        className="text-[18px] md:text-[24px] text-[#141414]/70 max-w-2xl leading-[1.3] mb-16 tracking-tight font-medium"
                    >
                        {subhead}
                    </motion.p>

                    {/* Styled CTAs */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.6 }}
                        className="flex flex-col sm:flex-row items-center gap-10 mb-32"
                    >
                        <a
                            href={ctaPrimary.href}
                            className="
                                inline-flex items-center justify-center
                                rounded-full border border-[#141414]
                                bg-[#141414]
                                px-10 py-4
                                text-[14px] font-semibold tracking-[-0.01em] text-[#FBF7EF]
                                shadow-[0_20px_40px_rgba(20,20,20,0.15)]
                                transition-all duration-500
                                hover:-translate-y-1
                                hover:shadow-[0_28px_56px_rgba(20,20,20,0.22)]
                                active:scale-95
                            "
                        >
                            {ctaPrimary.label}
                        </a>
                        <a
                            href={ctaSecondary.href}
                            className="text-[12px] font-bold text-[#141414]/50 hover:text-[#141414] transition-all uppercase tracking-[0.25em] border-b border-transparent hover:border-[#141414]/20 pb-1"
                        >
                            {ctaSecondary.label}
                        </a>
                    </motion.div>
                </div>

                {/* Massive Hero Image Stage */}
                <motion.div
                    style={{ y: tileY, opacity }}
                    className="relative w-full max-w-5xl aspect-[16/10] sm:aspect-[16/8] rounded-[32px] overflow-hidden border border-[#E7DED1] shadow-[0_40px_120px_rgba(20,20,20,0.12)] bg-[#FBF7EF] group"
                >
                    <img src={stageImage.src} alt={stageImage.alt} className="w-full h-full object-cover transition-transform duration-[2s] group-hover:scale-105" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#F6F1E7]/20 to-transparent pointer-events-none" />
                </motion.div>

            </div>

            {/* Minimal Scroll Cue */}
            <motion.div
                style={{ opacity: useTransform(scrollY, [0, 400], [0.4, 0]) }}
                className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-6 pointer-events-none"
            >
                <div className="text-[#141414] text-[10px] font-bold uppercase tracking-[0.3em]">Discovery</div>
                <div className="w-[1px] h-20 bg-gradient-to-b from-[#141414] to-transparent" />
            </motion.div>

        </section>
    );
}
