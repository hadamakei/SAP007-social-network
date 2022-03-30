import  { auth  } from "../../lib/authfirebase.js";


export default () => {
  const container = document.createElement('div');

  const template = `
    <h1> MEU FEED</h1>
    <button id="button">Entrar</button>
    <button id="logout"> Sair</button>
    `;

  container.innerHTML = template;

  // function teste() {
  //   window.location.href = '#';
  // }

  //container.querySelector('#button').addEventListener('click', teste);
  container.querySelector('#logout').addEventListener("click", logout)

  function logout(){
    auth.signOut().then(()=>{
      alert("usuario deslogou")
      window.location.href = '#'
    })

  }

  return container;
};
