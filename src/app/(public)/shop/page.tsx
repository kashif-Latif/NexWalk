'use client';

import { useState, useEffect, useMemo, Suspense, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSearchParams } from 'next/navigation';
import { Filter, X, ChevronDown, Grid, List, SlidersHorizontal, Loader2 } from 'lucide-react';
import ProductCard from '@/components/product/ProductCard';
import { Product } from '@/types';
import { productService, categoryService, type DbProduct, type DbCategory } from '@/lib/db';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

const sortOptions = [
  { name: 'Newest', value: 'newest' },
  { name: 'Price: Low to High', value: 'price_asc' },
  { name: 'Price: High to Low', value: 'price_desc' },
  { name: 'Popularity', value: 'popular' },
];

const priceRanges = [
  { name: 'Under PKR 10,000', min: 0, max: 10000 },
  { name: 'PKR 10,000 - 15,000', min: 10000, max: 15000 },
  { name: 'PKR 15,000 - 20,000', min: 15000, max: 20000 },
  { name: 'PKR 20,000 - 30,000', min: 20000, max: 30000 },
  { name: 'Above PKR 30,000', min: 30000, max: Infinity },
];

const ITEMS_PER_PAGE = 24;

// Helper to map DB product to Product type
function mapDbProduct(p: DbProduct & { categories?: DbCategory | null }): Product {
  return {
    id: p.id as string,
    name: p.name as string,
    slug: p.slug as string,
    description: (p.description as string) || '',
    price: p.price as number,
    compare_at_price: p.compare_at_price as number | undefined,
    original_price: p.compare_at_price as number | undefined,
    images: (p.images as string[]) || [],
    category_id: (p.category_id as string) || '',
    brand: (p.brand as string) || '',
    stock_quantity: (p.stock_quantity as number) || 0,
    stock: (p.stock_quantity as number) || 0,
    sizes: (p.sizes as string[]) || [],
    colors: (p.colors as unknown as { name: string; hex: string }[]) || [],
    rating: (p.rating as number) || 0,
    review_count: (p.review_count as number) || 0,
    is_featured: (p.is_featured as boolean) || false,
    is_trending: (p.is_trending as boolean) || false,
    is_new: (p.is_new as boolean) || false,
    is_active: (p.is_active as boolean) || true,
    tags: (p.tags as string[]) || [],
    created_at: (p.created_at as string) || '',
    updated_at: (p.updated_at as string) || '',
  };
}

// Reusable sidebar filters content
function SidebarFilters({
  categories,
  selectedCategory,
  selectedPriceRange,
  updateFilter,
  setSelectedPriceRange,
  setCurrentPage,
}: {
  categories: Array<{ id: string; name: string; slug: string }>;
  selectedCategory: string;
  selectedPriceRange: typeof priceRanges[0] | null;
  updateFilter: (type: 'category' | 'price', value: string | typeof priceRanges[0]) => void;
  setSelectedPriceRange: (val: typeof priceRanges[0] | null) => void;
  setCurrentPage: (val: number) => void;
}) {
  return (
    <>
      {/* Categories */}
      <div className="mb-8">
        <h3 className="text-sm font-semibold text-white mb-4 uppercase tracking-wider">
          Categories
        </h3>
        <div className="space-y-2">
          <button
            onClick={() => updateFilter('category', 'all')}
            className={`block w-full text-left px-4 py-2 rounded-lg text-sm transition-colors ${
              selectedCategory === 'all'
                ? 'bg-orange-500/20 text-orange-500'
                : 'text-gray-400 hover:bg-white/5 hover:text-white'
            }`}
          >
            All Products
          </button>
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => updateFilter('category', cat.id)}
              className={`block w-full text-left px-4 py-2 rounded-lg text-sm transition-colors ${
                selectedCategory === cat.id
                  ? 'bg-orange-500/20 text-orange-500'
                  : 'text-gray-400 hover:bg-white/5 hover:text-white'
              }`}
            >
              {cat.name.charAt(0).toUpperCase() + cat.name.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Price Range */}
      <div className="mb-8">
        <h3 className="text-sm font-semibold text-white mb-4 uppercase tracking-wider">
          Price Range
        </h3>
        <div className="space-y-2">
          <button
            onClick={() => {
              setSelectedPriceRange(null);
              setCurrentPage(1);
            }}
            className={`block w-full text-left px-4 py-2 rounded-lg text-sm transition-colors ${
              selectedPriceRange === null
                ? 'bg-orange-500/20 text-orange-500'
                : 'text-gray-400 hover:bg-white/5 hover:text-white'
            }`}
          >
            All Prices
          </button>
          {priceRanges.map((range) => (
            <button
              key={range.name}
              onClick={() => updateFilter('price', range)}
              className={`block w-full text-left px-4 py-2 rounded-lg text-sm transition-colors ${
                selectedPriceRange?.name === range.name
                  ? 'bg-orange-500/20 text-orange-500'
                  : 'text-gray-400 hover:bg-white/5 hover:text-white'
              }`}
            >
              {range.name}
            </button>
          ))}
        </div>
      </div>
    </>
  );
}

function ShopContent() {
  const searchParams = useSearchParams();
  const [showFilters, setShowFilters] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Array<{ id: string; name: string; slug: string }>>([]);
  const [loading, setLoading] = useState(true);

  // Filter states
  const [selectedCategory, setSelectedCategory] = useState(
    searchParams.get('category') || 'all'
  );
  const [selectedPriceRange, setSelectedPriceRange] = useState<typeof priceRanges[0] | null>(null);
  const [selectedSort, setSelectedSort] = useState(searchParams.get('sort') || 'newest');
  const [currentPage, setCurrentPage] = useState(1);

  // Fetch categories and products
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        // Fetch categories
        const cats = await categoryService.getAll();
        setCategories(cats.map(c => ({ id: c.id, name: c.name, slug: c.slug })));

        // Fetch products
        const result = await productService.getAll({ sort: selectedSort as 'newest' | 'price_asc' | 'price_desc' | 'popular' });
        setProducts((result.data || []).map(mapDbProduct));
      } catch (error) {
        console.error('Error fetching shop data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [selectedSort]);

  // Filter and sort products client-side for category and price
  const filteredProducts = useMemo(() => {
    let result = [...products];

    // Category filter
    if (selectedCategory !== 'all') {
      result = result.filter((p) => p.category_id === selectedCategory);
    }

    // Price range filter
    if (selectedPriceRange) {
      result = result.filter(
        (p) => p.price >= selectedPriceRange.min && p.price < selectedPriceRange.max
      );
    }

    return result;
  }, [products, selectedCategory, selectedPriceRange]);

  // Pagination
  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  // Reset page when filters change
  const updateFilter = useCallback((type: 'category' | 'price', value: string | typeof priceRanges[0]) => {
    setCurrentPage(1);
    if (type === 'category') {
      setSelectedCategory(value as string);
    } else {
      setSelectedPriceRange(value as typeof priceRanges[0]);
    }
  }, []);

  const clearFilters = useCallback(() => {
    setSelectedCategory('all');
    setSelectedPriceRange(null);
    setCurrentPage(1);
  }, []);

  const hasActiveFilters = selectedCategory !== 'all' || selectedPriceRange !== null;

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-orange-500 animate-spin" />
      </div>
    );
  }

  const sidebarFilters = (
    <SidebarFilters
      categories={categories}
      selectedCategory={selectedCategory}
      selectedPriceRange={selectedPriceRange}
      updateFilter={updateFilter}
      setSelectedPriceRange={setSelectedPriceRange}
      setCurrentPage={setCurrentPage}
    />
  );

  return (
    <>
      <Navbar />
    <div className="min-h-screen bg-[#0a0a0a]">
      {/* Header */}
      <section className="bg-gradient-to-b from-[#111] to-[#0a0a0a] pt-8 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h1
            className="text-3xl sm:text-4xl font-bold text-white mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            Shop All Products
          </motion.h1>
          <motion.p
            className="text-gray-400"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            {filteredProducts.length} products found
          </motion.p>
        </div>
      </section>

      {/* Main Content */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Toolbar */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-8">
          <div className="flex items-center gap-4">
            {/* Filter Toggle (Mobile) */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="lg:hidden flex items-center gap-2 px-4 py-2 bg-white/10 rounded-lg text-white hover:bg-white/20 transition-colors"
            >
              <SlidersHorizontal className="w-4 h-4" />
              Filters
              {hasActiveFilters && (
                <span className="w-2 h-2 bg-orange-500 rounded-full" />
              )}
            </button>

            {/* Clear Filters */}
            {hasActiveFilters && (
              <button
                onClick={clearFilters}
                className="text-sm text-orange-500 hover:text-orange-400"
              >
                Clear filters
              </button>
            )}
          </div>

          <div className="flex items-center gap-4">
            {/* Sort Dropdown */}
            <div className="relative">
              <select
                value={selectedSort}
                onChange={(e) => {
                  setSelectedSort(e.target.value);
                  setCurrentPage(1);
                }}
                className="appearance-none bg-white/10 border border-white/20 rounded-lg px-4 py-2 pr-10 text-white text-sm focus:outline-none focus:border-orange-500 cursor-pointer [&>option]:bg-[#1a1a1a] [&>option]:text-white"
              >
                {sortOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.name}
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
            </div>

            {/* View Mode Toggle */}
            <div className="hidden sm:flex items-center gap-1 bg-white/10 rounded-lg p-1">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded ${viewMode === 'grid' ? 'bg-orange-500 text-white' : 'text-gray-400 hover:text-white'}`}
              >
                <Grid className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded ${viewMode === 'list' ? 'bg-orange-500 text-white' : 'text-gray-400 hover:text-white'}`}
              >
                <List className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        <div className="flex gap-4 lg:gap-8">
          {/* Desktop Sidebar - always visible on lg+ */}
          <aside className="hidden lg:block lg:w-64 flex-shrink-0">
            {sidebarFilters}
          </aside>

          {/* Mobile Filters Overlay */}
          <AnimatePresence>
            {showFilters && (
              <motion.aside
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-50 bg-[#0a0a0a] p-4 overflow-auto lg:hidden"
              >
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-lg font-semibold text-white">Filters</h2>
                  <button onClick={() => setShowFilters(false)}>
                    <X className="w-6 h-6 text-white" />
                  </button>
                </div>
                {sidebarFilters}
              </motion.aside>
            )}
          </AnimatePresence>

          {/* Product Grid */}
          <div className="flex-1 min-w-0">
            {paginatedProducts.length > 0 ? (
              <>
                <motion.div
                  key={`${viewMode}-${selectedCategory}-${selectedPriceRange?.name || 'all'}`}
                  className={`grid gap-3 sm:gap-4 ${
                    viewMode === 'grid'
                      ? 'grid-cols-1 min-[400px]:grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
                      : 'grid-cols-1'
                  }`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  {paginatedProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </motion.div>

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="flex justify-center gap-2 mt-12">
                    <button
                      onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                      disabled={currentPage === 1}
                      className="px-4 py-2 bg-white/10 text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-white/20 transition-colors"
                    >
                      Previous
                    </button>
                    {[...Array(totalPages)].map((_, i) => (
                      <button
                        key={i + 1}
                        onClick={() => setCurrentPage(i + 1)}
                        className={`w-10 h-10 rounded-lg text-sm font-medium transition-colors ${
                          currentPage === i + 1
                            ? 'bg-orange-500 text-white'
                            : 'bg-white/10 text-gray-400 hover:bg-white/20 hover:text-white'
                        }`}
                      >
                        {i + 1}
                      </button>
                    ))}
                    <button
                      onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                      disabled={currentPage === totalPages}
                      className="px-4 py-2 bg-white/10 text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-white/20 transition-colors"
                    >
                      Next
                    </button>
                  </div>
                )}
              </>
            ) : (
              <div className="text-center py-20">
                <Filter className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-white mb-2">No products found</h3>
                <p className="text-gray-400 mb-6">Try adjusting your filters</p>
                <button
                  onClick={clearFilters}
                  className="px-6 py-3 bg-orange-500 text-white rounded-full hover:bg-orange-600 transition-colors"
                >
                  Clear Filters
                </button>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
    <Footer />
    </>
  );
}

export default function ShopPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center"><div className="w-8 h-8 border-2 border-orange-500 border-t-transparent rounded-full animate-spin" /></div>}>
      <ShopContent />
    </Suspense>
  );
}