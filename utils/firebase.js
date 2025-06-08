// firebase.js for Creator Pulse

import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyD4SdPYy4eeua1Fu0KoUUI4mnDoZpqzbgs",
  authDomain: "creator-pulse-app.firebaseapp.com",
  projectId: "creator-pulse-app",
  storageBucket: "creator-pulse-app.appspot.com",
  messagingSenderId: "612357983696",
  appId: "1:612357983696:web:bee77c08e609a28e693dd5"
};

// ✅ Prevent duplicate Firebase app initialization
const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
export const db = getFirestore(app);
