import { GetServerSidePropsContext } from 'next'
import Router from 'next/router'
// TODO: make clientapp.ts index
import { fetchGetJSON, fetchPostJSON, get_URI } from '../utils/api-helpers'
import Cookies from 'js-cookie'
import { ParsedUrlQuery } from 'querystring'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

interface StripeRedirectQuery extends ParsedUrlQuery {
  code: string
  uid: string
}

const Auth = () => {
  // const router = useRouter()

  // useEffect(() => {
  //   // TODO: this was done client side, since we need the cookies
  //   console.log(Cookies.get('auth'))
  //   debugger;
  //   const uid = Cookies.get('auth')?.id
  //   if (uid) {
  //     // const { code } = router.query as StripeRedirectQuery
  //     if (!router.query.code) {
  //       fetchGetJSON(
  //         '/api/stripe/get-oauth-link?' +
  //         new URLSearchParams({ uid }).toString()
  //       ).then((data) => {
  //         if (data.url) {
  //           window.location = data.url
  //         }
  //       })
  //     } else {
  //       // if coming from stripe redirect after signing up, need to persist the stripeId into firebase
  //       try {
  //         fetchPostJSON('/api/stripe/authorize-oauth', {
  //           ...router.query,
  //           uid,
  //         }).then((response) => {
  //           if (response.status !== 200) {
  //             console.warn(response.message)
  //           }
  //         })
  //       } catch (err) {
  //         if (err && err.response) {
  //           console.warn(err.response)
  //         }
  //       }
  //     }
  //   }
  //   // redirect home if users manually requested this route
  //   const redirect = '/'
  //   Router.replace(redirect)
  // }, [])
  return
}

export default Auth

export const getServerSideProps: void = async (
  ctx: GetServerSidePropsContext
) => {
  // console.log(Cookies.get('auth'));
  // const uid = Cookies.get('auth')?.id
  // TODO: steal parse cookie method from voterpackage
  const { code, uid } = ctx.query as StripeRedirectQuery
  console.log(ctx.query)
  if (uid) {
    if (!code) {
      const data = await fetchGetJSON(
        `${get_URI(ctx)}/api/stripe/get-oauth-link?${new URLSearchParams({
          uid,
        }).toString()}`
      )
      if (data.url) {
        window.location = data.url
        return { props: {} }
      }
    } else {
      // if coming from stripe redirect after signing up, need to persist the stripeId into firebase
      try {
        const response = await fetchPostJSON(
          `${get_URI(ctx)}/api/stripe/authorize-oauth`,
          {
            ...ctx.query,
            code,
            uid,
          }
        )
        if (response.status !== 200) {
          console.warn(response.message)
        }
      } catch (err) {
        if (err && err.response) {
          console.warn(err.response)
        }
      }
    }
  }
  // redirect home if users manually requested this route
  const redirect = '/'
  if (typeof window === 'undefined') {
    ctx.res.writeHead(301, { Location: redirect })
    ctx.res.end()
  } else {
    Router.replace(redirect)
  }
  return { props: {} }
}
