'use client';

import { BarChart3, Layers3, MousePointerSquareDashed } from 'lucide-react';
import MarketingSectionHeading from '@/components/marketing/MarketingSectionHeading';

const SYSTEM_ROWS = [
    {
        title: 'Asset Intelligence',
        body: 'What it is. Structure, hierarchy, clarity.',
        icon: BarChart3,
    },
    {
        title: 'Social Context',
        body: 'How it behaves in the feed. Stop power, retention, platform fit.',
        icon: MousePointerSquareDashed,
    },
    {
        title: 'Content System Context',
        body: 'Where it fits. Role in sequence, repeatability, creator compatibility.',
        icon: Layers3,
    },
] as const;

export default function HomepageSystemSection() {
    return (
        <section className="relative overflow-hidden bg-[#FBFBF6] py-20 text-[#141414] lg:py-24">
            <div className="relative z-10 mx-auto w-full max-w-[1200px] px-6 lg:px-12">
                <div className="rounded-[2.5rem] border border-black/5 bg-white p-10 shadow-sm lg:p-12">
                    <MarketingSectionHeading
                        kicker="The System"
                        title="Every asset is broken into three decisions."
                        className="max-w-3xl"
                    />

                    <div className="mt-12 grid gap-5 lg:grid-cols-3">
                        {SYSTEM_ROWS.map((item) => {
                            const Icon = item.icon;
                            return (
                                <article key={item.title} className="rounded-[2rem] border border-black/5 bg-[#FBFBF6] p-8">
                                    <div className="mb-7 flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-[#8B6A3D] shadow-sm">
                                        <Icon className="h-5 w-5" />
                                    </div>
                                    <h3 className="text-[18px] font-semibold uppercase leading-tight tracking-tight text-[#141414]">
                                        {item.title}
                                    </h3>
                                    <p className="mt-4 text-[15px] leading-relaxed text-[#6B6B6B]">
                                        {item.body}
                                    </p>
                                </article>
                            );
                        })}
                    </div>

                    <p className="mt-10 max-w-[42ch] text-[18px] font-medium leading-[1.7] text-[#141414]">
                        Because good creative isn&apos;t random.
                    </p>
                    <p className="mt-2 max-w-[42ch] text-[18px] leading-[1.7] text-[#6B6B6B]">
                        It has a job.
                    </p>
                </div>
            </div>
        </section>
    );
}
