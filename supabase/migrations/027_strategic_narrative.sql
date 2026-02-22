-- Add white_paper column to boards table
-- This stores the long-form strategic narrative synthesis for client delivery.
ALTER TABLE boards ADD COLUMN IF NOT EXISTS white_paper JSONB DEFAULT NULL;
