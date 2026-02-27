import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';

const isProtectedRoute = createRouteMatcher([
    '/app(.*)',
    '/dashboard(.*)',
    '/api/ingest(.*)',
]);

export default clerkMiddleware(async (auth, req) => {
    if (isProtectedRoute(req)) {
        const { userId } = await auth();
        if (!userId) {
            // Redirect unauthenticated users back to the homepage instead of a non-existent /sign-in page
            // This prevents Next.js <Link> prefetching from choking on a 404 HTML response.
            const homeUrl = new URL('/', req.url);
            homeUrl.searchParams.set('sign_in', 'true');
            return NextResponse.redirect(homeUrl);
        }
    }

    const response = NextResponse.next();

    // Preserve the custom viewer tracker ID behavior
    if (!req.cookies.has('vd_viewer_id')) {
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
});

export const config = {
    matcher: [
        // Skip Next.js internals and all static files, unless found in search params
        '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
        // Always run for API routes
        '/(api|trpc)(.*)',
    ],
};
