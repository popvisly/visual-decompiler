import MechanicIntelligenceClient from "./pulse-client";
import { getServerSession } from "@/lib/auth-server";
import { getUsageStatusForUser } from "@/lib/usage";
import { getTierEntitlements } from "@/lib/plans";

export const dynamic = "force-dynamic";

export default async function MarketPulseDashboardPage() {
    const session = await getServerSession();

    if (!session.userId) {
        return <MechanicIntelligenceClient hasAccess={false} tierLabel="Observer" />;
    }

    const usage = await getUsageStatusForUser(session.userId, session.email);
    const entitlements = getTierEntitlements(usage.tier);

    return <MechanicIntelligenceClient hasAccess={entitlements.hasMarketPulse} tierLabel={entitlements.label} />;
}
