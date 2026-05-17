'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import {
  Minus,
  Plus,
  X,
  ShoppingBag,
  ArrowLeft,
  Truck,
  Shield,
  RotateCcw,
} from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';
import { toast } from 'sonner';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

const defaultImage = 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400';

export default function CartPage() {
  const router = useRouter();
  const { user, isLoading: authLoading } = useAuth();
  const { items, removeItem, updateQuantity, subtotal, totalItems } = useCart();
  const [imageErrors, setImageErrors] = useState<Record<string, boolean>>({});

  // Auth guard: redirect to login if not authenticated
  useEffect(() => {
    if (!authLoading && !user) {
      router.replace('/auth/login?redirect=/cart');
    }
  }, [user, authLoading, router]);

  if (authLoading || !user) {
    return null;
  }

  const shippingCost = subtotal >= 3000 ? 0 : 250;
  const total = subtotal + shippingCost;

  const handleRemoveItem = (id: string, productName: string) => {
    removeItem(id);
    toast.success(`${productName} removed from cart`);
  };

  const handleUpdateQuantity = (id: string, newQuantity: number) => {
    if (newQuantity < 1) return;
    updateQuantity(id, newQuantity);
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-[#0a0a0a]">
        {/* Header */}
        <section className="bg-gradient-to-b from-[#111] to-[#0a0a0a] pt-8 pb-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <Link
                href="/shop"
                className="inline-flex items-center gap-2 text-gray-400 hover:text-white mb-4 transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                Continue Shopping
              </Link>
              <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2">
                Shopping Cart
              </h1>
              <p className="text-gray-400">
                {items.length} {items.length === 1 ? 'item' : 'items'} in your cart
              </p>
            </motion.div>
          </div>
        </section>

        {/* Main Content */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
          {items.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center max-w-md mx-auto px-4 py-20"
            >
              <div className="w-24 h-24 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <ShoppingBag className="w-12 h-12 text-gray-500" />
              </div>
              <h2 className="text-2xl font-bold text-white mb-4">Your Cart is Empty</h2>
              <p className="text-gray-400 mb-8">
                Looks like you have not added any items to your cart yet.
                Start shopping to find something you will love.
              </p>
              <Link
                href="/shop"
                className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 rounded-full font-semibold transition-colors"
              >
                Continue Shopping
              </Link>
            </motion.div>
          ) : (
            <div className="grid lg:grid-cols-3 gap-8 lg:gap-12">
              {/* Cart Items */}
              <div className="lg:col-span-2">
                <AnimatePresence mode="popLayout">
                  {items.map((item) => (
                    <motion.div
                      key={item.id}
                      layout
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, x: -100 }}
                      className="flex gap-4 sm:gap-6 py-6 border-b border-white/10 first:pt-0 last:border-0"
                    >
                      {/* Product Image */}
                      <Link
                        href={`/product/${item.product.slug}`}
                        className="relative w-24 h-24 sm:w-32 sm:h-32 bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl overflow-hidden flex-shrink-0"
                      >
                        <Image
                          src={imageErrors[item.id] || !item.product.images[0] ? defaultImage : item.product.images[0]}
                          alt={item.product.name}
                          fill
                          className="object-cover"
                          onError={() => setImageErrors(prev => ({ ...prev, [item.id]: true }))}
                          unoptimized
                        />
                      </Link>

                      {/* Product Info */}
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between gap-4">
                          <div>
                            <p className="text-xs text-orange-500 font-medium mb-1">
                              {item.product.brand}
                            </p>
                            <Link
                              href={`/product/${item.product.slug}`}
                              className="text-white font-semibold hover:text-orange-500 transition-colors line-clamp-1"
                            >
                              {item.product.name}
                            </Link>
                            <p className="text-sm text-gray-400 mt-1">
                              {item.size} / {item.color}
                            </p>
                          </div>
                          <button
                            onClick={() => handleRemoveItem(item.id, item.product.name)}
                            className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                          >
                            <X className="w-5 h-5" />
                          </button>
                        </div>

                        <div className="flex items-end justify-between mt-4">
                          {/* Quantity Controls */}
                          <div className="flex items-center gap-1 bg-white/10 rounded-lg">
                            <button
                              onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)}
                              className="p-2 hover:bg-white/10 transition-colors"
                            >
                              <Minus className="w-4 h-4 text-white" />
                            </button>
                            <span className="w-10 text-center text-white font-medium">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}
                              disabled={item.quantity >= item.product.stock}
                              className="p-2 hover:bg-white/10 transition-colors disabled:opacity-50"
                            >
                              <Plus className="w-4 h-4 text-white" />
                            </button>
                          </div>

                          {/* Price */}
                          <div className="text-right">
                            <p className="text-white font-bold">
                              PKR {(item.price * item.quantity).toLocaleString()}
                            </p>
                            {item.quantity > 1 && (
                              <p className="text-sm text-gray-500">
                                PKR {item.price.toLocaleString()} each
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>

              {/* Order Summary */}
              <div className="lg:col-span-1">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="bg-white/5 rounded-2xl border border-white/10 p-6 sticky top-24"
                >
                  <h2 className="text-lg font-semibold text-white mb-6">Order Summary</h2>

                  {/* Calculations */}
                  <div className="space-y-4 mb-6">
                    <div className="flex justify-between text-gray-400">
                      <span>Subtotal ({totalItems} items)</span>
                      <span>PKR {subtotal.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-gray-400">
                      <span>Shipping</span>
                      <span>
                        {shippingCost === 0 ? (
                          <span className="text-green-400">Free</span>
                        ) : (
                          `PKR ${shippingCost}`
                        )}
                      </span>
                    </div>
                    {shippingCost > 0 && (
                      <p className="text-xs text-orange-500">
                        Add PKR {(3000 - subtotal).toLocaleString()} more for free shipping
                      </p>
                    )}
                  </div>

                  <div className="border-t border-white/10 pt-4 mb-6">
                    <div className="flex justify-between items-center">
                      <span className="text-white font-semibold">Total</span>
                      <span className="text-2xl font-bold text-white">
                        PKR {total.toLocaleString()}
                      </span>
                    </div>
                  </div>

                  {/* Checkout Button */}
                  <Link
                    href="/checkout"
                    className="block w-full bg-orange-500 hover:bg-orange-600 text-white py-4 rounded-full font-semibold text-lg transition-colors flex items-center justify-center gap-2 text-center"
                  >
                    Proceed to Checkout
                  </Link>

                  {/* Features */}
                  <div className="mt-6 pt-6 border-t border-white/10 space-y-3">
                    <div className="flex items-center gap-3 text-sm text-gray-400">
                      <Truck className="w-4 h-4 text-orange-500" />
                      <span>Free shipping on orders above PKR 3,000</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm text-gray-400">
                      <Shield className="w-4 h-4 text-orange-500" />
                      <span>Secure checkout with SSL encryption</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm text-gray-400">
                      <RotateCcw className="w-4 h-4 text-orange-500" />
                      <span>14-day hassle-free returns</span>
                    </div>
                  </div>

                  {/* Payment Methods */}
                  <div className="mt-6 pt-6 border-t border-white/10">
                    <p className="text-xs text-gray-500 text-center mb-3">We Accept</p>
                    <div className="flex justify-center gap-3">
                      {['COD', 'JazzCash', 'Easypaisa', 'Card'].map((method) => (
                        <div
                          key={method}
                          className="px-3 py-1.5 bg-white/10 rounded text-xs text-gray-300 font-medium"
                        >
                          {method}
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          )}
        </section>
      </div>
      <Footer />
    </>
  );
}