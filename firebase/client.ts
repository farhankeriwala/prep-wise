import { initializeApp, getApp, getApps } from "firebase/app";
import {getAuth} from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyDN8SAi12hYq0FfYRjugBdxbME7NTr_UK8",
    authDomain: "prepwise-730ba.firebaseapp.com",
    projectId: "prepwise-730ba",
    storageBucket: "prepwise-730ba.firebasestorage.app",
    messagingSenderId: "18943887322",
    appId: "1:18943887322:web:9ed7be3a49b043353ba2e3",
    measurementId: "G-MPHM93YY5Y"
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

export const auth = getAuth(app);
export const db = getFirestore(app);