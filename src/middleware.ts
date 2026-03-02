import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { ratelimit } from '@/lib/ratelimit';

export async function middleware(request: NextRequest) {
    // 1. Rate Limiting for API routes
    if (request.nextUrl.pathname.startsWith('/api')) {
        const ip = request.headers.get('x-forwarded-for')?.split(',')[0] ?? (request as any).ip ?? '127.0.0.1';
        const { success } = await ratelimit.limit(ip);

        if (!success) {
            return NextResponse.json(
                { error: 'Too many requests' },
                { status: 429 }
            );
        }
    }

    // 2. CSP Headers
    const nonce = Buffer.from(crypto.randomUUID()).toString('base64');
    const cspHeader = `
    default-src 'self';
    script-src 'self' 'nonce-${nonce}' 'strict-dynamic' https://*.clerk.accounts.dev https://clerk.visualdecompiler.com;
    style-src 'self' 'unsafe-inline';
    img-src 'self' blob: data: https://*.unsplash.com https://*.supabase.co https://*.stripe.com;
    font-src 'self' data:;
    object-src 'none';
    base-uri 'self';
    form-action 'self';
    frame-ancestors 'none';
    frame-src 'self' https://checkout.stripe.com https://*.clerk.accounts.dev;
    connect-src 'self' https://*.supabase.co https://*.clerk.accounts.dev https://clerk.visualdecompiler.com https://api.anthropic.com https://api.openai.com https://monitoring.paul-ikins.sentry.io;
    block-all-mixed-content;
    upgrade-insecure-requests;
  `.replace(/\s{2,}/g, ' ').trim();

    const requestHeaders = new Headers(request.headers);
    requestHeaders.set('x-nonce', nonce);
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
        /*
         * Match all request paths except for the ones starting with:
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         */
        {
            source: '/((?!_next/static|_next/image|favicon.ico).*)',
            missing: [
                { type: 'header', key: 'next-router-prefetch' },
                { type: 'header', key: 'purpose', value: 'prefetch' },
            ],
        },
    ],
};
