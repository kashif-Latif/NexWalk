'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  Star,
  Heart,
  ShoppingCart,
  Minus,
  Plus,
  ChevronRight,
  Truck,
  Shield,
  RotateCcw,
  Check,
  Loader2,
} from 'lucide-react';
import ProductCard from '@/components/product/ProductCard';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';
import { toast } from 'sonner';
import { Product, ProductColor, Review } from '@/types';
import { productService, DbProduct, DbCategory } from '@/lib/db/products';

const defaultImage = 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600';

// Color name to hex mapping for UI display
const colorHexMap: Record<string, string> = {
  black: '#000000',
  white: '#FFFFFF',
  red: '#DC2626',
  blue: '#3B82F6',
  green: '#22C55E',
  yellow: '#EAB308',
  purple: '#A855F7',
  pink: '#EC4899',
  gray: '#6B7280',
  navy: '#1E3A5F',
  brown: '#78350F',
  orange: '#F97316',
  teal: '#14B8A6',
  burgundy: '#800020',
  cream: '#FFFDD0',
  olive: '#556B2F',
  khaki: '#C3B091',
  tan: '#D2B48C',
  charcoal: '#36454F',
  maroon: '#800000',
  beige: '#F5F5DC',
  gold: '#FFD700',
  silver: '#C0C0C0',
  camo: '#78866B',
  'sky blue': '#87CEEB',
  'dark brown': '#5C4033',
  'royal blue': '#4169E1',
};

function getColorHex(colorName: string): string {
  const key = colorName.toLowerCase().trim();
  return colorHexMap[key] || '#888888';
}

function mapDbProductToProduct(p: DbProduct & { categories?: DbCategory | null }): Product {
  const dbColors = (p.colors as string[]) || [];
  const colors: ProductColor[] = dbColors.map((name: string) => ({
    name,
    hex: getColorHex(name),
  }));

  // If no colors, provide a default
  if (colors.length === 0) {
    colors.push({ name: 'Default', hex: '#888888' });
  }

  return {
    id: p.id as string,
    name: p.name as string,
    slug: p.slug as string,
    description: (p.description as string) || '',
    price: p.price as number,
    compare_at_price: (p.compare_at_price as number) || undefined,
    original_price: (p.compare_at_price as number) || undefined,
    category_id: (p.category_id as string) || '',
    brand: (p.brand as string) || 'NexWalk',
    tags: (p.tags as string[]) || [],
    images: (p.images as string[]) || [defaultImage],
    sizes: (p.sizes as string[]) || ['7', '8', '9', '10', '11'],
    colors,
    stock: (p.stock_quantity as number) || 0,
    stock_quantity: (p.stock_quantity as number) || 0,
    is_active: (p.is_active as boolean) ?? true,
    is_featured: (p.is_featured as boolean) ?? false,
    is_trending: (p.is_trending as boolean) ?? false,
    is_new: (p.is_new as boolean) ?? false,
    rating: (p.rating as number) || 0,
    review_count: (p.review_count as number) || 0,
    created_at: (p.created_at as string) || '',
    updated_at: (p.updated_at as string) || '',
  };
}

function mapDbReviewToReview(r: any): Review {
  const profile = (r.profiles as Record<string, unknown>) || {};
  return {
    id: r.id as string,
    user_id: (r.user_id as string) || '',
    user_name: (profile.full_name as string) || (r.user_name as string) || 'Anonymous',
    product_id: (r.product_id as string) || '',
    rating: (r.rating as number) || 0,
    title: (r.title as string) || '',
    comment: (r.comment as string) || (r.content as string) || '',
    content: (r.content as string) || (r.comment as string) || '',
    is_verified: (r.is_verified as boolean) ?? true,
    helpful_count: (r.helpful_count as number) || 0,
    created_at: (r.created_at as string) || '',
  };
}

export default function ProductDetailPage() {
  const params = useParams();
  const slug = params.slug as string;

  const { addItem } = useCart();
  const { isInWishlist, toggleItem } = useWishlist();

  const [product, setProduct] = useState<Product | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [selectedColor, setSelectedColor] = useState<ProductColor | null>(null);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        // Fetch product by slug
        const dbProduct = await productService.getBySlug(slug);
        if (!dbProduct) {
          setError('Product not found');
          setLoading(false);
          return;
        }

        const mappedProduct = mapDbProductToProduct(dbProduct as any);
        setProduct(mappedProduct);
        setSelectedColor(mappedProduct.colors[0] || null);

        // Fetch reviews in parallel
        const reviewsPromise = productService.getReviews(dbProduct.id)
          .then(data => {
            if (data) {
              setReviews((data as any[]).map(mapDbReviewToReview));
            }
          })
          .catch(() => {
            // Reviews are optional - don't block the page
            setReviews([]);
          });

        // Fetch related products (same category, excluding current)
        const relatedPromise = productService.getAll({
          category: dbProduct.category_id || undefined,
          limit: 5,
          sort: 'popular',
        })
          .then(res => {
            if (res.data) {
              const filtered = res.data
                .filter((p: DbProduct) => p.id !== dbProduct.id)
                .slice(0, 4);
              setRelatedProducts(filtered.map(mapDbProductToProduct));
            }
          })
          .catch(() => {
            setRelatedProducts([]);
          });

        await Promise.all([reviewsPromise, relatedPromise]);
      } catch (err) {
        console.error('Error fetching product:', err);
        setError('Failed to load product');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [slug]);

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-10 h-10 text-orange-500 animate-spin mx-auto mb-4" />
          <p className="text-gray-400">Loading product...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error || !product) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-white mb-4">Product Not Found</h2>
          <p className="text-gray-400 mb-6">{error || 'The product you are looking for does not exist.'}</p>
          <Link
            href="/shop"
            className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-full font-semibold transition-colors"
          >
            <ShoppingCart className="w-5 h-5" />
            Browse Products
          </Link>
        </div>
      </div>
    );
  }

  const productImages = product.images.length > 0
    ? product.images
    : [defaultImage, defaultImage, defaultImage, defaultImage];

  const inWishlist = isInWishlist(product.id);

  const discount = product.original_price
    ? Math.round(((product.original_price - product.price) / product.original_price) * 100)
    : 0;

  const handleAddToCart = () => {
    if (!selectedSize) {
      toast.error('Please select a size');
      return;
    }
    if (!selectedColor) {
      toast.error('Please select a color');
      return;
    }
    addItem(product, quantity, selectedSize, selectedColor.name);
    toast.success('Added to cart!');
  };

  const handleToggleWishlist = () => {
    toggleItem(product);
    toast.success(inWishlist ? 'Removed from wishlist' : 'Added to wishlist!');
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      {/* Breadcrumb */}
      <div className="bg-[#0a0a0a] border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <nav className="flex items-center gap-2 text-sm text-gray-400">
            <Link href="/" className="hover:text-white">Home</Link>
            <ChevronRight className="w-4 h-4" />
            <Link href="/shop" className="hover:text-white">Shop</Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-white">{product.name}</span>
          </nav>
        </div>
      </div>

      {/* Product Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16">
          {/* Images */}
          <div className="space-y-4">
            {/* Main Image */}
            <motion.div
              key={selectedImage}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="relative aspect-square bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl overflow-hidden"
            >
              <Image
                src={productImages[selectedImage] || defaultImage}
                alt={product.name}
                fill
                className="object-cover"
                priority
                onError={() => {}}
              />
              {product.original_price && discount > 0 && (
                <div className="absolute top-4 left-4 bg-orange-500 text-white text-sm font-bold px-4 py-1.5 rounded-full">
                  -{discount}%
                </div>
              )}
            </motion.div>

            {/* Thumbnails */}
            {productImages.length > 1 && (
              <div className="flex gap-3 overflow-x-auto pb-2">
                {productImages.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`relative w-20 h-20 flex-shrink-0 rounded-xl overflow-hidden border-2 transition-colors ${
                      selectedImage === index ? 'border-orange-500' : 'border-transparent'
                    }`}
                  >
                    <Image
                      src={image}
                      alt={`${product.name} ${index + 1}`}
                      fill
                      className="object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            {/* Brand & Rating */}
            <p className="text-orange-500 font-medium mb-2">{product.brand}</p>
            <h1 className="text-3xl lg:text-4xl font-bold text-white mb-4">{product.name}</h1>

            {/* Rating */}
            <div className="flex items-center gap-4 mb-6">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-5 h-5 ${
                      i < Math.floor(product.rating)
                        ? 'text-yellow-400 fill-current'
                        : 'text-gray-600'
                    }`}
                  />
                ))}
              </div>
              <span className="text-gray-400">
                {product.rating.toFixed(1)} ({product.review_count} reviews)
              </span>
            </div>

            {/* Price */}
            <div className="flex items-center gap-4 mb-8">
              <span className="text-3xl font-bold text-white">
                PKR {product.price.toLocaleString()}
              </span>
              {product.original_price && (
                <>
                  <span className="text-xl text-gray-500 line-through">
                    PKR {product.original_price.toLocaleString()}
                  </span>
                  <span className="text-orange-500 font-semibold">
                    Save PKR {(product.original_price - product.price).toLocaleString()}
                  </span>
                </>
              )}
            </div>

            {/* Description */}
            <p className="text-gray-400 leading-relaxed mb-8">{product.description}</p>

            {/* Color Selection */}
            {product.colors.length > 0 && (
              <div className="mb-6">
                <p className="text-sm font-medium text-white mb-3">
                  Color: <span className="text-gray-400">{selectedColor?.name || 'Select'}</span>
                </p>
                <div className="flex gap-3">
                  {product.colors.map((color) => (
                    <button
                      key={color.name}
                      onClick={() => setSelectedColor(color)}
                      className={`w-10 h-10 rounded-full border-2 transition-all ${
                        selectedColor?.name === color.name
                          ? 'border-orange-500 scale-110'
                          : 'border-transparent hover:border-white/30'
                      }`}
                      style={{ backgroundColor: color.hex }}
                      title={color.name}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Size Selection */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-3">
                <p className="text-sm font-medium text-white">Size</p>
                <button className="text-sm text-orange-500 hover:text-orange-400">Size Guide</button>
              </div>
              <div className="flex flex-wrap gap-3">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`min-w-[60px] px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                      selectedSize === size
                        ? 'bg-orange-500 text-white'
                        : 'bg-white/10 text-white hover:bg-white/20'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity */}
            <div className="mb-8">
              <p className="text-sm font-medium text-white mb-3">Quantity</p>
              <div className="flex items-center gap-4">
                <div className="flex items-center bg-white/10 rounded-xl">
                  <button
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className="p-3 hover:bg-white/10 transition-colors"
                  >
                    <Minus className="w-4 h-4 text-white" />
                  </button>
                  <span className="w-12 text-center text-white font-medium">{quantity}</span>
                  <button
                    onClick={() => setQuantity((q) => Math.min(product.stock, q + 1))}
                    className="p-3 hover:bg-white/10 transition-colors"
                  >
                    <Plus className="w-4 h-4 text-white" />
                  </button>
                </div>
                <span className="text-sm text-gray-400">
                  {product.stock} items available
                </span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4 mb-8">
              <motion.button
                onClick={handleAddToCart}
                className="flex-1 bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 rounded-full font-semibold text-lg flex items-center justify-center gap-3 transition-colors"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <ShoppingCart className="w-5 h-5" />
                Add to Cart
              </motion.button>
              <motion.button
                onClick={handleToggleWishlist}
                className={`p-4 rounded-full border-2 transition-colors ${
                  inWishlist
                    ? 'bg-orange-500 border-orange-500 text-white'
                    : 'bg-white/10 border-white/20 text-white hover:border-orange-500 hover:bg-orange-500/10'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Heart className={`w-6 h-6 ${inWishlist ? 'fill-current' : ''}`} />
              </motion.button>
            </div>

            {/* Features */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-6 bg-white/5 rounded-2xl border border-white/10">
              <div className="flex items-center gap-3">
                <Truck className="w-5 h-5 text-orange-500" />
                <span className="text-sm text-gray-300">Free Shipping</span>
              </div>
              <div className="flex items-center gap-3">
                <Shield className="w-5 h-5 text-orange-500" />
                <span className="text-sm text-gray-300">Quality Guaranteed</span>
              </div>
              <div className="flex items-center gap-3">
                <RotateCcw className="w-5 h-5 text-orange-500" />
                <span className="text-sm text-gray-300">14-Day Returns</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Reviews Section */}
      <section className="bg-[#111] py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-white mb-8">Customer Reviews</h2>

          {/* Rating Summary */}
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div className="bg-white/5 rounded-2xl p-8 text-center">
              <div className="text-5xl font-bold text-white mb-2">{product.rating.toFixed(1)}</div>
              <div className="flex items-center justify-center gap-1 mb-2">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-5 h-5 ${
                      i < Math.floor(product.rating)
                        ? 'text-yellow-400 fill-current'
                        : 'text-gray-600'
                    }`}
                  />
                ))}
              </div>
              <p className="text-gray-400">Based on {product.review_count} reviews</p>
            </div>

            <div className="space-y-3">
              {[5, 4, 3, 2, 1].map((stars) => {
                const count = reviews.filter((r) => r.rating === stars).length;
                const percentage = reviews.length > 0 ? (count / reviews.length) * 100 : 0;
                return (
                  <div key={stars} className="flex items-center gap-3">
                    <span className="text-sm text-gray-400 w-8">{stars} Star</span>
                    <div className="flex-1 h-2 bg-white/10 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-yellow-400 rounded-full"
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                    <span className="text-sm text-gray-400 w-8">{count}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Reviews List */}
          <div className="space-y-6">
            {reviews.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-400">No reviews yet. Be the first to review this product!</p>
              </div>
            ) : (
              reviews.map((review) => (
                <motion.div
                  key={review.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="bg-white/5 rounded-2xl p-6 border border-white/10"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <span className="font-semibold text-white">{review.user_name}</span>
                        {review.is_verified && (
                          <span className="flex items-center gap-1 text-xs text-green-400">
                            <Check className="w-3 h-3" />
                            Verified Purchase
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-1">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-4 h-4 ${
                              i < review.rating
                                ? 'text-yellow-400 fill-current'
                                : 'text-gray-600'
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                    <span className="text-sm text-gray-500">
                      {new Date(review.created_at).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })}
                    </span>
                  </div>
                  {review.title && (
                    <h4 className="font-semibold text-white mb-2">{review.title}</h4>
                  )}
                  <p className="text-gray-400">{review.comment}</p>
                </motion.div>
              ))
            )}
          </div>
        </div>
      </section>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <section className="py-16 bg-[#0a0a0a]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-white mb-8">You May Also Like</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}