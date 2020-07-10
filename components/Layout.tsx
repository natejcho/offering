import React, { ReactNode } from 'react'
import Head from 'next/head'
import Link from 'next/link'

type Props = {
  children: ReactNode
  title?: string
}

const Layout = ({
  children,
  title = 'Give',
}: Props) => (
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
      <div className="container">
        <header>
          <div className="header-content">
            <Link href="/">
              <a className="logo">
                <img src="/logo.png" />
              </a>
            </Link>
            <h1>
              <span className="light">Offering</span>
              <br />
            Give
          </h1>
          </div>
        </header>
        {children}
      </div>
    </>
  )

export default Layout
