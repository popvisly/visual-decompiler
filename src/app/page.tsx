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
                eyebrow="For Art Directors"
                rotatingEyebrows={[
                    'For Art Directors',
                    'For Creative Directors',
                    'For Strategy Teams',
                    'For New Business',
                    'For Brand Managers',
                ]}
                headline="See exactly what any ad is doing."
                headlineHighlight="Before the room decides."
                subhead="Visual Decompiler turns any ad into a client-ready strategic readout — persuasion mechanics, psychology, comparative route testing, and white-label output in under 60 seconds."
                ctaPrimary={{ label: 'Start Decompiling Free', href: '/ingest' }}
                ctaSecondary={{ label: 'Open Sample Dossier', href: SAMPLE_DOSSIER_HREF }}
                microproof="No card required · 5 free analyses · White-label export ready"
            />

            <ProductProofSequence />

            <FooterStartNow />

        </main>
    );
}
