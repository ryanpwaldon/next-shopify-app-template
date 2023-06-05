import { shopify } from '@/utils/shopify'
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (typeof req.query.shop !== 'string') return res.status(400).send('Missing shop parameter.')
  const shopOrigin = shopify.utils.sanitizeShop(req.query.shop, true) as string
  await shopify.auth.begin({
    callbackPath: '/api/shopify/auth/callback',
    isOnline: false,
    rawRequest: req,
    rawResponse: res,
    shop: shopOrigin,
  })
}
