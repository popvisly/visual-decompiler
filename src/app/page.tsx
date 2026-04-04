import UnifiedSovereignHeader from '@/components/UnifiedSovereignHeader';
import CinematicHero from '@/components/marketing/CinematicHero';
import ChapterTransitionStage from '@/components/marketing/ChapterTransitionStage';
import SignalCorridorStage from '@/components/marketing/SignalCorridorStage';
import VisualAnalyticsAtlas from '@/components/marketing/VisualAnalyticsAtlas';
import ProductProofSequence from '@/components/marketing/ProductProofSequence';
import FooterStartNow from '@/components/marketing/FooterStartNow';

export default function HomePage() {
    return (
        <main className="bg-[#FBFBF6]">
            <UnifiedSovereignHeader primaryCta={{ label: 'Open Sample Read', href: '/share/sample-dossier' }} />
            <CinematicHero />
            <ChapterTransitionStage />
            <SignalCorridorStage />
            <VisualAnalyticsAtlas />
            <ProductProofSequence />
            <FooterStartNow />
        </main>
    );
}
