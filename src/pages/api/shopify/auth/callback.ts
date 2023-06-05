import { shopify } from '@/utils/shopify'
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const callback = await shopify.auth.callback({ rawRequest: req, rawResponse: res })
  console.log('Access token', callback.session.accessToken)
  res.redirect('/')
}
