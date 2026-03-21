import UnifiedSovereignHeader from '@/components/UnifiedSovereignHeader';
import Hero from '@/components/marketing/Hero';
import ProductProofSequence from '@/components/marketing/ProductProofSequence';
import FooterStartNow from '@/components/marketing/FooterStartNow';

export default function HomePage() {
    return (
        <main className="bg-[#FBFBF6]">
            <UnifiedSovereignHeader primaryCta={{ label: 'Start Analysis', href: '/ingest' }} />

            <Hero
                headline="Decode why luxury creative works—before the market catches up."
                subhead="Visual Decompiler is faster than manual analysis and deeper than using ChatGPT alone. It turns creative assets into structured strategic intelligence your team can trust and act on."
                ctaPrimary={{ label: 'Start Analysis', href: '/ingest' }}
                ctaSecondary={{ label: 'View Intelligence Vault', href: '#deconstruction' }}
                microproof="No card required · 5 free analyses · White-label export ready"
            />

            <ProductProofSequence />

            <FooterStartNow />

        </main>
    );
}
