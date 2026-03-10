'use client';

import React, { useEffect, useState } from 'react';

type Props = {
    posture: string;
    moves?: string[];
};

export default function StrategicPostureMap({ posture, moves = [] }: Props) {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const size = 260;
    const center = size / 2;
    const padding = 50;
    const graphSize = size - padding * 2;

    // Mapping logic (simplified for demonstration/dashboard feel)
    // We can map high-level keywords to a 2D coordinate space:
    // X: SUBMISSION (-1) to DOMINANCE (+1)
    // Y: RATIONAL (-1) to EMOTIONAL (+1)
    
    const getCoordinates = (text: string) => {
        let x = 0;
        let y = 0;
        const normalized = text.toLowerCase();
        
        // Horizontal Axis: Dominance/Power vs Submission/Grace
        if (normalized.includes('conqueror') || normalized.includes('power') || normalized.includes('dominance')) x = 0.6;
        if (normalized.includes('lover') || normalized.includes('desire') || normalized.includes('grace')) x = -0.4;
        if (normalized.includes('rebel')) x = 0.8;
        if (normalized.includes('caregiver')) x = -0.7;
        
        // Vertical Axis: Emotional vs Rational
        if (normalized.includes('lover') || normalized.includes('hedonic') || normalized.includes('emotional')) y = 0.7;
        if (normalized.includes('sage') || normalized.includes('rational') || normalized.includes('logic')) y = -0.6;
        if (normalized.includes('jester')) y = 0.4;
        if (normalized.includes('ruler')) y = -0.3;

        // Default to a slight offset if no matches to keep it interesting
        if (x === 0 && y === 0) {
            x = 0.3;
            y = 0.4;
        }

        return {
            x: center + (x * graphSize) / 2,
            y: center - (y * graphSize) / 2
        };
    };

    const targetPos = getCoordinates(posture);
    const activeX = mounted ? targetPos.x : center;
    const activeY = mounted ? targetPos.y : center;

    return (
        <div className="relative w-full max-w-[260px] aspect-square flex items-center justify-center">
            <svg width="100%" height="100%" viewBox={`0 0 ${size} ${size}`} className="overflow-visible">
                {/* Background Grid */}
                <circle cx={center} cy={center} r={graphSize/2} fill="transparent" stroke="#D4A57411" strokeWidth="1" />
                <circle cx={center} cy={center} r={graphSize/4} fill="transparent" stroke="#D4A57408" strokeWidth="1" />
                
                {/* Crosshair Axes */}
                <line x1={padding} y1={center} x2={size-padding} y2={center} stroke="#D4A57422" strokeWidth="1" strokeDasharray="2 2" />
                <line x1={center} y1={padding} x2={center} y2={size-padding} stroke="#D4A57422" strokeWidth="1" strokeDasharray="2 2" />

                {/* Axis Labels */}
                <text x={center} y={padding-10} fill="#D4A574" fontSize="8" textAnchor="middle" className="uppercase tracking-[0.2em] font-bold opacity-40">Emotional</text>
                <text x={center} y={size-padding+18} fill="#D4A574" fontSize="8" textAnchor="middle" className="uppercase tracking-[0.2em] font-bold opacity-40">Rational</text>
                <text x={size-padding+10} y={center} fill="#D4A574" fontSize="8" textAnchor="start" alignmentBaseline="middle" className="uppercase tracking-[0.2em] font-bold opacity-40">Dominance</text>
                <text x={padding-10} y={center} fill="#D4A574" fontSize="8" textAnchor="end" alignmentBaseline="middle" className="uppercase tracking-[0.2em] font-bold opacity-40">Submission</text>

                {/* Target Mapping Area (Glowing Pulse) */}
                <g className="transition-all duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)]">
                    <circle cx={activeX} cy={activeY} r="12" fill="url(#postureGradient)" className="animate-pulse" />
                    <circle cx={activeX} cy={activeY} r="4" fill="#D4A574" />
                    
                    {/* Neural Connections (Simulated Lines to moves if we want, or just a pointer) */}
                    <line x1={center} y1={center} x2={activeX} y2={activeY} stroke="#D4A57444" strokeWidth="1" strokeDasharray="4 4" />
                </g>

                <defs>
                    <radialGradient id="postureGradient">
                        <stop offset="0%" stopColor="#D4A574" stopOpacity="0.4" />
                        <stop offset="100%" stopColor="#D4A574" stopOpacity="0" />
                    </radialGradient>
                </defs>
            </svg>
            
            {/* Center HUD Decor */}
            <div className="absolute inset-0 border border-[#D4A574]/10 rounded-full scale-[1.1] pointer-events-none" />
            <div className="absolute inset-0 border border-[#D4A574]/5 rounded-full scale-[1.3] pointer-events-none" />
        </div>
    );
}
