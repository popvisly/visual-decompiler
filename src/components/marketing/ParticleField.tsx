'use client';

import { useEffect, useRef, useState } from 'react';

interface Shape {
    id: number;
    type: 'circle' | 'rect' | 'triangle' | 'ring';
    x: number;       // % of viewport
    y: number;       // % of viewport
    size: number;    // px
    color: string;
    depth: number;   // parallax depth (0 = no movement, 1 = full mouse tracking)
    rotation: number;
    opacity: number;
}

const BRAND_COLORS = [
    '#C1A674',   // warm gold
    '#141414',   // dark ink
    '#D4A574',   // light gold
    '#8A7F74',   // muted tan
    '#A09480',   // medium tan
    '#2A2A2A',   // off-black
];

// Curated composition — large solid shapes in an editorial layout
const SHAPES: Omit<Shape, 'id'>[] = [
    // Large gold circle, top right
    { type: 'circle',  x: 75, y: 25, size: 280, color: '#C1A674', depth: 0.3, rotation: 0,    opacity: 1.0 },
    // Dark rectangle, center left
    { type: 'rect',    x: 15, y: 45, size: 200, color: '#141414', depth: 0.5, rotation: 12,   opacity: 0.9 },
    // Gold triangle, bottom right
    { type: 'triangle', x: 80, y: 75, size: 180, color: '#D4A574', depth: 0.4, rotation: -15, opacity: 0.95 },
    // Dark circle, top left
    { type: 'circle',  x: 10, y: 15, size: 150, color: '#2A2A2A', depth: 0.6, rotation: 0,    opacity: 0.85 },
    // Gold ring, center
    { type: 'ring',    x: 50, y: 50, size: 240, color: '#C1A674', depth: 0.2, rotation: 0,    opacity: 0.7 },
    // Tan rectangle, bottom center
    { type: 'rect',    x: 40, y: 80, size: 170, color: '#A09480', depth: 0.35, rotation: -8,  opacity: 0.9 },
    // Small dark triangle, top center-right
    { type: 'triangle', x: 65, y: 10, size: 120, color: '#141414', depth: 0.55, rotation: 25, opacity: 0.8 },
    // Light gold circle, mid-right
    { type: 'circle',  x: 90, y: 55, size: 130, color: '#D4A574', depth: 0.45, rotation: 0,  opacity: 0.9 },
    // Dark ring, bottom left
    { type: 'ring',    x: 25, y: 85, size: 160, color: '#2A2A2A', depth: 0.25, rotation: 0,  opacity: 0.6 },
    // Gold square-like rect, center upper
    { type: 'rect',    x: 55, y: 20, size: 140, color: '#C1A674', depth: 0.5, rotation: 30,  opacity: 0.85 },
    // Solid tan circle, bottom right edge
    { type: 'circle',  x: 95, y: 90, size: 100, color: '#8A7F74', depth: 0.3, rotation: 0,  opacity: 0.75 },
    // Dark horizontal bar
    { type: 'rect',    x: 30, y: 30, size: 300, color: '#141414', depth: 0.15, rotation: 0,  opacity: 0.4 },
];

export default function ParticleField() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const mouseRef = useRef({ x: 0, y: 0 });
    const smoothMouseRef = useRef({ x: 0, y: 0 });
    const shapesRef = useRef<Shape[]>([]);
    const animRef = useRef<number>(0);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        // Assign IDs and store
        shapesRef.current = SHAPES.map((s, i) => ({ ...s, id: i }));

        const resize = () => {
            const dpr = window.devicePixelRatio || 1;
            const rect = canvas.getBoundingClientRect();
            canvas.width = rect.width * dpr;
            canvas.height = rect.height * dpr;
            ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        };

        const onMouseMove = (e: MouseEvent) => {
            // Normalized mouse position (-1 to 1, 0 = center)
            const rect = canvas.getBoundingClientRect();
            mouseRef.current = {
                x: ((e.clientX - rect.left) / rect.width - 0.5) * 2,
                y: ((e.clientY - rect.top) / rect.height - 0.5) * 2,
            };
        };

        const drawShape = (shape: Shape, w: number, h: number) => {
            const { type, x, y, size, color, rotation, opacity } = shape;

            // Parallax offset
            const offX = smoothMouseRef.current.x * shape.depth * 30;
            const offY = smoothMouseRef.current.y * shape.depth * 30;

            const cx = (x / 100) * w + offX;
            const cy = (y / 100) * h + offY;

            ctx.save();
            ctx.globalAlpha = opacity;

            ctx.translate(cx, cy);
            ctx.rotate((rotation * Math.PI) / 180);

            ctx.fillStyle = color;

            switch (type) {
                case 'circle':
                    ctx.beginPath();
                    ctx.arc(0, 0, size / 2, 0, Math.PI * 2);
                    ctx.fill();
                    break;

                case 'rect':
                    // Use shorter dimension as width for horizontal bars
                    const w2 = type === 'rect' && size > 200 ? size : size;
                    const h2 = size > 200 ? size * 0.4 : size;
                    ctx.fillRect(-w2 / 2, -h2 / 2, w2, h2);
                    break;

                case 'triangle':
                    const s = size / 2;
                    ctx.beginPath();
                    ctx.moveTo(0, -s);
                    ctx.lineTo(s * 0.866, s * 0.5);
                    ctx.lineTo(-s * 0.866, s * 0.5);
                    ctx.closePath();
                    ctx.fill();
                    break;

                case 'ring':
                    ctx.strokeStyle = color;
                    ctx.lineWidth = 4;
                    ctx.beginPath();
                    ctx.arc(0, 0, size / 2, 0, Math.PI * 2);
                    ctx.stroke();
                    break;
            }

            ctx.restore();
        };

        const drawGrid = (w: number, h: number) => {
            // Subtle structural grid lines
            ctx.save();
            ctx.globalAlpha = 0.06;
            ctx.strokeStyle = '#141414';
            ctx.lineWidth = 1;

            const gridSize = 80;
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

            ctx.restore();
        };

        const draw = () => {
            const rect = canvas.getBoundingClientRect();
            const w = rect.width;
            const h = rect.height;

            // Smooth mouse interpolation (lerp for fluid feel)
            smoothMouseRef.current.x += (mouseRef.current.x - smoothMouseRef.current.x) * 0.08;
            smoothMouseRef.current.y += (mouseRef.current.y - smoothMouseRef.current.y) * 0.08;

            ctx.clearRect(0, 0, w, h);

            // Draw structural grid
            drawGrid(w, h);

            // Draw shapes
            for (const shape of shapesRef.current) {
                drawShape(shape, w, h);
            }

            animRef.current = requestAnimationFrame(draw);
        };

        resize();
        window.addEventListener('resize', resize);
        window.addEventListener('mousemove', onMouseMove);

        draw();

        return () => {
            window.removeEventListener('resize', resize);
            window.removeEventListener('mousemove', onMouseMove);
            cancelAnimationFrame(animRef.current);
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
