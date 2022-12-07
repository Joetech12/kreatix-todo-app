// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";


const { REACT_APP_YOUR_API_KEY, REACT_APP_YOUR_AUTHDOMAIN, REACT_APP_YOUR_PROJECTID, REACT_APP_YOUR_STORAGEBUCKET, REACT_APP_YOUR_MESSAGING_SENDER_ID, REACT_APP_YOUR_APPID } = process.env

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: REACT_APP_YOUR_API_KEY,
  authDomain: REACT_APP_YOUR_AUTHDOMAIN,
  projectId: REACT_APP_YOUR_PROJECTID,
  storageBucket: REACT_APP_YOUR_STORAGEBUCKET,
  messagingSenderId: REACT_APP_YOUR_MESSAGING_SENDER_ID,
  appId: REACT_APP_YOUR_APPID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)