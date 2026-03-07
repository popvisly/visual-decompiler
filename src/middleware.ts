import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;

    // Phase 2: Protect any route in the Agency OS (dashboard)
    const isDashboardRoute =
        pathname.startsWith('/vault') ||
        pathname.startsWith('/boards') ||
        pathname.startsWith('/ingest') ||
        pathname.startsWith('/compare') ||
        pathname.match(/^\/asset(\/.*)?$/);

    if (isDashboardRoute) {
        // Our custom cookie set during login
        const token = request.cookies.get('sb-access-token')?.value;
        if (!token) {
            return NextResponse.redirect(new URL('/login', request.url));
        }
    }

    // Preserve the CSP headers from the system
    const cspHeader = `
    default-src 'self';
    script-src 'self' 'unsafe-inline' 'unsafe-eval' https://*.posthog.com;
    style-src 'self' 'unsafe-inline';
    img-src 'self' blob: data: https://*.unsplash.com https://*.supabase.co https://*.stripe.com https://*.posthog.com;
    font-src 'self' data:;
    object-src 'none';
    base-uri 'self';
    form-action 'self';
    frame-ancestors 'none';
    frame-src 'self' https://checkout.stripe.com;
    connect-src 'self' https://*.supabase.co https://api.anthropic.com https://api.openai.com https://*.sentry.io https://*.posthog.com;
    worker-src 'self' blob:;
    block-all-mixed-content;
    upgrade-insecure-requests;
  `.replace(/\s{2,}/g, ' ').trim();

    const requestHeaders = new Headers(request.headers);
    requestHeaders.set('Content-Security-Policy', cspHeader);

    const response = NextResponse.next({
        request: {
            headers: requestHeaders,
        },
    });

    response.headers.set('Content-Security-Policy', cspHeader);
    return response;
}

export const config = {
    matcher: [
        '/((?!_next/static|_next/image|favicon.ico|images/).*)',
    ],
};
