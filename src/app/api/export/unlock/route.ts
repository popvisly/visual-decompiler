import { NextResponse } from 'next/server';

/**
 * GET /api/export/unlock?key=<EXPORT_TOKEN>
 *
 * Validates the token, sets an httpOnly cookie, then redirects to /api/export.
 * The token never appears in the export URL itself — only in this one-time unlock URL
 * which you share privately (e.g. bookmark it, don't put it in the UI).
 */
export async function GET(req: Request) {
    const exportToken = process.env.EXPORT_TOKEN;
    const { searchParams } = new URL(req.url);
    const key = searchParams.get('key');

    if (!exportToken || key !== exportToken) {
        return new Response('Unauthorized', { status: 401 });
    }

    const format = searchParams.get('format') || 'csv';

    const response = NextResponse.redirect(
        new URL(`/api/export?format=${format}`, req.url)
    );

    // httpOnly: not accessible to JS — won't appear in page source or browser history
    response.cookies.set('export_ok', '1', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 60 * 60 * 8, // 8 hours
        path: '/api/export',
    });

    return response;
}
