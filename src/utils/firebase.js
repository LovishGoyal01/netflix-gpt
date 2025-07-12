import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyD1ul3YraqIPpMQQRGahJp0KiSv6r-RoWU",
  authDomain: "netflixgpt-1c690.firebaseapp.com",
  projectId: "netflixgpt-1c690",
  storageBucket: "netflixgpt-1c690.appspot.com",
  messagingSenderId: "553522846388",
  appId: "1:553522846388:web:d72b63ec0c70d2de6055e1",
  measurementId: "G-E3E4DRZRDV"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth(app); 
