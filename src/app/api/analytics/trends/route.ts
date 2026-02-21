import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';

export async function GET(req: Request) {
    const { searchParams } = new URL(req.url);
    const category = searchParams.get('category');
    const days = parseInt(searchParams.get('days') || '30');

    if (!category) {
        return NextResponse.json({ error: 'Category is required' }, { status: 400 });
    }

    try {
        const startDate = new Date();
        startDate.setDate(startDate.getDate() - days);

        // Fetch processed ads for the category in the time range
        const { data: ads, error } = await supabaseAdmin
            .from('ad_digests')
            .select('created_at, digest')
            .eq('status', 'processed')
            .filter('digest->meta->>product_category_guess', 'eq', category)
            .gte('created_at', startDate.toISOString());

        if (error) throw error;

        // Group by day and trigger
        const timeSeries: Record<string, Record<string, number>> = {};

        ads?.forEach((ad: any) => {
            const date = new Date(ad.created_at).toISOString().split('T')[0];
            const trigger = ad.digest?.classification?.trigger_mechanic;

            if (!trigger) return;

            if (!timeSeries[date]) timeSeries[date] = {};
            timeSeries[date][trigger] = (timeSeries[date][trigger] || 0) + 1;
        });

        // Format for charting
        const chartData = Object.entries(timeSeries).map(([date, counts]) => ({
            date,
            ...counts
        })).sort((a, b) => a.date.localeCompare(b.date));

        return NextResponse.json({
            category,
            days,
            sampleSize: ads?.length || 0,
            trends: chartData
        });

    } catch (err: any) {
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}
