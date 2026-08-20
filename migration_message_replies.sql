-- ============================================================
-- MIGRATION: Add admin reply fields to messages
-- Run this in Supabase SQL Editor
-- ============================================================

alter table messages add column admin_reply text;
alter table messages add column replied_at timestamptz;

-- Existing "Admins can update messages" policy already covers these new
-- columns, and existing "Users can view own messages" policy already lets
-- customers see the reply once it's added — no new policies needed.
