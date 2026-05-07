"use client";

import React from 'react';
import WorkspaceTabHeader from '@/components/dashboard/WorkspaceTabHeader';
import WorkspaceDecisionSummary from '@/components/dashboard/WorkspaceDecisionSummary';
import { IntegratedRecommendationData, StressLabRow, BlueprintData } from '@/types/dashboard';
import { normalizeProseText, proseParagraphs, firstSentence } from '@/lib/utils';

interface StressLabTabProps {
    integratedRecommendation: IntegratedRecommendationData;
    stressLabRows: StressLabRow[];
    primaryStressTest: StressLabRow | undefined;
    stressTestCount: number;
    blueprintData: BlueprintData | null;
    dossier: any;
    assetImageUrl?: string | null;
    assetAlt?: string;
}

export default function StressLabTab({
    integratedRecommendation,
    stressLabRows,
    primaryStressTest,
    stressTestCount,
    blueprintData,
    dossier,
    assetImageUrl,
    assetAlt,
}: StressLabTabProps) {
    const gazeRef = React.useRef<HTMLDivElement | null>(null);
    const [focusedVariable, setFocusedVariable] = React.useState<string | null>(null);

    const focusVariable = React.useCallback((variable: string) => {
        setFocusedVariable(variable);
        if (variable.toLowerCase().includes('gaze')) {
            gazeRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    }, []);

    return (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex flex-col gap-8">
                <div className="px-0">
                    <WorkspaceTabHeader
                        kicker="Causal Intelligence"
                        title="Stress Lab: Causal Intelligence"
                        intro="This section stress-tests key creative variables to predict lift, control risk, and protect decision confidence."
                    />
                    <WorkspaceDecisionSummary
                        eyebrow="Stress Test"
                        title={primaryStressTest ? `${primaryStressTest.variable} is the next test variable.` : 'Stress tests are still resolving.'}
                        body={primaryStressTest?.proposedShift || 'Use Stress Lab to identify which creative variable can improve lift without damaging the core mechanic.'}
                        metrics={[
                            { label: 'Tests', value: stressTestCount },
                            { label: 'Predicted Lift', value: primaryStressTest?.predictedLift || 'Pending' },
                            { label: 'Recommendation', value: primaryStressTest?.recommendation || 'Pending' },
                        ]}
                        actions={[
                            primaryStressTest?.proposedShift || 'Select one controlled test variable.',
                            primaryStressTest?.risk || 'Check risk before revising.',
                            integratedRecommendation.fallback,
                        ].filter(Boolean)}
                    />
                </div>

                <div className="rounded-[2.5rem] border border-black/5 bg-white overflow-hidden shadow-sm">
                    <div className="overflow-x-auto">
                        <table className="min-w-[960px] w-full table-fixed border-collapse">
                            <colgroup>
                                <col style={{ width: '21%' }} />
                                <col style={{ width: '39%' }} />
                                <col style={{ width: '16%' }} />
                                <col style={{ width: '24%' }} />
                            </colgroup>
                            <thead className="border-b border-black/5 bg-[#FCFBF9] text-[10px] font-black uppercase tracking-[0.32em] text-[#8B6A3D]/80">
                                <tr>
                                    <th className="border-r border-black/5 px-8 py-6 text-left">Variable</th>
                                    <th className="border-r border-black/5 px-8 py-6 text-left">Baseline</th>
                                    <th className="border-r border-black/5 px-8 py-6 text-center">Predicted Lift</th>
                                    <th className="px-8 py-6 text-center">Recommendation</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-black/5">
                                {(stressLabRows || []).map((row, i) => (
                                    <tr key={i} className="bg-white transition-colors hover:bg-[#FBFBF6]">
                                        <td className="border-r border-black/5 px-8 py-6 text-left align-top">
                                            <p className="text-[13px] font-black tracking-tight text-[#1a1a1a] uppercase leading-tight">
                                                {normalizeProseText(row.variable)}
                                            </p>
                                        </td>
                                        <td className="border-r border-black/5 px-8 py-6 text-left align-top">
                                            <div className="space-y-2">
                                                {proseParagraphs(row.currentState, 1)
                                                    .slice(0, 3)
                                                    .map((line, idx) => (
                                                        <p key={idx} className="text-[13px] font-medium leading-relaxed break-words text-[#515151]">
                                                            {line}
                                                        </p>
                                                    ))}
                                            </div>
                                        </td>
                                        <td className="border-r border-black/5 px-8 py-6 text-center align-top">
                                            <span
                                                className={`text-[11px] font-black uppercase tracking-widest ${
                                                    row.predictedLift === 'High'
                                                        ? 'text-[#8B6A3D]'
                                                        : row.predictedLift === 'Medium'
                                                            ? 'text-[#1a1a1a]'
                                                            : 'text-[#6B6B6B]'
                                                }`}
                                            >
                                                {row.predictedLift}
                                            </span>
                                        </td>
                                        <td className="px-8 py-6 text-center align-top">
                                            {row.recommendation === 'Test' ? (
                                                <button
                                                    type="button"
                                                    onClick={() => focusVariable(row.variable)}
                                                    className={`inline-flex items-center justify-center border px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-[0.2em] transition-all hover:shadow-sm hover:-translate-y-[1px] ${
                                                        focusedVariable === row.variable
                                                            ? 'border-[#D4A574]/50 text-[#8B6A3D] bg-[#D4A574]/10'
                                                            : 'border-[#D4A574]/30 text-[#8B6A3D] bg-[#D4A574]/5'
                                                    }`}
                                                >
                                                    Test
                                                </button>
                                            ) : (
                                                <span
                                                    className={`inline-block border px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-[0.2em] ${
                                                        row.recommendation === 'Avoid'
                                                            ? 'border-red-500/20 text-red-600 bg-red-50'
                                                            : 'border-black/5 text-[#6B6B6B] bg-[#FBFBF6]'
                                                    }`}
                                                >
                                                    {row.recommendation}
                                                </span>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                <div className="grid gap-8 xl:grid-cols-2">
                    <div className="rounded-[2.5rem] border border-black/5 bg-white p-10 shadow-sm">
                        <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-[#8B6A3D]/80 mb-10">Variable Diagnostics</p>
                        <div className="space-y-4">
                            {(stressLabRows || []).slice(0, 5).map((row) => (
                                <div key={row.variable} className="rounded-2xl border border-black/5 bg-[#FBFBF6] px-8 py-6 group hover:bg-white transition-all hover:shadow-md hover:border-[#D4A574]/20">
                                    <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[#8B6A3D] mb-3">{normalizeProseText(row.variable)}</p>
                                    <p className="text-[13px] leading-relaxed text-[#515151] font-medium">{normalizeProseText(row.proposedShift)}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div ref={gazeRef} className="rounded-[2.5rem] border border-black/5 bg-white p-10 shadow-sm">
                        <div className="flex items-center justify-between gap-6 mb-10">
                            <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-[#8B6A3D]/80">Gaze Direction Breakdown</p>
                            {assetImageUrl ? (
                                <span className="text-[10px] font-bold uppercase tracking-[0.32em] text-[#6B6B6B]">
                                    Source asset attached
                                </span>
                            ) : null}
                        </div>
                        {assetImageUrl ? (
                            <div className="mb-8 overflow-hidden rounded-2xl border border-black/5 bg-[#0c0c0c] p-5">
                                <img
                                    src={assetImageUrl}
                                    alt={assetAlt || 'Creative asset'}
                                    className="max-h-[320px] w-full object-contain"
                                />
                            </div>
                        ) : null}
                        <div className="space-y-4">
                            {[
                                ['Positioning', firstSentence(blueprintData?.technical_specs?.gaze_vector) || 'Upper-center frame priority with directional control.'],
                                ['Direction', firstSentence(dossier?.gaze_topology?.viewer_position) || 'Oblique vector maintains aspirational distance.'],
                                ['Tilt', firstSentence(dossier?.gaze_topology?.mode_of_address) || 'Slight downward bias supports mixed-mode address.'],
                                ['Focus Tone', firstSentence(dossier?.gaze_topology?.reading) || 'Eye contrast retains focal attraction without dominance drift.'],
                            ].map(([label, body]) => (
                                <div key={String(label)} className="rounded-2xl border border-black/5 bg-[#FBFBF6] px-8 py-6 group hover:bg-white transition-all hover:shadow-md hover:border-[#D4A574]/20">
                                    <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[#8B6A3D] mb-3">{normalizeProseText(String(label))}</p>
                                    <p className="text-[13px] leading-relaxed text-[#515151] font-medium">{normalizeProseText(String(body))}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="rounded-[2.5rem] border border-black/5 bg-white p-10 shadow-sm">
                    <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-[#8B6A3D]/80 mb-8">Stress Test Summary</p>
                    <div className="max-w-[78ch] space-y-4">
                        {proseParagraphs(
                            'These stress signals define where controlled adjustments can improve lift without destabilizing the route. Next iteration should prioritize gaze and hierarchy tests first, then validate copy and CTA compression only where structural confidence remains intact.',
                            2,
                        ).map((paragraph, idx) => (
                            <p key={idx} className="text-[14px] leading-relaxed text-[#515151] font-medium">
                                {paragraph}
                            </p>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
