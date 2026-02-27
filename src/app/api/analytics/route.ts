import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { getAnalyticsData } from '@/lib/analytics';

export const dynamic = 'force-dynamic';

export async function GET(req: Request) {
    try {
        const { userId, orgId } = await auth();

        if (!userId) {
            return new NextResponse('Unauthorized', { status: 401 });
        }

        const { searchParams } = new URL(req.url);
        const brand = searchParams.get('brand') || undefined;

        const data = await getAnalyticsData(userId, orgId, brand);
        return NextResponse.json(data);
    } catch (error) {
        console.error('Error fetching analytics data:', error);
        return new NextResponse('Internal Server Error', { status: 500 });
    }
}
