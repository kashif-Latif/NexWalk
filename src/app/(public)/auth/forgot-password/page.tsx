'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Mail, ArrowLeft, CheckCircle } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { toast } from 'sonner';

export default function ForgotPasswordPage() {
  const { resetPassword } = useAuth();
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSent, setIsSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const { error } = await resetPassword(email);

      if (error) {
        toast.error(error.message || 'Failed to send reset email');
      } else {
        setIsSent(true);
        toast.success('Password reset link sent to your email');
      }
    } catch {
      toast.error('An unexpected error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        {/* Back Link */}
        <Link
          href="/auth/login"
          className="inline-flex items-center gap-2 text-gray-400 hover:text-white mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Login
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/5 rounded-2xl border border-white/10 p-8"
        >
          {/* Header */}
          <div className="text-center mb-8">
            <Link href="/" className="inline-block mb-6">
              <span className="text-2xl font-bold">
                <span className="text-white">Nex</span>
                <span className="text-orange-500">Walk</span>
              </span>
            </Link>
            <h1 className="text-2xl font-bold text-white mb-2">Forgot Password</h1>
            <p className="text-gray-400">
              {isSent
                ? 'Check your email for the reset link'
                : 'Enter your email to receive a reset link'}
            </p>
          </div>

          {isSent ? (
            /* Success State */
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-8"
            >
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-orange-500/10 mb-6">
                <CheckCircle className="w-8 h-8 text-orange-500" />
              </div>
              <p className="text-gray-300 mb-2">
                We have sent a password reset link to
              </p>
              <p className="text-white font-semibold mb-6">{email}</p>
              <p className="text-sm text-gray-500 mb-8">
                Click the link in the email to reset your password. If you do not see it, check your spam folder.
              </p>

              <div className="space-y-3">
                <button
                  onClick={() => {
                    setIsSent(false);
                    setEmail('');
                  }}
                  className="text-orange-500 hover:text-orange-400 text-sm font-medium transition-colors"
                >
                  Try a different email
                </button>
                <br />
                <Link
                  href="/auth/login"
                  className="inline-block text-gray-400 hover:text-white text-sm transition-colors"
                >
                  Return to Sign In
                </Link>
              </div>
            </motion.div>
          ) : (
            /* Form */
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Email */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    placeholder="you@example.com"
                    className="w-full bg-white/10 border border-white/20 rounded-xl py-3.5 pl-12 pr-4 text-white placeholder:text-gray-500 focus:outline-none focus:border-orange-500 transition-colors"
                  />
                </div>
              </div>

              {/* Submit Button */}
              <motion.button
                type="submit"
                disabled={isLoading}
                className="w-full bg-orange-500 hover:bg-orange-600 disabled:bg-orange-500/50 text-white py-3.5 rounded-xl font-semibold transition-colors flex items-center justify-center gap-2"
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
              >
                {isLoading ? (
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  'Send Reset Link'
                )}
              </motion.button>
            </form>
          )}

          {/* Back to Login */}
          {!isSent && (
            <p className="text-center text-gray-400 mt-8">
              Remember your password?{' '}
              <Link
                href="/auth/login"
                className="text-orange-500 hover:text-orange-400 font-medium transition-colors"
              >
                Sign In
              </Link>
            </p>
          )}
        </motion.div>
      </div>
    </div>
  );
}