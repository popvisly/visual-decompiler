# Stripe Setup Guide - Visual Decompiler

## 🎯 Quick Setup Checklist

- [ ] Create Stripe products and prices
- [ ] Update pricing page with Price IDs
- [ ] Create/update checkout API endpoint
- [ ] Add webhook handler for subscriptions
- [ ] Test the full flow

## Step 1: Create Stripe Products

Go to [Stripe Dashboard → Products](https://dashboard.stripe.com/products) and create these products:

### Product 1: Strategic Unit (Pro Tier)
- **Name**: Visual Decompiler - Strategic Unit
- **Description**: Professional-grade ad deconstruction with Sonnet 4.5 AI
- **Pricing**: $49/month (recurring)
- **Metadata** (important for tier mapping):
  - `tier`: `pro`
  - `analysis_limit`: `100`
  - `model`: `claude-sonnet-4-5-20250929`

Copy the **Price ID** (starts with `price_`) → Update line 31 in [pricing/page.tsx](src/app/pricing/page.tsx)

### Product 2: Agency Sovereignty
- **Name**: Visual Decompiler - Agency Sovereignty
- **Description**: Unlimited white-label ad intelligence with Opus 4.6 AI
- **Pricing**: $199/month (recurring)
- **Metadata**:
  - `tier`: `agency`
  - `analysis_limit`: `unlimited`
  - `model`: `claude-opus-4-6`

Price ID already set: `price_1T4BU70LZZUO4xz4b4A57HNV` ✅

### Product 3: One-Time Analysis (Optional)
- **Name**: Visual Decompiler - One-Time Analysis
- **Description**: Single professional ad analysis (Sonnet 4.5)
- **Pricing**: $5 (one-time payment)
- **Metadata**:
  - `tier`: `pro`
  - `analysis_limit`: `1`
  - `one_time`: `true`

Copy the **Price ID** → Update line 164 in [pricing/page.tsx](src/app/pricing/page.tsx)

---

## Step 2: Update Pricing Page

Open [src/app/pricing/page.tsx](src/app/pricing/page.tsx):

```typescript
// Line 31 - Replace with your Pro tier Price ID
id: 'price_YOUR_PRO_PRICE_ID',

// Line 54 - Already set (if this is correct)
id: 'price_1T4BU70LZZUO4xz4b4A57HNV',

// Line 164 - Replace with your one-time Price ID
onClick={() => handleUpgrade('price_YOUR_ONETIME_PRICE_ID')}
```

---

## Step 3: Verify/Create Checkout API

Check if [src/app/api/billing/checkout/route.ts](src/app/api/billing/checkout/route.ts) exists.

If not, create it:

```typescript
// src/app/api/billing/checkout/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: '2024-11-20.acacia',
});

export async function POST(request: NextRequest) {
    try {
        const { userId } = auth();
        if (!userId) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const { planId } = await request.json();

        if (!planId || planId === 'free') {
            return NextResponse.json({ error: 'Invalid plan' }, { status: 400 });
        }

        // Create Stripe Checkout Session
        const session = await stripe.checkout.sessions.create({
            mode: planId.includes('ONETIME') ? 'payment' : 'subscription',
            payment_method_types: ['card'],
            line_items: [
                {
                    price: planId,
                    quantity: 1,
                },
            ],
            success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/dashboard?session_id={CHECKOUT_SESSION_ID}&upgrade=success`,
            cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/pricing?canceled=true`,
            client_reference_id: userId,
            metadata: {
                userId,
            },
        });

        return NextResponse.json({ url: session.url });
    } catch (error: any) {
        console.error('[Checkout] Error:', error);
        return NextResponse.json(
            { error: error.message || 'Checkout failed' },
            { status: 500 }
        );
    }
}
```

---

## Step 4: Create Webhook Handler

Create [src/app/api/webhooks/stripe/route.ts](src/app/api/webhooks/stripe/route.ts):

```typescript
// src/app/api/webhooks/stripe/route.ts
import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { supabaseAdmin } from '@/lib/supabase';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: '2024-11-20.acacia',
});

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;

export async function POST(request: NextRequest) {
    const body = await request.text();
    const sig = request.headers.get('stripe-signature')!;

    let event: Stripe.Event;

    try {
        event = stripe.webhooks.constructEvent(body, sig, webhookSecret);
    } catch (err: any) {
        console.error('Webhook signature verification failed:', err.message);
        return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
    }

    // Handle the event
    switch (event.type) {
        case 'checkout.session.completed': {
            const session = event.data.object as Stripe.Checkout.Session;
            const userId = session.client_reference_id || session.metadata?.userId;

            if (!userId) {
                console.error('No userId found in session');
                break;
            }

            // Get subscription details
            const subscriptionId = session.subscription as string;
            const subscription = await stripe.subscriptions.retrieve(subscriptionId);
            const priceId = subscription.items.data[0].price.id;

            // Map price ID to tier
            let tier: 'free' | 'pro' | 'agency' = 'free';
            if (priceId.includes('PRO')) tier = 'pro';
            else if (priceId === 'price_1T4BU70LZZUO4xz4b4A57HNV') tier = 'agency';

            // Store in database
            await supabaseAdmin.from('user_subscriptions').upsert({
                user_id: userId,
                stripe_customer_id: session.customer,
                stripe_subscription_id: subscriptionId,
                stripe_price_id: priceId,
                tier: tier,
                status: subscription.status,
                current_period_start: new Date(subscription.current_period_start * 1000).toISOString(),
                current_period_end: new Date(subscription.current_period_end * 1000).toISOString(),
                updated_at: new Date().toISOString(),
            });

            console.log(`[Webhook] Subscription created for user ${userId}: ${tier}`);
            break;
        }

        case 'customer.subscription.updated':
        case 'customer.subscription.deleted': {
            const subscription = event.data.object as Stripe.Subscription;
            const userId = subscription.metadata.userId;

            if (!userId) break;

            await supabaseAdmin
                .from('user_subscriptions')
                .update({
                    status: subscription.status,
                    updated_at: new Date().toISOString(),
                })
                .eq('stripe_subscription_id', subscription.id);

            console.log(`[Webhook] Subscription ${subscription.status} for user ${userId}`);
            break;
        }

        default:
            console.log(`Unhandled event type: ${event.type}`);
    }

    return NextResponse.json({ received: true });
}
```

---

## Step 5: Create Database Table for Subscriptions

Run this in Supabase SQL editor:

```sql
-- User Subscriptions Table
CREATE TABLE IF NOT EXISTS user_subscriptions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id TEXT NOT NULL UNIQUE,
    stripe_customer_id TEXT,
    stripe_subscription_id TEXT,
    stripe_price_id TEXT,
    tier TEXT DEFAULT 'free' CHECK (tier IN ('free', 'pro', 'agency')),
    status TEXT DEFAULT 'active',
    analysis_count_this_month INTEGER DEFAULT 0,
    current_period_start TIMESTAMP WITH TIME ZONE,
    current_period_end TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Index for fast user lookups
CREATE INDEX IF NOT EXISTS idx_user_subscriptions_user_id
ON user_subscriptions(user_id);

-- Index for Stripe customer lookups
CREATE INDEX IF NOT EXISTS idx_user_subscriptions_customer_id
ON user_subscriptions(stripe_customer_id);

-- Enable RLS
ALTER TABLE user_subscriptions ENABLE ROW LEVEL SECURITY;

-- Policy: Users can read their own subscription
CREATE POLICY user_subscriptions_select_policy ON user_subscriptions
    FOR SELECT
    USING (user_id = auth.uid()::text);

-- Policy: Service role can do everything
CREATE POLICY user_subscriptions_service_role_policy ON user_subscriptions
    FOR ALL
    USING (true);
```

---

## Step 6: Add Helper Function to Get User Tier

Create [src/lib/user_tier.ts](src/lib/user_tier.ts):

```typescript
import { auth } from '@clerk/nextjs';
import { supabaseAdmin } from './supabase';

export async function getUserTier(): Promise<'free' | 'pro' | 'agency'> {
    const { userId } = auth();

    if (!userId) return 'free';

    try {
        const { data, error } = await supabaseAdmin
            .from('user_subscriptions')
            .select('tier, status')
            .eq('user_id', userId)
            .single();

        if (error || !data || data.status !== 'active') {
            return 'free';
        }

        return data.tier as 'free' | 'pro' | 'agency';
    } catch (err) {
        console.error('[getUserTier] Error:', err);
        return 'free';
    }
}

export async function checkAnalysisLimit(userId: string, tier: 'free' | 'pro' | 'agency'): Promise<boolean> {
    if (tier === 'agency') return true; // Unlimited

    const limits = {
        free: 5,
        pro: 100,
        agency: Infinity,
    };

    const limit = limits[tier];

    // Get usage this month
    const { data, error } = await supabaseAdmin
        .from('user_subscriptions')
        .select('analysis_count_this_month')
        .eq('user_id', userId)
        .single();

    if (error || !data) return false;

    return data.analysis_count_this_month < limit;
}

export async function incrementAnalysisCount(userId: string): Promise<void> {
    await supabaseAdmin.rpc('increment_analysis_count', { user_id_param: userId });
}
```

---

## Step 7: Environment Variables

Add to `.env.local`:

```bash
# Stripe
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...
NEXT_PUBLIC_BASE_URL=http://localhost:3000

# Or for production:
# STRIPE_SECRET_KEY=sk_live_...
# NEXT_PUBLIC_BASE_URL=https://visualdecompiler.com
```

---

## Step 8: Configure Stripe Webhook

1. Go to [Stripe Dashboard → Webhooks](https://dashboard.stripe.com/webhooks)
2. Click "Add endpoint"
3. **Endpoint URL**: `https://yourdomain.com/api/webhooks/stripe` (or ngrok for local testing)
4. **Events to listen to**:
   - `checkout.session.completed`
   - `customer.subscription.updated`
   - `customer.subscription.deleted`
5. Copy the **Signing secret** → Add to `.env.local` as `STRIPE_WEBHOOK_SECRET`

---

## Step 9: Test the Flow

### Local Testing with Stripe CLI:

```bash
# Install Stripe CLI
brew install stripe/stripe-cli/stripe

# Login
stripe login

# Forward webhooks to local
stripe listen --forward-to localhost:3000/api/webhooks/stripe

# Test checkout
stripe trigger checkout.session.completed
```

### Manual Testing:

1. Go to `http://localhost:3000/pricing`
2. Click "Upgrade to Pro"
3. Use test card: `4242 4242 4242 4242`
4. Complete checkout
5. Verify:
   - Webhook received in logs
   - Database updated with subscription
   - Dashboard shows Pro tier

---

## 🎯 Integration with Analysis System

Update your analysis route to use tiers:

```typescript
// src/app/api/analyze/route.ts
import { getUserTier, checkAnalysisLimit, incrementAnalysisCount } from '@/lib/user_tier';
import { decompileAd } from '@/lib/vision';

export async function POST(request: Request) {
    const { userId } = auth();
    if (!userId) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Get user's tier
    const tier = await getUserTier();

    // Check limit
    const canAnalyze = await checkAnalysisLimit(userId, tier);
    if (!canAnalyze) {
        return NextResponse.json(
            {
                error: 'Analysis limit reached',
                message: tier === 'free'
                    ? 'Upgrade to Pro for 100 analyses/month'
                    : 'You\'ve reached your monthly limit'
            },
            { status: 403 }
        );
    }

    // Run analysis with appropriate tier model
    const result = await decompileAd(inputs, 'V4', tier);

    // Increment usage counter
    await incrementAnalysisCount(userId);

    return NextResponse.json(result);
}
```

---

## ✅ You're Done!

Your pricing page is now live with:
- Free tier (5/month with Haiku)
- Pro tier ($49/mo - 100/month with Sonnet)
- Agency tier ($199/mo - Unlimited with Opus)
- One-time ($5 per analysis)

**Next steps:**
1. Replace placeholder Price IDs
2. Test checkout flow
3. Monitor in Stripe Dashboard
4. Start making money! 💰
