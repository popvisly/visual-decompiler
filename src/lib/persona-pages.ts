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

export const CREATIVE_DIRECTOR_PERSONA_PAGE: PersonaPageData = {
    slug: 'for-creative-directors',
    eyebrow: 'For Creative Directors',
    headlineLines: ['Turn any brief', 'into a direction', 'your team can execute.'],
    subline:
        'Visual Decompiler gives you the structural logic behind any reference or competitor work — so you can move from instinct to direction fast, without the analysis overhead.',
    primaryCta: {
        label: 'Start Decompiling Free',
        href: '/ingest',
    },
    secondaryCta: {
        label: 'Open Sample Dossier',
        href: '/asset/1cb30400-1ba3-4dda-8fe2-7650674aeb4a',
    },
    trustLine: 'No card required · 5 free analyses · White-label export ready',
    proofPoints: [
        'Brief to direction in under 60 seconds',
        'Blueprint output gives your team production-ready structural logic',
        'Clone Engine generates five campaign concepts from one winning mechanic',
    ],
    features: [
        {
            eyebrow: 'Blueprint Tab',
            title: 'From reference to rationale in one step',
            body:
                'Every great brief starts with a reference that no one can fully explain. Blueprint deconstructs it — narrative structure, compositional logic, psychological mechanism — and translates it into a creative direction your team can actually build from.',
        },
        {
            eyebrow: 'Clone Engine',
            title: 'Five campaign routes from one winning ad',
            body:
                'Upload a competitor ad or a winning reference. Clone Engine extracts the core persuasion mechanic and generates five distinct campaign concepts built on the same structural logic. Different creative. Same winning system underneath.',
        },
        {
            eyebrow: 'Differential Diagnosis',
            title: 'Resolve creative debates with intelligence, not seniority',
            body:
                'When two routes are on the table, Differential Diagnosis gives you a structural read on both — novelty advantage, emotional pull, fatigue risk. The right call becomes obvious.',
        },
        {
            eyebrow: 'Intelligence Vault',
            title: 'Build a reference library that actually explains itself',
            body:
                'Every analysis goes into your Vault — searchable by brand, category, mechanic, or tag. Brief prep that used to take a morning now takes minutes.',
        },
    ],
    faqs: [
        {
            question: 'I already know what good work looks like.',
            answer:
                'Knowing is different from being able to explain it to a client or a junior team. Visual Decompiler gives you the language to move fast from recognition to direction.',
        },
        {
            question: 'My team already has a process.',
            answer:
                'This doesn’t replace your process — it accelerates the research and rationale stages so your team spends more time making, less time justifying.',
        },
    ],
    finalCta: {
        headline: 'Brief faster. Direct better. Defend more.',
        subline: 'Start with one analysis. See what it produces.',
        label: 'Start Decompiling Free',
        href: '/ingest',
        note: 'No card required · First 5 analyses free',
    },
};

export const STRATEGY_DIRECTOR_PERSONA_PAGE: PersonaPageData = {
    slug: 'for-strategy-directors',
    eyebrow: 'For Strategy Directors & Brand Strategists',
    headlineLines: ['Back every creative', 'recommendation with', 'structured intelligence.'],
    subline:
        'Visual Decompiler builds the analytical layer between creative instinct and client confidence — trigger mechanics, category momentum, persuasion mapping, and white-label outputs your clients can trust.',
    primaryCta: {
        label: 'Start Decompiling Free',
        href: '/ingest',
    },
    secondaryCta: {
        label: 'See the Market Pulse Output',
        href: '/pricing',
    },
    trustLine: 'No card required · 5 free analyses · White-label dossier export included',
    proofPoints: [
        'Five intelligence surfaces per analysis — not just a single score',
        'Market Pulse tracks mechanic velocity and whitespace across your category',
        'White-label export: present findings as your own strategic IP',
    ],
    features: [
        {
            eyebrow: 'Market Pulse',
            title: 'See what the category is doing before your client does',
            body:
                'Market Pulse maps mechanic velocity, trigger distribution, and strategic whitespace across your sector. Know which persuasion systems are rising, which are flattening, and where the open territory is — before it becomes mainstream.',
        },
        {
            eyebrow: 'Differential Diagnosis',
            title: 'Quantify the strategic delta between creative routes',
            body:
                'Compare two assets and get back persuasion lift, novelty advantage, and fatigue risk. The kind of comparative read that used to take a strategist a day now takes 60 seconds and comes with a client-presentable output attached.',
        },
        {
            eyebrow: 'White-Label Export',
            title: 'Your intelligence. Your brand. Your IP.',
            body:
                'Every dossier exports as a branded strategic document your agency presents directly to clients. No Visual Decompiler branding. Your name on the analysis. The kind of deliverable that justifies a strategy retainer on its own.',
        },
        {
            eyebrow: 'Intelligence Vault',
            title: 'Compounding strategic memory across every engagement',
            body:
                'Every analysis adds to your Vault — a searchable competitive archive that gets more valuable the more you use it. Category briefs that used to require days of desk research now start from a structured baseline.',
        },
    ],
    faqs: [
        {
            question: 'We already do competitive analysis.',
            answer:
                'Not at this depth, at this speed. Manual analysis takes a day. Visual Decompiler takes 60 seconds and produces a structured, presentable output — not notes in a doc.',
        },
        {
            question: 'How do I know the analysis is reliable?',
            answer:
                'Open the sample dossier on a Chanel No.5 ad. Read it. If the output matches your own read, you have your answer.',
        },
    ],
    finalCta: {
        headline: 'Intelligence your clients will pay for.',
        subline: 'Start with one analysis. Export it as your own.',
        label: 'Start Decompiling Free',
        href: '/ingest',
        note: 'No card required · White-label export on every tier',
    },
};

export const BRAND_MANAGER_PERSONA_PAGE: PersonaPageData = {
    slug: 'for-brand-managers',
    eyebrow: 'For In-House Brand & Marketing Teams',
    headlineLines: ['Evaluate agency work', 'with precision,', 'not opinion.'],
    subline:
        'Visual Decompiler gives brand managers a structured analytical view of any creative — so you can brief better, push back smarter, and present recommendations upward with confidence.',
    primaryCta: {
        label: 'Start Decompiling Free',
        href: '/ingest',
    },
    secondaryCta: {
        label: 'See a Sample Output',
        href: '/asset/1cb30400-1ba3-4dda-8fe2-7650674aeb4a',
    },
    trustLine: 'No card required · 5 free analyses · No creative background required',
    proofPoints: [
        'Evaluate submitted agency work against your brief',
        'Identify what’s missing before you’re in the room',
        'Present findings upward in plain language',
    ],
    features: [
        {
            eyebrow: 'Single Asset Deconstruction',
            title: 'Understand what the agency gave you — really',
            body:
                'Feed in the agency’s submitted creative. Visual Decompiler tells you what psychological levers it’s using, whether the composition logic is consistent with your brand positioning, and what the friction risks are. Brief feedback that’s specific, not subjective.',
        },
        {
            eyebrow: 'Intelligence Tab',
            title: 'Is it doing what the brief asked?',
            body:
                'The Intelligence surface gives you a primary read on the ad’s mechanism — what it’s actually communicating vs. what it’s supposed to. The gap between those two is the conversation you need to have with the agency.',
        },
        {
            eyebrow: 'Market Pulse',
            title: 'Is this creative distinctive in the category?',
            body:
                'Market Pulse shows you whether the approach the agency is taking is differentiated or following a category convention that’s already fatiguing. That’s a brief note worth sending before you approve production budgets.',
        },
        {
            eyebrow: 'White-Label Export',
            title: 'Present intelligence upward without writing a report',
            body:
                'Export any analysis as a clean branded document you can share with your CMO or marketing director. Structured findings. Plain language. No jargon.',
        },
    ],
    faqs: [
        {
            question: 'I’m not a creative — will I understand the output?',
            answer:
                'Yes. Every finding is written in plain language. No design theory. No jargon. Just a clear read on what the ad is doing and what to do about it.',
        },
        {
            question: 'Does this replace the agency relationship?',
            answer:
                'No — it makes you a better client. Agencies produce better work when the brief and feedback are precise. This gives you the tools to do both.',
        },
    ],
    finalCta: {
        headline: 'Better briefs. Better feedback. Better work.',
        subline: 'Upload the last piece of work your agency submitted. See what it’s actually doing.',
        label: 'Start Decompiling Free',
        href: '/ingest',
        note: 'No card required · First 5 analyses free',
    },
};

export const COPYWRITER_PERSONA_PAGE: PersonaPageData = {
    slug: 'for-copywriters',
    eyebrow: 'For Copywriters & Conceptual Teams',
    headlineLines: ['Understand the emotional', 'logic behind any visual —', 'so your words land in the same register.'],
    subline:
        'Visual Decompiler reads the psychological and emotional architecture of any ad — giving you the structural language to write copy that works with the visual, not just alongside it.',
    primaryCta: {
        label: 'Start Decompiling Free',
        href: '/ingest',
    },
    secondaryCta: {
        label: 'See the Psychology Output',
        href: '/asset/1cb30400-1ba3-4dda-8fe2-7650674aeb4a',
    },
    trustLine: 'No card required · 5 free analyses · Results in under 60 seconds',
    proofPoints: [
        'Psychology tab maps the emotional levers behind any visual',
        'Audience tab gives you the psychographic persona the ad is targeting',
        'Narrative Framework tells you the story arc the visual is building',
    ],
    features: [
        {
            eyebrow: 'Psychology Tab',
            title: 'Read the emotional logic before you write a word',
            body:
                'The Psychology surface identifies the cognitive triggers, emotional load, and identity levers behind any visual. Feed in your reference or the campaign visual and see exactly what emotional register it’s operating in — so you know what your copy needs to match, extend, or counterpoint.',
        },
        {
            eyebrow: 'Audience Tab',
            title: 'Write to the person the visual is actually addressing',
            body:
                'The Audience surface builds a psychographic persona from the ad — aspirations, identity drivers, cultural signals. The person the visual is speaking to is the person your copy needs to speak to. Now you know exactly who that is.',
        },
        {
            eyebrow: 'Narrative Framework',
            title: 'Find the story arc — then write your chapter',
            body:
                'Every great ad has a narrative logic: a hook, a tension, a resolution. The Narrative Framework surface maps that structure so you can write copy that follows the same arc — or deliberately breaks it for effect.',
        },
        {
            eyebrow: 'Blueprint Tab',
            title: 'Structural logic you can write from',
            body:
                'Blueprint gives you the production and narrative framework behind the visual — the mechanisms that are making it work. Not mood. Not aesthetic. Mechanism. The most useful creative brief you’ll ever get.',
        },
    ],
    faqs: [
        {
            question: 'I write from instinct — won’t this make my work too analytical?',
            answer:
                'The output doesn’t replace instinct — it sharpens it. When you know exactly what emotional register a visual is in, your instinct has better material to work from.',
        },
        {
            question: 'Is this for people who work on visual ads specifically?',
            answer:
                'Any campaign where words and images work together. Digital, print, OOH, social. If there’s a visual you need to write with, this is useful.',
        },
    ],
    finalCta: {
        headline: 'Write with the visual. Not just next to it.',
        subline: 'Upload the campaign visual. Read the emotional architecture. Then write.',
        label: 'Start Decompiling Free',
        href: '/ingest',
        note: 'No card required · First 5 analyses free',
    },
};
