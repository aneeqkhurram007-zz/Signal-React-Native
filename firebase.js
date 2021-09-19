// Import the functions you need from the SDKs you need
// import { initializeApp, getApps, getApp } from "firebase/app";
// import { getAuth } from 'firebase/auth';
// import { getFirestore } from 'firebase/firestore';
import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBsshud4AaBDlA9qJ_VObDasmBlpy3Ni-4",
    authDomain: "signal-clone-eaad9.firebaseapp.com",
    projectId: "signal-clone-eaad9",
    storageBucket: "signal-clone-eaad9.appspot.com",
    messagingSenderId: "894711655956",
    appId: "1:894711655956:web:56c113d5696c032d560101"
};

// Initialize Firebase
const app = !firebase.apps.length ? firebase.initializeApp(firebaseConfig) : firebase.app();
const db = app.firestore();
const auth = firebase.auth();
export { db, auth }