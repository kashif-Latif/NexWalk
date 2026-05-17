'use client';

import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import {
  Heart,
  Trash2,
  ShoppingBag,
  ArrowLeft,
} from 'lucide-react';
import { useWishlist } from '@/context/WishlistContext';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';
import { toast } from 'sonner';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

export default function WishlistPage() {
  const router = useRouter();
  const { user, isLoading: authLoading } = useAuth();
  const { items, removeItem, clearWishlist } = useWishlist();
  const { addItem } = useCart();

  // Auth guard: redirect to login if not authenticated
  useEffect(() => {
    if (!authLoading && !user) {
      router.replace('/auth/login?redirect=/wishlist');
    }
  }, [user, authLoading, router]);

  if (authLoading || !user) {
    return null;
  }

  const handleAddToCart = (product: typeof items[0]) => {
    const defaultSize = product.sizes?.[0] || 'M';
    const defaultColor = product.colors?.[0]?.name || 'Default';
    addItem(product, 1, defaultSize, defaultColor);
    removeItem(product.id);
    toast.success('Added to cart!');
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
              <div className="flex items-center justify-between">
                <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2">
                  My Wishlist
                </h1>
                {items.length > 0 && (
                  <button
                    onClick={clearWishlist}
                    className="text-sm text-red-500 hover:text-red-400 transition-colors"
                  >
                    Clear All
                  </button>
                )}
              </div>
              <p className="text-gray-400">
                {items.length} {items.length === 1 ? 'item' : 'items'} saved
              </p>
            </motion.div>
          </div>
        </section>

        {/* Main Content */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {items.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center max-w-md mx-auto px-4 py-20"
            >
              <div className="w-24 h-24 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <Heart className="w-12 h-12 text-gray-500" />
              </div>
              <h2 className="text-2xl font-bold text-white mb-4">Your Wishlist is Empty</h2>
              <p className="text-gray-400 mb-8">
                Save your favorite items here and they will be waiting for you when you return.
              </p>
              <Link
                href="/shop"
                className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 rounded-full font-semibold transition-colors"
              >
                Start Shopping
              </Link>
            </motion.div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              <AnimatePresence mode="popLayout">
                {items.map((item) => (
                  <motion.div
                    key={item.id}
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className="bg-white/5 rounded-2xl overflow-hidden border border-white/10 hover:border-orange-500/30 transition-all"
                  >
                    {/* Image */}
                    <div className="relative aspect-square bg-gradient-to-br from-gray-800 to-gray-900">
                      <Image
                        src={item.images[0]}
                        alt={item.name}
                        fill
                        className="object-cover"
                      />
                      {/* Remove Button */}
                      <button
                        onClick={() => removeItem(item.id)}
                        className="absolute top-3 right-3 p-2 bg-black/50 rounded-full text-white hover:bg-red-500 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    {/* Info */}
                    <div className="p-4">
                      <p className="text-xs text-orange-500 font-medium mb-1">{item.brand}</p>
                      <h3 className="text-white font-semibold mb-2 line-clamp-1">{item.name}</h3>
                      <div className="flex items-center gap-2 mb-4">
                        <span className="text-white font-bold">
                          PKR {item.price.toLocaleString()}
                        </span>
                        {item.original_price && (
                          <span className="text-gray-500 line-through text-sm">
                            PKR {item.original_price.toLocaleString()}
                          </span>
                        )}
                      </div>
                      <button
                        onClick={() => handleAddToCart(item)}
                        className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-full font-medium flex items-center justify-center gap-2 transition-colors"
                      >
                        <ShoppingBag className="w-5 h-5" />
                        Add to Cart
                      </button>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          )}
        </section>
      </div>
      <Footer />
    </>
  );
}