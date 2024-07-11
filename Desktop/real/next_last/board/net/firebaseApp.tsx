// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDgYyhtqCF-3R_1dxf1wv7mMIV5x3H_Xy0",
  authDomain: "noticeboard-7cab7.firebaseapp.com",
  projectId: "noticeboard-7cab7",
  storageBucket: "noticeboard-7cab7.appspot.com",
  messagingSenderId: "740839546632",
  appId: "1:740839546632:web:aacd8feec281efe96996bd",
  measurementId: "G-S51FLGCBPR",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;
