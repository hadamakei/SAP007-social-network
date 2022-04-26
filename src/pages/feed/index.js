import { auth } from '../../lib/authfirebase.js';
import {
  dataBase, collection, addDoc, getDocs, deleteDoc, doc, onSnapshot, query, where,
} from '../../lib/firestore.js';

export default () => {
  const container = document.createElement('div');
  container.classList.add('feed-container');

  const user = auth.currentUser;
  const userId = user.uid;
  const userEmail = user.email;

  console.log(user);
  console.log(userId);
  console.log(userEmail);
  // liga o banco de dados e diz qual banco usar(nome do banco entre aspas)
  const collectionName = collection(dataBase, 'posts');
  // // //Queries
  const queryPosts = query(collectionName, where('user.userId', '==', userId));

  const template = `
  <div class="feed-posts">
    <h1 class="pginicial"> Página Inicial </h1>
    <textarea class="box-feed" id="inputPost" type="text"> </textarea>
    <button id="submitPost" > Postar </button>  

    <ul id="feed">
     
    </ul>
  
    <button id="logout"> Sair</button>
    </div>
    `;

  container.innerHTML = template;

  container.querySelector('#logout').addEventListener('click', logout);
  container.querySelector('#submitPost').addEventListener('click', () => {
    const postMessage = container.querySelector('#inputPost').value;
    const date = new Date();
    showPostOnFeed(userId, postMessage, date);
  }/* , createDocument */);

  // adiciona os novos posts na area do feed dentro da ul
  function showPostOnFeed(userId, postMessage, date) {
    // const postMessage = container.querySelector('#inputPost').value;
    const feed = container.querySelector('#feed');
    // console.log(postMessage)
    // let date = new Date();
    // readDocument()
    const templatePost = `
      <li class="post" style="display:block" id="">
          <p clas="userId"> Usuário: ${userId} </p>
          <p class="messageContent">Mensagem: ${postMessage}</p>
          <p class="date">${date}</p>
          <button id="likePost">Curtir </button>
          <button id="editPost">Editar</button>
          <button id="deletePost">Deletar</button>
      </li>
    `;

    feed.innerHTML += templatePost;
  }

  // deslogar do app
  function logout() {
    auth.signOut().then(() => {
      // alert('usuario deslogou');
      window.location.href = '#';
    });
  }

  // const findUsers = async () => {
  //   // auth.firestore()
  //   // .collection("users")
  //   // .getDocs()
  //   // .then(snapshot => {
  //   //   console.log(snapshot)
  //   // })
  //   try {
  //     const querySnapshot = await getDocs(collection(dataBase, "users"));
  //     querySnapshot.forEach((doc) => {
  //       console.log(doc)
  //     console.log(`${doc.id} => ${doc.data()}`);
  //   });
  //   } catch (error) {
  //     console.log(error)
  //   }
  // }
  // findUsers()

  // consulta os dados do banco de dados
  async function readDocument() {
    await getDocs(queryPosts)
      .then((snapshot) => {
        // console.log(snapshot.docs)
        //   let postsList = []
        snapshot.docs.forEach((doc) => {
          showPostOnFeed(doc.data().user.userId, doc.data().mensagem, doc.data().data);
          //     postsList.push({...doc.data(), id: doc.id})
        });
        //   console.log(postsList)
      })
      .catch((err) => {
        console.log(err.message);
      });
  }
  readDocument();

  // coleta de dados em real time

  // onSnapshot(collectionName, (snapshot) => {
  //   let postsList = []
  //   snapshot.docs.forEach((doc) => {
  //     postsList.push({ ...doc.data(), id: doc.id  })
  //   });
  //   console.log(postsList)

  // })

  // async function readDocument(){
  //   const mySnapshot = await getDoc(nomedocumento);
  //   if(mySnapshot.exists()){
  //     const docData = mySnapshot.data()
  //     console.log(`dados: ${JSON.stringify(docData)}`)
  //   }
  // }

  // add documentos posts no banco
  container.querySelector('#submitPost').addEventListener('click', (e) => {
    e.preventDefault();
    const addPost = container.querySelector('#inputPost');
    const date = new Date();
    console.log(date);
    addDoc(collectionName, {
      data: date,
      mensagem: addPost.value,
      user: {
        userId: user.uid,
        photUrl: user.photoURL,
      },
    })
      .then(() => {
        const addPost = container.querySelector('#inputPost');
        addPost.value = '';
      });
  });

  // deletar post/documentos
  // const deletePost = document.querySelector('#post');
  // container.querySelector('#submitPost').addEventListener('click', (e) => {
  //   e.preventDefault()

  //   const docRef = doc(dataBase, 'posts', deletePost.id.value)

  //   deleteDoc(docRef)
  //     .then(() => {
  //       deletePost.value=""
  //     })

  // })

  // const createDocument = async () => {

  //   try {
  //     const docRef = await addDoc(collection(dataBase, "posts"), {
  //       data: "",
  //       mensagem: "teste",
  //       user: {
  //         photoUser: "",
  //         userId: "PqAoLzSJ4xXm5Yb8EFe6v59x98r2"
  //       }

  //     });

  //     console.log("Document written with ID: ", docRef.user.userId);
  //   } catch (e) {
  //     console.error("Error adding document: ", e);
  //   }

  // }

  return container;
};
