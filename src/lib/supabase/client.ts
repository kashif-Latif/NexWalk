import { createBrowserClient } from '@supabase/ssr';

export function createClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseKey ||
      supabaseUrl.includes('placeholder') ||
      supabaseKey.includes('placeholder') ||
      !supabaseUrl.startsWith('http')) {
    // Return a stub client for build time
    return {
      auth: {
        getUser: async () => ({ data: { user: null }, error: null }),
        onAuthStateChange: () => ({ data: { subscription: { unsubscribe: () => {} } } }),
        signInWithPassword: async () => ({ data: null, error: new Error('Supabase not configured') }),
        signOut: async () => ({ error: null }),
        signUp: async () => ({ data: null, error: null }),
        resetPasswordForEmail: async () => ({ error: null }),
        updateUser: async () => ({ error: null }),
      },
      from: () => ({
        select: () => ({
          eq: () => ({ data: null, error: null }),
          single: async () => ({ data: null, error: null }),
          then: async () => ({ data: [], error: null }),
        }),
        insert: async () => ({ data: null, error: null }),
        update: async () => ({ data: null, error: null }),
        delete: async () => ({ data: null, error: null }),
      }),
    } as any;
  }

  return createBrowserClient(supabaseUrl, supabaseKey);
}