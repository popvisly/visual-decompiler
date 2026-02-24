import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { stripe } from '@/lib/stripe';
import { getSupabaseAdmin } from '@/lib/supabase';

export async function POST(req: Request) {
    try {
        const { userId } = await auth();

        if (!userId) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        // 1. Fetch the Stripe Customer ID from Supabase
        const supabase = getSupabaseAdmin();
        const { data: user, error: userError } = await supabase
            .from('users')
            .select('stripe_customer_id')
            .eq('id', userId)
            .single();

        if (userError || !user?.stripe_customer_id) {
            return NextResponse.json({ error: 'Stripe customer not found' }, { status: 404 });
        }

        // 2. Create a Stripe Billing Portal session
        const portalSession = await stripe.billingPortal.sessions.create({
            customer: user.stripe_customer_id,
            return_url: `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/dashboard/settings`,
        });

        return NextResponse.json({ url: portalSession.url });

    } catch (err: any) {
        console.error('[Billing Portal] Error:', err);
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}
