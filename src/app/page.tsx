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

            <div className="relative overflow-hidden bg-[#FBFBF6]">
                <div className="pointer-events-none absolute inset-0 opacity-[0.06] [background-image:linear-gradient(#CDBA9A_1px,transparent_1px),linear-gradient(90deg,#CDBA9A_1px,transparent_1px)] [background-size:56px_56px]" />

                <div className="relative z-10">
                    <Hero />
                    <ProductProofSequence />
                    <FooterStartNow />
                </div>
            </div>
        </main>
    );
}
