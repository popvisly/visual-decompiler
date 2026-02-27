'use client';

import { ArrowRight, Newspaper } from 'lucide-react';
import Link from 'next/link';

// Mocked data for the B&T / industry news aggregator.
const NEWS_ITEMS = [
    {
        id: '1',
        source: 'B&T',
        headline: 'WPP & Adobe announce deep partnership for AI-driven creative workflows',
        analysis: 'Indicates a rapid shift toward automated CX Orchestration. Agencies failing to adopt AI pipelines will see margin compression within 18 months.',
        url: '#',
        date: '2 Hours Ago'
    },
    {
        id: '2',
        source: 'AdNews',
        headline: 'Omnicom reports 15% increase in programmatic ad spend for Q1',
        analysis: 'Despite the rise of privacy-first targeting, algorithmic buying remains dominant. High-end creative differentiation is now the only moat.',
        url: '#',
        date: '5 Hours Ago'
    }
];

export default function NewsAggregatorFooter() {
    return (
        <section className="bg-black border-t border-white/10 pt-16 pb-20 mt-auto relative z-10">
            <div className="max-w-7xl mx-auto px-6">
                <div className="flex items-center gap-4 mb-10">
                    <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center">
                        <Newspaper className="w-5 h-5 text-accent" />
                    </div>
                    <div>
                        <h3 className="text-[12px] font-bold text-accent uppercase tracking-[0.3em]">Industry Intel</h3>
                        <p className="text-[10px] text-white/40 uppercase tracking-widest mt-1">Live Aggregator via B&T with Forensic Filtering</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {NEWS_ITEMS.map((item) => (
                        <a
                            key={item.id}
                            href={item.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="block p-6 rounded-2xl bg-white/5 border border-white/5 hover:border-accent/40 hover:bg-white/[0.07] transition-all group"
                        >
                            <div className="flex items-center justify-between mb-4">
                                <span className="text-[9px] font-bold bg-white/10 text-white/80 px-2 py-1 rounded-md uppercase tracking-widest">
                                    {item.source}
                                </span>
                                <span className="text-[10px] text-white/30 font-medium">
                                    {item.date}
                                </span>
                            </div>

                            <h4 className="text-lg font-medium text-[#FBF7EF] leading-snug mb-4 group-hover:text-accent transition-colors">
                                "{item.headline}"
                            </h4>

                            <div className="pt-4 border-t border-white/10">
                                <p className="text-[10px] font-bold text-accent/80 uppercase tracking-widest mb-2">Visual Decompiler Analysis</p>
                                <p className="text-sm text-white/60 leading-relaxed font-light">
                                    {item.analysis}
                                </p>
                            </div>
                        </a>
                    ))}
                </div>

                <div className="mt-12 text-center">
                    <Link href="/dashboard" className="inline-flex items-center gap-2 text-[10px] font-bold text-white/40 hover:text-accent uppercase tracking-[0.2em] transition-colors">
                        Run a Forensic Deconstruction on your own campaigns <ArrowRight className="w-3 h-3" />
                    </Link>
                </div>
            </div>
        </section>
    );
}
