import {
    getFirestore, collection, addDoc, getDocs, deleteDoc, doc, onSnapshot, query, where, updateDoc, orderBy, serverTimestamp, Timestamp, limit,
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

const collectionName = collection(dataBase, 'posts');

// // //Queries traz todos posts de todos usuarios
const queryAllPosts = query(collectionName, orderBy('data', 'desc'), limit(10));

export async function readDocument() {
    return await getDocs(queryAllPosts)
    
}


export async function addDocPosts(date, addPost, user) {
   return await addDoc(collectionName, {
        data: date,
        mensagem: addPost.value,
        user: {
            userId: user.uid,
            photUrl: user.photoURL,
        },
    })
}

// export async function updateDocPost(collectionUpdate, newText, dateFormat){
    
//     updateDoc(collectionUpdate, {
//         mensagem: newText,
//         data: dateFormat,
//       });
// }



export {
    dataBase, collection, addDoc, getDocs, deleteDoc, doc, onSnapshot, query, where, updateDoc, orderBy, serverTimestamp, Timestamp, limit,
};
