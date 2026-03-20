import UnifiedSovereignHeader from '@/components/UnifiedSovereignHeader';
import Hero from '@/components/marketing/Hero';
import ProductProofSequence from '@/components/marketing/ProductProofSequence';
import FooterStartNow from '@/components/marketing/FooterStartNow';

export default function HomePage() {
    return (
        <main className="bg-[#FBFBF6]">
            <UnifiedSovereignHeader />

            <Hero
                headline={["Decode competitor ads.", "Into strategic dossiers."]}
                subhead="Visual Decompiler turns any ad into a premium intelligence readout — trigger mechanics, persuasion psychology, execution-ready outputs, and vault-backed strategic memory for agency teams."
                ctaPrimary={{ label: 'Start Decompiling Free', href: '/ingest' }}
                ctaSecondary={{ label: 'See the dossier surface', href: '#deconstruction' }}
            />

            <ProductProofSequence />

            <FooterStartNow />

        </main>
    );
}
