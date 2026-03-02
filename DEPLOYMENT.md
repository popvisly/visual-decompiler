# Visual Decompiler - Production Deployment Checklist

## Pre-Deployment Verification

### 1. Environment Variables ✓ CRITICAL
Ensure all required environment variables are set in production:

**Required:**
- [ ] `NEXT_PUBLIC_SUPABASE_URL`
- [ ] `SUPABASE_SERVICE_ROLE_KEY`
- [ ] `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`
- [ ] `CLERK_SECRET_KEY`
- [ ] `ANTHROPIC_API_KEY` (Primary AI service)
- [ ] `STRIPE_SECRET_KEY`
- [ ] `STRIPE_WEBHOOK_SECRET`
- [ ] `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`
- [ ] `NEXT_PUBLIC_APP_URL` (Must be production URL, not localhost)
- [ ] `WORKER_SECRET_TOKEN` (Generate secure random token)

**Optional:**
- [ ] `OPENAI_API_KEY` (Fallback for vision tasks)

**Removed (No longer needed):**
- ~~`YOUTUBE_PO_TOKEN`~~ (Video analysis removed)
- ~~`YOUTUBE_VISITOR_DATA`~~ (Video analysis removed)
- ~~`YOUTUBE_PROXY`~~ (Video analysis removed)

### 2. Stripe Configuration ✓ CRITICAL
- [ ] Move price IDs from hardcoded to environment variables (see `/src/app/api/webhooks/stripe/route.ts:9-13`)
- [ ] Test webhook endpoint with Stripe CLI: `stripe listen --forward-to localhost:3000/api/webhooks/stripe`
- [ ] Verify webhook signature validation is working
- [ ] Test all three tiers: Free (Haiku), Pro ($49/mo), Agency ($199/mo)
- [ ] Test one-time $5 payment flow
- [ ] Configure production webhook endpoint in Stripe Dashboard
- [ ] Verify metadata is correctly passed to Supabase on successful checkout

### 3. Database (Supabase)
- [ ] Run all migrations in production: `npx supabase db push`
- [ ] Verify Row Level Security policies are enabled
- [ ] Test database connection from production environment
- [ ] Enable Supabase realtime if using live updates
- [ ] Configure database backups (recommended: daily)
- [ ] Set up database monitoring alerts

### 4. Authentication (Clerk)
- [ ] Switch from test keys to production keys
- [ ] Configure production redirect URLs in Clerk Dashboard
- [ ] Test sign-up flow end-to-end
- [ ] Test sign-in flow end-to-end
- [ ] Verify user creation syncs to Supabase `users` table
- [ ] Configure session timeout settings
- [ ] Set up webhooks for user lifecycle events (optional)

### 5. Security Hardening ✓ CRITICAL
- [x] Remove stack traces from production error boundaries (COMPLETED)
- [x] Add root error boundary (COMPLETED)
- [ ] Add CSP headers via middleware
- [ ] Implement rate limiting (recommended: `@upstash/ratelimit`)
- [ ] Add CORS configuration if needed for API routes
- [ ] Audit all API routes for proper authentication
- [ ] Test unauthorized access attempts
- [ ] Review and secure all Supabase RLS policies

### 6. Performance Optimization
- [ ] Replace all `<img>` tags with Next.js `<Image>` component (Priority: marketing pages)
- [ ] Enable image optimization in `next.config.ts`
- [ ] Test image loading performance on slow 3G
- [ ] Run Lighthouse audit and fix Critical/High issues
- [ ] Verify Core Web Vitals are in "Good" range
- [ ] Enable ISR for marketing pages (remove `force-dynamic`)
- [ ] Analyze bundle size: `npm run build -- --analyze`
- [ ] Consider lazy loading for non-critical components

### 7. SEO & Discoverability
- [x] Add `robots.txt` to `/public/` (COMPLETED)
- [ ] Generate sitemap.xml (install `next-sitemap` package)
- [ ] Add Open Graph images for all key pages
- [ ] Verify metadata on all routes
- [ ] Test social media previews (Twitter, LinkedIn, Facebook)
- [ ] Submit sitemap to Google Search Console
- [ ] Set up Google Search Console property
- [ ] Add JSON-LD structured data for ad reports

### 8. Monitoring & Observability ✓ CRITICAL
- [ ] Integrate error tracking (Sentry recommended)
  - Install: `npm install @sentry/nextjs`
  - Configure: `npx @sentry/wizard@latest -i nextjs`
  - Test error capture in development
- [ ] Set up analytics (Plausible/Posthog for GDPR compliance)
- [ ] Configure uptime monitoring (UptimeRobot, Checkly, etc.)
- [ ] Enable Vercel Analytics (or alternative)
- [ ] Set up alert notifications for:
  - Error rate spikes
  - API response time degradation
  - Worker job failures
  - Stripe webhook failures
- [ ] Create monitoring dashboard

### 9. Worker Job Processing
- [ ] Test worker endpoint: `/api/worker`
- [ ] Configure Vercel cron job (already in `vercel.json`)
- [ ] Verify job claiming logic prevents race conditions
- [ ] Test zombie job cleanup (10-min timeout)
- [ ] Monitor job queue depth in production
- [ ] Set up alerts for stuck jobs
- [ ] Test worker authentication with `WORKER_SECRET_TOKEN`

### 10. Content & Assets
- [ ] Optimize all images in `/public/` directory
- [ ] Remove unused assets
- [ ] Verify all external links work
- [ ] Test video player (if still in use - check removal status)
- [ ] Proofread all marketing copy
- [ ] Update footer with current year
- [ ] Add privacy policy page
- [ ] Add terms of service page

### 11. Testing
- [ ] Run full build: `npm run build`
- [ ] Test build locally: `npm start`
- [ ] Test all critical user flows:
  - [ ] Sign up → Upload ad → View analysis
  - [ ] Sign in → Access dashboard → Export CSV
  - [ ] Purchase Pro tier → Verify upgrade
  - [ ] Share report → Verify public access
- [ ] Test error scenarios:
  - [ ] Invalid image upload
  - [ ] Network timeout during analysis
  - [ ] Stripe checkout cancellation
- [ ] Cross-browser testing (Chrome, Firefox, Safari, Edge)
- [ ] Mobile responsiveness testing (iOS Safari, Chrome Android)
- [ ] Test in private/incognito mode (no cached credentials)

### 12. Post-Deployment Verification
- [ ] Verify homepage loads correctly
- [ ] Test ad upload and analysis end-to-end
- [ ] Check dashboard loads for authenticated users
- [ ] Verify public reports are accessible
- [ ] Test billing flow with real credit card (use Stripe test mode first)
- [ ] Monitor error rates for first 24 hours
- [ ] Check worker cron job execution logs
- [ ] Verify Stripe webhooks are being received
- [ ] Test all marketing pages load correctly
- [ ] Verify social media sharing works

### 13. Documentation
- [ ] Update README.md with production deployment instructions
- [ ] Document environment variable requirements
- [ ] Create incident response runbook
- [ ] Document API endpoints (consider OpenAPI/Swagger)
- [ ] Add architecture diagram
- [ ] Document database schema
- [ ] Create user guide/FAQ
- [ ] Document common error codes and solutions

### 14. Compliance & Legal
- [ ] Add privacy policy
- [ ] Add terms of service
- [ ] Add cookie consent banner (if using tracking cookies)
- [ ] Verify GDPR compliance for EU users
- [ ] Add contact/support email
- [ ] Set up abuse reporting mechanism
- [ ] Review data retention policies

## Rollback Plan

If issues arise post-deployment:

1. **Immediate Actions:**
   - Revert to previous deployment via Vercel dashboard
   - Disable worker cron job if causing issues
   - Switch Stripe to test mode if billing issues

2. **Database Issues:**
   - Restore from latest backup
   - Roll back specific migrations if needed

3. **Communication:**
   - Post status update on status page
   - Email affected users if data loss occurred
   - Update social media if service disruption

## Post-Launch Monitoring (First 7 Days)

- [ ] Day 1: Monitor error rates every 2 hours
- [ ] Day 1-3: Check worker job completion rates
- [ ] Day 1-7: Review user feedback and support tickets
- [ ] Day 7: Performance review (response times, Core Web Vitals)
- [ ] Day 7: Cost review (Claude API usage, Stripe fees, Supabase usage)
- [ ] Day 30: First monthly retrospective

## Quick Reference Commands

```bash
# Build for production
npm run build

# Test production build locally
npm start

# Check TypeScript errors
npm run type-check

# Run Stripe webhook testing
stripe listen --forward-to localhost:3000/api/webhooks/stripe

# Database migrations
npx supabase db push

# Analyze bundle size
ANALYZE=true npm run build
```

## Emergency Contacts

- **Vercel Support:** support@vercel.com
- **Supabase Support:** support@supabase.io
- **Stripe Support:** https://support.stripe.com
- **Anthropic API Status:** https://status.anthropic.com
- **On-Call Engineer:** [Your contact]

---

**Last Updated:** March 2026
**Deployment Version:** Check `package.json` version number
