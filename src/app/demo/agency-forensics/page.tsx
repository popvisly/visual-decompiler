'use client';

import React from 'react';
import ResultsView from '@/components/ResultsView';
import { AdDigest } from '@/types/digest';
import UnifiedSovereignHeader from '@/components/UnifiedSovereignHeader';

const DEMO_DIGEST: AdDigest = {
    meta: {
        schema_version: "2.2",
        media_type: "video",
        brand_guess: "Nike",
        product_category_guess: "Athletic Performance",
        generated_at: new Date().toISOString()
    },
    classification: {
        trigger_mechanic: "Self_Improvement_Mastery",
        secondary_trigger_mechanic: "Status_Prestige",
        narrative_framework: "Before_After_Transformation",
        gaze_priority: "Human_Body_Action",
        cognitive_load: "Fast_Tense",
        offer_type: "No_Offer_BrandOnly",
        claim_type: "Performance",
        proof_type: ["UGC_Authenticity"],
        visual_style: ["Minimalist", "Editorial_Fashion"],
        emotion_tone: ["Confidence", "Desire"],
        cta_strength: "Direct",
        persuasion_stack: [
            { trigger: "Mastery", weight: 65, sequence: 1, rationale: "Macro-focus on muscle tension establishes the 'Work' phase." },
            { trigger: "Prestige", weight: 35, sequence: 2, rationale: "Slow-motion release and minimalist logo placement encodes luxury performance." }
        ],
        stack_type_label: "Aspirational Grid"
    },
    extraction: {
        on_screen_copy: {
            primary_headline: "FINISH STRONG",
            cta_text: "SHOP METCON 9",
            ocr_text: ["NIKE METCON", "JUST DO IT"]
        },
        notable_visual_elements: ["Dark studio lighting", "High-contrast sweat textures", "Central product orientation"],
        composition_notes: "Foveal attention is locked to the center-frame movement. Side-lighting emphasizes muscular definition.",
        evidence_receipts: [
            { id: "rec1", type: "Visual", label: "Sweat Texture", area: { x: 450, y: 300, w: 100, h: 100 }, reason: "High-frequency detail signal for 'Intensity' claim." },
            { id: "rec2", type: "Text", label: "Metcon Branding", area: { x: 480, y: 850, w: 150, h: 40 }, reason: "Clear product identification at CTA apex." },
            { id: "rec3", type: "Composition", label: "Hero Isolation", area: { x: 200, y: 100, w: 600, h: 800 }, reason: "Negative space around subject drives premium perception." }
        ],
        likely_scan_path: [
            { step: 1, target: "Athlete Face", rationale: "Natural foveal entry point via eye-contact surrogate." },
            { step: 2, target: "Headline", rationale: "Movement-to-text saccade follows the upper-third line." },
            { step: 3, target: "Product Focus", rationale: "Centralized weight during highlight action." }
        ]
    },
    strategy: {
        behavioral_nudge: "Loss Aversion (Time)",
        target_job_to_be_done: "To feel capable of finishing a workout when motivation drops.",
        test_plan: {
            hypothesis: "The current 'Finish Strong' headline is too abstract for non-elite athletes.",
            sprint_duration_days: 14,
            test_cells: [
                { lever: "Hook", change: "Replace studio black with a high-motion street gym setting.", predicted_impact: "High", rationale: "Increases relatability while maintaining mastery triggers." },
                { lever: "Visual_Crop", change: "Tight crop on shoe impact vs. full body.", predicted_impact: "Medium", rationale: "Check if product specificity beats aspirational identity." }
            ]
        },
        variant_matrix: [
            { name: "The Grit", description: "Gritty, low-fi UGC style focusing on the struggle.", primary_lever: "Authenticity" },
            { name: "The Lab", description: "Hyper-clean, sci-fi lighting focusing on technical specs.", primary_lever: "Performance" }
        ],
        misdirection_or_friction_removed: "Subconsciously neutralizes the 'effort' hurdle by aestheticizing the struggle.",
        notes: "Strategic DNA is optimized for high-performance audience segments."
    },
    diagnostics: {
        confidence: { overall: 94, trigger_mechanic: 98, subtext: 91 },
        friction_analysis: {
            scores: { offer_clarity: 45, action_clarity: 82, brand_recall: 95 },
            top_fixes: ["Increase CTA button contrast", "Add price-point to remove budget friction"]
        },
        platform_fitness: [
            { platform: "Instagram_Stories", fitness_score: 92, safe_zone_violation: false, notes: "CTA is perfectly clear of bottom UI navigation." },
            { platform: "TikTok", fitness_score: 65, safe_zone_violation: true, notes: "Right-side captions overlap with the Metcon logo during the hook." }
        ],
        risk_analysis: {
            policy_flags: [
                { id: "risk1", flag: "Misleading Claim", severity: "Medium", why: "Implicit promise of transformation without disclaimer.", receipt_refs: ["rec1"] }
            ],
            risk_score: 42,
            explanation: "Moderate risk due to aggressive transformation imagery without standard performance disclaimers."
        },
        notes: "Excellent creative cohesion. Strategic bottleneck is the low offer clarity."
    }
};

export default function DemoPage() {
    return (
        <main className="min-h-screen bg-[#F6F1E7]">
            <UnifiedSovereignHeader />
            <div className="pt-24 px-6 pb-20">
                <div className="max-w-6xl mx-auto mb-12">
                    <h1 className="text-4xl font-light tracking-tight text-[#141414] mb-4">Golden Path: Creative Forensics</h1>
                    <p className="text-[#6B6B6B] max-w-2xl text-lg font-light leading-relaxed">
                        Demonstrating the v1.0 Agency-Grade upgrade. Integrated evidence, platform diagnostics, compliance auditing, and tactical test planning in a single unified flow.
                    </p>
                </div>
                <ResultsView
                    id="demo-forensics"
                    mediaUrl="/images/examples/Model_Mirror.jpg"
                    mediaKind="image"
                    digest={DEMO_DIGEST}
                    status="processed"
                    brand="Nike"
                />
            </div>
        </main>
    );
}
