import { z } from 'zod';

export const triggerMechanicSchema = z.enum([
    "Status_Prestige",
    "FOMO_Scarcity",
    "Security_Trust",
    "Rebellion_Disruption",
    "Nostalgia_Comfort",
    "Tribal_Belonging",
    "Sex_Desire",
    "Convenience_Time",
    "Savings_Value",
    "Self_Improvement_Mastery",
    "Relief_Pain_Avoidance"
]);

export const narrativeFrameworkSchema = z.enum([
    "Problem_Agitation_Solution",
    "Before_After_Transformation",
    "Micro_Heros_Journey",
    "Aspirational_DayInLife",
    "Absurdist_PatternInterrupt",
    "Educational_Breakdown",
    "Testimonial_SocialProof",
    "ProductAsHero_NoStory",
    "Challenge_Proof_Result"
]);

export const gazePrioritySchema = z.enum([
    "Human_Face_EyeContact",
    "Human_Body_Action",
    "Product_Packaging",
    "Typography_Headline",
    "Logo_BrandMark",
    "Price_Discount_Badge",
    "Color_Block_Abstract",
    "Scene_Context_Environment"
]);

export const cognitiveLoadSchema = z.enum([
    "Minimal_HighContrast",
    "Cinematic_SlowBurn",
    "Fast_Tense",
    "Dense_InfoHeavy",
    "Chaotic_Cluttered"
]);

export const offerTypeSchema = z.enum([
    "No_Offer_BrandOnly",
    "Free_Trial",
    "Limited_Time_Discount",
    "Bundle_Save",
    "Subscription",
    "OneTime_Purchase",
    "LeadMagnet",
    "Waitlist",
    "App_Download",
    "Consultation_Booking"
]);

export const claimTypeSchema = z.enum([
    "Health_Support",
    "Performance",
    "Taste_Indulgence",
    "Savings",
    "Social_Proof",
    "Identity",
    "Feature_Function"
]);

export const proofTypeSchema = z.enum([
    "None",
    "Authority_Badge",
    "Customer_Testimonial",
    "Ratings_Reviews",
    "BeforeAfter_Proof",
    "Stats_Metrics",
    "Logos_Partners",
    "Demo_ScreenProduct",
    "UGC_Authenticity",
    "Guarantee_RiskReversal"
]);

export const visualStyleSchema = z.enum([
    "Minimalist",
    "Premium_Luxury",
    "Playful_Bold",
    "Technical_Utilitarian",
    "Organic_Natural",
    "Retro_Nostalgic",
    "Futuristic_SciFi",
    "Editorial_Fashion",
    "Corporate_Modern",
    "Handmade_Craft"
]);

export const emotionToneSchema = z.enum([
    "Awe",
    "Desire",
    "Relief",
    "Safety",
    "Confidence",
    "Belonging",
    "Curiosity",
    "Humor",
    "Urgency",
    "Trust",
    "Peace_Calm"
]);

export const ctaStrengthSchema = z.enum([
    "None",
    "Soft",
    "Direct",
    "Hard"
]);

export const first3sHookTypeSchema = z.enum([
    "Problem",
    "Agitate",
    "Solve",
    "PatternInterrupt",
    "SocialProof",
    "Offer",
    "Authority",
    "Demo",
    "Identity",
    "Curiosity"
]);

export const premiumPrinciplesSchema = z.enum([
    "exclusivity",
    "identity",
    "storytelling"
]);

export const exclusivityModeSchema = z.enum([
    "scarcity",
    "club/access",
    "craftsmanship",
    "drops",
    "heritage",
    "discriminating_clientele"
]);

export const adoptionTierSchema = z.enum([
    "Edgy",
    "Trendy",
    "Mainstream"
]);

export const campaignCategorySchema = z.enum([
    "Print",
    "OOH",
    "Digital_Display",
    "Social",
    "Direct_Mail",
    "TV_Cinema",
    "Other"
]);

export const AdDigestSchema = z.object({
    meta: z.object({
        /** Version the digest contract so prompt/schema iterations don't silently break the UI. (v2.2: Trend Intelligence) */
        schema_version: z.string().optional(),
        generated_at: z.string().optional(),
        media_type: z.enum(["image", "video", "mixed"]),
        brand_guess: z.string().nullable(),
        product_category_guess: z.string().nullable(),
        language_guess: z.string().nullable().optional(),
        aesthetic_year: z.string().nullable().optional(),
        historical_genealogy: z.string().nullable().optional(),
        adoption_tier: adoptionTierSchema.or(z.string()).nullable().optional(),
        campaign_category: campaignCategorySchema.or(z.string()).nullable().optional(),
        trend_momentum: z.number().nullable().optional(),
        predicted_resonance_window: z.string().nullable().optional(),
    }),
    classification: z.object({
        trigger_mechanic: triggerMechanicSchema.or(z.string()),
        secondary_trigger_mechanic: triggerMechanicSchema.or(z.string()).nullable(),
        narrative_framework: narrativeFrameworkSchema.or(z.string()),
        gaze_priority: gazePrioritySchema.or(z.string()),
        cognitive_load: cognitiveLoadSchema.or(z.string()),
        offer_type: offerTypeSchema.or(z.string()),
        claim_type: claimTypeSchema.or(z.string()),
        proof_type: z.array(proofTypeSchema.or(z.string())).max(2),
        visual_style: z.array(visualStyleSchema.or(z.string())).max(2),
        emotion_tone: z.array(emotionToneSchema.or(z.string())).max(2),
        cta_strength: ctaStrengthSchema.or(z.string()),
        brand_association_values: z.array(z.string()).optional(),
    }),
    audience_strategy: z.object({
        target_audience_segment: z.string(),
        unmet_need_tags: z.array(z.string()),
        transfer_mechanism: z.string(),
        first3s_hook_type: first3sHookTypeSchema.or(z.string()).nullable().optional(),
        hook_clarity_score: z.number(),
        evidence_anchors_timecoded: z.array(z.object({
            t: z.string(),
            anchor: z.string(),
        })).optional(),
    }).optional(),
    premium_intelligence: z.object({
        premium_principles: z.array(premiumPrinciplesSchema.or(z.string())),
        premium_principle_primary: premiumPrinciplesSchema.or(z.string()).nullable().optional(),
        exclusivity_mode: exclusivityModeSchema.or(z.string()).nullable().optional(),
        premium_index_score: z.number(),
    }).optional(),
    semiotic_intelligence: z.object({
        semiotic_layers: z.array(z.object({
            layer_name: z.string(),
            cues: z.array(z.string()),
            claim: z.string(),
        })),
        semiotic_tensions: z.array(z.string()),
        possible_readings: z.array(z.object({
            reading: z.string(),
            support: z.array(z.string()),
            note: z.string().nullable(),
        })).optional(),
    }).optional(),
    extraction: z.object({
        on_screen_copy: z.object({
            primary_headline: z.string().nullable().optional(),
            supporting_copy: z.array(z.string()).optional(),
            cta_text: z.string().nullable().optional(),
            disclaimers: z.array(z.string()).optional(),
            ocr_text: z.array(z.string()).optional(), // [NEW] MS14 Deep OCR
        }),
        dominant_color_hex: z.string().nullable().optional(),
        /**
         * Palette extracted from the creative (dominant + supporting colors).
         * Hex strings without # (e.g. "F2C94C"). Keep small for UI.
         */
        palette_hex: z.array(z.string()).optional(),
        keyframes: z.array(z.object({
            t_ms: z.number(),
            label: z.enum(["start", "mid", "end", "high_motion", "other", "Hook", "Body 1", "Body 2", "Body 3", "CTA"]),
            image_url: z.string().nullable(),
            notes: z.string().nullable(),
        })).optional(),
        notable_visual_elements: z.array(z.string()),
        composition_notes: z.string().optional(),
        audio_notes: z.string().nullable().optional(),
        narrative_arc: z.object({
            hook_analysis: z.string(),
            retention_mechanics: z.string(),
            story_structure: z.string(),
            cta_climax: z.string(),
            arc_segments: z.array(z.object({
                t_ms: z.number(),
                label: z.string(),
                strategy_note: z.string()
            })),
            transcription: z.string().optional(), // [NEW] MS14 Speech-to-Text
        }).optional(),
        video_pacing: z.object({
            average_shot_length: z.number(),
            cut_cadence: z.enum(["Frenetic", "Fast", "Moderate", "Slow", "Hypnotic"]),
            total_cuts: z.number(),
        }).optional(),
    }),
    strategy: z.object({
        target_job_to_be_done: z.string().optional(),
        objection_tackle: z.string().optional(),
        positioning_claim: z.string().optional(),
        differentiator_angle: z.string().optional(),
        semiotic_subtext: z.string().optional(),
        competitive_advantage: z.string().optional(),
        behavioral_nudge: z.string().optional(),
        misdirection_or_friction_removed: z.string().nullable().optional(),
        evidence_anchors: z.array(z.string()).optional(), // [NEW] Deep Decompiler
        reconstruction_prompt: z.string().nullable().optional(), // [NEW] Milestone 51: Semantic Prompting
    }),
    neural_deconstruction: z.object({
        cognitive_load_score: z.number(),
        cognitive_load_zones: z.array(z.object({
            zone: z.string(),
            load: z.number(),
            note: z.string(),
        })),
        schema_segments: z.array(z.object({
            label: z.string(),
            duration_hint: z.string(),
            trigger_used: z.string(),
            note: z.string(),
        })),
        platform_affinity: z.array(z.object({
            platform: z.string(),
            fit_score: z.number(),
            rationale: z.string(),
        })),
        emotional_drivers: z.array(z.object({
            driver: z.string(),
            intensity: z.number(),
            source: z.string(),
        })),
        strategic_verdict: z.string(),
        percentile_estimate: z.number(),
    }).optional(),
    diagnostics: z.object({
        confidence: z.object({
            overall: z.number(),
            trigger_mechanic: z.number().optional(),
            secondary_trigger_mechanic: z.number().optional(),
            narrative_framework: z.number().optional(),
            copy_transcription: z.number().optional(),
            color_extraction: z.number().optional(),
            subtext: z.number().optional(), // [NEW] Deep Decompiler
            objection: z.number().optional(), // [NEW] Deep Decompiler
        }),
        evidence_anchors: z.array(z.string()).optional(), // [NEW] moved/duplicated for safety
        failure_modes: z.array(z.string()).optional(),
        notes: z.string().nullable(),
    }),
});

export type AdDigest = z.infer<typeof AdDigestSchema>;
