-- 020_pulse_reports.sql
-- Store generated Pulse reports for historical tracking and adaptive briefing

create table if not exists public.pulse_reports (
    id uuid primary key default gen_random_uuid(),
    created_at timestamptz default now(),
    report_text text not null,
    ad_count int default 0,
    anomalies_detected int default 0,
    surges jsonb -- { trigger: "surge_trigger", increase: 45 }
);

-- Enable RLS
alter table public.pulse_reports enable row level security;

-- Policy for reading (all authenticated users for now, or org-based if needed)
-- Since Pulse is global industry-wide, we might keep it readable by all auth users
create policy "Authenticated users can read pulse reports"
    on public.pulse_reports for select
    to authenticated
    using (true);
