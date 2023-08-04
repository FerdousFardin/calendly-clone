import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyDuP20CQrl0x4y4b6HWGfvORfSBaeJcmho",
  authDomain: "calendly-defence.firebaseapp.com",
  projectId: "calendly-defence",
  storageBucket: "calendly-defence.appspot.com",
  messagingSenderId: "441216155508",
  appId: "1:441216155508:web:74f87842d92d0bbf96b621",
  measurementId: "G-JBPKJEYPKS",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
