import { NextPage } from 'next'
import Layout from '../components/Layout'
import CheckoutForm from '../components/CheckoutForm'

const IndexPage: NextPage = () => {
  return (
    <Layout>
      <ul className="card-list">
        <li>
          <CheckoutForm />
        </li>
      </ul>
    </Layout>
  )
}

export default IndexPage
