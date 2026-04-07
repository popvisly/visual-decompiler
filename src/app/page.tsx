import UnifiedSovereignHeader from '@/components/UnifiedSovereignHeader';
import CinematicHero from '@/components/marketing/CinematicHero';
import HowItWorks from '@/components/marketing/HowItWorks';
import NeuralMapSection from '@/components/marketing/NeuralMapSection';
import DossierPreview from '@/components/marketing/DossierPreview';
import WhyDifferent from '@/components/marketing/WhyDifferent';
import FooterStartNow from '@/components/marketing/FooterStartNow';

export default function HomePage() {
    return (
        <main>
            <UnifiedSovereignHeader forceDark primaryCta={{ label: 'Open Sample Read', href: '/share/sample-dossier' }} />
            <CinematicHero />
            <HowItWorks />
            <NeuralMapSection />
            <DossierPreview />
            <WhyDifferent />
            <FooterStartNow />
        </main>
    );
}
