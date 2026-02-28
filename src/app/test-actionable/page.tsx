'use client';

import ResultsView from '@/components/ResultsView';

export default function TestActionablePage() {
    const mockDigest = {
        meta: {
            brand_guess: "Nike",
            product_category_guess: "Athletic Footwear",
            prompt_version: "V4",
            schema_version: "2.3",
            media_type: "image"
        },
        classification: {
            trigger_mechanic: "Self_Improvement_Mastery",
            secondary_trigger_mechanic: "Identity_Belonging",
            narrative_framework: "HeroJourney_Short",
            persuasion_stack: [
                { trigger: "Self_Improvement_Mastery", weight: 90, sequence: 1, rationale: "Close-up of sweat and strained muscles signals elite effort." },
                { trigger: "Identity_Belonging", weight: 60, sequence: 2, rationale: "Iconic 'Just Do It' logo anchors the viewer's identity to the athlete." }
            ],
            stack_type_label: "Aspirational Performance",
            visual_style: ["High_Contrast", "Gritty"],
            emotion_tone: ["Determination", "Focus"]
        },
        extraction: {
            on_screen_copy: {
                primary_headline: "Finish Strong.",
                cta_text: "Shop Infinity Run"
            },
            evidence_receipts: [
                {
                    type: "Visual",
                    label: "Sweat Texture",
                    reason: "Visible perspiration on the forehead signals high intensity.",
                    area: { x: 400, y: 100, w: 200, h: 200 }
                }
            ],
            likely_scan_path: [
                { step: 1, target: "Athlete Face", rationale: "Emotional epicenter of the creative." },
                { step: 2, target: "Headline", rationale: "Verbal reinforcement of the struggle." }
            ],
            composition_notes: "Vignetted edges focus all light on the subject's expression."
        },
        strategy: {
            semiotic_subtext: "Suffering as Currency: Sweat is the price of entry for elite status.",
            objection_tackle: "Pain is re-framed as a badge of honor, not a deterrent.",
            test_plan: {
                hypothesis: "Increasing the 'Gritty' texture and sweat density will drive 20% higher CTR among marathon-trained segments.",
                sprint_duration_days: 14,
                test_cells: [
                    {
                        lever: "Visual_Crop",
                        change: "Macro crop on the shoe-impact point (asphalt splash).",
                        predicted_impact: "High",
                        rationale: "Shifts focus from emotional suffering to technical footwear performance."
                    },
                    {
                        lever: "Hook",
                        change: "Replace 'Finish Strong' with '80 miles to go.'",
                        predicted_impact: "Medium",
                        rationale: "Tests cognitive endurance messaging over general motivation."
                    }
                ]
            },
            variant_matrix: [
                { name: "The Technician", description: "Blue-tinted lighting, focuses on foam compression physics.", primary_lever: "Background" },
                { name: "The Lonewolf", description: "Black & white, sunrise setting, focuses on the early morning grind.", primary_lever: "Visual_Crop" }
            ],
            evidence_anchors: ["High-contrast lighting", "汗 (sweat) macro-texture", "Minimalist white-on-black typography"]
        },
        diagnostics: {
            confidence: { overall: 0.98 },
            friction_analysis: {
                scores: { offer_clarity: 95, action_clarity: 90, proof_density: 85, brand_clarity: 100, context_clarity: 70 },
                top_fixes: ["Add a secondary 'Find Local Retailer' soft CTA"]
            }
        }
    };

    return (
        <div className="min-h-screen bg-[#FBF7EF] p-12">
            <h1 className="text-2xl font-bold mb-8">Agency UI Verification (Phase 3 - Actionable Output)</h1>
            <ResultsView
                id="test-action"
                mediaUrl="https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=800"
                mediaKind="image"
                digest={mockDigest as any}
                status="processed"
            />
        </div>
    );
}
