import { auth } from '../../lib/authfirebase.js';

export default () => {
  const container = document.createElement('div');

  const template = `
    <h1> MEU FEED</h1>
    <textarea id="inputPost"> </textarea>
    <button id="submitPost" > Postar </button>  

    <div id="feed"></div>

    <button id="logout"> Sair</button>
    `;

  container.innerHTML = template;

  container.querySelector('#logout').addEventListener('click', logout);

  function logout() {
    auth.signOut().then(() => {
      // alert('usuario deslogou');
      window.location.href = '#';
    });
  }

  return container;
};
