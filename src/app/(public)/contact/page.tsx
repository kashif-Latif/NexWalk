'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { MapPin, Phone, Mail, Clock, Send, MessageCircle, Headphones } from 'lucide-react';
import { createClient } from '@/lib/supabase/client';
import { toast } from 'sonner';

export default function ContactPage() {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });
  const supabase = createClient();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { error } = await supabase.from('contact_messages').insert({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        subject: formData.subject,
        message: formData.message,
        status: 'unread',
      });

      if (error) {
        // Table might not exist, try without status
        const { error: error2 } = await supabase.from('contact_messages').insert({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          subject: formData.subject,
          message: formData.message,
        });

        if (error2) {
          throw error2;
        }
      }

      toast.success('Message sent successfully! We will get back to you soon.');
      setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
    } catch (error) {
      console.error('Error sending message:', error);
      toast.error('Failed to send message. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const contactInfo = [
    {
      icon: Phone,
      title: 'Call Us',
      lines: [
        '+92 314 4253900',
        'Muhammad Kashif Latif (JazzCash)',
      ],
    },
    {
      icon: Mail,
      title: 'Email',
      lines: [
        'kashif.latif2004@gmail.com',
        'support@nexwalk.pk',
      ],
    },
    {
      icon: MapPin,
      title: 'Location',
      lines: [
        'Lahore, Pakistan',
        'Serving nationwide',
      ],
    },
    {
      icon: Clock,
      title: 'Business Hours',
      lines: [
        'Mon - Sat: 9AM - 9PM',
        'Sunday: 12PM - 6PM',
      ],
    },
  ];

  const paymentMethods = [
    { name: 'JazzCash', number: '0314 4253900', name2: 'Muhammad Kashif Latif' },
    { name: 'Easypaisa', number: '0314 4253900', name2: 'Muhammad Kashif Latif' },
    { name: 'Nayapay', number: '0314 4253900', name2: 'Muhammad Kashif Latif' },
    { name: 'Sadapay', number: '0314 4253900', name2: 'Muhammad Kashif Latif' },
    { name: 'Askari Bank', number: 'To be provided', name2: 'Muhammad Kashif Latif' },
  ];

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-[#0a0a0a]">
        {/* Hero */}
        <section className="relative py-20 bg-gradient-to-b from-[#111] to-[#0a0a0a]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">
                Contact <span className="text-orange-500">Us</span>
              </h1>
              <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                Have questions? We'd love to hear from you. Send us a message
                and we'll respond as soon as possible.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Contact Info Cards */}
        <section className="py-12 bg-[#1a1a1a]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {contactInfo.map((info, i) => (
                <motion.div
                  key={info.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-[#0a0a0a] rounded-2xl p-6 border border-white/10 text-center"
                >
                  <div className="w-12 h-12 bg-orange-500/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <info.icon className="w-6 h-6 text-orange-500" />
                  </div>
                  <h3 className="text-white font-semibold mb-2">{info.title}</h3>
                  {info.lines.map((line, j) => (
                    <p key={j} className="text-gray-400 text-sm">{line}</p>
                  ))}
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Form */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12">
              {/* Form */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-[#1a1a1a] rounded-2xl p-6 border border-white/10"
              >
                <h2 className="text-2xl font-bold text-white mb-6">Send us a Message</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm text-gray-400 mb-2">Your Name *</label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder:text-gray-400 focus:outline-none focus:border-orange-500"
                        placeholder="John Doe"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-400 mb-2">Email Address *</label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder:text-gray-400 focus:outline-none focus:border-orange-500"
                        placeholder="john@example.com"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm text-gray-400 mb-2">Phone Number</label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder:text-gray-400 focus:outline-none focus:border-orange-500"
                        placeholder="03XX-XXXXXXX"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-400 mb-2">Subject *</label>
                      <select
                        name="subject"
                        value={formData.subject}
                        onChange={handleInputChange}
                        required
                        className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-orange-500 [&>option]:bg-[#1a1a1a] [&>option]:text-white"
                      >
                        <option value="" className="text-gray-400">Select a subject</option>
                        <option value="order">Order Inquiry</option>
                        <option value="product">Product Question</option>
                        <option value="return">Returns & Exchange</option>
                        <option value="payment">Payment Issue</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm text-gray-400 mb-2">Your Message *</label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                      rows={5}
                      className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder:text-gray-400 focus:outline-none focus:border-orange-500 resize-none"
                      placeholder="How can we help you?"
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-orange-500 hover:bg-orange-600 disabled:bg-gray-500 disabled:cursor-not-allowed text-white py-4 rounded-full font-semibold transition-colors flex items-center justify-center gap-2"
                  >
                    {loading ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5" />
                        Send Message
                      </>
                    )}
                  </button>
                </form>
              </motion.div>

              {/* Payment Info */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-6"
              >
                {/* Payment Methods */}
                <div className="bg-[#1a1a1a] rounded-2xl p-6 border border-white/10">
                  <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                    <Headphones className="w-6 h-6 text-orange-500" />
                    Payment Account Details
                  </h3>
                  <p className="text-gray-400 mb-4 text-sm">
                    Account Holder: <span className="text-white font-medium">Muhammad Kashif Latif</span>
                  </p>
                  <div className="space-y-3">
                    {paymentMethods.map((method) => (
                      <div
                        key={method.name}
                        className="flex items-center justify-between p-3 bg-white/5 rounded-lg border border-white/10"
                      >
                        <div>
                          <p className="text-white font-medium">{method.name}</p>
                          <p className="text-gray-500 text-sm">{method.name2}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-orange-500 font-mono">{method.number}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* WhatsApp */}
                <div className="bg-[#1a1a1a] rounded-2xl p-6 border border-white/10">
                  <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                    <MessageCircle className="w-6 h-6 text-green-500" />
                    WhatsApp Support
                  </h3>
                  <p className="text-gray-400 mb-4 text-sm">
                    Get instant support on WhatsApp
                  </p>
                  <a
                    href="https://wa.me/923144253900"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-full font-medium transition-colors"
                  >
                    <MessageCircle className="w-5 h-5" />
                    Chat on WhatsApp
                  </a>
                </div>

                {/* Quick Help */}
                <div className="bg-[#1a1a1a] rounded-2xl p-6 border border-white/10">
                  <h3 className="text-xl font-bold text-white mb-4">Quick Help</h3>
                  <div className="space-y-3 text-sm text-gray-400">
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-orange-500/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-orange-500 text-xs font-bold">1</span>
                      </div>
                      <p>Track your order status in your account dashboard</p>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-orange-500/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-orange-500 text-xs font-bold">2</span>
                      </div>
                      <p>Check our FAQs for common questions</p>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-orange-500/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-orange-500 text-xs font-bold">3</span>
                      </div>
                      <p>Email us at support@nexwalk.pk for detailed queries</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
}