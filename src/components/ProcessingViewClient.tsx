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

const ORBIT_PILLS = [
    'Trigger', 'Narrative', 'Subtext',
    'Evidence', 'Objection', 'Style', 'Confidence',
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
    const [scanY, setScanY] = useState(0);

    const kickWorkerOnce = () => {
        fetch('/api/worker', {
            method: 'POST',
            headers: { 'Authorization': 'Bearer OPEN', 'Content-Type': 'application/json' },
            body: JSON.stringify({}),
        }).catch(() => { });
    };

    // Step cycling
    useEffect(() => {
        const interval = setInterval(() => setStep((s) => (s + 1) % ANALYSIS_STEPS.length), 3000);
        return () => clearInterval(interval);
    }, []);

    // Progress
    useEffect(() => {
        const interval = setInterval(() => {
            setProgress((p) => {
                if (p >= 95) return 95;
                return Math.min(95, p + 2 + Math.floor(Math.random() * 4));
            });
        }, 1800);
        return () => clearInterval(interval);
    }, []);

    // Scan line animation
    useEffect(() => {
        let frame: number;
        let start: number | null = null;
        const animate = (ts: number) => {
            if (!start) start = ts;
            const t = ((ts - start) % 2400) / 2400;
            setScanY(t * 100);
            frame = requestAnimationFrame(animate);
        };
        frame = requestAnimationFrame(animate);
        return () => cancelAnimationFrame(frame);
    }, []);

    // Poll for completion
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
        <div className="w-full min-h-screen bg-[#0D0D0D] flex items-center justify-center px-6 py-16">
            <div className="w-full max-w-lg flex flex-col items-center gap-12">

                {/* Header */}
                <div className="text-center">
                    <p className="text-[9px] font-bold uppercase tracking-[0.5em] text-[#00F0FF]/60 mb-3">
                        Visual Decompiler
                    </p>
                    <h1 className="text-[11px] font-bold uppercase tracking-[0.35em] text-white/90">
                        Intelligence Extraction
                    </h1>
                </div>

                {/* Ad image with scan effect */}
                <div className="relative w-72 h-72">
                    {/* Orbit pills */}
                    <div className="absolute -inset-16 pointer-events-none">
                        {ORBIT_PILLS.map((pill, i) => {
                            const angle = (i / ORBIT_PILLS.length) * 360;
                            const radius = 96;
                            const top = 50 + Math.sin((angle * Math.PI) / 180) * radius;
                            const left = 50 + Math.cos((angle * Math.PI) / 180) * radius;
                            return (
                                <span
                                    key={pill}
                                    className="float-pill absolute px-2.5 py-1 rounded-full text-[9px] font-bold uppercase tracking-[0.12em] border whitespace-nowrap"
                                    style={{
                                        top: `calc(${top}% )`,
                                        left: `calc(${left}% )`,
                                        transform: 'translate(-50%, -50%)',
                                        animationDelay: `${i * -0.4}s`,
                                        color: '#00F0FF',
                                        borderColor: 'rgba(0,240,255,0.2)',
                                        backgroundColor: 'rgba(0,240,255,0.05)',
                                        textShadow: '0 0 12px rgba(0,240,255,0.4)',
                                    }}
                                >
                                    {pill}
                                </span>
                            );
                        })}
                    </div>

                    {/* Image frame */}
                    <div
                        className="w-full h-full rounded-2xl overflow-hidden relative"
                        style={{
                            border: '1px solid rgba(0,240,255,0.15)',
                            boxShadow: '0 0 60px rgba(0,240,255,0.06), inset 0 0 40px rgba(0,0,0,0.4)',
                        }}
                    >
                        <img
                            src={mediaUrl}
                            alt="Analyzing ad"
                            className="w-full h-full object-cover"
                            style={{ filter: 'brightness(0.6) saturate(0.8)' }}
                        />

                        {/* Scan line */}
                        <div
                            className="absolute inset-x-0 pointer-events-none"
                            style={{
                                top: `${scanY}%`,
                                height: '2px',
                                background: 'linear-gradient(90deg, transparent, rgba(0,240,255,0.8), transparent)',
                                boxShadow: '0 0 12px rgba(0,240,255,0.6)',
                                transition: 'none',
                            }}
                        />

                        {/* Dark overlay with grid */}
                        <div
                            className="absolute inset-0"
                            style={{
                                background: 'rgba(0,0,0,0.25)',
                                backgroundImage: 'linear-gradient(rgba(0,240,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(0,240,255,0.03) 1px, transparent 1px)',
                                backgroundSize: '24px 24px',
                            }}
                        />

                        {/* Corner brackets */}
                        {([
                            { style: { top: '8px', left: '8px', borderTopWidth: '1.5px', borderLeftWidth: '1.5px', borderRightWidth: '0', borderBottomWidth: '0' } as React.CSSProperties },
                            { style: { top: '8px', right: '8px', borderTopWidth: '1.5px', borderRightWidth: '1.5px', borderLeftWidth: '0', borderBottomWidth: '0' } as React.CSSProperties },
                            { style: { bottom: '8px', left: '8px', borderBottomWidth: '1.5px', borderLeftWidth: '1.5px', borderTopWidth: '0', borderRightWidth: '0' } as React.CSSProperties },
                            { style: { bottom: '8px', right: '8px', borderBottomWidth: '1.5px', borderRightWidth: '1.5px', borderTopWidth: '0', borderLeftWidth: '0' } as React.CSSProperties },
                        ] as { style: React.CSSProperties }[]).map((corner, i) => (
                            <div
                                key={i}
                                className="absolute w-5 h-5 pointer-events-none"
                                style={{
                                    ...corner.style,
                                    borderColor: 'rgba(0,240,255,0.5)',
                                    borderStyle: 'solid',
                                }}
                            />
                        ))}

                    </div>
                </div>

                {/* Status */}
                <div className="text-center space-y-3 w-full">
                    <div className="flex items-center justify-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-[#00F0FF] animate-pulse" />
                        <p className="text-[13px] font-light text-white/80 tracking-wide">
                            {ANALYSIS_STEPS[step]}
                        </p>
                    </div>
                    <p className="text-[9px] font-bold uppercase tracking-[0.4em] text-white/20">
                        Deep psychological analysis in progress
                    </p>

                    {/* Progress bar */}
                    <div className="w-full h-px bg-white/10 rounded-full overflow-hidden mt-4">
                        <div
                            className="h-full rounded-full transition-all duration-[3000ms] ease-linear"
                            style={{
                                width: `${progress}%`,
                                background: 'linear-gradient(90deg, rgba(0,240,255,0.4), rgba(0,240,255,0.9))',
                                boxShadow: '0 0 8px rgba(0,240,255,0.4)',
                            }}
                        />
                    </div>
                    <div className="flex justify-between text-[8px] font-mono text-white/20 pt-1">
                        <span>INIT</span>
                        <span>{progress}%</span>
                        <span>COMPLETE</span>
                    </div>
                </div>

                {/* Return to Library */}
                <div className="flex flex-col items-center gap-4 pt-2">
                    <a
                        href="/dashboard"
                        className="inline-flex items-center gap-2.5 px-6 py-3 rounded-full text-[11px] font-bold uppercase tracking-[0.2em] transition-all"
                        style={{
                            color: 'rgba(255,255,255,0.6)',
                            border: '1px solid rgba(255,255,255,0.1)',
                            background: 'rgba(255,255,255,0.04)',
                        }}
                        onMouseEnter={(e) => {
                            (e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.9)';
                            (e.currentTarget as HTMLElement).style.borderColor = 'rgba(0,240,255,0.3)';
                            (e.currentTarget as HTMLElement).style.background = 'rgba(0,240,255,0.06)';
                        }}
                        onMouseLeave={(e) => {
                            (e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.6)';
                            (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.1)';
                            (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.04)';
                        }}
                    >
                        <Library className="w-3.5 h-3.5" />
                        Return to Library
                    </a>
                    <p className="text-[10px] text-white/30 text-center max-w-[260px] leading-relaxed">
                        Analysis takes roughly 2–3 minutes. You can browse your library and the completed report will be waiting for you when you return.
                    </p>
                </div>
            </div>
        </div>
    );
}
