'use client';

import { Suspense, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { CheckCircle, Package, ArrowRight, Copy, Check } from 'lucide-react';
import { createClient } from '@/lib/supabase/client';

function OrderConfirmationContent() {
  const searchParams = useSearchParams();
  const orderNumber = searchParams.get('order') || 'N/A';
  const paymentStatus = searchParams.get('payment') || 'complete';
  const [copied, setCopied] = useState(false);
  const [orderDetails, setOrderDetails] = useState<any>(null);
  const supabase = createClient();

  useEffect(() => {
    if (orderNumber && orderNumber !== 'N/A') {
      fetchOrderDetails();
    }
  }, [orderNumber]);

  const fetchOrderDetails = async () => {
    try {
      const { data } = await supabase
        .from('orders')
        .select('*')
        .eq('order_number', orderNumber)
        .single();
      setOrderDetails(data);
    } catch (error) {
      console.error('Error fetching order:', error);
    }
  };

  const copyOrderNumber = () => {
    navigator.clipboard.writeText(orderNumber);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-[#0a0a0a]">
        <div className="max-w-2xl mx-auto px-4 py-20">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center"
          >
            {/* Success Icon */}
            <div className="w-24 h-24 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-12 h-12 text-green-500" />
            </div>

            <h1 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Order Confirmed!
            </h1>
            <p className="text-gray-400 mb-8">
              {paymentStatus === 'pending'
                ? 'Your order is pending payment verification. Please complete the bank transfer and share the receipt.'
                : 'Thank you for your purchase. We have received your order and will process it shortly.'}
            </p>

            {/* Order Number */}
            <div className="bg-white/5 rounded-2xl border border-white/10 p-6 mb-8">
              <p className="text-gray-400 text-sm mb-2">Order Number</p>
              <div className="flex items-center justify-center gap-3">
                <span className="text-2xl font-bold text-orange-500 font-mono">{orderNumber}</span>
                <button onClick={copyOrderNumber} className="p-2 text-gray-400 hover:text-white transition-colors">
                  {copied ? <Check className="w-5 h-5 text-green-400" /> : <Copy className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {/* Order Details */}
            {orderDetails && (
              <div className="bg-white/5 rounded-2xl border border-white/10 p-6 mb-8 text-left">
                <h3 className="text-lg font-semibold text-white mb-4">Order Details</h3>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Customer:</span>
                    <span className="text-white">{orderDetails.full_name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Email:</span>
                    <span className="text-white">{orderDetails.email}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Phone:</span>
                    <span className="text-white">{orderDetails.phone}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Total:</span>
                    <span className="text-white font-bold">PKR {orderDetails.total?.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Payment:</span>
                    <span className="text-white">{orderDetails.payment_method?.toUpperCase()}</span>
                  </div>
                </div>
              </div>
            )}

            {/* Bank Transfer Instructions */}
            {paymentStatus === 'pending' && (
              <div className="bg-orange-500/10 rounded-2xl border border-orange-500/20 p-6 mb-8 text-left">
                <h3 className="text-lg font-semibold text-orange-400 mb-4 flex items-center gap-2">
                  <Package className="w-5 h-5" />
                  Payment Instructions
                </h3>
                <div className="space-y-3 text-sm">
                  <p className="text-gray-300">
                    Please transfer <span className="text-white font-bold">PKR {orderDetails?.total?.toLocaleString()}</span> to:
                  </p>
                  <div className="bg-[#1a1a1a] rounded-lg p-4 space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Bank:</span>
                      <span className="text-white">Askari Bank</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Account Number:</span>
                      <span className="text-white font-mono">0314 4253900</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Account Title:</span>
                      <span className="text-white">Muhammad Kashif Latif</span>
                    </div>
                  </div>
                  <p className="text-orange-400">
                    After transferring, please WhatsApp the receipt to <span className="font-mono">0314 4253900</span>
                  </p>
                </div>
              </div>
            )}

            {/* Next Steps */}
            <div className="bg-white/5 rounded-2xl border border-white/10 p-6 mb-8 text-left">
              <h3 className="text-lg font-semibold text-white mb-4">What happens next?</h3>
              <div className="space-y-4">
                {[
                  { step: 1, title: 'Order Received', desc: 'We have received your order and will confirm shortly.' },
                  { step: 2, title: 'Processing', desc: 'Your order is being prepared for shipment.' },
                  { step: 3, title: 'Shipped', desc: 'You will receive tracking information once shipped.' },
                  { step: 4, title: 'Delivered', desc: 'Receive your premium sneakers at your doorstep!' },
                ].map((item) => (
                  <div key={item.step} className="flex items-start gap-4">
                    <div className="w-8 h-8 bg-orange-500/20 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-orange-500 font-bold text-sm">{item.step}</span>
                    </div>
                    <div>
                      <p className="text-white font-medium">{item.title}</p>
                      <p className="text-gray-400 text-sm">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/shop"
                className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 rounded-full font-semibold transition-colors"
              >
                Continue Shopping
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                href="/"
                className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white px-8 py-4 rounded-full font-semibold transition-colors"
              >
                Back to Home
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default function OrderConfirmationPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center">
      <div className="w-8 h-8 border-2 border-orange-500 border-t-transparent rounded-full animate-spin" />
    </div>}>
      <OrderConfirmationContent />
    </Suspense>
  );
}