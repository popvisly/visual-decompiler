import UnifiedSovereignHeader from '@/components/UnifiedSovereignHeader';
import CinematicHero from '@/components/marketing/CinematicHero';
import HowItWorks from '@/components/marketing/HowItWorks';
import PremiumDossierShowcase from '@/components/marketing/PremiumDossierShowcase';
import BuiltForTheRoomSection from '@/components/marketing/BuiltForTheRoomSection';
import NeuralMapSection from '@/components/marketing/NeuralMapSection';
import DossierPreview from '@/components/marketing/DossierPreview';
import WhyDifferent from '@/components/marketing/WhyDifferent';
import FooterStartNow from '@/components/marketing/FooterStartNow';

export default function HomePage() {
    return (
        <main>
            <UnifiedSovereignHeader forceDark primaryCta={{ label: 'Decompile an Ad', href: '/ingest' }} />
            <CinematicHero />
            <HowItWorks />
            <PremiumDossierShowcase />
            <BuiltForTheRoomSection />
            <DossierPreview />
            <NeuralMapSection />
            <WhyDifferent />
            <FooterStartNow />
        </main>
    );
}
