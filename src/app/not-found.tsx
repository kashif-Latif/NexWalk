'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Home, Search, ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center px-4 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center max-w-md"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring' }}
            className="relative mb-8"
          >
            <div className="text-[150px] font-bold text-orange-500/20 leading-none">
              404
            </div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-24 h-24 bg-orange-500/10 rounded-full flex items-center justify-center">
                <Search className="w-12 h-12 text-orange-500" />
              </div>
            </div>
          </motion.div>

          <h1 className="text-3xl font-bold text-white mb-4">
            Page Not Found
          </h1>
          <p className="text-gray-400 mb-8">
            Oops! The page you are looking for seems to have wandered off.
            Let us get you back on track.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/"
              className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-full font-medium transition-colors"
            >
              <Home className="w-5 h-5" />
              Go Home
            </Link>
            <Link
              href="/shop"
              className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white px-6 py-3 rounded-full font-medium transition-colors border border-white/20"
            >
              <ArrowLeft className="w-5 h-5" />
              Browse Shop
            </Link>
          </div>

          <div className="mt-12 pt-8 border-t border-white/10">
            <p className="text-gray-500 text-sm mb-4">Quick Links</p>
            <div className="flex flex-wrap gap-2 justify-center">
              {['Sneakers', 'Running', 'Casual', 'Boots', 'Sports'].map((cat) => (
                <Link
                  key={cat}
                  href={`/shop?category=${cat.toLowerCase()}`}
                  className="px-4 py-2 bg-white/5 hover:bg-white/10 text-gray-400 hover:text-orange-500 rounded-full text-sm transition-colors"
                >
                  {cat}
                </Link>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
      <Footer />
    </>
  );
}