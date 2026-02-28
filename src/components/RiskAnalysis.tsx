'use client';

import React from 'react';
import { BulletList } from './ResultsCard';

type RiskData = {
    policy_flags: string[];
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
                <div className="space-y-3">
                    <p className="text-[10px] font-bold text-[#141414]/40 uppercase tracking-[0.2em]">Detected Risk Flags:</p>
                    <div className="flex flex-wrap gap-2">
                        {riskData.policy_flags.map((flag) => (
                            <span
                                key={flag}
                                className="px-3 py-1.5 rounded-xl bg-white border border-red-500/20 text-red-500 text-[10px] font-bold uppercase tracking-wide flex items-center gap-2"
                            >
                                <span className="w-1.5 h-1.5 rounded-full bg-red-500" />
                                {flag}
                            </span>
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
