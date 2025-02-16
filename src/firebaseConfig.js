// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDAbXb-4KchKF3LOVHQGtvZ_1w_KZdEoqo",
  authDomain: "centre-loisirs-2d24b.firebaseapp.com",
  projectId: "centre-loisirs-2d24b",
  storageBucket: "centre-loisirs-2d24b.firebasestorage.app",
  messagingSenderId: "440590528711",
  appId: "1:440590528711:web:28e1da3208721469c18ee2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialisation du service d'authentification
const auth = getAuth(app);

// Initialisation de Firestore
const db = getFirestore(app);

export { auth, db };