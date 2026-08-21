-- ============================================================
-- MIGRATION: Enforce founder protection at the database level
-- Run this in Supabase SQL Editor
-- ============================================================

-- Replace the old "any admin can update any profile" policy with one that
-- blocks changes to protected profiles unless the protected user is
-- updating their own row (or it's done via the Supabase dashboard/SQL
-- editor directly, which bypasses RLS entirely and is only accessible to you).

drop policy "Admins can update any profile" on profiles;

create policy "Admins can update non-protected profiles" on profiles
  for update
  using (
    is_admin()
    and (is_protected = false or auth.uid() = id)
  );
