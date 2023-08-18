import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyBWi1BVaQI06V_zPwdqHBbsplLWImV4qPM",
  authDomain: "scheduler-1144e.firebaseapp.com",
  projectId: "scheduler-1144e",
  storageBucket: "scheduler-1144e.appspot.com",
  messagingSenderId: "182695963849",
  appId: "1:182695963849:web:ec3e1e00dd4a2fe4d83118",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
