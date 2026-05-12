'use client';

import Image from 'next/image';
import MarketingSectionHeading from '@/components/marketing/MarketingSectionHeading';

export default function HomepageProblemSection() {
    return (
        <section className="relative overflow-hidden bg-[#FBFBF6] pt-4 pb-20 text-[#141414] lg:pt-6 lg:pb-24">
            <div className="relative z-10 mx-auto w-full max-w-[1200px] px-6 lg:px-12">
                <div className="rounded-[2.5rem] border border-black/5 bg-white p-10 shadow-sm lg:p-12">
                    <div className="grid gap-16 lg:grid-cols-2 lg:items-center">
                        {/* Text Content */}
                        <div>
                            <MarketingSectionHeading
                                kicker="The Problem"
                                title="Teams don't struggle to make content."
                                description="They struggle to place it."
                                className="max-w-2xl"
                            />

                            <div className="mt-10 grid gap-5">
                                {[
                                    'What is this supposed to do?',
                                    'Where does it fit?',
                                    'Why should it work?',
                                ].map((line) => (
                                    <div key={line} className="rounded-[1.5rem] border border-black/5 bg-[#FBFBF6] px-6 py-5">
                                        <p className="text-[17px] font-medium leading-snug text-[#141414]">{line}</p>
                                    </div>
                                ))}
                            </div>

                            <p className="mt-10 text-[18px] leading-[1.7] text-[#6B6B6B]">
                                Without answers, every review becomes subjective. The teams who fixed this stopped guessing — and started using a different system.
                            </p>
                        </div>

                        {/* Image Content */}
                        <div className="relative aspect-square w-full overflow-hidden rounded-[2.5rem] border border-black/5 bg-[#FBFBF6] shadow-xl md:aspect-[4/3] lg:aspect-[4/5] xl:aspect-square">
                            <Image 
                                src="/c-levels.png" 
                                alt="Creative Review Process" 
                                fill 
                                className="object-cover object-center"
                                sizes="(max-width: 1024px) 100vw, 50vw"
                                priority
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
