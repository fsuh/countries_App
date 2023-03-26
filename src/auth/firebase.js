// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { addDoc, collection, getFirestore } from "firebase/firestore";
import { toast } from "react-toastify";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: `${process.env.REACT_APP_FIRESTORE_KEY}`,
  authDomain: "fir-sandbox-bb6c9.firebaseapp.com",
  projectId: "fir-sandbox-bb6c9",
  storageBucket: "fir-sandbox-bb6c9.appspot.com",
  messagingSenderId: "233030894653",
  appId: "1:233030894653:web:fb8cd15f3e12b46e1d5654",
  measurementId: "G-8YENGTPQCD",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const db = getFirestore(app);

const logInWithEmailAndPassword = async (email, password) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (err) {
    console.log(err.message);
    toast.error(`${err.message}`);
  }
};

const registerWithEmailAndPassword = async (name, email, password) => {
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    const user = res.user;
    // const q = query(collection(db, "users"), where("uid", "==", user.id))
    await addDoc(collection(db, "users"), {
      uid: user.uid,
      name,
      authProvider: "local",
      email,
    });
  } catch (err) {
    console.log(err.message);
    toast.error(`${err.message}`);
  }
};

const logout = () => {
  signOut(auth);
};

export {
  auth,
  db,
  logInWithEmailAndPassword,
  registerWithEmailAndPassword,
  logout,
};

// remember to install npm instal --save react-firebase-hooks before manipulating this config file
