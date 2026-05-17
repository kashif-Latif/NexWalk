'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { createClient } from '@/lib/supabase/client';
import { toast } from 'sonner';
import {
  Settings,
  CreditCard,
  Image,
  Ticket,
  Save,
  Plus,
  Trash2,
  Loader2,
  Store,
  Phone,
  Mail,
  MapPin,
  Globe,
} from 'lucide-react';

interface SiteSetting {
  id: string;
  key: string;
  value: Record<string, unknown>;
  updated_at: string;
}

interface PaymentAccount {
  id: string;
  name: string;
  account_number: string;
  account_title: string;
  account_type: string;
  is_active: boolean;
  display_order: number;
}

interface Banner {
  id: string;
  title: string;
  subtitle: string | null;
  image_url: string;
  mobile_image_url: string | null;
  link_type: string;
  link_value: string | null;
  is_active: boolean;
  sort_order: number;
}

interface Coupon {
  id: string;
  code: string;
  type: string;
  value: number;
  min_order_amount: number | null;
  max_discount: number | null;
  usage_limit: number | null;
  used_count: number;
  valid_from: string;
  valid_until: string | null;
  is_active: boolean;
}

type Tab = 'general' | 'payment' | 'banners' | 'coupons';

export default function AdminSettingsPage() {
  const supabase = createClient();
  const [activeTab, setActiveTab] = useState<Tab>('general');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // General settings
  const [siteSettings, setSiteSettings] = useState<Record<string, string>>({
    site_name: 'NexWalk',
    site_description: 'Premium Footwear Store',
    contact_email: 'info@nexwalk.com',
    contact_phone: '+92 300 1234567',
    address: '123 Main Street, Karachi, Pakistan',
    facebook_url: '',
    instagram_url: '',
    twitter_url: '',
    currency: 'PKR',
    tax_rate: '0',
    free_shipping_threshold: '5000',
  });

  // Payment accounts
  const [paymentAccounts, setPaymentAccounts] = useState<PaymentAccount[]>([]);

  // Banners
  const [banners, setBanners] = useState<Banner[]>([]);

  // Coupons
  const [coupons, setCoupons] = useState<Coupon[]>([]);

  useEffect(() => {
    fetchAllData();
  }, []);

  const fetchAllData = async () => {
    setLoading(true);
    try {
      // Fetch site settings
      const { data: settingsData } = await supabase
        .from('site_settings')
        .select('*');

      if (settingsData) {
        const settingsMap: Record<string, string> = { ...siteSettings };
        (settingsData as SiteSetting[]).forEach((s) => {
          if (typeof s.value === 'object' && s.value !== null) {
            settingsMap[s.key] = String((s.value as Record<string, unknown>).value || '');
          }
        });
        setSiteSettings(settingsMap);
      }

      // Fetch payment accounts
      const { data: payData } = await supabase
        .from('payment_accounts')
        .select('*')
        .order('display_order', { ascending: true });
      if (payData) setPaymentAccounts(payData as PaymentAccount[]);

      // Fetch banners
      const { data: bannerData } = await supabase
        .from('banners')
        .select('*')
        .order('sort_order', { ascending: true });
      if (bannerData) setBanners(bannerData as Banner[]);

      // Fetch coupons
      const { data: couponData } = await supabase
        .from('coupons')
        .select('*')
        .order('created_at', { ascending: false });
      if (couponData) setCoupons(couponData as Coupon[]);
    } catch (error) {
      console.error('Error fetching settings:', error);
      toast.error('Failed to load settings');
    } finally {
      setLoading(false);
    }
  };

  // Save general settings
  const saveGeneralSettings = async () => {
    setSaving(true);
    try {
      for (const [key, value] of Object.entries(siteSettings)) {
        const { error } = await supabase
          .from('site_settings')
          .upsert(
            { key, value: { value }, updated_at: new Date().toISOString() },
            { onConflict: 'key' }
          );
        if (error) throw error;
      }
      toast.success('General settings saved successfully');
    } catch (error) {
      console.error('Error saving settings:', error);
      toast.error('Failed to save settings');
    } finally {
      setSaving(false);
    }
  };

  // Payment account handlers
  const addPaymentAccount = () => {
    setPaymentAccounts([
      ...paymentAccounts,
      {
        id: '',
        name: '',
        account_number: '',
        account_title: '',
        account_type: 'bank',
        is_active: true,
        display_order: paymentAccounts.length,
      },
    ]);
  };

  const updatePaymentAccount = (index: number, field: string, value: string | boolean | number) => {
    const updated = [...paymentAccounts];
    updated[index] = { ...updated[index], [field]: value };
    setPaymentAccounts(updated);
  };

  const removePaymentAccount = (index: number) => {
    setPaymentAccounts(paymentAccounts.filter((_, i) => i !== index));
  };

  const savePaymentAccounts = async () => {
    setSaving(true);
    try {
      // Delete all existing and re-insert
      await supabase.from('payment_accounts').delete().neq('id', '00000000-0000-0000-0000-000000000000');

      for (const account of paymentAccounts) {
        if (!account.name || !account.account_number) continue;
        const { error } = await supabase
          .from('payment_accounts')
          .insert({
            name: account.name,
            account_number: account.account_number,
            account_title: account.account_title || account.name,
            account_type: account.account_type,
            is_active: account.is_active,
            display_order: account.display_order,
          });
        if (error) throw error;
      }
      toast.success('Payment accounts saved');
      fetchAllData();
    } catch (error) {
      console.error('Error saving payment accounts:', error);
      toast.error('Failed to save payment accounts');
    } finally {
      setSaving(false);
    }
  };

  // Banner handlers
  const addBanner = () => {
    setBanners([
      ...banners,
      {
        id: '',
        title: '',
        subtitle: '',
        image_url: '',
        mobile_image_url: '',
        link_type: 'none',
        link_value: '',
        is_active: true,
        sort_order: banners.length,
      },
    ]);
  };

  const updateBanner = (index: number, field: string, value: string | boolean | number) => {
    const updated = [...banners];
    updated[index] = { ...updated[index], [field]: value };
    setBanners(updated);
  };

  const removeBanner = (index: number) => {
    setBanners(banners.filter((_, i) => i !== index));
  };

  const saveBanners = async () => {
    setSaving(true);
    try {
      await supabase.from('banners').delete().neq('id', '00000000-0000-0000-0000-000000000000');

      for (const banner of banners) {
        if (!banner.title || !banner.image_url) continue;
        const { error } = await supabase
          .from('banners')
          .insert({
            title: banner.title,
            subtitle: banner.subtitle || null,
            image_url: banner.image_url,
            mobile_image_url: banner.mobile_image_url || null,
            link_type: banner.link_type,
            link_value: banner.link_value || null,
            is_active: banner.is_active,
            sort_order: banner.sort_order,
          });
        if (error) throw error;
      }
      toast.success('Banners saved');
      fetchAllData();
    } catch (error) {
      console.error('Error saving banners:', error);
      toast.error('Failed to save banners');
    } finally {
      setSaving(false);
    }
  };

  // Coupon handlers
  const addCoupon = () => {
    setCoupons([
      {
        id: '',
        code: '',
        type: 'percentage',
        value: 10,
        min_order_amount: null,
        max_discount: null,
        usage_limit: null,
        used_count: 0,
        valid_from: new Date().toISOString().split('T')[0],
        valid_until: null,
        is_active: true,
      },
      ...coupons,
    ]);
  };

  const updateCoupon = (index: number, field: string, value: string | boolean | number | null) => {
    const updated = [...coupons];
    updated[index] = { ...updated[index], [field]: value };
    setCoupons(updated);
  };

  const removeCoupon = (index: number) => {
    setCoupons(coupons.filter((_, i) => i !== index));
  };

  const saveCoupons = async () => {
    setSaving(true);
    try {
      await supabase.from('coupons').delete().neq('id', '00000000-0000-0000-0000-000000000000');

      for (const coupon of coupons) {
        if (!coupon.code) continue;
        const { error } = await supabase
          .from('coupons')
          .insert({
            code: coupon.code.toUpperCase(),
            type: coupon.type,
            value: coupon.value,
            min_order_amount: coupon.min_order_amount,
            max_discount: coupon.max_discount,
            usage_limit: coupon.usage_limit,
            used_count: coupon.used_count,
            valid_from: coupon.valid_from,
            valid_until: coupon.valid_until || null,
            is_active: coupon.is_active,
          });
        if (error) throw error;
      }
      toast.success('Coupons saved');
      fetchAllData();
    } catch (error) {
      console.error('Error saving coupons:', error);
      toast.error('Failed to save coupons');
    } finally {
      setSaving(false);
    }
  };

  const tabs: { id: Tab; name: string; icon: React.ElementType }[] = [
    { id: 'general', name: 'General', icon: Store },
    { id: 'payment', name: 'Payment Accounts', icon: CreditCard },
    { id: 'banners', name: 'Banners', icon: Image },
    { id: 'coupons', name: 'Coupons', icon: Ticket },
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="w-8 h-8 text-orange-500 animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-white">Settings</h1>
        <p className="text-gray-400 mt-1">Manage your store settings</p>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 border-b border-white/10 pb-0">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 px-4 py-3 text-sm font-medium border-b-2 transition-colors -mb-[1px] ${
              activeTab === tab.id
                ? 'border-orange-500 text-orange-500'
                : 'border-transparent text-gray-400 hover:text-white'
            }`}
          >
            <tab.icon className="w-4 h-4" />
            {tab.name}
          </button>
        ))}
      </div>

      {/* General Settings */}
      {activeTab === 'general' && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/5 rounded-2xl border border-white/10 p-6"
        >
          <h2 className="text-lg font-semibold text-white mb-6">Store Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm text-gray-400 mb-2">Store Name</label>
              <input
                type="text"
                value={siteSettings.site_name}
                onChange={(e) => setSiteSettings({ ...siteSettings, site_name: e.target.value })}
                className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-orange-500"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-2">Currency</label>
              <select
                value={siteSettings.currency}
                onChange={(e) => setSiteSettings({ ...siteSettings, currency: e.target.value })}
                className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-orange-500"
              >
                <option value="PKR">PKR - Pakistani Rupee</option>
                <option value="USD">USD - US Dollar</option>
                <option value="GBP">GBP - British Pound</option>
                <option value="EUR">EUR - Euro</option>
              </select>
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-2">
                <Mail className="w-4 h-4 inline mr-1" />
                Contact Email
              </label>
              <input
                type="email"
                value={siteSettings.contact_email}
                onChange={(e) => setSiteSettings({ ...siteSettings, contact_email: e.target.value })}
                className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-orange-500"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-2">
                <Phone className="w-4 h-4 inline mr-1" />
                Contact Phone
              </label>
              <input
                type="text"
                value={siteSettings.contact_phone}
                onChange={(e) => setSiteSettings({ ...siteSettings, contact_phone: e.target.value })}
                className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-orange-500"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm text-gray-400 mb-2">
                <MapPin className="w-4 h-4 inline mr-1" />
                Address
              </label>
              <input
                type="text"
                value={siteSettings.address}
                onChange={(e) => setSiteSettings({ ...siteSettings, address: e.target.value })}
                className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-orange-500"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-2">Tax Rate (%)</label>
              <input
                type="number"
                value={siteSettings.tax_rate}
                onChange={(e) => setSiteSettings({ ...siteSettings, tax_rate: e.target.value })}
                className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-orange-500"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-2">Free Shipping Threshold</label>
              <input
                type="number"
                value={siteSettings.free_shipping_threshold}
                onChange={(e) => setSiteSettings({ ...siteSettings, free_shipping_threshold: e.target.value })}
                className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-orange-500"
              />
            </div>
          </div>

          <h2 className="text-lg font-semibold text-white mt-8 mb-6">Social Media Links</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm text-gray-400 mb-2">Facebook URL</label>
              <input
                type="url"
                value={siteSettings.facebook_url}
                onChange={(e) => setSiteSettings({ ...siteSettings, facebook_url: e.target.value })}
                className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-orange-500"
                placeholder="https://facebook.com/..."
              />
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-2">Instagram URL</label>
              <input
                type="url"
                value={siteSettings.instagram_url}
                onChange={(e) => setSiteSettings({ ...siteSettings, instagram_url: e.target.value })}
                className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-orange-500"
                placeholder="https://instagram.com/..."
              />
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-2">Twitter URL</label>
              <input
                type="url"
                value={siteSettings.twitter_url}
                onChange={(e) => setSiteSettings({ ...siteSettings, twitter_url: e.target.value })}
                className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-orange-500"
                placeholder="https://twitter.com/..."
              />
            </div>
          </div>

          <div className="mt-8">
            <button
              onClick={saveGeneralSettings}
              disabled={saving}
              className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600 disabled:opacity-50 text-white px-6 py-2.5 rounded-lg font-medium transition-colors"
            >
              {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
              Save Settings
            </button>
          </div>
        </motion.div>
      )}

      {/* Payment Accounts */}
      {activeTab === 'payment' && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/5 rounded-2xl border border-white/10 p-6"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-white">Payment Accounts</h2>
            <button
              onClick={addPaymentAccount}
              className="flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-lg text-sm transition-colors"
            >
              <Plus className="w-4 h-4" />
              Add Account
            </button>
          </div>

          <div className="space-y-4">
            {paymentAccounts.map((account, index) => (
              <div key={index} className="bg-white/5 rounded-xl border border-white/10 p-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs text-gray-400 mb-1">Account Name</label>
                    <input
                      type="text"
                      value={account.name}
                      onChange={(e) => updatePaymentAccount(index, 'name', e.target.value)}
                      className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-orange-500"
                      placeholder="e.g., EasyPaisa"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-400 mb-1">Account Number</label>
                    <input
                      type="text"
                      value={account.account_number}
                      onChange={(e) => updatePaymentAccount(index, 'account_number', e.target.value)}
                      className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-orange-500"
                      placeholder="e.g., 03XX-XXXXXXX"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-400 mb-1">Account Title</label>
                    <input
                      type="text"
                      value={account.account_title}
                      onChange={(e) => updatePaymentAccount(index, 'account_title', e.target.value)}
                      className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-orange-500"
                      placeholder="e.g., Muhammad Ali"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-400 mb-1">Type</label>
                    <select
                      value={account.account_type}
                      onChange={(e) => updatePaymentAccount(index, 'account_type', e.target.value)}
                      className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-orange-500"
                    >
                      <option value="bank">Bank Account</option>
                      <option value="easypaisa">EasyPaisa</option>
                      <option value="jazzcash">JazzCash</option>
                      <option value="sadapay">SadaPay</option>
                      <option value="nayapay">NayaPay</option>
                    </select>
                  </div>
                  <div className="flex items-end gap-4">
                    <label className="flex items-center gap-2 text-sm text-gray-400 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={account.is_active}
                        onChange={(e) => updatePaymentAccount(index, 'is_active', e.target.checked)}
                        className="rounded accent-orange-500"
                      />
                      Active
                    </label>
                    <button
                      onClick={() => removePaymentAccount(index)}
                      className="p-2 text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-lg transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
            {paymentAccounts.length === 0 && (
              <p className="text-gray-500 text-center py-8">No payment accounts configured. Click "Add Account" to add one.</p>
            )}
          </div>

          <div className="mt-6">
            <button
              onClick={savePaymentAccounts}
              disabled={saving}
              className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600 disabled:opacity-50 text-white px-6 py-2.5 rounded-lg font-medium transition-colors"
            >
              {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
              Save Payment Accounts
            </button>
          </div>
        </motion.div>
      )}

      {/* Banners */}
      {activeTab === 'banners' && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/5 rounded-2xl border border-white/10 p-6"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-white">Banners</h2>
            <button
              onClick={addBanner}
              className="flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-lg text-sm transition-colors"
            >
              <Plus className="w-4 h-4" />
              Add Banner
            </button>
          </div>

          <div className="space-y-4">
            {banners.map((banner, index) => (
              <div key={index} className="bg-white/5 rounded-xl border border-white/10 p-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs text-gray-400 mb-1">Title</label>
                    <input
                      type="text"
                      value={banner.title}
                      onChange={(e) => updateBanner(index, 'title', e.target.value)}
                      className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-orange-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-400 mb-1">Subtitle</label>
                    <input
                      type="text"
                      value={banner.subtitle || ''}
                      onChange={(e) => updateBanner(index, 'subtitle', e.target.value)}
                      className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-orange-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-400 mb-1">Image URL</label>
                    <input
                      type="text"
                      value={banner.image_url}
                      onChange={(e) => updateBanner(index, 'image_url', e.target.value)}
                      className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-orange-500"
                      placeholder="https://..."
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-400 mb-1">Mobile Image URL (optional)</label>
                    <input
                      type="text"
                      value={banner.mobile_image_url || ''}
                      onChange={(e) => updateBanner(index, 'mobile_image_url', e.target.value)}
                      className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-orange-500"
                      placeholder="https://..."
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-400 mb-1">Link Type</label>
                    <select
                      value={banner.link_type}
                      onChange={(e) => updateBanner(index, 'link_type', e.target.value)}
                      className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-orange-500"
                    >
                      <option value="none">No Link</option>
                      <option value="product">Product</option>
                      <option value="category">Category</option>
                      <option value="url">External URL</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs text-gray-400 mb-1">Link Value</label>
                    <input
                      type="text"
                      value={banner.link_value || ''}
                      onChange={(e) => updateBanner(index, 'link_value', e.target.value)}
                      className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-orange-500"
                      placeholder="Slug or URL"
                    />
                  </div>
                  <div className="flex items-end gap-4">
                    <label className="flex items-center gap-2 text-sm text-gray-400 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={banner.is_active}
                        onChange={(e) => updateBanner(index, 'is_active', e.target.checked)}
                        className="rounded accent-orange-500"
                      />
                      Active
                    </label>
                    <button
                      onClick={() => removeBanner(index)}
                      className="p-2 text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-lg transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
            {banners.length === 0 && (
              <p className="text-gray-500 text-center py-8">No banners configured. Click "Add Banner" to add one.</p>
            )}
          </div>

          <div className="mt-6">
            <button
              onClick={saveBanners}
              disabled={saving}
              className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600 disabled:opacity-50 text-white px-6 py-2.5 rounded-lg font-medium transition-colors"
            >
              {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
              Save Banners
            </button>
          </div>
        </motion.div>
      )}

      {/* Coupons */}
      {activeTab === 'coupons' && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/5 rounded-2xl border border-white/10 p-6"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-white">Coupons</h2>
            <button
              onClick={addCoupon}
              className="flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-lg text-sm transition-colors"
            >
              <Plus className="w-4 h-4" />
              Add Coupon
            </button>
          </div>

          <div className="space-y-4">
            {coupons.map((coupon, index) => (
              <div key={index} className="bg-white/5 rounded-xl border border-white/10 p-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs text-gray-400 mb-1">Code</label>
                    <input
                      type="text"
                      value={coupon.code}
                      onChange={(e) => updateCoupon(index, 'code', e.target.value.toUpperCase())}
                      className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-orange-500"
                      placeholder="e.g., SAVE20"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-400 mb-1">Type</label>
                    <select
                      value={coupon.type}
                      onChange={(e) => updateCoupon(index, 'type', e.target.value)}
                      className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-orange-500"
                    >
                      <option value="percentage">Percentage</option>
                      <option value="fixed">Fixed Amount</option>
                      <option value="free_shipping">Free Shipping</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs text-gray-400 mb-1">Value</label>
                    <input
                      type="number"
                      value={coupon.value}
                      onChange={(e) => updateCoupon(index, 'value', parseFloat(e.target.value) || 0)}
                      className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-orange-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-400 mb-1">Min Order Amount</label>
                    <input
                      type="number"
                      value={coupon.min_order_amount ?? ''}
                      onChange={(e) => updateCoupon(index, 'min_order_amount', e.target.value ? parseFloat(e.target.value) : null)}
                      className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-orange-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-400 mb-1">Max Discount</label>
                    <input
                      type="number"
                      value={coupon.max_discount ?? ''}
                      onChange={(e) => updateCoupon(index, 'max_discount', e.target.value ? parseFloat(e.target.value) : null)}
                      className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-orange-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-400 mb-1">Usage Limit</label>
                    <input
                      type="number"
                      value={coupon.usage_limit ?? ''}
                      onChange={(e) => updateCoupon(index, 'usage_limit', e.target.value ? parseInt(e.target.value) : null)}
                      className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-orange-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-400 mb-1">Valid From</label>
                    <input
                      type="date"
                      value={coupon.valid_from?.split('T')[0] || ''}
                      onChange={(e) => updateCoupon(index, 'valid_from', e.target.value)}
                      className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-orange-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-400 mb-1">Valid Until</label>
                    <input
                      type="date"
                      value={coupon.valid_until?.split('T')[0] || ''}
                      onChange={(e) => updateCoupon(index, 'valid_until', e.target.value || null)}
                      className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-orange-500"
                    />
                  </div>
                  <div className="flex items-end gap-4">
                    <label className="flex items-center gap-2 text-sm text-gray-400 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={coupon.is_active}
                        onChange={(e) => updateCoupon(index, 'is_active', e.target.checked)}
                        className="rounded accent-orange-500"
                      />
                      Active
                    </label>
                    <span className="text-xs text-gray-500">Used: {coupon.used_count}</span>
                    <button
                      onClick={() => removeCoupon(index)}
                      className="p-2 text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-lg transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
            {coupons.length === 0 && (
              <p className="text-gray-500 text-center py-8">No coupons configured. Click "Add Coupon" to add one.</p>
            )}
          </div>

          <div className="mt-6">
            <button
              onClick={saveCoupons}
              disabled={saving}
              className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600 disabled:opacity-50 text-white px-6 py-2.5 rounded-lg font-medium transition-colors"
            >
              {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
              Save Coupons
            </button>
          </div>
        </motion.div>
      )}
    </div>
  );
}