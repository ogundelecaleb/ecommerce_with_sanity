import { initializeApp } from "firebase/app";
import { GoogleAuthProvider, getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC7o8L4k7dIU4pVm2tjVJQibPKiBa5z1B4",
  authDomain: "uber-clone-c3383.firebaseapp.com",
  projectId: "uber-clone-c3383",
  storageBucket: "uber-clone-c3383.appspot.com",
  messagingSenderId: "957107679639",
  appId: "1:957107679639:web:372792b08aeb1b94f614d2",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const provider = new GoogleAuthProvider();
const auth = getAuth();

export { app, provider, auth };
