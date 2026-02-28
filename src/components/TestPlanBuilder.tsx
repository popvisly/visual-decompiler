'use client';

import React from 'react';

type TestCell = {
    lever: 'Hook' | 'Body_Copy' | 'Visual_Crop' | 'Background' | 'CTA';
    change: string;
    predicted_impact: 'Low' | 'Medium' | 'High';
    rationale: string;
};

type TestPlan = {
    hypothesis: string;
    sprint_duration_days: number;
    test_cells: TestCell[];
};

type Variant = {
    name: string;
    description: string;
    primary_lever: string;
};

type Props = {
    testPlan: TestPlan;
    variants: Variant[];
};

export default function TestPlanBuilder({ testPlan, variants }: Props) {
    return (
        <div className="space-y-10">
            {/* Strategy Hypothesis */}
            <div className="relative p-6 bg-[#141414] rounded-3xl border border-white/10 overflow-hidden group">
                <div className="absolute top-0 right-0 p-4">
                    <div className="px-2 py-1 rounded bg-accent text-[#141414] text-[8px] font-bold uppercase tracking-widest">
                        Core Hypothesis
                    </div>
                </div>
                <div className="relative z-10">
                    <p className="text-white/40 text-[10px] font-bold uppercase tracking-[0.2em] mb-2">Primary Testing Angle</p>
                    <h3 className="text-white text-lg font-bold leading-tight italic">
                        "{testPlan.hypothesis}"
                    </h3>
                </div>
                {/* Subtle Grid Background */}
                <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', backgroundSize: '16px 16px' }} />
            </div>

            {/* 14-Day Sprint Timeline */}
            <div className="space-y-4">
                <div className="flex items-center justify-between">
                    <h4 className="text-[12px] font-bold text-[#141414] uppercase tracking-wider">
                        {testPlan.sprint_duration_days}-Day Sprint Matrix
                    </h4>
                    <span className="text-[10px] font-mono text-[#6B6B6B]">{testPlan.test_cells.length} Cells Active</span>
                </div>

                <div className="grid grid-cols-1 gap-3">
                    {testPlan.test_cells.map((cell, idx) => (
                        <div key={idx} className="group p-5 bg-white border border-[#E7DED1] rounded-2xl hover:border-accent/40 transition-all shadow-sm">
                            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-full bg-[#141414] text-white flex items-center justify-center text-[10px] font-bold">
                                        {idx + 1}
                                    </div>
                                    <div>
                                        <p className="text-[9px] font-bold text-accent uppercase tracking-[0.15em]">{cell.lever.replace(/_/g, ' ')}</p>
                                        <h5 className="text-[13px] font-bold text-[#141414] tracking-tight">{cell.change}</h5>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-[#FBF7EF] border border-[#E7DED1]">
                                    <span className="text-[9px] font-bold text-[#6B6B6B] uppercase tracking-tighter">Impact:</span>
                                    <span className={`text-[10px] font-bold uppercase
                                        ${cell.predicted_impact === 'High' ? 'text-red-500' : cell.predicted_impact === 'Medium' ? 'text-yellow-500' : 'text-green-500'}
                                    `}>
                                        {cell.predicted_impact}
                                    </span>
                                </div>
                            </div>
                            <p className="text-[11px] text-[#6B6B6B] leading-relaxed italic border-t border-[#FBF7EF] pt-4">
                                "{cell.rationale}"
                            </p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Production Variants */}
            {variants.length > 0 && (
                <div className="pt-6 border-t border-[#E7DED1]">
                    <h4 className="text-[11px] font-bold text-[#141414]/40 uppercase tracking-[0.2em] mb-6">Production Variant Matrix</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {variants.map((v, idx) => (
                            <div key={idx} className="flex flex-col gap-2">
                                <div className="flex items-center gap-2 mb-1">
                                    <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                                    <h5 className="text-[11px] font-bold text-[#141414] uppercase tracking-tight">{v.name}</h5>
                                </div>
                                <p className="text-[10px] text-[#6B6B6B] leading-relaxed mb-2 line-clamp-2">{v.description}</p>
                                <div className="text-[9px] font-mono text-accent inline-flex items-center gap-1.5 px-2 py-0.5 bg-accent/5 rounded border border-accent/10 w-fit">
                                    Lever: {v.primary_lever}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}
