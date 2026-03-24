export type HeroVisualItem = {
    id: string;
    src: string;
    alt: string;
    focalPoint?: string;
    tone?: 'closeup' | 'portrait' | 'editorial';
};

export const HERO_VISUAL_FEATURED: HeroVisualItem[] = [
    {
        id: 'hero-lux-01',
        src: '/images/hero/hero-lux-01.webp',
        alt: 'Close-up luxury perfume still life with hand contact and warm amber glass.',
        focalPoint: '50% 42%',
        tone: 'closeup',
    },
    {
        id: 'hero-lux-02',
        src: '/images/hero/hero-lux-02.webp',
        alt: 'Portrait fragrance campaign frame with model and product held in a premium editorial composition.',
        focalPoint: '52% 34%',
        tone: 'portrait',
    },
    {
        id: 'hero-lux-05',
        src: '/images/hero/hero-lux-05.webp',
        alt: 'Editorial luxury fragrance frame with wider fashion composition and product emphasis.',
        focalPoint: '50% 36%',
        tone: 'editorial',
    },
];

export const HERO_VISUAL_SUPPORTING: HeroVisualItem[] = [
    {
        id: 'hero-lux-04',
        src: '/images/hero/hero-lux-04.webp',
        alt: 'Supporting luxury fragrance frame with strong product-led close-up and controlled highlights.',
        focalPoint: '50% 40%',
        tone: 'closeup',
    },
    {
        id: 'hero-lux-03',
        src: '/images/hero/hero-lux-03.webp',
        alt: 'Supporting perfume portrait frame with model, product, and clean editorial backdrop.',
        focalPoint: '48% 34%',
        tone: 'portrait',
    },
];
