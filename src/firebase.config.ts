// Import the functions you need from the SDKs you need
import { initializeApp, FirebaseApp } from "firebase/app";
import { getAnalytics, Analytics } from "firebase/analytics";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig: {
  apiKey: string;
  authDomain: string;
  projectId: string;
  storageBucket: string;
  messagingSenderId: string;
  appId: string;
  measurementId?: string;
} = {
  apiKey: "AIzaSyAw4N0EdAiRL7N1sYGo9ZBMsbGCLgJxC8A",
  authDomain: "staycation-3db3b.firebaseapp.com",
  projectId: "staycation-3db3b",
  storageBucket: "staycation-3db3b.appspot.com",
  messagingSenderId: "615612481699",
  appId: "1:615612481699:web:9f0b42c7c2ac35fd70bf16",
  measurementId: "G-R80KTFW3NE"
};

// Initialize Firebase
const app: FirebaseApp = initializeApp(firebaseConfig);
const analytics: Analytics = getAnalytics(app);
