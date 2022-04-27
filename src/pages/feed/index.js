import { auth } from '../../lib/authfirebase.js';
import {
  dataBase, readDocument, collection, deleteDoc, doc, query,
  where, orderBy, Timestamp, addDocPosts, updateDocPost,updateLikesPost,
} from '../../lib/firestore.js';

export default () => {
  const container = document.createElement('div');
  const user = auth.currentUser;
  const userId = user.uid;
  const userEmail = user.email;

  console.log(user);
  console.log(userId);
  console.log(userEmail);

  // liga o banco de dados e diz qual banco usar(nome do banco entre aspas)
  const collectionName = collection(dataBase, 'posts');

  // // // //Queries traz todos posts de todos usuarios
  // const queryAllPosts = query(collectionName, orderBy('data', 'desc'), limit(10));

  // Query traz post de um user só
  const queryPosts = query(collectionName, where('user.userId', '==', userId), orderBy('data', 'asc'));

  const template = `
    <h1> MEU FEED</h1>
    <textarea id="inputPost" type="text"> </textarea>
    <button id="submitPost" > Postar </button>  
    <ul id="feed"></ul>
    <button id="logout"> Sair</button>
    `;

  container.innerHTML = template;

  container.querySelector('#logout').addEventListener('click', logout);
  container.querySelector('#submitPost').addEventListener('click', (e) => {
    // ADD documentos posts no banco
  // container.querySelector('#submitPost').addEventListener('click', (e) => {
    e.preventDefault();
    const addPost = container.querySelector('#inputPost');
    let date = new Date();
    console.log(date);
    addDocPosts(date, addPost, user)
      .then((docRef) => {
        const addPost = container.querySelector('#inputPost');

        const postMessage = container.querySelector('#inputPost').value;
        addPost.value = '';
        date = Timestamp.now();

        console.log(date);
        showPostOnFeed(userId, postMessage, date, docRef.id, true, []);
      });
  // });
  });

  // adiciona os novos posts na area do feed dentro da ul
  function showPostOnFeed(userId, postMessage, date, id, newPost, listaLikes) {
    console.log(listaLikes.length)
    const feed = container.querySelector('#feed');

    date = date.toDate();
    let templatePost = '';

    let likedClass = ''

    if(listaLikes.includes(userEmail)) {
      likedClass = ' liked'
    }
    
    if (userId == user.uid) {
      templatePost = `
      <li class="post" style="display:block" id="">
        <div class="show-post" post-id="${id}" style="display:block">
          <p post-id="${id}" clas="userId"> Usuário: ${userId} </p>
          <p post-id="${id}" class="messageContent">Mensagem: ${postMessage}</p>
           <p post-id="${id}" class="date">Data: ${date.toLocaleString('pt-BR')} </p>
           <span post-id="${id}" class="count">${listaLikes.length} Curtidas</span>
           <button post-id="${id}" class="editPost">Editar</button>
          <button post-id="${id}" class="deletePost">Deletar</button>
        </div>
          <form class="edit-form" post-id="${id}" style="display: none;"> 
            <textarea post-id="${id}" class="edit-text" type="text">${postMessage}</textarea>
            <button post-id="${id}" class="save" > Salvar </button>  
            <button post-id="${id}" class="cancel">Cancelar</button>

          </form>
      </li>
    `;
    } else {
      templatePost = `
      <li class="post" style="display:block" id="">
        <div class="show-post" post-id="${id}" style="display:block">
            <p post-id="${id}" clas="userId"> Usuário: ${userId} </p>
            <p post-id="${id}" class="messageContent">Mensagem: ${postMessage}</p>
            <p post-id="${id}" class="date">Data: ${date.toLocaleString('pt-BR')} </p>
          <button post-id="${id}" class="likePost${likedClass}">
            <span post-id="${id}" class="count">${listaLikes.length} </span>Curtir
          </button>
        </div>
      </li>`;
    }
    if (newPost) {
      feed.innerHTML = templatePost + feed.innerHTML;
    } else {
      feed.innerHTML += templatePost;
    }
    // feed.insertAdjacentHTML("beforebegin")= templatePost + feed

    // Ouve botao de editar
    const btn = container.querySelectorAll('.editPost');
    if (btn) {
      btn.forEach((button) => {
        button.addEventListener('click', (event) => {
          console.log('btn clicked');
          showEditPost(button);
        });
      });

      // deletar dados
      const btnDel = container.querySelectorAll('.deletePost');
      if (btnDel) {
        btnDel.forEach((buttonDelete) => {
          buttonDelete.addEventListener('click', () => {
            deletePost(buttonDelete);
          });
        });
      }

      // like e dislike
      const btnPost = container.querySelectorAll('.likePost');
      if (btnPost) {
        btnPost.forEach((buttonPost) => {
          buttonPost.addEventListener('click', () => {
            countLikePost(buttonPost);
          });
        });
      }
    }

    // ouve botao salvar post editado
    const btnSave = container.querySelectorAll('.save');
    if (btnSave) {
      btnSave.forEach((button) => {
        const postId = button.getAttribute('post-id');
        const edit = container.querySelector(`.edit-form[post-id="${postId}"]`);
        const postFeed = container.querySelector(`.show-post[post-id="${postId}"]`);

        button.addEventListener('click', (event) => {
          event.preventDefault();
          console.log('btn clicked');

          if (edit.style.display == 'block') {
            editForm(postId);
            edit.style.display = 'none';
            postFeed.style.display = 'block';
          } else {
            edit.style.display = 'block';
            postFeed.style.display = 'none';
          }
        });
      });
    }

    const btnCancel = container.querySelectorAll('.cancel');
    if (btnCancel) {
      btnCancel.forEach((button) => {
        const postId = button.getAttribute('post-id');
        const edit = container.querySelector(`.edit-form[post-id="${postId}"]`);
        const postFeed = container.querySelector(`.show-post[post-id="${postId}"]`);

        button.addEventListener('click', (event) => {
          event.preventDefault();
          console.log('btn clicked');

          if (edit.style.display == 'block') {
            edit.style.display = 'none';
            postFeed.style.display = 'block';
          } else {
            edit.style.display = 'block';
            postFeed.style.display = 'none';
          }
        });
      });
    }
  }

  // mostra e esconde o form de editar post
  function showEditPost(button) {
    const postId = button.getAttribute('post-id');

    console.log(button);
    const edit = container.querySelector(`.edit-form[post-id="${postId}"]`);
    console.log(edit);
    const postFeed = container.querySelector(`.show-post[post-id="${postId}"]`);

    // const btnCancel = container.querySelector('.cancel[post-id="' + postId + '"]')

    if (edit.style.display == 'none') {
      edit.style.display = 'block';
      postFeed.style.display = 'none';
    } else {
      edit.style.display = 'none';
      postFeed.style.display = 'block';
    }
  }

  // Edita o conteudo do post
  function editForm(postId) {
    let newText = container.querySelector(`.edit-text[post-id="${postId}"]`);
    const newDate = container.querySelector(`.date[post-id="${postId}"]`);
    // const btnCancel = container.querySelector('.cancel[post-id="' + postId + '"]')
    const postText = container.querySelector(`.messageContent[post-id="${postId}"]`);
    let date = new Date();
    // date = date.toDate();
    // let dateNew = new Date();

    postText.textContent = '';
    newText = newText.value;
    postText.textContent = newText;

    newDate.textContent = '';
    date = date.toLocaleString('pt-BR');
    newDate.textContent = date;
    console.log(postText);

    // // manda para banco post editado
    updateDocPost(postId, newText);
  }

  // deslogar do app
  function logout() {
    auth.signOut().then(() => {
      // alert('usuario deslogou');
      window.location.href = '#';
    });
  }

  // consulta os dados do banco de dados
  readDocument()
    .then((snapshot) => {
      snapshot.docs.forEach((doc) => {
        console.log(doc.data().data);
        showPostOnFeed(doc.data().user.userId, doc.data().mensagem, doc.data().data, doc.id, false, doc.data().listaLikes);
      });
    })
    .catch((err) => {
      console.log(err.message);
    });

  // ADD documentos posts no banco
  container.querySelector('#submitPost').addEventListener('click', (e) => {
    e.preventDefault();
    const addPost = container.querySelector('#inputPost');
    const date = new Date();
    console.log(date);
    addDocPosts(date, addPost, user)
      .then(() => {
        const addPost = container.querySelector('#inputPost');
        addPost.value = '';
      });
  });

  function deletePost(buttonDelete) {
    const postId = buttonDelete.getAttribute('post-id');
    const postDelete = container.querySelector(`.show-post[post-id="${postId}"]`);
    postDelete.remove();
    return deleteDoc(doc(dataBase, 'posts', postId));
  }

  
  function countLikePost(buttonPost) {
    let liked = buttonPost.classList.contains('liked');
    const postId = buttonPost.getAttribute('post-id');
    let countValue = container.querySelector(`.count[post-id="${postId}"]`);
    let countLike = countValue.textContent;
    let listaLikes = []

   if (!liked) {
    countLike++
    console.log("contou")
    buttonPost.classList.add('liked')
    listaLikes.push(userEmail)
    
   } else {
     countLike--
     console.log('tirou like');
     buttonPost.classList.remove('liked')
     listaLikes.splice(userEmail)
   }
   countValue.textContent= countLike
   updateLikesPost(postId, listaLikes)


    // if (!clicked) {
    //   const valueTotal = [];
    //   valueTotal.reduce((first, second) => (first + second), 1);
    //   console.log(valueTotal);
    //   clicked = true;
    //   const newValue = Number(likeValue) + 1;
    //   count.innerHTML = newValue;
    //   valueTotal.push(newValue);
    //   console.log(clicked);
    //   // updateDocPost(postId, valueTotal);
    // } else {
    //   clicked = false;
    //   const newValue = Number(likeValue) - 1;
    //   count.innerHTML = newValue;
    //   console.log(clicked);
    // }
  }

  // Coleta de dados em real time
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

  return container;
};
