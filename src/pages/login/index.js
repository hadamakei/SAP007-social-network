// eslint-disable-next-line
// import  { firebaseApp } from "../../lib/serverfirebase.js";
import  { auth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "../../lib/authfirebase.js";

export default () => {
    const container = document.createElement('div');

    const createAccount = async () => {
        const getEmail = document.getElementById("email")
        const email = getEmail.value

        const getPassword = document.getElementById("password")
        const password = getPassword.value  
        
        

        // createUserWithEmailAndPassword("ci@ci.com", "123456")
        //     .then((userCredential) => {

        //     })
        //     .catch((error) => {

        //     })

        // try {
        //     const userCredential = await createUserWithEmailAndPassword("ci@ci.com", "123456")
            
        // } catch (error) {
            
        // }

        try {
            const newUser = await createUserWithEmailAndPassword(auth,email,password)
            //.then((userCredential) => {
                // Signed in
                console.log(newUser.user)
                const user = newUser.user;
                console.log(user)
                window.location.href = '#feed';
                alert("usuario criado e logado")
                // ...
           // })
        }
        catch(error){
            console.log(error)
            // .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorCode)
                console.log(errorMessage)
                alert(errorCode)
                
            //     // ..
            // });
        
        }
    }

    const template = `
    <h1> DIGITE SEU LOGIN E SENHA</h1>
    <input type="text" id="" placeholder="Nome Sobrenome"></input>
    <input type="email" id="email" required ></input>
    <input type="password" id="password" required></input>
    <button id="button" >Entrar</button>
    <button id="bt-register">Cadastrar</button>
    <button id="button" >Entrar com Google</button>
    `;

    container.innerHTML = template;
    
    const  loginEmailPassword = async () => {
        const getEmail = document.getElementById("email")
        const email = getEmail.value

        const getPassword = document.getElementById("password")
        const password = getPassword.value  
        
        try {
            const userLogin = await signInWithEmailAndPassword(auth, email, password);
            console.log(userLogin.user)
            window.location.href = '#feed';

            alert("usuario logado")
            
        //     (userCredential) => {
        //     // Signed in
        //     console.log(userLogin.user)
        //     const user = userCredential.user;
        //     // ...
        // }
        }
        catch(error){
            console.log(error)
            const errorCode = error.code;
            const errorMessage = error.message;

            console.log(errorCode)
            console.log(errorMessage)
            alert(errorCode)
           
        };

    }

    
    container.querySelector('#button').addEventListener("click",loginEmailPassword);

    container.querySelector('#bt-register').addEventListener("click",createAccount);
    

    return container;
};


