-- Migration 029: Strategic Simulations Persistence

-- Create simulations table
CREATE TABLE IF NOT EXISTS simulations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    board_id UUID NOT NULL REFERENCES boards(id) ON DELETE CASCADE,
    shock_type TEXT NOT NULL,
    shock_description TEXT,
    durability_score NUMERIC(5, 2),
    projection_data JSONB NOT NULL, -- Shifted metrics
    impact_report TEXT,
    created_at TIMESTAMPTZ DEFAULT now()
);

-- Index for board-specific lookups
CREATE INDEX IF NOT EXISTS idx_simulations_board_id ON simulations(board_id);

-- Add comment
COMMENT ON TABLE simulations IS 'Stores history of strategic stress tests and market shock simulations.';
