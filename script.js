document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('devocionalForm');
  const lista = document.getElementById('listaDevocionais');
  const limparBtn = document.getElementById('limparBtn');
  const contador = document.getElementById('contador');
  const tituloInput = document.getElementById('titulo');
  const conteudoInput = document.getElementById('conteudo');

  // Carregar devocionais do storage
  let devocionais = JSON.parse(localStorage.getItem('devocionais')) || [];
  renderizarLista();

  // Salvar devocional
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const titulo = tituloInput.value.trim();
    const conteudo = conteudoInput.value.trim();
    if (!titulo || !conteudo) return;

    devocionais.push({ titulo, conteudo, data: new Date().toLocaleString() });
    localStorage.setItem('devocionais', JSON.stringify(devocionais));

    renderizarLista();
    form.reset();
    tituloInput.focus();
  });

  // Limpar tudo: campos + lista + storage
  limparBtn.addEventListener('click', () => {
    tituloInput.value = '';
    conteudoInput.value = '';
    tituloInput.focus();

    devocionais = [];
    localStorage.removeItem('devocionais'); // remove tudo do storage
    renderizarLista();
  });

  function renderizarLista() {
    lista.innerHTML = '';
    devocionais.slice().reverse().forEach(d => {
      const li = document.createElement('li');
      li.innerHTML = `<strong>${d.titulo}</strong> <span class="data">(${d.data})</span><br>${d.conteudo}`;
      lista.appendChild(li);
    });
    contador.textContent = devocionais.length;
  }
});
