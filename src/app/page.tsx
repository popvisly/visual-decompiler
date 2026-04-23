import UnifiedSovereignHeader from '@/components/UnifiedSovereignHeader';
import CinematicHero from '@/components/marketing/CinematicHero';
import PremiumDossierShowcase from '@/components/marketing/PremiumDossierShowcase';
import HowItWorks from '@/components/marketing/HowItWorks';
import WhyDifferent from '@/components/marketing/WhyDifferent';
import FooterStartNow from '@/components/marketing/FooterStartNow';

export default function HomePage() {
    return (
        <main>
            <UnifiedSovereignHeader forceDark primaryCta={{ label: 'Decompile an Ad', href: '/ingest' }} />
            <CinematicHero />
            <PremiumDossierShowcase />
            <HowItWorks />
            <WhyDifferent />
            <FooterStartNow />
        </main>
    );
}
