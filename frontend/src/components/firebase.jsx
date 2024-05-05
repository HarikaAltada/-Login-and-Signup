import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyD7A_IMYd52KXREX8xhaCPfXNVYbvQkg-g",
  authDomain: "loginpage-7241f.firebaseapp.com",
  projectId: "loginpage-7241f",
  storageBucket: "loginpage-7241f.appspot.com",
  messagingSenderId: "213961646443",
  appId: "1:213961646443:web:99c51e9b9588ec6d4e2c2e",
  measurementId: "G-HHF8YSG5DN",
};

// Initialize Firebase with your project configuration
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
export { auth, provider };
