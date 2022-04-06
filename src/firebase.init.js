// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDgFa92eH20kf6C5DTLPU3zHSnjubssw8k",
  authDomain: "email-password-auth-b52c3.firebaseapp.com",
  projectId: "email-password-auth-b52c3",
  storageBucket: "email-password-auth-b52c3.appspot.com",
  messagingSenderId: "344402572599",
  appId: "1:344402572599:web:fd43770a4590849f6dd6b2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default app;