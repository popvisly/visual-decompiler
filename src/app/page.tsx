import UnifiedSovereignHeader from '@/components/UnifiedSovereignHeader';
import HomeHero from '@/components/marketing/HomeHero';
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
            <UnifiedSovereignHeader primaryCta={{ label: 'Decompile an Ad', href: '/ingest' }} />
            <HomeHero />
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
