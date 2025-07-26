
import Stripe from 'stripe'
import { NextResponse } from 'next/server'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-04-10'
})

export async function POST() {
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    mode: 'payment',
    line_items: [
      {
        price_data: {
          currency: 'gbp',
          product_data: {
            name: 'Legal Document Analysis',
          },
          unit_amount: 500,
        },
        quantity: 1,
      }
    ],
    success_url: 'https://lexai.vercel.app/success',
    cancel_url: 'https://lexai.vercel.app'
  })

  return NextResponse.json({ url: session.url })
}
