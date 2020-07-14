import React, { ReactNode } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import Header from './Header'

import { useEffect } from 'react'
import { useUser } from '../firebase/userContext'
import firebase from '../firebase/clientApp'

type Props = {
  children: ReactNode
  title?: string
}

const Layout = ({ children, title = 'Give Tithe' }: Props) => {
  // Our custom hook to get context values
  const { loadingUser, user } = useUser()

  useEffect(() => {
    if (!loadingUser) {
      // You know that the user is loaded: either logged in or out!
      // console.log(user)
    }
    // You also have your firebase app initialized
    // console.log(firebase)
  }, [loadingUser, user])

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@natejcho" />
        <meta name="twitter:title" content="Give" />
        <meta
          name="twitter:description"
          content="Give Offering and Tithing Online"
        />
        <meta
          name="twitter:image"
          content="https://nextjs-typescript-react-stripe-js.now.sh/social_card.png"
        />
      </Head>
      <Header title={title} />
      <div className="container">
        <main>{children}</main>
      </div>
    </>
  )
}

export default Layout
