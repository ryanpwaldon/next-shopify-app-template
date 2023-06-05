import { createEnv } from '@t3-oss/env-nextjs'
import { z } from 'zod'

export const env = createEnv({
  server: {
    DATABASE_URL: z.string().url(),
    NODE_ENV: z.enum(['development', 'test', 'production']),
    NGROK_TOKEN: process.env.NODE_ENV === 'development' ? z.string() : z.undefined(),
    NGROK_HOST: process.env.NODE_ENV === 'development' ? z.string() : z.undefined(),
    SHOPIFY_API_PUBLIC_KEY: z.string(),
    SHOPIFY_API_SECRET_KEY: z.string(),
  },
  client: {},
  runtimeEnv: {
    DATABASE_URL: process.env.DATABASE_URL,
    NODE_ENV: process.env.NODE_ENV,
    NGROK_TOKEN: process.env.NGROK_TOKEN,
    NGROK_HOST: process.env.NGROK_HOST,
    SHOPIFY_API_PUBLIC_KEY: process.env.SHOPIFY_API_PUBLIC_KEY,
    SHOPIFY_API_SECRET_KEY: process.env.SHOPIFY_API_SECRET_KEY,
  },
  skipValidation: !!process.env.SKIP_ENV_VALIDATION,
})
