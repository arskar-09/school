// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.16.0/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/12.16.0/firebase-firestore.js";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDy1F2FhSnnbMlAB23NtBH3qakPSjuHA50",
    authDomain: "my-project1-620be.firebaseapp.com",
    projectId: "my-project1-620be",
    storageBucket: "my-project1-620be.firebasestorage.app",
    messagingSenderId: "370011175567",
    appId: "1:370011175567:web:69725847670dc21f5d8efa",
    measurementId: "G-LLL9E33Z79"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
