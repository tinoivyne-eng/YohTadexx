-- ============================================================
-- MIGRATION: Require login for Contact messages (matching Bookings)
-- Run this in Supabase SQL Editor
-- ============================================================

-- Add a user_id column to messages, same pattern as bookings
alter table messages add column user_id uuid references profiles(id) on delete set null;

-- Remove the old "anyone can insert" policy
drop policy "Anyone can send a message" on messages;

-- Replace with: only logged-in users can insert, and only as themselves
create policy "Logged-in users can send a message" on messages
  for insert with check (auth.uid() = user_id);

-- Let users view their own past messages (optional, but consistent with bookings)
create policy "Users can view own messages" on messages
  for select using (auth.uid() = user_id or is_admin());
