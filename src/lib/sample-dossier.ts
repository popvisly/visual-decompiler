export type SampleDossierKey = 'chanel-no5' | 'nike' | 'ulysse-nardin' | 'crocs' | 'ray-ban-meta';

export type SampleDossierDefinition = {
    key: SampleDossierKey;
    slug: string;
    brand: { name: string; market_sector: string };
    imageUrl: string;
    primaryMechanic: string;
    confidenceScore: number;
    persuasionMetrics: { cognitive_friction: number; persuasion_density: number };
    dossier: any;
};

const buildDossier = (overrides: Partial<SampleDossierDefinition>): SampleDossierDefinition => {
    const base: SampleDossierDefinition = {
        key: 'chanel-no5',
        slug: 'sample-dossier',
        brand: { name: 'CHANEL NO.5', market_sector: 'FRAGRANCE' },
        imageUrl: '/images/examples/Chanel_No5.webp',
        primaryMechanic: 'Celebrity Aspiration Transfer — the model’s desirability is mapped directly onto the product through physical proximity and gaze convergence.',
        confidenceScore: 86,
        persuasionMetrics: { cognitive_friction: 22, persuasion_density: 78 },
        dossier: {
            persuasion_metrics: { cognitive_friction: 22, persuasion_density: 78 },
            archetype_mapping: {
                target_posture: 'The Sovereign — a brand that does not compete for attention but assumes it by right of cultural incumbency.',
                trigger_distribution: {
                    'Status Authority': 44,
                    'Aspirational Transfer': 36,
                    'Sensory Promise': 20,
                },
                strategic_moves: [
                    'Tighten the gaze vector so the product remains the final endpoint after the face lock.',
                    'Reduce supporting copy compression to preserve clarity at distance.',
                ],
            },
            gaze_topology: {
                power_holder: 'Subject (face + eye line) holds entry dominance.',
                viewer_position: 'Aspirant — the viewer is positioned below the subject’s authority posture.',
                reading: 'High-contrast facial lock drives entry; product inherits status through proximity.',
                mode_of_address: 'Direct-to-viewer address with controlled distance.',
            },
            narrative_framework:
                'ACT 1: Authority is established through face dominance and controlled negative space.\n\nACT 2: The product is positioned as the instrument of transfer — proximity does the work.\n\nACT 3: The route resolves as inevitability: ownership is framed as identity completion.',
            semiotic_subtext:
                'CHANNEL 1: Heritage monument — the bottle reads as artifact, not commodity.\n\nCHANNEL 2: Incumbency signal — restraint communicates power and exemption from trend.',
            test_plan: {
                hypothesis: 'If the product endpoint is clarified without reducing face authority, the route will preserve aspiration while improving conversion intent.',
                test_cells: [
                    { lever: 'Endpoint', change: 'Increase product edge contrast by +10%', rationale: 'Improves final lock without adding clutter.' },
                    { lever: 'Copy', change: 'Reduce supporting copy length by ~20%', rationale: 'Prevents compression friction at distance.' },
                ],
            },
        },
    };

    const next = { ...base, ...overrides } as SampleDossierDefinition;
    next.dossier = {
        ...base.dossier,
        ...overrides.dossier,
        persuasion_metrics: overrides.persuasionMetrics ? overrides.persuasionMetrics : base.persuasionMetrics,
    };
    return next;
};

export const SAMPLE_DOSSIERS: readonly SampleDossierDefinition[] = [
    buildDossier({}),
    buildDossier({
        key: 'nike',
        slug: 'sample-nike',
        brand: { name: 'NIKE', market_sector: 'OTHER' },
        imageUrl: '/images/examples/Nike.jpg',
        primaryMechanic:
            'Aspirational Identity Projection — the viewer is invited to adopt the posture through motion, scarcity cues, and athletic incumbency.',
        confidenceScore: 78,
        persuasionMetrics: { cognitive_friction: 26, persuasion_density: 72 },
        dossier: {
            archetype_mapping: {
                target_posture: 'The Challenger — identity is earned through effort, not purchased as decoration.',
                trigger_distribution: {
                    'Performance Proof': 38,
                    'Identity Projection': 34,
                    'Momentum': 28,
                },
                strategic_moves: [
                    'Strengthen the single headline claim so the shoe inherits the motion energy faster.',
                    'Keep the entry point clean: protect the first-frame read from clutter.',
                ],
            },
            gaze_topology: {
                power_holder: 'Product silhouette (shoe) drives entry through scale and contrast.',
                viewer_position: 'Participant — the viewer is invited inside the motion arc.',
                reading: 'Kinetic framing creates urgency; brand inherits authority through shorthand cues.',
                mode_of_address: 'Implicit invitation: “you could be this.”',
            },
            narrative_framework:
                'ACT 1: Motion establishes credibility.\n\nACT 2: The product is framed as the instrument.\n\nACT 3: Identity projection resolves as “I can do this.”',
            semiotic_subtext:
                'CHANNEL 1: Earned identity — the product stands in for discipline.\n\nCHANNEL 2: Athletic incumbency — the brand symbol compresses proof into shorthand.',
            test_plan: {
                hypothesis: 'If the claim resolves earlier, the motion energy translates into clearer purchase intent without sacrificing aspiration.',
                test_cells: [
                    { lever: 'Claim timing', change: 'Move the headline up one beat', rationale: 'Reduces early ambiguity.' },
                    { lever: 'Brand cue', change: 'Increase Nike mark legibility by +8%', rationale: 'Improves recognition without adding copy.' },
                ],
            },
        },
    }),
    buildDossier({
        key: 'ulysse-nardin',
        slug: 'sample-ulysse-nardin',
        brand: { name: 'ULYSSE NARDIN', market_sector: 'LUXURY WATCHES & JEWELLERY' },
        imageUrl: '/images/examples/Ulyses.jpg',
        primaryMechanic: 'Surrealist Spectacle — category disruption through impossible scale and cinematic staging.',
        confidenceScore: 82,
        persuasionMetrics: { cognitive_friction: 24, persuasion_density: 76 },
        dossier: {
            archetype_mapping: {
                target_posture: 'The Iconoclast — value is proven through audacity and controlled impossibility.',
                trigger_distribution: {
                    'Mystique': 36,
                    'Status Authority': 34,
                    'Spectacle': 30,
                },
                strategic_moves: [
                    'Protect legibility of the hero object so spectacle doesn’t become noise.',
                    'Keep the brand signature anchored to avoid drift into generic fantasy.',
                ],
            },
            gaze_topology: {
                power_holder: 'Hero object (watch) holds authority via center-weight + contrast.',
                viewer_position: 'Witness — the viewer observes an impossible scene from a stable distance.',
                reading: 'Surreal staging earns attention; product remains the proof anchor.',
                mode_of_address: 'Mythic demonstration rather than direct instruction.',
            },
            narrative_framework:
                'ACT 1: The world bends.\n\nACT 2: The object stays stable.\n\nACT 3: The brand inherits inevitability: “only us.”',
            semiotic_subtext:
                'CHANNEL 1: Controlled impossibility signals mastery.\n\nCHANNEL 2: Luxury authority is framed as physics exemption.',
            test_plan: {
                hypothesis: 'If the product edge stays the highest-contrast anchor, spectacle will lift memorability without increasing friction.',
                test_cells: [
                    { lever: 'Anchor contrast', change: 'Add a subtle rim highlight', rationale: 'Re-centers attention on the object.' },
                    { lever: 'Signature', change: 'Raise wordmark contrast slightly', rationale: 'Maintains brand lock under spectacle.' },
                ],
            },
        },
    }),
    buildDossier({
        key: 'crocs',
        slug: 'sample-crocs',
        brand: { name: 'CROCS', market_sector: 'OTHER' },
        imageUrl: '/images/examples/Crocs.jpg',
        primaryMechanic: 'Feature legitimization via technical annotation — the product is reframed as engineered, not novelty.',
        confidenceScore: 74,
        persuasionMetrics: { cognitive_friction: 28, persuasion_density: 70 },
        dossier: {
            archetype_mapping: {
                target_posture: 'The Practical Convert — comfort is justified through “proof” language, not taste.',
                trigger_distribution: {
                    'Utility Proof': 40,
                    'Ease': 34,
                    'Social Permission': 26,
                },
                strategic_moves: [
                    'Keep technical callouts minimal: too many labels increases friction.',
                    'Preserve the comfort promise as the headline signal.',
                ],
            },
            gaze_topology: {
                power_holder: 'Product texture + callout typography creates the first lock.',
                viewer_position: 'Evaluator — the viewer scans for proof and permission.',
                reading: 'Engineering language reduces “toy” stigma; comfort becomes rational.',
                mode_of_address: 'Proof-first, then permission.',
            },
            narrative_framework:
                'ACT 1: The product is introduced as functional.\n\nACT 2: Technical cues justify the claim.\n\nACT 3: Permission is granted: “it’s okay to choose comfort.”',
            semiotic_subtext:
                'CHANNEL 1: Anti-vanity stance — comfort is framed as smart.\n\nCHANNEL 2: “Good enough” becomes identity: practical and unbothered.',
            test_plan: {
                hypothesis: 'If annotations are constrained to the few highest-signal features, clarity rises without losing proof.',
                test_cells: [
                    { lever: 'Annotations', change: 'Remove 1–2 low-signal labels', rationale: 'Reduces friction.' },
                    { lever: 'Headline', change: 'Increase comfort claim prominence', rationale: 'Improves intent transfer.' },
                ],
            },
        },
    }),
    buildDossier({
        key: 'ray-ban-meta',
        slug: 'sample-ray-ban-meta',
        brand: { name: 'RAY-BAN META', market_sector: 'PREMIUM TECH' },
        imageUrl: '/images/examples/ray-ban-meta-ai-glasses-2025-10-14-06-25-55.webp',
        primaryMechanic: 'Aspirational identity transfer via fashion-tech hybridization — cultural cool borrowed from style codes.',
        confidenceScore: 80,
        persuasionMetrics: { cognitive_friction: 25, persuasion_density: 74 },
        dossier: {
            archetype_mapping: {
                target_posture: 'The Stylish Early Adopter — tech is acceptable only when it reads like fashion first.',
                trigger_distribution: {
                    'Identity Transfer': 42,
                    'Modern Utility': 32,
                    'Status Signal': 26,
                },
                strategic_moves: [
                    'Keep the fashion read primary; tech proof should arrive after acceptance.',
                    'Clarify the “what is this?” in one line without adding visual noise.',
                ],
            },
            gaze_topology: {
                power_holder: 'Face + eyewear silhouette creates the first lock.',
                viewer_position: 'Peer — the viewer evaluates cultural fit, not specs.',
                reading: 'Fashion codes grant permission; utility is the secondary justification.',
                mode_of_address: 'Peer-to-peer aspiration with low technical load.',
            },
            narrative_framework:
                'ACT 1: Fashion read establishes permission.\n\nACT 2: The object is revealed as capable.\n\nACT 3: The identity resolves: “this is me.”',
            semiotic_subtext:
                'CHANNEL 1: Tech disguised as lifestyle.\n\nCHANNEL 2: Utility is framed as status convenience rather than function.',
            test_plan: {
                hypothesis: 'If the functional promise is expressed in a single clarifier, intent rises without compromising style.',
                test_cells: [
                    { lever: 'Clarifier', change: 'Add one-line capability claim', rationale: 'Reduces confusion.' },
                    { lever: 'Composition', change: 'Maintain silhouette dominance', rationale: 'Protects fashion-first read.' },
                ],
            },
        },
    }),
] as const;

export const SAMPLE_DOSSIER_HREF = '/sample';

export const getSampleDossierBySlug = (slug: string) =>
    SAMPLE_DOSSIERS.find((entry) => entry.slug === slug) || null;
