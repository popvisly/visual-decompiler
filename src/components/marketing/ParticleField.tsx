'use client';

import { useEffect, useRef } from 'react';

interface Orb {
    x: number;
    y: number;
    radius: number;
    vx: number;
    vy: number;
    alpha: number;
    color: string;
}

export default function ParticleField() {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let animationFrameId: number;
        const orbs: Orb[] = [];
        const count = 6;

        const GOLD = '#C1A674';
        const DARK = '#141414';
        const MUTED = '#A09480';

        const resize = () => {
            const dpr = window.devicePixelRatio || 1;
            const rect = canvas.getBoundingClientRect();
            canvas.width = rect.width * dpr;
            canvas.height = rect.height * dpr;
            ctx.scale(dpr, dpr);
            initOrbs(rect.width, rect.height);
        };

        const initOrbs = (w: number, h: number) => {
            orbs.length = 0;
            const shapes: Orb[] = [
                { x: w * 0.2, y: h * 0.3, radius: 180, vx: 0.15, vy: 0.08, alpha: 0.06, color: GOLD },
                { x: w * 0.7, y: h * 0.6, radius: 220, vx: -0.1, vy: 0.12, alpha: 0.04, color: GOLD },
                { x: w * 0.5, y: h * 0.8, radius: 160, vx: 0.08, vy: -0.1, alpha: 0.03, color: MUTED },
                { x: w * 0.85, y: h * 0.2, radius: 120, vx: -0.12, vy: 0.05, alpha: 0.05, color: GOLD },
                { x: w * 0.15, y: h * 0.75, radius: 140, vx: 0.1, vy: -0.06, alpha: 0.03, color: DARK },
                { x: w * 0.6, y: h * 0.4, radius: 100, vx: -0.08, vy: 0.1, alpha: 0.06, color: GOLD },
            ];
            orbs.push(...shapes);
        };

        const draw = () => {
            const rect = canvas.getBoundingClientRect();
            ctx.clearRect(0, 0, rect.width, rect.height);

            for (const orb of orbs) {
                orb.x += orb.vx;
                orb.y += orb.vy;

                // Bounce off edges with padding
                if (orb.x < -orb.radius) orb.vx = Math.abs(orb.vx);
                if (orb.x > rect.width + orb.radius) orb.vx = -Math.abs(orb.vx);
                if (orb.y < -orb.radius) orb.vy = Math.abs(orb.vy);
                if (orb.y > rect.height + orb.radius) orb.vy = -Math.abs(orb.vy);

                const gradient = ctx.createRadialGradient(orb.x, orb.y, 0, orb.x, orb.y, orb.radius);
                gradient.addColorStop(0, orb.color + Math.round(orb.alpha * 255).toString(16).padStart(2, '0'));
                gradient.addColorStop(1, orb.color + '00');

                ctx.fillStyle = gradient;
                ctx.beginPath();
                ctx.arc(orb.x, orb.y, orb.radius, 0, Math.PI * 2);
                ctx.fill();
            }

            animationFrameId = requestAnimationFrame(draw);
        };

        resize();
        window.addEventListener('resize', resize);
        draw();

        return () => {
            window.removeEventListener('resize', resize);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="absolute inset-0 block h-full w-full"
            aria-hidden="true"
        />
    );
}
