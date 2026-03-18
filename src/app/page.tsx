import UnifiedSovereignHeader from '@/components/UnifiedSovereignHeader';
import Hero from '@/components/marketing/Hero';
import ProductProofSequence from '@/components/marketing/ProductProofSequence';
import PersonaGrid from '@/components/marketing/PersonaGrid';
import FooterStartNow from '@/components/marketing/FooterStartNow';
import { getServerSession } from '@/lib/auth-server';

export default async function HomePage() {
    const { userId } = await getServerSession();

    return (
        <main className="bg-[#FBFBF6]">
            <UnifiedSovereignHeader />

            <Hero
                headline={["Advertising intelligence.", "Deconstructed."]}
                subhead="The sovereign infrastructure for elite agencies. Understand & comprehend the architecture of persuasion to justify high-stakes strategy with forensic precision."
                stageImage={{ src: "/images/examples/perfume_ad_no_logo.jpg", alt: "Luxury perfume ad" }}
            />

            <ProductProofSequence />
            <PersonaGrid />

            <FooterStartNow />

        </main>
    );
}
