import { NextResponse } from 'next/server'
import { type NextRequest } from 'next/server'

const shopifyAuthParams = ['hmac', 'host', 'shop', 'timestamp']

export function middleware(request: NextRequest) {
  const isShopifyAuthReq = shopifyAuthParams.every((param) => request.nextUrl.searchParams.has(param))
  if (isShopifyAuthReq) {
    const shopifyAuthUrl = request.nextUrl.clone()
    shopifyAuthUrl.pathname = '/api/shopify/auth/begin'
    return NextResponse.redirect(shopifyAuthUrl)
  }
}

export const config = {
  matcher: '/',
}
