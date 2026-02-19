import { LinkCta } from '@/types/homepage';

type Props = {
    headline: string;
    subhead: string;
    cta: LinkCta;
};

export default function FooterStartNow({ headline, subhead, cta }: Props) {
    return (
        <section className="relative px-6 pb-24 pt-24 bg-[#F6F1E7]">
            <div className="
                relative mx-auto max-w-6xl overflow-hidden
                rounded-[28px]
                border border-[#E7DED1]
                bg-[#EDE4D6]
                shadow-[0_30px_90px_rgba(20,20,20,0.14)]
            ">
                <div className="px-8 py-14 md:px-14 md:py-20">
                    <div className="
                        text-[54px] leading-[0.92] tracking-[-0.04em]
                        md:text-[72px] lg:text-[96px]
                        font-semibold text-[#141414]
                    ">
                        {headline}
                    </div>

                    <div className="mt-6 max-w-xl text-[16px] leading-[1.5] text-[#141414]/75">
                        {subhead}
                    </div>

                    <div className="mt-10 flex flex-wrap items-center gap-3">
                        <a
                            href={cta.href}
                            className="
                                inline-flex items-center justify-center
                                rounded-full
                                bg-[#141414] text-[#FBF7EF]
                                px-6 py-3
                                text-[14px] font-medium tracking-[-0.01em]
                                shadow-[0_16px_40px_rgba(20,20,20,0.20)]
                                transition
                                hover:-translate-y-[1px]
                                hover:shadow-[0_22px_60px_rgba(20,20,20,0.26)]
                                focus:outline-none focus-visible:ring-2 focus-visible:ring-[#141414]/30
                            "
                        >
                            {cta.label}
                        </a>

                        <a
                            href="/pricing"
                            className="text-[14px] font-medium text-[#141414]/70 hover:text-[#141414] transition ml-4"
                        >
                            Pricing
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
}
