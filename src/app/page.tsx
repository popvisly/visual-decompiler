import UnifiedSovereignHeader from '@/components/UnifiedSovereignHeader';
import AnalyticalHero from '@/components/marketing/AnalyticalHero';
import Hero from '@/components/marketing/Hero';
import ProductProofSequence from '@/components/marketing/ProductProofSequence';
import FooterStartNow from '@/components/marketing/FooterStartNow';
import { SAMPLE_DOSSIER_HREF } from '@/lib/sample-dossier';

export default function HomePage() {
    return (
        <main className="bg-[#FBFBF6]">
            <UnifiedSovereignHeader primaryCta={{ label: 'Start Decompiling Free', href: '/ingest' }} />

            <AnalyticalHero />

            <Hero />

            <ProductProofSequence />

            <FooterStartNow />

        </main>
    );
}
