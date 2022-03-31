import { myFunction } from './lib/index.js';
// eslint-disable-next-line
//import  { firebaseApp } from "./lib/serverfirebase.js";

import home from './pages/home/index.js';
import login from './pages/login/login.js';
import feed from './pages/feed/feed.js';

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
