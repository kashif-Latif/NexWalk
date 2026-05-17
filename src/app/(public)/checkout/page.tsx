'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { ArrowLeft, CreditCard, Banknote, Wallet, Truck, Building2, Copy, Check } from 'lucide-react';
import { createClient } from '@/lib/supabase/client';

export default function CheckoutPage() {
  const router = useRouter();
  const { user } = useAuth();
  const { items, subtotal, totalItems, clearCart } = useCart();
  const [isProcessing, setIsProcessing] = useState(false);
  const [copied, setCopied] = useState(false);
  const supabase = createClient();

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    province: '',
    postalCode: '',
    paymentMethod: 'cod',
    paymentReference: '',
  });

  const shippingCost = subtotal >= 3000 ? 0 : 250;
  const total = subtotal + shippingCost;

  const copyAccountNumber = () => {
    navigator.clipboard.writeText('0314 4253900');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
    toast.success('Account number copied!');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    try {
      // Generate order number
      const orderNumber = `NXW-${Date.now().toString(36).toUpperCase()}`;

      // Prepare shipping address
      const shippingAddress = {
        full_name: formData.fullName,
        phone: formData.phone,
        address_line1: formData.address,
        city: formData.city,
        province: formData.province,
        postal_code: formData.postalCode,
      };

      // Insert order into database
      const { data: order, error: orderError } = await supabase
        .from('orders')
        .insert({
          order_number: orderNumber,
          user_id: user?.id || null,
          email: formData.email,
          full_name: formData.fullName,
          phone: formData.phone,
          shipping_address: shippingAddress,
          subtotal: subtotal,
          shipping_cost: shippingCost,
          total: total,
          status: formData.paymentMethod === 'bank_transfer' ? 'payment_pending' : 'pending',
          payment_method: formData.paymentMethod,
          payment_status: 'pending',
        })
        .select()
        .single();

      if (orderError) {
        console.error('Order insert error:', orderError);
        throw new Error(orderError.message || 'Failed to create order');
      }

      // Insert order items
      const orderItems = items.map(item => ({
        order_id: order.id,
        product_id: item.product.id,
        product_name: item.product.name,
        product_image: item.product.images[0] || null,
        size: item.size,
        color: item.color,
        quantity: item.quantity,
        unit_price: item.price,
        total_price: item.price * item.quantity,
      }));

      const { error: itemsError } = await supabase
        .from('order_items')
        .insert(orderItems);

      if (itemsError) {
        console.error('Order items error:', itemsError);
        // Don't throw - order was created, items might have failed
      }

      clearCart();

      if (formData.paymentMethod === 'bank_transfer') {
        toast.success('Order created! Please complete the bank transfer payment.');
        router.push(`/order-confirmation?order=${orderNumber}&payment=pending`);
      } else {
        toast.success('Order placed successfully!');
        router.push(`/order-confirmation?order=${orderNumber}`);
      }
    } catch (error: any) {
      console.error('Error creating order:', error);
      toast.error(error.message || 'Failed to place order. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const paymentMethods = [
    { id: 'cod', name: 'Cash on Delivery', icon: Banknote, desc: 'Pay when you receive' },
    { id: 'jazzcash', name: 'JazzCash', icon: Wallet, desc: 'Account: 0314 4253900' },
    { id: 'easypaisa', name: 'Easypaisa', icon: Wallet, desc: 'Account: 0314 4253900' },
    { id: 'bank_transfer', name: 'Bank Transfer', icon: Building2, desc: 'Askari Bank - 0314 4253900' },
  ];

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-[#0a0a0a] py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Back Link */}
          <Link
            href="/cart"
            className="inline-flex items-center gap-2 text-gray-400 hover:text-white mb-6 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Cart
          </Link>

          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
            {/* Checkout Form */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-[#1a1a1a] rounded-2xl border border-white/10 p-6"
            >
              <h2 className="text-2xl font-bold text-white mb-6">Checkout</h2>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Contact Info */}
                <div>
                  <h3 className="text-lg font-semibold text-white mb-4">Contact Information</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm text-gray-400 mb-2">Full Name *</label>
                      <input
                        type="text"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleInputChange}
                        required
                        className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder:text-gray-400 focus:outline-none focus:border-orange-500"
                        placeholder="Your full name"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-400 mb-2">Email *</label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder:text-gray-400 focus:outline-none focus:border-orange-500"
                        placeholder="your@email.com"
                      />
                    </div>
                    <div className="sm:col-span-2">
                      <label className="block text-sm text-gray-400 mb-2">Phone Number *</label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        required
                        className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder:text-gray-400 focus:outline-none focus:border-orange-500"
                        placeholder="03XX-XXXXXXX"
                      />
                    </div>
                  </div>
                </div>

                {/* Shipping Address */}
                <div>
                  <h3 className="text-lg font-semibold text-white mb-4">Shipping Address</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm text-gray-400 mb-2">Street Address *</label>
                      <input
                        type="text"
                        name="address"
                        value={formData.address}
                        onChange={handleInputChange}
                        required
                        className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder:text-gray-400 focus:outline-none focus:border-orange-500"
                        placeholder="House #, Street, Area"
                      />
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm text-gray-400 mb-2">City *</label>
                        <input
                          type="text"
                          name="city"
                          value={formData.city}
                          onChange={handleInputChange}
                          required
                          className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder:text-gray-400 focus:outline-none focus:border-orange-500"
                          placeholder="Lahore"
                        />
                      </div>
                      <div>
                        <label className="block text-sm text-gray-400 mb-2">Province *</label>
                        <select
                          name="province"
                          value={formData.province}
                          onChange={handleInputChange}
                          required
                          className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-orange-500 [&>option]:bg-[#1a1a1a] [&>option]:text-white"
                        >
                          <option value="" className="text-gray-400">Select Province</option>
                          <option value="Punjab">Punjab</option>
                          <option value="Sindh">Sindh</option>
                          <option value="Khyber Pakhtunkhwa">Khyber Pakhtunkhwa</option>
                          <option value="Balochistan">Balochistan</option>
                          <option value="Gilgit-Baltistan">Gilgit-Baltistan</option>
                          <option value="Azad Kashmir">Azad Kashmir</option>
                          <option value="Islamabad">Islamabad (Capital Territory)</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm text-gray-400 mb-2">Postal Code</label>
                        <input
                          type="text"
                          name="postalCode"
                          value={formData.postalCode}
                          onChange={handleInputChange}
                          className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder:text-gray-400 focus:outline-none focus:border-orange-500"
                          placeholder="54000"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Payment Method */}
                <div>
                  <h3 className="text-lg font-semibold text-white mb-4">Payment Method</h3>
                  <div className="space-y-3">
                    {paymentMethods.map((method) => (
                      <label
                        key={method.id}
                        className={`flex items-center gap-4 p-4 rounded-xl border cursor-pointer transition-all ${
                          formData.paymentMethod === method.id
                            ? 'border-orange-500 bg-orange-500/10'
                            : 'border-white/10 hover:border-white/20'
                        }`}
                      >
                        <input
                          type="radio"
                          name="paymentMethod"
                          value={method.id}
                          checked={formData.paymentMethod === method.id}
                          onChange={handleInputChange}
                          className="sr-only"
                        />
                        <div className={`p-2 rounded-lg ${
                          formData.paymentMethod === method.id ? 'bg-orange-500 text-white' : 'bg-white/10 text-gray-400'
                        }`}>
                          <method.icon className="w-5 h-5" />
                        </div>
                        <div className="flex-1">
                          <p className="text-white font-medium">{method.name}</p>
                          <p className="text-gray-500 text-sm">{method.desc}</p>
                        </div>
                        <div className={`w-5 h-5 rounded-full border-2 ${
                          formData.paymentMethod === method.id
                            ? 'border-orange-500 bg-orange-500'
                            : 'border-gray-500'
                        }`}>
                          {formData.paymentMethod === method.id && (
                            <div className="w-full h-full rounded-full bg-white scale-50" />
                          )}
                        </div>
                      </label>
                    ))}
                  </div>

                  {/* Bank Transfer Details */}
                  {formData.paymentMethod === 'bank_transfer' && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mt-4 p-4 bg-green-500/10 border border-green-500/20 rounded-xl"
                    >
                      <p className="text-green-400 font-medium mb-3">Bank Transfer Details</p>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-400">Bank:</span>
                          <span className="text-white">Askari Bank</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-gray-400">Account Number:</span>
                          <div className="flex items-center gap-2">
                            <span className="text-white font-mono">0314 4253900</span>
                            <button onClick={copyAccountNumber} className="p-1 text-gray-400 hover:text-white">
                              {copied ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
                            </button>
                          </div>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400">Account Title:</span>
                          <span className="text-white">Muhammad Kashif Latif</span>
                        </div>
                        <p className="text-orange-400 text-xs mt-2">
                          Please transfer exactly PKR {total.toLocaleString()} and keep the receipt.
                        </p>
                      </div>
                    </motion.div>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={isProcessing || items.length === 0}
                  className="w-full bg-orange-500 hover:bg-orange-600 disabled:bg-gray-500 disabled:cursor-not-allowed text-white py-4 rounded-full font-semibold text-lg transition-colors flex items-center justify-center gap-2"
                >
                  {isProcessing ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Processing...
                    </>
                  ) : (
                    <>
                      <Truck className="w-5 h-5" />
                      Place Order - PKR {total.toLocaleString()}
                    </>
                  )}
                </button>
              </form>
            </motion.div>

            {/* Order Summary */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-[#1a1a1a] rounded-2xl border border-white/10 p-6 h-fit sticky top-24"
            >
              <h3 className="text-lg font-semibold text-white mb-4">Order Summary</h3>

              <div className="space-y-4 max-h-[300px] overflow-y-auto mb-4">
                {items.map((item) => (
                  <div key={item.id} className="flex gap-3">
                    <div className="w-16 h-16 bg-gray-800 rounded-lg overflow-hidden flex-shrink-0">
                      <Image
                        src={item.product.images[0]}
                        alt={item.product.name}
                        width={64}
                        height={64}
                        className="object-cover w-full h-full"
                      />
                    </div>
                    <div className="flex-1">
                      <p className="text-white text-sm font-medium line-clamp-1">{item.product.name}</p>
                      <p className="text-gray-500 text-xs">{item.size} / {item.color}</p>
                      <p className="text-gray-400 text-sm">Qty: {item.quantity}</p>
                    </div>
                    <p className="text-white font-medium">
                      PKR {(item.price * item.quantity).toLocaleString()}
                    </p>
                  </div>
                ))}
              </div>

              <div className="border-t border-white/10 pt-4 space-y-3">
                <div className="flex justify-between text-gray-400">
                  <span>Subtotal</span>
                  <span>PKR {subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-gray-400">
                  <span>Shipping</span>
                  <span>{shippingCost === 0 ? <span className="text-green-400">Free</span> : `PKR ${shippingCost}`}</span>
                </div>
                <div className="flex justify-between text-white font-semibold text-lg pt-2 border-t border-white/10">
                  <span>Total</span>
                  <span>PKR {total.toLocaleString()}</span>
                </div>
              </div>

              {/* Payment Accounts */}
              <div className="mt-6 pt-6 border-t border-white/10">
                <p className="text-sm text-gray-400 mb-3">Payment Accounts (for JazzCash/Easypaisa):</p>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-500">JazzCash:</span>
                    <span className="text-orange-500 font-mono">0314 4253900</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Easypaisa:</span>
                    <span className="text-orange-500 font-mono">0314 4253900</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Account Title:</span>
                    <span className="text-white">Muhammad Kashif Latif</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}