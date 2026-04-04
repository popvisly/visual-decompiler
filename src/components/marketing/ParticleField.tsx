'use client';

import { useEffect, useRef } from 'react';

export default function ParticleField() {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let animationFrameId: number;
        let particles: Particle[] = [];
        const mouse = { x: -1000, y: -1000 };
        let time = 0;

        const resize = () => {
            const rect = canvas.getBoundingClientRect();
            canvas.width = rect.width;
            canvas.height = rect.height;
            initParticles();
        };

        class Particle {
            x: number;
            y: number;
            prevX: number;
            prevY: number;
            vx: number;
            vy: number;
            color: string;
            alpha: number;
            speedFactor: number;

            constructor(x: number, y: number) {
                this.x = x;
                this.y = y;
                this.prevX = x;
                this.prevY = y;
                this.vx = 0;
                this.vy = 0;
                
                // High-voltage, super vibrant tech palette
                const colors = ['#FF003C', '#00E5FF', '#BD00FF', '#FFEA00', '#00FF66'];
                this.color = colors[Math.floor(Math.random() * colors.length)];
                
                this.speedFactor = Math.random() * 1.2 + 0.6; // slightly faster for energy
                this.alpha = Math.random() * 0.4 + 0.1;
            }

            draw() {
                if (!ctx) return;
                
                ctx.strokeStyle = this.color;
                ctx.globalAlpha = this.alpha;
                ctx.globalCompositeOperation = 'lighter'; // Additive blending for neon glow
                ctx.lineWidth = 1.5; // Slightly thicker
                ctx.beginPath();
                ctx.moveTo(this.prevX, this.prevY);
                ctx.lineTo(this.x, this.y);
                ctx.stroke();
            }

            update() {
                this.prevX = this.x;
                this.prevY = this.y;

                // Flow field math - lower scale for wider, smoother curves
                const scale = 0.0015;
                const angle = 
                    (Math.sin(this.x * scale + time) * 2 + 
                     Math.cos(this.y * scale + time) * 2) * Math.PI;
                
                // Direct overriding of velocity creates strict flow lines instead of momentum trails
                this.vx = Math.cos(angle) * this.speedFactor * 2.5;
                this.vy = Math.sin(angle) * this.speedFactor * 2.5;

                // Mouse interaction - slightly deflects flow field near mouse
                const dx = mouse.x - this.x;
                const dy = mouse.y - this.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                const interactionRadius = 250;
                if (distance < interactionRadius) {
                    const force = (interactionRadius - distance) / interactionRadius;
                    // Deflect orthogonally around the cursor
                    const pushX = -(dy / distance) * force * 1.5;
                    const pushY = (dx / distance) * force * 1.5;
                    
                    this.vx += pushX;
                    this.vy += pushY;
                }

                this.x += this.vx;
                this.y += this.vy;

                let wrapped = false;
                // Wrap edges
                if (this.x < 0) { this.x = canvas!.width; wrapped = true; }
                if (this.x > canvas!.width) { this.x = 0; wrapped = true; }
                if (this.y < 0) { this.y = canvas!.height; wrapped = true; }
                if (this.y > canvas!.height) { this.y = 0; wrapped = true; }

                // If wrapped, update prev to avoid drawing a strict line across the entire screen
                if (wrapped) {
                    this.prevX = this.x;
                    this.prevY = this.y;
                }

                this.draw();
            }
        }

        const initParticles = () => {
            particles = [];
            // Line flow fields require many particles
            const numberOfParticles = Math.floor((canvas.width * canvas.height) / 3000); 
            for (let i = 0; i < numberOfParticles; i++) {
                const x = Math.random() * canvas.width;
                const y = Math.random() * canvas.height;
                particles.push(new Particle(x, y));
            }
        };

        const animate = () => {
            if (!ctx || !canvas) return;
            
            // Very slow fade with deeper dark background
            ctx.globalAlpha = 1.0;
            ctx.globalCompositeOperation = 'source-over'; // reset for background clearing
            ctx.fillStyle = 'rgba(5, 5, 5, 0.08)'; 
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            
            time += 0.0005; // very slow evolution
            
            for (let i = 0; i < particles.length; i++) {
                particles[i].update();
            }
            
            animationFrameId = requestAnimationFrame(animate);
        };

        const handleMouseMove = (e: MouseEvent) => {
            const rect = canvas.getBoundingClientRect();
            mouse.x = e.clientX - rect.left;
            mouse.y = e.clientY - rect.top;
        };
        
        const handleMouseLeave = () => {
            mouse.x = -1000;
            mouse.y = -1000;
        };

        window.addEventListener('resize', resize);
        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('mouseout', handleMouseLeave);

        resize();
        animate();

        return () => {
            window.removeEventListener('resize', resize);
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseout', handleMouseLeave);
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
