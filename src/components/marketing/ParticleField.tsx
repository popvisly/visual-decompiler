'use client';

import { useEffect, useRef } from 'react';

interface Node {
    x: number;
    y: number;
    vx: number;
    vy: number;
    r: number;
}

export default function ParticleField() {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let animationFrameId: number;
        let t = 0;
        const nodes: Node[] = [];
        const gridSize = 80;
        const connectionDist = 200;
        const drift = 0.15;

        const GOLD = '193, 166, 116';
        const DARK = '20, 20, 20';
        const MUTED = '160, 148, 128';

        const resize = () => {
            const dpr = window.devicePixelRatio || 1;
            const rect = canvas.getBoundingClientRect();
            canvas.width = rect.width * dpr;
            canvas.height = rect.height * dpr;
            ctx.scale(dpr, dpr);
            initNodes(rect.width, rect.height);
        };

        const initNodes = (w: number, h: number) => {
            nodes.length = 0;
            for (let x = gridSize; x < w; x += gridSize) {
                for (let y = gridSize; y < h; y += gridSize) {
                    if (Math.random() > 0.45) {
                        nodes.push({
                            x: x + (Math.random() - 0.5) * gridSize * 0.6,
                            y: y + (Math.random() - 0.5) * gridSize * 0.6,
                            vx: (Math.random() - 0.5) * drift,
                            vy: (Math.random() - 0.5) * drift,
                            r: Math.random() > 0.7 ? 2.5 : 1.5,
                        });
                    }
                }
            }
        };

        const drawGrid = (w: number, h: number) => {
            ctx.strokeStyle = `rgba(${DARK}, 0.025)`;
            ctx.lineWidth = 0.5;
            for (let x = gridSize; x < w; x += gridSize) {
                ctx.beginPath();
                ctx.moveTo(x, 0);
                ctx.lineTo(x, h);
                ctx.stroke();
            }
            for (let y = gridSize; y < h; y += gridSize) {
                ctx.beginPath();
                ctx.moveTo(0, y);
                ctx.lineTo(w, y);
                ctx.stroke();
            }
        };

        const draw = () => {
            const rect = canvas.getBoundingClientRect();
            ctx.clearRect(0, 0, rect.width, rect.height);
            t += 0.002;

            drawGrid(rect.width, rect.height);

            // Update
            for (const n of nodes) {
                n.x += n.vx + Math.sin(t + n.y * 0.01) * 0.03;
                n.y += n.vy + Math.cos(t + n.x * 0.01) * 0.03;
            }

            // Connections
            for (let i = 0; i < nodes.length; i++) {
                for (let j = i + 1; j < nodes.length; j++) {
                    const d = Math.hypot(nodes[i].x - nodes[j].x, nodes[i].y - nodes[j].y);
                    if (d < connectionDist) {
                        const alpha = 0.08 * (1 - d / connectionDist);
                        ctx.strokeStyle = `rgba(${GOLD}, ${alpha})`;
                        ctx.lineWidth = 0.8;
                        ctx.beginPath();
                        ctx.moveTo(nodes[i].x, nodes[i].y);
                        ctx.lineTo(nodes[j].x, nodes[j].y);
                        ctx.stroke();
                    }
                }
            }

            // Nodes
            for (const n of nodes) {
                const isBig = n.r > 2;
                const color = isBig ? GOLD : MUTED;
                const alpha = isBig ? 0.6 : 0.35;

                if (isBig) {
                    const glow = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, n.r * 5);
                    glow.addColorStop(0, `rgba(${GOLD}, 0.08)`);
                    glow.addColorStop(1, 'transparent');
                    ctx.fillStyle = glow;
                    ctx.beginPath();
                    ctx.arc(n.x, n.y, n.r * 5, 0, Math.PI * 2);
                    ctx.fill();
                }

                ctx.fillStyle = `rgba(${color}, ${alpha})`;
                ctx.beginPath();
                ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
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
