-- ============================================================
-- STORAGE POLICIES for the "images" bucket
-- Run this in Supabase SQL Editor AFTER creating the bucket in the dashboard
-- ============================================================

-- Anyone can view/download images (needed so photos display on the public site)
create policy "Public can view images"
on storage.objects for select
using (bucket_id = 'images');

-- Only admins can upload
create policy "Admins can upload images"
on storage.objects for insert
with check (bucket_id = 'images' and is_admin());

-- Only admins can delete
create policy "Admins can delete images"
on storage.objects for delete
using (bucket_id = 'images' and is_admin());

-- Only admins can update/replace
create policy "Admins can update images"
on storage.objects for update
using (bucket_id = 'images' and is_admin());
