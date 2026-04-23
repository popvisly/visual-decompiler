import UnifiedSovereignHeader from '@/components/UnifiedSovereignHeader';
import ProductHero from '@/components/product/ProductHero';
import AnalysisSurfaces from '@/components/product/AnalysisSurfaces';
import BeforeAfterContrast from '@/components/marketing/BeforeAfterContrast';
import PlatformLayer from '@/components/product/PlatformLayer';
import ProductFooter from '@/components/product/ProductFooter';

export default function ProductPage() {
    return (
        <main className="bg-[#0B0B0B] text-[#F6F1E7]">
            <UnifiedSovereignHeader forceDark primaryCta={{ label: 'Decompile an Ad', href: '/ingest' }} />
            <ProductHero />
            <AnalysisSurfaces />
            <BeforeAfterContrast compact />
            <PlatformLayer />
            <ProductFooter />
        </main>
    );
}
