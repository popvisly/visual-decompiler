'use client';

import { motion, useReducedMotion } from 'framer-motion';

type MarketingSectionHeadingProps = {
    kicker: string;
    title: React.ReactNode;
    description?: React.ReactNode;
    align?: 'left' | 'center';
    className?: string;
};

export default function MarketingSectionHeading({
    kicker,
    title,
    description,
    align = 'left',
    className = '',
}: MarketingSectionHeadingProps) {
    const isCentered = align === 'center';
    const prefersReducedMotion = useReducedMotion();

    return (
        <motion.div
            initial={prefersReducedMotion ? false : { opacity: 0, y: 24 }}
            whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={prefersReducedMotion ? undefined : { duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className={`${isCentered ? 'text-center mx-auto' : ''} ${className}`}
        >
            <p className="text-[10px] font-semibold uppercase tracking-[0.36em] text-[#8B6A3D]/80">{kicker}</p>
            <h2 className={`mt-5 max-w-[16ch] text-[clamp(36px,5vw,56px)] font-semibold uppercase leading-[0.9] tracking-tight text-[#141414] ${isCentered ? 'mx-auto' : ''}`}>
                {title}
            </h2>
            {description ? (
                <p className={`mt-6 max-w-[860px] text-[18px] leading-[1.78] text-[#6B6B6B] ${isCentered ? 'mx-auto' : ''}`}>
                    {description}
                </p>
            ) : null}
        </motion.div>
    );
}
