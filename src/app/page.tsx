import UnifiedSovereignHeader from '@/components/UnifiedSovereignHeader';
import Hero from '@/components/marketing/Hero';
import ProductProofSequence from '@/components/marketing/ProductProofSequence';
import FooterStartNow from '@/components/marketing/FooterStartNow';

export default function HomePage() {
    return (
        <main className="bg-[#FBFBF6]">
            <UnifiedSovereignHeader primaryCta={{ label: 'Start Decompiling Free', href: '/ingest' }} />

            <Hero
                headline={["Decode Any Competitor Ad", "Into a Client-Ready Strategy in 60 Seconds"]}
                subhead="Visual Decompiler turns any ad into a client-ready strategic dossier — trigger mechanics, persuasion psychology, execution outputs, and white-label export in under 60 seconds."
                ctaPrimary={{ label: 'Start Decompiling Free', href: '/ingest' }}
                ctaSecondary={{ label: 'See Sample Dossier', href: '#deconstruction' }}
                microproof="No card required · 5 free analyses · White-label export ready"
            />

            <ProductProofSequence />

            <FooterStartNow />

        </main>
    );
}
