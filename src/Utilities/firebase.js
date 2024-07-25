import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCQtMNfasT2yyl4_dHLgfBG9Hth-rvVk_g",
    authDomain: "clone-de0c1.firebaseapp.com",
    projectId: "clone-de0c1",
    storageBucket: "clone-de0c1.appspot.com",
    messagingSenderId: "775668058951",
    appId: "1:775668058951:web:3e0851bef111dd17939a62",
};

// Initialize Firebase app
const app = initializeApp(firebaseConfig);

// Auth instance
export const auth = getAuth(app);

// Firestore instance
export const firestore = getFirestore(app); 
