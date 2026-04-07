import UnifiedSovereignHeader from '@/components/UnifiedSovereignHeader';
import CinematicHero from '@/components/marketing/CinematicHero';
import HowItWorks from '@/components/marketing/HowItWorks';
import NeuralMapSection from '@/components/marketing/NeuralMapSection';
import DossierPreview from '@/components/marketing/DossierPreview';
import WhoItsFor from '@/components/marketing/WhoItsFor';
import WhyDifferent from '@/components/marketing/WhyDifferent';
import FooterStartNow from '@/components/marketing/FooterStartNow';

export default function HomePage() {
    return (
        <main className="bg-[#050505]">
            <UnifiedSovereignHeader forceDark primaryCta={{ label: 'Open Sample Read', href: '/share/sample-dossier' }} />
            {/* Dark — Hero */}
            <CinematicHero />
            {/* Light + dark cards — How it works (Ingest → Decompose → Dossier) */}
            <HowItWorks />
            {/* Light + dark card — Neural Map */}
            <NeuralMapSection />
            {/* Light + dark cards — Dossier preview with real app-grade metrics */}
            <DossierPreview />
            {/* Light + dark cards — Who it's for */}
            <WhoItsFor />
            {/* Light + dark cards — Why VD is different */}
            <WhyDifferent />
            {/* Dark — Footer + FAQ */}
            <FooterStartNow />
        </main>
    );
}
