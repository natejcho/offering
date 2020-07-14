import { NextApiRequest, NextApiResponse } from 'next'
const uuidv4 = require('uuid').v4;
import { db } from '../../../firebase/clientApp';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'GET') {
    try {
      let json = {};
      const doc = await db.doc(`users/${uid}`).get();
      if (!doc.exists || !doc.data()?.stripeId) {

        const state = uuidv4();
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        const args = new URLSearchParams({ state, client_id: process.env.STRIPE_CLIENT_ID!, 'stripe_user[email]': req.query.email, 'stripe_user[business_type]': 'non_profit' })
        const url = `https://connect.stripe.com/express/oauth/authorize?${args.toString()}`;
        json = { url };
      } else {
        res.status(200).json(json);
      }
    } catch (err) {
      res.status(500).json({ statusCode: 500, message: err.message })
    }
  } else {
    res.setHeader('Allow', 'GET')
    res.status(405).end('Method Not Allowed')
  }
}