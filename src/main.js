import { myFunction } from './lib/index.js';
// eslint-disable-next-line
import  { auth, onAuthStateChanged } from "../../lib/authfirebase.js";

import home from './pages/home/index.js';
import login from './pages/login/index.js';
import feed from './pages/feed/index.js';

myFunction();

const init = () => {
  window.addEventListener('hashchange', () => {
    main.innerHTML = ' ';
    switch (window.location.hash) {
      case ' ':
        main.appendChild(home());
        break;
      case '#login':
        main.appendChild(login());
        break;
      case '#feed':
        main.appendChild(feed());
        break;
      default:
        main.appendChild(home());
    }
  });
};

const main = document.querySelector('#root');

window.addEventListener('load', () => {
  main.appendChild(home());
  init();
});

// const user;
// verifica se usuario esta logado
document.addEventListener('DOMContentLoaded', () => {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      window.location.href = '#feed';
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/firebase.User
      const uid = user.uid;
      console.log('usuario: ', uid);
    } else {
      window.location.href = '#';
      console.log('Usuário não está logado');
      alert('Usuário não está logado. Faça login. ');
    }
  });

  //   //pega dados do usuario
  //   const user = auth.currentUser
  //   if (user) {

  //     console.log(user)
  //     // User is signed in, see docs for a list of available properties
  //     // https://firebase.google.com/docs/reference/js/firebase.User
  //     // ...
  //   } else {
  //     // No user is signed in.
  //   }
});
