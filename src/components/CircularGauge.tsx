'use client';

import React, { useEffect, useState } from 'react';

type Props = {
    value: number; // 0 to 100
    label: string;
    sublabel?: string;
};

export default function CircularGauge({ value, label, sublabel }: Props) {
    const [animatedValue, setAnimatedValue] = useState(0);

    useEffect(() => {
        // Slight delay for entrance animation
        const timeout = setTimeout(() => {
            setAnimatedValue(value);
        }, 100);
        return () => clearTimeout(timeout);
    }, [value]);

    const radius = 40;
    const circumference = 2 * Math.PI * radius;
    const strokeDashoffset = circumference - (animatedValue / 100) * circumference;

    return (
        <div className="flex flex-col h-full justify-between">
            <div>
                <h3 className="text-xs font-bold text-[#BB9E7B] uppercase tracking-widest mb-1">{label}</h3>
                {sublabel && <p className="text-[10px] text-txt-on-dark-muted font-medium uppercase tracking-tight">{sublabel}</p>}
            </div>

            <div className="relative w-24 h-24 mt-6">
                <svg className="w-full h-full -rotate-90 transform" viewBox="0 0 100 100">
                    {/* Background track */}
                    <circle
                        cx="50"
                        cy="50"
                        r={radius}
                        fill="transparent"
                        stroke="#2A2A2A"
                        strokeWidth="8"
                    />
                    {/* Progress track */}
                    <circle
                        cx="50"
                        cy="50"
                        r={radius}
                        fill="transparent"
                        stroke="#BB9E7B"
                        strokeWidth="8"
                        strokeDasharray={circumference}
                        strokeDashoffset={strokeDashoffset}
                        strokeLinecap="round"
                        className="transition-all duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)]"
                    />
                </svg>
                {/* Center text */}
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-xl font-light text-txt-on-dark">{Math.round(animatedValue)}%</span>
                </div>
            </div>
        </div>
    );
}
