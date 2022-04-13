import { myFunction } from './lib/index.js';
// eslint-disable-next-line
import  { auth, onAuthStateChanged } from "../../lib/authfirebase.js";

import home from './pages/home/index.js';
import login from './pages/login/login.js';
import feed from './pages/feed/feed.js';

myFunction();

const init = () => {
  window.addEventListener('hashchange', () => {
    const main = document.querySelector('#root');
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

const user = auth.currentUser;
// verifica se usuario esta logado
document.addEventListener('DOMContentLoaded', () => {
  onAuthStateChanged(auth, (user) => {
    if (user !== null) {
      user.providerData.forEach((profile) => {
        console.log(`Sign-in provider: ${profile.providerId}`);
        console.log(`  Provider-specific UID: ${profile.uid}`);
        console.log(`  Name: ${profile.displayName}`);
        console.log(`  Email: ${profile.email}`);
        console.log(`  Photo URL: ${profile.photoURL}`);
      });

      // const email = user.email;
      // console.log(email);
      window.location.href = '#feed';
    } else {
      window.location.href = '#';
      console.log('Usuário não está logado');
      // alert('Usuário não está logado. Faça login. ');
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
