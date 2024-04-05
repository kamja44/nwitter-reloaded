import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDF86ytWLeFxXQh0etsB9nH7giaEuasWnw",
  authDomain: "nwitter-reloaded-ffd6e.firebaseapp.com",
  projectId: "nwitter-reloaded-ffd6e",
  storageBucket: "nwitter-reloaded-ffd6e.appspot.com",
  messagingSenderId: "256591902473",
  appId: "1:256591902473:web:dfffed1eed6dc3d32485d8",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export const storage = getStorage(app);

export const db = getFirestore(app);
