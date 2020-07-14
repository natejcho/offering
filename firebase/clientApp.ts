import firebase from 'firebase/app'
import admin from 'firebase-admin'
import 'firebase/auth' // If you need it
import 'firebase/firestore' // If you need it

const config = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_PUBLIC_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,

  // databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL,
  // storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  // messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  // appId: process.env.FIREBASE_APP_ID,
}

// Check that `window` is in scope for the analytics module!
if (typeof window !== 'undefined' && !firebase.apps.length) {
  firebase.initializeApp(config)
  // To enable analytics. https://firebase.google.com/docs/analytics/get-started
  // if ('measurementId' in clientCredentials) firebase.analytics()
}

//let's only do this once!
if (!admin.apps.length) {
  const atob = require('atob')
  const serviceAccount =
    process.env.NODE_ENV === 'development'
      ? // TODO: need to update this
        require('firebase-secret.json')
      : JSON.parse(atob(process.env.FIREBASE_SECRET))
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  })
}

export const db = admin.firestore()

export default firebase
