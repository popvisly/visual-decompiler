"use client";

import { useState, useEffect, useRef } from 'react';
import { useInView, useMotionValue, useSpring } from 'framer-motion';

type CountUpPercentProps = {
    value: number | null | undefined;
    className?: string;
    decimals?: 0 | 1 | 2;
    delayMs?: number;
};

export default function CountUpPercent({ value, className, decimals = 0, delayMs = 200 }: CountUpPercentProps) {
    const ref = useRef<HTMLSpanElement>(null);
    const inView = useInView(ref, { once: true, amount: 0.6 });
    const startedRef = useRef(false);

    const motionValue = useMotionValue(0);
    const spring = useSpring(motionValue, { stiffness: 70, damping: 18, mass: 0.7 });
    const [display, setDisplay] = useState(0);

    useEffect(() => {
        return spring.on('change', (latest) => {
            const next = decimals === 0 ? Math.round(latest) : decimals == 1 ? Math.round(latest * 10) / 10 : Math.round(latest * 100) / 100;
            setDisplay(next);
        });
    }, [spring, decimals]);

    useEffect(() => {
        if (!inView) return;
        if (startedRef.current) return;
        if (typeof value !== 'number' || !Number.isFinite(value)) return;

        startedRef.current = true;
        const target = Math.max(0, Math.min(100, value));

        // Small delay so the card settles before the number runs.
        const t = setTimeout(() => {
            motionValue.set(0);
            motionValue.set(target);
        }, delayMs);

        return () => clearTimeout(t);
    }, [inView, value, delayMs, motionValue]);

    return (
        <span ref={ref} className={className}>
            {typeof value === 'number' && Number.isFinite(value) ? display : '—'}
        </span>
    );
}
