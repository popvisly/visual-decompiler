import { NextResponse } from 'next/server';
import { getServerSession } from '@/lib/auth-server';
import { resolveBillingPlan } from '@/lib/billing-plans';
import { stripe } from '@/lib/stripe';
import { getSupabaseAdmin } from '@/lib/supabase';

export async function POST(req: Request) {
    try {
        const { userId, email } = await getServerSession();

        if (!userId) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const { planKey } = await req.json();

        if (!planKey) {
            return NextResponse.json({ error: 'Plan key is required' }, { status: 400 });
        }

        const plan = resolveBillingPlan(planKey);
        if (!plan) {
            return NextResponse.json({ error: 'That billing plan is not configured yet.' }, { status: 400 });
        }

        // 1. Get or create internal user record
        const supabase = getSupabaseAdmin();
        const { data: dbUser, error: userError } = await supabase
            .from('users')
            .select('stripe_customer_id')
            .eq('id', userId)
            .single();

        if (userError && userError.code !== 'PGRST116') {
            throw userError;
        }

        let stripeCustomerId = dbUser?.stripe_customer_id;

        // 2. Create Stripe customer if they don't exist
        if (!stripeCustomerId) {
            const customer = await stripe.customers.create({
                email: email || '',
                metadata: {
                    supabaseId: userId,
                },
            });
            stripeCustomerId = customer.id;

            // Sync back to Supabase
            await supabase
                .from('users')
                .upsert({
                    id: userId,
                    email: email || '',
                    stripe_customer_id: stripeCustomerId,
                });
        }

        // 3. Determine if this is a subscription or one-time payment
        const isOneTime = plan.stripePriceId === process.env.STRIPE_PRICE_PRO_ONETIME;

        // 4. Create Checkout Session
        try {
            const sessionConfig: any = {
                customer: stripeCustomerId,
                line_items: [
                    {
                        price: plan.stripePriceId,
                        quantity: 1,
                    },
                ],
                mode: isOneTime ? 'payment' : 'subscription',
                success_url: `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/vault?billing=success`,
                cancel_url: `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/pricing?billing=cancel`,
                metadata: {
                    supabaseId: userId,
                    priceId: plan.stripePriceId,
                    planKey: plan.key,
                },
            };

            // Add subscription metadata only for recurring payments
            if (!isOneTime) {
                sessionConfig.subscription_data = {
                    metadata: {
                        supabaseId: userId,
                        priceId: plan.stripePriceId,
                        planKey: plan.key,
                    },
                };
            }

            const session = await stripe.checkout.sessions.create(sessionConfig);

            return NextResponse.json({ url: session.url });
        } catch (stripeErr: any) {
            console.error('[Billing Checkout] Stripe Session Error:', stripeErr);
            return NextResponse.json({ error: `Stripe Error: ${stripeErr.message}` }, { status: 400 });
        }

    } catch (err: any) {
        console.error('[Billing Checkout] Global Error:', err);
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}
