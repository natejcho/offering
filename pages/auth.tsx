import { GetServerSidePropsContext } from 'next'
import {
  fetchGetJSON,
  fetchPostJSON,
  getURI,
  parseCookies,
} from '../utils/api-helpers'
import { ParsedUrlQuery } from 'querystring'
import { useEffect } from 'react'
import { useRouter } from 'next/router'

interface StripeRedirectQuery extends ParsedUrlQuery {
  code: string
}

const Auth = () => {
  const router = useRouter()
  useEffect(() => {
    router.replace('/')
  }, [])
  return <div></div>
}

// Auth.getInitialProps = async ctx => {
export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const cookies = parseCookies(ctx.req)
  const { code } = ctx.query as StripeRedirectQuery
  if (!code) {
    // if coming from login ui need to check if new user
    try {
      const data = await fetchGetJSON(
        `${getURI(ctx)}/api/connect/get-oauth-link?${new URLSearchParams({
          uid: cookies.uid,
          email: cookies.email,
        }).toString()}`
      )
      if (data.url) {
        if (typeof window === 'undefined') {
          // ctx.res.writeHead(307, { Location: data.url })
          ctx.res.setHeader('Location', data.url)
          ctx.res.statusCode = 307
          ctx.res.end()
        } else {
          window.location = data.url
        }
        return { props: {} }
      }
    } catch (err) {
      console.warn(err.message)
    }
  } else {
    // if coming from stripe redirect after signing up, need to persist the stripeId into firebase
    try {
      const response = await fetchPostJSON(
        `${getURI(ctx)}/api/connect/authorize-oauth`,
        {
          code,
          uid: cookies.uid,
          email: cookies.email,
        }
      )
      if (response.status !== 200) {
        console.warn(response.error)
      }
    } catch (err) {
      if (err && err.response) {
        console.warn(err.response)
      }
    }
  }

  return { props: {} }

  /*
  
    if (uid) {

  // redirect home if users manually requested this route
  const redirect = '/login'
  if (typeof window === 'undefined') {
    ctx.res.writeHead(301, { Location: redirect })
    ctx.res.end()
  } else {
    Router.replace(redirect)
  }
  return { props: {} }
  */
}

export default Auth
