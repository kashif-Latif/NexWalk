'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { createClient } from '@/lib/supabase/client';
import { orderService } from '@/lib/db/orders';
import { motion } from 'framer-motion';
import {
  User,
  Mail,
  Package,
  LogOut,
  Shield,
  ShoppingBag,
  ChevronRight,
  Clock,
  MapPin,
} from 'lucide-react';

interface UserOrder {
  id: string;
  order_number: string;
  total: number;
  status: string;
  payment_method: string;
  payment_status: string;
  shipping_address: Record<string, unknown>;
  created_at: string;
  order_items: Array<{
    product_name: string;
    product_image?: string;
    quantity: number;
    unit_price: number;
    size?: string;
    color?: string;
  }>;
}

const statusColors: Record<string, string> = {
  pending: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
  confirmed: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
  processing: 'bg-purple-500/20 text-purple-400 border-purple-500/30',
  shipped: 'bg-indigo-500/20 text-indigo-400 border-indigo-500/30',
  delivered: 'bg-green-500/20 text-green-400 border-green-500/30',
  cancelled: 'bg-red-500/20 text-red-400 border-red-500/30',
};

export default function ProfilePage() {
  const router = useRouter();
  const { user, userMetadata, isLoading, logout } = useAuth();
  const [orders, setOrders] = useState<UserOrder[]>([]);
  const [loadingOrders, setLoadingOrders] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    if (!isLoading && !user) {
      router.push('/auth/login?redirect=/profile');
    }
  }, [user, isLoading, router]);

  useEffect(() => {
    const fetchData = async () => {
      if (!user) return;

      try {
        const supabase = createClient();

        // Check admin status
        const { data: profile } = await supabase
          .from('profiles')
          .select('role')
          .eq('id', user.id)
          .single();

        if (profile?.role === 'admin') {
          setIsAdmin(true);
        }

        // Fetch user orders
        const userOrders = await orderService.getUserOrders(user.id);
        setOrders(userOrders as UserOrder[]);
      } catch (error) {
        console.error('Error fetching profile data:', error);
      } finally {
        setLoadingOrders(false);
      }
    };

    fetchData();
  }, [user]);

  const handleLogout = async () => {
    await logout();
    router.push('/');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-orange-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white mb-4">Not Logged In</h1>
          <p className="text-gray-400 mb-6">Please log in to view your profile.</p>
          <Link
            href="/auth/login?redirect=/profile"
            className="inline-flex items-center gap-2 bg-orange-500 text-white px-6 py-3 rounded-xl font-medium hover:bg-orange-600 transition-colors"
          >
            Go to Login
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      {/* Header */}
      <section className="bg-gradient-to-b from-[#111] to-[#0a0a0a] pt-8 pb-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-8"
          >
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-orange-500 to-orange-600 mb-4">
              <User className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-white">
              {userMetadata?.full_name || 'User'}
            </h1>
            <p className="text-gray-400 mt-1">{user.email}</p>
            {isAdmin && (
              <span className="inline-flex items-center gap-1 mt-2 px-3 py-1 bg-orange-500/20 border border-orange-500/30 rounded-full text-xs text-orange-400">
                <Shield className="w-3 h-3" />
                Admin
              </span>
            )}
          </motion.div>

          {/* Quick Actions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="grid grid-cols-2 sm:grid-cols-3 gap-4 max-w-lg mx-auto"
          >
            <Link
              href="/wishlist"
              className="flex flex-col items-center gap-2 p-4 bg-[#111] border border-white/10 rounded-xl hover:border-orange-500/50 transition-colors group"
            >
              <ShoppingBag className="w-6 h-6 text-gray-400 group-hover:text-orange-500 transition-colors" />
              <span className="text-sm text-gray-400 group-hover:text-white transition-colors">Wishlist</span>
            </Link>
            {isAdmin && (
              <Link
                href="/admin/dashboard"
                className="flex flex-col items-center gap-2 p-4 bg-[#111] border border-white/10 rounded-xl hover:border-orange-500/50 transition-colors group"
              >
                <Shield className="w-6 h-6 text-gray-400 group-hover:text-orange-500 transition-colors" />
                <span className="text-sm text-gray-400 group-hover:text-white transition-colors">Admin Panel</span>
              </Link>
            )}
          </motion.div>
        </div>
      </section>

      {/* Account Info + Logout */}
      <section className="py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-[#111] border border-white/10 rounded-2xl p-6 mb-8"
          >
            <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
              <User className="w-5 h-5 text-orange-500" />
              Account Information
            </h2>
            <div className="space-y-3">
              <div className="flex items-center gap-3 p-3 bg-white/5 rounded-lg">
                <User className="w-5 h-5 text-gray-400" />
                <div>
                  <p className="text-xs text-gray-500">Full Name</p>
                  <p className="text-white">{userMetadata?.full_name || 'Not set'}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-white/5 rounded-lg">
                <Mail className="w-5 h-5 text-gray-400" />
                <div>
                  <p className="text-xs text-gray-500">Email</p>
                  <p className="text-white">{user.email}</p>
                </div>
              </div>
            </div>

            <button
              onClick={handleLogout}
              className="mt-6 w-full flex items-center justify-center gap-2 px-4 py-3 bg-red-500/10 border border-red-500/30 rounded-xl text-red-400 hover:bg-red-500/20 transition-colors"
            >
              <LogOut className="w-5 h-5" />
              Sign Out
            </button>
          </motion.div>
        </div>
      </section>

      {/* Order History */}
      <section className="py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
              <Package className="w-5 h-5 text-orange-500" />
              Order History
            </h2>

            {loadingOrders ? (
              <div className="flex items-center justify-center py-12">
                <div className="w-8 h-8 border-2 border-orange-500 border-t-transparent rounded-full animate-spin" />
              </div>
            ) : orders.length === 0 ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-12 bg-[#111] border border-white/10 rounded-2xl"
              >
                <Package className="w-12 h-12 text-gray-600 mx-auto mb-4" />
                <p className="text-gray-400 mb-4">No orders yet</p>
                <Link
                  href="/shop"
                  className="inline-flex items-center gap-2 bg-orange-500 text-white px-6 py-3 rounded-xl font-medium hover:bg-orange-600 transition-colors"
                >
                  Start Shopping
                  <ChevronRight className="w-4 h-4" />
                </Link>
              </motion.div>
            ) : (
              <div className="space-y-4">
                {orders.map((order, index) => (
                  <motion.div
                    key={order.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 * index }}
                    className="bg-[#111] border border-white/10 rounded-2xl overflow-hidden"
                  >
                    {/* Order Header */}
                    <div className="p-4 sm:p-6 border-b border-white/10">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                        <div>
                          <p className="text-sm text-gray-400">
                            Order #{order.order_number}
                          </p>
                          <div className="flex items-center gap-2 mt-1">
                            <Clock className="w-3 h-3 text-gray-500" />
                            <p className="text-xs text-gray-500">
                              {new Date(order.created_at).toLocaleDateString('en-US', {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric',
                              })}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-medium border ${
                              statusColors[order.status] || 'bg-gray-500/20 text-gray-400 border-gray-500/30'
                            }`}
                          >
                            {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                          </span>
                          <span className="text-lg font-semibold text-white">
                            ${order.total.toFixed(2)}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Order Items */}
                    <div className="p-4 sm:p-6">
                      <div className="space-y-3">
                        {order.order_items.map((item, i) => (
                          <div
                            key={i}
                            className="flex items-center gap-4 p-3 bg-white/5 rounded-lg"
                          >
                            <div className="w-12 h-12 bg-gray-800 rounded-lg flex items-center justify-center overflow-hidden flex-shrink-0">
                              {item.product_image ? (
                                <img
                                  src={item.product_image}
                                  alt={item.product_name}
                                  className="w-full h-full object-cover"
                                />
                              ) : (
                                <Package className="w-5 h-5 text-gray-600" />
                              )}
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-sm text-white truncate">
                                {item.product_name}
                              </p>
                              <p className="text-xs text-gray-500">
                                Qty: {item.quantity}
                                {item.size && ` • Size: ${item.size}`}
                                {item.color && ` • Color: ${item.color}`}
                              </p>
                            </div>
                            <p className="text-sm text-gray-300 flex-shrink-0">
                              ${item.unit_price.toFixed(2)}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Order Footer */}
                    <div className="p-4 sm:p-6 bg-white/[0.02] border-t border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                      <div className="flex items-center gap-2 text-sm text-gray-400">
                        <MapPin className="w-4 h-4" />
                        <span>Payment: {order.payment_method === 'bank_transfer' ? 'Bank Transfer' : order.payment_method}</span>
                      </div>
                      <Link
                        href={`/order-confirmation?order=${order.order_number}`}
                        className="text-sm text-orange-500 hover:text-orange-400 transition-colors flex items-center gap-1"
                      >
                        View Details
                        <ChevronRight className="w-3 h-3" />
                      </Link>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </motion.div>
        </div>
      </section>

      {/* Bottom Spacer */}
      <div className="h-16" />
    </div>
  );
}