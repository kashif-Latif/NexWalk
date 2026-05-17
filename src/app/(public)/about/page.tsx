'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Shield, Award, Users, Heart, Truck, RotateCcw, Star, Clock } from 'lucide-react';

const team = [
  {
    name: 'Muhammad Kashif Latif',
    role: 'Founder & Developer',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80',
    bio: 'Visionary behind NexWalk, bringing premium footwear to Pakistan since 2024.',
  },
];

const values = [
  {
    icon: Shield,
    title: 'Authentic Products',
    description: 'Every product is 100% genuine with quality guarantee.',
  },
  {
    icon: Truck,
    title: 'Fast Delivery',
    description: 'Quick delivery across Pakistan within 2-5 business days.',
  },
  {
    icon: RotateCcw,
    title: 'Easy Returns',
    description: '14-day hassle-free return policy, no questions asked.',
  },
  {
    icon: Award,
    title: 'Premium Quality',
    description: 'Hand-picked products from top brands worldwide.',
  },
];

const stats = [
  { value: '50K+', label: 'Happy Customers' },
  { value: '10K+', label: 'Products Sold' },
  { value: '500+', label: 'Brands' },
  { value: '100%', label: 'Authentic' },
];

const testimonials = [
  {
    name: 'Ahmed Khan',
    location: 'Lahore',
    image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&q=80',
    rating: 5,
    comment: 'Best sneaker collection in Pakistan! Amazing quality and fast delivery.',
  },
  {
    name: 'Sara Ali',
    location: 'Karachi',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&q=80',
    rating: 5,
    comment: 'Found exactly what I was looking for. The fit is perfect and prices are great.',
  },
  {
    name: 'Faizan Malik',
    location: 'Islamabad',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&q=80',
    rating: 5,
    comment: 'My go-to store for all footwear needs. Highly recommend NexWalk!',
  },
];

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-[#0a0a0a]">
        {/* Hero Section */}
        <section className="relative py-20 bg-gradient-to-b from-[#111] to-[#0a0a0a]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-4">
                About <span className="text-orange-500">NexWalk</span>
              </h1>
              <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                Pakistan's premium destination for sneakers and streetwear.
                Founded by Muhammad Kashif Latif, we're on a mission to bring
                authentic, high-quality footwear to every corner of Pakistan.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Stats */}
        <section className="py-16 bg-[#1a1a1a] border-y border-white/10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
              {stats.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="text-center"
                >
                  <div className="text-3xl lg:text-4xl font-bold text-orange-500">{stat.value}</div>
                  <div className="text-gray-400 mt-1">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Story */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
              >
                <h2 className="text-3xl font-bold text-white mb-6">Our Story</h2>
                <div className="space-y-4 text-gray-400">
                  <p>
                    NexWalk was born from a simple idea: everyone deserves access to premium,
                    authentic footwear without the premium price tag or fake products.
                  </p>
                  <p>
                    Founded in 2024 by Muhammad Kashif Latif, NexWalk started as a small
                    online store and has grown into Pakistan's trusted destination for
                    sneakers and streetwear.
                  </p>
                  <p>
                    We personally source each product, ensuring authenticity and quality.
                    From the latest Nike drops to classic Adidas designs, from running shoes
                    to formal footwear - we've got it all.
                  </p>
                  <p className="text-white font-medium">
                    Owner & Developer: Muhammad Kashif Latif
                  </p>
                </div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                className="relative"
              >
                <div className="aspect-square rounded-2xl overflow-hidden bg-gradient-to-br from-orange-500/20 to-orange-600/10 flex items-center justify-center">
                  <div className="text-center p-8">
                    <div className="text-6xl font-bold text-white mb-4">2024</div>
                    <div className="text-orange-500 text-xl">Where It All Started</div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="py-20 bg-[#111]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl font-bold text-white mb-4">Why Choose Us</h2>
              <p className="text-gray-400 max-w-2xl mx-auto">
                We're committed to providing the best shopping experience with quality
                products and exceptional service.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {values.map((value, i) => (
                <motion.div
                  key={value.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-[#1a1a1a] rounded-2xl p-6 border border-white/10 text-center"
                >
                  <div className="w-14 h-14 bg-orange-500/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <value.icon className="w-7 h-7 text-orange-500" />
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">{value.title}</h3>
                  <p className="text-gray-400 text-sm">{value.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Team */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl font-bold text-white mb-4">Meet the Founder</h2>
              <p className="text-gray-400 max-w-2xl mx-auto">
                NexWalk is the vision and creation of Muhammad Kashif Latif,
                dedicated to bringing premium footwear to Pakistan.
              </p>
            </motion.div>

            <div className="flex justify-center">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-[#1a1a1a] rounded-2xl p-8 border border-white/10 max-w-md w-full text-center"
              >
                <div className="w-32 h-32 bg-gray-800 rounded-full mx-auto mb-4 overflow-hidden">
                  <div className="w-full h-full flex items-center justify-center text-4xl font-bold text-orange-500">
                    MK
                  </div>
                </div>
                <h3 className="text-xl font-bold text-white">Muhammad Kashif Latif</h3>
                <p className="text-orange-500 mb-4">Founder & Developer</p>
                <p className="text-gray-400 text-sm">
                  Visionary behind NexWalk, bringing premium footwear to Pakistan since 2024.
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-20 bg-[#111]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl font-bold text-white mb-4">What Our Customers Say</h2>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {testimonials.map((testimonial, i) => (
                <motion.div
                  key={testimonial.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-[#1a1a1a] rounded-2xl p-6 border border-white/10"
                >
                  <div className="flex gap-3 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${i < testimonial.rating ? 'text-yellow-400 fill-current' : 'text-gray-600'}`}
                      />
                    ))}
                  </div>
                  <p className="text-gray-300 mb-4">"{testimonial.comment}"</p>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gray-800 rounded-full overflow-hidden">
                      <div className="w-full h-full flex items-center justify-center text-sm font-medium text-orange-500">
                        {testimonial.name.charAt(0)}
                      </div>
                    </div>
                    <div>
                      <p className="text-white font-medium">{testimonial.name}</p>
                      <p className="text-gray-500 text-sm">{testimonial.location}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <h2 className="text-3xl font-bold text-white mb-4">Ready to Shop?</h2>
              <p className="text-gray-400 mb-8">
                Explore our collection of premium sneakers and footwear.
              </p>
              <Link
                href="/shop"
                className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 rounded-full font-semibold text-lg transition-colors"
              >
                Shop Now
              </Link>
            </motion.div>
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
}