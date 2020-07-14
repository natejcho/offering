/* globals window */
import { useEffect, useState } from 'react'
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth'
import firebase from '../firebase/clientApp'
import 'firebase/auth'
import Cookies from 'js-cookie'
import Router from 'next/router'
// import initFirebase from '../utils/auth/initFirebase'
// import { fetchGetJSON } from '../utils/api-helpers'

// Init the Firebase app.
// initFirebase()

const firebaseAuthConfig = {
  signInFlow: 'popup',
  // Auth providers
  // https://github.com/firebase/firebaseui-web#configure-oauth-providers
  signInOptions: [
    {
      provider: firebase.auth.EmailAuthProvider.PROVIDER_ID,
      requireDisplayName: false,
    },
  ],
  signInSuccessUrl: '/',
  credentialHelper: 'none',
  callbacks: {
    signInSuccessWithAuthResult: async ({ user }, redirectUrl) => {
      // xa is the access token, which can be retrieved through
      // firebase.auth().currentUser.getIdToken()
      const { uid, email, xa } = user
      if (uid) {
        const userData = {
          id: uid,
          email,
          token: xa,
        }
        Cookies.set('auth', userData, {
          expires: 3,
        })
        Router.push('/auth?' + new URLSearchParams({ uid }).toString())
        return false
      }
    },
  },
}

const FirebaseAuth = () => {
  // Do not SSR FirebaseUI, because it is not supported.
  // https://github.com/firebase/firebaseui-web/issues/213
  const [renderAuth, setRenderAuth] = useState(false)
  useEffect(() => {
    if (typeof window !== 'undefined') {
      setRenderAuth(true)
    }
  }, [])
  return (
    <div>
      {renderAuth ? (
        <StyledFirebaseAuth
          uiConfig={firebaseAuthConfig}
          firebaseAuth={firebase.auth()}
        />
      ) : null}
    </div>
  )
}

export default FirebaseAuth
