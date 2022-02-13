import firebase from "firebase/compat/app"
import { getDatabase, ref, onValue, set, get, push} from "firebase/database";
import { getFunctions } from 'firebase/functions';

import "firebase/compat/auth"

const app = firebase.initializeApp({
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
  measurementId: "G-10KEJCF1NB",
})

export const auth = app.auth()
export const db = getDatabase()
export const dbRef = ref
export const dbOnValue = onValue
export const dbSet = set
export const dbGet = get
export const dbPush = push
export const functions = getFunctions(app)

export default app
