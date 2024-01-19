import { initializeApp } from "firebase/app";
import { GoogleAuthProvider, getAuth} from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
//Your Config
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app); // pass the app instance to getAuth
const provider = new GoogleAuthProvider();
export { db, auth,provider };
