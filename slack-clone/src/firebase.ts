import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import { getAuth } from "firebase/auth";
import { GoogleAuthProvider } from "firebase/auth";


const firebaseConfig = {
  apiKey: "AIzaSyDkPOTCiQMLg761udBMfwMkoKDBuFk5Y5E",
  authDomain: "slack-clone-214a0.firebaseapp.com",
  projectId: "slack-clone-214a0",
  storageBucket: "slack-clone-214a0.appspot.com",
  messagingSenderId: "792363490591",
  appId: "1:792363490591:web:126a7df33a1e02b3b9642a",
};
const app = firebase.initializeApp(firebaseConfig);
const db = firebase.firestore(app);
const auth = getAuth(app)
const provider = new GoogleAuthProvider();

export { provider, db, auth };
