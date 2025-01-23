import { initializeApp } from "firebase/app";
import { getMessaging } from "firebase/messaging";

const firebaseConfig = {
  apiKey: "AIzaSyD1eR66a4wzSB-4s3EFs5w7dgpv8Ryxarw",
  authDomain: "oneup-f71f5.firebaseapp.com",
  projectId: "oneup-f71f5",
  storageBucket: "oneup-f71f5.firebasestorage.app",
  messagingSenderId: "560676854221",
  appId: "1:560676854221:web:c13786026853a1e2660c84",
  measurementId: "G-E8Z8TLLNYG",
};

export const app = initializeApp(firebaseConfig);
export let messaging = typeof window !== "undefined" ? getMessaging(app) : null;

if (process.browser) {
  // because I'm getting error "Navigator not defined"
  messaging = getMessaging(app);
}

export const VAPID_KEY = process.env.VAPID_KEY;
