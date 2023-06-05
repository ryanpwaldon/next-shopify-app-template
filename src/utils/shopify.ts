import { env } from '@/env.mjs'
import '@shopify/shopify-api/adapters/node'
import { LATEST_API_VERSION, shopifyApi } from '@shopify/shopify-api'

const host = process.env.NGROK_HOST ?? process.env.HOST
if (!host) throw new Error('host is not set.')

export const shopify = shopifyApi({
  isEmbeddedApp: false,
  scopes: ['read_orders'],
  apiVersion: LATEST_API_VERSION,
  apiKey: env.SHOPIFY_API_PUBLIC_KEY,
  apiSecretKey: env.SHOPIFY_API_SECRET_KEY,
  hostScheme: 'https',
  hostName: host,
})
