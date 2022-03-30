import  { firebaseApp } from "../../lib/serverfirebase.js";
import { getAuth,createUserWithEmailAndPassword, signInWithEmailAndPassword  } from "https://www.gstatic.com/firebasejs/9.6.8/firebase-auth.js";

const auth = getAuth(firebaseApp);

export { auth,createUserWithEmailAndPassword, signInWithEmailAndPassword}

