"use client";

import React from 'react';
import WorkspaceTabHeader from '@/components/dashboard/WorkspaceTabHeader';
import WorkspaceDecisionSummary from '@/components/dashboard/WorkspaceDecisionSummary';
import { ConstraintItem } from '@/types/dashboard';

interface ConstraintMapTabProps {
    mustKeepConstraints: ConstraintItem[];
    mustAvoidConstraints: ConstraintItem[];
    safeAdaptationZone: ConstraintItem[];
    criticalConstraintCount: number;
    avoidConstraintCount: number;
    safeAdaptationCount: number;
}

export default function ConstraintMapTab({
    mustKeepConstraints,
    mustAvoidConstraints,
    safeAdaptationZone,
    criticalConstraintCount,
    avoidConstraintCount,
    safeAdaptationCount,
}: ConstraintMapTabProps) {
    const normalizeProseText = (value: string | undefined | null) => {
        if (!value) return '';
        return value.replace(/\s+/g, ' ').trim();
    };

    return (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex flex-col gap-6">
                <div className="px-0">
                    <WorkspaceTabHeader
                        kicker="Operational Guardrails"
                        title="The Strategic Guardrails"
                        intro="This section defines the non-negotiables, avoidances, and safe adaptation boundaries required to preserve the working forensic logic."
                    />
                    <WorkspaceDecisionSummary
                        eyebrow="Guardrail Verdict"
                        title="Protect the route before making variations."
                        body="Constraint Map separates what must be retained, what must be avoided, and where controlled adaptation is safe. Use this before remixing, testing, or briefing production changes."
                        metrics={[
                            { label: 'Critical Keeps', value: criticalConstraintCount },
                            { label: 'Avoidances', value: avoidConstraintCount },
                            { label: 'Safe Lanes', value: safeAdaptationCount },
                        ]}
                        actions={[
                            mustKeepConstraints[0]?.text || 'Identify the primary mechanic before adapting.',
                            mustAvoidConstraints[0]?.text || 'Avoid changes that increase message friction.',
                            safeAdaptationZone[0]?.text || 'Create a controlled variation lane before broad iteration.',
                        ].filter(Boolean)}
                    />
                </div>

                <div className="rounded-[2.5rem] border border-black/5 bg-white p-10 text-[#141414] shadow-sm flex flex-col">
                    <p className="mb-8 border-b border-black/5 pb-6 text-[11px] font-black uppercase tracking-[0.3em] text-[#8B6A3D]">Constraint Priority Legend</p>
                    <div className="grid gap-4 xl:grid-cols-3">
                        {[
                            ['Critical', 'Must be preserved'],
                            ['High', 'Important but not critical'],
                            ['Optional', 'Enhancements that can vary'],
                        ].map(([level, description]) => (
                            <div key={level} className="rounded-[1.8rem] border border-black/5 bg-[#FBFBF6] p-6 transition-colors hover:bg-white hover:shadow-md">
                                <span
                                    className={`inline-flex items-center gap-3 text-[11px] font-black uppercase tracking-[0.12em] ${
                                        level === 'Critical'
                                            ? 'text-[#141414]'
                                            : level === 'High'
                                                ? 'text-[#8B6A3D]'
                                                : 'text-[#6B6B6B]'
                                    }`}
                                >
                                    <span
                                        className={`h-2 w-2 rounded-full ${
                                            level === 'Critical'
                                                ? 'bg-[#141414]'
                                                : level === 'High'
                                                    ? 'bg-[#8B6A3D]'
                                                    : 'bg-[#C4C4C4]'
                                        }`}
                                    />
                                    {level}
                                </span>
                                <p className="mt-4 text-[14px] font-medium leading-relaxed text-[#515151]">{description}</p>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="flex flex-col gap-6">
                    {[
                        {
                            title: 'The Inviolate Protocol',
                            guidance: "Preserve these elements to protect the route's strategic spine.",
                            items: mustKeepConstraints,
                            accent: 'text-[#8B6A3D]',
                        },
                        {
                            title: 'The Prohibition Protocol',
                            guidance: 'Avoid these shifts to prevent degradation of message transfer.',
                            items: mustAvoidConstraints,
                            accent: 'text-[#141414]',
                        },
                        {
                            title: 'Adaptive Logic',
                            guidance: 'Safe variation zone for controlled testing and iteration.',
                            items: safeAdaptationZone,
                            accent: 'text-[#8B6A3D]',
                        },
                    ].map((group, index) => (
                        <div
                            key={group.title}
                            className="self-start h-fit rounded-[2.5rem] border border-black/5 bg-white p-10 text-[#141414] shadow-sm flex flex-col w-full"
                        >
                            <p className={`text-[11px] font-black uppercase tracking-[0.3em] mb-8 border-b border-black/5 pb-6 ${group.accent}`}>{group.title}</p>
                            <p className="mb-8 max-w-[66ch] text-[15px] font-medium leading-relaxed text-[#515151]">{normalizeProseText(group.guidance)}</p>
                            <div className="space-y-4">
                                {group.title === 'Adaptive Delta' && (
                                    <div className="border border-black/5 bg-[#FBFBF6] px-8 py-4 rounded-2xl mb-4">
                                        <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[#8B6A3D]">Variation Lanes</p>
                                    </div>
                                )}
                                {group.items.length > 0 ? (
                                    group.title === 'Adaptive Delta' ? (
                                        (() => {
                                            const adaptiveGroups = group.items.reduce((acc, adaptiveItem, adaptiveIndex) => {
                                                const adaptiveMatch = adaptiveItem.text.match(/^\s*([^:]+):\s*(.*)$/);
                                                const laneTitle = normalizeProseText(adaptiveMatch?.[1]?.trim()) || `Variant ${adaptiveIndex + 1}`;
                                                const laneBody = adaptiveMatch?.[2]?.trim() || adaptiveItem.text;
                                                const existingLane = acc.find((lane: any) => lane.title === laneTitle);
                                                const laneEntry = { id: adaptiveIndex, body: laneBody, severity: adaptiveItem.severity };

                                                if (existingLane) {
                                                    existingLane.entries.push(laneEntry);
                                                } else {
                                                    acc.push({ title: laneTitle, entries: [laneEntry] });
                                                }
                                                return acc;
                                            }, [] as any[]);

                                            return adaptiveGroups.map((lane) => (
                                                <div key={lane.title} className="rounded-[1.8rem] border border-black/5 bg-[#FBFBF6] p-8 transition-all hover:bg-white hover:shadow-md">
                                                    <h4 className="text-[11px] font-black uppercase tracking-[0.2em] text-[#141414] mb-4 border-b border-black/5 pb-4">{lane.title}</h4>
                                                    <div className="space-y-4">
                                                        {lane.entries.map((entry: any) => (
                                                            <div key={entry.id} className="flex items-start gap-4">
                                                                <div className={`mt-1.5 h-2 w-2 shrink-0 rounded-full ${entry.severity === 'critical' ? 'bg-[#141414]' : 'bg-[#8B6A3D]'}`} />
                                                                <p className="text-[14px] font-medium leading-relaxed text-[#515151]">{entry.body}</p>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            ));
                                        })()
                                    ) : (
                                        group.items.map((item, idx) => (
                                            <div key={idx} className="rounded-[1.8rem] border border-black/5 bg-[#FBFBF6] p-8 transition-all hover:bg-white hover:shadow-md">
                                                <div className="flex items-start gap-4">
                                                    <div className={`mt-1.5 h-2 w-2 shrink-0 rounded-full ${item.severity === 'critical' ? 'bg-[#141414]' : 'bg-[#8B6A3D]'}`} />
                                                    <p className="text-[14px] font-medium leading-relaxed text-[#515151]">{item.text}</p>
                                                </div>
                                            </div>
                                        ))
                                    )
                                ) : (
                                    <div className="rounded-[1.8rem] border border-dashed border-black/10 p-8 text-center">
                                        <p className="text-[12px] font-medium text-[#8B6A3D]/40 italic">No specific {group.title.toLowerCase()} identified for this extraction.</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
