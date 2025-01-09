import { z } from 'zod'

const envSchema = z.object({
  // Database/Supabase
  NEXT_PUBLIC_SUPABASE_URL: z.string().url(),
  NEXT_PUBLIC_SUPABASE_ANON_KEY: z.string().min(1),
  
  // Add other environment variables as needed
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
})

// Validate environment variables at runtime
const processEnv = {
  NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
  NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  NODE_ENV: process.env.NODE_ENV,
}

const env = envSchema.parse(processEnv)

export default env

