import { initializeApp } from "firebase/app";
import { GoogleAuthProvider, getAuth} from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCPG5V8iD1Xx4_P_qg1SxfBaNhOGllzkNU",
  authDomain: "slack-clone-e361d.firebaseapp.com",
  projectId: "slack-clone-e361d",
  storageBucket: "slack-clone-e361d.appspot.com",
  messagingSenderId: "116935461933",
  appId: "1:116935461933:web:d34300ad0eea2f00f67ca4",
  measurementId: "G-JJEVF1QFE3"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app); // pass the app instance to getAuth
const provider = new GoogleAuthProvider();
export { db, auth,provider };
