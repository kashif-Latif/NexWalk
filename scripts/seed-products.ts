// Seed script to populate products in Supabase
// Run with: npx tsx scripts/seed-products.ts

import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || '';

const supabase = createClient(supabaseUrl, supabaseKey);

const categories = [
  { id: 'sneakers', name: 'Sneakers', prefix: 'SNK' },
  { id: 'running', name: 'Running', prefix: 'RUN' },
  { id: 'casual', name: 'Casual', prefix: 'CSL' },
  { id: 'sports', name: 'Sports', prefix: 'SPT' },
  { id: 'loafers', name: 'Loafers', prefix: 'LOF' },
  { id: 'boots', name: 'Boots', prefix: 'BOT' },
  { id: 'sandals', name: 'Sandals', prefix: 'SND' },
  { id: 'formal', name: 'Formal', prefix: 'FML' },
];

const brands = [
  'NexWalk Original', 'NexWalk Active', 'NexWalk Classic', 'NexWalk Street',
  'NexWalk Adventure', 'NexWalk Comfort', 'NexWalk Limited', 'NexWalk Pro'
];

const colors = [
  { name: 'Black', hex: '#000000' },
  { name: 'White', hex: '#FFFFFF' },
  { name: 'Navy', hex: '#1e3a5f' },
  { name: 'Red', hex: '#dc2626' },
  { name: 'Gray', hex: '#6b7280' },
  { name: 'Green', hex: '#16a34a' },
  { name: 'Blue', hex: '#3b82f6' },
  { name: 'Brown', hex: '#8B4513' },
  { name: 'Tan', hex: '#D2B48C' },
  { name: 'Orange', hex: '#f97316' },
];

const sizes = ['US 6', 'US 7', 'US 8', 'US 9', 'US 10', 'US 11', 'US 12'];

const productTemplates = [
  { name: 'Air Max Pulse', suffix: 'Eclipse', priceRange: [18500, 28500] },
  { name: 'Urban Runner', suffix: 'Pro', priceRange: [22500, 32500] },
  { name: 'Classic Low', suffix: 'Retro', priceRange: [12999, 18999] },
  { name: 'Street Elite', suffix: 'V2', priceRange: [15999, 24999] },
  { name: 'Trail Blazer', suffix: 'Max', priceRange: [24500, 34500] },
  { name: 'Cloud Comfort', suffix: 'Elite', priceRange: [16999, 22999] },
  { name: 'Neon Surge', suffix: 'Limited', priceRange: [28999, 38999] },
  { name: 'Midnight Runner', suffix: '', priceRange: [19999, 29999] },
  { name: 'Desert Boot', suffix: 'Chelsea', priceRange: [22500, 29500] },
  { name: 'Summer Breeze', suffix: 'Sandals', priceRange: [6999, 12999] },
  { name: 'Flex Motion', suffix: 'Plus', priceRange: [14999, 21999] },
  { name: 'Nova Step', suffix: 'Pro', priceRange: [17999, 26999] },
  { name: 'Speed Hawk', suffix: 'Elite', priceRange: [23999, 33999] },
  { name: 'Glow Runner', suffix: 'X', priceRange: [26999, 36999] },
  { name: 'Shadow Walker', suffix: 'V3', priceRange: [20999, 29999] },
];

const unsplashImages = [
  'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&q=80',
  'https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=800&q=80',
  'https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?w=800&q=80',
  'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=800&q=80',
  'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=800&q=80',
  'https://images.unsplash.com/photo-1600185365926-3a2ce3cdb9eb?w=800&q=80',
  'https://images.unsplash.com/photo-1551107696-a4b0c5a0d9a2?w=800&q=80',
  'https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=800&q=80',
  'https://images.unsplash.com/photo-1608256246200-53e635b5b65f?w=800&q=80',
  'https://images.unsplash.com/photo-1603487742131-5240f3e23e8f?w=800&q=80',
  'https://images.unsplash.com/photo-1605348532760-6753d2c43329?w=800&q=80',
  'https://images.unsplash.com/photo-1543508282-6319a3e2621f?w=800&q=80',
  'https://images.unsplash.com/photo-1560769629-975ec94e6a86?w=800&q=80',
  'https://images.unsplash.com/photo-1552346154-21d32810aba3?w=800&q=80',
  'https://images.unsplash.com/photo-1460353581641-37baddab0fa2?w=800&q=80',
  'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=800&q=80',
];

function generateSlug(name: string): string {
  return name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
}

function getRandomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomItem<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function getRandomItems<T>(arr: T[], count: number): T[] {
  const shuffled = [...arr].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}

async function seedProducts() {
  console.log('Starting product seeding...');

  let productCount = 0;

  for (const category of categories) {
    console.log(`\nSeeding ${category.name} products...`);

    for (let i = 1; i <= 15; i++) {
      const template = getRandomItem(productTemplates);
      const brand = getRandomItem(brands);
      const color = getRandomItem(colors);
      const color2 = getRandomItem(colors.filter(c => c.name !== color.name));
      const price = getRandomInt(template.priceRange[0], template.priceRange[1]);
      const originalPrice = Math.random() > 0.7 ? Math.round(price * 1.2) : null;
      const hasOriginalPrice = originalPrice !== null;

      const productName = `${template.name} ${template.suffix} ${i}`.trim();
      const slug = `${generateSlug(productName)}-${Date.now()}-${i}`;

      const isFeatured = i <= 3;
      const isTrending = i >= 4 && i <= 6;
      const isNew = i >= 1 && i <= 4;

      const product = {
        name: productName,
        slug: slug,
        description: `Premium ${category.name.toLowerCase()} from ${brand}. Features cutting-edge design with superior comfort and style. Perfect for those who dare to stand out.`,
        price: price,
        compare_at_price: originalPrice,
        brand: brand,
        category_id: category.id,
        images: getRandomItems(unsplashImages, 4),
        sizes: getRandomItems(sizes, getRandomInt(4, 7)),
        colors: getRandomItems([color, color2], getRandomInt(1, 2)),
        stock_quantity: getRandomInt(5, 50),
        is_active: true,
        is_featured: isFeatured,
        is_trending: isTrending,
        is_new: isNew,
        rating: getRandomInt(40, 50) / 10,
        review_count: getRandomInt(10, 300),
        tags: [category.id, ...(isFeatured ? ['featured'] : []), ...(isTrending ? ['trending'] : []), ...(isNew ? ['new'] : [])],
      };

      const { data, error } = await supabase.from('products').insert(product).select().single();

      if (error) {
        console.error(`Error seeding ${productName}:`, error.message);
      } else {
        productCount++;
        if (productCount % 20 === 0) {
          process.stdout.write('.');
        }
      }
    }
  }

  console.log(`\n\nSeeding complete! Created ${productCount} products.`);
}

// Insert categories first
async function seedCategories() {
  console.log('Seeding categories...');

  for (const cat of categories) {
    const { error } = await supabase.from('categories').upsert({
      id: cat.id,
      name: cat.name,
      slug: cat.id,
      is_active: true,
    }, { onConflict: 'id' });

    if (error) {
      console.log(`Category ${cat.name}: ${error.message}`);
    }
  }
}

async function main() {
  await seedCategories();
  await seedProducts();
}

main().catch(console.error);