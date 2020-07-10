import { NextApiRequest, NextApiResponse } from 'next'

// import { CURRENCY, MIN_AMOUNT, MAX_AMOUNT } from '../../../config'
// import { formatAmountForStripe } from '../../../utils/stripe-helpers'

import Stripe from 'stripe'
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  // https://github.com/stripe/stripe-node#configuration
  apiVersion: '2020-03-02',
})

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    try {
      const paymentIntent = await stripe.paymentIntents.create({
        amount: 1477, // $14.77, an easily identifiable amount
        currency: 'usd',
      });
      console.log('Worked! ', paymentIntent.id);
      res.status(200).json(paymentIntent);
    } catch (err) {
      console.log('Error! ', err.message);
      res.status(500).json({ statusCode: 500, message: err.message })
    }
  } else {
    res.setHeader('Allow', 'POST')
    res.status(405).end('Method Not Allowed')
  }
}
