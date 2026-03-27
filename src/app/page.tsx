import UnifiedSovereignHeader from '@/components/UnifiedSovereignHeader';
import AnalyticalHero from '@/components/marketing/AnalyticalHero';
import Hero from '@/components/marketing/Hero';
import ProductProofSequence from '@/components/marketing/ProductProofSequence';
import FooterStartNow from '@/components/marketing/FooterStartNow';

export default function HomePage() {
    return (
        <main className="bg-[#FBFBF6]">
            <UnifiedSovereignHeader primaryCta={{ label: 'Start Decompiling Free', href: '/ingest' }} />

            <AnalyticalHero />

            <div className="relative overflow-hidden bg-[#141414]">
                <div className="pointer-events-none absolute inset-0 opacity-[0.045] [background-image:linear-gradient(#D4A574_1px,transparent_1px),linear-gradient(90deg,#D4A574_1px,transparent_1px)] [background-size:56px_56px]" />
                <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_45%_at_50%_0%,rgba(212,165,116,0.06)_0%,transparent_68%)]" />

                <div className="relative z-10">
                    <Hero />
                    <ProductProofSequence />
                    <FooterStartNow />
                </div>
            </div>

        </main>
    );
}
