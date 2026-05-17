// User Types
export interface User {
  id: string;
  email: string;
  full_name: string;
  phone?: string;
  avatar_url?: string;
  created_at: string;
  updated_at: string;
}

// Address Types
export interface Address {
  id: string;
  user_id: string;
  full_name: string;
  name: string; // alias for backward compatibility
  phone: string;
  address_line1: string;
  address_line2?: string;
  city: string;
  province: string;
  state: string; // alias for backward compatibility
  postal_code: string;
  country: string;
  is_default: boolean;
  created_at: string;
}

// Product Types
export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  compare_at_price?: number;
  original_price?: number; // alias for backward compatibility
  images: string[];
  category_id: string;
  brand: string;
  stock_quantity: number;
  stock: number; // alias for backward compatibility
  sizes: string[];
  colors: ProductColor[];
  rating: number;
  review_count: number;
  is_featured: boolean;
  is_trending: boolean;
  is_new: boolean;
  is_active: boolean;
  tags: string[];
  created_at: string;
  updated_at: string;
}

export interface ProductColor {
  name: string;
  hex: string;
}

// Category Types
export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
  image: string;
  parent_id?: string;
  is_active: boolean;
  created_at: string;
}

// Order Types
export interface Order {
  id: string;
  user_id: string;
  status: OrderStatus;
  total: number;
  subtotal: number;
  shipping_cost: number;
  discount: number;
  coupon_code?: string;
  shipping_address: Address;
  billing_address?: Address;
  payment_method: PaymentMethod;
  payment_status: PaymentStatus;
  notes?: string;
  created_at: string;
  updated_at: string;
}

export type OrderStatus = 'pending' | 'confirmed' | 'processing' | 'shipped' | 'delivered' | 'cancelled' | 'refunded';
export type PaymentMethod = 'cod' | 'easypaisa' | 'jazzcash' | 'bank_transfer';
export type PaymentStatus = 'pending' | 'paid' | 'failed' | 'refunded';

export interface OrderItem {
  id: string;
  order_id: string;
  product_id: string;
  product_name: string;
  product_image: string;
  price: number;
  quantity: number;
  size: string;
  color: string;
  created_at: string;
}

// Cart Types
export interface CartItem {
  id: string;
  product: Product;
  quantity: number;
  size: string;
  color: string;
  price: number;
}

// Wishlist Types
export interface WishlistItem {
  id: string;
  user_id: string;
  product_id: string;
  product: Product;
  created_at: string;
}

// Review Types
export interface Review {
  id: string;
  user_id: string;
  user_name: string;
  user_avatar?: string;
  product_id: string;
  rating: number;
  title?: string;
  content: string;
  comment: string; // alias for backward compatibility
  is_verified: boolean;
  helpful_count: number;
  created_at: string;
}

// Payment Types
export interface Payment {
  id: string;
  order_id: string;
  method: PaymentMethod;
  amount: number;
  status: PaymentStatus;
  transaction_id?: string;
  paid_at?: string;
  created_at: string;
}

// Coupon Types
export interface Coupon {
  id: string;
  code: string;
  description: string;
  discount_type: 'percentage' | 'fixed';
  discount_value: number;
  min_order_amount: number;
  max_discount?: number;
  usage_limit?: number;
  used_count: number;
  valid_from: string;
  valid_until: string;
  is_active: boolean;
  created_at: string;
}

// Banner Types
export interface Banner {
  id: string;
  title: string;
  subtitle?: string;
  image: string;
  link?: string;
  is_active: boolean;
  position: number;
  created_at: string;
}

// API Response Types
export interface ApiResponse<T> {
  data: T;
  message?: string;
  success: boolean;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

// Filter Types
export interface ProductFilters {
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  sizes?: string[];
  colors?: string[];
  brands?: string[];
  sort?: 'newest' | 'price_asc' | 'price_desc' | 'popular';
}

export interface FilterOption {
  label: string;
  value: string;
  count?: number;
}