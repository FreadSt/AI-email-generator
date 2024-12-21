import http from '../utils/http'

interface StripeSessionResponse {
  url: string
}

export interface Price {
  id: string
  name: string
  price: number
  credits: number
  is_top: boolean
  discount_precent?: number
  discount_amount?: number
  discount_price?: number
  save_price?: number
}

export async function stripeSession(price_id: string, coupon?: string) {
  try {
    return http.post<StripeSessionResponse>('/api/stripe/session', {
      price_id,
      coupon,
    })
  } catch (e) {
    console.log('googleSignIn error', e)
  }
}

export async function stripeWebhook() {
  try {
    return http.post('/api/stripe/webhook', {})
  } catch (e) {
    console.log('googleSignIn error', e)
  }
}

export async function getPrices(coupon?: string) {
  try {
    return http.get<Price[]>('/api/stripe/prices', {
      params: {
        coupon,
      },
    })
  } catch (e) {
    console.log('getPrices error', e)
  }
}
