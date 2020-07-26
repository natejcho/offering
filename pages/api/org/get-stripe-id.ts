import { NextApiRequest, NextApiResponse } from 'next'
import firebase, { init } from '../../../firebase'

init()

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'GET') {
    const { tinyId } = req.query
    try {
      const doc = await firebase.firestore().doc(`tinyId/${tinyId}`).get()
      if (!doc.exists || !doc.data()?.stripeId) {
        res.status(404).end('Organization Not Found for tiny Id: ' + tinyId)
      }
      res.status(200).json({ stripeId: doc.data()?.stripeId })
    } catch (err) {
      res.status(500).json({ statusCode: 500, message: err.message })
    }
  } else {
    res.setHeader('Allow', 'GET')
    res.status(405).end('Method Not Allowed')
  }
}
