-- ============================================================
-- MIGRATION: Add protected flag for founding admins
-- Run this in Supabase SQL Editor
-- ============================================================

alter table profiles add column is_protected boolean not null default false;

-- After running this, manually set is_protected = true for your two
-- founding admin accounts in Table Editor > profiles, so no one else
-- (even other admins) can demote them from the dashboard.
