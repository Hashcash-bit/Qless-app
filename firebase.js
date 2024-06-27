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