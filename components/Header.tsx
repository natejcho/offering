import Link from 'next/link'
import { useState } from 'react'
import { fetchGetJSON } from '../utils/api-helpers'

interface Props {
  title: string
}

const Header = ({ title }: Props) => {
  const [disabled, setDisabled] = useState(false)

  const handleLogin = async () => {
    setDisabled(true)

    const data = await fetchGetJSON('/api/stripe/get-oauth-link')
    if (data.url) {
      window.location = data.url
    } else {
      setDisabled(false)
      // elmButton.textContent = "<Something went wrong>";
      console.log('data', data)
    }
  }

  return (
    <header className="flex items-center justify-between flex-wrap bg-teal-500 p-6">
      <Link href="/">
        <div className="flex items-center flex-shrink-0 text-white mr-6">
          <img
            className="fill-current h-8 w-8 mr-2"
            width="54"
            height="54"
            src="/logo.png"
          />
          <span className="font-semibold text-xl tracking-tight">{title}</span>
        </div>
      </Link>
      <div className="w-full block lg:flex lg:items-center lg:w-auto">
        <button
          className="inline-block text-sm px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-teal-500 hover:bg-white mt-4 lg:mt-0"
          disabled={disabled}
          onClick={handleLogin}
        >
          login
        </button>
      </div>
    </header>
  )
}

export default Header
