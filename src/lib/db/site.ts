import { createClient } from '@/lib/supabase/client';

export const bannerService = {
  async getActive() {
    const supabase = createClient();
    const { data, error } = await supabase
      .from('banners')
      .select('*')
      .eq('is_active', true)
      .order('sort_order', { ascending: true });

    if (error) throw error;
    return data;
  },
};

export const couponService = {
  async validate(code: string) {
    const supabase = createClient();
    const { data, error } = await supabase
      .from('coupons')
      .select('*')
      .eq('code', code.toUpperCase())
      .eq('is_active', true)
      .single();

    if (error) return null;
    return data;
  },
};

export const siteSettingsService = {
  async getAll() {
    const supabase = createClient();
    const { data, error } = await supabase
      .from('site_settings')
      .select('*');

    if (error) throw error;
    return data;
  },

  async get(key: string) {
    const supabase = createClient();
    const { data, error } = await supabase
      .from('site_settings')
      .select('*')
      .eq('key', key)
      .single();

    if (error) return null;
    return data;
  },
};

export const paymentAccountService = {
  async getActive() {
    const supabase = createClient();
    const { data, error } = await supabase
      .from('payment_accounts')
      .select('*')
      .eq('is_active', true)
      .order('display_order', { ascending: true });

    if (error) throw error;
    return data;
  },
};