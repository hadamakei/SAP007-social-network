import {
  getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, GoogleAuthProvider, signInWithPopup, getRedirectResult,
} from 'https://www.gstatic.com/firebasejs/9.6.8/firebase-auth.js';
import { firebaseApp } from '../../lib/serverfirebase.js';

const auth = getAuth(firebaseApp);

export {
  auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, GoogleAuthProvider, signInWithPopup, getRedirectResult,
};

// DESLOGAR O USUARIO
export function logout() {
  auth.signOut().then(() => {
    // alert('usuario deslogou');
    window.location.hash = '';
  }).catch(() => {
    alert('Erro ao fazer logout');
  });
}
// MANTEM USUARIO LOGADO NO FEED
export function loggedIn(uid) {
  onAuthStateChanged(auth, (user) => {
    uid(user != null);
  });
}
