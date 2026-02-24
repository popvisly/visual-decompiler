-- Add Stripe-specific fields to the users table
ALTER TABLE users 
ADD COLUMN IF NOT EXISTS stripe_customer_id TEXT UNIQUE,
ADD COLUMN IF NOT EXISTS stripe_subscription_id TEXT UNIQUE;

-- Create an index for faster lookups by Stripe Customer ID (important for webhooks)
CREATE INDEX IF NOT EXISTS idx_users_stripe_customer_id ON users(stripe_customer_id);

-- Explicitly ensure tier defaults to 'free' if not already set (re-applying for safety)
ALTER TABLE users ALTER COLUMN tier SET DEFAULT 'free';
