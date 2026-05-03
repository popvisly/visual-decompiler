"use client";

import { useState, useEffect } from 'react';
import { ANALYSIS_STEPS, SIGNAL_NODES } from '@/lib/constants';

interface SovereignProcessingViewProps {
    assetId: string;
    agency?: any;
}

export default function SovereignProcessingView({ assetId, agency }: SovereignProcessingViewProps) {
    const [step, setStep] = useState(0);
    const [progress, setProgress] = useState(0);
    const [activeNode, setActiveNode] = useState(0);
    const [checkTrigger, setCheckTrigger] = useState(0);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const interval = setInterval(() => setStep((s) => (s + 1) % ANALYSIS_STEPS.length), 3000);
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
            setProgress((p) => {
                if (p >= 95) return 95;
                return Math.min(95, p + 2 + Math.floor(Math.random() * 4));
            });
        }, 1800);
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        const interval = setInterval(() => setActiveNode((n) => (n + 1) % SIGNAL_NODES.length), 2200);
        return () => clearInterval(interval);
    }, []);

    // Polling trigger: increment checkTrigger every 10 seconds
    useEffect(() => {
        const interval = setInterval(() => setCheckTrigger(prev => prev + 1), 10000);
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        let isMounted = true;
        
        fetch('/api/vault-extract', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ assetId })
        }).then(res => res.json()).then(data => {
            if (!isMounted) return;
            if (data.success) {
                setProgress(100);
                setTimeout(() => window.location.reload(), 800);
            } else if (data.error) {
                setError(data.error);
            }
        }).catch((err) => {
            if (isMounted) setError("Extraction engine timeout or network failure. This usually happens with very complex forensic dossiers.");
        });
        
        return () => { isMounted = false; };
    }, [assetId, checkTrigger]);

    if (error) {
        return (
            <div className="flex flex-col items-center justify-center py-20 animate-in fade-in duration-700 bg-rose-50/10 rounded-2xl border border-rose-500/10 mb-12">
                <div className="w-16 h-16 rounded-full bg-rose-500/10 flex items-center justify-center mb-6">
                    <svg className="w-8 h-8 text-rose-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                </div>
                <h2 className="text-[14px] font-bold text-rose-900 uppercase tracking-widest mb-3">Intelligence Extraction Failed</h2>
                <p className="text-[11px] text-[#1A1A1A]/60 text-center max-w-[320px] leading-relaxed mb-8 px-4 font-medium uppercase tracking-tighter">
                    {error}
                </p>
                <button
                    onClick={() => setCheckTrigger(prev => prev + 1)}
                    className="px-10 py-4 bg-[#FFFCF7] text-[#151310] text-[10px] font-bold uppercase tracking-widest hover:bg-[#8B4513] transition-all rounded-full"
                >
                    Re-Trigger Forensic Scan
                </button>
            </div>
        );
    }

    return (
        <div className="flex flex-col items-center justify-center py-12 animate-in fade-in duration-1000">
            <div className="text-center mb-12">
                <p className="text-[9px] font-bold uppercase tracking-[0.5em] text-[#D4A574] mb-3">
                    {agency?.is_whitelabel_active ? (agency.name || 'Visual Decompiler') : 'Visual Decompiler'}
                </p>
                <h1 className="text-[11px] font-bold uppercase tracking-[0.35em] text-[#D4A574]/80">
                    Intelligence Extraction In Progress
                </h1>
            </div>

            <div className="w-full max-w-sm space-y-3 mb-12">
                {SIGNAL_NODES.map((node, i) => (
                    <div
                        key={node}
                        className="flex items-center gap-4 px-5 py-4 rounded-2xl border transition-all duration-700"
                        style={{
                            borderColor: i === activeNode ? 'rgba(212,165,116,0.3)' : 'rgba(26,26,26,0.04)',
                            backgroundColor: i === activeNode ? 'rgba(212,165,116,0.04)' : 'transparent',
                            boxShadow: i === activeNode ? '0 10px 30px rgba(212,165,116,0.06)' : 'none',
                        }}
                    >
                        <div className={`w-2 h-2 rounded-full ${i === activeNode ? 'bg-[#D4A574] animate-pulse' : 'bg-[#1A1A1A]/10'}`} />
                        <span className={`text-[10px] font-bold uppercase tracking-[0.3em] ${i === activeNode ? 'text-[#1A1A1A]' : 'text-[#1A1A1A]/30'}`}>
                            {node} Signal
                        </span>
                    </div>
                ))}
            </div>

            <div className="w-full max-w-md bg-[#FBFBF6] rounded-3xl border border-[#D4A574]/12 p-8 shadow-sm">
                <div className="flex items-center justify-between gap-4 mb-6">
                    <span className="text-[9px] font-bold uppercase tracking-[0.4em] text-[#D4A574]">
                        Processing Trace: {ANALYSIS_STEPS[step]}
                    </span>
                    <span className="text-[11px] font-black text-[#1A1A1A] tabular-nums">
                        {progress}%
                    </span>
                </div>
                
                <div className="h-1 w-full bg-[#1A1A1A]/5 rounded-full overflow-hidden">
                    <div 
                        className="h-full bg-[#D4A574] transition-all duration-700 ease-out shadow-[0_0_8px_rgba(212,165,116,0.4)]"
                        style={{ width: `${progress}%` }}
                    />
                </div>

                <div className="mt-8 flex items-center justify-between border-t border-[#1A1A1A]/5 pt-6">
                    <div className="flex gap-1.5">
                        {[0, 1, 2, 3].map((i) => (
                            <div 
                                key={i} 
                                className={`w-1.5 h-1.5 rounded-full transition-colors duration-500 ${i <= step % 4 ? 'bg-[#D4A574]' : 'bg-[#1A1A1A]/10'}`} 
                            />
                        ))}
                    </div>
                    <span className="text-[8px] font-bold uppercase tracking-[0.3em] text-[#1A1A1A]/40">
                        Forensic Ingestion active
                    </span>
                </div>
            </div>

            <p className="mt-12 text-[10px] text-[#1A1A1A]/40 font-medium uppercase tracking-[0.25em] text-center max-w-xs leading-relaxed">
                Assembling high-fidelity forensic data points into a structured strategic dossier.
            </p>
        </div>
    );
}
