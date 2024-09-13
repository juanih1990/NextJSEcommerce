// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'
import { getAuth , GoogleAuthProvider} from 'firebase/auth'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET ,
  messagingSenderId: NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID ,
  appId: NEXT_PUBLIC_FIREBASE_APP_ID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app)

export { db }
export const storage = getStorage(app)
export const auth = getAuth(app)
export const providerGoogle = new GoogleAuthProvider(app)