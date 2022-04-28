import {
  getFirestore, collection, addDoc, getDocs, deleteDoc, doc, onSnapshot, query, where, updateDoc, orderBy, serverTimestamp, Timestamp, limit, arrayRemove, arrayUnion,
} from 'https://www.gstatic.com/firebasejs/9.6.8/firebase-firestore.js';

import { firebaseApp } from '../../lib/serverfirebase.js';

const dataBase = getFirestore(firebaseApp);

// console.log(dataBase)

// export const getPosts = async () => {
//     const arrPosts = [];
//     const querySnapshot = await getDocs(collection(db, "posts"));
//     querySnapshot.forEach((doc) => {
//       const timeline = doc.data();
//       // console.log(`${doc.id} => ${doc.data()}`);
//       arrPosts.push(timeline);
//     });
//     // console.log(arrPosts, "arrayPosts");
//     return arrPosts;
//   };

// liga o banco de dados e diz qual banco usar(nome do banco entre aspas)
const collectionName = collection(dataBase, 'postagens');

// // //Queries traz todos posts de todos usuarios
const queryAllPosts = query(collectionName, orderBy('data', 'desc'), limit(10));

export async function readDocument() {
  return await getDocs(queryAllPosts);
}

export async function addDocPosts(date, addPost, user) {
  return await addDoc(collectionName, {
    data: date,
    mensagem: addPost.value,
    user: {
      name: '',
      userId: user.uid,
      photUrl: user.photoURL,
    },
    listaLikes: [],
  });
}

export function getCollectionToUpdate(postId) {
  return doc(dataBase, 'postagens', postId);
}

export async function updateDocPost(postId, newText) {
  const dateNew = new Date();
  const collectionUpdate = getCollectionToUpdate(postId);
  return await updateDoc(collectionUpdate, {
    mensagem: newText,
    data: dateNew,
  });
}

export async function updateLikesPost(postId, userEmail) {
  const collectionUpdate = getCollectionToUpdate(postId);
  return await updateDoc(collectionUpdate, {
    listaLikes: arrayUnion(userEmail),
  });
}

export async function removeLikePost(postId, userEmail) {
  const collection = getCollectionToUpdate(postId);
  return await updateDoc(collection, {
    listaLikes: arrayRemove(userEmail),
  });
}

// export async function addLikePost(postId, userEmail){
//     let collection = getCollectionToUpdate(postId)
//     await updateDoc(collection, {
//         listaLikes: arrayUnion(userEmail)
//     });

// }

export {
  dataBase, collection, addDoc, getDocs, deleteDoc, doc, onSnapshot, query, where, updateDoc, orderBy, serverTimestamp, Timestamp, limit,
};
