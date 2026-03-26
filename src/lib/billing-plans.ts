export type BillingPlanKey = 'strategic' | 'professional';
export type BillingTier = 'free' | 'pro' | 'professional' | 'agency';

type BillingPlanDefinition = {
    key: BillingPlanKey;
    stripePriceId: string | undefined;
    tier: BillingTier;
};

const BILLING_PLANS: Record<BillingPlanKey, BillingPlanDefinition> = {
    strategic: {
        key: 'strategic',
        stripePriceId: process.env.STRIPE_PRICE_PRO_MONTHLY,
        tier: 'pro',
    },
    professional: {
        key: 'professional',
        stripePriceId: process.env.STRIPE_PRICE_PROFESSIONAL_MONTHLY,
        tier: 'professional',
    },
};

export function getStripePriceIdForPlan(planKey: BillingPlanKey): string | null {
    const priceId = BILLING_PLANS[planKey]?.stripePriceId?.trim();
    if (!priceId || priceId.includes('placeholder')) {
        return null;
    }
    return priceId;
}

export function resolveBillingPlan(planKey: string): BillingPlanDefinition | null {
    if (planKey !== 'strategic' && planKey !== 'professional') {
        return null;
    }

    const stripePriceId = getStripePriceIdForPlan(planKey);
    if (!stripePriceId) {
        return null;
    }

    return {
        ...BILLING_PLANS[planKey],
        stripePriceId,
    };
}

export function getTierFromPriceId(priceId: string): BillingTier {
    if (priceId === process.env.STRIPE_PRICE_PRO_MONTHLY) return 'pro';
    if (priceId === process.env.STRIPE_PRICE_PROFESSIONAL_MONTHLY) return 'professional';
    if (priceId === process.env.STRIPE_PRICE_AGENCY_MONTHLY) return 'agency';
    if (priceId === process.env.STRIPE_PRICE_PRO_ONETIME) return 'pro';
    return 'free';
}
