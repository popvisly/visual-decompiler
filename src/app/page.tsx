import UnifiedSovereignHeader from '@/components/UnifiedSovereignHeader';
import CinematicHero from '@/components/marketing/CinematicHero';
import PremiumDossierShowcase from '@/components/marketing/PremiumDossierShowcase';
import HowItWorks from '@/components/marketing/HowItWorks';
import BeforeAfterContrast from '@/components/marketing/BeforeAfterContrast';
import DossierPreview from '@/components/marketing/DossierPreview';
import NeuralParticleHero from '@/components/marketing/NeuralParticleHero';
import WhyDifferent from '@/components/marketing/WhyDifferent';
import FooterStartNow from '@/components/marketing/FooterStartNow';

export default function HomePage() {
    return (
        <main>
            <UnifiedSovereignHeader forceDark primaryCta={{ label: 'Decompile an Ad', href: '/ingest' }} />
            <CinematicHero />
            <PremiumDossierShowcase />
            <NeuralParticleHero />
            <HowItWorks />
            <BeforeAfterContrast />
            <DossierPreview />
            <WhyDifferent />
            <FooterStartNow />
        </main>
    );
}
