import UnifiedSovereignHeader from '@/components/UnifiedSovereignHeader';
import Hero from '@/components/marketing/Hero';
import ProductProofSequence from '@/components/marketing/ProductProofSequence';
import FooterStartNow from '@/components/marketing/FooterStartNow';
import { SAMPLE_DOSSIER_HREF } from '@/lib/sample-dossier';

export default function HomePage() {
    return (
        <main className="bg-[#FBFBF6]">
            <UnifiedSovereignHeader primaryCta={{ label: 'Start Decompiling Free', href: '/ingest' }} />

            <Hero
                eyebrow="For creative strategists"
                headline="See exactly what any ad is doing."
                subhead="Drop any ad. Get a client-ready strategic dossier — persuasion mechanics, psychology, signals, and a reconstruction blueprint — in under 60 seconds."
                ctaPrimary={{ label: 'Start Decompiling Free', href: '/ingest' }}
                ctaSecondary={{ label: 'Open Sample Dossier', href: SAMPLE_DOSSIER_HREF }}
                microproof="No card required · 5 free analyses · White-label export ready"
            />

            <ProductProofSequence />

            <FooterStartNow />

        </main>
    );
}
