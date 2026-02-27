'use client';

import { Activity, BrainCircuit, Maximize } from 'lucide-react';

export default function DeconstructionModule() {
    return (
        <div className="my-12 p-6 md:p-10 rounded-[2rem] bg-[#101010] border border-white/5 shadow-inner">
            <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-accent/10 flex items-center justify-center">
                        <BrainCircuit className="w-4 h-4 text-accent" />
                    </div>
                    <div>
                        <h4 className="text-[10px] font-bold text-accent uppercase tracking-widest">Live Module</h4>
                        <p className="text-sm text-white/60 font-medium">Cognitive Load & Frame Velocity</p>
                    </div>
                </div>

                <button className="p-2 rounded-full hover:bg-white/5 text-white/40 hover:text-white transition-colors">
                    <Maximize className="w-4 h-4" />
                </button>
            </div>

            {/* Simulated Data Visualization */}
            <div className="relative h-48 rounded-xl bg-gradient-to-r from-[#141414] to-[#1a1a1a] border border-white/5 overflow-hidden flex items-end px-4 gap-1">
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:14px_24px]" />

                {/* Simulated Bars */}
                {[40, 65, 30, 80, 45, 90, 60, 35, 75, 50, 85, 40, 70, 55, 95, 60, 45, 80].map((height, i) => (
                    <div key={i} className="flex-1 flex flex-col justify-end gap-2 group relative z-10">
                        <div
                            className="w-full bg-accent/20 group-hover:bg-accent/60 transition-colors rounded-t-sm"
                            style={{ height: `${height}%` }}
                        />
                    </div>
                ))}
            </div>

            <div className="mt-6 flex items-center justify-between text-[10px] uppercase font-bold tracking-widest text-white/30">
                <span>00:00:00</span>
                <span className="flex items-center gap-2"><Activity className="w-3 h-3 text-red-400" /> Peak Load Detected at 00:00:15</span>
                <span>00:00:30</span>
            </div>
        </div>
    );
}
