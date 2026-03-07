import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Helper to decode JWT in Edge Runtime without external libraries
function isTokenExpired(token: string) {
    try {
        const payloadBase64 = token.split('.')[1];
        // Decode base64url to base64
        const normalizedBase64 = payloadBase64.replace(/-/g, '+').replace(/_/g, '/');
        const decodedJson = atob(normalizedBase64);
        const payload = JSON.parse(decodedJson);
        const currentTimestamp = Math.floor(Date.now() / 1000);

        // Add a 5 minute buffer to prevent edge cases during request logic
        return payload.exp < (currentTimestamp + 300);
    } catch (e) {
        return true; 
    }
}

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
        
        // If no token, or token is expired
        if (!token || isTokenExpired(token)) {
            const response = NextResponse.redirect(new URL('/login', request.url));
            // Force the browser to delete the dead cookie
            response.cookies.delete('sb-access-token');
            return response;
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
    let finalCspHeader = cspHeader;
    
    // Phase 2 PLG: iFrame Embed system
    if (pathname.startsWith('/embed/')) {
        finalCspHeader = cspHeader.replace(
            "frame-ancestors 'none';", 
            "frame-ancestors https://*.notion.so https://*.figma.com https://*.pitch.com;"
        );
        // Ensure X-Frame-Options is not blocking
        requestHeaders.delete('X-Frame-Options');
    }

    requestHeaders.set('Content-Security-Policy', finalCspHeader);

    const response = NextResponse.next({
        request: {
            headers: requestHeaders,
        },
    });

    response.headers.set('Content-Security-Policy', finalCspHeader);
    if (pathname.startsWith('/embed/')) {
        response.headers.delete('X-Frame-Options');
    }


    response.headers.set('Content-Security-Policy', cspHeader);
    return response;
}

export const config = {
    matcher: [
        '/((?!_next/static|_next/image|favicon.ico|images/).*)',
    ],
};
