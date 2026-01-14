import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!

// Check if we should use Prisma instead of Supabase
const usePrisma = process.env.USE_PRISMA_INSTEAD_OF_SUPABASE === 'true'

// Public client (for frontend)
export const supabase = usePrisma ? null : createClient(supabaseUrl, supabaseAnonKey)

// Admin client (for server-side operations)
export const supabaseAdmin = usePrisma ? null : createClient(supabaseUrl, supabaseServiceKey, {
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

// Export flag for conditional logic
export { usePrisma }
