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
        const triggerCounts: Record<string, { recent: number; baseline: number }> = {};
        const midPoint = new Date();
        midPoint.setDate(midPoint.getDate() - (days / 2));

        ads?.forEach((ad: any) => {
            const createdAt = new Date(ad.created_at);
            const dateStr = createdAt.toISOString().split('T')[0];
            const trigger = ad.digest?.classification?.trigger_mechanic;

            if (!trigger) return;

            // Chart data
            if (!timeSeries[dateStr]) timeSeries[dateStr] = {};
            timeSeries[dateStr][trigger] = (timeSeries[dateStr][trigger] || 0) + 1;

            // Surge calculation
            if (!triggerCounts[trigger]) triggerCounts[trigger] = { recent: 0, baseline: 0 };
            if (createdAt >= midPoint) {
                triggerCounts[trigger].recent++;
            } else {
                triggerCounts[trigger].baseline++;
            }
        });

        // Calculate leading surge
        let topSurge = { trigger: '', increase: 0 };
        Object.entries(triggerCounts).forEach(([trigger, counts]) => {
            // Only count if there's at least some volume in recent period
            if (counts.recent > 1) {
                const shift = counts.baseline === 0
                    ? counts.recent * 100 // Treat as 100% surge if it's new
                    : ((counts.recent - counts.baseline) / counts.baseline) * 100;

                if (shift > topSurge.increase) {
                    topSurge = { trigger, increase: Math.round(shift) };
                }
            }
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
            trends: chartData,
            surge: topSurge.trigger ? topSurge : null
        });

    } catch (err: any) {
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}
