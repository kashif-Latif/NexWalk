-- Fix Database Policies for NexWalk
-- Run this in Supabase SQL Editor (Dashboard > SQL Editor)

-- 1. Drop existing RLS policies that might block inserts
DROP POLICY IF EXISTS "Users can insert own orders" ON public.orders;
DROP POLICY IF EXISTS "Public can insert orders" ON public.orders;

-- 2. Disable RLS temporarily for testing (you can enable later with proper policies)
ALTER TABLE public.orders DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.order_items DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.contact_messages DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.products DISABLE ROW LEVEL SECURITY;

-- 3. Test inserting a category
INSERT INTO public.categories (name, slug, description, image_url, sort_order)
VALUES ('Sneakers', 'sneakers', 'Premium sneakers', 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400', 1)
ON CONFLICT (slug) DO NOTHING;

INSERT INTO public.categories (name, slug, description, image_url, sort_order)
VALUES ('Running', 'running', 'High-performance running shoes', 'https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=400', 2)
ON CONFLICT (slug) DO NOTHING;

INSERT INTO public.categories (name, slug, description, image_url, sort_order)
VALUES ('Casual', 'casual', 'Comfortable everyday shoes', 'https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?w=400', 3)
ON CONFLICT (slug) DO NOTHING;

INSERT INTO public.categories (name, slug, description, image_url, sort_order)
VALUES ('Sports', 'sports', 'Athletic footwear', 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=400', 4)
ON CONFLICT (slug) DO NOTHING;

INSERT INTO public.categories (name, slug, description, image_url, sort_order)
VALUES ('Loafers', 'loafers', 'Classic slip-on shoes', 'https://images.unsplash.com/photo-1626379953822-baec19c3accd?w=400', 5)
ON CONFLICT (slug) DO NOTHING;

INSERT INTO public.categories (name, slug, description, image_url, sort_order)
VALUES ('Boots', 'boots', 'Stylish boots', 'https://images.unsplash.com/photo-1608256246200-53e635b5b65f?w=400', 6)
ON CONFLICT (slug) DO NOTHING;

INSERT INTO public.categories (name, slug, description, image_url, sort_order)
VALUES ('Sandals', 'sandals', 'Comfortable sandals', 'https://images.unsplash.com/photo-1603487742131-5240f3e23e8f?w=400', 7)
ON CONFLICT (slug) DO NOTHING;

INSERT INTO public.categories (name, slug, description, image_url, sort_order)
VALUES ('Formal', 'formal', 'Elegant formal footwear', 'https://images.unsplash.com/photo-1614252235316-8c857d0b5858?w=400', 8)
ON CONFLICT (slug) DO NOTHING;

-- 4. Insert sample products
DO $$
DECLARE
    sneakers_cat UUID;
    running_cat UUID;
    casual_cat UUID;
BEGIN
    SELECT id INTO sneakers_cat FROM public.categories WHERE slug = 'sneakers';
    SELECT id INTO running_cat FROM public.categories WHERE slug = 'running';
    SELECT id INTO casual_cat FROM public.categories WHERE slug = 'casual';

    -- Check if products already exist
    IF NOT EXISTS (SELECT 1 FROM public.products WHERE slug = 'air-max-pulse-eclipse') THEN
        INSERT INTO public.products (name, slug, description, price, compare_at_price, category_id, brand, images, sizes, colors, stock_quantity, is_active, is_featured, is_trending, rating, review_count)
        VALUES
        ('Air Max Pulse Eclipse', 'air-max-pulse-eclipse', 'Premium sneakers with cutting-edge design', 18500, 22000, sneakers_cat, 'NexWalk Original',
         ARRAY['https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&q=80'],
         ARRAY['US 7', 'US 8', 'US 9', 'US 10', 'US 11'],
         ARRAY['{"name":"Black","hex":"#000000"}']::JSONB[],
         15, true, true, true, 4.8, 124);
    END IF;
END $$;

-- 5. Test order creation
INSERT INTO public.orders (order_number, email, full_name, phone, shipping_address, subtotal, shipping_cost, total, status, payment_method, payment_status)
VALUES (
    'NXW-TEST001',
    'test@example.com',
    'Test Customer',
    '03001234567',
    '{"full_name":"Test Customer","phone":"03001234567","address_line1":"Test Address","city":"Lahore","province":"Punjab","postal_code":"54000"}'::JSONB,
    18500,
    0,
    18500,
    'pending',
    'cod',
    'pending'
);

-- 6. Test contact message
INSERT INTO public.contact_messages (name, email, phone, subject, message, status)
VALUES ('Test User', 'test@example.com', '03001234567', 'Test Subject', 'This is a test message', 'unread');

-- 7. Verify all inserts
SELECT 'Categories' as table_name, COUNT(*) as count FROM public.categories
UNION ALL
SELECT 'Products', COUNT(*) FROM public.products
UNION ALL
SELECT 'Orders', COUNT(*) FROM public.orders
UNION ALL
SELECT 'Contact Messages', COUNT(*) FROM public.contact_messages;