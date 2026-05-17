'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import {
  ArrowRight,
  Truck,
  Shield,
  RotateCcw,
  CreditCard,
  Star,
  Sparkles,
  Zap,
  Heart,
  ChevronRight,
} from 'lucide-react';
import ProductCard from '@/components/product/ProductCard';
import { productService, categoryService, type DbProduct, type DbCategory } from '@/lib/db';
import type { Product } from '@/types';

const features = [
  {
    icon: Truck,
    title: 'Fast Delivery',
    description: 'Free shipping on orders above PKR 3,000. Delivery within 2-5 business days.',
  },
  {
    icon: Shield,
    title: 'Premium Quality',
    description: 'Authentic products with quality guarantee. 100% genuine merchandise.',
  },
  {
    icon: RotateCcw,
    title: 'Easy Returns',
    description: '14-day hassle-free return policy. No questions asked.',
  },
  {
    icon: CreditCard,
    title: 'Secure Payments',
    description: 'Multiple payment options including COD, JazzCash, and Easypaisa.',
  },
];

const categoryIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  sneakers: Sparkles,
  running: Zap,
  casual: Heart,
  sports: Star,
  loafers: Star,
  boots: Star,
  sandals: Heart,
  formal: Shield,
};

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 },
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

export default function HomepageClient() {
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [newArrivals, setNewArrivals] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Array<{ name: string; slug: string; icon: React.ComponentType<{ className?: string }>; count: number }>>([]);
  const [totalProducts, setTotalProducts] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [featuredRes, newRes, catsWithCount] = await Promise.all([
          productService.getFeatured(8),
          productService.getNewArrivals(8),
          categoryService.getProductCountByCategory(),
        ]);

        // Map DB products to Product type
        const mapProduct = (p: DbProduct & { categories?: DbCategory | null }): Product => ({
          id: p.id,
          name: p.name,
          slug: p.slug,
          description: p.description || '',
          price: p.price,
          compare_at_price: p.compare_at_price ?? undefined,
          original_price: p.compare_at_price ?? undefined,
          images: p.images || [],
          category_id: p.category_id || '',
          brand: p.brand || '',
          stock_quantity: p.stock_quantity || 0,
          stock: p.stock_quantity || 0,
          sizes: p.sizes || [],
          colors: (p.colors as unknown as { name: string; hex: string }[]) || [],
          rating: p.rating || 0,
          review_count: p.review_count || 0,
          is_featured: p.is_featured || false,
          is_trending: p.is_trending || false,
          is_new: p.is_new || false,
          is_active: p.is_active ?? true,
          tags: p.tags || [],
          created_at: p.created_at || '',
          updated_at: p.updated_at || '',
        });

        setFeaturedProducts((featuredRes.data || []).map(mapProduct));
        setNewArrivals((newRes.data || []).map(mapProduct));

        const totalCount = catsWithCount.reduce((sum, cat) => sum + cat.productCount, 0);
        setTotalProducts(totalCount);

        setCategories(
          catsWithCount.map((cat) => ({
            name: cat.name.charAt(0).toUpperCase() + cat.name.slice(1),
            slug: cat.slug,
            icon: categoryIcons[cat.slug] || Star,
            count: cat.productCount,
          }))
        );
      } catch (error) {
        console.error('Error fetching homepage data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[90vh] flex items-center justify-center overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#0a0a0a] via-[#1a1a1a] to-[#0a0a0a]">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-orange-500/10 via-transparent to-transparent" />
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-orange-500/20 rounded-full blur-[128px]" />
          <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-orange-600/10 rounded-full blur-[96px]" />
        </div>

        {/* Floating Elements */}
        <motion.div
          className="absolute top-20 left-10 w-32 h-32 border border-orange-500/20 rounded-full"
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
        />
        <motion.div
          className="absolute bottom-32 right-20 w-24 h-24 border border-white/10 rounded-full"
          animate={{ rotate: -360 }}
          transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
        />

        {/* Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.span
              className="inline-flex items-center gap-2 text-orange-500 text-sm font-medium mb-6 px-4 py-2 rounded-full bg-orange-500/10 border border-orange-500/20"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
            >
              <Sparkles className="w-4 h-4" />
              New Collection 2024
            </motion.span>

            <h1 className="text-5xl sm:text-6xl lg:text-8xl font-bold mb-6">
              <span className="text-white">Step Into</span>
              <br />
              <span className="bg-gradient-to-r from-orange-500 to-orange-600 bg-clip-text text-transparent">
                Style
              </span>
            </h1>

            <p className="text-gray-400 text-lg sm:text-xl max-w-2xl mx-auto mb-10">
              Discover premium sneakers and footwear that define your unique style.
              From street to runway, NexWalk has you covered.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  href="/shop"
                  className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 rounded-full font-semibold text-lg transition-all shadow-lg shadow-orange-500/25"
                >
                  Shop Now
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  href="/shop?sort=newest"
                  className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white px-8 py-4 rounded-full font-semibold text-lg transition-all border border-white/20"
                >
                  New Arrivals
                </Link>
              </motion.div>
            </div>

            {/* Stats */}
            <motion.div
              className="flex justify-center gap-12 mt-16"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              {[
                { value: '10K+', label: 'Happy Customers' },
                { value: loading ? '...' : totalProducts.toString(), label: 'Products' },
                { value: '50+', label: 'Brands' },
              ].map((stat, i) => (
                <div key={i} className="text-center">
                  <div className="text-3xl font-bold text-white">{stat.value}</div>
                  <div className="text-gray-500 text-sm">{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className="w-6 h-10 rounded-full border-2 border-white/30 flex items-start justify-center p-2">
            <motion.div
              className="w-1.5 h-1.5 bg-orange-500 rounded-full"
              animate={{ y: [0, 16, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </div>
        </motion.div>
      </section>

      {/* Featured Products */}
      <section className="py-20 bg-[#0a0a0a]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="flex items-end justify-between mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div>
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-2">
                Featured Products
              </h2>
              <p className="text-gray-400">Hand-picked just for you</p>
            </div>
            <Link
              href="/shop"
              className="hidden sm:flex items-center gap-2 text-orange-500 hover:text-orange-400 font-medium"
            >
              View All
              <ChevronRight className="w-4 h-4" />
            </Link>
          </motion.div>

          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="bg-white/5 rounded-2xl animate-pulse aspect-[3/4]" />
              ))}
            </div>
          ) : (
            <motion.div
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
              variants={staggerContainer}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
            >
              {featuredProducts.slice(0, 8).map((product) => (
                <motion.div key={product.id} variants={fadeInUp}>
                  <ProductCard product={product} />
                </motion.div>
              ))}
            </motion.div>
          )}

          <Link
            href="/shop"
            className="sm:hidden flex items-center justify-center gap-2 text-orange-500 hover:text-orange-400 font-medium mt-8"
          >
            View All Products
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* Categories */}
      <section className="py-20 bg-gradient-to-b from-[#0a0a0a] to-[#111]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Shop by Category
            </h2>
            <p className="text-gray-400">Find your perfect fit</p>
          </motion.div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {categories.map((category, i) => (
              <motion.div
                key={category.slug}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <Link
                  href={`/shop?category=${category.slug}`}
                  className="group block bg-white/5 hover:bg-white/10 border border-white/10 hover:border-orange-500/30 rounded-2xl p-6 transition-all"
                >
                  <div className="w-14 h-14 bg-orange-500/10 rounded-xl flex items-center justify-center mb-4 group-hover:bg-orange-500/20 transition-colors">
                    <category.icon className="w-7 h-7 text-orange-500" />
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-1 group-hover:text-orange-500 transition-colors">
                    {category.name}
                  </h3>
                  <p className="text-gray-500 text-sm">{category.count} Products</p>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* New Arrivals */}
      <section className="py-20 bg-[#111]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="flex items-end justify-between mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div>
              <span className="text-orange-500 text-sm font-medium mb-2 block">
                JUST DROPPED
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold text-white">
                New Arrivals
              </h2>
            </div>
            <Link
              href="/shop?sort=newest"
              className="hidden sm:flex items-center gap-2 text-orange-500 hover:text-orange-400 font-medium"
            >
              See All New
              <ChevronRight className="w-4 h-4" />
            </Link>
          </motion.div>

          {/* Horizontal Scroll Container */}
          <div className="overflow-x-auto pb-4 -mx-4 px-4 scrollbar-hide">
            <div className="flex gap-6 w-max">
              {loading ? (
                [...Array(3)].map((_, i) => (
                  <div key={i} className="w-[320px] flex-shrink-0 bg-white/5 rounded-2xl animate-pulse aspect-[3/4]" />
                ))
              ) : (
                newArrivals.slice(0, 8).map((product) => (
                  <motion.div
                    key={product.id}
                    className="w-[320px] flex-shrink-0"
                    initial={{ opacity: 0, x: 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                  >
                    <ProductCard product={product} />
                  </motion.div>
                ))
              )}

              {/* View All Card */}
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
              >
                <Link
                  href="/shop?sort=newest"
                  className="w-[320px] h-full min-h-[400px] flex flex-col items-center justify-center bg-white/5 hover:bg-white/10 border border-dashed border-white/20 rounded-2xl transition-all"
                >
                  <div className="w-16 h-16 bg-orange-500/10 rounded-full flex items-center justify-center mb-4">
                    <ArrowRight className="w-8 h-8 text-orange-500" />
                  </div>
                  <span className="text-white font-semibold">Explore All New</span>
                  <span className="text-gray-500 text-sm mt-1">Latest drops await</span>
                </Link>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-[#0a0a0a]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Why Choose NexWalk
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              We are committed to providing the best shopping experience with quality products and exceptional service.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, i) => (
              <motion.div
                key={feature.title}
                className="bg-white/5 border border-white/10 rounded-2xl p-8 text-center hover:border-orange-500/30 transition-all"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -4 }}
              >
                <div className="w-16 h-16 bg-orange-500/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <feature.icon className="w-8 h-8 text-orange-500" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-20 bg-gradient-to-b from-[#0a0a0a] to-[#111]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className="text-orange-500 text-sm font-medium mb-4 block">
              STAY UPDATED
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Get Exclusive Deals
            </h2>
            <p className="text-gray-400 mb-8">
              Subscribe to our newsletter and get 10% off your first order plus early access to new arrivals and special promotions.
            </p>

            <form className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 bg-white/10 border border-white/20 rounded-full px-6 py-4 text-white placeholder:text-gray-400 focus:outline-none focus:border-orange-500 transition-colors"
              />
              <motion.button
                type="submit"
                className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 rounded-full font-semibold transition-colors flex items-center justify-center gap-2"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Subscribe
                <ArrowRight className="w-5 h-5" />
              </motion.button>
            </form>

            <p className="text-gray-500 text-sm mt-4">
              No spam, unsubscribe at any time.
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  );
}