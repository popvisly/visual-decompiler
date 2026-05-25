'use client';

import Image from 'next/image';
import { BarChart3, Layers3, MousePointerSquareDashed } from 'lucide-react';
import MarketingSectionHeading from '@/components/marketing/MarketingSectionHeading';

const SYSTEM_ROWS = [
    {
        title: 'Visual Intelligence',
        body: 'What it is. Structure, visual hierarchy, and semiotic clarity.',
        icon: BarChart3,
    },
    {
        title: 'Dynamic Context',
        body: 'How it behaves. Stop power, retention, and platform fit.',
        icon: MousePointerSquareDashed,
    },
    {
        title: 'Structural Role',
        body: 'Where it fits. Role in sequence, repeatability, and creator DNA.',
        icon: Layers3,
    },
] as const;

export default function HomepageSystemSection() {
    return (
        <section className="relative overflow-hidden bg-[#FBFBF6] py-20 text-[#141414] lg:py-24">
            <div className="relative z-10 mx-auto w-full max-w-[1200px] px-6 lg:px-12">
                <div className="rounded-[2.5rem] border border-black/5 bg-white p-10 shadow-sm lg:p-12">
                    <div className="grid gap-16 lg:grid-cols-2 lg:items-center">
                        {/* Text and System Layers */}
                        <div>
                            <MarketingSectionHeading
                                kicker="The System"
                                title="Every creative move is broken into three layers."
                                className="max-w-2xl"
                            />

                            <div className="mt-10 grid gap-5">
                                {SYSTEM_ROWS.map((item) => {
                                    const Icon = item.icon;
                                    return (
                                        <article key={item.title} className="flex items-center gap-6 rounded-[2rem] border border-black/5 bg-[#FBFBF6] p-6 transition-colors hover:border-[#D4A574]/30">
                                            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-white text-[#8B6A3D] shadow-sm">
                                                <Icon className="h-6 w-6" />
                                            </div>
                                            <div>
                                                <h3 className="text-[16px] font-semibold uppercase leading-tight tracking-tight text-[#141414]">
                                                    {item.title}
                                                </h3>
                                                <p className="mt-1 text-[15px] leading-relaxed text-[#6B6B6B]">
                                                    {item.body}
                                                </p>
                                            </div>
                                        </article>
                                    );
                                })}
                            </div>

                            <p className="mt-10 text-[18px] font-medium leading-[1.7] text-[#141414]">
                                Because good creative isn&apos;t random.
                            </p>
                            <p className="mt-1 text-[18px] leading-[1.7] text-[#6B6B6B]">
                                It has a job.
                            </p>
                        </div>

                        {/* Image Content */}
                        <div className="relative aspect-square w-full overflow-hidden rounded-[2.5rem] border border-black/5 bg-[#FBFBF6] shadow-xl md:aspect-[4/3] lg:aspect-[4/5] xl:aspect-[3/4]">
                            <Image 
                                src="/analytics.png" 
                                alt="Analytics Layer" 
                                fill 
                                className="object-cover object-center parallax-image"
                                sizes="(max-width: 1024px) 100vw, 50vw"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
