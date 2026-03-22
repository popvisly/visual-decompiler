export type PersonaFeature = {
    eyebrow: string;
    title: string;
    body: string;
};

export type PersonaFaq = {
    question: string;
    answer: string;
};

export type PersonaPageData = {
    slug: string;
    eyebrow: string;
    headlineLines: [string, string, string];
    subline: string;
    primaryCta: {
        label: string;
        href: string;
    };
    secondaryCta: {
        label: string;
        href: string;
    };
    trustLine: string;
    proofPoints: string[];
    features: PersonaFeature[];
    faqs: PersonaFaq[];
    finalCta: {
        headline: string;
        subline: string;
        label: string;
        href: string;
        note: string;
    };
};

export const ART_DIRECTOR_PERSONA_PAGE: PersonaPageData = {
    slug: 'for-art-directors',
    eyebrow: 'For Art Directors & Creative Leads',
    headlineLines: ['Is this concept', 'strong enough', 'to present?'],
    subline:
        'Upload your work-in-progress ad and get back a precise read on what’s working, what’s not, and what to change before you walk into the room. In under 60 seconds.',
    primaryCta: {
        label: 'Upload Your Concept Free',
        href: '/ingest',
    },
    secondaryCta: {
        label: 'See a Sample Readout',
        href: '/asset/1cb30400-1ba3-4dda-8fe2-7650674aeb4a',
    },
    trustLine: 'No card required · 5 free analyses · Results in under 60 seconds',
    proofPoints: [
        '“Keep prestige cues, then introduce one disruptive structural element to reclaim novelty.” — the kind of direction Visual Decompiler returns',
        'Upload any format — JPG, PNG, URL, video frame',
        'Get a full readout before your next presentation',
    ],
    features: [
        {
            eyebrow: 'Single Asset Deconstruction',
            title: 'Know exactly what your ad is doing — not just how it looks',
            body:
                'Feed in your WIP, a reference, or a competitor piece. Visual Decompiler breaks it apart from surface composition to psychological structure and tells you what’s driving response. Then it tells you what to change next.',
        },
        {
            eyebrow: 'Recommended Move',
            title: 'A concrete creative direction, not a score',
            body:
                'Every analysis ends with a specific recommended move. Not a rating. Not a sentiment tag. An actual direction a senior CD would give — that you can act on today.',
        },
        {
            eyebrow: 'Blueprint Tab',
            title: 'Understand why a reference works so you can use it intentionally',
            body:
                'Stop vibing off references and start stealing structurally. The Blueprint tab gives you the narrative framework and production logic behind any ad so your team can build from mechanism, not mood.',
        },
        {
            eyebrow: 'Differential Diagnosis',
            title: 'Two routes. One clear answer.',
            body:
                'Upload your two strongest concepts and get back a strategic delta — novelty advantage, identity pull, fatigue risk. Walk into the decision with data, not instinct.',
        },
    ],
    faqs: [
        {
            question: 'I’m a visual person — is this too data-heavy?',
            answer:
                'The output reads like a senior strategist’s brief, not a spreadsheet. Every finding is written in plain language your whole team can act on.',
        },
        {
            question: 'Will it understand the category I’m working in?',
            answer:
                'Visual Decompiler has been trained across luxury, fashion, beauty, FMCG, fintech, and beyond. Category context is built into every analysis.',
        },
        {
            question: 'What if my concept is rough — not finished work?',
            answer:
                'That’s exactly when it’s most useful. Early-stage work benefits most from a structural read before you’ve locked in the wrong direction.',
        },
    ],
    finalCta: {
        headline: 'Your next presentation just got stronger.',
        subline: 'Upload your concept now. Get your readout before you need it.',
        label: 'Start Decompiling Free',
        href: '/ingest',
        note: 'No card required · First 5 analyses free',
    },
};

export const NEW_BUSINESS_PERSONA_PAGE: PersonaPageData = {
    slug: 'for-new-business',
    eyebrow: 'For New Business & Agency Growth',
    headlineLines: ['Walk into any pitch', 'knowing the category', 'better than the room.'],
    subline:
        'Visual Decompiler gives you forensic competitive intelligence on any brand’s advertising — trigger mechanics, psychological architecture, whitespace analysis — in under 60 seconds. Walk in prepared. Walk out with the business.',
    primaryCta: {
        label: 'Start Your Pitch Prep Free',
        href: '/ingest',
    },
    secondaryCta: {
        label: 'See a Sample Competitive Dossier',
        href: '/asset/1cb30400-1ba3-4dda-8fe2-7650674aeb4a',
    },
    trustLine: 'No card required · 5 free analyses · White-label pitch-ready export',
    proofPoints: [
        'Full competitive category read before any pitch',
        'Whitespace intelligence — find the position no one else is defending',
        'White-label dossier: leave it behind as a premium strategy artifact',
    ],
    features: [
        {
            eyebrow: 'Market Pulse',
            title: 'Own the category conversation before it starts',
            body:
                'Walk into a pitch with a complete read on what every competitor in the room is doing creatively — which mechanics are dominant, which are fatiguing, and where the whitespace is. That’s not an opinion. That’s a brief.',
        },
        {
            eyebrow: 'White-Label Dossier Export',
            title: 'Leave behind something they can’t get anywhere else',
            body:
                'Export a fully branded competitive intelligence report as a pitch artifact. A document that demonstrates analytical depth your competitors aren’t producing. The kind of deliverable that gets you on the shortlist before you’ve shown a single creative.',
        },
        {
            eyebrow: 'Differential Diagnosis',
            title: 'Show the client their own category delta',
            body:
                'Pull two of the client’s competitors, run a Differential Diagnosis, and show them exactly where their category is congested and where the strategic opportunity lives. That’s a slide deck that closes pitches.',
        },
        {
            eyebrow: 'Intelligence Vault',
            title: 'Brief prep that compounds over time',
            body:
                'Every competitive analysis you run goes into your Vault. By your fifth pitch in a category, you have a structural baseline no other agency in the room can match.',
        },
    ],
    faqs: [
        {
            question: 'We do competitive research already.',
            answer:
                'Not with this output quality at this speed. A full competitive category read — structured, presentable, white-labeled — in under 60 seconds per asset.',
        },
        {
            question: 'Is the Agency tier worth it for new business?',
            answer:
                'One pitch win at Agency level pays for a year of the platform. The question is what a category intelligence advantage is worth to your conversion rate.',
        },
    ],
    finalCta: {
        headline: 'The pitch is in 48 hours. Start now.',
        subline: 'Upload the client’s main competitor. See what you get.',
        label: 'Start Your Pitch Prep Free',
        href: '/ingest',
        note: 'No card required · First 5 analyses free',
    },
};
