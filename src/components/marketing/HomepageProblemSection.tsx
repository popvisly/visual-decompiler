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

                            <div className="mt-10 rounded-[1.75rem] border border-black/5 bg-[#FBFBF6] p-8">
                                <p className="text-[10px] font-bold uppercase tracking-[0.34em] text-[#8B6A3D]/80">
                                    What Teams Actually Need
                                </p>
                                <ul className="mt-6 space-y-5">
                                    {[
                                        {
                                            title: 'A repeatable creative review system',
                                            body: 'Same structure every time — so feedback stops drifting into vibes and taste debates.',
                                        },
                                        {
                                            title: 'Clear next actions',
                                            body: 'Not “it feels off” — specific fixes for hierarchy, friction, and intent so revisions get shorter.',
                                        },
                                        {
                                            title: 'A defensible trail',
                                            body: 'Reads that live in the Vault, so you can reference what you decided and why — without re-prompting.',
                                        },
                                    ].map((item) => (
                                        <li key={item.title} className="space-y-2">
                                            <p className="text-[12px] font-black uppercase tracking-[0.22em] text-[#141414]">{item.title}</p>
                                            <p className="text-[15px] leading-relaxed text-[#6B6B6B]">{item.body}</p>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <p className="mt-10 text-[18px] leading-[1.7] text-[#6B6B6B]">
                                Without this, every review becomes subjective. Visual Decompiler turns instinct into something you can place, explain, and defend — fast.
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
