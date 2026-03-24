'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { useReducedMotion } from 'framer-motion';

type PreviewState = {
    id: 'signals' | 'psychology' | 'blueprint';
    tab: string;
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
        title: 'Signal Stack',
        subtitle: 'Structured extraction from one live creative asset.',
        tone: 'Signals tab',
        rows: [
            { label: 'Scarcity Cue', value: 'High', level: 'Status-loaded urgency' },
            { label: 'Status Signaling', value: 'Medium', level: 'Premium code holds' },
            { label: 'Narrative Arc', value: 'High', level: 'Clear aspirational pull' },
            { label: 'Friction Risk', value: 'Low', level: 'Message remains legible' },
        ],
    },
    {
        id: 'psychology',
        tab: 'Psychology',
        title: 'Psychology Verdict',
        subtitle: 'How the asset shapes identity, desire, and action momentum.',
        tone: 'Psychology tab',
        rows: [
            { label: 'Emotional Driver', value: 'Heritage attraction', level: 'Low-friction authority' },
            { label: 'Narrative Arc', value: 'Desire transfer', level: 'Product inherits status' },
            { label: 'Decision Pressure', value: 'Measured', level: 'Prestige without overclaim' },
        ],
    },
    {
        id: 'blueprint',
        tab: 'Blueprint',
        title: 'Rebuild Blueprint',
        subtitle: 'A reconstruction route teams can brief, test, and present.',
        tone: 'Blueprint tab',
        cardTitle: 'Reconstruction prompt',
        cardBody:
            'Preserve the prestige anchor, sharpen the hero-object framing, and introduce one disruptive contrast cue to restore novelty without breaking authority.',
        note: 'Blueprint output ready for briefing and next-route testing.',
    },
];

const STATE_DURATIONS = [5000, 4500, 4500];
const MAX_TRANSITIONS = 6;

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
            className="relative overflow-hidden rounded-[12px] border border-[#D9D1C4] bg-[#F8F4EC] shadow-[0_28px_70px_rgba(20,20,20,0.12)]"
            onMouseEnter={handlePause}
            onMouseLeave={handleResume}
        >
            <div className="flex items-center gap-3 border-b border-[#E5DDD0] bg-[#F6F0E6] px-4 py-3">
                <div className="flex items-center gap-1.5" aria-hidden="true">
                    <span className="h-2.5 w-2.5 rounded-full bg-[#D4B690]" />
                    <span className="h-2.5 w-2.5 rounded-full bg-[#DDD3C5]" />
                    <span className="h-2.5 w-2.5 rounded-full bg-[#E8E0D5]" />
                </div>
                <p className="text-[11px] font-semibold tracking-[0.16em] text-[#6E6558]">Visual Decompiler</p>
            </div>

            <div className="p-3 sm:p-4 md:p-5">
                <div className="rounded-[10px] border border-[#E4DCCD] bg-[#FBF8F2]">
                    <div className="border-b border-[#E7DED1] px-3 py-3 sm:px-4">
                        <div className="relative grid grid-cols-3 gap-1 rounded-full border border-[#E5DBCC] bg-[#F3EDE3] p-1">
                            <div
                                aria-hidden="true"
                                className="absolute inset-y-1 left-1 w-[calc(33.333%-0.333rem)] rounded-full bg-[#141414] transition-transform duration-300 ease-out"
                                style={{ transform: `translateX(${displayIndex * 100}%)` }}
                            />
                            {PREVIEW_STATES.map((state, index) => (
                                <div
                                    key={state.id}
                                    className={`relative z-10 rounded-full px-3 py-2 text-center text-[10px] font-bold uppercase tracking-[0.18em] transition-colors duration-300 ${
                                        index === displayIndex ? 'text-[#FBF7EF]' : 'text-[#766C5F]'
                                    }`}
                                >
                                    {state.tab}
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="relative min-h-[320px] overflow-hidden sm:min-h-[340px] lg:min-h-[360px]">
                        {visibleStates.map((state) => (
                            <div
                                key={state.id}
                                className={`absolute inset-0 px-3 py-3 transition-opacity duration-[400ms] ease-out sm:px-4 sm:py-4 ${
                                    state.isActive ? 'opacity-100' : 'opacity-0'
                                }`}
                                aria-hidden={!state.isActive}
                            >
                                <div className="rounded-[12px] border border-[#E6DDCF] bg-[#FFFCF7] p-4 sm:p-5">
                                    <div className="flex flex-col gap-3 border-b border-[#EEE5D8] pb-4 sm:flex-row sm:items-start sm:justify-between">
                                        <div>
                                            <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#9A886A]">{state.tone}</p>
                                            <h3 className="mt-2 text-[22px] font-semibold leading-tight tracking-[-0.02em] text-[#151310]">
                                                {state.title}
                                            </h3>
                                            <p className="mt-2 max-w-[34rem] text-sm leading-relaxed text-[#6A6257]">
                                                {state.subtitle}
                                            </p>
                                        </div>
                                        <div className="rounded-full border border-[#E1D5C2] bg-[#F8F2E9] px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.18em] text-[#876F4C]">
                                            Ready
                                        </div>
                                    </div>

                                    {state.rows ? (
                                        <div className="mt-4 grid gap-3">
                                            {state.rows.map((row) => (
                                                <div
                                                    key={row.label}
                                                    className="flex items-center justify-between rounded-[12px] border border-[#ECE2D4] bg-[#FBF7F1] px-4 py-3"
                                                >
                                                    <div>
                                                        <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#9B8662]">
                                                            {row.label}
                                                        </p>
                                                        <p className="mt-1 text-sm text-[#6D6459]">{row.level}</p>
                                                    </div>
                                                    <div className="rounded-full border border-[#D7CAB6] bg-[#F4ECDF] px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.16em] text-[#3A3228]">
                                                        {row.value}
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    ) : (
                                        <div className="mt-4 grid gap-4">
                                            <div className="rounded-[14px] border border-[#E5D8C8] bg-[#F7EFE4] p-4">
                                                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#9B8662]">
                                                    {state.cardTitle}
                                                </p>
                                                <p className="mt-3 max-w-[40rem] text-[15px] leading-[1.8] text-[#40392F]">
                                                    {state.cardBody}
                                                </p>
                                            </div>
                                            <div className="rounded-[12px] border border-[#ECE2D4] bg-[#FBF7F1] px-4 py-3 text-sm text-[#6A6257]">
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
