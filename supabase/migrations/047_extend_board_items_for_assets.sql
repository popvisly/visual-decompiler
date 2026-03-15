ALTER TABLE public.board_items
ADD COLUMN IF NOT EXISTS asset_id UUID REFERENCES public.assets(id) ON DELETE CASCADE;

ALTER TABLE public.board_items
ADD COLUMN IF NOT EXISTS id UUID DEFAULT gen_random_uuid();

DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1
        FROM pg_constraint
        WHERE conname = 'board_items_pkey'
          AND conrelid = 'public.board_items'::regclass
          AND pg_get_constraintdef(oid) LIKE 'PRIMARY KEY (id)%'
    ) THEN
        ALTER TABLE public.board_items DROP CONSTRAINT IF EXISTS board_items_pkey;
        ALTER TABLE public.board_items ADD CONSTRAINT board_items_pkey PRIMARY KEY (id);
    END IF;
END $$;

ALTER TABLE public.board_items
ALTER COLUMN ad_id DROP NOT NULL;

CREATE UNIQUE INDEX IF NOT EXISTS idx_board_items_unique_ad
ON public.board_items (board_id, ad_id)
WHERE ad_id IS NOT NULL;

CREATE UNIQUE INDEX IF NOT EXISTS idx_board_items_unique_asset
ON public.board_items (board_id, asset_id)
WHERE asset_id IS NOT NULL;

CREATE INDEX IF NOT EXISTS idx_board_items_asset_id
ON public.board_items(asset_id);
