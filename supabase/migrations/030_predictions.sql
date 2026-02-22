-- Migration 030: Autonomous Trend Predictions

-- Create trend_predictions table
CREATE TABLE IF NOT EXISTS trend_predictions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    org_id UUID NOT NULL, -- Global or org-specific predictions
    title TEXT NOT NULL,
    description TEXT,
    prediction_type TEXT NOT NULL, -- 'aesthetic', 'narrative', 'tactic'
    confidence_score NUMERIC(5, 2),
    projected_dna JSONB, -- Predicted Strategic Radar metrics
    exhaustion_point TIMESTAMPTZ, -- Predicted peak saturation
    counter_trend_direction TEXT, -- The predicted "Next Move"
    is_validated BOOLEAN DEFAULT false,
    accuracy_score NUMERIC(5, 2),
    created_at TIMESTAMPTZ DEFAULT now()
);

-- Index for org-specific lookups
CREATE INDEX IF NOT EXISTS idx_trend_predictions_org_id ON trend_predictions(org_id);

-- Add comment
COMMENT ON TABLE trend_predictions IS 'Stores autonomous strategic forecasts and trend evolution predictions.';
