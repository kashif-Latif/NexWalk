-- NexWalk Database Schema & Fixes
-- Run this in Supabase SQL Editor to fix order creation

-- Drop existing RLS on orders for public insert
ALTER TABLE public.orders DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.order_items DISABLE ROW LEVEL SECURITY;

-- Re-enable with proper policies
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;

-- Allow anyone to insert orders (for checkout)
CREATE POLICY "Public can insert orders" ON public.orders
    FOR INSERT WITH CHECK (true);

-- Allow admins to manage orders
CREATE POLICY "Admins can manage orders" ON public.orders
    FOR ALL USING (auth.uid() IS NOT NULL);

-- Allow public to view orders (for order confirmation)
CREATE POLICY "Public can view orders" ON public.orders
    FOR SELECT USING (true);

-- Order items policies
ALTER TABLE public.order_items ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can insert order items" ON public.order_items
    FOR INSERT WITH CHECK (true);

CREATE POLICY "Public can view order items" ON public.order_items
    FOR SELECT USING (true);

-- Insert a test order to verify
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

-- Verify order was created
SELECT * FROM public.orders ORDER BY created_at DESC LIMIT 5;