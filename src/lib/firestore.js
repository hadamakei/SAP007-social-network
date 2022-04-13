import { firebaseApp} from '../../lib/serverfirebase.js';
import {getFirestore, collection, addDoc, getDocs } from 'https://www.gstatic.com/firebasejs/9.6.8/firebase-firestore.js';


const dataBase = getFirestore(firebaseApp);

// const users = doc(firestore, "users")
// const snapshot = await getDocs(collection)

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

export{ dataBase, collection, addDoc, getDocs}

  