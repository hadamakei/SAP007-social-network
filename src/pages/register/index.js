import {
  auth, createUserWithEmailAndPassword, signInWithEmailAndPassword,
  GoogleAuthProvider, signInWithPopup, sendPasswordResetEmail,
} from '../../lib/authfirebase.js';

export default () => {
  const container = document.createElement('div');
  container.classList.add('login-container');

  const createAccount = async () => {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    try {
      const newUser = await createUserWithEmailAndPassword(auth, email, password);
      console.log(newUser.user);
      const user = newUser.user;
      console.log(user);
      window.location.href = '#feed';
      alert('usuario criado e logado');
    } catch (error) {
      alert(getErrorMessage(error));
      const errorCode = error.code;
      console.log(errorCode);
    }
  };

  const template = `
    <div class="music-container">
    </div>
    <div class = "DEUS">
      <div class="logo-container">
      <a href="#login"><img class="logo" src="/pages/style/logo.png"></a>
      </div>
      <div class="form">
        <input class="control" type="text" placeholder="Usúario" id="name" required></input>
        <input class="control" type="email" placeholder="Email" id="email" required></input>
        <input class="control" type="password" placeholder="Senha" id="password" required></input>
        <button class="botao" id="bt-register">Cadastre-se</button>
        <p class="text-center">OU</p>
        <button class="botao" id="bt-google">Acesse pelo Google</button>
      </div>
      </div>
      `;

  container.innerHTML = template;

  // Validação do email
  function isEmailValid() {
    const email = document.getElementById('email').value;
    if (!email) {
      return false;
    }
    return validateEmail(email);
  }

  function validateEmail(email) {
    return /\S+@\S+\.\S+/.test(email);
  }

  // Validação da senha
  function isPasswordValid() {
    const password = document.getElementById('password').value;
    if (!password) {
      return false;
    }
    return true;
  }

  //   const loginEmailPassword = async () => {
  //     const email = document.getElementById('email').value;
  //     const password = document.getElementById('password').value;

  //     try {
  //       const userLogin = await signInWithEmailAndPassword(auth, email, password);
  //       console.log(userLogin.user);
  //       window.location.href = '#feed';

  //       // alert('usuario logado');
  //     } catch (error) {
  //       alert(getErrorMessage(error));
  //     }
  //   };

  // AUTENTICAÇÃO VIA GOOGLE
  const provider = new GoogleAuthProvider();
  function loginGoogle() {
    signInWithPopup(auth, provider)
      .then(() => {
        window.location.href = '#feed';
        alert('usuario logado');
      })
      .catch((error) => {
        alert(getErrorMessage(error));
      });
  }

  //   // RECUPERAR SENHA FIREBASE
  //   function recoverPassword() {
  //     const email = document.getElementById('email').value;
  //     sendPasswordResetEmail(auth, email)
  //       .then(() => {
  //         alert('Email de recuperação de senha foi enviado!');
  //         window.location.href = '#login';
  //       })
  //       .catch((error) => {
  //         alert(getErrorMessage(error));
  //       });
  //   }

  function buttonsDisable() {
    const emailValid = isEmailValid();
    document.getElementById('recover-password').disabled = !emailValid;

    const passwordValid = isPasswordValid();
    document.getElementById('button').disabled = !emailValid || !passwordValid;
  }

  function emailErrors() {
    const email = document.getElementById('email').value;
    if (!email) {
      document.getElementById('email-error').style.display = 'block';
    } else {
      document.getElementById('email-error').style.display = 'none';
    }

    if (!email) {
      document.getElementById('email-invalid-error').style.display = 'block';
    } else {
      document.getElementById('email-invalid-error').style.display = 'none';
    }
  }

  function passwordErrors() {
    const password = document.getElementById('password').value;
    if (!password) {
      document.getElementById('password-error').style.display = 'block';
    } else {
      document.getElementById('password-error').style.display = 'none';
    }
  }

  // Validação de campo
  function onChangeEmail() {
    buttonsDisable();
    emailErrors();
  }

  function onChangePassword() {
    buttonsDisable();
    passwordErrors();
  }

  // Mensagens de erro
  function getErrorMessage(error) {
    if (error.code === 'auth/user-not-found') {
      return 'Usúario não encontrado';
    }
    if (error.code === 'auth/wrong-password') {
      return 'Senha Incorreta';
    }
    if (error.code === 'auth/internal-error') {
      return 'Verifique se você preencheu todos os campos e tente novamente!';
    }
    if (error.code === 'auth/invalid-email') {
      return 'Email invalido, tente novamente!';
    }
    if (error.code === 'auth/popup-closed-by-user') {
      return 'Não foi possivel acessar o Gmail, tente novamente!';
    }
    if (error.code === 'auth/missing-email') {
      return 'Digite um email valido';
    }
    if (error.code === 'auth/email-already-in-use') {
      return 'Já existe uma conta criada com este email';
    }
    return error.message;
  }
  container.querySelector('#password').addEventListener('onchange', onChangePassword);
  container.querySelector('#email').addEventListener('onchange', onChangeEmail);
  container.querySelector('#bt-google').addEventListener('click', loginGoogle);
  container.querySelector('#bt-register').addEventListener('click', createAccount);

  return container;
};
