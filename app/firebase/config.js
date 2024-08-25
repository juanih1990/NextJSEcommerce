// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCwvPDPiQaEukbqdcT2WNSBS5FEO5hWStc",
  authDomain: "codernextjs.firebaseapp.com",
  projectId: "codernextjs",
  storageBucket: "codernextjs.appspot.com",
  messagingSenderId: "741568679752",
  appId: "1:741568679752:web:3d045bb3a09a75124ced7d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app)

export {db}