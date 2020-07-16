import { NextApiRequest, NextApiResponse } from 'next'

import { CURRENCY, MIN_AMOUNT, MAX_AMOUNT } from '../../../config'
import { formatAmountForStripe } from '../../../utils/stripe-helpers'

import Stripe from 'stripe'
// TODO: singleton
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  // https://github.com/stripe/stripe-node#configuration
  // apiVersion: '2020-03-02',
})

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    const {
      amount,
      destination,
    }: { amount: number; destination: string } = req.body
    try {
      // Validate the amount that was passed from the client.
      if (!(amount >= MIN_AMOUNT && amount <= MAX_AMOUNT)) {
        throw new Error('Invalid amount.')
      }
      const basePrice = formatAmountForStripe(amount, CURRENCY)
      // Create Checkout Sessions from body params.
      const params: Stripe.Checkout.SessionCreateParams = {
        /* eslint-disable  @typescript-eslint/camelcase */
        submit_type: 'donate',
        payment_method_types: ['card'],
        line_items: [
          {
            name: 'Custom amount donation',
            amount: basePrice,
            currency: CURRENCY,
            quantity: 1,
          },
        ],
        payment_intent_data: {
          application_fee_amount: calculateApplicationFeeAmount(basePrice),
          // The account receiving the funds, as passed from the client.
          transfer_data: {
            destination,
          },
        },
        success_url: `${req.headers.origin}/result?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${req.headers.origin}/donate-with-checkout`,
      }
      const checkoutSession: Stripe.Checkout.Session = await stripe.checkout.sessions.create(
        params
      )

      res.status(200).json(checkoutSession)
    } catch (err) {
      res.status(500).json({ statusCode: 500, message: err.message })
    }
  } else {
    res.setHeader('Allow', 'POST')
    res.status(405).end('Method Not Allowed')
  }
}

// Take a 10% cut.
function calculateApplicationFeeAmount(basePrice) {
  return 0.1 * basePrice
}
