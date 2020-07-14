import firebase from 'firebase/app'
import 'firebase/firestore' // If you need it
import 'firebase/auth' // If you need it

const config = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_PUBLIC_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,

  databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL,
  // storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  // messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  // appId: process.env.FIREBASE_APP_ID,
}

// Check that `window` is in scope for the analytics module!
export function init() {
  if (!firebase.apps.length) {
    firebase.initializeApp(config)
  }
}

export default firebase
