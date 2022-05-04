import { auth } from '../../lib/authfirebase.js';
import {
  dataBase, readDocument, deleteDoc, doc, Timestamp,
  addDocPosts, updateDocPost, updateLikesPost, removeLikePost, updateUserProfile,
} from '../../lib/firestore.js';

export default () => {
  const container = document.createElement('div');
  const user = auth.currentUser;
  const userEmail = user.email;
  const userName = user.displayName;
  const photoURL = user.photoURL;
  // console.log(userName);

  // console.log(user);
  // console.log(userId);
  // console.log(userEmail);
  updateUserProfile(user, userName, photoURL);

  // Query traz post de um user só
  // const queryPosts=query(collectionName,where('user.userId','==', userId),orderBy('data', 'asc'))

  const template = `
    <h1> MEU FEED</h1>
    <form id="submitPost">
      <textarea id="inputPost" type="text" required></textarea>
      <button type="submit">Postar</button>
    </form>
    <ul id="feed"></ul>
    <button id="logout">Sair</button>

    `;

  container.innerHTML = template;

  // adiciona os novos posts na area do feed dentro da ul
  function showPostOnFeed(userId, postMessage, dateReceived, id, newPost, listaLikes, nameUser) {
    // console.log(listaLikes.length);
    const feed = container.querySelector('#feed');

    const date = dateReceived.toDate();
    let templatePost = '';

    let likedClass = '';

    if (listaLikes.includes(userEmail)) {
      likedClass = ' liked';
    }

    if (userId === user.uid) {
      templatePost = `
      <li class="post" style="display:block" id="">
        <div class="show-post" post-id="${id}" style="display:block">
          <p post-id="${id}" clas="userId" data-userId="${userId} "> Usuário: ${nameUser}  </p>
          <p post-id="${id}" class="messageContent">Mensagem: ${postMessage}</p>
           <p post-id="${id}" class="date">Data: ${date.toLocaleString('pt-BR')} </p>
           <span post-id="${id}" class="count">${listaLikes.length} Curtidas</span>
           <button post-id="${id}" class="editPost">Editar</button>
          <button post-id="${id}" class="deletePost">Deletar</button>
        </div>
          <form class="edit-form" post-id="${id}" style="display: none;"> 
            <textarea post-id="${id}" class="edit-text" type="text" >${postMessage}</textarea>
            <button post-id="${id}" class="save" > Salvar </button>  
            <button post-id="${id}" class="cancel">Cancelar</button>

          </form>
      </li>
    `;
    } else {
      templatePost = `
      <li class="post" style="display:block" id="">
        <div class="show-post" post-id="${id}" style="display:block">
            <p post-id="${id}" clas="userId" data-userId="${userId} "> Usuário: ${userName} </p>
            <p post-id="${id}" class="messageContent">Mensagem: ${postMessage}</p>
            <p post-id="${id}" class="date">Data: ${date.toLocaleString('pt-BR')} </p>
          <button post-id="${id}" class="likePost${likedClass}">
            <span post-id="${id}" class="count">${listaLikes.length}</span>Curtir
          </button>
        </div>
      </li>`;
    }
    if (newPost) {
      feed.innerHTML = templatePost + feed.innerHTML;
    } else {
      feed.innerHTML += templatePost;
    }
  }

  // mostra e esconde o form de editar post
  function showEditPost(button) {
    const postId = button.getAttribute('post-id');
    // console.log(button);
    const edit = container.querySelector(`.edit-form[post-id="${postId}"]`);
    // console.log(edit);
    const postFeed = container.querySelector(`.show-post[post-id="${postId}"]`);

    if (edit.style.display === 'none') {
      edit.style.display = 'block';
      postFeed.style.display = 'none';
    } else {
      edit.style.display = 'none';
      postFeed.style.display = 'block';
    }
  }

  function deletePost(buttonDelete) {
    const postId = buttonDelete.getAttribute('post-id');
    const postDelete = container.querySelector(`.show-post[post-id="${postId}"]`);
    postDelete.remove();
    return deleteDoc(doc(dataBase, 'postagens', postId));
  }

  // Edita o conteudo do post
  function editForm(postId) {
    let newText = container.querySelector(`.edit-text[post-id="${postId}"]`);
    const newDate = container.querySelector(`.date[post-id="${postId}"]`);
    const postText = container.querySelector(`.messageContent[post-id="${postId}"]`);
    let date = new Date();

    postText.textContent = '';
    newText = newText.value;
    postText.textContent = newText;

    newDate.textContent = '';
    date = date.toLocaleString('pt-BR');
    newDate.textContent = date;
    // console.log(postText);

    // // manda para banco post editado
    updateDocPost(postId, newText);
  }

  function saveEditPost(button) {
    const postId = button.getAttribute('post-id');
    const edit = container.querySelector(`.edit-form[post-id="${postId}"]`);
    const postFeed = container.querySelector(`.show-post[post-id="${postId}"]`);
    if (edit.style.display === 'block') {
      editForm(postId);
      edit.style.display = 'none';
      postFeed.style.display = 'block';
    } else {
      edit.style.display = 'block';
      postFeed.style.display = 'none';
    }
  }

  function cancelEditPost(button) {
    const postId = button.getAttribute('post-id');
    const edit = container.querySelector(`.edit-form[post-id="${postId}"]`);
    const postFeed = container.querySelector(`.show-post[post-id="${postId}"]`);
    if (edit.style.display === 'block') {
      edit.style.display = 'none';
      postFeed.style.display = 'block';
    } else {
      edit.style.display = 'block';
      postFeed.style.display = 'none';
    }
  }

  // ADD documentos posts no banco
  container.querySelector('#submitPost').addEventListener('submit', (e) => {
    e.preventDefault();
    const addPost = container.querySelector('#inputPost');
    // console.log(addPost)
    let newDate = new Date();
    // console.log(date);
    if (addPost.value) {
      addDocPosts(newDate, addPost, user, userName)
        .then((docRef) => {
          const postMessage = container.querySelector('#inputPost').value;
          const userId = user.uid;
          newDate = Timestamp.now();

          // console.log(date);
          showPostOnFeed(userId, postMessage, newDate, docRef.id, true, [], userName);
          addPost.value = '';

          const btn = container.querySelector(`.editPost[post-id="${docRef.id}"]`);
          // console.log('btn clicked');
          if (btn) {
            btn.addEventListener('click', () => {
              // console.log('btn clicked');
              showEditPost(btn);
            });
          }

          const btnDel = container.querySelector(`.deletePost[post-id="${docRef.id}"]`);
          if (btnDel) {
            btnDel.addEventListener('click', () => {
              alert('Deseja realmente deletar este post?');
              deletePost(btnDel);
            });
          }

          const btnSave = container.querySelector(`.save[post-id="${docRef.id}"]`);
          if (btnSave) {
            btnSave.addEventListener('click', (event) => {
              saveEditPost(btnSave);
              event.preventDefault();
              // console.log('btn clicked');
            });
          }

          const btnCancel = container.querySelector(`.cancel[post-id="${docRef.id}"]`);
          if (btnCancel) {
            btnCancel.addEventListener('click', (event) => {
              event.preventDefault();
              // console.log('btn clicked');
              cancelEditPost(btnCancel);
            });
          }
        });
    }
  });

  function countLikePost(buttonPost) {
    const liked = buttonPost.classList.contains('liked');
    const postId = buttonPost.getAttribute('post-id');
    const countValue = container.querySelector(`.count[post-id="${postId}"]`);
    let countLike = Number(countValue.textContent);

    if (!liked) {
      countLike += 1;
      // console.log('contou');
      buttonPost.classList.add('liked');
      updateLikesPost(postId, userEmail);
    } else {
      countLike -= 1;
      // console.log('tirou like');
      buttonPost.classList.remove('liked');
      removeLikePost(postId, userEmail);
    }
    countValue.textContent = countLike;
  }

  // consulta os dados do banco de dados
  readDocument()
    .then((snapshot) => {
      snapshot.docs.forEach((docPost) => {
        // console.log(doc.data().data);
        showPostOnFeed(
          docPost.data().user.userId,
          docPost.data().mensagem,
          docPost.data().data,
          docPost.id,
          false,
          docPost.data().listaLikes,
          docPost.data().user.name,
        );
      });

      // Ouve botao de editar
      const btn = container.querySelectorAll('.editPost');
      // console.log('btn clicked');
      if (btn) {
        btn.forEach((button) => {
          button.addEventListener('click', () => {
            // console.log('btn clicked');
            showEditPost(button);
          });
        });
      }
      // botao deletar dados
      const btnDel = container.querySelectorAll('.deletePost');
      if (btnDel) {
        btnDel.forEach((buttonDelete) => {
          buttonDelete.addEventListener('click', () => {
            alert('Deseja realmente deletar este post?');
            deletePost(buttonDelete);
          });
        });
      }

      // botao like e dislike
      const btnPost = container.querySelectorAll('.likePost');
      if (btnPost) {
        btnPost.forEach((buttonPost) => {
          buttonPost.addEventListener('click', () => {
            countLikePost(buttonPost);
          });
        });
      }

      // ouve botao salvar post editado
      const btnSave = container.querySelectorAll('.save');
      if (btnSave) {
        btnSave.forEach((button) => {
          button.addEventListener('click', (event) => {
            saveEditPost(button);
            event.preventDefault();
            // console.log('btn clicked');
          });
        });
      }

      const btnCancel = container.querySelectorAll('.cancel');
      if (btnCancel) {
        btnCancel.forEach((button) => {
          button.addEventListener('click', (event) => {
            event.preventDefault();
            // console.log('btn clicked');
            cancelEditPost(button);
          });
        });
      }
    });
  // .catch((err) => {
  //   // console.log(err.message);
  // });

  // deslogar do app
  function logout() {
    auth.signOut().then(() => {
      // alert('usuario deslogou');
      window.location.href = '#';
    });
  }

  container.querySelector('#logout').addEventListener('click', logout);

  return container;
};

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
