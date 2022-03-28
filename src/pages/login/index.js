//eslint-disable-next-line 
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.8/firebase-app.js";
import { getAuth,createUserWithEmailAndPassword, signInWithEmailAndPassword  } from "https://www.gstatic.com/firebasejs/9.6.8/firebase-auth.js";
// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyD_6p1TT3sUsq_EFymYSnnccTNOAUnulnA",
    authDomain: "friendsound.firebaseapp.com",
    projectId: "friendsound",
    storageBucket: "friendsound.appspot.com",
    messagingSenderId: "448580294849",
    appId: "1:448580294849:web:c3271af09459b1a1cfdc40"
  };
  
  // Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);


export default () => {
    const container = document.createElement('div');

    const template = `
    <h1> DIGITE SEU LOGIN E SENHA</h1>
    <input type="text" id="" placeholder="Nome Sobrenome"></input>
    <input type="email" id="email" ></input>
    <input type="password" id="password"></input>
    <button id="button">Entrar</button>
    `;

    container.innerHTML = template;

    function teste() {
        window.location.href = '#feed';
    }

    const  loginEmailPassword = async () => {
        const getEmail = document.getElementById("email")
        const email = getEmail.value
        console.log(email)

        const getPassword = document.getElementById("password")
        const password = getPassword.value  
        const auth = getAuth(firebaseApp);

        const userLogin = await signInWithEmailAndPassword(auth, email, password);
        console.log(userLogin.user)
        try {(userCredential) => {
            // Signed in
            console.log(userLogin.user)
            const user = userCredential.user;
            // ...
        }}
        catch{(error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            // ..
            console.log(errorMessage)
        }};

    }

    const createAccount = async () => {
        const getEmail = document.getElementById("email")
        const email = getEmail.value
        console.log(email)

        const getPassword = document.getElementById("password")
        const password = getPassword.value  
        const auth = getAuth(firebaseApp);
        const newUser = await createUserWithEmailAndPassword(auth,email,password)
        .then((userCredential) => {
            // Signed in
            console.log(newUser)
            const user = userCredential.user;
            // ...
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            // ..
        });

    }



    container.querySelector('#button').addEventListener('click', teste)
    container.querySelector('#button').addEventListener("click",createAccount);
    container.querySelector('#button').addEventListener("click",loginEmailPassword);

    return container;
};


