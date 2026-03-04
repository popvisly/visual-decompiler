---
name: vercel-deployment
description: How to deploy both Popvisly projects to Vercel, pre-deploy checklist, and how to debug build failures.
---

# Vercel Deployment

## Two Projects, Two Strategies

| Project | Status | Deploy trigger |
|---------|--------|---------------|
| **Visual Decompiler** | Live at visualdecompiler.com | Push to `main` branch → auto-deploy |
| **VAL v2** | Dev offline — NOT live yet | Manual deploy when ready |

## Visual Decompiler — Pre-Deploy Checklist

Run these before every push to main:

```bash
# 1. Type check — zero errors required
npx tsc --noEmit

# 2. Build locally to catch pre-render errors
npm run build

# 3. Check for obvious runtime issues
npm run dev
```

**Common build failures:**

- Missing env vars (`SUPABASE_SERVICE_ROLE_KEY`, `ANTHROPIC_API_KEY`, `STRIPE_SECRET_KEY`)
- MDX frontmatter schema errors in `content/briefings/` — check `publishedAt` is a valid date string
- Dynamic route segments that need `generateStaticParams` or `force-dynamic`
- `"use client"` components importing server-only modules

**Env vars required on Vercel** (set in Project → Settings → Environment Variables):

```
NEXT_PUBLIC_SUPABASE_URL
NEXT_PUBLIC_SUPABASE_ANON_KEY
SUPABASE_SERVICE_ROLE_KEY
ANTHROPIC_API_KEY
STRIPE_SECRET_KEY
STRIPE_WEBHOOK_SECRET
NEXT_PUBLIC_SENTRY_DSN
RESEND_API_KEY (or equivalent for mail.ts)
```

## VAL v2 — Deploying When Ready

The project is built offline. V1 stays live until V2 is production-ready.

**Before first deploy:**

```bash
cd "/Volumes/850EVO/VILLAINS AT LARGE/val-v2"
npm run build   # must complete with 0 errors
```

**To deploy:**

- Connect the `val-v2` repo to a new Vercel project
- Or push to a branch and set Vercel to deploy from that branch

**Env vars needed for VAL v2:**

- None currently (Google Apps Script URL is hardcoded in `vault/page.tsx` — consider moving to env var before production)

## Debugging Vercel Build Failures

1. **Check the build log** — Vercel shows the exact line that failed
2. **Reproduce locally:** `npm run build` — Vercel and local builds use the same Next.js config
3. **Check `next.config.ts`** — image domains, redirects, and rewrites can cause issues
4. **Pre-render errors** — usually MDX or dynamic data fetched at build time: add `export const dynamic = 'force-dynamic'` to the route
5. **Missing env vars** — the Supabase client returns a mock during build, but other clients (Anthropic, Stripe) will throw

## Rollback

If a deploy breaks production:

1. Go to Vercel → Deployments
2. Find the last working deployment
3. Click **"Promote to Production"**

## Branch Strategy

- `main` → production (visualdecompiler.com)  
- Feature branches → Vercel preview deployments (auto-generated URL)  
- Never push broken code directly to `main` — use PRs or at minimum `npm run build` locally first
