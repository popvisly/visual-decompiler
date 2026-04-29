'use client';

import React, { useEffect, useRef, useState } from 'react';
import { motion, MotionValue, useReducedMotion, useScroll, useTransform } from 'framer-motion';

export function ContainerScroll({
    titleComponent,
    children,
}: {
    titleComponent: React.ReactNode;
    children: React.ReactNode;
}) {
    const containerRef = useRef<HTMLDivElement>(null);
    const prefersReducedMotion = useReducedMotion();

    const { scrollYProgress } = useScroll({
        target: containerRef,
    });

    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth <= 768);
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    const rotate = prefersReducedMotion ? (0 as any) : useTransform(scrollYProgress, [0, 1], [18, 0]);
    const scale = prefersReducedMotion
        ? (1 as any)
        : useTransform(scrollYProgress, [0, 1], isMobile ? [0.86, 1] : [1.04, 1]);
    const translate = prefersReducedMotion ? (0 as any) : useTransform(scrollYProgress, [0, 1], [0, -60]);

    return (
        <div ref={containerRef} className="relative flex h-[56rem] items-center justify-center p-2 md:h-[78rem] md:p-12">
            <div className="relative w-full py-10 md:py-36" style={{ perspective: '1100px' }}>
                <Header translate={translate} titleComponent={titleComponent} />
                <Card rotate={rotate} scale={scale} translate={translate}>
                    {children}
                </Card>
            </div>
        </div>
    );
}

export function Header({ translate, titleComponent }: { translate: MotionValue<number>; titleComponent: React.ReactNode }) {
    return (
        <motion.div
            style={{ translateY: translate }}
            className="relative z-20 mx-auto max-w-[1200px] px-6 pt-10 text-center md:pt-12 lg:px-12"
        >
            {titleComponent}
        </motion.div>
    );
}

export function Card({
    rotate,
    scale,
    children,
}: {
    rotate: MotionValue<number>;
    scale: MotionValue<number>;
    translate: MotionValue<number>;
    children: React.ReactNode;
}) {
    return (
        <motion.div
            style={{
                rotateX: rotate,
                scale,
                boxShadow:
                    '0 0 rgba(0,0,0,0.03), 0 10px 22px rgba(0,0,0,0.08), 0 42px 52px rgba(0,0,0,0.10), 0 110px 90px rgba(0,0,0,0.08), 0 200px 140px rgba(0,0,0,0.05)',
            }}
            className="mx-auto -mt-10 h-[32rem] w-full max-w-[1200px] rounded-[24px] border border-black/10 bg-white p-2 shadow-sm md:-mt-14 md:h-[46rem] md:p-3"
        >
            <div className="h-full w-full overflow-hidden rounded-[20px] bg-[#FBFBF6]">
                {children}
            </div>
        </motion.div>
    );
}
