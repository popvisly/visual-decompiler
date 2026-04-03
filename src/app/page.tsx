import UnifiedSovereignHeader from '@/components/UnifiedSovereignHeader';
import CinematicHero from '@/components/marketing/CinematicHero';
import ObservingPresence from '@/components/marketing/ObservingPresence';
import ProductProofSequence from '@/components/marketing/ProductProofSequence';
import FooterStartNow from '@/components/marketing/FooterStartNow';

export default function HomePage() {
    return (
        <main className="bg-[#FBFBF6]">
            <ObservingPresence />
            <UnifiedSovereignHeader primaryCta={{ label: 'Start Decompiling Free', href: '/ingest' }} />
            <CinematicHero />
            <ProductProofSequence />
            <FooterStartNow />
        </main>
    );
}
