-- Migration 028: Live Signals Persistence

-- Add live sentiment fields to boards table
ALTER TABLE boards ADD COLUMN IF NOT EXISTS live_sentiment JSONB DEFAULT '{}';
ALTER TABLE boards ADD COLUMN IF NOT EXISTS signals_active BOOLEAN DEFAULT FALSE;

-- Add comment for documentation
COMMENT ON COLUMN boards.live_sentiment IS 'Stores real-time categorical sentiment and volatility metrics.';
COMMENT ON COLUMN boards.signals_active IS 'Indicates if Live Signal tracking is enabled for this board.';
