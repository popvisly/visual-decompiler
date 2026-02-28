'use client';

import React from 'react';
import ForensicTooltip from './ForensicTooltip';

type Trigger = {
    trigger: string;
    weight: number;
    sequence: number;
    rationale: string;
};

type Props = {
    stack: Trigger[];
    stackTypeLabel?: string;
};

export default function PersuasionStack({ stack, stackTypeLabel }: Props) {
    // Sort by sequence or weight if needed, but usually sequence is best for "flow"
    const sortedStack = [...stack].sort((a, b) => a.sequence - b.sequence);

    return (
        <div className="space-y-6">
            {stackTypeLabel && (
                <div className="flex items-center gap-2 mb-2">
                    <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#141414]/40">Architecture:</span>
                    <span className="text-[11px] font-bold uppercase tracking-widest text-accent">{stackTypeLabel}</span>
                </div>
            )}

            <div className="space-y-5">
                {sortedStack.map((item, idx) => (
                    <div key={idx} className="group relative">
                        <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center gap-3">
                                <div className="flex items-center justify-center w-5 h-5 rounded-full bg-[#141414] text-[#FBF7EF] text-[9px] font-bold">
                                    {item.sequence}
                                </div>
                                <h4 className="text-[13px] font-bold text-[#141414] uppercase tracking-wide">
                                    {item.trigger.replace(/_/g, ' ')}
                                </h4>
                            </div>
                            <span className="text-[11px] font-mono font-bold text-[#6B6B6B] opacity-60 group-hover:opacity-100 transition-opacity">
                                {item.weight}% Weight
                            </span>
                        </div>

                        {/* Progress Bar */}
                        <div className="h-1.5 w-full bg-[#FBF7EF] rounded-full overflow-hidden border border-[#E7DED1]">
                            <div
                                className="h-full bg-[#141414] rounded-full transition-all duration-1000 ease-out"
                                style={{ width: `${item.weight}%` }}
                            />
                        </div>

                        {/* Rationale */}
                        <p className="mt-2 text-[12px] text-[#6B6B6B] leading-relaxed italic border-l-2 border-[#E7DED1] pl-3 py-0.5 group-hover:border-accent/40 transition-colors">
                            {item.rationale}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
}
