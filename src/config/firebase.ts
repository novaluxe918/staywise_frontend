// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getAnalytics, isSupported } from "firebase/analytics";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyA39CrOmD_9CX6P7UAcc3hi_ZBOMKz1r74",
    authDomain: "staywise-b6ccc.firebaseapp.com",
    projectId: "staywise-b6ccc",
    storageBucket: "staywise-b6ccc.firebasestorage.app",
    messagingSenderId: "639321471321",
    appId: "1:639321471321:web:996279e866dfddac923448",
    measurementId: "G-5E7SJRWLHF"
};


const app = initializeApp(firebaseConfig);


export const db = getFirestore(app);

export const auth = getAuth(app);

export const analyticsPromise = isSupported().then(
    (supported) => supported ? getAnalytics(app) : null
);


