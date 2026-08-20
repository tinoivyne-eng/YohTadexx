-- ============================================================
-- YOH TADEXX PRODUCTIONS — SUPABASE SCHEMA
-- Run this once in the Supabase SQL Editor (Project > SQL Editor > New Query)
-- Safe to extend later with ALTER TABLE / additional CREATE TABLE statements.
-- ============================================================

-- ------------------------------------------------------------
-- 1. PROFILES (extends Supabase's built-in auth.users)
-- Every signed-up user gets a profile row. "role" controls admin access.
-- ------------------------------------------------------------
create table profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  name text,
  email text,
  role text not null default 'customer' check (role in ('customer', 'admin')),
  created_at timestamptz not null default now()
);

-- Automatically create a profile row whenever someone signs up
create function handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, name, email)
  values (new.id, new.raw_user_meta_data->>'name', new.email);
  return new;
end;
$$ language plpgsql security definer;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure handle_new_user();

-- ------------------------------------------------------------
-- 2. BOOKINGS
-- ------------------------------------------------------------
create table bookings (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references profiles(id) on delete set null,
  name text not null,
  email text not null,
  phone text,
  service text not null,
  session_date date not null,
  session_time text not null,
  notes text,
  status text not null default 'pending' check (status in ('pending', 'confirmed', 'declined', 'completed')),
  created_at timestamptz not null default now()
);

-- ------------------------------------------------------------
-- 3. MESSAGES (Contact page)
-- ------------------------------------------------------------
create table messages (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  message text not null,
  read boolean not null default false,
  created_at timestamptz not null default now()
);

-- ------------------------------------------------------------
-- 4. SERVICES
-- ------------------------------------------------------------
create table services (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  price text not null,
  description text,
  features text[] not null default '{}',
  sort_order int not null default 0,
  created_at timestamptz not null default now()
);

-- ------------------------------------------------------------
-- 5. PORTFOLIO TRACKS
-- ------------------------------------------------------------
create table portfolio_tracks (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  artist text not null,
  genre text not null,
  cover_url text,
  youtube_id text,
  sort_order int not null default 0,
  created_at timestamptz not null default now()
);

-- ------------------------------------------------------------
-- 6. STUDIO IMAGES (gallery)
-- ------------------------------------------------------------
create table studio_images (
  id uuid primary key default gen_random_uuid(),
  caption text,
  image_url text not null,
  sort_order int not null default 0,
  created_at timestamptz not null default now()
);

-- ------------------------------------------------------------
-- 7. SITE SETTINGS (single-row table for contact info, socials, stats)
-- ------------------------------------------------------------
create table site_settings (
  id int primary key default 1,
  email text,
  phone text,
  address text,
  instagram_url text,
  youtube_url text,
  spotify_url text,
  stat_tracks text,
  stat_years text,
  stat_artists text,
  stat_availability text,
  updated_at timestamptz not null default now(),
  constraint single_row check (id = 1)
);

insert into site_settings (id) values (1);

-- ============================================================
-- ROW LEVEL SECURITY (RLS)
-- Locks tables down by default, then opens specific access.
-- ============================================================

alter table profiles enable row level security;
alter table bookings enable row level security;
alter table messages enable row level security;
alter table services enable row level security;
alter table portfolio_tracks enable row level security;
alter table studio_images enable row level security;
alter table site_settings enable row level security;

-- Helper: check if the current user is an admin
create function is_admin()
returns boolean as $$
  select exists (
    select 1 from profiles where id = auth.uid() and role = 'admin'
  );
$$ language sql security definer;

-- Public content (services, portfolio, studio images, site settings):
-- anyone can READ, only admins can WRITE
create policy "Public can view services" on services for select using (true);
create policy "Admins can manage services" on services for all using (is_admin());

create policy "Public can view portfolio" on portfolio_tracks for select using (true);
create policy "Admins can manage portfolio" on portfolio_tracks for all using (is_admin());

create policy "Public can view studio images" on studio_images for select using (true);
create policy "Admins can manage studio images" on studio_images for all using (is_admin());

create policy "Public can view site settings" on site_settings for select using (true);
create policy "Admins can update site settings" on site_settings for update using (is_admin());

-- Profiles: users can see/edit their own profile, admins can see/edit all
create policy "Users can view own profile" on profiles for select using (auth.uid() = id or is_admin());
create policy "Users can update own profile" on profiles for update using (auth.uid() = id);
create policy "Admins can update any profile" on profiles for update using (is_admin());

-- Bookings: logged-in users can create their own, view their own; admins see/manage all
create policy "Users can create bookings" on bookings for insert with check (auth.uid() = user_id);
create policy "Users can view own bookings" on bookings for select using (auth.uid() = user_id or is_admin());
create policy "Admins can manage bookings" on bookings for update using (is_admin());
create policy "Admins can delete bookings" on bookings for delete using (is_admin());

-- Messages: anyone can submit (even logged out), only admins can view/manage
create policy "Anyone can send a message" on messages for insert with check (true);
create policy "Admins can view messages" on messages for select using (is_admin());
create policy "Admins can update messages" on messages for update using (is_admin());
create policy "Admins can delete messages" on messages for delete using (is_admin());
