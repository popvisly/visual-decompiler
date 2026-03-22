import UnifiedSovereignHeader from '@/components/UnifiedSovereignHeader';
import Hero from '@/components/marketing/Hero';
import ProductProofSequence from '@/components/marketing/ProductProofSequence';
import FooterStartNow from '@/components/marketing/FooterStartNow';

export default function HomePage() {
    return (
        <main className="bg-[#FBFBF6]">
            <UnifiedSovereignHeader primaryCta={{ label: 'Start Analysis', href: '/ingest' }} />

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
                ctaPrimary={{ label: 'Start Analysis', href: '/ingest' }}
                ctaSecondary={{ label: 'Open Sample Dossier', href: '/asset/1cb30400-1ba3-4dda-8fe2-7650674aeb4a' }}
                microproof="No card required · 5 free analyses · White-label export ready"
            />

            <ProductProofSequence />

            <FooterStartNow />

        </main>
    );
}
