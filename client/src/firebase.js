// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "simple-authentication-953ca.firebaseapp.com",
  projectId: "simple-authentication-953ca",
  storageBucket: "simple-authentication-953ca.appspot.com",
  messagingSenderId: "318304308468",
  appId: "1:318304308468:web:5a5e730dca92070dbca2a1"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);