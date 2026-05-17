'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { MessageSquare, Eye, CheckCircle, Clock, Search } from 'lucide-react';
import { createClient } from '@/lib/supabase/client';
import { toast } from 'sonner';

interface ContactMessage {
  id: string;
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  status: string;
  created_at: string;
}

export default function AdminContacts() {
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const supabase = createClient();

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    try {
      const { data, error } = await supabase
        .from('contact_messages')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setMessages(data || []);
    } catch (error) {
      console.error('Error fetching messages:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredMessages = messages.filter(msg => {
    const matchesSearch = msg.name?.toLowerCase().includes(search.toLowerCase()) ||
      msg.email?.toLowerCase().includes(search.toLowerCase()) ||
      msg.message?.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === 'all' || msg.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const updateMessageStatus = async (id: string, status: string) => {
    try {
      const { error } = await supabase
        .from('contact_messages')
        .update({ status })
        .eq('id', id);

      if (error) throw error;
      setMessages(messages.map(m => m.id === id ? { ...m, status } : m));
      toast.success(`Message marked as ${status}`);
    } catch (error) {
      toast.error('Failed to update message');
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'unread': return 'bg-yellow-500/20 text-yellow-400';
      case 'read': return 'bg-blue-500/20 text-blue-400';
      case 'replied': return 'bg-green-500/20 text-green-400';
      case 'closed': return 'bg-gray-500/20 text-gray-400';
      default: return 'bg-gray-500/20 text-gray-400';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'unread': return Clock;
      case 'read': return Eye;
      case 'replied': return CheckCircle;
      case 'closed': return MessageSquare;
      default: return MessageSquare;
    }
  };

  const unreadCount = messages.filter(m => m.status === 'unread').length;

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-white">Contact Messages</h1>
        <p className="text-gray-400 mt-1">
          Manage customer inquiries
          {unreadCount > 0 && (
            <span className="ml-2 text-orange-500 font-medium">({unreadCount} unread)</span>
          )}
        </p>
      </div>

      {/* Search and Filter */}
      <div className="flex gap-4 flex-wrap">
        <div className="relative flex-1 min-w-[200px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search messages..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-[#1a1a1a] border border-white/10 rounded-lg pl-10 pr-4 py-2 text-white placeholder:text-gray-400 focus:outline-none focus:border-orange-500"
          />
        </div>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="bg-[#1a1a1a] border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-orange-500"
        >
          <option value="all">All Messages</option>
          <option value="unread">Unread</option>
          <option value="read">Read</option>
          <option value="replied">Replied</option>
          <option value="closed">Closed</option>
        </select>
      </div>

      {/* Messages List */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-4"
      >
        {loading ? (
          <div className="flex items-center justify-center py-12">
            <div className="w-8 h-8 border-2 border-orange-500 border-t-transparent rounded-full animate-spin" />
          </div>
        ) : filteredMessages.length === 0 ? (
          <div className="text-center py-12 text-gray-500">
            No messages found
          </div>
        ) : (
          filteredMessages.map((msg) => {
            const StatusIcon = getStatusIcon(msg.status);
            return (
              <motion.div
                key={msg.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-[#1a1a1a] rounded-2xl border border-white/10 p-6 hover:border-orange-500/30 transition-colors"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg ${
                      msg.status === 'unread' ? 'bg-yellow-500/20 text-yellow-400' : 'bg-white/10 text-gray-400'
                    }`}>
                      <StatusIcon className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-white font-semibold">{msg.name}</h3>
                      <p className="text-gray-500 text-sm">{msg.email}</p>
                    </div>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(msg.status)}`}>
                    {msg.status}
                  </span>
                </div>

                <div className="mb-4">
                  <p className="text-sm text-gray-400 mb-1">Subject: {msg.subject || 'No subject'}</p>
                  <p className="text-gray-300">{msg.message}</p>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-gray-500 text-sm">
                    {new Date(msg.created_at).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </span>
                  <div className="flex items-center gap-2">
                    {msg.status === 'unread' && (
                      <button
                        onClick={() => updateMessageStatus(msg.id, 'read')}
                        className="px-3 py-1.5 bg-blue-500/20 text-blue-400 rounded-lg text-sm hover:bg-blue-500/30 transition-colors"
                      >
                        Mark as Read
                      </button>
                    )}
                    {msg.status === 'read' && (
                      <button
                        onClick={() => updateMessageStatus(msg.id, 'replied')}
                        className="px-3 py-1.5 bg-green-500/20 text-green-400 rounded-lg text-sm hover:bg-green-500/30 transition-colors"
                      >
                        Mark as Replied
                      </button>
                    )}
                    {msg.status !== 'closed' && (
                      <button
                        onClick={() => updateMessageStatus(msg.id, 'closed')}
                        className="px-3 py-1.5 bg-white/10 text-gray-400 rounded-lg text-sm hover:bg-white/20 transition-colors"
                      >
                        Close
                      </button>
                    )}
                    <a
                      href={`mailto:${msg.email}?subject=Re: ${msg.subject}&body=${encodeURIComponent('Dear ' + msg.name + ',\n\n')}`}
                      className="px-3 py-1.5 bg-orange-500/20 text-orange-400 rounded-lg text-sm hover:bg-orange-500/30 transition-colors"
                    >
                      Reply
                    </a>
                  </div>
                </div>
              </motion.div>
            );
          })
        )}
      </motion.div>
    </div>
  );
}