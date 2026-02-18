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

export const AdDigestSchema = z.object({
    meta: z.object({
        media_type: z.enum(["image", "video", "mixed"]),
        brand_guess: z.string().nullable(),
        product_category_guess: z.string().nullable(),
        language_guess: z.string().nullable(),
    }),
    classification: z.object({
        trigger_mechanic: triggerMechanicSchema,
        secondary_trigger_mechanic: triggerMechanicSchema.nullable(),
        narrative_framework: narrativeFrameworkSchema,
        gaze_priority: gazePrioritySchema,
        cognitive_load: cognitiveLoadSchema,
        offer_type: offerTypeSchema,
        claim_type: claimTypeSchema,
        proof_type: z.array(proofTypeSchema).max(2),
        visual_style: z.array(visualStyleSchema).max(2),
        emotion_tone: z.array(emotionToneSchema).max(2),
        cta_strength: ctaStrengthSchema,
    }),
    extraction: z.object({
        on_screen_copy: z.object({
            primary_headline: z.string().nullable(),
            supporting_copy: z.array(z.string()),
            cta_text: z.string().nullable(),
            disclaimers: z.array(z.string()),
        }),
        dominant_color_hex: z.string().nullable(),
        notable_visual_elements: z.array(z.string()),
        composition_notes: z.string(),
        audio_notes: z.string().nullable(),
    }),
    strategy: z.object({
        target_job_to_be_done: z.string(),
        objection_tackle: z.string(),
        positioning_claim: z.string(),
        differentiator_angle: z.string(),
        semiotic_subtext: z.string(),
        behavioral_nudge: z.string(),
        misdirection_or_friction_removed: z.string().nullable(),
    }),
    diagnostics: z.object({
        confidence: z.object({
            overall: z.number(),
            trigger_mechanic: z.number(),
            secondary_trigger_mechanic: z.number(),
            narrative_framework: z.number(),
            copy_transcription: z.number(),
            color_extraction: z.number(),
        }),
        evidence_anchors: z.array(z.string()),
        failure_modes: z.array(z.string()),
        notes: z.string().nullable(),
    }),
});

export type AdDigest = z.infer<typeof AdDigestSchema>;
