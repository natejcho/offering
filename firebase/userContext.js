import { useState, useEffect, createContext, useContext } from 'react'
import Cookies from 'js-cookie'
import firebase, { init } from '../firebase'

init()

import { useRouter } from 'next/router'

export const UserContext = createContext()

export default function UserContextComp({ children }) {
  const router = useRouter()
  const [user, setUser] = useState(null)
  const [loadingUser, setLoadingUser] = useState(true) // Helpful, to update the UI accordingly.

  useEffect(() => {
    // Listen authenticated user
    const unsubscriber = firebase.auth().onAuthStateChanged(async (user) => {
      try {
        if (user) {
          // User is signed in.
          const userData = {
            uid: user.uid,
            email: user.email,
            displayName: user.displayName,
            token: firebase.auth().currentUser.getIdToken(),
          }
          // TODO: save as one cookie but need to parse
          Object.entries(userData).forEach((cookie) => {
            Cookies.set(cookie[0], cookie[1], {
              expires: 3,
            })
          })
          // You could also look for the user doc in your Firestore (if you have one):
          // const userDoc = await firebase.firestore().doc(`users/${uid}`).get()
          setUser(userData)
        } else setUser(null)
      } catch (error) {
        // Most probably a connection error. Handle appropriately.
      } finally {
        setLoadingUser(false)
      }
    })

    // Unsubscribe auth listener on unmount
    return () => unsubscriber()
  }, [])

  const logout = async () => {
    return firebase
      .auth()
      .signOut()
      .then(() => {
        // Sign-out successful.
        Cookies.remove('auth')
        setUser(null)
        router.push('/auth')
      })
      .catch((e) => {
        console.error(e)
      })
  }

  return (
    <UserContext.Provider value={{ user, setUser, loadingUser, logout }}>
      {children}
    </UserContext.Provider>
  )
}

// Custom hook that shorhands the context!
export const useUser = () => useContext(UserContext)
