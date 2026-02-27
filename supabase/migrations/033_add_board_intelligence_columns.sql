-- 033_add_board_intelligence_columns.sql

-- The BriefGenerator and Synthesis endpoints require 
-- these columns to store the output of the multimodal AI pipeline.

alter table public.boards
  add column if not exists client_brief_text text,
  add column if not exists strategic_answer jsonb,
  add column if not exists last_brief text,
  add column if not exists white_paper jsonb;
