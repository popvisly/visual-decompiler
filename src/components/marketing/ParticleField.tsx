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
    orbitRadius: number;
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

            // Large bold orbs - geometric, deliberate
            const shapes: Omit<Orb, 'angle' | 'angularSpeed' | 'orbitRadius'>[] = [
                // 1 - Large gold circle, upper right
                { x: width * 0.72, y: height * 0.3, radius: 280, vx: 0.3, vy: 0.18, alpha: 0.12, color: GOLD },
                // 2 - Dark geometric element, lower left  
                { x: width * 0.2, y: height * 0.7, radius: 240, vx: -0.2, vy: -0.12, alpha: 0.08, color: DARK },
                // 3 - Medium gold, center-right
                { x: width * 0.85, y: height * 0.7, radius: 180, vx: 0.15, vy: -0.22, alpha: 0.1, color: GOLD_LIGHT },
                // 4 - Gold accent, center-left
                { x: width * 0.3, y: height * 0.25, radius: 160, vx: 0.2, vy: 0.15, alpha: 0.1, color: GOLD },
                // 5 - Large muted orb, bottom
                { x: width * 0.5, y: height * 0.85, radius: 220, vx: -0.1, vy: 0.1, alpha: 0.06, color: GOLD_DARK },
                // 6 - Medium dark, top-left
                { x: width * 0.12, y: height * 0.15, radius: 150, vx: 0.18, vy: -0.08, alpha: 0.07, color: DARK },
                // 7 - Gold ring, center
                { x: width * 0.55, y: height * 0.5, radius: 200, vx: 0.08, vy: 0.2, alpha: 0.08, color: GOLD },
            ];

            for (const s of shapes) {
                orbs.push({
                    ...s,
                    angle: Math.random() * Math.PI * 2,
                    angularSpeed: (0.0002 + Math.random() * 0.0003) * (Math.random() > 0.5 ? 1 : -1),
                    orbitRadius: 0,
                });
            }
        };

        const drawShape = (orb: Orb) => {
            ctx.save();
            const gradient = ctx.createRadialGradient(orb.x, orb.y, 0, orb.x, orb.y, orb.radius);
            
            // Center is most opaque, edge is fully transparent
            const r = parseInt(orb.color.slice(1, 3), 16);
            const g = parseInt(orb.color.slice(3, 5), 16);
            const b = parseInt(orb.color.slice(5, 7), 16);
            const a = Math.round(orb.alpha * 255);
            
            gradient.addColorStop(0, `rgba(${r}, ${g}, ${b}, ${a / 255})`);
            gradient.addColorStop(0.6, `rgba(${r}, ${g}, ${b}, ${a * 0.4 / 255})`);
            gradient.addColorStop(1, `rgba(${r}, ${g}, ${b}, 0)`);

            ctx.fillStyle = gradient;
            ctx.beginPath();
            ctx.arc(orb.x, orb.y, orb.radius, 0, Math.PI * 2);
            ctx.fill();

            // Outer ring for geometric feel
            ctx.strokeStyle = `rgba(${r}, ${g}, ${b}, ${a * 0.15 / 255})`;
            ctx.lineWidth = 1.5;
            ctx.stroke();

            ctx.restore();
        };

        const drawConnections = () => {
            // Draw subtle connection lines between nearby orbs
            for (let i = 0; i < orbs.length; i++) {
                for (let j = i + 1; j < orbs.length; j++) {
                    const dx = orbs[i].x - orbs[j].x;
                    const dy = orbs[i].y - orbs[j].y;
                    const dist = Math.sqrt(dx * dx + dy * dy);
                    
                    // Draw line if orbs are within 500px
                    if (dist < 500) {
                        const alpha = Math.max(0, 0.04 * (1 - dist / 500));
                        ctx.strokeStyle = `rgba(193, 166, 116, ${alpha})`;
                        ctx.lineWidth = 1;
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
                // Linear drift
                orb.x += orb.vx;
                orb.y += orb.vy;

                // Gentle circular perturbation (adds organic feel to the geometric)
                orb.angle += orb.angularSpeed;
                orb.x += Math.cos(orb.angle) * 0.3;
                orb.y += Math.sin(orb.angle) * 0.3;

                // Bounce off edges with padding
                const pad = orb.radius;
                if (orb.x < -pad) orb.vx = Math.abs(orb.vx);
                if (orb.x > w + pad) orb.vx = -Math.abs(orb.vx);
                if (orb.y < -pad) orb.vy = Math.abs(orb.vy);
                if (orb.y > h + pad) orb.vy = -Math.abs(orb.vy);

                drawShape(orb);
            }

            // Draw subtle mesh lines
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
