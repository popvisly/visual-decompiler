'use client';

import Image from 'next/image';
import { useReducedMotion } from 'framer-motion';
import { useEffect, useMemo, useState } from 'react';
import { HeroVisualItem } from '@/components/marketing/heroVisualData';

type HeroVisualComposerProps = {
    featured: HeroVisualItem[];
    supporting: HeroVisualItem[];
    intervalMs?: number;
    reducedMotion?: boolean;
};

type HeroVisualStageProps = {
    current: HeroVisualItem;
    previous?: HeroVisualItem | null;
    isTransitioning?: boolean;
    durationMs?: number;
    scaleCurrent?: boolean;
    onImageError: (item: HeroVisualItem) => void;
};

function nextValidIndex(items: HeroVisualItem[], invalidIds: Set<string>, startIndex: number) {
    if (items.length === 0) return -1;

    for (let offset = 0; offset < items.length; offset += 1) {
        const index = (startIndex + offset) % items.length;
        if (!invalidIds.has(items[index].id)) {
            return index;
        }
    }

    return -1;
}

function HeroVisualStage({
    current,
    previous = null,
    isTransitioning = false,
    durationMs = 380,
    scaleCurrent = false,
    onImageError,
}: HeroVisualStageProps) {
    const transitionStyle = useMemo(
        () => ({ transition: `opacity ${durationMs}ms ease` }),
        [durationMs],
    );

    return (
        <div className="relative h-[clamp(180px,26vh,230px)] w-full overflow-hidden rounded-[2rem] bg-[linear-gradient(135deg,#241d16_0%,#16120f_100%)] sm:h-[clamp(200px,28vh,250px)] lg:h-[clamp(220px,30vh,300px)]">
            {previous ? (
                <Image
                    key={`prev-${previous.id}`}
                    src={previous.src}
                    alt=""
                    fill
                    priority
                    sizes="(min-width: 1280px) 72vw, (min-width: 1024px) 68vw, 100vw"
                    className="pointer-events-none select-none object-cover"
                    style={{
                        objectPosition: previous.focalPoint || '50% 50%',
                        opacity: isTransitioning ? 0 : 1,
                        ...transitionStyle,
                    }}
                    onError={() => onImageError(previous)}
                />
            ) : null}

            <Image
                key={`cur-${current.id}`}
                src={current.src}
                alt={current.alt}
                fill
                priority
                sizes="(min-width: 1280px) 72vw, (min-width: 1024px) 68vw, 100vw"
                className="pointer-events-none select-none object-cover"
                style={{
                    objectPosition: current.focalPoint || '50% 50%',
                    opacity: 1,
                    transform: scaleCurrent ? 'scale(1.03)' : 'scale(1)',
                    transition: `${transitionStyle.transition}, transform ${Math.max(durationMs * 6, 2400)}ms linear`,
                }}
                onError={() => onImageError(current)}
            />

            <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(8,7,5,0.08)_0%,rgba(8,7,5,0.16)_35%,rgba(8,7,5,0.55)_100%)]" />
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_22%_18%,rgba(255,255,255,0.16)_0%,rgba(255,255,255,0)_26%)]" />
        </div>
    );
}

export default function HeroVisualComposer({
    featured,
    supporting,
    intervalMs = 3400,
    reducedMotion,
}: HeroVisualComposerProps) {
    const prefersReducedMotion = useReducedMotion();
    const shouldReduceMotion = reducedMotion ?? prefersReducedMotion;
    const allItems = useMemo(() => [...featured, ...supporting], [featured, supporting]);

    const [invalidIds, setInvalidIds] = useState<Set<string>>(new Set());
    const [currentIndex, setCurrentIndex] = useState(0);
    const [previousItem, setPreviousItem] = useState<HeroVisualItem | null>(null);
    const [isTransitioning, setIsTransitioning] = useState(false);

    const validItems = useMemo(
        () => allItems.filter((item) => !invalidIds.has(item.id)),
        [allItems, invalidIds],
    );

    useEffect(() => {
        if (validItems.length === 0) return;
        if (currentIndex >= validItems.length) {
            setCurrentIndex(0);
        }
    }, [currentIndex, validItems.length]);

    useEffect(() => {
        if (shouldReduceMotion || validItems.length <= 1) return;

        const timer = window.setInterval(() => {
            setPreviousItem(validItems[currentIndex] ?? null);
            setIsTransitioning(true);
            setCurrentIndex((index) => (index + 1) % validItems.length);
        }, intervalMs);

        return () => window.clearInterval(timer);
    }, [currentIndex, intervalMs, shouldReduceMotion, validItems]);

    useEffect(() => {
        if (!isTransitioning) return;

        const timer = window.setTimeout(() => {
            setIsTransitioning(false);
            setPreviousItem(null);
        }, 420);

        return () => window.clearTimeout(timer);
    }, [isTransitioning]);

    const activeItem = validItems[currentIndex] ?? null;

    const handleImageError = (item: HeroVisualItem) => {
        setInvalidIds((current) => {
            if (current.has(item.id)) return current;
            const next = new Set(current);
            next.add(item.id);
            return next;
        });

        setCurrentIndex((index) => {
            const invalid = new Set(invalidIds);
            invalid.add(item.id);
            const nextIndex = nextValidIndex(allItems, invalid, index + 1);
            return nextIndex === -1 ? 0 : nextIndex;
        });
    };

    const variantLabel = currentIndex % 2 === 0 ? 'Variant A' : 'Variant B';

    return (
        <div className="mt-4 w-full md:mt-6">
            <div className="relative overflow-hidden rounded-[2rem] border border-[#D8C6A6]/45 bg-[#191611]">
                {activeItem ? (
                    <HeroVisualStage
                        current={activeItem}
                        previous={previousItem}
                        isTransitioning={!shouldReduceMotion && isTransitioning}
                        durationMs={380}
                        scaleCurrent={!shouldReduceMotion}
                        onImageError={handleImageError}
                    />
                ) : (
                    <div className="relative h-[clamp(180px,26vh,230px)] w-full overflow-hidden rounded-[2rem] bg-[linear-gradient(135deg,#241d16_0%,#16120f_100%)] sm:h-[clamp(200px,28vh,250px)] lg:h-[clamp(220px,30vh,300px)]">
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_22%_18%,rgba(255,255,255,0.12)_0%,rgba(255,255,255,0)_24%)]" />
                    </div>
                )}

                <div className="pointer-events-none absolute inset-x-0 bottom-0 z-20 p-4 sm:p-5 lg:p-6">
                    <div className="max-w-[28rem] rounded-[1.25rem] border border-white/10 bg-[#0D0C0A]/58 px-4 py-4 text-left backdrop-blur-sm">
                        <div className="flex flex-wrap items-center gap-2">
                            <span className="rounded-full border border-[#C9A46A]/35 bg-black/20 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.22em] text-[#E6C58D]">
                                {variantLabel}
                            </span>
                            {['Signals', 'Psychology', 'Blueprint'].map((chip) => (
                                <span
                                    key={chip}
                                    className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.2em] text-[#F4EEE3]/78"
                                    aria-hidden="true"
                                >
                                    {chip}
                                </span>
                            ))}
                        </div>
                        <div className="mt-3 flex items-center gap-2">
                            <span className="rounded-full border border-[#C9A46A]/26 bg-[#C9A46A]/10 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.2em] text-[#F0D7AA]">
                                Confidence: 86
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
