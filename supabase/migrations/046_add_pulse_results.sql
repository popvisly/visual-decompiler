CREATE TABLE IF NOT EXISTS public.pulse_results (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    agency_id UUID REFERENCES public.agencies(id) ON DELETE SET NULL,
    asset_a_id UUID REFERENCES public.assets(id) ON DELETE CASCADE,
    asset_b_id UUID REFERENCES public.assets(id) ON DELETE CASCADE,
    differential_analysis JSONB NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_pulse_results_asset_a_id ON public.pulse_results(asset_a_id);
CREATE INDEX IF NOT EXISTS idx_pulse_results_asset_b_id ON public.pulse_results(asset_b_id);
CREATE INDEX IF NOT EXISTS idx_pulse_results_created_at ON public.pulse_results(created_at DESC);
