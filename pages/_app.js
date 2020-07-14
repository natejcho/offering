import '../styles/index.css'
import UserProvider from '../firebase/userContext'

function MyApp({ Component, pageProps }) {
  return (
    <UserProvider>
      <Component {...pageProps} />
    </UserProvider>
  )
}

export default MyApp
