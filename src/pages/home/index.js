
export default () => {
  const container = document.createElement('div');


  const template = `
  <div class="logo-container">
    <img src="/pages/style/logocores.png">
    <img src="/pages/style/escrita.png">
  </div>
    <button class="botao-home" id="button">Entrar</button>
    `;

  container.innerHTML = template;

  function teste() {
    window.location.href = '#login';
  }

  container.querySelector('#button').addEventListener('click', teste);

  return container;
};
