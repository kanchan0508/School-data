import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

console.log('🔧 Supabase Config:', {
  url: supabaseUrl ? '✅ Set' : '❌ Missing',
  key: supabaseAnonKey ? '✅ Set' : '❌ Missing',
  urlValue: supabaseUrl,
});

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type School = {
  id: string;
  name: string;
  address: string;
  city: string;
  state: string;
  contact: string;
  image?: string;
  email_id: string;
  created_at: string;
};