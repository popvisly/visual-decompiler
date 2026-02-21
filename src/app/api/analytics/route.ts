import { NextResponse } from 'next/server';
import { getAnalyticsData } from '@/lib/analytics';

export async function GET(req: Request) {
    const { searchParams } = new URL(req.url);
    const brandParam = searchParams.get('brand');

    try {
        const data = await getAnalyticsData(brandParam || '');
        return NextResponse.json(data);
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
