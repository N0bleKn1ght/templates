// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getDatabase } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBsSOYYTUVUE7uqBTlnv52HrCY61j1yhRE",
  authDomain: "templates-e19db.firebaseapp.com",
  databaseURL: "https://templates-e19db-default-rtdb.firebaseio.com",
  projectId: "templates-e19db",
  storageBucket: "templates-e19db.firebasestorage.app",
  messagingSenderId: "340972401737",
  appId: "1:340972401737:web:81c910185cd9b99047bb98",
  measurementId: "G-5MMEY8KZX8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getDatabase(app);

export { app, db };