import UnifiedSovereignHeader from '@/components/UnifiedSovereignHeader';
import CinematicHero from '@/components/marketing/CinematicHero';
import InteractiveReadStage from '@/components/marketing/InteractiveReadStage';
import FooterStartNow from '@/components/marketing/FooterStartNow';

export default function HomePage() {
    return (
        <main className="bg-[#050505]">
            <UnifiedSovereignHeader forceDark primaryCta={{ label: 'Open Sample Read', href: '/share/sample-dossier' }} />
            <CinematicHero />
            <InteractiveReadStage />
            <FooterStartNow />
        </main>
    );
}
