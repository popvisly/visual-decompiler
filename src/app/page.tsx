import UnifiedSovereignHeader from '@/components/UnifiedSovereignHeader';
import ContainerScrollHero from '@/components/marketing/ContainerScrollHero';
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
            <ContainerScrollHero />
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
