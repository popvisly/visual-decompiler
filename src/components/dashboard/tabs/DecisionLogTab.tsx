"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { History, Trash2, Clipboard } from 'lucide-react';
import WorkspaceTabHeader from '@/components/dashboard/WorkspaceTabHeader';
import WorkspaceDecisionSummary from '@/components/dashboard/WorkspaceDecisionSummary';
import CountUpPercent from '@/components/CountUpPercent';
import { DecisionLogEntry, IntegratedRecommendationData } from '@/types/dashboard';
import { proseParagraphs } from '@/lib/utils';

interface DecisionLogTabProps {
    decisionLogEntries: DecisionLogEntry[];
    extraction: any;
    handleClearDecisionLog: () => void;
    integratedRecommendation: IntegratedRecommendationData;
    decisionSummaryText: string;
    decisionSummaryTimestamp: string;
    decisionVerdict: string;
}

export default function DecisionLogTab({
    decisionLogEntries,
    extraction,
    handleClearDecisionLog,
    integratedRecommendation,
    decisionSummaryText,
    decisionSummaryTimestamp,
    decisionVerdict,
}: DecisionLogTabProps) {
    const normalizeProseText = (value: string | undefined | null) => {
        if (!value) return '';
        return value.replace(/\s+/g, ' ').trim();
    };

    const verdictTone =
        decisionVerdict === 'Ship'
            ? 'text-[#8B6A3D]'
            : decisionVerdict === 'Revise'
                ? 'text-[#141414]'
                : 'text-[#d9a69c]';

    return (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex flex-col gap-6">
                <div className="px-0">
                    <WorkspaceTabHeader
                        kicker="Decision Audit"
                        title="Decision Log & Forensic Verdict"
                        intro="A persistent ledger of asset verdicts, rationale, and mandatory P1 fixes recorded during the diagnostic process."
                    />
                    <WorkspaceDecisionSummary
                        eyebrow="Audit Status"
                        title={decisionLogEntries.length > 0 ? `Vault contains ${decisionLogEntries.length} recorded diagnostic sessions.` : 'No diagnostic sessions have been committed to the vault.'}
                        body="Every verdict is captured with full rationale and evidence anchors to ensure the creative route is defensible and the strategic intent is preserved through production."
                        metrics={[
                            { label: 'Total Logs', value: decisionLogEntries.length },
                            { label: 'Latest Verdict', value: decisionVerdict || 'Pending' },
                            { label: 'Vault Status', value: 'Active' },
                        ]}
                        actions={[
                            'Review the latest rationale before briefing production.',
                            'Ensure all P1 fixes are addressed in the next variant.',
                            'Export the log for stakeholder alignment.',
                        ]}
                    />
                </div>

                <div className="flex flex-col gap-6">
                    <div className="rounded-[2.5rem] border border-black/5 bg-white p-10 text-[#141414] shadow-sm flex flex-col">
                        <div className="flex items-center justify-between gap-8 mb-10 border-b border-black/5 pb-6">
                            <div className="flex items-center gap-6">
                                <div className="h-14 w-14 rounded-2xl bg-[#FBFBF6] border border-black/5 flex items-center justify-center text-[#8B6A3D]">
                                    <History className="h-6 w-6" />
                                </div>
                                <div>
                                    <p className="text-[10px] font-black uppercase tracking-[0.34em] text-[#8B6A3D]">Latest Forensic Verdict</p>
                                    <p className="mt-1 text-[15px] font-medium text-[#515151]">The current standing recommendation for this asset.</p>
                                </div>
                            </div>
                            <button
                                onClick={() => navigator.clipboard.writeText(decisionSummaryText)}
                                className="flex items-center gap-3 border border-black/10 bg-white px-6 py-3 text-[10px] font-black uppercase tracking-[0.3em] text-[#141414] transition-all hover:bg-[#141414] hover:text-white shadow-sm rounded-full"
                            >
                                <Clipboard className="h-4 w-4" />
                                Copy Summary
                            </button>
                        </div>

                        <div className="rounded-[1.8rem] border border-black/5 bg-[#FBFBF6] p-10 overflow-hidden relative group">
                            <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
                                <Clipboard className="h-24 w-24 text-[#8B6A3D]" />
                            </div>
                            <div className="grid gap-8 xl:grid-cols-[220px_1fr]">
                                <div className="space-y-8">
                                    <div>
                                        <p className="mb-2 text-[10px] font-black uppercase tracking-[0.16em] text-[#8B6A3D]">Timestamp</p>
                                        <p className="text-[14px] font-bold text-[#141414]">{decisionSummaryTimestamp}</p>
                                    </div>
                                    <div>
                                        <p className="mb-2 text-[10px] font-black uppercase tracking-[0.16em] text-[#8B6A3D]">Verdict</p>
                                        <p className={`text-[18px] font-black uppercase tracking-tight ${verdictTone}`}>{decisionVerdict || 'Pending'}</p>
                                    </div>
                                    <div className="pt-2">
                                        <p className="mb-4 text-[10px] font-black uppercase tracking-[0.16em] text-[#8B6A3D]">Vault Load</p>
                                        <div className="text-[72px] font-black leading-none tracking-tight text-[#141414] tabular-nums">
                                            <CountUpPercent value={Math.max(0, Math.min(100, decisionLogEntries.length * 10))} />
                                        </div>
                                        <p className="mt-2 text-[10px] font-sans font-medium uppercase tracking-[0.14em] text-[#141414]/45">
                                            Decision Activity Index
                                        </p>
                                        <div className="mt-5 h-2 w-full overflow-hidden rounded-full bg-black/5">
                                            <motion.div
                                                className="h-full bg-[#8B6A3D]"
                                                initial={{ width: 0 }}
                                                whileInView={{ width: `${Math.max(0, Math.min(100, decisionLogEntries.length * 10))}%` }}
                                                viewport={{ once: true }}
                                                transition={{ duration: 1.35, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="space-y-4">
                                    <p className="text-[10px] font-black uppercase tracking-[0.16em] text-[#8B6A3D]">Operating Status</p>
                                    <div className="space-y-4">
                                        {proseParagraphs(integratedRecommendation.recommendedDirection, 2).map((paragraph, idx) => (
                                            <p key={idx} className="text-[15px] font-medium leading-relaxed text-[#515151]">
                                                {paragraph}
                                            </p>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="rounded-[2.5rem] border border-black/5 bg-white p-10 shadow-sm">
                        <div className="flex items-center gap-3 mb-8">
                            <p className="text-[10px] font-black uppercase tracking-[0.4em] text-[#8B6A3D]">Audit Purpose</p>
                            <div className="h-px w-8 bg-black/10" />
                        </div>
                        <div className="max-w-[78ch] space-y-4">
                            <p className="text-[15px] leading-relaxed text-[#515151] font-medium">
                                This log ensures every decision is documented for future reference and accountability, supporting a transparent creative process.
                            </p>
                        </div>
                    </div>

                    <div className="rounded-[2.5rem] border border-black/5 bg-white p-10 shadow-sm flex flex-col">
                        <div className="flex items-center justify-between gap-4 mb-10 border-b border-black/5 pb-6">
                            <p className="text-[11px] font-black uppercase tracking-[0.34em] text-[#8B6A3D]">Decision History</p>
                            <button
                                onClick={handleClearDecisionLog}
                                className="p-3 text-[#515151] hover:text-[#d9a69c] transition-colors rounded-full hover:bg-red-50"
                                title="Clear Log"
                            >
                                <Trash2 className="h-5 w-5" />
                            </button>
                        </div>
                        <div className="space-y-5">
                            {decisionLogEntries.length > 0 ? (
                                decisionLogEntries.map((entry) => (
                                    <div key={entry.id} className="rounded-[1.8rem] border border-black/5 bg-[#FBFBF6] p-8 transition-all hover:bg-white hover:shadow-md">
                                        <div className="mb-6 flex items-center justify-between gap-4">
                                            <span
                                                className={`inline-block rounded-full border px-5 py-2 text-[10px] font-black uppercase tracking-[0.22em] ${
                                                    entry.verdict === 'Ship'
                                                        ? 'border-[#8B6A3D]/30 text-[#8B6A3D] bg-[#8B6A3D]/5'
                                                        : entry.verdict === 'Revise'
                                                            ? 'border-black/10 text-[#141414] bg-white'
                                                            : 'border-[#d9a69c]/30 text-[#d9a69c] bg-[#d9a69c]/5'
                                                }`}
                                            >
                                                {entry.verdict}
                                            </span>
                                            <span className="text-[10px] font-bold text-[#6B6B6B] uppercase tracking-[0.14em] opacity-40">
                                                {new Date(entry.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} //{' '}
                                                {new Date(entry.timestamp).toLocaleDateString([], { day: '2-digit', month: 'short' })}
                                            </span>
                                        </div>
                                        <div className="mb-8 space-y-4">
                                            {proseParagraphs(entry.rationale, 2).map((paragraph, idx) => (
                                                <p key={idx} className="text-[14px] font-medium leading-relaxed text-[#515151]">
                                                    {paragraph}
                                                </p>
                                            ))}
                                        </div>
                                        <div className="pt-6 border-t border-black/5">
                                            <p className="mb-3 text-[10px] font-black uppercase tracking-[0.18em] text-[#8B6A3D]">P1 Fix Required</p>
                                            <p className="text-[13px] leading-relaxed text-[#141414] font-black uppercase">{normalizeProseText(entry.p1Fix)}</p>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className="flex flex-col items-center justify-center py-20 text-center opacity-30">
                                    <History className="h-12 w-12 mb-6" />
                                    <p className="text-[10px] font-black uppercase tracking-[0.34em]">Vault Empty</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
