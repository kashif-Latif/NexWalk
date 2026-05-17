import { createClient } from '@/lib/supabase/client';

export const orderService = {
  async createOrder(orderData: {
    order_number: string;
    user_id?: string;
    email: string;
    full_name: string;
    phone: string;
    shipping_address: Record<string, unknown>;
    subtotal: number;
    shipping_cost: number;
    discount: number;
    coupon_code?: string;
    total: number;
    payment_method: string;
    payment_status?: string;
    notes?: string;
  }) {
    const supabase = createClient();
    const { data, error } = await supabase
      .from('orders')
      .insert(orderData)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async createOrderItems(items: Array<{
    order_id: string;
    product_id: string;
    product_name: string;
    product_image?: string;
    size?: string;
    color?: string;
    quantity: number;
    unit_price: number;
    total_price: number;
  }>) {
    const supabase = createClient();
    const { data, error } = await supabase
      .from('order_items')
      .insert(items)
      .select();

    if (error) throw error;
    return data;
  },

  async getOrderByNumber(orderNumber: string) {
    const supabase = createClient();
    const { data, error } = await supabase
      .from('orders')
      .select('*, order_items(*)')
      .eq('order_number', orderNumber)
      .single();

    if (error) throw error;
    return data;
  },

  async getUserOrders(userId: string) {
    const supabase = createClient();
    const { data, error } = await supabase
      .from('orders')
      .select('*, order_items(*)')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data;
  },
};