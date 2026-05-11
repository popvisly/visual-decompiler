'use client';

import MarketingSectionHeading from '@/components/marketing/MarketingSectionHeading';

export default function HomepageProblemSection() {
    return (
        <section className="relative overflow-hidden bg-[#FBFBF6] py-20 text-[#141414] lg:py-24">
            <div className="relative z-10 mx-auto w-full max-w-[1200px] px-6 lg:px-12">
                <div className="rounded-[2.5rem] border border-black/5 bg-white p-10 shadow-sm lg:p-12">
                    <MarketingSectionHeading
                        kicker="The Problem"
                        title="Teams don't struggle to make content."
                        description="They struggle to place it."
                        className="max-w-3xl"
                    />

                    <div className="mt-10 grid gap-5 md:grid-cols-3">
                        {[
                            'What is this supposed to do?',
                            'Where does it fit?',
                            'Why should it work?',
                        ].map((line) => (
                            <div key={line} className="rounded-[1.8rem] border border-black/5 bg-[#FBFBF6] px-7 py-6">
                                <p className="text-[18px] font-semibold leading-snug text-[#141414]">{line}</p>
                            </div>
                        ))}
                    </div>

                    <p className="mt-10 max-w-[58ch] text-[18px] leading-[1.7] text-[#6B6B6B]">
                        Without answers, every review becomes subjective. The teams who fixed this stopped guessing — and started using a different system.
                    </p>
                </div>
            </div>
        </section>
    );
}
