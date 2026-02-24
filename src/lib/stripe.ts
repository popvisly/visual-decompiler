import Stripe from 'stripe';

const secretKey = process.env.STRIPE_SECRET_KEY;

if (!secretKey && process.env.NODE_ENV === 'production') {
    console.warn('⚠️ STRIPE_SECRET_KEY is missing. Billing features will be disabled at runtime.');
}

export const stripe = new Stripe(secretKey || '', {
    apiVersion: '2023-10-16' as any, // Use a stable API version
    typescript: true,
});
