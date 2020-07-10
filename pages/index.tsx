import { NextPage } from 'next'
import Link from 'next/link'
import Layout from '../components/Layout'

import CheckoutForm from '../components/CheckoutForm'

const IndexPage: NextPage = () => {
  return (
    <Layout title="Home | Next.js + TypeScript Example">
      <ul className="card-list">
        <li>
          <CheckoutForm />
        </li>
      </ul>
    </Layout>
  )
}

export default IndexPage
