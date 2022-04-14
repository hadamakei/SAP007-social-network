import {
  getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, GoogleAuthProvider, signInWithPopup, getRedirectResult,
} from 'https://www.gstatic.com/firebasejs/9.6.8/firebase-auth.js';
import { firebaseApp } from '../../lib/serverfirebase.js';

const auth = getAuth(firebaseApp);


export {
  auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, GoogleAuthProvider, signInWithPopup, getRedirectResult,
};
