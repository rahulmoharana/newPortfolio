// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDXc_VI0hXSQxe6G0OOYJlQ72IKqZEquHk",
  authDomain: "rahulmoharana-354fa.firebaseapp.com",
  projectId: "rahulmoharana-354fa",
  storageBucket: "rahulmoharana-354fa.firebasestorage.app",
  messagingSenderId: "653768425633",
  appId: "1:653768425633:web:f75a334d720bc5330bf0e0",
  measurementId: "G-TQXZYM4YKY"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
