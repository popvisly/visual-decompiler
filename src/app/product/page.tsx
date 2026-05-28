import type { Metadata } from 'next';
import UnifiedSovereignHeader from '@/components/UnifiedSovereignHeader';
import ProductHero from '@/components/product/ProductHero';
import AnalysisSurfaces from '@/components/product/AnalysisSurfaces';
import PlatformLayer from '@/components/product/PlatformLayer';
import ProductFooter from '@/components/product/ProductFooter';

export const metadata: Metadata = {
    title: 'Product',
    description:
        'See how Visual Decompiler turns ad creative into structured analysis, strategic proof, and client-ready decision logic.',
};

export default function ProductPage() {
    return (
        <main className="bg-[#FBFBF6] text-[#141414]">
            <UnifiedSovereignHeader primaryCta={{ label: 'Start Free', href: '/ingest' }} />
            <ProductHero />
            <AnalysisSurfaces />
            <PlatformLayer />
            <ProductFooter />
        </main>
    );
}
