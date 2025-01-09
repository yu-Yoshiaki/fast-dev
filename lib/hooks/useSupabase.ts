import { createClient } from '@supabase/supabase-js'
import { useEffect, useState } from 'react'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export const useSupabase = () => {
  const [client] = useState(() => supabase)

  useEffect(() => {
    // Cleanup function if needed
    return () => {
      // Cleanup Supabase resources if necessary
    }
  }, [])

  return { client }
}