'use client';

import { useEffect, useRef } from 'react';

interface Particle {
    x: number;
    y: number;
    originX: number;
    originY: number;
    size: number;
    color: string;
    phase: number;
    frequency: number;
    amplitude: number;
}

export default function ParticleField() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const particlesRef = useRef<Particle[]>([]);
    const animRef = useRef<number>(0);
    const timeRef = useRef(0);
    const mousePos = useRef({ x: -9999, y: -9999 });

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let width = 0;
        let height = 0;
        const GRID = 40;
        const MOUSE_RADIUS = 150;

        const createParticle = (x: number, y: number): Particle => ({
            x, y, originX: x, originY: y,
            size: 1.5 + Math.random() * 2.5,
            color: ['#C1A674', '#D4A574', '#A09480', '#E8D5B8', '#D4C8B8'][Math.floor(Math.random() * 5)],
            phase: Math.random() * Math.PI * 2,
            frequency: 0.002 + Math.random() * 0.004,
            amplitude: 5 + Math.random() * 10,
        });

        const init = (w: number, h: number) => {
            particlesRef.current = [];
            for (let x = GRID; x < w; x += GRID) {
                for (let y = GRID; y < h; y += GRID) {
                    particlesRef.current.push(
                        createParticle(
                            x + (Math.random() - 0.5) * 8,
                            y + (Math.random() - 0.5) * 8
                        )
                    );
                }
            }
        };

        const resize = () => {
            const rect = canvas.getBoundingClientRect();
            const dpr = window.devicePixelRatio || 1;
            width = rect.width;
            height = rect.height;
            canvas.width = width * dpr;
            canvas.height = height * dpr;
            ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
            init(width, height);
        };

        const onMouseMove = (e: MouseEvent) => {
            const rect = canvas.getBoundingClientRect();
            mousePos.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
        };

        const onMouseLeave = () => {
            mousePos.current = { x: -9999, y: -9999 };
        };

        const draw = () => {
            timeRef.current += 1;
            const t = timeRef.current;
            ctx.clearRect(0, 0, width, height);

            // Draw faint structural grid
            ctx.strokeStyle = 'rgba(20, 20, 20, 0.04)';
            ctx.lineWidth = 0.5;
            for (let x = GRID; x < width; x += GRID * 2) {
                ctx.beginPath();
                ctx.moveTo(x, 0);
                ctx.lineTo(x, height);
                ctx.stroke();
            }
            for (let y = GRID; y < height; y += GRID * 2) {
                ctx.beginPath();
                ctx.moveTo(0, y);
                ctx.lineTo(width, y);
                ctx.stroke();
            }

            // Update and draw particles
            for (const p of particlesRef.current) {
                // Ambient sine wave drift
                const waveX = Math.sin(t * p.frequency + p.phase) * p.amplitude;
                const waveY = Math.cos(t * p.frequency * 0.8 + p.phase * 1.2) * p.amplitude * 0.7;

                const targetX = p.originX + waveX;
                const targetY = p.originY + waveY;

                // Mouse repulsion
                const dx = p.x - mousePos.current.x;
                const dy = p.y - mousePos.current.y;
                const dist = Math.sqrt(dx * dx + dy * dy);

                if (dist < MOUSE_RADIUS) {
                    const force = (1 - dist / MOUSE_RADIUS) * 2.5;
                    const angle = Math.atan2(dy, dx);
                    p.x += Math.cos(angle) * force * 4;
                    p.y += Math.sin(angle) * force * 4;
                }

                // Return to target
                const returnX = targetX - p.x;
                const returnY = targetY - p.y;
                p.x += returnX * 0.03;
                p.y += returnY * 0.03;

                // Draw particle
                ctx.fillStyle = p.color;
                ctx.globalAlpha = 0.6;
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
                ctx.fill();
            }

            // Draw connections near mouse
            ctx.lineWidth = 0.6;
            for (let i = 0; i < particlesRef.current.length; i += 2) {
                const p = particlesRef.current[i];
                const distToMouse = Math.sqrt(
                    (p.x - mousePos.current.x) ** 2 + (p.y - mousePos.current.y) ** 2
                );

                if (distToMouse > 200) continue;

                for (let j = i + 1; j < Math.min(i + 8, particlesRef.current.length); j++) {
                    const q = particlesRef.current[j];
                    const ddx = p.x - q.x;
                    const ddy = p.y - q.y;
                    const d = Math.sqrt(ddx * ddx + ddy * ddy);

                    if (d < 50) {
                        ctx.globalAlpha = 0.12 * (1 - d / 50);
                        ctx.strokeStyle = '#C1A674';
                        ctx.beginPath();
                        ctx.moveTo(p.x, p.y);
                        ctx.lineTo(q.x, q.y);
                        ctx.stroke();
                    }
                }
            }

            ctx.globalAlpha = 1;
            animRef.current = requestAnimationFrame(draw);
        };

        resize();
        window.addEventListener('resize', resize);
        canvas.addEventListener('mousemove', onMouseMove);
        canvas.addEventListener('mouseleave', onMouseLeave);
        draw();

        return () => {
            window.removeEventListener('resize', resize);
            canvas.removeEventListener('mousemove', onMouseMove);
            canvas.removeEventListener('mouseleave', onMouseLeave);
            cancelAnimationFrame(animRef.current);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="absolute inset-0 block h-full w-full cursor-crosshair"
            aria-hidden="true"
        />
    );
}
