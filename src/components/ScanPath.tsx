'use client';

import React from 'react';

type ScanStep = {
    step: number;
    target: string;
    rationale: string;
    area?: { x: number; y: number; w: number; h: number };
};

type Props = {
    path: ScanStep[];
};

export default function ScanPath({ path }: Props) {
    const sortedPath = [...path].sort((a, b) => a.step - b.step);

    return (
        <div className="relative pl-6">
            {/* Vertical Line */}
            <div className="absolute left-[9px] top-2 bottom-2 w-px bg-gradient-to-b from-[#141414]/20 via-[#141414]/10 to-transparent" />

            <div className="space-y-6">
                {sortedPath.map((item, idx) => (
                    <div key={idx} className="relative group">
                        {/* Bullet */}
                        <div className="absolute -left-[22px] top-1 w-[18px] h-[18px] rounded-full bg-white border-2 border-[#141414] z-10 flex items-center justify-center">
                            <span className="text-[9px] font-bold text-[#141414]">{item.step}</span>
                        </div>

                        <div className="flex flex-col gap-1">
                            <h4 className="text-[12px] font-bold text-[#141414] uppercase tracking-wide group-hover:text-accent transition-colors">
                                {item.target}
                            </h4>
                            <p className="text-[11px] text-[#6B6B6B] leading-relaxed">
                                {item.rationale}
                            </p>
                        </div>
                    </div>
                ))}
            </div>

            <div className="mt-8 p-4 bg-[#FBF7EF] rounded-2xl border border-[#E7DED1] border-dashed">
                <p className="text-[10px] font-bold text-[#141414]/40 uppercase tracking-[0.2em] mb-2">Strategic Insight:</p>
                <p className="text-[11px] text-[#6B6B6B] leading-relaxed italic">
                    "This scan path optimizes for {path.length > 2 ? path[1].target : 'immediate brand recall'}, ensuring the primary value proposition is processed before the viewer disengages."
                </p>
            </div>
        </div>
    );
}
