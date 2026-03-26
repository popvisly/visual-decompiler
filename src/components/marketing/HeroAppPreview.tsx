'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { useReducedMotion } from 'framer-motion';

type PreviewState = {
    id: 'signals' | 'psychology' | 'blueprint';
    tab: string;
    shortTab: string;
    title: string;
    subtitle: string;
    tone: string;
    rows?: Array<{ label: string; value: string; level?: string }>;
    cardTitle?: string;
    cardBody?: string;
    note?: string;
};

const PREVIEW_STATES: PreviewState[] = [
    {
        id: 'signals',
        tab: 'Signals',
        shortTab: 'SIG',
        title: 'Diagnostic Signal Stack',
        subtitle: 'Structured forensic extraction from one live creative asset.',
        tone: 'Signals tab',
        rows: [
            { label: 'Gaze Topology', value: 'DIRECT', level: 'High-status address' },
            { label: 'Chromatic Saturation', value: 'High', level: 'Premium code holds' },
            { label: 'Persuasion Density', value: 'High', level: 'Dense signal layering' },
            { label: 'Friction Score', value: 'Low', level: 'Message remains clinical' },
        ],
    },
    {
        id: 'psychology',
        tab: 'Psychology',
        shortTab: 'PSY',
        title: 'Psychological Architecture',
        subtitle: 'Mapping identity, desire, and the core decision triggers.',
        tone: 'Psychology tab',
        rows: [
            { label: 'Aspirational Transfer', value: 'High', level: 'Desire migration active' },
            { label: 'Authority Framing', value: 'Prestige', level: 'Low-friction validation' },
            { label: 'Cognitive Friction', value: 'Balanced', level: 'Optimal message retention' },
        ],
    },
    {
        id: 'blueprint',
        tab: 'Blueprint',
        shortTab: 'BPT',
        title: 'Sovereign Reconstruction',
        subtitle: 'A high-fidelity route teams can brief, test, and deploy.',
        tone: 'Blueprint tab',
        cardTitle: 'Strategic Rebuild',
        cardBody:
            'Preserve the primary prestige anchor, scale the Gaze Vector for better eyeflow, and introduce a contrasting chromatic signal to restore novelty without breaking brand authority.',
        note: 'Dossier export ready for Phase 2 implementation.',
    },
];

const STATE_DURATIONS = [5000, 4500, 4500];
const MAX_TRANSITIONS = 6;

function badgeClasses(value: string) {
    if (value === 'High') {
        return 'border border-red-200 bg-red-50 text-red-700';
    }

    if (value === 'Medium') {
        return 'border border-amber-200 bg-amber-50 text-amber-700';
    }

    return 'border border-emerald-200 bg-emerald-50 text-emerald-700';
}

function useDesktopAnimationEnabled(shouldReduceMotion: boolean) {
    const [isDesktop, setIsDesktop] = useState(false);

    useEffect(() => {
        const media = window.matchMedia('(min-width: 768px)');
        const sync = () => setIsDesktop(media.matches);
        sync();
        media.addEventListener('change', sync);
        return () => media.removeEventListener('change', sync);
    }, []);

    return isDesktop && !shouldReduceMotion;
}

export default function HeroAppPreview() {
    const prefersReducedMotion = useReducedMotion();
    const canAnimate = useDesktopAnimationEnabled(Boolean(prefersReducedMotion));

    const [activeIndex, setActiveIndex] = useState(0);
    const [transitionsDone, setTransitionsDone] = useState(0);
    const [isPaused, setIsPaused] = useState(false);
    const [isTransitioning, setIsTransitioning] = useState(false);

    const timeoutRef = useRef<number | null>(null);
    const startTimeRef = useRef<number>(0);
    const remainingRef = useRef<number>(STATE_DURATIONS[0]);

    const motionComplete = transitionsDone >= MAX_TRANSITIONS;
    const displayIndex = canAnimate && !motionComplete ? activeIndex : 0;

    const clearTimer = () => {
        if (timeoutRef.current !== null) {
            window.clearTimeout(timeoutRef.current);
            timeoutRef.current = null;
        }
    };

    useEffect(() => {
        if (!canAnimate) {
            clearTimer();
            setActiveIndex(0);
            setTransitionsDone(0);
            setIsTransitioning(false);
            remainingRef.current = STATE_DURATIONS[0];
            return;
        }

        if (motionComplete || isPaused) return;

        const delay = remainingRef.current;
        startTimeRef.current = window.performance.now();

        timeoutRef.current = window.setTimeout(() => {
            setIsTransitioning(true);
            setActiveIndex((current) => {
                const next = (current + 1) % PREVIEW_STATES.length;
                remainingRef.current = STATE_DURATIONS[next];
                return next;
            });
            setTransitionsDone((count) => count + 1);
        }, delay);

        return clearTimer;
    }, [activeIndex, canAnimate, isPaused, motionComplete]);

    useEffect(() => {
        if (!isTransitioning) return;
        const timer = window.setTimeout(() => setIsTransitioning(false), 400);
        return () => window.clearTimeout(timer);
    }, [isTransitioning]);

    useEffect(() => {
        if (!motionComplete) return;
        setActiveIndex(0);
        remainingRef.current = STATE_DURATIONS[0];
        clearTimer();
    }, [motionComplete]);

    const visibleStates = useMemo(
        () =>
            PREVIEW_STATES.map((state, index) => ({
                ...state,
                isActive: index === displayIndex,
            })),
        [displayIndex],
    );

    const handlePause = () => {
        if (!canAnimate || motionComplete) return;
        setIsPaused(true);
        const elapsed = window.performance.now() - startTimeRef.current;
        remainingRef.current = Math.max(200, remainingRef.current - elapsed);
        clearTimer();
    };

    const handleResume = () => {
        if (!canAnimate || motionComplete) return;
        setIsPaused(false);
    };

    return (
        <div
            className="relative overflow-hidden rounded-[12px] border border-black/8 bg-[#F8F4EC] shadow-[0_1px_2px_rgba(0,0,0,0.04),0_4px_16px_rgba(0,0,0,0.06),0_12px_40px_rgba(0,0,0,0.05)]"
            onMouseEnter={handlePause}
            onMouseLeave={handleResume}
        >
            <div className="flex items-center gap-3 border-b border-black/6 bg-[rgba(246,240,230,0.88)] px-4 py-3 backdrop-blur-[6px]">
                <div className="flex items-center gap-1.5" aria-hidden="true">
                    <span className="h-2.5 w-2.5 rounded-full bg-[#FF605C]/50" />
                    <span className="h-2.5 w-2.5 rounded-full bg-[#FFBD44]/50" />
                    <span className="h-2.5 w-2.5 rounded-full bg-[#00CA4E]/50" />
                </div>
                <p className="text-[11px] font-semibold tracking-[0.16em] text-[#6E6558]">Visual Decompiler</p>
            </div>

            <div className="p-2.5 sm:p-4 md:p-5">
                <div className="rounded-[10px] border border-[#E4DCCD] bg-[#FBF8F2]">
                    <div className="border-b border-[#E7DED1] px-2.5 py-2.5 sm:px-4 sm:py-3">
                        <div className="relative grid grid-cols-3 gap-1 rounded-full border border-[#E5DBCC] bg-[#F3EDE3] p-1">
                            <div
                                aria-hidden="true"
                                className="absolute inset-y-1 left-1 w-[calc(33.333%-0.333rem)] rounded-full bg-[#141414] transition-[transform,width] duration-300 ease-out"
                                style={{ transform: `translateX(${displayIndex * 100}%)` }}
                            />
                            {PREVIEW_STATES.map((state, index) => (
                                <div
                                    key={state.id}
                                    className={`relative z-10 rounded-full px-2 py-2 text-center text-[10px] font-bold uppercase tracking-[0.2em] transition-colors duration-300 sm:px-3 sm:text-[10px] sm:tracking-[0.18em] ${
                                        index === displayIndex ? 'text-[#FBF7EF]' : 'text-[#766C5F]'
                                    }`}
                                >
                                    <span className="sm:hidden">{state.shortTab}</span>
                                    <span className="hidden sm:inline">{state.tab}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="relative min-h-[250px] overflow-hidden sm:min-h-[320px] lg:min-h-[360px]">
                        {visibleStates.map((state) => (
                            <div
                                key={state.id}
                                className={`absolute inset-0 px-2.5 py-2.5 transition-opacity duration-[400ms] ease-out sm:px-4 sm:py-4 ${
                                    state.isActive ? 'opacity-100' : 'opacity-0'
                                }`}
                                aria-hidden={!state.isActive}
                            >
                                <div className="rounded-[12px] border border-[#E6DDCF] bg-[#FFFCF7] p-3 sm:p-5">
                                    <div className="flex flex-col gap-3 border-b border-[#EEE5D8] pb-3 sm:pb-4 sm:flex-row sm:items-start sm:justify-between">
                                        <div>
                                            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#9A886A]">{state.tone}</p>
                                            <h3 className="mt-2 text-[22px] font-semibold leading-tight tracking-[-0.02em] text-[#151310] sm:text-[22px]">
                                                {state.title}
                                            </h3>
                                            <p className="mt-2 max-w-[34rem] text-[14px] leading-relaxed text-[#6A6257] sm:text-sm">
                                                {state.subtitle}
                                            </p>
                                        </div>
                                        <div className="hidden rounded-full border border-[#E1D5C2] bg-[#F8F2E9] px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.2em] text-[#876F4C] sm:block">
                                            Ready
                                        </div>
                                    </div>

                                    {state.rows ? (
                                        <div className="mt-3 grid gap-2.5 sm:mt-4 sm:gap-3">
                                            {state.rows.map((row, rowIndex) => (
                                                <div
                                                    key={row.label}
                                                    className={`flex items-center justify-between rounded-[12px] border border-[#ECE2D4] bg-[#FBF7F1] px-3 py-2.5 sm:px-4 sm:py-3 ${
                                                        rowIndex === state.rows!.length - 1 ? 'hidden sm:flex' : ''
                                                    }`}
                                                >
                                                    <div>
                                                        <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#9B8662]">
                                                            {row.label}
                                                        </p>
                                                        <p className="mt-1 text-[14px] text-[#6D6459] sm:text-sm">{row.level}</p>
                                                    </div>
                                                    <div className={`rounded-full px-2.5 py-1.5 text-[10px] font-bold uppercase tracking-[0.2em] sm:px-3 sm:text-[10px] sm:tracking-[0.16em] ${badgeClasses(row.value)}`}>
                                                        {row.value}
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    ) : (
                                        <div className="mt-3 grid gap-3 sm:mt-4 sm:gap-4">
                                            <div className="rounded-[14px] border border-[#E5D8C8] bg-[#F7EFE4] p-3 sm:p-4">
                                                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#9B8662]">
                                                    {state.cardTitle}
                                                </p>
                                                <p className="mt-3 max-w-[40rem] text-[14px] leading-[1.7] text-[#40392F] sm:text-[15px] sm:leading-[1.8]">
                                                    {state.cardBody}
                                                </p>
                                            </div>
                                            <div className="rounded-[12px] border border-[#ECE2D4] bg-[#FBF7F1] px-3 py-2.5 text-[14px] text-[#6A6257] sm:px-4 sm:py-3 sm:text-sm">
                                                {state.note}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
