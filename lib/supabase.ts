import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder';

// Initialize the Supabase client (menggunakan Anon Key, patuh pada RLS)
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Initialize the Supabase Admin client (menggunakan Service Role Key, bypass RLS)
// PERINGATAN: Hanya gunakan ini di environment Server/Backend (seperti API routes)!
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || '';
export const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey || supabaseAnonKey);
