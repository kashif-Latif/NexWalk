import { createClient } from '@/lib/supabase/client';
import type { DbCategory } from './products';

interface CategoryWithCount {
  id: string;
  name: string;
  slug: string;
  productCount: number;
}

export const categoryService = {
  async getAll() {
    const supabase = createClient();
    const { data, error } = await supabase
      .from('categories')
      .select('*')
      .eq('is_active', true)
      .order('sort_order', { ascending: true });

    if (error) throw error;
    return data as DbCategory[];
  },

  async getBySlug(slug: string) {
    const supabase = createClient();
    const { data, error } = await supabase
      .from('categories')
      .select('*')
      .eq('slug', slug)
      .eq('is_active', true)
      .single();

    if (error) throw error;
    return data as DbCategory;
  },

  async getProductCountByCategory(): Promise<CategoryWithCount[]> {
    const supabase = createClient();
    const { data: categories } = await supabase
      .from('categories')
      .select('id, name, slug')
      .eq('is_active', true)
      .order('sort_order', { ascending: true });

    if (!categories) return [];

    const result = await Promise.all(
      categories.map(async (cat: { id: string; name: string; slug: string }) => {
        const { count } = await supabase
          .from('products')
          .select('*', { count: 'exact', head: true })
          .eq('category_id', cat.id)
          .eq('is_active', true);
        return { ...cat, productCount: count || 0 };
      })
    );

    return result;
  },
};