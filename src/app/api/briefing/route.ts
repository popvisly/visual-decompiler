import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { SovereigntyEngine } from '@/lib/sovereignty_engine';

export const dynamic = 'force-dynamic';

export async function GET() {
    try {
        const { userId } = await auth();
        if (!userId) {
            return new NextResponse('Unauthorized', { status: 401 });
        }

        const metrics = await SovereigntyEngine.getAgencyMetrics();
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
