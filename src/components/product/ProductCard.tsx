'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Heart, Star, ShoppingCart } from 'lucide-react';
import { Product } from '@/types';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';
import { useAuth } from '@/context/AuthContext';
import { toast } from 'sonner';

interface ProductCardProps {
  product: Product;
}

const defaultImage = 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400';

export default function ProductCard({ product }: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [selectedImage, setSelectedImage] = useState(0);
  const [imageError, setImageError] = useState(false);
  const { user } = useAuth();
  const { addItem } = useCart();
  const { isInWishlist, toggleItem } = useWishlist();

  const discount = product.original_price
    ? Math.round(((product.original_price - product.price) / product.original_price) * 100)
    : 0;

  const isOnSale = product.original_price && product.original_price > product.price;
  const isNew = product.is_new;
  const inWishlist = isInWishlist(product.id);

  const productImage = imageError || !product.images[selectedImage]
    ? defaultImage
    : product.images[selectedImage];

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!user) {
      window.location.href = '/auth/login?redirect=/shop';
      return;
    }
    const defaultSize = product.sizes?.[0] || 'M';
    const defaultColor = product.colors?.[0]?.name || 'Default';
    addItem(product, 1, defaultSize, defaultColor);
    toast.success('Added to cart!');
  };

  const handleToggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!user) {
      window.location.href = '/auth/login?redirect=/shop';
      return;
    }
    toggleItem(product);
    toast.success(inWishlist ? 'Removed from wishlist' : 'Added to wishlist!');
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link href={`/product/${product.slug}`}>
        <div className="group bg-white/5 rounded-xl overflow-hidden border border-white/10 hover:border-orange-500/30 transition-all duration-300">
          {/* Image Container */}
          <div className="relative aspect-square overflow-hidden bg-gradient-to-br from-gray-800 to-gray-900">
            <Image
              src={productImage}
              alt={product.name}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
              onError={() => setImageError(true)}
              unoptimized
            />

            {/* Badges */}
            <div className="absolute top-3 left-3 flex flex-col gap-2">
              {isOnSale && (
                <span className="bg-orange-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                  -{discount}%
                </span>
              )}
              {isNew && !isOnSale && (
                <span className="bg-green-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                  NEW
                </span>
              )}
            </div>

            {/* Wishlist Button */}
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: isHovered ? 1 : 0 }}
              onClick={handleToggleWishlist}
              className={`absolute top-3 right-3 p-2 rounded-full transition-colors ${
                inWishlist
                  ? 'bg-orange-500 text-white'
                  : 'bg-black/50 text-white hover:bg-orange-500'
              }`}
            >
              <Heart className={`w-5 h-5 ${inWishlist ? 'fill-current' : ''}`} />
            </motion.button>

            {/* Add to Cart Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 20 }}
              className="absolute bottom-3 left-3 right-3"
            >
              <button
                onClick={handleAddToCart}
                className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-full font-medium flex items-center justify-center gap-2 transition-colors"
              >
                <ShoppingCart className="w-5 h-5" />
                Add to Cart
              </button>
            </motion.div>
          </div>

          {/* Info */}
          <div className="p-4">
            {/* Brand */}
            <p className="text-xs text-orange-500 font-medium mb-1">{product.brand}</p>

            {/* Name */}
            <h3 className="text-white font-medium text-sm lg:text-base line-clamp-2 mb-2 group-hover:text-orange-500 transition-colors">
              {product.name}
            </h3>

            {/* Rating */}
            <div className="flex items-center gap-1 mb-3">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-4 h-4 ${
                    i < Math.floor(product.rating)
                      ? 'text-yellow-400 fill-current'
                      : 'text-gray-600'
                  }`}
                />
              ))}
              <span className="text-gray-400 text-xs ml-1">({product.review_count})</span>
            </div>

            {/* Price */}
            <div className="flex items-center gap-2">
              <span className="text-white font-bold text-lg">
                PKR {product.price.toLocaleString()}
              </span>
              {product.original_price && (
                <span className="text-gray-500 line-through text-sm">
                  PKR {product.original_price.toLocaleString()}
                </span>
              )}
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}