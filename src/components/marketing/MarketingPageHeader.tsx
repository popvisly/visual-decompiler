'use client';

import { motion } from 'framer-motion';

type MarketingPageHeaderProps = {
    kicker: string;
    title: React.ReactNode;
    description?: React.ReactNode;
    align?: 'left' | 'center';
    sectionClassName?: string;
};

export default function MarketingPageHeader({
    kicker,
    title,
    description,
    align = 'left',
    sectionClassName,
}: MarketingPageHeaderProps) {
    const isCentered = align === 'center';

    return (
        <section className={sectionClassName ?? 'pt-30 pb-24 lg:pt-36 lg:pb-28'}>
            <div className="mx-auto w-full max-w-[1120px] px-6 lg:px-12">
                <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    className={`${isCentered ? 'mx-auto text-center' : ''} max-w-[900px]`}
                >
                    <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-[#8B6A3D]/80">{kicker}</p>
                    <h1 className="mt-5 max-w-[14ch] text-[clamp(52px,6.4vw,102px)] font-black uppercase leading-[0.9] tracking-[-0.045em] text-[#141414]">
                        {title}
                    </h1>
                    {description ? (
                        <p className="mt-10 max-w-[760px] text-[16px] leading-[1.7] text-[#6B6B6B]">
                            {description}
                        </p>
                    ) : null}
                </motion.div>
            </div>
        </section>
    );
}
