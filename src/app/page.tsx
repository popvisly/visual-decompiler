import UnifiedSovereignHeader from '@/components/UnifiedSovereignHeader';
import CinematicHero from '@/components/marketing/CinematicHero';
import HowItWorks from '@/components/marketing/HowItWorks';
import NeuralMapSection from '@/components/marketing/NeuralMapSection';
import InteractiveReadStage from '@/components/marketing/InteractiveReadStage';
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
            {/* Light + dark cards — How it works */}
            <HowItWorks />
            {/* Light + dark card — Neural Map */}
            <NeuralMapSection />
            {/* Dark — Interactive showcase */}
            <InteractiveReadStage />
            {/* Light + dark cards — Dossier preview */}
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
