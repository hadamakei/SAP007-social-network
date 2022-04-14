
export default () => {
  const container = document.createElement('div');


  const template = `
  <h1 class="imagem"></h1>
    <button class="botao" id="button">Entrar</button>
    `;

  container.innerHTML = template;

  function teste() {
    window.location.href = '#login';
  }

  container.querySelector('#button').addEventListener('click', teste);

  return container;
};
