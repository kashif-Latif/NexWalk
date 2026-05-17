-- NexWalk Supabase Setup Instructions
-- Run these commands in your Supabase SQL Editor

-- 1. Run the schema.sql first (create tables)
-- 2. Then run seed.sql (add sample data)

-- IMPORTANT: After running the schema, update the admin user:
-- Sign up with email: kashif.latif2004@gmail.com
-- Then run this SQL to make them admin:
UPDATE public.profiles SET role = 'admin' WHERE email = 'kashif.latif2004@gmail.com';
