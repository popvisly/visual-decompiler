import UnifiedSovereignHeader from '@/components/UnifiedSovereignHeader';
import CinematicHero from '@/components/marketing/CinematicHero';
import HowItWorks from '@/components/marketing/HowItWorks';
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
            {/* Light — How it works */}
            <HowItWorks />
            {/* Dark — Interactive showcase */}
            <InteractiveReadStage />
            {/* Dark — What comes out (dossier) */}
            <DossierPreview />
            {/* Light — Who it's for */}
            <WhoItsFor />
            {/* Dark — Why VD is different */}
            <WhyDifferent />
            {/* Dark — Footer + FAQ */}
            <FooterStartNow />
        </main>
    );
}
