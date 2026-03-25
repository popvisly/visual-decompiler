export type AppTier = 'free' | 'pro' | 'professional' | 'agency';

export type TierEntitlements = {
    key: AppTier;
    label: string;
    monthlyAnalysisLimit: number;
    seatLimit: number;
    hasPremiumAnalysis: boolean;
    hasSharedVault: boolean;
    hasSharedBoards: boolean;
    hasTeamManagement: boolean;
    hasPrioritySupport: boolean;
    hasAgencyBranding: boolean;
    hasUsageReporting: boolean;
    hasDedicatedOnboarding: boolean;
    hasMarketPulse: boolean;
};

const TIER_ENTITLEMENTS: Record<AppTier, TierEntitlements> = {
    free: {
        key: 'free',
        label: 'Observer',
        monthlyAnalysisLimit: 5,
        seatLimit: 1,
        hasPremiumAnalysis: false,
        hasSharedVault: false,
        hasSharedBoards: false,
        hasTeamManagement: false,
        hasPrioritySupport: false,
        hasAgencyBranding: false,
        hasUsageReporting: false,
        hasDedicatedOnboarding: false,
        hasMarketPulse: false,
    },
    pro: {
        key: 'pro',
        label: 'Strategic Unit',
        monthlyAnalysisLimit: 100,
        seatLimit: 1,
        hasPremiumAnalysis: true,
        hasSharedVault: false,
        hasSharedBoards: false,
        hasTeamManagement: false,
        hasPrioritySupport: false,
        hasAgencyBranding: false,
        hasUsageReporting: false,
        hasDedicatedOnboarding: false,
        hasMarketPulse: false,
    },
    professional: {
        key: 'professional',
        label: 'Professional',
        monthlyAnalysisLimit: 250,
        seatLimit: 5,
        hasPremiumAnalysis: true,
        hasSharedVault: true,
        hasSharedBoards: true,
        hasTeamManagement: true,
        hasPrioritySupport: true,
        hasAgencyBranding: false,
        hasUsageReporting: false,
        hasDedicatedOnboarding: false,
        hasMarketPulse: false,
    },
    agency: {
        key: 'agency',
        label: 'Agency Sovereignty',
        monthlyAnalysisLimit: 500,
        seatLimit: 10,
        hasPremiumAnalysis: true,
        hasSharedVault: true,
        hasSharedBoards: true,
        hasTeamManagement: true,
        hasPrioritySupport: true,
        hasAgencyBranding: true,
        hasUsageReporting: true,
        hasDedicatedOnboarding: true,
        hasMarketPulse: true,
    },
};

export function normalizeAppTier(rawTier?: string | null): AppTier {
    const tier = (rawTier || '').toLowerCase().trim();

    if (tier === 'agency' || tier === 'agency sovereignty' || tier === 'enterprise') {
        return 'agency';
    }

    if (tier === 'professional') {
        return 'professional';
    }

    if (tier === 'pro' || tier === 'strategic unit' || tier === 'strategic') {
        return 'pro';
    }

    return 'free';
}

export function getTierEntitlements(rawTier?: string | null): TierEntitlements {
    return TIER_ENTITLEMENTS[normalizeAppTier(rawTier)];
}

export function getTierLabel(rawTier?: string | null): string {
    return getTierEntitlements(rawTier).label;
}

