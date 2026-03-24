'use client';

import { useEffect, useRef, useState } from 'react';

type Cluster = {
    name: string;
    color: string;
    centerX: number;
    centerY: number;
    radius: number;
    info: string;
};

type Persona = {
    role: string;
    subtitle: string;
    color: string;
};

type LabelState = {
    clusterIndex: number;
    x: number;
    y: number;
};

const CLUSTERS: Cluster[] = [
    {
        name: 'Status',
        color: '#F4A700',
        centerX: 0.7,
        centerY: 0.3,
        radius: 0.15,
        info: 'Social positioning & aspiration triggers',
    },
    {
        name: 'Authority',
        color: '#D4A574',
        centerX: 0.3,
        centerY: 0.3,
        radius: 0.15,
        info: 'Credibility signals & expert validation',
    },
    {
        name: 'Scarcity',
        color: '#C8230A',
        centerX: 0.5,
        centerY: 0.15,
        radius: 0.12,
        info: 'Urgency mechanics & availability pressure',
    },
    {
        name: 'Social Proof',
        color: '#FBFBF6',
        centerX: 0.7,
        centerY: 0.7,
        radius: 0.13,
        info: 'Community validation & consensus signals',
    },
    {
        name: 'Utility',
        color: '#888888',
        centerX: 0.3,
        centerY: 0.7,
        radius: 0.1,
        info: 'Functional benefits & problem resolution',
    },
    {
        name: 'Persuasion',
        color: '#F4A700',
        centerX: 0.5,
        centerY: 0.5,
        radius: 0.18,
        info: 'Composite influence architecture & decision triggers',
    },
];

const PERSONAS: Persona[] = [
    {
        role: 'Advertising',
        subtitle:
            'Drop any ad. See the invisible persuasion mechanics, strategic signals, and reconstruction blueprint — in under 60 seconds.',
        color: '#D4A574',
    },
    {
        role: 'Art Directors',
        subtitle:
            'Decode visual hierarchy, chromatic psychology, and composition mechanics — translate competitor creative into actionable design principles.',
        color: '#F4A700',
    },
    {
        role: 'New Business',
        subtitle:
            'Walk into pitches with forensic proof of what works in the category — competitive intelligence that positions you as the strategic authority.',
        color: '#C8230A',
    },
    {
        role: 'Creative Directors',
        subtitle:
            'Stop guessing what resonates. Get structured creative briefs, persuasion maps, and rebuild blueprints for every asset you analyze.',
        color: '#FBFBF6',
    },
    {
        role: 'Strategy Directors',
        subtitle:
            'Surface the invisible mechanics competitors deploy — signal stacks, trigger distribution, and strategic posture at category scale.',
        color: '#F4A700',
    },
    {
        role: 'Brand Managers',
        subtitle:
            'Benchmark your creative against category patterns. Identify what drives engagement and where your assets lose persuasion power.',
        color: '#D4A574',
    },
    {
        role: 'Copywriters',
        subtitle:
            'Extract narrative frameworks, hook mechanics, and objection dismantling patterns from any ad — ready to adapt into your next brief.',
        color: '#C8230A',
    },
];

const READOUT_ITEMS = [
    { name: 'Status Signaling', value: 'MEDIUM' },
    { name: 'Scarcity Cue', value: 'HIGH' },
    { name: 'Narrative Arc', value: 'HIGH' },
    { name: 'Friction Risk', value: 'LOW' },
];

function isInCenterZone(x: number, y: number, width: number, height: number) {
    const centerX = width / 2;
    const centerY = height / 2;
    const exclusionWidth = width * 0.4;
    const exclusionHeight = height * 0.3;

    return Math.abs(x - centerX) < exclusionWidth / 2 && Math.abs(y - centerY) < exclusionHeight / 2;
}

function createLabel(clusterIndex: number, width: number, height: number): LabelState {
    return {
        clusterIndex,
        x: CLUSTERS[clusterIndex].centerX * width,
        y: CLUSTERS[clusterIndex].centerY * height,
    };
}

export default function AnalyticalHero() {
    const sectionRef = useRef<HTMLElement | null>(null);
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const [personaIndex, setPersonaIndex] = useState(0);
    const [activeLabel, setActiveLabel] = useState<LabelState | null>(null);
    const [queuedLabel, setQueuedLabel] = useState<LabelState | null>(null);
    const [isHoveringLabel, setIsHoveringLabel] = useState(false);
    const activeLabelRef = useRef<LabelState | null>(null);
    const queuedLabelRef = useRef<LabelState | null>(null);
    const hoverRef = useRef(false);

    useEffect(() => {
        activeLabelRef.current = activeLabel;
    }, [activeLabel]);

    useEffect(() => {
        queuedLabelRef.current = queuedLabel;
    }, [queuedLabel]);

    useEffect(() => {
        let intervalId: number | null = null;
        let timeoutId: number | null = null;

        timeoutId = window.setTimeout(() => {
            intervalId = window.setInterval(() => {
                setPersonaIndex((current) => (current + 1) % PERSONAS.length);
            }, 8000);
        }, 8000);

        return () => {
            if (timeoutId) window.clearTimeout(timeoutId);
            if (intervalId) window.clearInterval(intervalId);
        };
    }, []);

    useEffect(() => {
        const section = sectionRef.current;
        const canvas = canvasRef.current;

        if (!section || !canvas) return;

        const context = canvas.getContext('2d');
        if (!context) return;
        const ctx = context;

        let width = 0;
        let height = 0;
        let animationFrame = 0;
        const mouse = { x: 0, y: 0 };

        class Particle {
            x: number;
            y: number;
            vx: number;
            vy: number;
            size: number;
            cluster: Cluster;
            opacity: number;
            angle: number;
            orbitSpeed: number;

            constructor() {
                this.x = Math.random() * width;
                this.y = Math.random() * height;
                this.vx = 0;
                this.vy = 0;
                this.size = Math.random() * 2 + 1;
                this.cluster = CLUSTERS[Math.floor(Math.random() * CLUSTERS.length)];
                this.opacity = Math.random() * 0.4 + 0.2;
                this.angle = Math.random() * Math.PI * 2;
                this.orbitSpeed = (Math.random() - 0.5) * 0.001;
            }

            update() {
                const dx = mouse.x - this.x;
                const dy = mouse.y - this.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                const force = Math.min(100 / (distance + 1), 1);

                const clusterX = this.cluster.centerX * width;
                const clusterY = this.cluster.centerY * height;
                const cdx = clusterX - this.x;
                const cdy = clusterY - this.y;

                this.vx += cdx * 0.0005 + dx * 0.02 * force;
                this.vy += cdy * 0.0005 + dy * 0.02 * force;

                this.vx *= 0.95;
                this.vy *= 0.95;

                this.x += this.vx;
                this.y += this.vy;

                this.angle += this.orbitSpeed;
                this.x += Math.cos(this.angle) * 0.1;
                this.y += Math.sin(this.angle) * 0.1;

                if (this.x < 0) this.x = width;
                if (this.x > width) this.x = 0;
                if (this.y < 0) this.y = height;
                if (this.y > height) this.y = 0;
            }

            draw(particles: Particle[]) {
                const r = parseInt(this.cluster.color.slice(1, 3), 16);
                const g = parseInt(this.cluster.color.slice(3, 5), 16);
                const b = parseInt(this.cluster.color.slice(5, 7), 16);

                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${this.opacity})`;
                ctx.fill();

                particles.forEach((other) => {
                    if (other === this) return;

                    const dx = other.x - this.x;
                    const dy = other.y - this.y;
                    const dist = Math.sqrt(dx * dx + dy * dy);

                    if (dist < 80 && this.cluster === other.cluster) {
                        ctx.beginPath();
                        ctx.moveTo(this.x, this.y);
                        ctx.lineTo(other.x, other.y);
                        ctx.strokeStyle = `rgba(${r}, ${g}, ${b}, ${0.05 * (1 - dist / 80)})`;
                        ctx.lineWidth = 0.5;
                        ctx.stroke();
                    }
                });
            }
        }

        let particles: Particle[] = [];

        const pickRandomClusterIndex = (exclude?: number) => {
            let randomCluster = 0;
            let attempts = 0;

            do {
                randomCluster = Math.floor(Math.random() * CLUSTERS.length);
                attempts += 1;
            } while (
                ((randomCluster === exclude) ||
                    isInCenterZone(CLUSTERS[randomCluster].centerX * width, CLUSTERS[randomCluster].centerY * height, width, height)) &&
                attempts < 20
            );

            return randomCluster;
        };

        const showRandomLabel = () => {
            const clusterIndex = pickRandomClusterIndex();
            setActiveLabel(createLabel(clusterIndex, width, height));
            setQueuedLabel(null);
            setIsHoveringLabel(false);
        };

        const showNextLabel = (exclude: number) => {
            const availableClusterIndex = pickRandomClusterIndex(exclude);
            setQueuedLabel(createLabel(availableClusterIndex, width, height));
        };

        const fadeOutCurrentLabel = () => {
            setIsHoveringLabel(false);

            window.setTimeout(() => {
                const next = queuedLabelRef.current;
                if (next) {
                    setActiveLabel(next);
                    setQueuedLabel(null);
                }
            }, 300);
        };

        const resizeCanvas = () => {
            width = section.clientWidth;
            height = section.clientHeight;

            const dpr = window.devicePixelRatio || 1;
            canvas.width = width * dpr;
            canvas.height = height * dpr;
            canvas.style.width = `${width}px`;
            canvas.style.height = `${height}px`;
            ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

            mouse.x = width / 2;
            mouse.y = height / 2;
            particles = Array.from({ length: 800 }, () => new Particle());
        };

        const handlePointerMove = (event: PointerEvent) => {
            const rect = canvas.getBoundingClientRect();
            mouse.x = event.clientX - rect.left;
            mouse.y = event.clientY - rect.top;

            const current = activeLabelRef.current;
            if (!current) return;

            const dx = mouse.x - current.x;
            const dy = mouse.y - current.y;
            const dist = Math.sqrt(dx * dx + dy * dy);

            if (dist < 100) {
                if (!hoverRef.current) {
                    hoverRef.current = true;
                    setIsHoveringLabel(true);
                    if (!queuedLabelRef.current) {
                        showNextLabel(current.clusterIndex);
                    }
                }
            } else if (hoverRef.current) {
                hoverRef.current = false;
                fadeOutCurrentLabel();
            }
        };

        const handleClick = () => {
            particles.forEach((particle) => {
                particle.cluster = CLUSTERS[Math.floor(Math.random() * CLUSTERS.length)];
                particle.opacity = Math.random() * 0.5 + 0.3;
            });
        };

        const animate = () => {
            ctx.fillStyle = 'rgba(20, 20, 20, 0.3)';
            ctx.fillRect(0, 0, width, height);

            particles.forEach((particle) => {
                particle.update();
                particle.draw(particles);
            });

            animationFrame = window.requestAnimationFrame(animate);
        };

        resizeCanvas();
        animate();

        const labelTimeout = window.setTimeout(showRandomLabel, 1000);

        window.addEventListener('resize', resizeCanvas);
        canvas.addEventListener('pointermove', handlePointerMove);
        canvas.addEventListener('pointerleave', () => {
            if (hoverRef.current) {
                hoverRef.current = false;
                fadeOutCurrentLabel();
            }
        });
        canvas.addEventListener('click', handleClick);

        return () => {
            window.clearTimeout(labelTimeout);
            window.cancelAnimationFrame(animationFrame);
            window.removeEventListener('resize', resizeCanvas);
            canvas.removeEventListener('pointermove', handlePointerMove);
            canvas.removeEventListener('click', handleClick);
        };
    }, []);

    const persona = PERSONAS[personaIndex];
    const currentCluster = activeLabel ? CLUSTERS[activeLabel.clusterIndex] : null;
    const nextCluster = queuedLabel ? CLUSTERS[queuedLabel.clusterIndex] : null;

    return (
        <section
            ref={sectionRef}
            className="relative isolate min-h-[100svh] overflow-hidden bg-[#141414] text-[#FBFBF6] cursor-crosshair"
        >
            <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />

            <div className="pointer-events-none absolute left-10 top-10 z-20 hidden text-[11px] font-medium tracking-[0.18em] text-[#D4A574] lg:block">
                Visual Decompiler
            </div>

            <div className="pointer-events-none absolute right-10 top-10 z-20 hidden text-right text-[11px] leading-relaxed text-[#9A9A94]/50 lg:block">
                Hover to reveal
                <br />
                signal architecture
            </div>

            <div className="pointer-events-none absolute bottom-10 left-10 z-20 hidden text-[11px] text-[#9A9A94]/60 lg:block">
                Live analysis mode
            </div>

            <div className="pointer-events-none absolute bottom-10 right-10 z-20 hidden min-w-[200px] rounded-lg border border-[#D4A574]/30 bg-[#141414]/95 px-5 py-4 lg:block">
                <p className="mb-3 text-[9px] font-medium uppercase tracking-[0.12em] text-[#D4A574]">Signal Readout</p>
                {READOUT_ITEMS.map((item) => (
                    <div key={item.name} className="flex items-baseline justify-between border-b border-[#D4A574]/15 py-1.5 last:border-b-0">
                        <span className="text-[11px] text-[#9A9A94]">{item.name}</span>
                        <span className="text-[13px] font-medium text-[#D7B07A]">{item.value}</span>
                    </div>
                ))}
            </div>

            <div className="pointer-events-none absolute inset-0 z-10 flex items-center justify-center px-6 text-center">
                <div className="max-w-[900px]">
                    <h1 className="text-[36px] font-medium leading-[1.2] tracking-[-0.5px] text-[#FBFBF6] sm:text-[44px] md:text-[56px]">
                        Forensic Intelligence
                        <br />
                        for{' '}
                        <span
                            className="transition-[opacity,color] duration-[600ms] ease-in-out"
                            style={{ color: persona.color }}
                        >
                            {persona.role}
                        </span>
                    </h1>
                    <p className="mx-auto mt-6 max-w-[600px] text-[16px] leading-[1.6] text-[#9A9A94] transition-opacity duration-[600ms] ease-in-out">
                        {persona.subtitle}
                    </p>
                </div>
            </div>

            {activeLabel && currentCluster && (
                <>
                    <div
                        className={`pointer-events-none absolute z-20 rounded-md border bg-[#141414]/95 px-4 py-2 text-[11px] font-medium uppercase tracking-[0.1em] text-[#D4A574] transition-opacity duration-200 ${
                            isHoveringLabel ? 'border-[#D7B07A] shadow-[0_0_15px_rgba(215,176,122,0.3),0_0_30px_rgba(215,176,122,0.15)]' : 'border-[#D4A574]/30'
                        }`}
                        style={{
                            left: `${activeLabel.x + 30}px`,
                            top: `${activeLabel.y - 10}px`,
                            opacity: 1,
                        }}
                    >
                        {currentCluster.name}
                    </div>

                    {queuedLabel && nextCluster && (
                        <div
                            className="pointer-events-none absolute z-20 rounded-md border border-[#D4A574]/30 bg-[#141414]/95 px-4 py-2 text-[11px] font-medium uppercase tracking-[0.1em] text-[#D4A574] transition-opacity duration-200"
                            style={{
                                left: `${queuedLabel.x + 30}px`,
                                top: `${queuedLabel.y - 10}px`,
                                opacity: 1,
                            }}
                        >
                            {nextCluster.name}
                        </div>
                    )}

                    <div
                        className={`pointer-events-none absolute z-20 max-w-[220px] rounded-[4px] bg-[#141414]/85 px-3 py-1.5 pl-5 text-[10px] leading-[1.4] text-[#9A9A94] transition-opacity duration-200 ${
                            isHoveringLabel ? 'opacity-100' : 'opacity-0'
                        }`}
                        style={{
                            left: `${activeLabel.x + 30}px`,
                            top: `${activeLabel.y + 32}px`,
                        }}
                    >
                        <span className="absolute left-2 top-1/2 h-0 w-0 -translate-y-1/2 border-b-[4px] border-l-[5px] border-r-0 border-t-[4px] border-b-transparent border-l-[#D4A574] border-t-transparent" />
                        {currentCluster.info}
                    </div>
                </>
            )}
        </section>
    );
}
