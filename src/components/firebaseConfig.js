// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCZ4iFoxf5ocNpxrWJ5NXvy9jnfzehWG2I",
  authDomain: "improving-cult-dao.firebaseapp.com",
  projectId: "improving-cult-dao",
  storageBucket: "improving-cult-dao.appspot.com",
  messagingSenderId: "537147395380",
  appId: "1:537147395380:web:f42ec49cf9c0a31923e961",
  measurementId: "G-NPZMHYC04D"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);
const auth = getAuth(app);

export {auth, db, firebaseConfig};