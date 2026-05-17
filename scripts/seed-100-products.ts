// Generate 120 products (15 per category) with real images
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://totrmlacaryyqawkriiu.supabase.co';
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRvdHJtbGFjYXJ5eXFhd2tyaWl1Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3ODQwNTIxMiwiZXhwIjoyMDkzOTgxMjEyfQ.hNgamcGG4SHkGhydk6ddPYBTxJMYW4YCLcUem_j5fuY';

const supabase = createClient(supabaseUrl, supabaseKey);

const brands = [
  'NexWalk Original', 'NexWalk Active', 'NexWalk Classic', 'NexWalk Street',
  'NexWalk Adventure', 'NexWalk Comfort', 'NexWalk Limited', 'NexWalk Pro',
  'NexWalk Racing', 'NexWalk Heritage', 'NexWalk Elite', 'NexWalk Sport',
  'NexWalk Prime', 'NexWalk Core', 'NexWalk Force'
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
  { name: 'Pink', hex: '#ec4899' },
  { name: 'Yellow', hex: '#fbbf24' },
  { name: 'Purple', hex: '#8b5cf6' },
  { name: 'Camel', hex: '#c19a6b' },
  { name: 'Cream', hex: '#f5f5dc' },
  { name: 'Burgundy', hex: '#722f37' },
  { name: 'Teal', hex: '#008080' },
  { name: 'Olive', hex: '#808000' },
];

const sizes = ['US 5', 'US 6', 'US 7', 'US 8', 'US 9', 'US 10', 'US 11', 'US 12', 'US 13'];

const productPrefixes = [
  'Air', 'Ultra', 'Speed', 'Flex', 'Cloud', 'Nova', 'Titan', 'Pulse', 'Flow', 'Trail',
  'Street', 'Urban', 'Classic', 'Retro', 'Vintage', 'Elite', 'Pro', 'Max', 'Lite', 'Sport',
  'Runner', 'Walker', 'Step', 'Rise', 'Edge', 'Peak', 'Dash', 'Blaze', 'Surge', 'Glow',
  'Shadow', 'Neon', 'Midnight', 'Sunset', 'Dawn', 'Zen', 'Prime', 'Core', 'Strike', 'Rush',
  'Flash', 'Apex', 'Ignite', 'Momentum', 'Elevate', 'Summit', 'Horizon', 'Zenith', 'Vector', 'Kinetic'
];

const productSuffixes = [
  'Eclipse', 'Pro', 'Elite', 'Max', 'Plus', 'V2', 'V3', 'Limited', 'Special', 'Edition',
  'Retro', 'Classic', 'Modern', 'Ultra', 'Hyper', 'Mega', 'Super', 'Extreme', 'Premium', 'Basic',
  'Advanced', 'Revolution', 'Signature', 'Original', 'Premium', 'Standard', 'Deluxe', 'Essential', 'Performance'
];

const unsplashShoeImages = [
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
  'https://images.unsplash.com/photo-1584735175315-9d5df23be557?w=800&q=80',
  'https://images.unsplash.com/photo-1556048219-bb6c2e21bb20?w=800&q=80',
  'https://images.unsplash.com/photo-1587563871167-1ee9c631a4fc?w=800&q=80',
  'https://images.unsplash.com/photo-1512374382149-233c42b6a83b?w=800&q=80',
  'https://images.unsplash.com/photo-1539185441755-769473a23570?w=800&q=80',
  'https://images.unsplash.com/photo-1579338559194-a162d19bf842?w=800&q=80',
  'https://images.unsplash.com/photo-1614252235316-8c857d0b5858?w=800&q=80',
  'https://images.unsplash.com/photo-1626379953822-baec19c3accd?w=800&q=80',
  'https://images.unsplash.com/photo-1494496195158-c3becb4f2475?w=800&q=80',
  'https://images.unsplash.com/photo-1604671801908-6f0c6a08c204?w=800&q=80',
  'https://images.unsplash.com/photo-1595461135849-2b9e8c2c3c8c?w=800&q=80',
  'https://images.unsplash.com/photo-1556048219-bb6c2e21bb20?w=800&q=80',
  'https://images.unsplash.com/photo-1566241440091-ec10de8db2e1?w=800&q=80',
  'https://images.unsplash.com/photo-1534308986697-15bc59a56a38?w=800&q=80',
  'https://images.unsplash.com/photo-1491553895911-0055uj790f9c?w=800&q=80',
  'https://images.unsplash.com/photo-1542840410-8e93e2d0cc41?w=800&q=80',
  'https://images.unsplash.com/photo-1520639888713-7858d09d2f4e?w=800&q=80',
  'https://images.unsplash.com/photo-1580127868576-8a89f2f7516a?w=800&q=80',
  'https://images.unsplash.com/photo-1541592106381-b31e9677c0e5?w=800&q=80',
  'https://images.unsplash.com/photo-1518894781321-630e638d0742?w=800&q=80',
  'https://images.unsplash.com/photo-1600269452121-4f2416f55d5e?w=800&q=80',
  'https://images.unsplash.com/photo-1556906781-9a412961c28c?w=800&q=80',
  'https://images.unsplash.com/photo-1463100099107-aa0980c362e6?w=800&q=80',
  'https://images.unsplash.com/photo-1594736797933-d0401ba2fe65?w=800&q=80',
  'https://images.unsplash.com/photo-1582588678413-dbf45f0bece6?w=800&q=80',
  'https://images.unsplash.com/photo-1560762484-813fc69750e5?w=800&q=80',
  'https://images.unsplash.com/photo-1535078732259-0bb33b0709a6?w=800&q=80',
  'https://images.unsplash.com/photo-1515955656352-a1fa3ffcd111?w=800&q=80',
  'https://images.unsplash.com/photo-1605348532760-6753d2c43329?w=800&q=80',
  'https://images.unsplash.com/photo-1587563871167-1ee9c631a4fc?w=800&q=80',
  'https://images.unsplash.com/photo-1560769629-975ec94e6a86?w=800&q=80',
  'https://images.unsplash.com/photo-1603808033192-082d6919d3e1?w=800&q=80',
  'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&q=80',
  'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=800&q=80',
  'https://images.unsplash.com/photo-1600185365926-3a2ce3cdb9eb?w=800&q=80',
];

function getRandomElement(arr: any[]) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function getRandomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function generateSlug(name: string) {
  return name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '') + '-' + getRandomInt(1000, 9999);
}

function generateProductName(categoryName: string) {
  const prefix = getRandomElement(productPrefixes);
  const suffix = getRandomElement(productSuffixes);
  const styleNum = getRandomInt(100, 999);
  return `${prefix} ${suffix} ${styleNum}`;
}

async function seedProducts() {
  console.log('🔄 Starting product seeding...\n');

  // First, get all existing categories from the database
  console.log('📦 Fetching categories from database...');
  const { data: existingCategories, error: catError } = await supabase
    .from('categories')
    .select('id, name, slug');

  if (catError || !existingCategories || existingCategories.length === 0) {
    console.log('No categories found. Creating categories first...');

    // Create categories with UUIDs
    const categoryNames = ['Sneakers', 'Running', 'Casual', 'Sports', 'Loafers', 'Boots', 'Sandals', 'Formal'];
    const categoryData = categoryNames.map((name, i) => ({
      name,
      slug: name.toLowerCase(),
      description: `Premium ${name.toLowerCase()} for every style`,
      sort_order: i + 1,
    }));

    const { data: newCats, error: newCatError } = await supabase
      .from('categories')
      .insert(categoryData)
      .select();

    if (newCatError) {
      console.error('Error creating categories:', newCatError);
      return;
    }

    console.log(`  ✓ Created ${newCats?.length || 0} categories\n`);

    // Now generate products for each category
    for (const cat of newCats || []) {
      console.log(`Generating products for ${cat.name}...`);
      await generateProductsForCategory(cat.id, cat.name, 15);
    }
  } else {
    console.log(`  ✓ Found ${existingCategories.length} categories\n`);

    // Delete existing products first for clean slate
    console.log('🗑️  Clearing existing products...');
    await supabase.from('products').delete().neq('id', '00000000-0000-0000-0000-000000000000');

    // Generate products for each category
    for (const cat of existingCategories) {
      console.log(`Generating products for ${cat.name}...`);
      await generateProductsForCategory(cat.id, cat.name, 15);
    }
  }

  // Final count
  const { count } = await supabase
    .from('products')
    .select('*', { count: 'exact', head: true });

  console.log(`\n✅ Seeding complete! Total products: ${count || 0}`);
}

async function generateProductsForCategory(categoryId: string, categoryName: string, count: number) {
  const products = [];

  for (let i = 0; i < count; i++) {
    const name = generateProductName(categoryName);
    const brand = getRandomElement(brands);
    const basePrice = getRandomInt(5999, 39999);
    const hasDiscount = Math.random() > 0.75;
    const comparePrice = hasDiscount ? Math.round(basePrice * 1.2) : null;

    const numColors = getRandomInt(1, 3);
    const productColors = [];
    const shuffledColors = [...colors].sort(() => 0.5 - Math.random());
    for (let j = 0; j < numColors; j++) {
      productColors.push(shuffledColors[j]);
    }

    const numSizes = getRandomInt(5, 8);
    const productSizes = sizes.slice(0, numSizes);

    const numImages = getRandomInt(3, 5);
    const productImages = [];
    const shuffledImages = [...unsplashShoeImages].sort(() => 0.5 - Math.random());
    for (let j = 0; j < numImages; j++) {
      productImages.push(shuffledImages[j]);
    }

    const isFeatured = i < 3;
    const isTrending = i >= 3 && i < 6;
    const isNew = i < 5;

    products.push({
      name,
      slug: generateSlug(name),
      description: `Premium ${categoryName.toLowerCase()} from ${brand}. Features cutting-edge design with superior comfort and style. Perfect for those who dare to stand out.`,
      price: basePrice,
      compare_at_price: comparePrice,
      brand,
      category_id: categoryId,
      images: productImages,
      sizes: productSizes,
      colors: productColors,
      stock_quantity: getRandomInt(10, 100),
      is_active: true,
      is_featured: isFeatured,
      is_trending: isTrending,
      is_new: isNew,
      rating: (getRandomInt(38, 50) / 10).toFixed(1),
      review_count: getRandomInt(5, 300),
      tags: [categoryName.toLowerCase()],
    });
  }

  const { data, error } = await supabase.from('products').insert(products).select();

  if (error) {
    console.log(`  ❌ Error: ${error.message}`);
  } else {
    console.log(`  ✅ Added ${data?.length || 0} products`);
  }
}

seedProducts().catch(console.error);