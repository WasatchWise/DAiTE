import { createClient } from '@supabase/supabase-js'

// Extract Supabase URL from DATABASE_URL if NEXT_PUBLIC_SUPABASE_URL is not set correctly
const getSupabaseUrl = () => {
  const envUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  // Check if it's a full URL
  if (envUrl?.startsWith('http')) {
    return envUrl
  }
  // Otherwise, construct from DATABASE_URL
  const dbUrl = process.env.DATABASE_URL
  if (dbUrl) {
    // Extract project ref from database URL: postgresql://postgres:...@db.{project-ref}.supabase.co
    const match = dbUrl.match(/db\.([^.]+)\.supabase\.co/)
    if (match) {
      return `https://${match[1]}.supabase.co`
    }
  }
  return envUrl
}

const supabaseUrl = getSupabaseUrl()
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('Supabase environment variables not set. Database features will be unavailable.')
  console.warn('NEXT_PUBLIC_SUPABASE_URL should be: https://{project-ref}.supabase.co')
}

export const supabase = supabaseUrl && supabaseAnonKey
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null

export const isSupabaseConfigured = () => supabase !== null

