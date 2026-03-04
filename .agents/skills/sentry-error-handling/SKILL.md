---
name: sentry-error-handling
description: How Sentry is configured and used in the Visual Decompiler. Use this when debugging errors, adding error boundaries, or instrumenting new routes.
---

# Sentry Error Handling — Visual Decompiler

## Configuration Files

| File | Scope |
|------|-------|
| `sentry.client.config.ts` | Browser (React) |
| `sentry.server.config.ts` | Node.js server (API routes, SSR) |
| `sentry.edge.config.ts` | Edge runtime (middleware) |

All three use:

```ts
Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  tracesSampleRate: 1.0,
  debug: false,
});
```

## Error Boundaries

For client components that can fail at render:

```tsx
// src/app/error.tsx — catches route-level errors
// src/app/global-error.tsx — catches root layout errors (both exist)

// Manual boundary for a component:
import * as Sentry from '@sentry/nextjs';

<Sentry.ErrorBoundary fallback={<ErrorFallback />}>
  <RiskyComponent />
</Sentry.ErrorBoundary>
```

## Capturing Errors in API Routes

```ts
import * as Sentry from '@sentry/nextjs';

try {
  // risky operation
} catch (err) {
  Sentry.captureException(err, {
    extra: { adId, userId, context: 'worker-pipeline' }
  });
  return NextResponse.json({ error: 'Processing failed' }, { status: 500 });
}
```

## Adding Context / Tags

```ts
Sentry.setTag('ad_id', adId);
Sentry.setUser({ id: userId });
Sentry.addBreadcrumb({
  category: 'pipeline',
  message: 'Starting neural deconstruction',
  level: 'info',
});
```

## Instrumentation

The file `src/instrumentation.ts` runs at server startup. Use it to register Sentry on the Node.js runtime:

```ts
export async function register() {
  if (process.env.NEXT_RUNTIME === 'nodejs') {
    await import('./sentry.server.config');
  }
  if (process.env.NEXT_RUNTIME === 'edge') {
    await import('./sentry.edge.config');
  }
}
```

## Debugging Tips

- Sentry dashboard: search by `adId` tag to trace a specific ad through the pipeline
- `tracesSampleRate: 1.0` means 100% of transactions are traced — reduce in high-traffic prod if needed
- `debug: false` — set to `true` locally to see Sentry logs in terminal
- Errors in the Supabase mock client (during build) are expected — don't send to Sentry

## Environment Variable

`NEXT_PUBLIC_SENTRY_DSN` — public (visible in browser bundle). Must be set in Vercel env and `.env.local`.
