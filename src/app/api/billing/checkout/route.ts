import { NextResponse } from 'next/server';
import { auth, currentUser } from '@clerk/nextjs/server';
import { stripe } from '@/lib/stripe';
import { getSupabaseAdmin } from '@/lib/supabase';

export async function POST(req: Request) {
    try {
        const { userId } = await auth();
        const user = await currentUser();

        if (!userId || !user) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const { planId } = await req.json();

        if (!planId) {
            return NextResponse.json({ error: 'Plan ID is required' }, { status: 400 });
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
                email: user.emailAddresses[0].emailAddress,
                metadata: {
                    clerkId: userId,
                },
            });
            stripeCustomerId = customer.id;

            // Sync back to Supabase
            await supabase
                .from('users')
                .upsert({
                    id: userId,
                    email: user.emailAddresses[0].emailAddress,
                    stripe_customer_id: stripeCustomerId,
                });
        }

        // 3. Determine if this is a subscription or one-time payment
        const isOneTime = planId === 'price_1T64V10LZZUO4xz4jug67wyT'; // $5 one-time analysis

        // 4. Create Checkout Session
        try {
            const sessionConfig: any = {
                customer: stripeCustomerId,
                line_items: [
                    {
                        price: planId,
                        quantity: 1,
                    },
                ],
                mode: isOneTime ? 'payment' : 'subscription',
                success_url: `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/dashboard?billing=success`,
                cancel_url: `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/pricing?billing=cancel`,
                metadata: {
                    clerkId: userId,
                    priceId: planId,
                },
            };

            // Add subscription metadata only for recurring payments
            if (!isOneTime) {
                sessionConfig.subscription_data = {
                    metadata: {
                        clerkId: userId,
                        priceId: planId,
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
