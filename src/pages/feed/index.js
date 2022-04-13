import { auth } from '../../lib/authfirebase.js';
import { dataBase, collection, addDoc, getDocs } from '../../lib/firestore.js';


export default () => {
  const container = document.createElement('div');

  const template = `
    <h1> MEU FEED</h1>
    <textarea id="inputPost" type="text"> </textarea>
    <button id="submitPost" > Postar </button>  

    <ul id="feed">
     
    </ul>

    <button id="logout"> Sair</button>
    `;

  container.innerHTML = template;

  container.querySelector('#logout').addEventListener('click', logout);
  container.querySelector('#submitPost').addEventListener('click', showPostOnFeed /*, createDocument*/);

//adiciona os novos posts na area do feed dentro da ul
  function showPostOnFeed()  {
    const postMessage = container.querySelector('#inputPost').value;
    const feed = container.querySelector('#feed');
    console.log(postMessage)
    const templatePost = `
      <li class="post" style="display:block" id="">
          <p clas="userId"></p>
          <p class="messageContent">${postMessage}</p>
          <p class="date"></p>
          <button id="likePost">Curtir </button>
          <button id="editPost">Editar</button>
          <button id="deletePost">Deletar</button>
      </li>
    `;

  feed.innerHTML += templatePost;
    
  }

 //deslogar do app 
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

  //liga o banco de dados e diz qual banco usar(nome do banco entre aspas)
  const collectionName = collection(dataBase, 'posts');

  //consulta os dados do banco de dados
  getDocs(collectionName)
  .then((snapshot) => {
      //console.log(snapshot.docs)
      let postsList = []
      snapshot.docs.forEach((doc) => {
        postsList.push({...doc.data(), id: doc.id})
      });
      console.log(postsList)
    })
    .catch(err => {
      console.log(err.message)
    })

  //add documentos
  

  container.querySelector('#submitPost').addEventListener('click', (e) => {
    e.preventDefault()
    let addPost = container.querySelector('#inputPost');
    let date = new Date();
    addDoc(collectionName, {
      data: date,
      mensagem: addPost.value,
      user: {
        userId: "",
        photUrl: ""
      }
    })
    .then(() => {
      let addPost = container.querySelector('#inputPost');
      addPost.value= ""
    })

  })

  //deletar post/documentos
  const deletePost = document.querySelector('#post');
  container.querySelector('#submitPost').addEventListener('click', (e) => {
    e.preventDefault()
  })

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

