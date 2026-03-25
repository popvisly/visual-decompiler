import { supabaseAdmin } from '@/lib/supabase';
import { getTierEntitlements, normalizeAppTier, type AppTier } from '@/lib/plans';

export type UsageTier = AppTier;

export type UsageStatus = {
    tier: UsageTier;
    usageCount: number;
    limit: number;
    remaining: number;
    percentUsed: number;
    billingCycleReset: string | null;
    reachedLimit: boolean;
};

const BILLING_CYCLE_DAYS = 30;

export function normalizeUsageTier(rawTier?: string | null): UsageTier {
    return normalizeAppTier(rawTier);
}

function addDays(date: Date, days: number) {
    const next = new Date(date);
    next.setUTCDate(next.getUTCDate() + days);
    return next;
}

function buildUsageStatus(user: { tier?: string | null; usage_count?: number | null; billing_cycle_reset?: string | null }): UsageStatus {
    const tier = normalizeUsageTier(user.tier);
    const usageCount = Math.max(0, user.usage_count || 0);
    const limit = getTierEntitlements(tier).monthlyAnalysisLimit;
    const remaining = Math.max(0, limit - usageCount);
    const percentUsed = limit > 0 ? Math.min(100, Math.round((usageCount / limit) * 100)) : 0;

    return {
        tier,
        usageCount,
        limit,
        remaining,
        percentUsed,
        billingCycleReset: user.billing_cycle_reset || null,
        reachedLimit: usageCount >= limit,
    };
}

export async function getUsageStatusForUser(userId: string, email?: string | null): Promise<UsageStatus> {
    const { data: user, error } = await supabaseAdmin
        .from('users')
        .upsert(
            {
                id: userId,
                ...(email ? { email } : {}),
            },
            { onConflict: 'id' }
        )
        .select('id, tier, usage_count, billing_cycle_reset')
        .single();

    if (error || !user) {
        throw error || new Error('Failed to load usage status');
    }

    const resetAt = user.billing_cycle_reset ? new Date(user.billing_cycle_reset) : null;
    const cycleExpired = !resetAt || addDays(resetAt, BILLING_CYCLE_DAYS) <= new Date();

    if (cycleExpired) {
        const refreshedReset = new Date().toISOString();
        const { data: resetUser, error: resetError } = await supabaseAdmin
            .from('users')
            .update({
                usage_count: 0,
                billing_cycle_reset: refreshedReset,
                ...(email ? { email } : {}),
            })
            .eq('id', userId)
            .select('tier, usage_count, billing_cycle_reset')
            .single();

        if (resetError || !resetUser) {
            throw resetError || new Error('Failed to reset usage cycle');
        }

        return buildUsageStatus(resetUser);
    }

    return buildUsageStatus(user);
}

export async function recordUsageEvent(userId: string, metadata: Record<string, unknown> = {}) {
    return supabaseAdmin.from('usage_log').insert({
        user_id: userId,
        event_type: 'analysis_completed',
        metadata,
    });
}

export async function assertUsageAvailable(userId: string, email?: string | null) {
    const usage = await getUsageStatusForUser(userId, email);

    if (usage.reachedLimit) {
        const error = new Error('LIMIT_REACHED');
        (error as Error & { usage?: UsageStatus }).usage = usage;
        throw error;
    }

    return usage;
}
