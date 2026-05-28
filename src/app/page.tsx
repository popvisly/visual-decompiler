import type { Metadata } from 'next';
import UnifiedSovereignHeader from '@/components/UnifiedSovereignHeader';
import ContainerScrollHero from '@/components/marketing/ContainerScrollHero';
import HomepageProblemSection from '@/components/marketing/HomepageProblemSection';
import HomepageSystemSection from '@/components/marketing/HomepageSystemSection';
import PremiumDossierShowcase from '@/components/marketing/PremiumDossierShowcase';
import RepeatableWorkflowSection from '@/components/marketing/RepeatableWorkflowSection';
import HowItWorks from '@/components/marketing/HowItWorks';
import BeforeAfterContrast from '@/components/marketing/BeforeAfterContrast';
import DossierPreview from '@/components/marketing/DossierPreview';
import NeuralParticleHero from '@/components/marketing/NeuralParticleHero';
import WhyDifferent from '@/components/marketing/WhyDifferent';
import MarketLimitationSection from '@/components/marketing/MarketLimitationSection';
import AppFeaturesSection from '@/components/marketing/AppFeaturesSection';
import FooterStartNow from '@/components/marketing/FooterStartNow';

export const metadata: Metadata = {
    title: 'Ad Analysis Tool for Creative Teams',
    description:
        'Visual Decompiler is an ad analysis tool for creative teams that helps you read persuasive signals and turn visual instinct into evidence you can present.',
};

export default function HomePage() {
    return (
        <main>
            <UnifiedSovereignHeader primaryCta={{ label: 'Start Free', href: '/ingest' }} />
            <ContainerScrollHero />
            <HomepageProblemSection />
            <PremiumDossierShowcase />
            <HomepageSystemSection />
            <AppFeaturesSection />
            <RepeatableWorkflowSection />
            <MarketLimitationSection />
            <NeuralParticleHero />
            <HowItWorks />
            <DossierPreview />
            <WhyDifferent />
            <FooterStartNow />
        </main>
    );
}
