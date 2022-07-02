import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAfazTNlHX8cesk8ApkyO5ARUEtmRAeE_U",
  authDomain: "notepad-38355.firebaseapp.com",
  projectId: "notepad-38355",
  storageBucket: "notepad-38355.appspot.com",
  messagingSenderId: "320165270468",
  appId: "1:320165270468:web:c7278424821edb2bd30a91",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
