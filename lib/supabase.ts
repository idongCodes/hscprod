import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'http://127.0.0.1:54321'
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'fallback-key'
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || 'fallback-service-key'

// Public client (for frontend)
export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Admin client (for server-side operations)
export const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
})

// Database types
export interface Testimonial {
  id: string
  name: string
  title: string
  message: string
  is_approved: boolean
  source: string
  created_at: string
  updated_at: string
}
