'use client';

import { Info } from 'lucide-react';
import { useState } from 'react';

interface Props {
    term: string;
    definition: string;
    children: React.ReactNode;
    /** inline = renders next to the title; block = wraps children entirely */
    mode?: 'inline' | 'block';
}

/**
 * ForensicTooltip — Premium intelligence-layer hover definitions.
 * Renders a subtle (i) icon next to the term that reveals a
 * high-detail strategic definition on hover.
 */
export default function ForensicTooltip({ term, definition, children, mode = 'inline' }: Props) {
    const [open, setOpen] = useState(false);

    if (mode === 'block') {
        return (
            <div className="relative group/tip" onMouseEnter={() => setOpen(true)} onMouseLeave={() => setOpen(false)}>
                {children}
                {open && (
                    <div className="absolute z-50 left-0 top-full mt-2 w-80 max-w-[90vw] animate-in fade-in slide-in-from-top-2 duration-300">
                        <div className="bg-[#141414] text-white rounded-2xl p-5 shadow-[0_20px_60px_rgba(0,0,0,0.3)] border border-white/10 relative">
                            <div className="absolute -top-1.5 left-6 w-3 h-3 bg-[#141414] rotate-45 border-l border-t border-white/10" />
                            <p className="text-[9px] font-bold text-accent/60 uppercase tracking-[0.3em] mb-2">{term}</p>
                            <p className="text-[11px] text-white/70 leading-relaxed font-light">{definition}</p>
                        </div>
                    </div>
                )}
            </div>
        );
    }

    return (
        <span className="relative inline-flex items-center gap-1.5 group/tip">
            {children}
            <button
                type="button"
                className="inline-flex items-center justify-center w-3.5 h-3.5 rounded-full bg-[#141414]/5 hover:bg-accent/20 transition-colors cursor-help shrink-0"
                onMouseEnter={() => setOpen(true)}
                onMouseLeave={() => setOpen(false)}
                onClick={(e) => { e.preventDefault(); setOpen(!open); }}
                aria-label={`What is ${term}?`}
            >
                <Info className="w-2.5 h-2.5 text-[#6B6B6B]/50 group-hover/tip:text-accent transition-colors" />
            </button>
            {open && (
                <div className="absolute z-50 left-0 top-full mt-2 w-80 max-w-[90vw] animate-in fade-in slide-in-from-top-2 duration-300">
                    <div className="bg-[#141414] text-white rounded-2xl p-5 shadow-[0_20px_60px_rgba(0,0,0,0.3)] border border-white/10 relative">
                        <div className="absolute -top-1.5 left-4 w-3 h-3 bg-[#141414] rotate-45 border-l border-t border-white/10" />
                        <p className="text-[9px] font-bold text-accent/60 uppercase tracking-[0.3em] mb-2">{term}</p>
                        <p className="text-[11px] text-white/70 leading-relaxed font-light">{definition}</p>
                    </div>
                </div>
            )}
        </span>
    );
}
