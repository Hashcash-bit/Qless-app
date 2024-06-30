import { initializeApp, getApps, getApp } from "firebase/app";
import { collection, getFirestore } from "firebase/firestore";
import {
  getAuth,
  getReactNativePersistence,
  initializeAuth,
} from "@firebase/auth";
import { getStorage } from "firebase/storage";
import AsyncStorage from "@react-native-async-storage/async-storage";

const firebaseConfig = {
  apiKey: "AIzaSyBc_TodcA_J2tQE8fHZzQpYphyOLIWihzI",
  authDomain: "qless-e4eca.firebaseapp.com",
  projectId: "qless-e4eca",
  storageBucket: "qless-e4eca.appspot.com",
  messagingSenderId: "1000605016401",
  appId: "1:1000605016401:web:1e6c7e6c24f826a34ef370",
  measurementId: "G-DM5N3B4RQG",
};

let app;
let auth;

if (!getApps().length) {
  app = initializeApp(firebaseConfig);
  auth = initializeAuth(app, {
    persistence: getReactNativePersistence(AsyncStorage),
  });
} else {
  app = getApp();
  auth = getAuth(app);
}

export { auth };

export const db = getFirestore(app);

const usersRef = collection(db, "users");
const positionRef = collection(db, "position");

export { usersRef, positionRef };

// Android: 501287167963-1hvvunm3ls9mj7vaidmtlnmq8285uc51.apps.googleusercontent.com
// SHAH-figerprint 6A:9D:A8:9B:4D:8B:86:E2:F2:AB:DB:8F:27:AE:5A:E9:83:BB:67:53
// pAckage name: dev.qless.app
// WEb Client ID: 1000605016401-r6ckmftfhtp92ohsir2de7mpf8guqbl2.apps.googleusercontent.com
// androind client Id: 1000605016401-a8tlcrp56sq6nu07sldbhd7s5uj1i92g.apps.googleusercontent.com