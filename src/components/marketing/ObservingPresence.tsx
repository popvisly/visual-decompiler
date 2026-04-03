'use client';

import { useEffect, useRef, useState } from 'react';

type Tone = 'bone' | 'ink' | 'amber';

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

export default function ObservingPresence() {
    const [tone, setTone] = useState<Tone>('bone');
    const [isVisible, setIsVisible] = useState(false);
    const targetRef = useRef({ x: 0, y: 0 });
    const currentRef = useRef({ x: 0, y: 0 });
    const toneRef = useRef<Tone>('bone');
    const frameRef = useRef<number | null>(null);
    const nodeRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        toneRef.current = tone;
    }, [tone]);

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

        const animate = () => {
            const current = currentRef.current;
            const target = targetRef.current;

            current.x += (target.x - current.x) * 0.12;
            current.y += (target.y - current.y) * 0.12;

            if (nodeRef.current) {
                nodeRef.current.style.transform = `translate3d(${current.x}px, ${current.y}px, 0) scale(${TONE_STYLES[toneRef.current].scale})`;
            }

            frameRef.current = window.requestAnimationFrame(animate);
        };

        syncTone();
        window.addEventListener('mousemove', onMove, { passive: true });
        window.addEventListener('scroll', syncTone, { passive: true });
        window.addEventListener('resize', syncTone);
        frameRef.current = window.requestAnimationFrame(animate);

        return () => {
            window.removeEventListener('mousemove', onMove);
            window.removeEventListener('scroll', syncTone);
            window.removeEventListener('resize', syncTone);
            if (frameRef.current !== null) window.cancelAnimationFrame(frameRef.current);
        };
    }, [isVisible]);

    const style = TONE_STYLES[tone];

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
                        background: `radial-gradient(circle, ${style.glow} 0%, transparent 68%)`,
                    }}
                >
                    <div
                        className="absolute inset-[14px] rounded-full border"
                        style={{ borderColor: style.ring }}
                    />
                    <div
                        className="absolute inset-[26px] rounded-full border"
                        style={{ borderColor: style.ring }}
                    />
                    <div
                        className="absolute left-1/2 top-1/2 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full"
                        style={{ background: style.core }}
                    />
                    <div
                        className="absolute left-1/2 top-[10px] h-3 w-px -translate-x-1/2"
                        style={{ background: style.ring }}
                    />
                    <div
                        className="absolute left-1/2 bottom-[10px] h-3 w-px -translate-x-1/2"
                        style={{ background: style.ring }}
                    />
                    <div
                        className="absolute left-[10px] top-1/2 h-px w-3 -translate-y-1/2"
                        style={{ background: style.ring }}
                    />
                    <div
                        className="absolute right-[10px] top-1/2 h-px w-3 -translate-y-1/2"
                        style={{ background: style.ring }}
                    />
                </div>
            </div>
        </div>
    );
}
