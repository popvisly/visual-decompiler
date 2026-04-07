'use client';

import { useEffect, useRef } from 'react';

interface Particle {
    x: number;
    y: number;
    originX: number;
    originY: number;
    size: number;
    color: string;
    speed: number;
    angle: number;
    life: number;
}

export default function ParticleField() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const mouseRef = useRef({ x: -9999, y: -9999 });
    const smoothMouseRef = useRef({ x: -9999, y: -9999 });
    const isMouseOnCanvas = useRef(false);
    const particlesRef = useRef<Particle[]>([]);
    const animRef = useRef<number>(0);

    const GOLD = '#C1A674';
    const GOLD_LIGHT = '#D4A574';
    const GOLD_MUTED = '#A09480';
    const DARK = '#141414';
    const OFF_BLACK = '#2A2A2A';

    const BRAND_COLORS = [GOLD, GOLD_LIGHT, GOLD_MUTED, DARK, OFF_BLACK];

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let w = 0;
        let h = 0;

        const GRID_SPACING = 50;
        const MOUSE_RADIUS = 180;
        const MOUSE_FORCE = 0.8;
        const RETURN_SPEED = 0.02;
        const FLOW_ANGLE = Math.PI * 0.15; // Subtle diagonal flow

        const createParticle = (x: number, y: number): Particle => ({
            x,
            y,
            originX: x,
            originY: y,
            size: Math.random() * 2.5 + 1,
            color: BRAND_COLORS[Math.floor(Math.random() * BRAND_COLORS.length)],
            speed: Math.random() * 0.5 + 0.3,
            angle: Math.random() * Math.PI * 2,
            life: 1,
        });

        const initParticles = (width: number, height: number) => {
            particlesRef.current = [];
            for (let x = 0; x < width; x += GRID_SPACING) {
                for (let y = 0; y < height; y += GRID_SPACING) {
                    // Add slight random offset for organic feel
                    const offsetX = (Math.random() - 0.5) * 10;
                    const offsetY = (Math.random() - 0.5) * 10;
                    particlesRef.current.push(
                        createParticle(x + offsetX, y + offsetY)
                    );
                }
            }
        };

        const resize = () => {
            const dpr = window.devicePixelRatio || 1;
            const rect = canvas.getBoundingClientRect();
            w = rect.width;
            h = rect.height;
            canvas.width = w * dpr;
            canvas.height = h * dpr;
            ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
            initParticles(w, h);
        };

        const onMouseMove = (e: MouseEvent) => {
            const rect = canvas.getBoundingClientRect();
            mouseRef.current = {
                x: e.clientX - rect.left,
                y: e.clientY - rect.top,
            };
            isMouseOnCanvas.current = true;
        };

        const onMouseLeave = () => {
            isMouseOnCanvas.current = false;
            mouseRef.current = { x: -9999, y: -9999 };
        };

        const draw = () => {
            // Smooth mouse lerp
            smoothMouseRef.current.x +=
                (mouseRef.current.x - smoothMouseRef.current.x) * 0.12;
            smoothMouseRef.current.y +=
                (mouseRef.current.y - smoothMouseRef.current.y) * 0.12;

            ctx.clearRect(0, 0, w, h);

            // Draw subtle grid lines (very faint)
            ctx.save();
            ctx.globalAlpha = 0.03;
            ctx.strokeStyle = '#141414';
            ctx.lineWidth = 0.5;
            for (let x = 0; x < w; x += GRID_SPACING * 2) {
                ctx.beginPath();
                ctx.moveTo(x, 0);
                ctx.lineTo(x, h);
                ctx.stroke();
            }
            for (let y = 0; y < h; y += GRID_SPACING * 2) {
                ctx.beginPath();
                ctx.moveTo(0, y);
                ctx.lineTo(w, y);
                ctx.stroke();
            }
            ctx.restore();

            // Update and draw particles
            for (const p of particlesRef.current) {
                // Flow field movement (gentle diagonal drift)
                const flowX = Math.cos(FLOW_ANGLE) * p.speed * 0.3;
                const flowY = Math.sin(FLOW_ANGLE) * p.speed * 0.3;

                // Mouse interaction
                let dx = 0;
                let dy = 0;
                let distToMouse = 9999;

                if (isMouseOnCanvas.current) {
                    dx = p.x - smoothMouseRef.current.x;
                    dy = p.y - smoothMouseRef.current.y;
                    distToMouse = Math.sqrt(dx * dx + dy * dy);

                    // Repulsion effect
                    if (distToMouse < MOUSE_RADIUS) {
                        const force =
                            (1 - distToMouse / MOUSE_RADIUS) * MOUSE_FORCE;
                        const angle = Math.atan2(dy, dx);
                        p.x += Math.cos(angle) * force * 8;
                        p.y += Math.sin(angle) * force * 8;
                    }
                }

                // Return to origin (elastic)
                const returnDx = p.originX - p.x;
                const returnDy = p.originY - p.y;
                p.x += returnDx * RETURN_SPEED + flowX;
                p.y += returnDy * RETURN_SPEED + flowY;

                // Draw particle
                ctx.globalAlpha = 0.6;
                ctx.fillStyle = p.color;
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
                ctx.fill();
            }

            // Draw connection lines between nearby particles
            ctx.save();
            for (let i = 0; i < particlesRef.current.length; i += 3) {
                // Skip most particles for performance
                const p = particlesRef.current[i];
                for (let j = i + 1; j < particlesRef.current.length; j += 5) {
                    const q = particlesRef.current[j];
                    const dx = p.x - q.x;
                    const dy = p.y - q.y;
                    const dist = Math.sqrt(dx * dx + dy * dy);

                    if (dist < 70) {
                        const alpha = 0.08 * (1 - dist / 70);
                        ctx.globalAlpha = alpha;
                        ctx.strokeStyle = GOLD;
                        ctx.lineWidth = 0.5;
                        ctx.beginPath();
                        ctx.moveTo(p.x, p.y);
                        ctx.lineTo(q.x, q.y);
                        ctx.stroke();
                    }
                }
            }
            ctx.restore();

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
