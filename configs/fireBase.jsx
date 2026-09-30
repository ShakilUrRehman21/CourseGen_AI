// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: "chat-app-ff5dc.firebaseapp.com",
  databaseURL: "https://chat-app-ff5dc-default-rtdb.firebaseio.com",
  projectId: "chat-app-ff5dc",
  storageBucket: "chat-app-ff5dc.appspot.com",
  messagingSenderId: "20960617098",
  appId: "1:20960617098:web:9ab8674f376baacbb78373",
  measurementId: "G-43D79CQP40"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage=getStorage(app)