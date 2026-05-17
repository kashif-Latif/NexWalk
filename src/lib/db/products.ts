import { createClient } from '@/lib/supabase/client';

export interface DbProduct {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  price: number;
  compare_at_price: number | null;
  cost_price: number | null;
  sku: string | null;
  barcode: string | null;
  category_id: string | null;
  brand: string | null;
  tags: string[] | null;
  images: string[] | null;
  variants: any;
  sizes: string[] | null;
  colors: string[] | null;
  weight: number | null;
  dimensions: any;
  stock_quantity: number;
  low_stock_threshold: number;
  is_active: boolean;
  is_featured: boolean;
  is_trending: boolean;
  is_new: boolean;
  rating: number;
  review_count: number;
  meta_title: string | null;
  meta_description: string | null;
  created_at: string;
  updated_at: string;
}

export interface DbCategory {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  image_url: string | null;
  parent_id: string | null;
  is_active: boolean;
  sort_order: number;
  created_at: string;
}

// Product service for client-side Supabase queries
export const productService = {
  async getAll(filters?: {
    category?: string;
    minPrice?: number;
    maxPrice?: number;
    isFeatured?: boolean;
    isTrending?: boolean;
    isNew?: boolean;
    sort?: 'newest' | 'price_asc' | 'price_desc' | 'popular';
    limit?: number;
    offset?: number;
  }) {
    const supabase = createClient();
    let query = supabase
      .from('products')
      .select('*, categories!inner(id, name, slug)')
      .eq('is_active', true);

    if (filters?.category) {
      query = query.eq('category_id', filters.category);
    }
    if (filters?.minPrice !== undefined) {
      query = query.gte('price', filters.minPrice);
    }
    if (filters?.maxPrice !== undefined) {
      query = query.lte('price', filters.maxPrice);
    }
    if (filters?.isFeatured) {
      query = query.eq('is_featured', true);
    }
    if (filters?.isTrending) {
      query = query.eq('is_trending', true);
    }
    if (filters?.isNew) {
      query = query.eq('is_new', true);
    }

    switch (filters?.sort) {
      case 'price_asc':
        query = query.order('price', { ascending: true });
        break;
      case 'price_desc':
        query = query.order('price', { ascending: false });
        break;
      case 'popular':
        query = query.order('rating', { ascending: false });
        break;
      case 'newest':
      default:
        query = query.order('created_at', { ascending: false });
        break;
    }

    if (filters?.limit) {
      query = query.limit(filters.limit);
    }
    if (filters?.offset) {
      query = query.range(filters.offset, filters.offset + (filters.limit || 20) - 1);
    }

    const { data, error, count } = await query;
    if (error) throw error;
    return { data: data as (DbProduct & { categories: DbCategory | null })[], count };
  },

  async getBySlug(slug: string) {
    const supabase = createClient();
    const { data, error } = await supabase
      .from('products')
      .select('*, categories!inner(id, name, slug)')
      .eq('slug', slug)
      .eq('is_active', true)
      .single();

    if (error) throw error;
    return data as DbProduct & { categories: DbCategory | null };
  },

  async getById(id: string) {
    const supabase = createClient();
    const { data, error } = await supabase
      .from('products')
      .select('*, categories!inner(id, name, slug)')
      .eq('id', id)
      .single();

    if (error) throw error;
    return data as DbProduct & { categories: DbCategory | null };
  },

  async getFeatured(limit = 8) {
    return this.getAll({ isFeatured: true, limit, sort: 'newest' });
  },

  async getNewArrivals(limit = 8) {
    return this.getAll({ isNew: true, limit, sort: 'newest' });
  },

  async getTrending(limit = 8) {
    return this.getAll({ isTrending: true, limit, sort: 'popular' });
  },

  async getByCategory(categorySlug: string, limit?: number) {
    const supabase = createClient();
    // First get the category ID from slug
    const { data: category } = await supabase
      .from('categories')
      .select('id')
      .eq('slug', categorySlug)
      .single();

    if (!category) return { data: [], count: 0 };

    return this.getAll({ category: category.id, limit });
  },

  async getReviews(productId: string) {
    const supabase = createClient();
    const { data, error } = await supabase
      .from('reviews')
      .select('*, profiles(full_name, avatar_url)')
      .eq('product_id', productId)
      .eq('is_approved', true)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data;
  },

  async searchProducts(query: string, limit = 20) {
    const supabase = createClient();
    const { data, error } = await supabase
      .from('products')
      .select('*, categories!inner(id, name, slug)')
      .eq('is_active', true)
      .or(`name.ilike.%${query}%,description.ilike.%${query}%,brand.ilike.%${query}%`)
      .limit(limit);

    if (error) throw error;
    return { data: data as (DbProduct & { categories: DbCategory | null })[], error };
  },
};