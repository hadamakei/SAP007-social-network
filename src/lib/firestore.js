import {
  getFirestore, collection, addDoc, getDocs, deleteDoc, doc,
  onSnapshot, query, where, updateDoc, orderBy,
  serverTimestamp, Timestamp, limit, arrayRemove, arrayUnion,
} from 'https://www.gstatic.com/firebasejs/9.6.8/firebase-firestore.js';

import { updateProfile } from '../../lib/authfirebase.js';

import { firebaseApp } from '../../lib/serverfirebase.js';

const dataBase = getFirestore(firebaseApp);

// liga o banco de dados e diz qual banco usar(nome do banco entre aspas)
const collectionName = collection(dataBase, 'postagens');

// // //Queries traz todos posts de todos usuarios
const queryAllPosts = query(collectionName, orderBy('data', 'desc'), limit(10));

// traz os posts
export async function readDocument() {
  return getDocs(queryAllPosts);
}

// add posts
export async function addDocPosts(date, addPost, user, userName) {
  return addDoc(collectionName, {
    data: date,
    mensagem: addPost.value,
    user: {
      name: userName,
      userId: user.uid,
      photUrl: user.photoURL,
    },
    listaLikes: [],
  });
}

// pega colecao pra atualizar
export function getCollectionToUpdate(postId) {
  return doc(dataBase, 'postagens', postId);
}

// atualiza posts editados
export async function updateDocPost(postId, newText) {
  const dateNew = new Date();
  const collectionUpdate = getCollectionToUpdate(postId);
  return updateDoc(collectionUpdate, {
    mensagem: newText,
    data: dateNew,
  });
}

// atualiza likes dos posts
export async function updateLikesPost(postId, userEmail) {
  const collectionUpdate = getCollectionToUpdate(postId);
  return updateDoc(collectionUpdate, {
    listaLikes: arrayUnion(userEmail),
  });
}

// retira likes dos posts
export async function removeLikePost(postId, userEmail) {
  const collectionPostsToUpdate = getCollectionToUpdate(postId);
  return updateDoc(collectionPostsToUpdate, {
    listaLikes: arrayRemove(userEmail),
  });
}

export async function updateUserProfile(user, userName, photoURL) {
  return updateProfile(user, {
    displayName: userName,
    photoURL,
  });
}

export {
  dataBase, collection, addDoc, getDocs, deleteDoc, doc, onSnapshot,
  query, where, updateDoc, orderBy, serverTimestamp, Timestamp, limit,
};
