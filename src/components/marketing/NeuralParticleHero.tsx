'use client';

import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

const ANALYSIS_SECTIONS = [
    { label: 'Report', desc: 'Trigger mechanics & narrative framework' },
    { label: 'Intelligence', desc: 'Neural thesis & strategic verdict' },
    { label: 'Forensics', desc: 'Evidence anchors & friction zones' },
    { label: 'Pulse', desc: 'Platform affinity & emotional drivers' },
    { label: 'Prompt', desc: 'Reconstruction blueprint' },
    { label: 'Audience', desc: 'Psychographic persona mapping' },
];

const INNER_RING = [
    'Trigger Mechanic', 'Semiotic Layer',
    'Palette Logic', 'Gaze Vector',
    'Evidence Anchors', 'Narrative Arc',
];

const OUTER_RING = [
    'Status Signaling', 'The Sovereign', 'Restraint as Status',
    'Cognitive Load', 'Price Friction', 'Schema Autopsy',
    'Scarcity Cue', 'Persuasion Stack', 'Emotional Driver',
];

interface NodeData {
    baseX: number; baseY: number; x: number; y: number;
    driftSpeed: number; driftPhase: number;
    radius: number; label: string; ring: 'hub' | 'inner' | 'outer';
}

interface TravelDot {
    fromIdx: number; toIdx: number; progress: number; speed: number; alpha: number;
}

export default function NeuralParticleHero() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const animRef = useRef<number>(0);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let W = 0, H = 0, t = 0, dotTimer = 0;
        const nodes: NodeData[] = [];
        const dots: TravelDot[] = [];

        const buildNodes = () => {
            nodes.length = 0;
            const cx = W / 2, cy = H / 2;
            const ir = Math.min(W, H) * 0.24;
            const or = Math.min(W, H) * 0.42;

            nodes.push({ baseX: cx, baseY: cy, x: cx, y: cy, driftSpeed: 0, driftPhase: 0, radius: 10, label: 'VD', ring: 'hub' });

            INNER_RING.forEach((label, i) => {
                const angle = (i / INNER_RING.length) * Math.PI * 2 - Math.PI / 2;
                const bx = cx + Math.cos(angle) * ir;
                const by = cy + Math.sin(angle) * ir;
                nodes.push({ baseX: bx, baseY: by, x: bx, y: by, driftSpeed: 0.35 + Math.random() * 0.25, driftPhase: Math.random() * Math.PI * 2, radius: 5, label, ring: 'inner' });
            });

            OUTER_RING.forEach((label, i) => {
                const angle = (i / OUTER_RING.length) * Math.PI * 2 - Math.PI / 6;
                const r = or * (0.9 + Math.random() * 0.2);
                const bx = cx + Math.cos(angle) * r;
                const by = cy + Math.sin(angle) * r;
                nodes.push({ baseX: bx, baseY: by, x: bx, y: by, driftSpeed: 0.28 + Math.random() * 0.35, driftPhase: Math.random() * Math.PI * 2, radius: 3, label, ring: 'outer' });
            });
        };

        const resize = () => {
            const dpr = window.devicePixelRatio || 1;
            const rect = canvas.getBoundingClientRect();
            W = rect.width; H = rect.height;
            canvas.width = W * dpr; canvas.height = H * dpr;
            ctx.scale(dpr, dpr);
            buildNodes();
        };

        resize();
        const ro = new ResizeObserver(resize);
        ro.observe(canvas);

        const spawnDot = () => {
            const roll = Math.random();
            let from: number, to: number;
            if (roll < 0.5) { from = 0; to = 1 + Math.floor(Math.random() * INNER_RING.length); }
            else if (roll < 0.8) { from = 1 + Math.floor(Math.random() * INNER_RING.length); to = 1 + INNER_RING.length + Math.floor(Math.random() * OUTER_RING.length); }
            else { from = 1 + INNER_RING.length + Math.floor(Math.random() * OUTER_RING.length); to = 1 + INNER_RING.length + Math.floor(Math.random() * OUTER_RING.length); if (from === to) return; }
            dots.push({ fromIdx: from, toIdx: to, progress: 0, speed: 0.006 + Math.random() * 0.007, alpha: 0.7 + Math.random() * 0.3 });
        };

        const draw = () => {
            ctx.clearRect(0, 0, W, H);
            t += 0.01; dotTimer++;
            if (dotTimer % 16 === 0) spawnDot();

            // Drift nodes
            for (const n of nodes) {
                if (n.ring === 'hub') continue;
                const drift = n.ring === 'inner' ? 7 : 11;
                n.x = n.baseX + Math.cos(t * n.driftSpeed + n.driftPhase) * drift * 0.5;
                n.y = n.baseY + Math.sin(t * n.driftSpeed * 1.3 + n.driftPhase) * drift * 0.4;
            }

            // Hub → inner edges (gold)
            for (let i = 1; i <= INNER_RING.length; i++) {
                ctx.beginPath();
                ctx.moveTo(nodes[0].x, nodes[0].y);
                ctx.lineTo(nodes[i].x, nodes[i].y);
                ctx.strokeStyle = `rgba(193,166,123,0.25)`;
                ctx.lineWidth = 0.8;
                ctx.stroke();
            }

            // Inner → outer by proximity
            const outerStart = 1 + INNER_RING.length;
            for (let i = 1; i <= INNER_RING.length; i++) {
                let best1 = -1, best1d = Infinity, best2 = -1, best2d = Infinity;
                for (let j = outerStart; j < nodes.length; j++) {
                    const d = Math.hypot(nodes[i].x - nodes[j].x, nodes[i].y - nodes[j].y);
                    if (d < best1d) { best2 = best1; best2d = best1d; best1 = j; best1d = d; }
                    else if (d < best2d) { best2 = j; best2d = d; }
                }
                if (best1 >= 0) { ctx.beginPath(); ctx.moveTo(nodes[i].x, nodes[i].y); ctx.lineTo(nodes[best1].x, nodes[best1].y); ctx.strokeStyle = `rgba(220,210,195,0.15)`; ctx.lineWidth = 0.6; ctx.stroke(); }
                if (best2 >= 0 && best2d < 240) { ctx.beginPath(); ctx.moveTo(nodes[i].x, nodes[i].y); ctx.lineTo(nodes[best2].x, nodes[best2].y); ctx.strokeStyle = `rgba(220,210,195,0.08)`; ctx.lineWidth = 0.5; ctx.stroke(); }
            }

            // Outer-outer proximity edges
            for (let i = outerStart; i < nodes.length; i++) {
                for (let j = i + 1; j < nodes.length; j++) {
                    const d = Math.hypot(nodes[i].x - nodes[j].x, nodes[i].y - nodes[j].y);
                    if (d < 150) { ctx.beginPath(); ctx.moveTo(nodes[i].x, nodes[i].y); ctx.lineTo(nodes[j].x, nodes[j].y); ctx.strokeStyle = `rgba(220,210,195,${0.07 * (1 - d / 150)})`; ctx.lineWidth = 0.4; ctx.stroke(); }
                }
            }

            // Traveling dots
            for (let i = dots.length - 1; i >= 0; i--) {
                const dot = dots[i];
                dot.progress += dot.speed;
                if (dot.progress >= 1) { dots.splice(i, 1); continue; }
                const from = nodes[dot.fromIdx], to = nodes[dot.toIdx];
                const px = from.x + (to.x - from.x) * dot.progress;
                const py = from.y + (to.y - from.y) * dot.progress;
                const fade = Math.min(dot.progress * 6, 1) * Math.min((1 - dot.progress) * 6, 1);
                const a = fade * dot.alpha;

                const halo = ctx.createRadialGradient(px, py, 0, px, py, 8);
                halo.addColorStop(0, `rgba(193,166,123,${a * 0.45})`);
                halo.addColorStop(1, 'transparent');
                ctx.beginPath(); ctx.arc(px, py, 8, 0, Math.PI * 2);
                ctx.fillStyle = halo; ctx.fill();

                ctx.beginPath(); ctx.arc(px, py, 2, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(193,166,123,${a})`; ctx.fill();
            }

            // Draw nodes
            for (const n of nodes) {
                const pulse = n.ring === 'hub' ? 1 + 0.12 * Math.sin(t * 1.8) : 1 + 0.07 * Math.sin(t * n.driftSpeed + n.driftPhase);

                if (n.ring === 'hub') {
                    // Pulsing rings
                    for (let r = 3; r >= 1; r--) {
                        const rr = n.radius * (2.8 + r * 1.6) * (1 + 0.05 * Math.sin(t * 1.8 - r * 0.6));
                        ctx.beginPath(); ctx.arc(n.x, n.y, rr, 0, Math.PI * 2);
                        ctx.strokeStyle = `rgba(193,166,123,${0.12 / r})`; ctx.lineWidth = 1; ctx.stroke();
                    }
                    ctx.beginPath(); ctx.arc(n.x, n.y, n.radius * pulse, 0, Math.PI * 2);
                    ctx.fillStyle = '#C1A67B'; ctx.fill();
                    ctx.font = `700 8px "Inter",sans-serif`;
                    ctx.fillStyle = '#141414';
                    ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
                    ctx.fillText('VD', n.x, n.y);
                    ctx.textAlign = 'left'; ctx.textBaseline = 'alphabetic';
                    continue;
                }

                // Glow
                const glowR = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, n.radius * 5);
                glowR.addColorStop(0, n.ring === 'inner' ? 'rgba(193,166,123,0.18)' : 'rgba(200,190,175,0.12)');
                glowR.addColorStop(1, 'transparent');
                ctx.beginPath(); ctx.arc(n.x, n.y, n.radius * 5, 0, Math.PI * 2);
                ctx.fillStyle = glowR; ctx.fill();

                // Node
                ctx.beginPath(); ctx.arc(n.x, n.y, n.radius * pulse, 0, Math.PI * 2);
                ctx.fillStyle = n.ring === 'inner' ? 'rgba(193,166,123,0.9)' : 'rgba(160,150,140,0.6)';
                ctx.fill();

                // Label
                const fs = n.ring === 'inner' ? 10 : 8.5;
                ctx.font = `${n.ring === 'inner' ? 600 : 400} ${fs}px "Inter",sans-serif`;
                ctx.fillStyle = n.ring === 'inner' ? 'rgba(251,251,246,0.8)' : 'rgba(200,190,175,0.55)';
                const off = n.radius * pulse + 7;
                ctx.textAlign = n.x > W / 2 ? 'right' : 'left';
                ctx.fillText(n.label, n.x > W / 2 ? n.x - off : n.x + off, n.y + fs * 0.35);
                ctx.textAlign = 'left';
            }

            animRef.current = requestAnimationFrame(draw);
        };

        draw();
        return () => { cancelAnimationFrame(animRef.current); ro.disconnect(); };
    }, []);

    return (
        <div className="w-full max-w-[1200px] mx-auto mt-8 mb-3 md:mt-10 md:mb-4">
            <div className="rounded-[24px] md:rounded-[28px] overflow-hidden bg-[#1A1A1A] border border-[#D4A574]/20 flex flex-col lg:flex-row" style={{ minHeight: '420px' }}>

                {/* ── Left Panel: Title + Analysis Sections ── */}
                <div className="lg:w-[300px] shrink-0 flex flex-col justify-center px-10 py-12 border-b lg:border-b-0 lg:border-r border-white/5">

                    {/* Status pill */}
                    <motion.div
                        initial={{ opacity: 0, y: -8 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        className="flex items-center gap-2 mb-8"
                    >
                        <span className="w-1.5 h-1.5 rounded-full bg-[#C1A67B] animate-pulse" />
                        <span className="text-[8px] font-mono text-[#C1A67B]/60 uppercase tracking-[0.3em]">
                            Intelligence Active
                        </span>
                    </motion.div>

                    {/* Title */}
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, delay: 0.15 }}
                    >
                        <h2 className="text-[26px] font-bold text-[#C1A67B] leading-[1.1] tracking-tight uppercase mb-10">
                            Neural<br />Intelligence<br />Ad Analysis
                        </h2>
                    </motion.div>

                    {/* Analysis sections */}
                    <div className="flex flex-col gap-4">
                        {ANALYSIS_SECTIONS.map((s, i) => (
                            <motion.div
                                key={s.label}
                                initial={{ opacity: 0, x: -12 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.5, delay: 0.25 + i * 0.07 }}
                                className="flex items-start gap-3 group"
                            >
                                <div className="w-px h-full bg-[#C1A67B]/20 shrink-0 mt-1" style={{ minHeight: '14px' }} />
                                <div>
                                    <span className="text-[13px] font-semibold text-[#FBFBF6]/70 tracking-wide group-hover:text-[#C1A67B] transition-colors duration-300">
                                        {s.label}
                                    </span>
                                    <p className="text-[10px] text-[#FBFBF6]/25 mt-0.5 leading-snug">{s.desc}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    {/* Bottom label */}
                    <div className="mt-10 pt-8 border-t border-white/5">
                        <p className="text-[8px] font-mono text-[#FBFBF6]/15 uppercase tracking-[0.25em]">
                            Visual Decompiler — Sovereignty Tier
                        </p>
                    </div>
                </div>

                {/* ── Right Panel: Neural Graph Canvas ── */}
                <div className="flex-1 relative">
                    {/* Top label */}
                    <div className="absolute top-4 left-5 z-10 flex items-center gap-2">
                        <span className="w-1 h-1 rounded-full bg-[#C1A67B]/50 animate-pulse" />
                        <span className="text-[8px] font-mono text-[#FBFBF6]/20 uppercase tracking-[0.25em]">
                            Neural Map — Live
                        </span>
                    </div>

                    <canvas
                        ref={canvasRef}
                        className="w-full h-full"
                        style={{ display: 'block', minHeight: '360px' }}
                    />
                </div>
            </div>
        </div>
    );
}
