import UnifiedSovereignHeader from '@/components/UnifiedSovereignHeader';
import CinematicHero from '@/components/marketing/CinematicHero';
import HowItWorks from '@/components/marketing/HowItWorks';
import PremiumDossierShowcase from '@/components/marketing/PremiumDossierShowcase';
import BuiltForTheRoomSection from '@/components/marketing/BuiltForTheRoomSection';
import NeuralMapSection from '@/components/marketing/NeuralMapSection';
import DossierPreview from '@/components/marketing/DossierPreview';
import WhyDifferent from '@/components/marketing/WhyDifferent';
import FooterStartNow from '@/components/marketing/FooterStartNow';
import ParticleField from '@/components/marketing/ParticleField';

export default function HomePage() {
    return (
        <main>
            <UnifiedSovereignHeader forceDark primaryCta={{ label: 'Decompile an Ad', href: '/ingest' }} />
            <section className="relative overflow-hidden bg-[#0B0B0B]">
                <div
                    className="pointer-events-none absolute inset-x-0 top-0 bottom-[-18vh] z-0 opacity-48 [mask-image:linear-gradient(to_bottom,black_0%,black_68%,transparent_100%)] [-webkit-mask-image:linear-gradient(to_bottom,black_0%,black_68%,transparent_100%)]"
                    aria-hidden="true"
                >
                    <ParticleField />
                </div>

                <CinematicHero />
                <PremiumDossierShowcase />
            </section>
            <HowItWorks />
            <BuiltForTheRoomSection />
            <DossierPreview />
            <NeuralMapSection />
            <WhyDifferent />
            <FooterStartNow />
        </main>
    );
}
