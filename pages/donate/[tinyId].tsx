import { GetServerSidePropsContext } from 'next'
import { fetchGetJSON, getURI } from '../../utils/api-helpers'

import { NextPage } from 'next'
import Layout from '../../components/Layout'
import CheckoutForm from '../../components/CheckoutForm'

interface DonateProps {
  stripeId: string
}

const Donate: NextPage = (props: DonateProps) => {
  return (
    <Layout>
      <CheckoutForm destination={props.stripeId} />
    </Layout>
  )
}

export default Donate

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const { tinyId }: { tinyId?: string } = ctx.query
  if (tinyId) {
    try {
      const data = await fetchGetJSON(
        `${getURI(ctx)}/api/org/get-stripe-id?${new URLSearchParams({
          tinyId,
        }).toString()}`
      )
      if (data.stripeId) {
        return {
          props: {
            stripeId: data.stripeId,
          },
        }
      }
    } catch (err) {
      console.warn(err.message)
    }
  }
  // if the org doesn't or tiny id not sent exist redirect to home
  if (typeof window === 'undefined') {
    ctx.res.setHeader('Location', '/')
    ctx.res.statusCode = 302
    ctx.res.end()
  } else {
    window.location = '/'
  }
  return { props: {} }
}
