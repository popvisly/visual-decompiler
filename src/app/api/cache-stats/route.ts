import { NextRequest, NextResponse } from 'next/server';
import { getCacheStats } from '@/lib/analysis_cache';

/**
 * GET /api/cache-stats
 *
 * Returns cache statistics showing how much money you've saved
 * through cached analysis results.
 *
 * Example response:
 * {
 *   "total_entries": 150,
 *   "total_hits": 450,
 *   "estimated_savings": 67.50,
 *   "cache_hit_rate": "75%"
 * }
 */
export async function GET(request: NextRequest) {
    try {
        const stats = await getCacheStats();

        const total_requests = stats.total_entries + stats.total_hits;
        const cache_hit_rate = total_requests > 0
            ? Math.round((stats.total_hits / total_requests) * 100)
            : 0;

        return NextResponse.json({
            success: true,
            data: {
                total_entries: stats.total_entries,
                total_hits: stats.total_hits,
                estimated_savings_usd: stats.estimated_savings.toFixed(2),
                cache_hit_rate: `${cache_hit_rate}%`,
                message: stats.estimated_savings > 0
                    ? `You've saved $${stats.estimated_savings.toFixed(2)} through caching! 🎉`
                    : 'Start analyzing ads to see savings accumulate.'
            }
        });
    } catch (error) {
        console.error('[Cache Stats API] Error:', error);
        return NextResponse.json(
            {
                success: false,
                error: 'Failed to retrieve cache statistics'
            },
            { status: 500 }
        );
    }
}
