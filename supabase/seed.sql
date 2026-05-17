-- Seed Categories
INSERT INTO public.categories (name, slug, description, image_url, sort_order) VALUES
('Sneakers', 'sneakers', 'Premium sneakers for every style', 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&q=80', 1),
('Running', 'running', 'High-performance running shoes', 'https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=400&q=80', 2),
('Casual', 'casual', 'Comfortable everyday shoes', 'https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?w=400&q=80', 3),
('Sports', 'sports', 'Athletic and sports footwear', 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=400&q=80', 4),
('Loafers', 'loafers', 'Classic slip-on shoes', 'https://images.unsplash.com/photo-1626379953822-baec19c3accd?w=400&q=80', 5),
('Boots', 'boots', 'Stylish boots for all occasions', 'https://images.unsplash.com/photo-1608256246200-53e635b5b65f?w=400&q=80', 6),
('Sandals', 'sandals', 'Comfortable summer sandals', 'https://images.unsplash.com/photo-1603487742131-5240f3e23e8f?w=400&q=80', 7),
('Formal', 'formal', 'Elegant formal footwear', 'https://images.unsplash.com/photo-1614252235316-5240f3e23e8f?w=400&q=80', 8);

-- Get category IDs for product seeding
DO $$
DECLARE
    sneakers_cat UUID;
    running_cat UUID;
    casual_cat UUID;
    sports_cat UUID;
    loafers_cat UUID;
    boots_cat UUID;
    sandals_cat UUID;
    formal_cat UUID;
BEGIN
    SELECT id INTO sneakers_cat FROM public.categories WHERE slug = 'sneakers';
    SELECT id INTO running_cat FROM public.categories WHERE slug = 'running';
    SELECT id INTO casual_cat FROM public.categories WHERE slug = 'casual';
    SELECT id INTO sports_cat FROM public.categories WHERE slug = 'sports';
    SELECT id INTO loafers_cat FROM public.categories WHERE slug = 'loafers';
    SELECT id INTO boots_cat FROM public.categories WHERE slug = 'boots';
    SELECT id INTO sandals_cat FROM public.categories WHERE slug = 'sandals';
    SELECT id INTO formal_cat FROM public.categories WHERE slug = 'formal';

    -- Seed Products
    INSERT INTO public.products (name, slug, description, price, compare_at_price, category_id, brand, images, sizes, colors, stock_quantity, is_featured, is_trending, is_new, rating, review_count) VALUES
    ('Air Max Pulse Eclipse', 'air-max-pulse-eclipse', 'Premium sneakers with cutting-edge design and maximum comfort', 18500, 22000, sneakers_cat, 'NexWalk Original',
     ARRAY['https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&q=80'], ARRAY['US 7', 'US 8', 'US 9', 'US 10', 'US 11'], ARRAY['{"name":"Black","hex":"#000000"}']::JSONB[], 15, true, true, false, 4.8, 124),

    ('Urban Runner Pro', 'urban-runner-pro', 'High-performance running shoes with advanced cushioning', 22500, NULL, running_cat, 'NexWalk Active',
     ARRAY['https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=800&q=80'], ARRAY['US 7', 'US 8', 'US 9', 'US 10'], ARRAY['{"name":"White","hex":"#FFFFFF"}']::JSONB[], 8, true, false, true, 4.9, 89),

    ('Classic Low Retro', 'classic-low-retro', 'Timeless casual sneakers with vintage appeal', 12999, NULL, casual_cat, 'NexWalk Classic',
     ARRAY['https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?w=800&q=80'], ARRAY['US 6', 'US 7', 'US 8', 'US 9', 'US 10', 'US 11', 'US 12'], ARRAY['{"name":"Navy","hex":"#1e3a5f"}']::JSONB[], 25, true, true, false, 4.6, 256),

    ('Street Elite V2', 'street-elite-v2', 'Bold statement sneakers for street style', 15999, 18999, sneakers_cat, 'NexWalk Street',
     ARRAY['https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=800&q=80'], ARRAY['US 7', 'US 8', 'US 9', 'US 10'], ARRAY['{"name":"Red","hex":"#dc2626"}']::JSONB[], 12, true, true, false, 4.7, 67),

    ('Trail Blazer Max', 'trail-blazer-max', 'All-terrain adventure shoes with superior grip', 24500, NULL, sports_cat, 'NexWalk Adventure',
     ARRAY['https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=800&q=80'], ARRAY['US 8', 'US 9', 'US 10', 'US 11'], ARRAY['{"name":"Green","hex":"#16a34a"}']::JSONB[], 5, true, false, true, 4.8, 43),

    ('Cloud Comfort Elite', 'cloud-comfort-elite', 'Ultra-cushioned everyday sneakers for all-day comfort', 16999, NULL, casual_cat, 'NexWalk Comfort',
     ARRAY['https://images.unsplash.com/photo-1600185365926-3a2ce3cdb9eb?w=800&q=80'], ARRAY['US 6', 'US 7', 'US 8', 'US 9', 'US 10'], ARRAY['{"name":"Gray","hex":"#6b7280"}']::JSONB[], 18, true, false, false, 4.5, 178),

    ('Neon Surge Limited', 'neon-surge-limited', 'Limited edition glow sneakers with LED accents', 28999, NULL, sneakers_cat, 'NexWalk Limited',
     ARRAY['https://images.unsplash.com/photo-1551107696-a4b0c5a0d9a2?w=800&q=80'], ARRAY['US 8', 'US 9', 'US 10'], ARRAY['{"name":"Neon","hex":"#39ff14"}']::JSONB[], 3, false, true, true, 5.0, 12),

    ('Midnight Runner', 'midnight-runner', 'Dark mode running shoes for night runs', 19999, NULL, running_cat, 'NexWalk Active',
     ARRAY['https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=800&q=80'], ARRAY['US 7', 'US 8', 'US 9', 'US 10', 'US 11'], ARRAY['{"name":"Black","hex":"#000000"}']::JSONB[], 10, false, true, true, 4.7, 34),

    ('Velocity Pro Racing', 'velocity-pro-racing', 'Professional racing flats for competitive runners', 27500, NULL, running_cat, 'NexWalk Racing',
     ARRAY['https://images.unsplash.com/photo-1460353581641-37baddab0fa2?w=800&q=80'], ARRAY['US 7', 'US 8', 'US 9', 'US 10'], ARRAY['{"name":"Blue","hex":"#3b82f6"}']::JSONB[], 7, true, true, false, 4.9, 56),

    ('Heritage Canvas Classic', 'heritage-canvas-classic', 'Vintage-inspired canvas sneakers', 8999, NULL, casual_cat, 'NexWalk Heritage',
     ARRAY['https://images.unsplash.com/photo-1494496195158-c3becb4f2475?w=800&q=80'], ARRAY['US 5', 'US 6', 'US 7', 'US 8', 'US 9', 'US 10', 'US 11'], ARRAY['{"name":"White","hex":"#FFFFFF"}']::JSONB[], 30, false, false, false, 4.4, 312),

    ('Oxford Premium Leather', 'oxford-premium-leather', 'Classic formal leather shoes for business', 18500, NULL, formal_cat, 'NexWalk Formal',
     ARRAY['https://images.unsplash.com/photo-1614252235316-8c857d0b5858?w=800&q=80'], ARRAY['US 7', 'US 8', 'US 9', 'US 10', 'US 11'], ARRAY['{"name":"Brown","hex":"#8B4513"}']::JSONB[], 12, true, false, false, 4.6, 89),

    ('Desert Boot Chelsea', 'desert-boot-chelsea', 'Stylish suede chelsea boots', 22500, NULL, boots_cat, 'NexWalk Boots',
     ARRAY['https://images.unsplash.com/photo-1608256246200-53e635b5b65f?w=800&q=80'], ARRAY['US 7', 'US 8', 'US 9', 'US 10'], ARRAY['{"name":"Tan","hex":"#D2B48C"}']::JSONB[], 8, true, true, true, 4.7, 56),

    ('Penny Loafer Slip', 'penny-loafer-slip', 'Classic penny loafers for work or casual', 14500, NULL, loafers_cat, 'NexWalk Loafers',
     ARRAY['https://images.unsplash.com/photo-1626379953822-baec19c3accd?w=800&q=80'], ARRAY['US 7', 'US 8', 'US 9', 'US 10', 'US 11', 'US 12'], ARRAY['{"name":"Black","hex":"#000000"}']::JSONB[], 15, false, false, false, 4.5, 78),

    ('Summer Breeze Sandals', 'summer-breeze-sandals', 'Lightweight summer sandals', 6999, NULL, sandals_cat, 'NexWalk Summer',
     ARRAY['https://images.unsplash.com/photo-1603487742131-5240f3e23e8f?w=800&q=80'], ARRAY['US 6', 'US 7', 'US 8', 'US 9', 'US 10'], ARRAY['{"name":"Brown","hex":"#8B4513"}','{"name":"Black","hex":"#000000"}']::JSONB[], 20, false, false, true, 4.3, 45),

    ('Basketball High Top Pro', 'basketball-high-top-pro', 'Professional basketball shoes', 26500, NULL, sports_cat, 'NexWalk Sports',
     ARRAY['https://images.unsplash.com/photo-1579338559194-a162d19bf842?w=800&q=80'], ARRAY['US 8', 'US 9', 'US 10', 'US 11', 'US 12'], ARRAY['{"name":"Red","hex":"#dc2626"}','{"name":"Black","hex":"#000000"}']::JSONB[], 6, true, true, false, 4.8, 92),

    ('Running Lite Marathon', 'running-lite-marathon', 'Ultra-light marathon running shoes', 28999, NULL, running_cat, 'NexWalk Active',
     ARRAY['https://images.unsplash.com/photo-1539185441755-769473a23570?w=800&q=80'], ARRAY['US 7', 'US 8', 'US 9', 'US 10'], ARRAY['{"name":"Yellow","hex":"#fbbf24"}']::JSONB[], 4, true, true, true, 4.9, 67);
END $$;

-- Seed Banners
INSERT INTO public.banners (title, subtitle, image_url, link_type, link_value, sort_order) VALUES
('New Arrivals 2024', 'Fresh styles just dropped', 'https://images.unsplash.com/photo-1556906781-9a412961c28c?w=1200&q=80', 'category', 'new', 1),
('Summer Sale', 'Up to 50% off', 'https://images.unsplash.com/photo-1460353581641-37baddab0fa2?w=1200&q=80', 'url', '/shop?sale=true', 2),
('Free Shipping', 'On orders above PKR 3,000', 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=1200&q=80', 'none', NULL, 3);

-- Seed Coupons
INSERT INTO public.coupons (code, type, value, min_order_amount, max_discount, is_active, valid_until) VALUES
('WELCOME10', 'percentage', 10, 2000, 500, true, '2025-12-31'),
('FIRSTORDER', 'percentage', 15, 3000, 1000, true, '2025-12-31'),
('FREESHIP', 'free_shipping', 0, 5000, NULL, true, '2025-12-31');
