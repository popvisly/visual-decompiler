import UnifiedSovereignHeader from '@/components/UnifiedSovereignHeader';
import ProductHero from '@/components/product/ProductHero';
import AnalysisSurfaces from '@/components/product/AnalysisSurfaces';
import PlatformLayer from '@/components/product/PlatformLayer';
import ProductFooter from '@/components/product/ProductFooter';
import DecisionReadinessFramework from '@/components/marketing/DecisionReadinessFramework';

export default function ProductPage() {
    return (
        <main className="bg-[#0B0B0B] text-[#F6F1E7]">
            <UnifiedSovereignHeader forceDark primaryCta={{ label: 'Decompile Your Ad', href: '/ingest' }} />
            <ProductHero />
            <AnalysisSurfaces />
            <DecisionReadinessFramework />
            <PlatformLayer />
            <ProductFooter />
        </main>
    );
}
