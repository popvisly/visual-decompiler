create table if not exists relay_messages (
    id uuid default gen_random_uuid() primary key,
    sender text not null,
    content text not null,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

create index if not exists relay_messages_created_at_idx on relay_messages (created_at desc);

alter table relay_messages enable row level security;

create policy "Enable insert for authenticated users only" 
on relay_messages for insert 
to service_role 
with check (true);

create policy "Enable read for authenticated users only" 
on relay_messages for select 
to service_role 
using (true);
