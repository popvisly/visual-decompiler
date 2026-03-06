'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Library } from 'lucide-react';

const ANALYSIS_STEPS = [
    'Extracting visual elements',
    'Analyzing trigger mechanics',
    'Decoding semiotic subtext',
    'Mapping narrative framework',
    'Identifying evidence anchors',
    'Evaluating persuasion strategy',
    'Computing confidence scores',
    'Assembling intelligence report',
];

const SIGNAL_NODES = [
    'Trigger', 'Narrative', 'Evidence',
    'Subtext', 'Archetype', 'Confidence',
];

type Props = {
    mediaUrl: string;
    mediaKind?: string;
    jobId: string;
    onComplete?: (digest: any) => void;
};

export default function ProcessingViewClient({ mediaUrl, mediaKind = 'image', jobId, onComplete }: Props) {
    const router = useRouter();
    const [step, setStep] = useState(0);
    const [progress, setProgress] = useState(0);
    const [activeNode, setActiveNode] = useState(0);

    const kickWorkerOnce = () => {
        fetch('/api/worker', {
            method: 'POST',
            headers: { 'Authorization': 'Bearer OPEN', 'Content-Type': 'application/json' },
            body: JSON.stringify({}),
        }).catch(() => { });
    };

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

    useEffect(() => {
        let cancelled = false;
        let attempts = 0;
        const maxAttempts = 60;

        const poll = async () => {
            try {
                const allowWorkerKick = process.env.NEXT_PUBLIC_ALLOW_CLIENT_WORKER_KICK !== 'false';
                if (allowWorkerKick && (attempts === 0 || attempts % 4 === 0)) kickWorkerOnce();

                const res = await fetch(`/api/digests/${jobId}`);
                if (res.ok) {
                    const data = await res.json();
                    if ((data.status === 'processed' || data.status === 'needs_review') && data.digest) {
                        if (!cancelled) {
                            if (onComplete) onComplete(data);
                            else router.push(`/dashboard/${jobId}?new=true`);
                        }
                        return;
                    }
                    if (data.status === 'failed') {
                        if (!cancelled) {
                            if (onComplete) onComplete({ ...data, _error: 'Analysis failed. Please try again.' });
                            else router.push('/dashboard?error=analysis_failed');
                        }
                        return;
                    }
                }
            } catch (e) { }
            attempts++;
            if (attempts < maxAttempts && !cancelled) setTimeout(poll, 5000);
        };

        const timeout = setTimeout(poll, 2000);
        return () => { cancelled = true; clearTimeout(timeout); };
    }, [jobId, onComplete]);

    return (
        <div className="w-full min-h-screen bg-[#F6F1E7] flex items-center justify-center px-6 py-16">
            <div className="w-full max-w-2xl flex flex-col items-center gap-10">

                {/* Header */}
                <div className="text-center">
                    <p className="text-[9px] font-bold uppercase tracking-[0.5em] text-[#C1A67B] mb-3">
                        Visual Decompiler
                    </p>
                    <h1 className="text-[11px] font-bold uppercase tracking-[0.35em] text-[#141414]/80">
                        Intelligence Extraction In Progress
                    </h1>
                </div>

                {/* Main layout: Image + Signal Nodes */}
                <div className="w-full flex flex-col md:flex-row items-center gap-8">

                    {/* Ad Image — adaptive aspect ratio */}
                    <div className="relative flex-shrink-0 w-full md:w-[280px]">
                        <div
                            className="w-full rounded-2xl overflow-hidden relative bg-[#141414]"
                            style={{
                                border: '1px solid rgba(20,20,20,0.12)',
                                boxShadow: '0 20px 60px rgba(20,20,20,0.12)',
                            }}
                        >
                            {/* Header bar */}
                            <div className="bg-[#141414] text-[9px] font-bold tracking-[0.2em] px-4 py-2.5 uppercase flex justify-between items-center">
                                <span className="flex items-center gap-2 text-[#C1A67B]">
                                    <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse shadow-[0_0_6px_rgba(74,222,128,0.5)]" />
                                    Analyzing
                                </span>
                                <span className="text-white/20 font-mono text-[8px]">ASSET_01</span>
                            </div>

                            {/* Image — natural aspect ratio, no forced square */}
                            <div className="relative">
                                <img
                                    src={mediaUrl}
                                    alt="Analyzing ad"
                                    className="w-full h-auto max-h-[420px] object-contain bg-[#0D0D0D]"
                                />

                                {/* Subtle scan line */}
                                <div
                                    className="absolute inset-x-0 pointer-events-none"
                                    style={{
                                        top: `${((Date.now() / 24) % 100)}%`,
                                        height: '1px',
                                        background: 'linear-gradient(90deg, transparent, rgba(193,166,123,0.6), transparent)',
                                        boxShadow: '0 0 8px rgba(193,166,123,0.3)',
                                        animation: 'scan 3s linear infinite',
                                    }}
                                />

                                {/* Corner brackets */}
                                <div className="absolute top-2 left-2 w-4 h-4 border-l-[1.5px] border-t-[1.5px] border-[#C1A67B]/50 pointer-events-none" />
                                <div className="absolute top-2 right-2 w-4 h-4 border-r-[1.5px] border-t-[1.5px] border-[#C1A67B]/50 pointer-events-none" />
                                <div className="absolute bottom-2 left-2 w-4 h-4 border-l-[1.5px] border-b-[1.5px] border-[#C1A67B]/50 pointer-events-none" />
                                <div className="absolute bottom-2 right-2 w-4 h-4 border-r-[1.5px] border-b-[1.5px] border-[#C1A67B]/50 pointer-events-none" />
                            </div>
                        </div>
                    </div>

                    {/* Signal Nodes — organized vertical list */}
                    <div className="flex-1 w-full space-y-3">
                        {SIGNAL_NODES.map((node, i) => (
                            <div
                                key={node}
                                className="flex items-center gap-3 px-4 py-3 rounded-xl border transition-all duration-500"
                                style={{
                                    borderColor: i === activeNode ? 'rgba(193,166,123,0.4)' : 'rgba(20,20,20,0.06)',
                                    backgroundColor: i === activeNode ? 'rgba(193,166,123,0.06)' : 'transparent',
                                    boxShadow: i === activeNode ? '0 4px 20px rgba(193,166,123,0.08)' : 'none',
                                }}
                            >
                                <div
                                    className="w-2 h-2 rounded-full transition-all duration-500 flex-shrink-0"
                                    style={{
                                        backgroundColor: i < activeNode ? '#C1A67B' : i === activeNode ? '#C1A67B' : 'rgba(20,20,20,0.12)',
                                        boxShadow: i === activeNode ? '0 0 8px rgba(193,166,123,0.5)' : 'none',
                                    }}
                                />
                                <span
                                    className="text-[11px] font-bold uppercase tracking-[0.15em] transition-colors duration-500"
                                    style={{
                                        color: i === activeNode ? '#141414' : i < activeNode ? '#141414' : 'rgba(20,20,20,0.30)',
                                    }}
                                >
                                    {node}
                                </span>
                                {i === activeNode && (
                                    <span className="ml-auto text-[8px] font-mono text-[#C1A67B] tracking-wider">PROCESSING</span>
                                )}
                                {i < activeNode && (
                                    <span className="ml-auto text-[8px] font-mono text-[#C1A67B]/50 tracking-wider">ANALYSING</span>
                                )}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Status + Progress */}
                <div className="text-center space-y-4 w-full max-w-md">
                    <div className="flex items-center justify-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-[#C1A67B] animate-pulse" />
                        <p className="text-[13px] font-medium text-[#141414]/70 tracking-wide">
                            {ANALYSIS_STEPS[step]}
                        </p>
                    </div>
                    <p className="text-[9px] font-bold uppercase tracking-[0.4em] text-[#141414]/20">
                        Deep psychological analysis in progress
                    </p>

                    {/* Progress bar */}
                    <div className="w-full h-[2px] bg-[#E7DED1] rounded-full overflow-hidden">
                        <div
                            className="h-full rounded-full transition-all duration-[3000ms] ease-linear"
                            style={{
                                width: `${progress}%`,
                                background: 'linear-gradient(90deg, #C1A67B, #D4B88A)',
                            }}
                        />
                    </div>
                    <div className="flex justify-between text-[8px] font-mono text-[#141414]/20 pt-0.5">
                        <span>INIT</span>
                        <span>{progress}%</span>
                        <span>COMPLETE</span>
                    </div>
                </div>

                {/* Return to Library */}
                <div className="flex flex-col items-center gap-4 pt-2">
                    <a
                        href="/dashboard"
                        className="inline-flex items-center gap-2.5 px-6 py-3 rounded-full text-[11px] font-bold uppercase tracking-[0.2em] text-[#141414]/60 border border-[#E7DED1] bg-white/50 hover:bg-white hover:border-[#C1A67B]/40 hover:text-[#141414] hover:shadow-[0_10px_30px_rgba(20,20,20,0.06)] transition-all"
                    >
                        <Library className="w-3.5 h-3.5" />
                        Return to Library
                    </a>
                    <p className="text-[11px] text-[#6B6B6B] text-center max-w-[300px] leading-relaxed">
                        Analysis takes roughly 2–3 minutes. You can browse your library and the completed report will be waiting for you when you return.
                    </p>
                </div>
            </div>

            <style dangerouslySetInnerHTML={{
                __html: `
                @keyframes scan {
                    0% { top: 0%; }
                    100% { top: 100%; }
                }
            `}} />
        </div>
    );
}
