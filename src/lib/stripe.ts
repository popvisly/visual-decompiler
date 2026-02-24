import Stripe from 'stripe';

if (!process.env.STRIPE_SECRET_KEY) {
    if (process.env.NODE_ENV === 'production') {
        throw new Error('STRIPE_SECRET_KEY is missing');
    }
}

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || 'sk_test_placeholder', {
    apiVersion: '2026-01-28.clover' as any, // Using the version required by the installed SDK
    typescript: true,
});
