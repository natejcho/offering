import { NextPage } from 'next'
import Layout from '../components/Layout'
import DonationForm from '../components/DonationForm'

import { Elements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'

interface ServerError {
  code: string
  description: string
}

const TestPage: NextPage = () => {
  const stripePromise = loadStripe(
    process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || ''
  )
  return (
    <Layout title="Testing stripe donations">
      <Elements stripe={stripePromise}>
        <DonationForm />
      </Elements>
    </Layout>
  )
}

export default TestPage
