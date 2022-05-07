export { initializeApp } from 'https://www.gstatic.com/firebasejs/9.6.8/firebase-app.js';
export {
  getFirestore, collection, addDoc, getDocs, deleteDoc, doc,
  onSnapshot, query, where, updateDoc, orderBy,
  serverTimestamp, Timestamp, limit, arrayRemove, arrayUnion,
} from 'https://www.gstatic.com/firebasejs/9.6.8/firebase-firestore.js';

export {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
  getRedirectResult,
  sendPasswordResetEmail,
  updateProfile,
} from 'https://www.gstatic.com/firebasejs/9.6.8/firebase-auth.js';
