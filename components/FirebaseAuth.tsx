import { useEffect, useState } from 'react'
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth'
import Router from 'next/router'
import firebase, { init } from '../firebase'

init()

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
    signInSuccessWithAuthResult: async ({ user }) => {
      // xa is the access token, which can be retrieved through
      // firebase.auth().currentUser.getIdToken()
      //TODO: handle firebase signups bc this will be null;
      console.log(user)
      const { uid } = user
      if (uid) {
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
