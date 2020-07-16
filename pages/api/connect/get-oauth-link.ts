import { NextApiRequest, NextApiResponse } from 'next'
const uuidv4 = require('uuid').v4
import firebase, { init } from '../../../firebase'

init()

interface QueryParams {
  uid: string
  email: string
  businessName: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'GET') {
    try {
      const { uid, email, businessName }: QueryParams = req.query
      const doc = await firebase.firestore().doc(`users/${uid}`).get()
      if (!doc.exists || !doc.data()?.stripeId) {
        const state = uuidv4()
        /* eslint-disable @typescript-eslint/no-non-null-assertion, @typescript-eslint/camelcase */
        const args = new URLSearchParams({
          state,
          client_id: process.env.STRIPE_CLIENT_ID!,
          'stripe_user[email]': email,
          'stripe_user[business_type]': 'non_profit',
          'stripe_user[business_name]': businessName,
        })
        const url = `https://connect.stripe.com/express/oauth/authorize?${args.toString()}`
        res.status(200).json({ url })
      } else {
        res.status(200).end('success')
      }
    } catch (err) {
      res.status(500).json({ statusCode: 500, message: err.message })
    }
  } else {
    res.setHeader('Allow', 'GET')
    res.status(405).end('Method Not Allowed')
  }
}
