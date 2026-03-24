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

type FeaturedStageProps = {
    current: HeroVisualItem;
    previous?: HeroVisualItem | null;
    isTransitioning?: boolean;
    durationMs?: number;
    scaleCurrent?: boolean;
    onImageError: (item: HeroVisualItem, collection: HeroVisualItem[]) => void;
    featuredItems: HeroVisualItem[];
};

function FeaturedStage({
    current,
    previous = null,
    isTransitioning = false,
    durationMs = 380,
    scaleCurrent = false,
    onImageError,
    featuredItems,
}: FeaturedStageProps) {
    const transitionStyle = useMemo(
        () => ({ transition: `opacity ${durationMs}ms ease` }),
        [durationMs],
    );

    return (
        <div className="relative h-[clamp(300px,44vh,420px)] w-full overflow-hidden rounded-[2rem] bg-neutral-950 sm:h-[clamp(340px,46vh,460px)] lg:h-[clamp(320px,52vh,620px)]">
            {previous ? (
                <Image
                    key={`prev-${previous.id}`}
                    src={previous.src}
                    alt=""
                    fill
                    priority
                    sizes="(min-width: 1280px) 66vw, (min-width: 1024px) 62vw, 100vw"
                    className="pointer-events-none select-none object-cover"
                    style={{
                        objectPosition: previous.focalPoint || '50% 50%',
                        opacity: isTransitioning ? 0 : 1,
                        ...transitionStyle,
                    }}
                    onError={() => onImageError(previous, featuredItems)}
                />
            ) : null}

            <Image
                key={`cur-${current.id}`}
                src={current.src}
                alt={current.alt}
                fill
                priority
                sizes="(min-width: 1280px) 66vw, (min-width: 1024px) 62vw, 100vw"
                className="pointer-events-none select-none object-cover"
                style={{
                    objectPosition: current.focalPoint || '50% 50%',
                    opacity: 1,
                    transform: scaleCurrent ? 'scale(1.03)' : 'scale(1)',
                    transition: `${transitionStyle.transition}, transform ${Math.max(durationMs * 6, 2200)}ms linear`,
                }}
                onError={() => onImageError(current, featuredItems)}
            />

            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent" />
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
    const [featuredIndex, setFeaturedIndex] = useState(0);
    const [previousFeatured, setPreviousFeatured] = useState<HeroVisualItem | null>(null);
    const [isTransitioning, setIsTransitioning] = useState(false);
    const [cycleCount, setCycleCount] = useState(0);
    const [invalidIds, setInvalidIds] = useState<Set<string>>(new Set());

    const validFeatured = useMemo(
        () => featured.filter((item) => !invalidIds.has(item.id)),
        [featured, invalidIds],
    );

    const validSupporting = useMemo(
        () => supporting.filter((item) => !invalidIds.has(item.id)),
        [supporting, invalidIds],
    );

    useEffect(() => {
        if (validFeatured.length === 0) return;
        if (featuredIndex >= validFeatured.length) {
            setFeaturedIndex(0);
        }
    }, [featuredIndex, validFeatured.length]);

    useEffect(() => {
        if (shouldReduceMotion || validFeatured.length <= 1) return;

        const timer = window.setInterval(() => {
            setPreviousFeatured(validFeatured[featuredIndex] ?? null);
            setIsTransitioning(true);
            setFeaturedIndex((current) => (current + 1) % validFeatured.length);
            setCycleCount((current) => current + 1);
        }, intervalMs);

        return () => window.clearInterval(timer);
    }, [featuredIndex, intervalMs, shouldReduceMotion, validFeatured]);

    useEffect(() => {
        if (!isTransitioning) return;
        const timer = window.setTimeout(() => {
            setIsTransitioning(false);
            setPreviousFeatured(null);
        }, 420);

        return () => window.clearTimeout(timer);
    }, [isTransitioning]);

    const handleImageError = (item: HeroVisualItem, collection: HeroVisualItem[]) => {
        setInvalidIds((current) => {
            if (current.has(item.id)) return current;
            const next = new Set(current);
            next.add(item.id);
            return next;
        });

        if (collection === featured) {
            setFeaturedIndex((current) => {
                const invalid = new Set(invalidIds);
                invalid.add(item.id);
                const nextIndex = nextValidIndex(featured, invalid, current + 1);
                return nextIndex === -1 ? 0 : nextIndex;
            });
        }
    };

    const activeFeatured = validFeatured[featuredIndex] ?? null;
    const visibleSupporting = useMemo(() => {
        if (validSupporting.length <= 2) return validSupporting;
        const shouldShuffle = !shouldReduceMotion && cycleCount > 0 && cycleCount % 2 === 0;
        if (!shouldShuffle) return validSupporting.slice(0, 2);
        return [validSupporting[1], validSupporting[2] ?? validSupporting[0]].filter(Boolean);
    }, [cycleCount, shouldReduceMotion, validSupporting]);

    const variantLabel = featuredIndex % 2 === 0 ? 'Variant A' : 'Variant B';

    return (
        <div className="mt-4 w-full md:mt-6">
            <div className="relative grid gap-4 lg:grid-cols-12">
                <div className="relative overflow-hidden rounded-[2rem] border border-[#D8C6A6]/45 bg-[#191611] lg:col-span-8">
                    <div className="relative">
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.1),transparent_48%),linear-gradient(180deg,rgba(12,10,8,0.08)_0%,rgba(12,10,8,0.3)_100%)]" />
                        {activeFeatured ? (
                            <FeaturedStage
                                current={activeFeatured}
                                previous={previousFeatured}
                                isTransitioning={!shouldReduceMotion && isTransitioning}
                                durationMs={380}
                                scaleCurrent={!shouldReduceMotion}
                                onImageError={handleImageError}
                                featuredItems={featured}
                            />
                        ) : (
                            <div className="h-[clamp(300px,44vh,420px)] bg-[linear-gradient(135deg,#1E1A15_0%,#141210_100%)] sm:h-[clamp(340px,46vh,460px)] lg:h-[clamp(320px,52vh,620px)]" />
                        )}

                        <div className="absolute bottom-4 left-4 z-20 max-w-[calc(100%-2rem)] rounded-[1.25rem] border border-white/10 bg-[#0D0C0A]/62 px-4 py-4 text-left backdrop-blur-sm sm:bottom-5 sm:left-5 sm:max-w-[26rem]">
                            <div className="flex flex-wrap items-center gap-2">
                                <span className="rounded-full border border-[#C9A46A]/35 bg-black/20 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.22em] text-[#E6C58D]">
                                    {variantLabel}
                                </span>
                                {['Signals', 'Psychology', 'Blueprint'].map((chip) => (
                                    <span
                                        key={chip}
                                        className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.2em] text-[#F4EEE3]/75"
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

                <div className="hidden gap-3 md:grid md:grid-cols-2 lg:col-span-4 lg:grid-cols-1">
                    {visibleSupporting.map((item) => (
                        <div
                            key={item.id}
                            className="relative overflow-hidden rounded-[1.5rem] border border-[#D8C6A6]/38 bg-[#171411] min-h-[160px] lg:min-h-0"
                        >
                            <div className="relative aspect-[4/5] h-full min-h-[160px]">
                                <Image
                                    src={item.src}
                                    alt={item.alt}
                                    fill
                                    sizes="(max-width: 1023px) 50vw, 28vw"
                                    className="object-cover"
                                    style={{ objectPosition: item.focalPoint ?? '50% 50%' }}
                                    loading="lazy"
                                    onError={() => handleImageError(item, supporting)}
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-[#0E0C0A]/58 via-transparent to-transparent" aria-hidden="true" />
                                <div className="absolute bottom-3 left-3 rounded-full border border-white/10 bg-[#0D0C0A]/62 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.18em] text-[#EAD8B5] backdrop-blur-sm">
                                    {item.tone ?? 'editorial'}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
