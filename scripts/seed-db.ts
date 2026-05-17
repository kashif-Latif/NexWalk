import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
import path from 'path';

// Load environment variables
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

const supabase = createClient(supabaseUrl, serviceRoleKey, {
  auth: { autoRefreshToken: false, persistSession: false }
});

// Product data from the project
const shoeImages = [
  'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400',
  'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=400',
  'https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=400',
  'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=400',
  'https://images.unsplash.com/photo-1600185365926-3a2ce3cdb9eb?w=400',
  'https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?w=400',
  'https://images.unsplash.com/photo-1551107696-a4b0c5a0d9a2?w=400',
  'https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=400',
  'https://images.unsplash.com/photo-1608256246200-53e635b5b65f?w=400',
  'https://images.unsplash.com/photo-1603487742131-5240f3e23e8f?w=400',
];

// UUID constants for categories
const catIds = {
  sneakers: '11111111-1111-1111-1111-111111111111',
  running: '22222222-2222-2222-2222-222222222222',
  casual: '33333333-3333-3333-3333-333333333333',
  sports: '44444444-4444-4444-4444-444444444444',
  boots: '55555555-5555-5555-5555-555555555555',
  loafers: '66666666-6666-6666-6666-666666666666',
  sandals: '77777777-7777-7777-7777-777777777777',
  formal: '88888888-8888-8888-8888-888888888888',
};

const categories = [
  { id: catIds.sneakers, name: 'Sneakers', slug: 'sneakers', description: 'Premium sneakers for street style', is_active: true, sort_order: 1 },
  { id: catIds.running, name: 'Running', slug: 'running', description: 'High-performance running shoes', is_active: true, sort_order: 2 },
  { id: catIds.casual, name: 'Casual', slug: 'casual', description: 'Comfortable everyday shoes', is_active: true, sort_order: 3 },
  { id: catIds.sports, name: 'Sports', slug: 'sports', description: 'Professional sports footwear', is_active: true, sort_order: 4 },
  { id: catIds.boots, name: 'Boots', slug: 'boots', description: 'Robust and stylish boots', is_active: true, sort_order: 5 },
  { id: catIds.loafers, name: 'Loafers', slug: 'loafers', description: 'Elegant loafers for formal occasions', is_active: true, sort_order: 6 },
  { id: catIds.sandals, name: 'Sandals', slug: 'sandals', description: 'Comfortable summer sandals', is_active: true, sort_order: 7 },
  { id: catIds.formal, name: 'Formal', slug: 'formal', description: 'Sophisticated formal shoes', is_active: true, sort_order: 8 },
];

// Product UUIDs
const prodIds = {
  s1: 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa',
  s2: 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaab',
  s3: 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaac',
  s4: 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaad',
  s5: 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaae',
  s6: 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaf',
  r1: 'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb',
  r2: 'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbc',
  c1: 'cccccccc-cccc-cccc-cccc-cccccccccccc',
  b1: 'dddddddd-dddd-dddd-dddd-dddddddddddd',
  l1: 'eeeeeeee-eeee-eeee-eeee-eeeeeeeeeeee',
};

const products = [
  { id: prodIds.s1, name: 'Air Max Pulse Eclipse', slug: 'air-max-pulse-eclipse', description: 'Premium sneakers with revolutionary air cushioning', price: 18500, compare_at_price: 22000, category_id: catIds.sneakers, brand: 'NexWalk Original', stock_quantity: 15, sizes: ['US 7', 'US 8', 'US 9', 'US 10', 'US 11'], colors: ['Black'], images: [shoeImages[0]], is_active: true, is_featured: true, is_trending: true, is_new: false },
  { id: prodIds.s2, name: 'Street Elite V2', slug: 'street-elite-v2', description: 'Bold statement sneakers for the streets', price: 15999, compare_at_price: 18999, category_id: catIds.sneakers, brand: 'NexWalk Street', stock_quantity: 12, sizes: ['US 7', 'US 8', 'US 9', 'US 10'], colors: ['Red'], images: [shoeImages[1]], is_active: true, is_featured: true, is_trending: true, is_new: false },
  { id: prodIds.s3, name: 'Neon Surge Limited', slug: 'neon-surge-limited', description: 'Limited edition glow sneakers', price: 28999, category_id: catIds.sneakers, brand: 'NexWalk Limited', stock_quantity: 3, sizes: ['US 8', 'US 9', 'US 10'], colors: ['Neon'], images: [shoeImages[6]], is_active: true, is_featured: true, is_trending: true, is_new: true },
  { id: prodIds.s4, name: 'Nova Step Pro', slug: 'nova-step-pro', description: 'Next generation step comfort', price: 17999, category_id: catIds.sneakers, brand: 'NexWalk Original', stock_quantity: 12, sizes: ['US 7', 'US 8', 'US 9', 'US 10'], colors: ['Orange'], images: [shoeImages[10]], is_active: true, is_featured: true, is_trending: false, is_new: true },
  { id: prodIds.s5, name: 'Shadow Runner X', slug: 'shadow-runner-x', description: 'Stealth mode activated', price: 16500, category_id: catIds.sneakers, brand: 'NexWalk Shadow', stock_quantity: 20, sizes: ['US 7', 'US 8', 'US 9', 'US 10', 'US 11'], colors: ['Dark Gray'], images: [shoeImages[2]], is_active: true, is_featured: false, is_trending: true, is_new: false },
  { id: prodIds.s6, name: 'Velocity Boost', slug: 'velocity-boost', description: 'Maximum speed performance', price: 22500, category_id: catIds.sneakers, brand: 'NexWalk Velocity', stock_quantity: 8, sizes: ['US 8', 'US 9', 'US 10', 'US 11'], colors: ['Blue'], images: [shoeImages[3]], is_active: true, is_featured: true, is_trending: true, is_new: false },
  { id: prodIds.r1, name: 'Urban Runner', slug: 'running-urban-1', description: 'High-performance running shoe', price: 12500, category_id: catIds.running, brand: 'NexWalk Run', stock_quantity: 15, sizes: ['US 7', 'US 8', 'US 9', 'US 10'], colors: ['Black'], images: [shoeImages[4]], is_active: true, is_featured: true, is_trending: true, is_new: true },
  { id: prodIds.r2, name: 'Marathon Pro', slug: 'running-marathon-4', description: 'Professional marathon shoes', price: 18000, compare_at_price: 22000, category_id: catIds.running, brand: 'NexWalk Active', stock_quantity: 10, sizes: ['US 8', 'US 9', 'US 10', 'US 11'], colors: ['Blue'], images: [shoeImages[5]], is_active: true, is_featured: true, is_trending: false, is_new: false },
  { id: prodIds.c1, name: 'Classic Slip', slug: 'casual-classic-1', description: 'Comfortable casual shoe', price: 8500, category_id: catIds.casual, brand: 'NexWalk Classic', stock_quantity: 20, sizes: ['US 6', 'US 7', 'US 8', 'US 9', 'US 10'], colors: ['Black'], images: [shoeImages[7]], is_active: true, is_featured: true, is_trending: true, is_new: false },
  { id: prodIds.b1, name: 'Chelsea Classic', slug: 'boots-chelsea-1', description: 'Classic chelsea boots', price: 19500, compare_at_price: 25000, category_id: catIds.boots, brand: 'NexWalk Boots', stock_quantity: 8, sizes: ['US 7', 'US 8', 'US 9', 'US 10', 'US 11'], colors: ['Brown'], images: [shoeImages[8]], is_active: true, is_featured: true, is_trending: true, is_new: false },
  { id: prodIds.l1, name: 'Classic Penny', slug: 'loafers-penny-1', description: 'Elegant penny loafers', price: 12000, category_id: catIds.loafers, brand: 'NexWalk Formal', stock_quantity: 12, sizes: ['US 7', 'US 8', 'US 9', 'US 10'], colors: ['Black'], images: [shoeImages[9]], is_active: true, is_featured: false, is_trending: true, is_new: false },
];

async function seedDatabase() {
  console.log('🌱 Starting database seed...\n');

  try {
    // 1. Insert Categories (or get existing)
    console.log('📁 Inserting categories...');
    const { data: existingCats } = await supabase.from('categories').select('id, slug');

    let categoryMap: Record<string, string> = {};

    if (existingCats && existingCats.length > 0) {
      console.log(`   Found ${existingCats.length} existing categories`);
      existingCats.forEach(c => { categoryMap[c.slug] = c.id; });
    } else {
      // Insert new categories
      const { error: catError } = await supabase
        .from('categories')
        .upsert(categories, { onConflict: 'id' });
      if (catError) {
        console.error('Categories error:', catError);
      } else {
        console.log('✅ Categories inserted successfully');
        categories.forEach(c => { categoryMap[c.slug] = c.id; });
      }
    }

    // 2. Map products to use correct category IDs
    console.log('👟 Inserting products...');
    const mappedProducts = products.map(p => ({
      ...p,
      category_id: categoryMap[p.category_id as unknown as string] || catIds.sneakers
    }));

    const { error: prodError } = await supabase
      .from('products')
      .upsert(mappedProducts, { onConflict: 'id' });
    if (prodError) {
      console.error('Products error:', prodError);
    } else {
      console.log('✅ Products inserted successfully');
    }

    // 3. Insert Test Contact Message
    console.log('💬 Inserting test contact message...');
    const { error: contactError } = await supabase
      .from('contact_messages')
      .insert({
        name: 'Test Customer',
        email: 'test@example.com',
        phone: '03141234567',
        subject: 'order',
        message: 'This is a test message to verify the contact form is working properly. Please ignore.',
        status: 'unread'
      });
    if (contactError) {
      console.error('Contact message error:', contactError);
    } else {
      console.log('✅ Test contact message inserted');
    }

    // 4. Insert a test order (skip if exists)
    console.log('🛒 Inserting test order...');
    const { data: existingOrder } = await supabase
      .from('orders')
      .select('id')
      .eq('order_number', 'NXW-TEST-001')
      .single();

    if (existingOrder) {
      console.log('   Test order already exists, skipping...');
    } else {
      const orderNumber = `NXW-TEST-${Date.now().toString(36).toUpperCase()}`;
      const { data: orderData, error: orderError } = await supabase
        .from('orders')
        .insert({
          order_number: orderNumber,
        email: 'test@example.com',
        full_name: 'Test Customer',
        phone: '03141234567',
        shipping_address: {
          full_name: 'Test Customer',
          phone: '03141234567',
          address_line1: '123 Test Street',
          city: 'Lahore',
          province: 'Punjab',
          postal_code: '54000'
        },
        subtotal: 37000,
        shipping_cost: 0,
        total: 37000,
        status: 'pending',
        payment_method: 'cod',
        payment_status: 'pending'
      })
      .select()
      .single();

    if (orderError) {
      console.error('Order error:', orderError);
    } else {
      console.log('✅ Test order inserted');

      // Insert order items
      const { error: itemsError } = await supabase
        .from('order_items')
        .insert([
          {
            order_id: orderData.id,
            product_id: prodIds.s1,
            product_name: 'Air Max Pulse Eclipse',
            product_image: shoeImages[0],
            size: 'US 9',
            color: 'Black',
            quantity: 1,
            unit_price: 18500,
            total_price: 18500
          },
          {
            order_id: orderData.id,
            product_id: prodIds.s2,
            product_name: 'Street Elite V2',
            product_image: shoeImages[1],
            size: 'US 10',
            color: 'Red',
            quantity: 1,
            unit_price: 15999,
            total_price: 15999
          },
          {
            order_id: orderData.id,
            product_id: prodIds.r1,
            product_name: 'Urban Runner',
            product_image: shoeImages[4],
            size: 'US 9',
            color: 'Black',
            quantity: 1,
            unit_price: 12500,
            total_price: 12500
          }
        ]);

      if (itemsError) {
        console.error('Order items error:', itemsError);
      } else {
        console.log('✅ Test order items inserted');
      }
    }

    // 5. Insert sample banners
    console.log('🎨 Inserting banners...');
    const { error: bannerError } = await supabase
      .from('banners')
      .insert([
        {
          title: 'New Season Sale',
          subtitle: 'Up to 30% off on all sneakers',
          image_url: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=1200',
          link_type: 'none',
          is_active: true,
          sort_order: 1
        },
        {
          title: 'Premium Collection',
          subtitle: 'Exclusive designer editions',
          image_url: 'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=1200',
          link_type: 'category',
          link_value: 'sneakers',
          is_active: true,
          sort_order: 2
        }
      ], { onConflict: 'id' });

    if (bannerError) {
      console.error('Banners error:', bannerError);
    } else {
      console.log('✅ Banners inserted');
    }

    console.log('\n🎉 Database seeding completed!');
    console.log('\n📋 Summary:');
    console.log(`   - ${categories.length} categories`);
    console.log(`   - ${products.length} products`);
    console.log(`   - 1 test contact message`);
    console.log(`   - 1 test order with 3 items`);
    console.log(`   - 2 banners`);

  } catch (error) {
    console.error('❌ Seed failed:', error);
  }

  process.exit(0);
}

seedDatabase();