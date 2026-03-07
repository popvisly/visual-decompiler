import { NextResponse } from 'next/server';
import { getServerSession } from '@/lib/auth-server';
import { SovereigntyEngine } from '@/lib/sovereignty_engine';

export const dynamic = 'force-dynamic';

export async function GET() {
    try {
        const { userId } = await getServerSession();
        if (!userId) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const metrics = await SovereigntyEngine.getAgencyMetrics(userId);
        const briefing = await SovereigntyEngine.generateBriefing(metrics);
        const score = SovereigntyEngine.calculateSovereigntyScore(metrics);

        return NextResponse.json({
            metrics,
            briefing,
            score
        });
    } catch (error) {
        console.error('[API Briefing] Error:', error);
        return new NextResponse('Internal Server Error', { status: 500 });
    }
}
