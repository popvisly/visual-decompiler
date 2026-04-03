'use client';

import { useEffect, useRef, useState } from 'react';

type Tone = 'bone' | 'ink' | 'amber';
type PresenceTarget = 'idle' | 'inspect' | 'compare' | 'cta' | 'annotation';

const TONE_STYLES: Record<Tone, { ring: string; glow: string; core: string; scale: number }> = {
    bone: {
        ring: 'rgba(20,20,20,0.26)',
        glow: 'rgba(20,20,20,0.06)',
        core: '#141414',
        scale: 1,
    },
    ink: {
        ring: 'rgba(245,245,240,0.46)',
        glow: 'rgba(212,165,116,0.12)',
        core: '#D4A574',
        scale: 1.06,
    },
    amber: {
        ring: 'rgba(212,165,116,0.46)',
        glow: 'rgba(212,165,116,0.12)',
        core: '#8A6840',
        scale: 1.03,
    },
};

const TARGET_STYLES: Record<PresenceTarget, {
    scaleX: number;
    scaleY: number;
    outerInset: number;
    innerInset: number;
    coreSize: number;
    glowStop: number;
    markerOffset: number;
    traceOpacity: number;
}> = {
    idle: {
        scaleX: 1,
        scaleY: 1,
        outerInset: 14,
        innerInset: 26,
        coreSize: 8,
        glowStop: 68,
        markerOffset: 10,
        traceOpacity: 0,
    },
    inspect: {
        scaleX: 1.08,
        scaleY: 1.08,
        outerInset: 10,
        innerInset: 22,
        coreSize: 10,
        glowStop: 62,
        markerOffset: 7,
        traceOpacity: 0.32,
    },
    compare: {
        scaleX: 1.22,
        scaleY: 0.92,
        outerInset: 12,
        innerInset: 28,
        coreSize: 8,
        glowStop: 64,
        markerOffset: 6,
        traceOpacity: 0.26,
    },
    cta: {
        scaleX: 0.94,
        scaleY: 0.94,
        outerInset: 16,
        innerInset: 28,
        coreSize: 7,
        glowStop: 66,
        markerOffset: 12,
        traceOpacity: 0.14,
    },
    annotation: {
        scaleX: 0.88,
        scaleY: 0.88,
        outerInset: 18,
        innerInset: 30,
        coreSize: 6,
        glowStop: 68,
        markerOffset: 13,
        traceOpacity: 0.18,
    },
};

export default function ObservingPresence() {
    const [tone, setTone] = useState<Tone>('bone');
    const [isVisible, setIsVisible] = useState(false);
    const [target, setTarget] = useState<PresenceTarget>('idle');
    const targetRef = useRef({ x: 0, y: 0 });
    const currentRef = useRef({ x: 0, y: 0 });
    const toneRef = useRef<Tone>('bone');
    const targetModeRef = useRef<PresenceTarget>('idle');
    const frameRef = useRef<number | null>(null);
    const nodeRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        toneRef.current = tone;
    }, [tone]);

    useEffect(() => {
        targetModeRef.current = target;
    }, [target]);

    useEffect(() => {
        const onMove = (event: MouseEvent) => {
            if (!isVisible) setIsVisible(true);
            targetRef.current = {
                x: event.clientX + 18,
                y: event.clientY - 24,
            };
        };

        const syncTone = () => {
            const probes = Array.from(document.querySelectorAll<HTMLElement>('[data-presence-tone]'));
            const viewportMid = window.innerHeight * 0.38;
            const active = probes.find((section) => {
                const rect = section.getBoundingClientRect();
                return rect.top <= viewportMid && rect.bottom >= viewportMid;
            });

            const nextTone = (active?.dataset.presenceTone as Tone | undefined) ?? 'bone';
            setTone(nextTone);
        };

        const syncTarget = (event: Event) => {
            const source = event.target;
            if (!(source instanceof HTMLElement)) {
                setTarget('idle');
                return;
            }

            const zone = source.closest<HTMLElement>('[data-presence-target]');
            const nextTarget = (zone?.dataset.presenceTarget as PresenceTarget | undefined) ?? 'idle';
            setTarget(nextTarget);
        };

        const animate = () => {
            const current = currentRef.current;
            const next = targetRef.current;
            const toneStyle = TONE_STYLES[toneRef.current];
            const targetStyle = TARGET_STYLES[targetModeRef.current];

            current.x += (next.x - current.x) * 0.12;
            current.y += (next.y - current.y) * 0.12;

            if (nodeRef.current) {
                nodeRef.current.style.transform = `translate3d(${current.x}px, ${current.y}px, 0) scaleX(${toneStyle.scale * targetStyle.scaleX}) scaleY(${toneStyle.scale * targetStyle.scaleY})`;
            }

            frameRef.current = window.requestAnimationFrame(animate);
        };

        syncTone();
        window.addEventListener('mousemove', onMove, { passive: true });
        window.addEventListener('mouseover', syncTarget, { passive: true });
        window.addEventListener('focusin', syncTarget);
        window.addEventListener('scroll', syncTone, { passive: true });
        window.addEventListener('resize', syncTone);
        frameRef.current = window.requestAnimationFrame(animate);

        return () => {
            window.removeEventListener('mousemove', onMove);
            window.removeEventListener('mouseover', syncTarget);
            window.removeEventListener('focusin', syncTarget);
            window.removeEventListener('scroll', syncTone);
            window.removeEventListener('resize', syncTone);
            if (frameRef.current !== null) window.cancelAnimationFrame(frameRef.current);
        };
    }, [isVisible]);

    const style = TONE_STYLES[tone];
    const targetStyle = TARGET_STYLES[target];

    return (
        <div className="pointer-events-none fixed inset-0 z-40 hidden lg:block" aria-hidden="true">
            <div
                ref={nodeRef}
                className="absolute left-0 top-0 transition-[opacity] duration-500"
                style={{ opacity: isVisible ? 1 : 0, transform: 'translate3d(0px, 0px, 0)' }}
            >
                <div
                    className="relative h-20 w-20 -translate-x-1/2 -translate-y-1/2 rounded-full"
                    style={{
                        background: `radial-gradient(circle, ${style.glow} 0%, transparent ${targetStyle.glowStop}%)`,
                    }}
                >
                    <div
                        className="absolute rounded-full border transition-all duration-300"
                        style={{ inset: `${targetStyle.outerInset}px`, borderColor: style.ring }}
                    />
                    <div
                        className="absolute rounded-full border transition-all duration-300"
                        style={{ inset: `${targetStyle.innerInset}px`, borderColor: style.ring }}
                    />
                    <div
                        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full transition-all duration-300"
                        style={{ width: `${targetStyle.coreSize}px`, height: `${targetStyle.coreSize}px`, background: style.core }}
                    />
                    <div
                        className="absolute left-1/2 h-3 w-px -translate-x-1/2 transition-all duration-300"
                        style={{ top: `${targetStyle.markerOffset}px`, background: style.ring }}
                    />
                    <div
                        className="absolute left-1/2 h-3 w-px -translate-x-1/2 transition-all duration-300"
                        style={{ bottom: `${targetStyle.markerOffset}px`, background: style.ring }}
                    />
                    <div
                        className="absolute top-1/2 h-px w-3 -translate-y-1/2 transition-all duration-300"
                        style={{ left: `${targetStyle.markerOffset}px`, background: style.ring }}
                    />
                    <div
                        className="absolute top-1/2 h-px w-3 -translate-y-1/2 transition-all duration-300"
                        style={{ right: `${targetStyle.markerOffset}px`, background: style.ring }}
                    />
                    <div
                        className="absolute left-1/2 top-1/2 h-[46px] w-[46px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed transition-opacity duration-300"
                        style={{ borderColor: style.ring, opacity: targetStyle.traceOpacity }}
                    />
                </div>
            </div>
        </div>
    );
}
