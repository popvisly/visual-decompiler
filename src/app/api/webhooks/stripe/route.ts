import { NextResponse } from 'next/server';
import { getTierFromPriceId } from '@/lib/billing-plans';
import { stripe } from '@/lib/stripe';
import { getSupabaseAdmin } from '@/lib/supabase';
import Stripe from 'stripe';

const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;

export async function POST(req: Request) {
    const body = await req.text();
    const sig = req.headers.get('stripe-signature');

    let event: Stripe.Event;

    try {
        if (!sig || !endpointSecret) {
            throw new Error('Missing signature or webhook secret');
        }
        event = stripe.webhooks.constructEvent(body, sig, endpointSecret);
    } catch (err: any) {
        console.error(`[Stripe Webhook] Error:`, err.message);
        return NextResponse.json({ error: `Webhook Error: ${err.message}` }, { status: 400 });
    }

    const supabase = getSupabaseAdmin();

    // Handle the event
    try {
        switch (event.type) {
            case 'checkout.session.completed': {
                const session = event.data.object as Stripe.Checkout.Session;
                const userId = session.metadata?.supabaseId || session.metadata?.clerkId;
                const priceId = session.metadata?.priceId;
                const customerId = session.customer as string;
                const subscriptionId = session.subscription as string;

                if (!userId) {
                    console.warn('[Stripe Webhook] No userId in checkout session metadata');
                    break;
                }

                // Determine tier from price ID
                const tier = priceId ? getTierFromPriceId(priceId) : 'free';

                // Update user in database
                await supabase
                    .from('users')
                    .update({
                        stripe_customer_id: customerId,
                        stripe_subscription_id: subscriptionId || null,
                        tier: tier,
                        updated_at: new Date().toISOString(),
                    })
                    .eq('id', userId);

                console.log(`[Stripe Webhook] Checkout completed for ${userId}: ${tier} tier`);
                break;
            }

            case 'customer.subscription.updated': {
                const subscription = event.data.object as Stripe.Subscription;
                const customerId = subscription.customer as string;
                const status = subscription.status;
                const priceId = subscription.items.data[0]?.price.id;

                // Only update if subscription is active
                let tier: 'free' | 'pro' | 'professional' | 'agency' = 'free';
                if (status === 'active' || status === 'trialing') {
                    tier = priceId ? getTierFromPriceId(priceId) : 'pro';
                }

                await supabase
                    .from('users')
                    .update({
                        tier: tier,
                        updated_at: new Date().toISOString(),
                    })
                    .eq('stripe_customer_id', customerId);

                console.log(`[Stripe Webhook] Subscription updated for customer ${customerId}: ${tier} tier (${status})`);
                break;
            }

            case 'customer.subscription.deleted': {
                const subscription = event.data.object as Stripe.Subscription;
                const customerId = subscription.customer as string;

                // Downgrade to free tier
                await supabase
                    .from('users')
                    .update({
                        tier: 'free',
                        stripe_subscription_id: null,
                        updated_at: new Date().toISOString(),
                    })
                    .eq('stripe_customer_id', customerId);

                console.log(`[Stripe Webhook] Subscription deleted for customer ${customerId}: downgraded to free`);
                break;
            }

            default:
                console.log(`[Stripe Webhook] Unhandled event type ${event.type}`);
        }

        return NextResponse.json({ received: true });

    } catch (err: any) {
        console.error(`[Stripe Webhook] Processing Error:`, err.message);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
