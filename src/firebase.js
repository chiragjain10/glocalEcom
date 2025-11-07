// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB2djrMz6xOYv_p3QCDxafnke2BzqydmW4",
  authDomain: "glocalship-e0186.firebaseapp.com",
  projectId: "glocalship-e0186",
  storageBucket: "glocalship-e0186.firebasestorage.app",
  messagingSenderId: "732396048885",
  appId: "1:732396048885:web:7b17a1cb44cb07363850bc",
  measurementId: "G-H3VV0GCZT3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { auth, db, storage };
export default app;