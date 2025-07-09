// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD1ul3YraqIPpMQQRGahJp0KiSv6r-RoWU",
  authDomain: "netflixgpt-1c690.firebaseapp.com",
  projectId: "netflixgpt-1c690",
  storageBucket: "netflixgpt-1c690.firebasestorage.app",
  messagingSenderId: "553522846388",
  appId: "1:553522846388:web:d72b63ec0c70d2de6055e1",
  measurementId: "G-E3E4DRZRDV"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(); 