import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
    const response = NextResponse.next();

    // Only set viewer cookie on /app routes
    if (!request.cookies.has('vd_viewer_id')) {
        const viewerId = crypto.randomUUID();
        response.cookies.set('vd_viewer_id', viewerId, {
            httpOnly: true,
            sameSite: 'lax',
            secure: process.env.NODE_ENV === 'production',
            path: '/',
            maxAge: 60 * 60 * 24 * 365, // 1 year
        });
    }

    return response;
}

export const config = {
    matcher: '/app/:path*',
};
