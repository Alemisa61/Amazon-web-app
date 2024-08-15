
import firebase from "firebase/compat/app";
import {getAuth} from "firebase/auth";
import "firebase/compat/firestore"
import "firebase/compat/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA8__4IjpB8yej0LoG74-QHac9klz3YOxU",
  authDomain: "clone-2825c.firebaseapp.com",
  projectId: "clone-2825c",
  storageBucket: "clone-2825c.appspot.com",
  messagingSenderId: "375714678787",
  appId: "1:375714678787:web:49a0b5a3128378c31f2636",
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
export const authentication = getAuth(app)
export const database = app.firestore()
