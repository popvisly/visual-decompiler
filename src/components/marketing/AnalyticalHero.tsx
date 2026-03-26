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
        centerY: 0.85,
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
        color: '#D4A574',
    },
    {
        role: 'Creative Directors',
        subtitle:
            'Stop guessing what resonates. Get structured creative briefs, persuasion maps, and rebuild blueprints for every asset you analyze.',
        color: '#F4A700',
    },
    {
        role: 'Strategy Directors',
        subtitle:
            'Surface the invisible mechanics competitors deploy — signal stacks, trigger distribution, and strategic posture at category scale.',
        color: '#D9D6D0',
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

export default function AnalyticalHero() {
    const sectionRef = useRef<HTMLElement | null>(null);
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const [personaIndex, setPersonaIndex] = useState(0);
    const [personaVisible, setPersonaVisible] = useState(true);
    const [labelIndex, setLabelIndex] = useState(0);
    const [labelVisible, setLabelVisible] = useState(true);

    useEffect(() => {
        let holdTimeout = 0;
        let fadeTimeout = 0;
        let cancelled = false;

        const scheduleCycle = () => {
            holdTimeout = window.setTimeout(() => {
                if (cancelled) return;
                setPersonaVisible(false);
                setLabelVisible(false);

                fadeTimeout = window.setTimeout(() => {
                    if (cancelled) return;
                    setPersonaIndex((current) => (current + 1) % PERSONAS.length);
                    setLabelIndex((current) => (current + 1) % CLUSTERS.length);
                    setPersonaVisible(true);
                    setLabelVisible(true);
                    scheduleCycle();
                }, 600);
            }, 8000);
        };

        scheduleCycle();

        return () => {
            cancelled = true;
            window.clearTimeout(holdTimeout);
            window.clearTimeout(fadeTimeout);
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

            draw() {
                const r = parseInt(this.cluster.color.slice(1, 3), 16);
                const g = parseInt(this.cluster.color.slice(3, 5), 16);
                const b = parseInt(this.cluster.color.slice(5, 7), 16);

                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${this.opacity})`;
                ctx.fill();
            }
        }

        let particles: Particle[] = [];

        const resizeCanvas = () => {
            width = section.clientWidth;
            height = section.clientHeight;

            const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
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

            for (let i = 0; i < particles.length; i += 1) {
                particles[i].update();
                particles[i].draw();
            }

            for (let i = 0; i < particles.length; i += 1) {
                const particle = particles[i];
                const r = parseInt(particle.cluster.color.slice(1, 3), 16);
                const g = parseInt(particle.cluster.color.slice(3, 5), 16);
                const b = parseInt(particle.cluster.color.slice(5, 7), 16);

                for (let j = i + 1; j < particles.length; j += 1) {
                    const other = particles[j];
                    if (particle.cluster !== other.cluster) continue;

                    const dx = other.x - particle.x;
                    const dy = other.y - particle.y;
                    const dist = Math.sqrt(dx * dx + dy * dy);

                    if (dist < 80) {
                        ctx.beginPath();
                        ctx.moveTo(particle.x, particle.y);
                        ctx.lineTo(other.x, other.y);
                        ctx.strokeStyle = `rgba(${r}, ${g}, ${b}, ${0.05 * (1 - dist / 80)})`;
                        ctx.lineWidth = 0.5;
                        ctx.stroke();
                    }
                }
            }

            animationFrame = window.requestAnimationFrame(animate);
        };

        resizeCanvas();
        animate();

        window.addEventListener('resize', resizeCanvas);
        canvas.addEventListener('pointermove', handlePointerMove);
        canvas.addEventListener('click', handleClick);

        return () => {
            window.cancelAnimationFrame(animationFrame);
            window.removeEventListener('resize', resizeCanvas);
            canvas.removeEventListener('pointermove', handlePointerMove);
            canvas.removeEventListener('click', handleClick);
        };
    }, []);

    const persona = PERSONAS[personaIndex];
    const currentCluster = CLUSTERS[labelIndex];

    return (
        <section ref={sectionRef} className="relative isolate min-h-[100svh] overflow-hidden bg-[#141414] text-[#FBFBF6]">
            <div className="pointer-events-none absolute inset-0 z-[5] opacity-[0.06] [background-image:linear-gradient(#D4A574_1.5px,transparent_1.5px),linear-gradient(90deg,#D4A574_1.5px,transparent_1.5px)] [background-size:40px_40px]" />
            <style>{`
                @keyframes logoPulse {
                    0%, 100% { opacity: 0.6; transform: scale(0.98); }
                    50% { opacity: 1; transform: scale(1.04); }
                }
                .animate-logo-pulse {
                    animation: logoPulse 3s ease-in-out infinite;
                }
            `}</style>
            <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />

            <div className="pointer-events-none absolute inset-0 z-10 flex items-center justify-center px-6 text-center">
                <div className="max-w-[900px] flex flex-col items-center">
                    <div className="mb-6 w-12 h-12 md:w-16 md:h-16 flex items-center justify-center animate-logo-pulse">
                        <img 
                            src="/images/logo/Visual_Decompiler_Logo_v2_400px.png" 
                            alt="Visual Decompiler Logo" 
                            className="w-full h-full object-contain drop-shadow-[0_0_15px_rgba(215,176,122,0.4)]"
                        />
                    </div>
                    <div className="flex flex-col gap-3 mb-6 items-center">
                        <span className="block text-[11px] font-bold uppercase tracking-[0.4em] text-[#D4A574]/80">Forensic Intelligence System</span>
                        <div className="h-px w-12 bg-[#D4A574]/30" />
                    </div>
                    <h1 className="text-[40px] font-bold leading-[1.1] tracking-tight text-[#FBFBF6] sm:text-[48px] md:text-[64px]">
                        See the strategy
                        <br />
                        <span
                            className="inline-block transition-[opacity,color] duration-[600ms] ease-in-out border-l-[3px] border-[#D4A574] pl-6 py-1 ml-4 mt-2"
                            style={{ color: persona.color, opacity: personaVisible ? 1 : 0 }}
                        >
                            {persona.role}
                        </span>
                    </h1>
                    <p
                        className="mx-auto mt-6 max-w-[600px] text-[16px] leading-[1.6] text-[#9A9A94] transition-opacity duration-[600ms] ease-in-out"
                        style={{ opacity: personaVisible ? 1 : 0 }}
                    >
                        {persona.subtitle}
                    </p>
                </div>
            </div>

            <div
                className={`pointer-events-none absolute z-20 transition-all duration-700 ease-in-out ${labelVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}
                style={{
                    left: `calc(${currentCluster.centerX * 100}% + 24px)`,
                    top: `calc(${currentCluster.centerY * 100}% - 24px)`,
                }}
            >
                <div className="border-l-[2px] border-[#D7B07A] bg-[#141414]/90 px-5 py-3 shadow-[0_4px_24px_rgba(0,0,0,0.4)] backdrop-blur-sm">
                    <div className="flex items-center gap-3 mb-1.5 border-b border-[#D7B07A]/20 pb-1.5">
                        <div className="h-1.5 w-1.5 rounded-full bg-[#D7B07A] animate-pulse" />
                        <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#D4A574]">{currentCluster.name}</span>
                    </div>
                    <p className="text-[11px] leading-relaxed text-[#D2CCC2] font-light italic max-w-[240px]">
                        {currentCluster.info}
                    </p>
                </div>
            </div>
            
        </section>
    );
}
