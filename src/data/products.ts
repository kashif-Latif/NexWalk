import { Product } from '@/types';

// High-quality Unsplash shoe images
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
  'https://images.unsplash.com/photo-1543508282-6319a3e2621f?w=400',
  'https://images.unsplash.com/photo-1605348532760-6753d2c43329?w=400',
  'https://images.unsplash.com/photo-1460353581641-37baddab0fa2?w=400',
  'https://images.unsplash.com/photo-1552346154-21d32810aba3?w=400',
  'https://images.unsplash.com/photo-1560769629-975ec94e6a86?w=400',
  'https://images.unsplash.com/photo-1595341888016-a162d19bf842?w=400',
  'https://images.unsplash.com/photo-1584735175315-9d5df23be5c8?w=400',
  'https://images.unsplash.com/photo-1579338559194-a162d19bf842?w=400',
  'https://images.unsplash.com/photo-1539185441755-769473a23570?w=400',
  'https://images.unsplash.com/photo-1600269452121-4f2416e55c28?w=400',
  'https://images.unsplash.com/photo-1604671801908-6f0c6a092804?w=400',
  'https://images.unsplash.com/photo-1587563871167-1ee9c731aefb?w=400',
  'https://images.unsplash.com/photo-1602162608484-4a8d240d5c33?w=400',
  'https://images.unsplash.com/photo-1605051782670-9c07f0b7b4a5?w=400',
  'https://images.unsplash.com/photo-1597045566677-8cf032ed6634?w=400',
  'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400',
  'https://images.unsplash.com/photo-1603808033192-082d6919d3e1?w=400',
  'https://images.unsplash.com/photo-1606092195730-5d7b9af1efc5?w=400',
  'https://images.unsplash.com/photo-1614252235316-8c857d0b5858?w=400',
  'https://images.unsplash.com/photo-1626379953822-baec19c3accd?w=400',
];

// Sneakers - 30 unique products
const sneakers: Product[] = [
  { id: 's1', name: 'Air Max Pulse Eclipse', slug: 'air-max-pulse-eclipse', description: 'Premium sneakers with revolutionary air cushioning', price: 18500, original_price: 22000, images: [shoeImages[0]], category_id: 'sneakers', brand: 'NexWalk Original', stock: 15, sizes: ['US 7', 'US 8', 'US 9', 'US 10', 'US 11'], colors: [{ name: 'Black', hex: '#000000' }], rating: 4.8, review_count: 124, is_featured: true, is_trending: true, is_new: false, tags: ['bestseller', 'sale'], created_at: '2024-01-15', updated_at: '2024-01-15' },
  { id: 's2', name: 'Street Elite V2', slug: 'street-elite-v2', description: 'Bold statement sneakers for the streets', price: 15999, original_price: 18999, images: [shoeImages[1]], category_id: 'sneakers', brand: 'NexWalk Street', stock: 12, sizes: ['US 7', 'US 8', 'US 9', 'US 10'], colors: [{ name: 'Red', hex: '#dc2626' }], rating: 4.7, review_count: 67, is_featured: true, is_trending: true, is_new: false, tags: ['sale', 'trending'], created_at: '2024-01-05', updated_at: '2024-01-05' },
  { id: 's3', name: 'Neon Surge Limited', slug: 'neon-surge-limited', description: 'Limited edition glow sneakers', price: 28999, images: [shoeImages[6]], category_id: 'sneakers', brand: 'NexWalk Limited', stock: 3, sizes: ['US 8', 'US 9', 'US 10'], colors: [{ name: 'Neon', hex: '#39ff14' }], rating: 5.0, review_count: 12, is_featured: true, is_trending: true, is_new: true, tags: ['new', 'limited'], created_at: '2024-01-28', updated_at: '2024-01-28' },
  { id: 's4', name: 'Nova Step Pro', slug: 'nova-step-pro', description: 'Next generation step comfort', price: 17999, images: [shoeImages[10]], category_id: 'sneakers', brand: 'NexWalk Original', stock: 12, sizes: ['US 7', 'US 8', 'US 9', 'US 10'], colors: [{ name: 'Orange', hex: '#f97316' }], rating: 4.6, review_count: 92, is_featured: true, is_trending: false, is_new: true, tags: ['new'], created_at: '2024-01-26', updated_at: '2024-01-26' },
  { id: 's5', name: 'Shadow Runner X', slug: 'shadow-runner-x', description: 'Stealth mode activated', price: 16500, images: [shoeImages[2]], category_id: 'sneakers', brand: 'NexWalk Shadow', stock: 20, sizes: ['US 7', 'US 8', 'US 9', 'US 10', 'US 11'], colors: [{ name: 'Dark Gray', hex: '#374151' }], rating: 4.5, review_count: 78, is_featured: false, is_trending: true, is_new: false, tags: ['trending'], created_at: '2024-01-18', updated_at: '2024-01-18' },
  { id: 's6', name: 'Velocity Boost', slug: 'velocity-boost', description: 'Maximum speed performance', price: 22500, images: [shoeImages[3]], category_id: 'sneakers', brand: 'NexWalk Velocity', stock: 8, sizes: ['US 8', 'US 9', 'US 10', 'US 11'], colors: [{ name: 'Blue', hex: '#3b82f6' }], rating: 4.9, review_count: 156, is_featured: true, is_trending: true, is_new: false, tags: ['bestseller'], created_at: '2024-01-10', updated_at: '2024-01-10' },
  { id: 's7', name: 'Phantom Strike', slug: 'phantom-strike', description: 'Silent but deadly', price: 19999, images: [shoeImages[4]], category_id: 'sneakers', brand: 'NexWalk Phantom', stock: 10, sizes: ['US 7', 'US 8', 'US 9', 'US 10'], colors: [{ name: 'Black', hex: '#000000' }], rating: 4.7, review_count: 89, is_featured: true, is_trending: false, is_new: true, tags: ['new'], created_at: '2024-01-30', updated_at: '2024-01-30' },
  { id: 's8', name: 'Cosmic Drift', slug: 'cosmic-drift', description: 'Out of this world comfort', price: 24500, original_price: 28000, images: [shoeImages[11]], category_id: 'sneakers', brand: 'NexWalk Cosmic', stock: 6, sizes: ['US 8', 'US 9', 'US 10', 'US 11'], colors: [{ name: 'Purple', hex: '#8b5cf6' }], rating: 4.8, review_count: 45, is_featured: true, is_trending: true, is_new: false, tags: ['sale'], created_at: '2024-01-08', updated_at: '2024-01-08' },
  { id: 's9', name: 'Arctic White Premium', slug: 'arctic-white-premium', description: 'Pure snowy excellence', price: 17500, images: [shoeImages[5]], category_id: 'sneakers', brand: 'NexWalk Arctic', stock: 18, sizes: ['US 6', 'US 7', 'US 8', 'US 9', 'US 10'], colors: [{ name: 'White', hex: '#ffffff' }], rating: 4.6, review_count: 112, is_featured: false, is_trending: false, is_new: false, tags: ['classic'], created_at: '2024-01-12', updated_at: '2024-01-12' },
  { id: 's10', name: 'Midnight Express', slug: 'midnight-express', description: 'Fast track to style', price: 18999, images: [shoeImages[7]], category_id: 'sneakers', brand: 'NexWalk Express', stock: 14, sizes: ['US 7', 'US 8', 'US 9', 'US 10', 'US 11'], colors: [{ name: 'Navy', hex: '#1e3a5f' }], rating: 4.5, review_count: 67, is_featured: false, is_trending: true, is_new: false, tags: ['trending'], created_at: '2024-01-15', updated_at: '2024-01-15' },
  { id: 's11', name: 'Plasma Core', slug: 'plasma-core', description: 'Energy meets style', price: 21999, images: [shoeImages[12]], category_id: 'sneakers', brand: 'NexWalk Plasma', stock: 9, sizes: ['US 8', 'US 9', 'US 10'], colors: [{ name: 'Electric Blue', hex: '#06b6d4' }], rating: 4.8, review_count: 93, is_featured: true, is_trending: true, is_new: true, tags: ['new', 'trending'], created_at: '2024-02-01', updated_at: '2024-02-01' },
  { id: 's12', name: 'Solar Flare', slug: 'solar-flare', description: 'Hot on the streets', price: 16999, images: [shoeImages[13]], category_id: 'sneakers', brand: 'NexWalk Solar', stock: 16, sizes: ['US 7', 'US 8', 'US 9', 'US 10'], colors: [{ name: 'Gold', hex: '#f59e0b' }], rating: 4.4, review_count: 56, is_featured: false, is_trending: false, is_new: false, tags: ['popular'], created_at: '2024-01-20', updated_at: '2024-01-20' },
  { id: 's13', name: 'Titanium Edge', slug: 'titanium-edge', description: 'Built for the bold', price: 25999, images: [shoeImages[14]], category_id: 'sneakers', brand: 'NexWalk Titanium', stock: 5, sizes: ['US 9', 'US 10', 'US 11'], colors: [{ name: 'Silver', hex: '#9ca3af' }], rating: 4.9, review_count: 34, is_featured: true, is_trending: false, is_new: true, tags: ['new', 'premium'], created_at: '2024-02-05', updated_at: '2024-02-05' },
  { id: 's14', name: 'Cyber Punk', slug: 'cyber-punk', description: 'Future is now', price: 23500, original_price: 26000, images: [shoeImages[18]], category_id: 'sneakers', brand: 'NexWalk Cyber', stock: 7, sizes: ['US 7', 'US 8', 'US 9', 'US 10'], colors: [{ name: 'Neon Pink', hex: '#ec4899' }], rating: 4.7, review_count: 78, is_featured: true, is_trending: true, is_new: false, tags: ['sale', 'trending'], created_at: '2024-01-25', updated_at: '2024-01-25' },
  { id: 's15', name: 'Blaze Runner', slug: 'blaze-runner', description: 'Set your world on fire', price: 15500, images: [shoeImages[25]], category_id: 'sneakers', brand: 'NexWalk Blaze', stock: 22, sizes: ['US 6', 'US 7', 'US 8', 'US 9', 'US 10', 'US 11', 'US 12'], colors: [{ name: 'Orange', hex: '#ea580c' }], rating: 4.5, review_count: 145, is_featured: false, is_trending: true, is_new: false, tags: ['bestseller'], created_at: '2024-01-14', updated_at: '2024-01-14' },
  { id: 's16', name: 'Storm Chaser', slug: 'storm-chaser', description: 'Weather any storm', price: 19500, images: [shoeImages[26]], category_id: 'sneakers', brand: 'NexWalk Storm', stock: 11, sizes: ['US 7', 'US 8', 'US 9', 'US 10'], colors: [{ name: 'Gray', hex: '#6b7280' }], rating: 4.6, review_count: 89, is_featured: false, is_trending: false, is_new: false, tags: ['popular'], created_at: '2024-01-18', updated_at: '2024-01-18' },
  { id: 's17', name: 'Retro Wave', slug: 'retro-wave', description: 'Classic vibes modern comfort', price: 14500, images: [shoeImages[5]], category_id: 'sneakers', brand: 'NexWalk Retro', stock: 25, sizes: ['US 6', 'US 7', 'US 8', 'US 9', 'US 10', 'US 11'], colors: [{ name: 'Navy', hex: '#1e3a5f' }], rating: 4.4, review_count: 234, is_featured: false, is_trending: true, is_new: false, tags: ['classic', 'trending'], created_at: '2024-01-10', updated_at: '2024-01-10' },
  { id: 's18', name: 'Velocity X', slug: 'velocity-x', description: 'Speed demon edition', price: 27500, images: [shoeImages[16]], category_id: 'sneakers', brand: 'NexWalk Velocity', stock: 4, sizes: ['US 8', 'US 9', 'US 10'], colors: [{ name: 'Yellow', hex: '#facc15' }], rating: 4.9, review_count: 28, is_featured: true, is_trending: true, is_new: true, tags: ['new', 'limited'], created_at: '2024-02-10', updated_at: '2024-02-10' },
  { id: 's19', name: 'Neon Nights', slug: 'neon-nights', description: 'Glow in the dark', price: 18999, images: [shoeImages[24]], category_id: 'sneakers', brand: 'NexWalk Neon', stock: 13, sizes: ['US 7', 'US 8', 'US 9', 'US 10'], colors: [{ name: 'Green', hex: '#22c55e' }], rating: 4.6, review_count: 76, is_featured: false, is_trending: true, is_new: false, tags: ['trending'], created_at: '2024-01-22', updated_at: '2024-01-22' },
  { id: 's20', name: 'Obsidian Premium', slug: 'obsidian-premium', description: 'Dark elegance', price: 21500, images: [shoeImages[21]], category_id: 'sneakers', brand: 'NexWalk Obsidian', stock: 8, sizes: ['US 7', 'US 8', 'US 9', 'US 10', 'US 11'], colors: [{ name: 'Black', hex: '#000000' }], rating: 4.8, review_count: 112, is_featured: true, is_trending: false, is_new: false, tags: ['premium'], created_at: '2024-01-16', updated_at: '2024-01-16' },
  { id: 's21', name: 'Glacier Max', slug: 'glacier-max', description: 'Cool as ice', price: 16999, images: [shoeImages[19]], category_id: 'sneakers', brand: 'NexWalk Glacier', stock: 19, sizes: ['US 7', 'US 8', 'US 9', 'US 10'], colors: [{ name: 'Ice Blue', hex: '#bae6fd' }], rating: 4.5, review_count: 67, is_featured: false, is_trending: false, is_new: false, tags: [], created_at: '2024-01-19', updated_at: '2024-01-19' },
  { id: 's22', name: 'Thunderstrike', slug: 'thunderstrike', description: 'Power unleashed', price: 22999, images: [shoeImages[27]], category_id: 'sneakers', brand: 'NexWalk Thunder', stock: 6, sizes: ['US 8', 'US 9', 'US 10', 'US 11'], colors: [{ name: 'Yellow', hex: '#eab308' }], rating: 4.7, review_count: 54, is_featured: true, is_trending: true, is_new: false, tags: ['trending'], created_at: '2024-01-24', updated_at: '2024-01-24' },
  { id: 's23', name: 'Carbon Fiber Pro', slug: 'carbon-fiber-pro', description: 'Lightweight strength', price: 26500, images: [shoeImages[28]], category_id: 'sneakers', brand: 'NexWalk Carbon', stock: 5, sizes: ['US 9', 'US 10', 'US 11'], colors: [{ name: 'Black', hex: '#000000' }], rating: 4.9, review_count: 38, is_featured: true, is_trending: false, is_new: true, tags: ['new', 'premium'], created_at: '2024-02-08', updated_at: '2024-02-08' },
  { id: 's24', name: 'Urban Legend', slug: 'urban-legend', description: 'Street style icon', price: 15999, images: [shoeImages[20]], category_id: 'sneakers', brand: 'NexWalk Urban', stock: 17, sizes: ['US 7', 'US 8', 'US 9', 'US 10', 'US 11'], colors: [{ name: 'White', hex: '#ffffff' }], rating: 4.4, review_count: 98, is_featured: false, is_trending: true, is_new: false, tags: ['trending'], created_at: '2024-01-21', updated_at: '2024-01-21' },
  { id: 's25', name: 'Lava Flow', slug: 'lava-flow', description: 'Molten hot design', price: 18999, original_price: 22000, images: [shoeImages[0]], category_id: 'sneakers', brand: 'NexWalk Lava', stock: 10, sizes: ['US 7', 'US 8', 'US 9', 'US 10'], colors: [{ name: 'Red', hex: '#ef4444' }], rating: 4.6, review_count: 73, is_featured: false, is_trending: false, is_new: false, tags: ['sale'], created_at: '2024-01-17', updated_at: '2024-01-17' },
  { id: 's26', name: 'Galaxy Quest', slug: 'galaxy-quest', description: 'Explore the universe', price: 24500, images: [shoeImages[17]], category_id: 'sneakers', brand: 'NexWalk Galaxy', stock: 7, sizes: ['US 8', 'US 9', 'US 10'], colors: [{ name: 'Purple', hex: '#a855f7' }], rating: 4.8, review_count: 45, is_featured: true, is_trending: true, is_new: true, tags: ['new'], created_at: '2024-02-12', updated_at: '2024-02-12' },
  { id: 's27', name: 'Ocean Wave', slug: 'ocean-wave-sneakers', description: 'Ride the waves', price: 16500, images: [shoeImages[23]], category_id: 'sneakers', brand: 'NexWalk Ocean', stock: 15, sizes: ['US 7', 'US 8', 'US 9', 'US 10'], colors: [{ name: 'Teal', hex: '#14b8a6' }], rating: 4.5, review_count: 67, is_featured: false, is_trending: false, is_new: false, tags: [], created_at: '2024-01-26', updated_at: '2024-01-26' },
  { id: 's28', name: 'Forest Trek', slug: 'forest-trek', description: 'Nature companion', price: 15500, images: [shoeImages[3]], category_id: 'sneakers', brand: 'NexWalk Forest', stock: 20, sizes: ['US 6', 'US 7', 'US 8', 'US 9', 'US 10', 'US 11'], colors: [{ name: 'Green', hex: '#16a34a' }], rating: 4.4, review_count: 56, is_featured: false, is_trending: false, is_new: false, tags: [], created_at: '2024-01-28', updated_at: '2024-01-28' },
  { id: 's29', name: 'Desert Storm', slug: 'desert-storm-sneakers', description: 'Conquer the dunes', price: 18500, images: [shoeImages[22]], category_id: 'sneakers', brand: 'NexWalk Desert', stock: 12, sizes: ['US 7', 'US 8', 'US 9', 'US 10'], colors: [{ name: 'Tan', hex: '#d4a574' }], rating: 4.6, review_count: 78, is_featured: false, is_trending: false, is_new: false, tags: [], created_at: '2024-01-30', updated_at: '2024-01-30' },
  { id: 's30', name: 'Royal Crown', slug: 'royal-crown', description: 'Fit for royalty', price: 27500, images: [shoeImages[29]], category_id: 'sneakers', brand: 'NexWalk Royal', stock: 5, sizes: ['US 8', 'US 9', 'US 10', 'US 11'], colors: [{ name: 'Gold', hex: '#f59e0b' }], rating: 4.9, review_count: 34, is_featured: true, is_trending: true, is_new: true, tags: ['new', 'premium'], created_at: '2024-02-15', updated_at: '2024-02-15' },
];

// Running - 35 products
const running: Product[] = Array.from({ length: 35 }, (_, i) => ({
  id: `r${i + 1}`,
  name: ['Urban Runner', 'Flex Runner', 'Speed Demon', 'Marathon Pro', 'Trail Blazer', 'Cloud Stride', 'Power Rush', 'Sprint Master', 'Endurance Elite', 'Race Max', 'Peak Performance', 'Dynamic Fit', 'Swift Motion', 'Aero Flow', 'Velocity Plus', 'Race Ready', 'Quick Step', 'Hyper Sprint', 'Ultra Boost', 'Prime Runner', 'Elite Sprint', 'Pro Pace', 'Turbo Charge', 'Swift Strike', 'Power Drive', 'Max Velocity', 'Apex Runner', 'Zenith Sprint', 'Blaze Runner', 'Storm Runner', 'Thunder Run', 'Lightning Pace', 'Hurricane Sprint', 'Cyclone Run', 'Tempest Elite'][i],
  slug: `running-${['urban', 'flex', 'speed', 'marathon', 'trail', 'cloud', 'power', 'sprint', 'endurance', 'race', 'peak', 'dynamic', 'swift', 'aero', 'velocity', 'ready', 'quick', 'hyper', 'ultra', 'prime', 'elite', 'pro', 'turbo', 'strike', 'drive', 'max', 'apex', 'zenith', 'blaze', 'storm', 'thunder', 'lightning', 'cyclone', 'tempest'][i]}-${i + 1}`,
  description: `High-performance running shoe for maximum comfort and speed`,
  price: 12000 + (i * 500),
  original_price: i % 3 === 0 ? 15000 + (i * 500) : undefined,
  images: [shoeImages[i % shoeImages.length]],
  category_id: 'running',
  brand: i % 2 === 0 ? 'NexWalk Run' : 'NexWalk Active',
  stock: 10 + (i % 15),
  sizes: ['US 7', 'US 8', 'US 9', 'US 10', 'US 11'],
  colors: [{ name: ['Black', 'White', 'Blue', 'Red', 'Gray', 'Green', 'Orange'][i % 7], hex: ['#000000', '#ffffff', '#3b82f6', '#ef4444', '#6b7280', '#16a34a', '#f97316'][i % 7] }],
  rating: 4 + (i % 10) / 10,
  review_count: 20 + (i * 3),
  is_featured: i < 5,
  is_trending: i < 10,
  is_new: i < 15,
  tags: i % 4 === 0 ? ['new'] : i % 5 === 0 ? ['sale'] : [],
  created_at: `2024-01-${(i % 28) + 1}`,
  updated_at: `2024-01-${(i % 28) + 1}`,
}));

// Casual - 35 products
const casual: Product[] = Array.from({ length: 35 }, (_, i) => ({
  id: `c${i + 1}`,
  name: ['Classic Slip', 'Everyday Comfort', 'Street Style', 'Urban Classic', 'Comfort Plus', 'Daily Walk', 'City Walker', 'Easy Step', 'Relaxed Fit', 'Chill Vibe', 'Weekend Casuals', 'Life Style', 'Daily Driver', 'Easy Wear', 'Simple Steps', 'Modern Classic', 'Trend Setter', 'Style Statement', 'Casual Pro', ' Everyday Luxe', 'Basic Elite', 'Essential Walk', 'Modern Ease', 'Simple Luxe', 'Urban Ease', 'Street Luxe', 'Daily Comfort', 'Casual Luxe', 'Step In Style', 'Easy Luxe', 'Comfort Luxe', 'Style Luxe', 'Urban Casual', 'Chill Luxe', 'Weekend Style'][i],
  slug: `casual-${['classic', 'everyday', 'street', 'urban', 'comfort', 'daily', 'city', 'easy', 'relaxed', 'chill', 'weekend', 'life', 'driver', 'wear', 'simple', 'modern', 'trend', 'style', 'pro', 'luxe', 'basic', 'essential', 'ease', 'luxe', 'urban', 'daily', 'casual', 'step', 'easy', 'comfort', 'style', 'urban', 'chill', 'weekend'][i]}-${i + 1}`,
  description: `Comfortable casual shoe for everyday wear`,
  price: 8000 + (i * 400),
  original_price: i % 4 === 0 ? 12000 + (i * 400) : undefined,
  images: [shoeImages[(i + 5) % shoeImages.length]],
  category_id: 'casual',
  brand: i % 2 === 0 ? 'NexWalk Classic' : 'NexWalk Comfort',
  stock: 15 + (i % 20),
  sizes: ['US 6', 'US 7', 'US 8', 'US 9', 'US 10', 'US 11', 'US 12'],
  colors: [{ name: ['Black', 'White', 'Navy', 'Brown', 'Gray'][i % 5], hex: ['#000000', '#ffffff', '#1e3a5f', '#8b4513', '#6b7280'][i % 5] }],
  rating: 4 + (i % 15) / 15,
  review_count: 30 + (i * 4),
  is_featured: i < 6,
  is_trending: i < 12,
  is_new: i < 18,
  tags: i % 3 === 0 ? ['bestseller'] : i % 5 === 0 ? ['new'] : [],
  created_at: `2024-01-${(i % 28) + 1}`,
  updated_at: `2024-01-${(i % 28) + 1}`,
}));

// Sports - 30 products
const sports: Product[] = Array.from({ length: 30 }, (_, i) => ({
  id: `sp${i + 1}`,
  name: ['Basketball Pro', 'Court Master', 'Sports Elite', 'Athlete Choice', 'Training Max', 'Game Day', 'Sports Pro', 'Champion Gear', 'Team Elite', 'Sports Master', 'Performance Pro', 'Athletic Pro', 'Sports Max', 'Champion Elite', 'Training Gear', 'Game Pro', 'Court Elite', 'Sports Champion', 'Athletic Max', 'Pro Sports', 'Sport Elite', 'Champion Pro', 'Training Elite', 'Game Elite', 'Athletic Champion', 'Sports Pro Max', 'Champion Gear Pro', 'Training Champion', 'Game Champion', 'Pro Champion'][i],
  slug: `sports-${['basketball', 'court', 'elite', 'athlete', 'training', 'game', 'pro', 'champion', 'team', 'master', 'performance', 'athletic', 'max', 'champion', 'gear', 'game', 'court', 'champion', 'athletic', 'pro', 'elite', 'champion', 'training', 'game', 'athletic', 'sports', 'champion', 'training', 'game', 'pro'][i]}-${i + 1}`,
  description: `Professional sports shoe for athletic performance`,
  price: 15000 + (i * 600),
  original_price: i % 3 === 0 ? 20000 + (i * 600) : undefined,
  images: [shoeImages[(i + 3) % shoeImages.length]],
  category_id: 'sports',
  brand: i % 2 === 0 ? 'NexWalk Pro' : 'NexWalk Sport',
  stock: 8 + (i % 12),
  sizes: ['US 7', 'US 8', 'US 9', 'US 10', 'US 11'],
  colors: [{ name: ['Black', 'Red', 'Blue', 'Green', 'Orange'][i % 5], hex: ['#000000', '#ef4444', '#3b82f6', '#16a34a', '#f97316'][i % 5] }],
  rating: 4.2 + (i % 12) / 10,
  review_count: 25 + (i * 3),
  is_featured: i < 4,
  is_trending: i < 9,
  is_new: i < 14,
  tags: i % 4 === 0 ? ['trending'] : i % 6 === 0 ? ['new'] : [],
  created_at: `2024-01-${(i % 28) + 1}`,
  updated_at: `2024-01-${(i % 28) + 1}`,
}));

// Boots - 30 products
const boots: Product[] = Array.from({ length: 30 }, (_, i) => ({
  id: `b${i + 1}`,
  name: ['Chelsea Classic', 'Desert Boot', 'Combat Pro', 'Military Elite', 'Tactical Boot', 'Ranger Boot', 'Explorer Boot', 'Urban Boot', 'Hiking Pro', 'Winter Boot', 'Rugged Boot', 'Adventure Boot', 'Trekking Boot', 'Mountain Boot', 'Work Boot', 'Safety Boot', 'Steel Toe', 'Leather Boot', 'Suede Boot', 'Ankle Boot', 'Knee Boot', 'Mid Boot', 'Lace Boot', 'Zip Boot', 'Western Boot', 'Cowboy Boot', 'Snow Boot', 'Rain Boot', 'Tactical Pro', 'Ranger Pro'][i],
  slug: `boots-${['chelsea', 'desert', 'combat', 'military', 'tactical', 'ranger', 'explorer', 'urban', 'hiking', 'winter', 'rugged', 'adventure', 'trekking', 'mountain', 'work', 'safety', 'steel', 'leather', 'suede', 'ankle', 'knee', 'mid', 'lace', 'zip', 'western', 'cowboy', 'snow', 'rain', 'tactical', 'ranger'][i]}-${i + 1}`,
  description: `Robust and stylish boot for all occasions`,
  price: 18000 + (i * 700),
  original_price: i % 3 === 0 ? 25000 + (i * 700) : undefined,
  images: [shoeImages[(i + 8) % shoeImages.length]],
  category_id: 'boots',
  brand: i % 2 === 0 ? 'NexWalk Boots' : 'NexWalk Rugged',
  stock: 6 + (i % 10),
  sizes: ['US 7', 'US 8', 'US 9', 'US 10', 'US 11', 'US 12'],
  colors: [{ name: ['Black', 'Brown', 'Tan', 'Gray', 'Red'][i % 5], hex: ['#000000', '#8b4513', '#d4a574', '#6b7280', '#dc2626'][i % 5] }],
  rating: 4.4 + (i % 10) / 10,
  review_count: 20 + (i * 3),
  is_featured: i < 5,
  is_trending: i < 10,
  is_new: i < 15,
  tags: i % 4 === 0 ? ['winter'] : i % 5 === 0 ? ['sale'] : [],
  created_at: `2024-01-${(i % 28) + 1}`,
  updated_at: `2024-01-${(i % 28) + 1}`,
}));

// Loafers - 25 products
const loafers: Product[] = Array.from({ length: 25 }, (_, i) => ({
  id: `l${i + 1}`,
  name: ['Classic Penny', 'Leather Slip', 'Office Luxe', 'Business Pro', 'Formal Classic', 'Elegant Slip', 'Office Elite', 'Business Luxe', 'Formal Pro', 'Classic Luxe', 'Elegant Pro', 'Office Pro', 'Business Elite', 'Formal Elite', 'Classic Elite', 'Elegant Elite', 'Office Luxe Pro', 'Business Pro Luxe', 'Formal Luxe Elite', 'Classic Pro Luxe', 'Elegant Luxe Pro', 'Office Elite Luxe', 'Business Elite Pro', 'Formal Elite Luxe', 'Classic Luxe Elite'][i],
  slug: `loafers-${['penny', 'leather', 'office', 'business', 'formal', 'elegant', 'office', 'business', 'formal', 'classic', 'elegant', 'office', 'business', 'formal', 'classic', 'elegant', 'office', 'business', 'formal', 'classic', 'elegant', 'office', 'business', 'formal', 'classic'][i]}-${i + 1}`,
  description: `Elegant loafer for work or casual occasions`,
  price: 10000 + (i * 500),
  original_price: i % 4 === 0 ? 15000 + (i * 500) : undefined,
  images: [shoeImages[(i + 29) % shoeImages.length]],
  category_id: 'loafers',
  brand: i % 2 === 0 ? 'NexWalk Formal' : 'NexWalk Luxury',
  stock: 12 + (i % 10),
  sizes: ['US 6', 'US 7', 'US 8', 'US 9', 'US 10', 'US 11'],
  colors: [{ name: ['Black', 'Brown', 'Tan', 'Navy'][i % 4], hex: ['#000000', '#8b4513', '#d4a574', '#1e3a5f'][i % 4] }],
  rating: 4.3 + (i % 12) / 10,
  review_count: 15 + (i * 2),
  is_featured: i < 4,
  is_trending: i < 8,
  is_new: i < 10,
  tags: i % 3 === 0 ? ['premium'] : [],
  created_at: `2024-01-${(i % 28) + 1}`,
  updated_at: `2024-01-${(i % 28) + 1}`,
}));

// Sandals - 25 products
const sandals: Product[] = Array.from({ length: 25 }, (_, i) => ({
  id: `sa${i + 1}`,
  name: ['Summer Breeze', 'Beach Comfort', 'Pool Slide', 'Outdoor Trek', 'Fisherman Sandal', 'Strappy Summer', 'Gladiator Sandal', 'Slip On Sandal', 'Comfort Slide', 'Beach Walk', 'Outdoor Pro', 'Summer Luxe', 'Beach Pro', 'Pool Luxe', 'Outdoor Luxe', 'Summer Pro', 'Beach Elite', 'Pool Elite', 'Outdoor Elite', 'Summer Elite', 'Beach Champion', 'Pool Champion', 'Outdoor Champion', 'Summer Champion', 'Beach Master'][i],
  slug: `sandals-${['summer', 'beach', 'pool', 'outdoor', 'fisherman', 'strappy', 'gladiator', 'slip', 'comfort', 'beach', 'outdoor', 'summer', 'beach', 'pool', 'outdoor', 'summer', 'beach', 'pool', 'outdoor', 'summer', 'beach', 'pool', 'outdoor', 'summer', 'beach'][i]}-${i + 1}`,
  description: `Comfortable sandal for summer days`,
  price: 5000 + (i * 300),
  original_price: i % 5 === 0 ? 8000 + (i * 300) : undefined,
  images: [shoeImages[(i + 9) % shoeImages.length]],
  category_id: 'sandals',
  brand: i % 2 === 0 ? 'NexWalk Summer' : 'NexWalk Beach',
  stock: 20 + (i % 15),
  sizes: ['US 6', 'US 7', 'US 8', 'US 9', 'US 10', 'US 11'],
  colors: [{ name: ['Brown', 'Black', 'Tan', 'Blue', 'Green'][i % 5], hex: ['#8b4513', '#000000', '#d4a574', '#3b82f6', '#16a34a'][i % 5] }],
  rating: 4 + (i % 15) / 15,
  review_count: 25 + (i * 4),
  is_featured: i < 4,
  is_trending: i < 8,
  is_new: i < 12,
  tags: i % 3 === 0 ? ['summer'] : [],
  created_at: `2024-01-${(i % 28) + 1}`,
  updated_at: `2024-01-${(i % 28) + 1}`,
}));

// Formal - 25 products
const formal: Product[] = Array.from({ length: 25 }, (_, i) => ({
  id: `f${i + 1}`,
  name: ['Oxford Classic', 'Derby Elegance', 'Brogue Premium', 'Monk Strap', 'Two Tone Classic', 'Patent Leather', 'Plain Oxford', 'Cap Toe Pro', 'Whole Cut Elegance', 'Oxford Luxe', 'Derby Luxe', 'Brogue Luxe', 'Monk Luxe', 'Two Tone Luxe', 'Patent Luxe', 'Plain Luxe', 'Cap Toe Luxe', 'Whole Cut Luxe', 'Oxford Elite', 'Derby Elite', 'Brogue Elite', 'Monk Elite', 'Two Tone Elite', 'Patent Elite', 'Plain Elite'][i],
  slug: `formal-${['oxford', 'derby', 'brogue', 'monk', 'two-tone', 'patent', 'plain', 'cap-toe', 'whole-cut', 'oxford', 'derby', 'brogue', 'monk', 'two-tone', 'patent', 'plain', 'cap-toe', 'whole-cut', 'oxford', 'derby', 'brogue', 'monk', 'two-tone', 'patent', 'plain'][i]}-${i + 1}`,
  description: `Sophisticated formal shoe for business occasions`,
  price: 15000 + (i * 600),
  original_price: i % 4 === 0 ? 22000 + (i * 600) : undefined,
  images: [shoeImages[(i + 15) % shoeImages.length]],
  category_id: 'formal',
  brand: i % 2 === 0 ? 'NexWalk Formal' : 'NexWalk Classic',
  stock: 8 + (i % 12),
  sizes: ['US 6', 'US 7', 'US 8', 'US 9', 'US 10', 'US 11', 'US 12'],
  colors: [{ name: ['Black', 'Brown', 'Tan', 'Navy'][i % 4], hex: ['#000000', '#8b4513', '#d4a574', '#1e3a5f'][i % 4] }],
  rating: 4.5 + (i % 8) / 10,
  review_count: 15 + (i * 2),
  is_featured: i < 5,
  is_trending: i < 8,
  is_new: i < 10,
  tags: i % 3 === 0 ? ['office'] : i % 5 === 0 ? ['premium'] : [],
  created_at: `2024-01-${(i % 28) + 1}`,
  updated_at: `2024-01-${(i % 28) + 1}`,
}));

export const allProducts: Product[] = [
  ...sneakers,
  ...running,
  ...casual,
  ...sports,
  ...boots,
  ...loafers,
  ...sandals,
  ...formal,
];

export const getProductsByCategory = (category: string): Product[] => {
  return allProducts.filter(p => p.category_id === category);
};

export const getFeaturedProducts = (): Product[] => {
  return allProducts.filter(p => p.is_featured).slice(0, 12);
};

export const getNewProducts = (): Product[] => {
  return allProducts.filter(p => p.is_new).slice(0, 12);
};

export const getTrendingProducts = (): Product[] => {
  return allProducts.filter(p => p.is_trending).slice(0, 12);
};

export const allSneakers = sneakers;

export default allProducts;