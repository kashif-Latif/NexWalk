import { createClient } from '@/lib/supabase/client';

export const contactService = {
  async sendMessage(data: {
    name: string;
    email: string;
    phone?: string;
    subject?: string;
    message: string;
  }) {
    const supabase = createClient();
    const { data: result, error } = await supabase
      .from('contact_messages')
      .insert({
        ...data,
        status: 'unread',
      })
      .select()
      .single();

    if (error) throw error;
    return result;
  },
};