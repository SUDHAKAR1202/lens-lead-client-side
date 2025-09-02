import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAbEOvWBWkR5HrivAth_ljRgWOkLPjlCQc",
  authDomain: "lensleads-ai.firebaseapp.com",
  projectId: "lensleads-ai",
  storageBucket: "lensleads-ai.firebasestorage.app",
  messagingSenderId: "470507535143",
  appId: "1:470507535143:web:907e4cead2aedf55f90702"
};


const app = initializeApp(firebaseConfig);


export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

export { app };
