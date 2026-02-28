'use client';

import React from 'react';
import { BulletList } from './ResultsCard';

type RiskFlag = {
    id: string;
    flag: string;
    severity: 'Low' | 'Medium' | 'High';
    why: string;
    receipt_refs?: string[];
};

type RiskData = {
    policy_flags: RiskFlag[];
    risk_score: number;
    explanation: string;
};

type Props = {
    riskData: RiskData;
};

export default function RiskAnalysis({ riskData }: Props) {
    const isHighRisk = riskData.risk_score >= 70;
    const isMediumRisk = riskData.risk_score >= 40 && riskData.risk_score < 70;

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center border
                        ${isHighRisk ? 'bg-red-500/10 border-red-500 text-red-500' : isMediumRisk ? 'bg-yellow-500/10 border-yellow-500 text-yellow-500' : 'bg-green-500/10 border-green-500 text-green-500'}
                    `}>
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                        </svg>
                    </div>
                    <div>
                        <h4 className="text-[14px] font-bold text-[#141414] uppercase tracking-tight">Policy Compliance</h4>
                        <p className="text-[10px] font-bold text-[#6B6B6B] uppercase tracking-widest">Regulatory Risk Assessment</p>
                    </div>
                </div>
                <div className="text-right">
                    <span className={`text-2xl font-light
                        ${isHighRisk ? 'text-red-500' : isMediumRisk ? 'text-yellow-500' : 'text-green-500'}
                    `}>
                        {riskData.risk_score}%
                    </span>
                    <p className="text-[9px] font-bold text-[#6B6B6B] uppercase tracking-tighter">Risk Score</p>
                </div>
            </div>

            <div className="p-5 bg-[#FBF7EF] rounded-2xl border border-[#E7DED1] border-dashed">
                <p className="text-[11px] text-[#141414] leading-relaxed italic">
                    "{riskData.explanation}"
                </p>
            </div>

            {riskData.policy_flags.length > 0 && (
                <div className="space-y-4">
                    <p className="text-[10px] font-bold text-[#141414]/40 uppercase tracking-[0.2em]">Detected Risk Flags:</p>
                    <div className="grid grid-cols-1 gap-3">
                        {riskData.policy_flags.map((item) => (
                            <div
                                key={item.id}
                                className={`p-4 rounded-xl border flex flex-col gap-2 transition-all hover:shadow-sm
                                    ${item.severity === 'High' ? 'bg-red-50/30 border-red-200' : item.severity === 'Medium' ? 'bg-yellow-50/30 border-yellow-200' : 'bg-blue-50/30 border-blue-200'}
                                `}
                            >
                                <div className="flex items-center justify-between">
                                    <span className={`text-[10px] font-bold uppercase tracking-widest flex items-center gap-2
                                        ${item.severity === 'High' ? 'text-red-600' : item.severity === 'Medium' ? 'text-yellow-600' : 'text-blue-600'}
                                    `}>
                                        <span className={`w-1.5 h-1.5 rounded-full ${item.severity === 'High' ? 'bg-red-600' : item.severity === 'Medium' ? 'bg-yellow-600' : 'bg-blue-600'}`} />
                                        {item.flag}
                                    </span>
                                    <span className="text-[8px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full bg-white/60 border border-black/5">
                                        {item.severity} Risk
                                    </span>
                                </div>
                                <p className="text-[11px] text-[#6B6B6B] leading-relaxed">
                                    {item.why}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {!isHighRisk && (
                <div className="pt-4 border-t border-[#E7DED1] flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-green-500/10 flex items-center justify-center text-green-600 shrink-0">
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                            <polyline points="20 6 9 17 4 12" />
                        </svg>
                    </div>
                    <p className="text-[11px] text-[#6B6B6B] leading-relaxed">
                        Creative alignment is within standard platform boundaries. No critical "Hard Block" violations detected.
                    </p>
                </div>
            )}
        </div>
    );
}
