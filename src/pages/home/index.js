
export default () => {
  const container = document.createElement('div');
  container.classList.add('home-container');

  const template = `
  <div class="logo-container">
    <img class="logo" src="/pages/style/logocores.png">
    <img class="escrita" src="/pages/style/escrita.png">
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
