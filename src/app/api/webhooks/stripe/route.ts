import { NextResponse } from 'next/server';
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
                const clerkId = session.metadata?.clerkId;
                const customerId = session.customer as string;
                const subscriptionId = session.subscription as string;

                if (clerkId) {
                    await supabase
                        .from('users')
                        .update({
                            stripe_customer_id: customerId,
                            stripe_subscription_id: subscriptionId,
                            tier: 'pro' // Placeholder for Agency/Pro tier
                        })
                        .eq('id', clerkId);
                }
                break;
            }
            case 'customer.subscription.updated':
            case 'customer.subscription.deleted': {
                const subscription = event.data.object as Stripe.Subscription;
                const customerId = subscription.customer as string;
                const status = subscription.status;

                let tier = 'free';
                if (status === 'active' || status === 'trialing') {
                    tier = 'pro';
                }

                await supabase
                    .from('users')
                    .update({ tier })
                    .eq('stripe_customer_id', customerId);
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
