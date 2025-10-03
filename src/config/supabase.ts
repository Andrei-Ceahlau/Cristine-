import { createClient } from '@supabase/supabase-js';

// Configurația Supabase - înlocuiește cu datele tale din Supabase Dashboard
const supabaseUrl = 'https://your-project-id.supabase.co';
const supabaseAnonKey = 'your-anon-key';

// Creează clientul Supabase
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Tipuri pentru baza de date
export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string;
          email: string;
          display_name: string | null;
          phone: string | null;
          is_admin: boolean;
          created_at: string;
        };
        Insert: {
          id: string;
          email: string;
          display_name?: string | null;
          phone?: string | null;
          is_admin?: boolean;
          created_at?: string;
        };
        Update: {
          id?: string;
          email?: string;
          display_name?: string | null;
          phone?: string | null;
          is_admin?: boolean;
          created_at?: string;
        };
      };
      products: {
        Row: {
          id: number;
          name: string;
          description: string | null;
          price: number;
          category: string;
          image_url: string | null;
          in_stock: boolean;
          created_at: string;
        };
        Insert: {
          id?: number;
          name: string;
          description?: string | null;
          price: number;
          category: string;
          image_url?: string | null;
          in_stock?: boolean;
          created_at?: string;
        };
        Update: {
          id?: number;
          name?: string;
          description?: string | null;
          price?: number;
          category?: string;
          image_url?: string | null;
          in_stock?: boolean;
          created_at?: string;
        };
      };
      orders: {
        Row: {
          id: string;
          user_id: string;
          user_email: string;
          user_name: string;
          user_phone: string;
          items: any; // JSON array of OrderItem
          total_amount: number;
          status: string;
          delivery_address: string | null;
          delivery_date: string | null;
          delivery_time: string | null;
          notes: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          user_email: string;
          user_name: string;
          user_phone: string;
          items: any; // JSON array of OrderItem
          total_amount: number;
          status?: string;
          delivery_address?: string | null;
          delivery_date?: string | null;
          delivery_time?: string | null;
          notes?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          user_email?: string;
          user_name?: string;
          user_phone?: string;
          items?: any; // JSON array of OrderItem
          total_amount?: number;
          status?: string;
          delivery_address?: string | null;
          delivery_date?: string | null;
          delivery_time?: string | null;
          notes?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
    };
  };
}

export type UserData = Database['public']['Tables']['users']['Row'];
export type ProductData = Database['public']['Tables']['products']['Row'];
export type OrderData = Database['public']['Tables']['orders']['Row'];
