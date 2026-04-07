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
    angle: number;
    angularSpeed: number;
}

export default function ParticleField() {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let animationFrameId: number;
        let w = 0;
        let h = 0;
        const orbs: Orb[] = [];

        const GOLD = '#C1A674';
        const GOLD_LIGHT = '#D4A574';
        const GOLD_DARK = '#A09480';
        const DARK = '#141414';
        const ACCENT = '#B8935A';

        const hexToRgb = (hex: string) => ({
            r: parseInt(hex.slice(1, 3), 16),
            g: parseInt(hex.slice(3, 5), 16),
            b: parseInt(hex.slice(5, 7), 16),
        });

        const resize = () => {
            const dpr = window.devicePixelRatio || 1;
            const rect = canvas.getBoundingClientRect();
            w = rect.width;
            h = rect.height;
            canvas.width = w * dpr;
            canvas.height = h * dpr;
            ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
            if (orbs.length === 0) initOrbs(w, h);
        };

        const initOrbs = (width: number, height: number) => {
            orbs.length = 0;

            // Large bold orbs — 3-5x more alpha than before so they're actually visible
            const shapes: Omit<Orb, 'angle' | 'angularSpeed'>[] = [
                { x: width * 0.72, y: height * 0.3,  radius: 300, vx: 0.3,  vy: 0.18, alpha: 0.50, color: GOLD },
                { x: width * 0.20, y: height * 0.7,  radius: 260, vx: -0.2, vy: -0.12, alpha: 0.35, color: DARK },
                { x: width * 0.85, y: height * 0.7,  radius: 200, vx: 0.15, vy: -0.22, alpha: 0.40, color: GOLD_LIGHT },
                { x: width * 0.30, y: height * 0.25, radius: 180, vx: 0.2,  vy: 0.15, alpha: 0.45, color: GOLD },
                { x: width * 0.50, y: height * 0.85, radius: 240, vx: -0.1, vy: 0.1,  alpha: 0.28, color: GOLD_DARK },
                { x: width * 0.12, y: height * 0.15, radius: 170, vx: 0.18, vy: -0.08, alpha: 0.30, color: DARK },
                { x: width * 0.55, y: height * 0.5,  radius: 220, vx: 0.08, vy: 0.2,  alpha: 0.38, color: ACCENT },
                { x: width * 0.40, y: height * 0.6,  radius: 150, vx: -0.15,vy: 0.12, alpha: 0.35, color: GOLD_LIGHT },
            ];

            for (const s of shapes) {
                orbs.push({
                    ...s,
                    angle: Math.random() * Math.PI * 2,
                    angularSpeed: (0.0003 + Math.random() * 0.0004) * (Math.random() > 0.5 ? 1 : -1),
                });
            }
        };

        const drawShape = (orb: Orb) => {
            const { r, g, b } = hexToRgb(orb.color);

            // Main gradient fill
            const gradient = ctx.createRadialGradient(orb.x, orb.y, 0, orb.x, orb.y, orb.radius);
            gradient.addColorStop(0, `rgba(${r},${g},${b},${orb.alpha})`);
            gradient.addColorStop(0.5, `rgba(${r},${g},${b},${orb.alpha * 0.5})`);
            gradient.addColorStop(0.8, `rgba(${r},${g},${b},${orb.alpha * 0.15})`);
            gradient.addColorStop(1, `rgba(${r},${g},${b},0)`);

            ctx.fillStyle = gradient;
            ctx.beginPath();
            ctx.arc(orb.x, orb.y, orb.radius, 0, Math.PI * 2);
            ctx.fill();

            // Thin outer ring for geometric structure
            ctx.globalAlpha = 0.12;
            ctx.strokeStyle = `rgba(${r},${g},${b},0.5)`;
            ctx.lineWidth = 2;
            ctx.stroke();
            ctx.globalAlpha = 1;
        };

        const drawConnections = () => {
            for (let i = 0; i < orbs.length; i++) {
                for (let j = i + 1; j < orbs.length; j++) {
                    const dx = orbs[i].x - orbs[j].x;
                    const dy = orbs[i].y - orbs[j].y;
                    const dist = Math.sqrt(dx * dx + dy * dy);

                    if (dist < 550) {
                        const alpha = Math.round(0.15 * (1 - dist / 550) * 100) / 100;
                        ctx.strokeStyle = `rgba(193, 166, 116, ${alpha})`;
                        ctx.lineWidth = 1.2;
                        ctx.beginPath();
                        ctx.moveTo(orbs[i].x, orbs[i].y);
                        ctx.lineTo(orbs[j].x, orbs[j].y);
                        ctx.stroke();
                    }
                }
            }
        };

        const draw = () => {
            ctx.clearRect(0, 0, w, h);

            for (const orb of orbs) {
                orb.x += orb.vx;
                orb.y += orb.vy;
                orb.angle += orb.angularSpeed;
                orb.x += Math.cos(orb.angle) * 0.2;
                orb.y += Math.sin(orb.angle) * 0.2;

                const pad = orb.radius;
                if (orb.x < -pad) orb.vx = Math.abs(orb.vx);
                if (orb.x > w + pad) orb.vx = -Math.abs(orb.vx);
                if (orb.y < -pad) orb.vy = Math.abs(orb.vy);
                if (orb.y > h + pad) orb.vy = -Math.abs(orb.vy);

                drawShape(orb);
            }

            drawConnections();
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
