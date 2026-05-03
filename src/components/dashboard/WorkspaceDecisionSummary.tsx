"use client";

import React from 'react';

interface WorkspaceDecisionSummaryProps {
    eyebrow: string;
    title: string;
    body: string;
    metrics?: { label: string; value: string | number }[];
    actions?: string[];
}

export default function WorkspaceDecisionSummary({
    eyebrow,
    title,
    body,
    metrics = [],
    actions = [],
}: WorkspaceDecisionSummaryProps) {
    return (
        <section className="mb-6 overflow-hidden rounded-[2.5rem] border border-black/5 bg-white p-10 text-[#141414] shadow-sm lg:p-12">
            <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(340px,0.48fr)] lg:items-start">
                <div>
                    <div className="flex items-center gap-3 mb-6">
                        <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-[#8B6A3D]">{eyebrow}</p>
                        <div className="h-px w-8 bg-black/10" />
                    </div>
                    <h3 className="text-[28px] font-black uppercase leading-[0.95] tracking-tight text-[#141414] md:text-[38px]">
                        {title}
                    </h3>
                    <p className="mt-8 max-w-[64ch] text-[15px] font-medium leading-[1.7] text-[#515151]">{body}</p>

                    {actions.length > 0 ? (
                        <div className="mt-10 rounded-[2rem] border border-black/5 bg-[#FBFBF6] p-8">
                            <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#8B6A3D] mb-6">Operational Next Actions</p>
                            <div className="space-y-4">
                                {actions.map((action, index) => (
                                    <div key={`${action}-${index}`} className="flex items-start gap-4">
                                        <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-white border border-black/10 text-[11px] font-bold text-[#141414] shadow-sm">
                                            {index + 1}
                                        </span>
                                        <p className="text-[13px] font-semibold leading-relaxed text-[#515151]">{action}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ) : null}
                </div>

                {metrics.length > 0 ? (
                    <div className="grid gap-4">
                        {metrics.map((metric) => (
                            <div key={metric.label} className="group rounded-[1.8rem] border border-black/5 bg-[#FCFBF9] p-6 transition-all hover:border-[#D4A574]/30 hover:bg-white hover:shadow-md">
                                <p className="text-[9px] font-bold uppercase tracking-[0.3em] text-[#8B6A3D] mb-4">{metric.label}</p>
                                <div className="text-[18px] font-black uppercase tracking-tight text-[#141414] leading-tight group-hover:text-[#8B6A3D] transition-colors">{metric.value}</div>
                            </div>
                        ))}
                    </div>
                ) : null}
            </div>
        </section>
    );
}
