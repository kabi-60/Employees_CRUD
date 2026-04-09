import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBSvkFAo01e2luUNcnaNkL3pmUQ4q0LjlU",
  authDomain: "stock-f60f0.firebaseapp.com",
  projectId: "stock-f60f0",
  storageBucket: "stock-f60f0.firebasestorage.app",
  messagingSenderId: "1050769122148",
  appId: "1:1050769122148:web:eb26b2bd171c8d2e5c1071",
  measurementId: "G-KSG276KVN9"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const db = getFirestore(app);

export { auth, provider, db };
