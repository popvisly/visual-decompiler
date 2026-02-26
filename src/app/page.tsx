import Nav from '@/components/marketing/Nav';
import Hero from '@/components/marketing/Hero';
import DecompilePipeline from '@/components/marketing/DecompilePipeline';
import StrategicLaboratory from '@/components/marketing/StrategicLaboratory';
import CaseStudyFashion from '@/components/marketing/CaseStudyFashion';
import PersonaGrid from '@/components/marketing/PersonaGrid';
import PromptShowcase from '@/components/marketing/PromptShowcase';
import FooterStartNow from '@/components/marketing/FooterStartNow';
import { Pill, PreviewCard, CaseCard } from '@/types/homepage';

const PILLS: Pill[] = [
    { key: "trigger", label: "Trigger Mechanics", micro: "Identify the behavioral lever being pulled.", x: 14, y: 28 },
    { key: "semiotic", label: "Semiotic Subtext", micro: "Extract the implied promise beneath the surface.", x: 78, y: 34 },
    { key: "narrative", label: "Narrative Framework", micro: "Map the persuasion arc and its sequencing.", x: 70, y: 18 },
    { key: "evidence", label: "Evidence Anchors", micro: "Point to the concrete cues carrying the claim.", x: 22, y: 62 },
    { key: "objections", label: "Objection Dismantling", micro: "Detect pre-emptive friction removal.", x: 82, y: 64 },
    { key: "visual", label: "Visual Style", micro: "Classify the aesthetic strategy and its function.", x: 10, y: 50 },
    { key: "nudge", label: "Behavioral Nudge", micro: "Name the action pressure being applied.", x: 60, y: 78 },
    { key: "confidence", label: "Confidence Score", micro: "Quantify certainty based on observable signals.", x: 46, y: 12 },
];

const REPORT_PREVIEW: PreviewCard[] = [
    {
        title: "Trigger Mechanic",
        micro: "Locate the primary lever and how it’s operationalized.",
        bullets: ["Scarcity / limitedness", "Authority transfer", "Status cueing"],
    },
    {
        title: "Evidence Anchors",
        micro: "Cite what the viewer can actually point to.",
        bullets: ["Typography weight", "Composition hierarchy", "Claim placement"],
    },
    {
        title: "Confidence Score",
        micro: "Express certainty from observed signals.",
        bullets: ["High confidence", "Evidence density: strong"],
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

export default function HomePage() {
    return (
        <main className="bg-[#F6F1E7]">
            <Nav />

            {/* ... Hero and DecompilePipeline ... */}
            <Hero
                headline={["Advertising intelligence.", "Deconstructed."]}
                subhead="The sovereign infrastructure for elite agencies. Understand & comprehend the architecture of persuasion to justify high-stakes strategy with forensic precision."
                ctaPrimary={{ label: "Start now", href: "/app" }}
                ctaSecondary={{ label: "View example report", href: "#case-study" }}
                stageImage={{ src: "/images/hero/dior-panels.jpg", alt: "Dior deconstruction collage" }}
            />

            <DecompilePipeline
                id="how"
                stageImage={{ src: "/images/examples/perfume_ad_no_logo.jpg", alt: "Example ad" }}
                pills={PILLS}
                reportPreviewCards={REPORT_PREVIEW}
            />

            <CaseStudyFashion
                id="case-study"
                label="CASE STUDY — LUXURY / FASHION"
                title="Luxury ads sell restraint. The mechanics are aggressive."
                body="We surface scarcity cues, status signaling, and aesthetic authority—then show the exact elements carrying each claim."
                stageImage={{ src: "/images/examples/perfume_ad_no_logo.jpg", alt: "Luxury fashion ad example" }}
                cards={FASHION_CARDS}
                cta={{ label: "Load this example in the app", href: "/app?example=luxury" }}
            />

            <PersonaGrid />
            <PromptShowcase />

            <StrategicLaboratory />

            <FooterStartNow />

        </main>
    );
}
