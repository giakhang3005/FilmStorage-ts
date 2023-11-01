// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAfN7ewM099ZDdrf0aISuhtsKbluFnGrz8",
  authDomain: "lab7-d8ff2.firebaseapp.com",
  projectId: "lab7-d8ff2",
  storageBucket: "lab7-d8ff2.appspot.com",
  messagingSenderId: "930933746097",
  appId: "1:930933746097:web:3640098cfffc4d49c6b590",
  measurementId: "G-ZBNSW8BGC0"
}; 

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth(app);
export const GoogleProvider = new GoogleAuthProvider();