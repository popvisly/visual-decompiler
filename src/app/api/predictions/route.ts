import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { PredictionService } from '@/lib/prediction_service';

export const dynamic = 'force-dynamic';

export async function GET() {
    try {
        const { userId, orgId } = await auth();
        if (!userId || !orgId) {
            return new NextResponse('Unauthorized', { status: 401 });
        }

        const data = await PredictionService.predictTrends(orgId);
        return NextResponse.json(data);
    } catch (error) {
        console.error('[Predictions API Error]', error);
        return new NextResponse('Internal Error', { status: 500 });
    }
}
