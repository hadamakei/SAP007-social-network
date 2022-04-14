import {
  auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, getRedirectResult,
} from '../../lib/authfirebase.js';

export default () => {
  const container = document.createElement('div');

  const createAccount = async () => {
    const getEmail = document.getElementById('email');
    const email = getEmail.value;

    const getPassword = document.getElementById('password');
    const password = getPassword.value;

    try {
      const newUser = await createUserWithEmailAndPassword(auth, email, password);
      console.log(newUser.user);
      const user = newUser.user;
      console.log(user);
      window.location.href = '#feed';
      alert('usuario criado e logado');
      
    } catch (error) {
      console.log(error);
     
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorCode);
      console.log(errorMessage);
      alert(errorCode);

      
    }
  };

  const template = `
    <h1> DIGITE SEU LOGIN E SENHA</h1>
    <input type="text" id="" placeholder="Nome Sobrenome"></input>
    <input type="email" id="email" required ></input>
    <input type="password" id="password" required></input>
    <button id="button" >Entrar</button>
    <button id="bt-register">Cadastrar</button>
    <button id="bt-google" >Entrar com Google</button>
  `;

  container.innerHTML = template;

  const loginEmailPassword = async () => {
    const getEmail = document.getElementById('email');
    const email = getEmail.value;

    const getPassword = document.getElementById('password');
    const password = getPassword.value;

    try {
      const userLogin = await signInWithEmailAndPassword(auth, email, password);
      console.log(userLogin.user);
      window.location.href = '#feed';

      alert('usuario logado');
      
    } catch (error) {
      console.log(error);
      const errorCode = error.code;
      const errorMessage = error.message;

      console.log(errorCode);
      console.log(errorMessage);
      alert(errorCode);
    }
  };

  // AUTENTICAÇÃO VIA GOOGLE

  const provider = new GoogleAuthProvider();
  function loginGoogle() {
    signInWithPopup(auth, provider)
      .then((result) => {
      // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        console.log(credential);
        // const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        window.location.href = '#feed';
        alert('usuario logado');
      // ...
      })
      .catch((error) => {
      // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode);
        console.log(errorMessage);
        const email = error.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
      });
  }

  // RECUPERAR SENHA DO GOOGLE

  getRedirectResult(auth) // precisa ser resolvido antes do acionamento
    .then((result) => {
      // Isso lhe dá um token de acesso do Google. Você pode usá-lo para acessar as APIs do Google.
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;

      // As informações do usuário conectado.
      const user = result.user;
      console.log(user);
    }).catch((error) => {
      // Tratar os Errors aqui.
      const errorCode = error.code;
      const errorMessage = error.message;
      // console.log(errorCode);
      // console.log(errorMessage);

      // The email of the user's account used.
      const email = error.email;
      // The AuthCredential type that was used.
      const credential = GoogleAuthProvider.credentialFromError(error);
      // ...
    });

  container.querySelector('#bt-google').addEventListener('click', loginGoogle);

  container.querySelector('#button').addEventListener('click', loginEmailPassword);

  container.querySelector('#bt-register').addEventListener('click', createAccount);

  return container;
};
