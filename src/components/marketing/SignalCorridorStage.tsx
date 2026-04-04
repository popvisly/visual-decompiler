'use client';

import Image from 'next/image';
import { motion, useScroll, useTransform, type MotionValue } from 'framer-motion';
import { useRef } from 'react';

const CORRIDOR_STRIPS = [
    {
        label: 'Posture',
        src: '/images/examples/Miss_DIOR.jpg',
        alt: 'Miss Dior campaign',
        direction: 'left' as const,
        caption: 'Authority held in the frame before the product speaks.',
    },
    {
        label: 'Arrival',
        src: '/images/examples/Chanel_No5.webp',
        alt: 'Chanel No.5 campaign',
        direction: 'right' as const,
        caption: 'The product enters late enough to stay expensive and early enough to still matter.',
    },
    {
        label: 'Restraint',
        src: '/images/examples/ACNE.png',
        alt: 'ACNE Studios campaign',
        direction: 'left' as const,
        caption: 'Compression, silence, and texture doing more than obvious persuasion ever could.',
    },
] as const;

function CorridorRoute() {
    return (
        <svg viewBox="0 0 560 120" className="h-full w-full" aria-hidden="true">
            <g fill="none" stroke="currentColor" strokeWidth="2.75" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 92 H122 L184 38 L256 78 L334 24 L426 62 H542" opacity="0.22" />
                <path d="M18 92 H122 L184 38 L256 78 L334 24 L426 62 H542" />
            </g>
            <circle cx="18" cy="92" r="4" fill="#4E9A67" />
            <circle cx="542" cy="62" r="4" fill="#4C72E0" />
        </svg>
    );
}

function ImageStrip({
    label,
    src,
    alt,
    caption,
    x,
}: {
    label: string;
    src: string;
    alt: string;
    caption: string;
    x: MotionValue<string>;
}) {
    return (
        <motion.article
            style={{ x }}
            className="relative min-w-[860px] max-w-[860px] border border-white/10 bg-[rgba(255,255,255,0.03)] p-3 backdrop-blur-sm sm:min-w-[980px] sm:max-w-[980px] lg:min-w-[1120px] lg:max-w-[1120px]"
        >
            <div className="grid gap-3 lg:grid-cols-[0.34fr_0.66fr]">
                <div className="flex flex-col justify-between border border-white/10 bg-[rgba(18,16,14,0.72)] p-5">
                    <div>
                        <p className="text-[9px] font-black uppercase tracking-[0.32em] text-[#D4A574]">{label}</p>
                        <p className="mt-4 text-[24px] font-black leading-[0.95] tracking-[-0.04em] text-[#FBF7EF] sm:text-[30px]">
                            {label} is not decoration.
                        </p>
                    </div>
                    <p className="mt-8 max-w-[18rem] text-[13px] leading-[1.7] text-white/62">{caption}</p>
                </div>

                <div className="relative aspect-[1.55] overflow-hidden border border-white/10">
                    <Image src={src} alt={alt} fill className="object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-r from-black/24 via-transparent to-black/28" />
                    <div className="absolute left-4 top-4 border border-white/16 bg-black/20 px-3 py-2 text-[9px] font-black uppercase tracking-[0.32em] text-white/74 backdrop-blur-sm">
                        Visual signal
                    </div>
                </div>
            </div>
        </motion.article>
    );
}

export default function SignalCorridorStage() {
    const ref = useRef<HTMLElement>(null);
    const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });

    const stripOneX = useTransform(scrollYProgress, [0, 1], ['-10%', '10%']);
    const stripTwoX = useTransform(scrollYProgress, [0, 1], ['8%', '-8%']);
    const stripThreeX = useTransform(scrollYProgress, [0, 1], ['-12%', '12%']);
    const wordOneY = useTransform(scrollYProgress, [0, 1], ['0%', '-10%']);
    const wordTwoY = useTransform(scrollYProgress, [0, 1], ['0%', '8%']);

    return (
        <section ref={ref} className="relative overflow-hidden bg-[#0F0D0B] py-28 text-[#FBF7EF] lg:py-40" data-presence-tone="ink">
            <div className="pointer-events-none absolute inset-0" aria-hidden="true">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_18%,rgba(212,165,116,0.18)_0%,rgba(212,165,116,0)_26%),radial-gradient(circle_at_78%_74%,rgba(76,114,224,0.1)_0%,rgba(76,114,224,0)_24%)]" />
            </div>

            <div className="relative mx-auto max-w-[1600px] px-6 sm:px-8 lg:px-10">
                <div className="max-w-[38rem]">
                    <p className="text-[10px] font-black uppercase tracking-[0.46em] text-[#D4A574]">Signal Corridor</p>
                    <h2 className="mt-8 text-[40px] font-black leading-[0.9] tracking-[-0.06em] text-[#FBF7EF] sm:text-[58px] lg:text-[92px]">
                        The homepage should
                        <br />
                        feel authored before
                        <br />
                        it feels explained.
                    </h2>
                    <p className="mt-8 max-w-[32rem] text-[16px] leading-[1.9] text-white/62">
                        This is the move I always want to make: stop treating the page like a conversion stack and turn it into a controlled visual corridor. Not chaos. Not a gimmick. Just a stronger sense of authorship.
                    </p>
                </div>

                <div className="relative mt-16 overflow-hidden border-y border-white/10 py-10 lg:mt-20 lg:py-14">
                    <motion.p
                        style={{ y: wordOneY }}
                        className="pointer-events-none absolute left-0 top-0 hidden text-[19vw] font-black uppercase leading-none tracking-[-0.08em] text-white/[0.05] lg:block"
                    >
                        visual
                    </motion.p>
                    <motion.p
                        style={{ y: wordTwoY }}
                        className="pointer-events-none absolute bottom-0 right-0 hidden text-[17vw] font-black uppercase leading-none tracking-[-0.08em] text-white/[0.05] lg:block"
                    >
                        inside
                    </motion.p>

                    <div className="space-y-5 lg:space-y-8">
                        <ImageStrip
                            label={CORRIDOR_STRIPS[0].label}
                            src={CORRIDOR_STRIPS[0].src}
                            alt={CORRIDOR_STRIPS[0].alt}
                            caption={CORRIDOR_STRIPS[0].caption}
                            x={stripOneX}
                        />
                        <ImageStrip
                            label={CORRIDOR_STRIPS[1].label}
                            src={CORRIDOR_STRIPS[1].src}
                            alt={CORRIDOR_STRIPS[1].alt}
                            caption={CORRIDOR_STRIPS[1].caption}
                            x={stripTwoX}
                        />
                        <ImageStrip
                            label={CORRIDOR_STRIPS[2].label}
                            src={CORRIDOR_STRIPS[2].src}
                            alt={CORRIDOR_STRIPS[2].alt}
                            caption={CORRIDOR_STRIPS[2].caption}
                            x={stripThreeX}
                        />
                    </div>
                </div>

                <div className="mt-10 flex flex-col gap-8 border-t border-white/10 pt-8 lg:flex-row lg:items-end lg:justify-between">
                    <div className="max-w-[28rem]">
                        <p className="text-[9px] font-black uppercase tracking-[0.3em] text-[#8F877B]">Visual impact note</p>
                        <p className="mt-3 text-[14px] leading-[1.8] text-white/58">
                            Inference from the Aparelho reference: the strongest move is not “more polish.” It is stronger rhythm, stronger atmosphere, and a page that behaves like a designed object.
                        </p>
                    </div>
                    <div className="h-12 w-full max-w-[560px] text-white/60">
                        <CorridorRoute />
                    </div>
                </div>
            </div>
        </section>
    );
}
