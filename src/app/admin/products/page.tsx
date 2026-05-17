'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Edit, Trash2, Search, Filter, X, Image as ImageIcon, Save } from 'lucide-react';
import { createClient } from '@/lib/supabase/client';
import { toast } from 'sonner';
import Image from 'next/image';

// Extended Product interface for admin
interface AdminProduct {
  id: string;
  name: string;
  slug: string;
  description?: string;
  price: number;
  compare_at_price?: number;
  brand?: string;
  stock_quantity?: number;
  images?: string[];
  sizes?: string[];
  colors?: { name: string; hex: string }[];
  is_active?: boolean;
  is_featured?: boolean;
  is_trending?: boolean;
  is_new?: boolean;
  category_id?: string;
  created_at?: string;
  updated_at?: string;
}

interface DbCategory {
  id: string;
  name: string;
  slug: string;
}

export default function AdminProducts() {
  const [products, setProducts] = useState<AdminProduct[]>([]);
  const [categories, setCategories] = useState<DbCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState<AdminProduct | null>(null);
  const [saving, setSaving] = useState(false);
  const supabase = createClient();

  const [formData, setFormData] = useState({
    name: '',
    slug: '',
    description: '',
    price: 0,
    compare_at_price: 0,
    brand: '',
    stock_quantity: 0,
    category_id: '',
    images: [''],
    sizes: ['US 7', 'US 8', 'US 9', 'US 10', 'US 11'],
    colors: [{ name: 'Black', hex: '#000000' }],
    is_active: true,
    is_featured: false,
    is_trending: false,
    is_new: false,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch categories first
        const { data: cats, error: catError } = await supabase
          .from('categories')
          .select('id, name, slug')
          .eq('is_active', true)
          .order('sort_order', { ascending: true });

        if (catError) throw catError;
        setCategories(cats || []);

        // Fetch products
        const { data: prods, error: prodError } = await supabase
          .from('products')
          .select('*')
          .order('created_at', { ascending: false });

        if (prodError) throw prodError;
        setProducts(prods || []);

        // Set default category_id to first category
        if (cats && cats.length > 0) {
          setFormData(prev => ({ ...prev, category_id: cats[0].id }));
        }
      } catch (error) {
        console.error('Error fetching data:', error);
        toast.error('Failed to load data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const filteredProducts = products.filter(p =>
    p.name.toLowerCase().includes(search.toLowerCase()) ||
    p.brand?.toLowerCase().includes(search.toLowerCase())
  );

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this product?')) return;

    try {
      const { error } = await supabase.from('products').delete().eq('id', id);
      if (error) throw error;
      setProducts(products.filter(p => p.id !== id));
      toast.success('Product deleted successfully');
    } catch (error) {
      toast.error('Failed to delete product');
    }
  };

  const openEditModal = (product: AdminProduct) => {
    setEditingProduct(product);
    setFormData({
      name: product.name,
      slug: product.slug,
      description: product.description || '',
      price: product.price,
      compare_at_price: product.compare_at_price || 0,
      brand: product.brand || '',
      stock_quantity: product.stock_quantity || 0,
      category_id: product.category_id || (categories.length > 0 ? categories[0].id : ''),
      images: product.images?.length ? product.images : [''],
      sizes: product.sizes || ['US 7', 'US 8', 'US 9', 'US 10', 'US 11'],
      colors: product.colors || [{ name: 'Black', hex: '#000000' }],
      is_active: product.is_active !== false,
      is_featured: product.is_featured || false,
      is_trending: product.is_trending || false,
      is_new: product.is_new || false,
    });
    setShowModal(true);
  };

  const openAddModal = () => {
    setEditingProduct(null);
    setFormData({
      name: '',
      slug: '',
      description: '',
      price: 0,
      compare_at_price: 0,
      brand: '',
      stock_quantity: 0,
      category_id: categories.length > 0 ? categories[0].id : '',
      images: [''],
      sizes: ['US 7', 'US 8', 'US 9', 'US 10', 'US 11'],
      colors: [{ name: 'Black', hex: '#000000' }],
      is_active: true,
      is_featured: false,
      is_trending: false,
      is_new: false,
    });
    setShowModal(true);
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const productData: Record<string, unknown> = {
        name: formData.name,
        slug: formData.slug || formData.name.toLowerCase().replace(/\s+/g, '-'),
        description: formData.description,
        price: formData.price,
        brand: formData.brand,
        stock_quantity: formData.stock_quantity,
        category_id: formData.category_id,
        images: formData.images.filter(img => img.trim() !== ''),
        sizes: formData.sizes,
        colors: formData.colors,
        is_active: formData.is_active,
        is_featured: formData.is_featured,
        is_trending: formData.is_trending,
        is_new: formData.is_new,
      };

      if (formData.compare_at_price > 0) {
        productData.compare_at_price = formData.compare_at_price;
      }

      if (editingProduct) {
        const { error } = await supabase
          .from('products')
          .update(productData)
          .eq('id', editingProduct.id);
        if (error) throw error;
        const updatedProducts = products.map(p =>
          p.id === editingProduct.id ? { ...p, ...productData, id: p.id } as AdminProduct : p
        );
        setProducts(updatedProducts);
        toast.success('Product updated successfully');
      } else {
        const { data, error } = await supabase
          .from('products')
          .insert(productData)
          .select()
          .single();
        if (error) throw error;
        setProducts([data, ...products]);
        toast.success('Product created successfully');
      }
      setShowModal(false);
    } catch (error) {
      console.error('Error saving product:', error);
      toast.error('Failed to save product');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Products</h1>
          <p className="text-gray-400 mt-1">Manage your product inventory</p>
        </div>
        <button onClick={openAddModal} className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg transition-colors">
          <Plus className="w-5 h-5" />
          Add Product
        </button>
      </div>

      {/* Search and Filter */}
      <div className="flex gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-[#1a1a1a] border border-white/10 rounded-lg pl-10 pr-4 py-2 text-white placeholder:text-gray-400 focus:outline-none focus:border-orange-500"
          />
        </div>
        <button className="flex items-center gap-2 bg-[#1a1a1a] border border-white/10 rounded-lg px-4 py-2 text-white hover:border-orange-500 transition-colors">
          <Filter className="w-5 h-5" />
          Filter
        </button>
      </div>

      {/* Products Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-[#1a1a1a] rounded-2xl border border-white/10 overflow-hidden"
      >
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-white/5">
              <tr>
                <th className="text-left px-6 py-4 text-sm font-medium text-gray-400">Product</th>
                <th className="text-left px-6 py-4 text-sm font-medium text-gray-400">Brand</th>
                <th className="text-left px-6 py-4 text-sm font-medium text-gray-400">Price</th>
                <th className="text-left px-6 py-4 text-sm font-medium text-gray-400">Stock</th>
                <th className="text-left px-6 py-4 text-sm font-medium text-gray-400">Status</th>
                <th className="text-left px-6 py-4 text-sm font-medium text-gray-400">Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={6} className="px-6 py-8 text-center">
                    <div className="w-8 h-8 border-2 border-orange-500 border-t-transparent rounded-full animate-spin mx-auto" />
                  </td>
                </tr>
              ) : filteredProducts.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-8 text-center text-gray-500">
                    No products found
                  </td>
                </tr>
              ) : (
                filteredProducts.map((product) => (
                  <tr key={product.id} className="border-t border-white/10 hover:bg-white/5">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-gray-800 rounded-lg overflow-hidden flex-shrink-0">
                          {product.images?.[0] ? (
                            <Image
                              src={product.images[0]}
                              alt={product.name}
                              width={48}
                              height={48}
                              className="object-cover w-full h-full"
                            />
                          ) : (
                            <div className="w-full h-full bg-gray-700" />
                          )}
                        </div>
                        <div>
                          <p className="text-white font-medium">{product.name}</p>
                          <p className="text-gray-500 text-sm">{product.slug}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-gray-300">{product.brand || '-'}</td>
                    <td className="px-6 py-4">
                      <div>
                        <p className="text-white font-medium">PKR {product.price?.toLocaleString()}</p>
                        {product.compare_at_price && (
                          <p className="text-gray-500 text-sm line-through">
                            PKR {product.compare_at_price?.toLocaleString()}
                          </p>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        (product.stock_quantity || 0) > 10 ? 'bg-green-500/20 text-green-400' :
                        (product.stock_quantity || 0) > 0 ? 'bg-yellow-500/20 text-yellow-400' :
                        'bg-red-500/20 text-red-400'
                      }`}>
                        {product.stock_quantity || 0} in stock
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        product.is_active ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'
                      }`}>
                        {product.is_active ? 'Active' : 'Inactive'}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <button onClick={() => openEditModal(product)} className="p-2 text-gray-400 hover:text-orange-500 transition-colors">
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(product.id)}
                          className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </motion.div>

      {/* Product Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-[#1a1a1a] rounded-2xl border border-white/10 w-full max-w-2xl max-h-[90vh] overflow-y-auto"
          >
            <div className="p-6 border-b border-white/10 flex items-center justify-between">
              <h2 className="text-xl font-bold text-white">
                {editingProduct ? 'Edit Product' : 'Add New Product'}
              </h2>
              <button onClick={() => setShowModal(false)} className="p-2 text-gray-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2">
                  <label className="block text-sm text-gray-400 mb-2">Product Name *</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-orange-500"
                    placeholder="Air Max Pulse Eclipse"
                  />
                </div>
                <div className="col-span-2">
                  <label className="block text-sm text-gray-400 mb-2">Description</label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    rows={3}
                    className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-orange-500 resize-none"
                    placeholder="Product description..."
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-2">Price (PKR) *</label>
                  <input
                    type="number"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
                    className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-orange-500"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-2">Compare at Price</label>
                  <input
                    type="number"
                    value={formData.compare_at_price}
                    onChange={(e) => setFormData({ ...formData, compare_at_price: Number(e.target.value) })}
                    className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-orange-500"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-2">Brand</label>
                  <input
                    type="text"
                    value={formData.brand}
                    onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
                    className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-orange-500"
                    placeholder="NexWalk Original"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-2">Stock Quantity</label>
                  <input
                    type="number"
                    value={formData.stock_quantity}
                    onChange={(e) => setFormData({ ...formData, stock_quantity: Number(e.target.value) })}
                    className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-orange-500"
                  />
                </div>
                <div className="col-span-2">
                  <label className="block text-sm text-gray-400 mb-2">Category</label>
                  <select
                    value={formData.category_id}
                    onChange={(e) => setFormData({ ...formData, category_id: e.target.value })}
                    className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-orange-500"
                  >
                    {categories.map((cat) => (
                      <option key={cat.id} value={cat.id}>{cat.name}</option>
                    ))}
                  </select>
                </div>
                <div className="col-span-2">
                  <label className="block text-sm text-gray-400 mb-2">Image URLs (one per line)</label>
                  <textarea
                    value={formData.images.join('\n')}
                    onChange={(e) => setFormData({ ...formData, images: e.target.value.split('\n').filter(img => img.trim()) })}
                    rows={3}
                    className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-orange-500 resize-none font-mono text-sm"
                    placeholder="https://images.unsplash.com/photo-xxx"
                  />
                </div>
                <div className="col-span-2">
                  <label className="block text-sm text-gray-400 mb-2">Sizes (comma separated)</label>
                  <input
                    type="text"
                    value={formData.sizes.join(', ')}
                    onChange={(e) => setFormData({ ...formData, sizes: e.target.value.split(',').map(s => s.trim()).filter(s => s) })}
                    className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-orange-500"
                    placeholder="US 7, US 8, US 9, US 10"
                  />
                </div>
                <div className="col-span-2">
                  <div className="flex items-center gap-6">
                    <label className="flex items-center gap-2 text-gray-400 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.is_featured}
                        onChange={(e) => setFormData({ ...formData, is_featured: e.target.checked })}
                        className="w-4 h-4 accent-orange-500"
                      />
                      Featured
                    </label>
                    <label className="flex items-center gap-2 text-gray-400 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.is_trending}
                        onChange={(e) => setFormData({ ...formData, is_trending: e.target.checked })}
                        className="w-4 h-4 accent-orange-500"
                      />
                      Trending
                    </label>
                    <label className="flex items-center gap-2 text-gray-400 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.is_new}
                        onChange={(e) => setFormData({ ...formData, is_new: e.target.checked })}
                        className="w-4 h-4 accent-orange-500"
                      />
                      New
                    </label>
                    <label className="flex items-center gap-2 text-gray-400 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.is_active}
                        onChange={(e) => setFormData({ ...formData, is_active: e.target.checked })}
                        className="w-4 h-4 accent-orange-500"
                      />
                      Active
                    </label>
                  </div>
                </div>
              </div>
            </div>
            <div className="p-6 border-t border-white/10 flex justify-end gap-4">
              <button
                onClick={() => setShowModal(false)}
                className="px-6 py-2 bg-white/10 text-white rounded-lg hover:bg-white/20 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                disabled={saving || !formData.name || !formData.price}
                className="flex items-center gap-2 px-6 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {saving ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Saving...
                  </>
                ) : (
                  <>
                    <Save className="w-4 h-4" />
                    {editingProduct ? 'Update Product' : 'Add Product'}
                  </>
                )}
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}