import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js';
import { getAnalytics } from 'https://www.gstatic.com/firebasejs/10.8.0/firebase-analytics.js';
import { getDatabase } from 'https://www.gstatic.com/firebasejs/10.8.0/firebase-database.js';

// Your web app's Firebase configuration
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