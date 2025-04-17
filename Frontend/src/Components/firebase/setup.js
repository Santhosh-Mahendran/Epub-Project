import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth"

const firebaseConfig = {
  apiKey: "AIzaSyBTJQLGF3KCBswXVxVD_9Vbb2xZ1iOmLJc",
  authDomain: "generate-otp-61a03.firebaseapp.com",
  projectId: "generate-otp-61a03",
  storageBucket: "generate-otp-61a03.firebasestorage.app",
  messagingSenderId: "805012286636",
  appId: "1:805012286636:web:1fd7bd901eb22d39d1c309"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)