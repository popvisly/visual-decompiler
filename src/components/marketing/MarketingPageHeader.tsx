'use client';

import { motion } from 'framer-motion';

type MarketingPageHeaderProps = {
    kicker: string;
    title: React.ReactNode;
    description?: React.ReactNode;
    align?: 'left' | 'center';
    sectionClassName?: string;
    size?: 'hero' | 'compact';
    frame?: boolean;
    frameFooter?: React.ReactNode;
};

export default function MarketingPageHeader({
    kicker,
    title,
    description,
    align = 'left',
    sectionClassName,
    size = 'hero',
    frame = true,
    frameFooter,
}: MarketingPageHeaderProps) {
    const isCentered = align === 'center';

    const sectionSpacing =
        sectionClassName ??
        (size === 'compact' ? 'pt-20 pb-12 lg:pt-24 lg:pb-16' : 'pt-30 pb-24 lg:pt-36 lg:pb-28');

    const headingClassName =
        size === 'compact'
            ? 'mt-4 max-w-none text-[clamp(32px,4.6vw,54px)] font-semibold uppercase leading-[0.95] tracking-tight text-[#141414]'
            : 'mt-5 max-w-[14ch] text-[clamp(52px,6.4vw,102px)] font-black uppercase leading-[0.9] tracking-[-0.045em] text-[#141414]';

    const descriptionClassName =
        size === 'compact'
            ? 'mt-6 max-w-[760px] text-[16px] leading-[1.7] text-[#6B6B6B]'
            : 'mt-10 max-w-[760px] text-[16px] leading-[1.7] text-[#6B6B6B]';

    const shouldFrame = Boolean(description) && frame && size !== 'compact';

    return (
        <section className={sectionSpacing}>
            <div className="mx-auto w-full max-w-[1120px] px-6 lg:px-12">
                <motion.div
                    initial={{ opacity: 0, y: size === 'compact' ? 12 : 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    className={`${isCentered ? 'mx-auto text-center' : ''} max-w-[900px]`}
                >
                    <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-[#8B6A3D]/80">{kicker}</p>
                    <h1 className={headingClassName}>
                        {title}
                    </h1>
                    {description ? (
                        shouldFrame ? (
                            <div className="mt-10 max-w-[840px] rounded-[1.75rem] border border-black/5 bg-white px-8 py-8 shadow-sm">
                                <div className="space-y-6 text-[17px] leading-[1.85] text-[#6B6B6B]">
                                    <div>{description}</div>
                                </div>
                                {frameFooter ? <div className="mt-8">{frameFooter}</div> : null}
                            </div>
                        ) : (
                            <p className={descriptionClassName}>
                                {description}
                            </p>
                        )
                    ) : null}
                </motion.div>
            </div>
        </section>
    );
}
