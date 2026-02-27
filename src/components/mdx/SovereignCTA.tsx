'use client';

import { ArrowRight, Sparkles } from 'lucide-react';
import Link from 'next/link';

export default function SovereignCTA() {
    return (
        <div className="my-12 p-8 rounded-[2rem] bg-gradient-to-br from-[#141414] to-[#1a1a1a] border border-white/10 shadow-2xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-64 h-64 bg-accent/5 rounded-full -translate-y-32 translate-x-32 blur-[80px]" />

            <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-8">
                <div className="flex-1 space-y-3">
                    <div className="flex items-center gap-2 text-accent">
                        <Sparkles className="w-4 h-4" />
                        <h3 className="text-[10px] font-bold uppercase tracking-[0.3em]">Direct Analysis</h3>
                    </div>
                    <h4 className="text-2xl font-light text-[#FBF7EF] tracking-tight">
                        Decompile Your Next Ad
                    </h4>
                    <p className="text-sm text-white/50 leading-relaxed font-light">
                        Stop guessing. Paste any YouTube, TikTok, or Instagram URL and get a full psychological X-Ray in 60 seconds.
                    </p>
                </div>

                <div className="shrink-0">
                    <Link
                        href="/dashboard"
                        className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-accent text-[#141414] font-bold text-[10px] uppercase tracking-widest transition-all hover:bg-white hover:-translate-y-[1px] shadow-lg shadow-accent/10"
                    >
                        Decompile an Ad <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                </div>
            </div>
        </div>
    );
}
