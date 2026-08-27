// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCRoJkzdS1VIGTBeN8khJEroKO8zW2M3nE",
  authDomain: "browlicious-web.firebaseapp.com",
  projectId: "browlicious-web",
  storageBucket: "browlicious-web.firebasestorage.app",
  messagingSenderId: "1006855218065",
  appId: "1:1006855218065:web:3ccb3eff52bfb1b4627030",
  measurementId: "G-Y0J5SNE50W"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);