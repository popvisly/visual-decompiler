'use client';

import { useState, useEffect, useCallback } from 'react';
import { Loader2 } from 'lucide-react';

const ANALYSIS_STEPS = [
    'Extracting visual elements…',
    'Analyzing trigger mechanics…',
    'Decoding semiotic subtext…',
    'Mapping narrative framework…',
    'Identifying evidence anchors…',
    'Evaluating persuasion strategy…',
    'Computing confidence scores…',
    'Assembling intelligence report…',
];

const ORBIT_PILLS = [
    'Trigger', 'Narrative', 'Subtext',
    'Evidence', 'Objection', 'Style', 'Confidence',
];

type Props = {
    mediaUrl: string;
    jobId: string;
    onComplete: (digest: any) => void;
};

export default function ProcessingView({ mediaUrl, jobId, onComplete }: Props) {
    const [step, setStep] = useState(0);
    const [dots, setDots] = useState('');

    // Progress step cycling
    useEffect(() => {
        const interval = setInterval(() => {
            setStep((s) => (s + 1) % ANALYSIS_STEPS.length);
        }, 3000);
        return () => clearInterval(interval);
    }, []);

    // Dots animation
    useEffect(() => {
        const interval = setInterval(() => {
            setDots((d) => (d.length >= 3 ? '' : d + '.'));
        }, 500);
        return () => clearInterval(interval);
    }, []);

    // Poll for completion
    useEffect(() => {
        let cancelled = false;
        let attempts = 0;
        const maxAttempts = 60; // 5 min max

        const poll = async () => {
            try {
                // First trigger the worker
                if (attempts === 0 || attempts % 6 === 0) {
                    await fetch('/api/worker', {
                        method: 'POST',
                        headers: {
                            'Authorization': 'Bearer OPEN',
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({}),
                    }).catch(() => { });
                }

                // Then check the job status
                const res = await fetch(`/api/digests/${jobId}`);
                if (res.ok) {
                    const data = await res.json();
                    if (data.status === 'processed' && data.digest) {
                        if (!cancelled) onComplete(data);
                        return;
                    }
                    if (data.status === 'failed') {
                        if (!cancelled) onComplete({ ...data, _error: 'Analysis failed. Please try again.' });
                        return;
                    }
                }
            } catch (e) {
                // continue polling
            }

            attempts++;
            if (attempts < maxAttempts && !cancelled) {
                setTimeout(poll, 5000);
            }
        };

        const timeout = setTimeout(poll, 2000);
        return () => { cancelled = true; clearTimeout(timeout); };
    }, [jobId, onComplete]);

    const isVideo = /\.(mp4|mov|webm|avi)/i.test(mediaUrl);

    return (
        <div className="w-full max-w-3xl mx-auto page-enter">
            <div className="flex flex-col items-center gap-10">
                {/* Media preview with orbit pills */}
                <div className="relative">
                    {/* Orbiting pills */}
                    <div className="absolute -inset-16 pointer-events-none">
                        {ORBIT_PILLS.map((pill, i) => {
                            const angle = (i / ORBIT_PILLS.length) * 360;
                            const radius = 48;
                            return (
                                <span
                                    key={pill}
                                    className="float-pill absolute px-2.5 py-1 rounded-full text-[9px] font-bold uppercase tracking-[0.12em] text-txt-on-dark-muted border border-white/8 bg-white/3 whitespace-nowrap"
                                    style={{
                                        top: `${50 + Math.sin((angle * Math.PI) / 180) * radius}%`,
                                        left: `${50 + Math.cos((angle * Math.PI) / 180) * radius}%`,
                                        transform: 'translate(-50%, -50%)',
                                        animationDelay: `${i * -0.4}s`,
                                    }}
                                >
                                    {pill}
                                </span>
                            );
                        })}
                    </div>

                    {/* Media thumbnail */}
                    <div className="w-64 h-64 rounded-2xl overflow-hidden border border-white/10 bg-surface relative">
                        {isVideo ? (
                            <video
                                src={mediaUrl}
                                className="w-full h-full object-cover opacity-70"
                                muted
                                playsInline
                                autoPlay
                                loop
                                preload="metadata"
                            />
                        ) : (
                            <img
                                src={mediaUrl}
                                alt="Analyzing ad"
                                className="w-full h-full object-cover opacity-70"
                            />
                        )}
                        {/* Overlay */}
                        <div className="absolute inset-0 bg-surface/40 flex items-center justify-center">
                            <div className="pulse-accent rounded-full p-3">
                                <Loader2 className="w-8 h-8 text-accent animate-spin" />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Status text */}
                <div className="text-center">
                    <p className="text-sm font-medium text-txt-on-dark mb-1">
                        {ANALYSIS_STEPS[step]}{dots}
                    </p>
                    <p className="spec-label-dark">
                        Deep psychological analysis in progress
                    </p>
                </div>

                {/* Progress bar */}
                <div className="w-64 h-1 rounded-full bg-white/5 overflow-hidden">
                    <div
                        className="h-full bg-accent rounded-full transition-all duration-[3000ms] ease-linear"
                        style={{ width: `${((step + 1) / ANALYSIS_STEPS.length) * 100}%` }}
                    />
                </div>
            </div>
        </div>
    );
}
