'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { LinkCta, StageImage } from '@/types/homepage';
import NeuralParticleHero from '@/components/marketing/NeuralParticleHero';

type Props = {
    headline: string[];
    subhead: string;
    ctaPrimary: LinkCta;
    ctaSecondary: LinkCta;
    stageImage: StageImage;
};

export default function Hero({ headline, subhead, ctaPrimary, ctaSecondary, stageImage }: Props) {
    const { scrollY } = useScroll();
    const tileY = useTransform(scrollY, [0, 500], [0, 60]);

    return (
        <section className="relative bg-[#F6F1E7] text-[#141414] min-h-[78vh] md:min-h-[82vh] flex flex-col justify-center pt-24 md:pt-28 pb-12 md:pb-16 overflow-hidden">

            {/* Bone Grid Background */}
            <div className="pointer-events-none absolute inset-0 opacity-[0.55] [background-image:linear-gradient(rgba(20,20,20,0.028)_1px,transparent_1px),linear-gradient(90deg,rgba(20,20,20,0.028)_1px,transparent_1px)] [background-size:48px_48px]" />
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_40%_at_50%_0%,rgba(255,255,255,0.65)_0%,rgba(255,255,255,0)_60%)]" />

            <div className="relative z-10 max-w-7xl mx-auto px-6 w-full flex flex-col items-center text-center">

                {/* Headline */}
                <motion.h1
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="text-4xl md:text-7xl font-semibold leading-[0.9] tracking-tighter uppercase text-[#141414] mb-6"
                >
                    {headline[0]}<br />
                    <span className="text-[#C1A67B]">{headline[1]}</span>
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
                    className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-5 w-full"
                >
                    <a
                        href={ctaPrimary.href}
                        className="
                            inline-flex items-center justify-center w-full sm:w-auto
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
                        {ctaPrimary.label}
                    </a>
                    <a
                        href={ctaSecondary.href}
                        className="
                            inline-flex items-center justify-center w-full sm:w-auto
                            rounded-full border border-[#141414]
                            bg-[#141414] text-[#FBF7EF]
                            px-8 py-3.5 text-[14px] font-medium tracking-tight
                            transition-all duration-300
                            hover:-translate-y-[1px]
                            hover:bg-black
                            hover:shadow-[0_12px_24px_rgba(20,20,20,0.3)]
                        "
                    >
                        {ctaSecondary.label}
                    </a>
                </motion.div>

                {/* Neural Intelligence Hero */}
                <div className="w-full">
                    <NeuralParticleHero />
                </div>

            </div>
        </section>
    );
}
