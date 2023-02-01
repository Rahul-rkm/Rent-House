// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDMubayZ--Be3G6zgreCGLn0H6lSnFg_w8",
    authDomain: "rent-house-app-d60ef.firebaseapp.com",
    projectId: "rent-house-app-d60ef",
    storageBucket: "rent-house-app-d60ef.appspot.com",
    messagingSenderId: "348595833749",
    appId: "1:348595833749:web:91478a31997c34651f849c"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore();