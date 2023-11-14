// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage, ref } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  //Your Firebase cofig data will be here
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

//Get Auth
export const auth = getAuth(app);

//Attach Google Provider
export const provider = new GoogleAuthProvider();

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);

//to upload media to Firebase Storage
export const storage = getStorage(app);
