import type { Metadata } from 'next';
import UnifiedSovereignHeader from '@/components/UnifiedSovereignHeader';
import ProductHero from '@/components/product/ProductHero';
import AnalysisSurfaces from '@/components/product/AnalysisSurfaces';
import PlatformLayer from '@/components/product/PlatformLayer';
import ProductFooter from '@/components/product/ProductFooter';
import SoftwareApplicationJsonLd from '@/components/seo/SoftwareApplicationJsonLd';

export const metadata: Metadata = {
    title: 'Creative Intelligence Platform',
    description:
        'Visual Decompiler is a creative intelligence platform that turns ad creative into structured analysis, strategic proof, and client-ready decision logic.',
};

export default function ProductPage() {
    return (
        <main className="bg-[#FBFBF6] text-[#141414]">
            <SoftwareApplicationJsonLd
                pageUrl="https://www.visualdecompiler.com/product"
                pageName="Creative Intelligence Platform"
                pageDescription="Visual Decompiler is a creative intelligence platform that turns ad creative into structured analysis, strategic proof, and client-ready decision logic."
                pageKeywords={['creative intelligence platform', 'creative intelligence software', 'advertising intelligence platform']}
            />
            <UnifiedSovereignHeader primaryCta={{ label: 'Start Free', href: '/ingest' }} />
            <ProductHero />
            <AnalysisSurfaces />
            <PlatformLayer />
            <ProductFooter />
        </main>
    );
}
