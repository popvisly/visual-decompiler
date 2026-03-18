import UnifiedSovereignHeader from '@/components/UnifiedSovereignHeader';
import Hero from '@/components/marketing/Hero';
import IntelligenceEcosystem from '@/components/marketing/IntelligenceEcosystem';
import DecompilePipeline from '@/components/marketing/DecompilePipeline';

import CaseStudyFashion from '@/components/marketing/CaseStudyFashion';
import PersonaGrid from '@/components/marketing/PersonaGrid';
import PromptShowcase from '@/components/marketing/PromptShowcase';
import FooterStartNow from '@/components/marketing/FooterStartNow';
import { Pill, PreviewCard, CaseCard } from '@/types/homepage';
import { getServerSession } from '@/lib/auth-server';

const PILLS: Pill[] = [
    { key: "craft", label: "Craftsmanship Authority", micro: "Isolate macro-texture as proof of artisanal value.", x: 14, y: 28 },
    { key: "scarcity", label: "Scarcity Cues", micro: "Detect limitedness implied through composition.", x: 78, y: 34 },
    { key: "legacy", label: "Legacy Framework", micro: "Map the asset-as-heirloom persuasion arc.", x: 70, y: 18 },
    { key: "material", label: "Material Fidelity", micro: "Cite sapphire, gold, and leather as status anchors.", x: 22, y: 62 },
    { key: "mechanical", label: "Mechanical Intimacy", micro: "Detect focus on internal horological complexity.", x: 82, y: 64 },
    { key: "precision", label: "Precision Coding", micro: "Classify the mathematical symmetry of the dial.", x: 10, y: 50 },
    { key: "value", label: "Value Shielding", micro: "Neutralize price friction through implicit premium.", x: 60, y: 78 },
    { key: "confidence", label: "Confidence Score", micro: "Evidence density matches high-tier luxury codes.", x: 46, y: 12 },
];

const REPORT_PREVIEW: PreviewCard[] = [
    {
        title: "Trigger Mechanic",
        micro: "Asset-based signaling through material excellence.",
        bullets: ["Artisanal proof", "Legacy projection", "Reflective status"],
    },
    {
        title: "Evidence Anchors",
        micro: "Tangible cues citing horological precision.",
        bullets: ["Macro texture detail", "Symmetrical bezel dial", "Depth of field focus"],
    },
    {
        title: "Confidence Score",
        micro: "Alignment with ultra-luxury visual codes.",
        bullets: ["94% Certainty", "Evidence density: Exceptional"],
    },
];

const FASHION_CARDS: CaseCard[] = [
    {
        title: "Status Signaling",
        micro: "Authority is encoded in restraint, not claims.",
        evidence: ["Minimal copy", "High negative space", "Controlled palette"],
    },
    {
        title: "Aesthetic Authority",
        micro: "Craft is used as proof.",
        evidence: ["Texture fidelity", "Editorial lighting", "Material cues"],
    },
    {
        title: "Scarcity Cues",
        micro: "Limitedness implied through composition and pacing.",
        evidence: ["Single-hero framing", "No comparison grid", "No feature list"],
    },
    {
        title: "Price/Value Shielding",
        micro: "Purchase friction neutralized indirectly.",
        evidence: ["No price mention", "Brand mark dominance", "Implicit premium"],
    },
];

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

            <IntelligenceEcosystem />

            <DecompilePipeline
                id="how"
                stageImage={{ src: "/images/examples/watch_ad.jpg", alt: "Luxury watch ad" }}
                pills={PILLS}
                reportPreviewCards={REPORT_PREVIEW}
            />

            <CaseStudyFashion
                id="case-study"
                label="CASE STUDY — LUXURY / FASHION"
                title="Luxury ads sell restraint. The mechanics are aggressive."
                body="We surface scarcity cues, status signaling, and aesthetic authority—then show the exact elements carrying each claim."
                stageImage={{ src: "/images/examples/Model_Mirror.jpg", alt: "Luxury fashion ad example" }}
                cards={FASHION_CARDS}
            />

            <PromptShowcase />
            <PersonaGrid />

            <FooterStartNow />

        </main>
    );
}
