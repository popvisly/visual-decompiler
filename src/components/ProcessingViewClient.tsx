'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
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
    onComplete?: (digest: any) => void;
};

export default function ProcessingViewClient({ mediaUrl, jobId, onComplete }: Props) {
    const router = useRouter();
    const [step, setStep] = useState(0);
    const [dots, setDots] = useState('');
    const [progress, setProgress] = useState(0); // 0..95 (we reserve the last 5% for completion)
    // Fire-and-forget worker kick — DON'T await the response.
    // The worker takes ~3 min for Vision API; we poll job status separately.
    const kickWorkerOnce = () => {
        fetch('/api/worker', {
            method: 'POST',
            headers: {
                'Authorization': 'Bearer OPEN',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({}),
        }).catch(() => { /* ignore — fire and forget */ });
    };

    // Progress text cycling (keeps the page feeling alive)
    useEffect(() => {
        const interval = setInterval(() => {
            setStep((s) => (s + 1) % ANALYSIS_STEPS.length);
        }, 3000);
        return () => clearInterval(interval);
    }, []);

    // Monotonic progress bar (never goes backwards)
    useEffect(() => {
        const interval = setInterval(() => {
            setProgress((p) => {
                if (p >= 95) return 95;
                // Ease forward in small, slightly random increments.
                const bump = 2 + Math.floor(Math.random() * 4); // 2..5
                return Math.min(95, p + bump);
            });
        }, 1800);
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
                // Auto-kick the worker so the processing page actually completes.
                // The worker endpoint is throttled server-side to prevent abuse.
                // You can disable this by setting NEXT_PUBLIC_ALLOW_CLIENT_WORKER_KICK="false".
                const allowWorkerKick =
                    process.env.NEXT_PUBLIC_ALLOW_CLIENT_WORKER_KICK !== 'false';

                if (allowWorkerKick && (attempts === 0 || attempts % 4 === 0)) {
                    kickWorkerOnce(); // fire-and-forget — no await
                }

                // Then check the job status
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
            <div className="flex flex-col items-center gap-16">
                {/* Media preview with orbit pills */}
                <div className="relative mb-10">
                    {/* Orbiting pills */}
                    <div className="absolute -inset-16 pointer-events-none">
                        {ORBIT_PILLS.map((pill, i) => {
                            // Place pills around the square canvas.
                            // We also add a small per-pill offset so they don't collide with buttons below.
                            const angle = (i / ORBIT_PILLS.length) * 360;
                            let radius = 92;
                            let dx = 0;
                            let dy = 0;

                            // Nudge the "Subtext" pill upward/left a bit so it doesn't overlap the action buttons.
                            if (pill.toLowerCase() === 'subtext') {
                                radius = 104;
                                dx = -10;
                                dy = -22;
                            }

                            const top = 50 + Math.sin((angle * Math.PI) / 180) * radius;
                            const left = 50 + Math.cos((angle * Math.PI) / 180) * radius;

                            return (
                                <span
                                    key={pill}
                                    className="float-pill absolute px-2.5 py-1 rounded-full text-[9px] font-bold uppercase tracking-[0.12em] text-[#6B6B6B] border border-[#E7DED1] bg-[#FBF7EF]/90 shadow-sm whitespace-nowrap backdrop-blur"
                                    style={{
                                        top: `calc(${top}% + ${dy}px)`,
                                        left: `calc(${left}% + ${dx}px)`,
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
                    <div className="w-64 h-64 rounded-[20px] overflow-hidden border border-[#E7DED1] shadow-[0_20px_60px_rgba(20,20,20,0.08)] bg-white relative">
                        {isVideo ? (
                            <video
                                src={mediaUrl}
                                className="w-full h-full object-cover opacity-80"
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
                                className="w-full h-full object-cover opacity-80"
                            />
                        )}
                        {/* Overlay */}
                        <div className="absolute inset-0 bg-[#FBF7EF]/30 flex items-center justify-center backdrop-blur-[2px]">
                            <div className="rounded-2xl p-4 bg-white/80 border border-[#E7DED1] shadow-sm backdrop-blur-md">
                                <Loader2 className="w-8 h-8 text-[#141414] animate-spin" />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Status text */}
                <div className="text-center">
                    <p className="text-[14px] font-medium text-[#141414] mb-1.5">
                        {ANALYSIS_STEPS[step]}{dots}
                    </p>
                    <p className="text-[#6B6B6B] text-[10px] font-bold uppercase tracking-[0.15em]">
                        Deep psychological analysis in progress
                    </p>
                </div>

                {/* Progress bar */}
                <div className="w-64 h-1.5 rounded-full bg-[#E7DED1] overflow-hidden shadow-inner">
                    <div
                        className="h-full bg-[#141414] rounded-full transition-all duration-[3000ms] ease-linear"
                        style={{ width: `${progress}%` }}
                    />
                </div>

                <div className="mt-6 flex flex-col items-center gap-3">
                    <a
                        href="/dashboard"
                        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-[13px] font-medium text-[#141414]/70 border border-[#E7DED1] bg-white/50 hover:bg-white hover:border-[#D8CCBC] hover:shadow-[0_10px_30px_rgba(20,20,20,0.05)] transition-all"
                    >
                        Return to Library
                    </a>
                </div>
            </div>
        </div>
    );
}
