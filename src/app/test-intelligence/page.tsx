'use client';

import ResultsView from '@/components/ResultsView';

export default function TestIntelligencePage() {
    const mockDigest = {
        meta: {
            brand_guess: "Apple",
            product_category_guess: "Tech Lifestyle",
            prompt_version: "V4",
            schema_version: "2.4",
            media_type: "image"
        },
        classification: {
            trigger_mechanic: "Status_Aspiration",
            secondary_trigger_mechanic: "Sensory_Pleasure",
            persuasion_stack: [
                { trigger: "Status_Aspiration", weight: 95, sequence: 1, rationale: "Ultra-minimal white space signals premium exclusivity." }
            ],
            stack_type_label: "Minimalist Authority"
        },
        extraction: {
            on_screen_copy: {
                primary_headline: "Titanium. Strong. Light. Pro.",
                cta_text: "Learn More"
            }
        },
        strategy: {
            semiotic_subtext: "Materiality as Merit: The metal becomes the message.",
            competitive_intelligence: {
                nearest_neighbor_id: "samsung-s24-ultra",
                similarity_score: 82,
                pattern_overlaps: [
                    "Macro material textures",
                    "Center-weighted product focus",
                    "Dark editorial typography"
                ],
                differentiation_levers: [
                    "Shift from technical specs to emotional feeling",
                    "Increase human interaction presence",
                    "Soft-light vs hard-light shadows"
                ],
                strategic_shift: {
                    target_posture: "The Human Instrument: Moving from metal's hardness to the software's softness.",
                    moves: [
                        "Replace macro metal shots with macro human eye interaction.",
                        "Swap high-contrast shadows for warm, diffused morning light.",
                        "Re-write copy from 'Titanium' to 'Tuned to You'."
                    ]
                }
            }
        },
        diagnostics: {
            confidence: { overall: 0.99 },
            friction_analysis: {
                scores: { offer_clarity: 95, action_clarity: 80, proof_density: 90, brand_clarity: 100, context_clarity: 85 },
                top_fixes: ["Increase CTA contrast"]
            }
        }
    };

    return (
        <div className="min-h-screen bg-[#FBF7EF] p-12">
            <h1 className="text-2xl font-bold mb-8">Agency UI Verification (Phase 4 - Intelligence)</h1>
            <ResultsView
                id="test-intel"
                mediaUrl="https://images.unsplash.com/photo-1695653422718-97d25c1cb85a?auto=format&fit=crop&q=80&w=800"
                mediaKind="image"
                digest={mockDigest as any}
                status="processed"
            />
        </div>
    );
}
