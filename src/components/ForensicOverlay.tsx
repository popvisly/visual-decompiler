'use client';

import React, { useState, useRef, useEffect } from 'react';

type Anchor = {
    type: "Visual" | "Text" | "Composition";
    label: string;
    reason: string;
    area?: { x: number; y: number; w: number; h: number };
    content?: string;
};

type Props = {
    imageUrl: string;
    anchors: Anchor[];
};

export default function ForensicOverlay({ imageUrl, anchors }: Props) {
    const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    // Filter to only those with area coordinates
    const validAnchors = anchors.filter(a => a.area);

    return (
        <div ref={containerRef} className="relative w-full aspect-[4/5] bg-[#FBF7EF] rounded-2xl overflow-hidden border border-[#E7DED1] shadow-inner group/overlay">
            <img
                src={imageUrl}
                alt="Ad Forensic View"
                className="w-full h-full object-cover select-none"
            />

            {/* Anchors Overlay */}
            <div className="absolute inset-0 pointer-events-none">
                {validAnchors.map((anchor, idx) => {
                    const { x, y, w, h } = anchor.area!;
                    // x, y, w, h are 0-1000 normalized
                    const style = {
                        left: `${x / 10}%`,
                        top: `${y / 10}%`,
                        width: `${w / 10}%`,
                        height: `${h / 10}%`,
                    };

                    const isHovered = hoveredIdx === idx;

                    // Calculate z-index based on area size (smaller areas on top)
                    const area = w * h;
                    const baseZIndex = Math.max(20, 50 - Math.floor(area / 20000));

                    return (
                        <div
                            key={idx}
                            className={`absolute border-2 transition-all duration-300 cursor-pointer pointer-events-auto
                                ${isHovered
                                    ? 'border-accent bg-accent/10 shadow-[0_0_20px_rgba(187,158,123,0.4)] scale-105'
                                    : 'border-white/40 bg-transparent opacity-40 hover:opacity-100 hover:border-white/80'
                                }
                            `}
                            style={{ ...style, zIndex: isHovered ? 60 : baseZIndex }}
                            onMouseEnter={() => setHoveredIdx(idx)}
                            onMouseLeave={() => setHoveredIdx(null)}
                        >
                            {/* Invisible clickable area (only border area) */}
                            <div className="absolute inset-0 pointer-events-none" />

                            {/* Label Tag */}
                            <div className={`absolute -top-6 left-0 px-2 py-0.5 whitespace-nowrap rounded text-[10px] font-bold uppercase tracking-widest transition-opacity pointer-events-none
                                ${isHovered ? 'bg-accent text-white opacity-100 shadow-sm' : 'bg-[#141414]/60 text-white opacity-0'}
                            `}>
                                {anchor.label || 'Evidence'}
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Hover Content Panel */}
            {hoveredIdx !== null && (
                <div className="absolute bottom-4 inset-x-4 p-4 bg-[#141414]/95 backdrop-blur-xl border border-white/30 rounded-2xl z-[70] animate-in fade-in slide-in-from-bottom-2 duration-300 pointer-events-none shadow-2xl">
                    <div className="flex items-center gap-2 mb-2">
                        <span className="text-[10px] font-bold text-accent uppercase tracking-widest">Evidence Receipt</span>
                        <span className="px-1.5 py-0.5 rounded bg-white/10 text-white/80 text-[8px] font-bold uppercase">{validAnchors[hoveredIdx].type}</span>
                    </div>
                    <h4 className="text-[13px] font-bold text-white mb-1 uppercase tracking-tight">{validAnchors[hoveredIdx].label}</h4>
                    <p className="text-[11px] text-white leading-relaxed italic">
                        "{validAnchors[hoveredIdx].reason}"
                    </p>
                    {validAnchors[hoveredIdx].content && (
                        <div className="mt-2 pt-2 border-t border-white/20 text-[10px] text-accent/90 font-mono truncate">
                            Value: {validAnchors[hoveredIdx].content}
                        </div>
                    )}
                </div>
            )}

            {/* Subtle Guide Hint */}
            <div className="absolute top-4 right-4 text-[9px] font-bold text-white/40 uppercase tracking-[0.2em] pointer-events-none group-hover/overlay:opacity-0 transition-opacity">
                Forensic Overlay Active
            </div>
        </div>
    );
}
