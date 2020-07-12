import { NextApiRequest, NextApiResponse } from 'next'
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

interface RequestQuery {
  code: string,
  state: string,
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'GET') {
    const { code, state }: RequestQuery = req.query as RequestQuery;
    try {
      // Assert the state matches the state you provided in the OAuth link (optional).
      // if (req.session.state !== state) {
      //   return res.status(403).json({ error: 'Incorrect state parameter: ' + state });
      // }

      // Send the authorization code to Stripe's API.
      const response = await stripe.oauth.token({
        // eslint-disable-next-line @typescript-eslint/camelcase
        grant_type: 'authorization_code',
        code
      })
      saveAccountId(response.stripe_user_id);

      // Render some HTML or redirect to a different page.
      // res.redirect(301, '/success.html')
      res.status(200).end();
    } catch (err) {
      if (err.type === 'StripeInvalidGrantError') {
        res.status(400).json({ error: 'Invalid authorization code: ' + code });
      } else {
        res.status(500).json({ statusCode: 500, message: err.message })
      }
    }
  } else {
    res.setHeader('Allow', 'GET')
    res.status(405).end('Method Not Allowed')
  }
}

function saveAccountId(id: string) {
  // Save the connected account ID from the response to your database.
  console.log('Connected account ID: ' + id);
}