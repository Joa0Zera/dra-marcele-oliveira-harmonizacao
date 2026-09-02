/* Dra. Marcele Oliveira | script principal */

document.addEventListener('DOMContentLoaded', () => {
  inicializarMenuMobile();
  inicializarScrollReveal();
  inicializarParallax();
  inicializarContadores();
  inicializarCarrossel();
  carregarConfig();
});

/* ---------- Menu mobile ---------- */
function inicializarMenuMobile() {
  const botao = document.getElementById('menu-hamburguer');
  const menu = document.getElementById('menu-principal');
  if (!botao || !menu) return;

  botao.addEventListener('click', () => {
    botao.classList.toggle('ativo');
    menu.classList.toggle('aberto');
  });

  menu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      botao.classList.remove('ativo');
      menu.classList.remove('aberto');
    });
  });
}

/* ---------- Scroll reveal ---------- */
function inicializarScrollReveal() {
  const elementos = document.querySelectorAll('.reveal');
  const observer = new IntersectionObserver((entradas) => {
    entradas.forEach((entrada, indice) => {
      if (entrada.isIntersecting) {
        setTimeout(() => {
          entrada.target.classList.add('ativo');
        }, indice * 80);
        observer.unobserve(entrada.target);
      }
    });
  }, { threshold: 0.15 });

  elementos.forEach(el => observer.observe(el));
}

/* ---------- Parallax no hero ---------- */
function inicializarParallax() {
  const imagemHero = document.querySelector('.hero-imagem');
  if (!imagemHero) return;

  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    if (scrollY < window.innerHeight) {
      imagemHero.style.transform = `translateY(${scrollY * 0.35}px)`;
    }
  });
}

/* ---------- Contadores animados ---------- */
function inicializarContadores() {
  const contadores = document.querySelectorAll('.contador');
  const observer = new IntersectionObserver((entradas) => {
    entradas.forEach(entrada => {
      if (entrada.isIntersecting) {
        animarContador(entrada.target);
        observer.unobserve(entrada.target);
      }
    });
  }, { threshold: 0.5 });

  contadores.forEach(el => observer.observe(el));
}

function animarContador(elemento) {
  const alvoTexto = elemento.dataset.alvo || elemento.textContent;
  const alvoNumerico = parseFloat(alvoTexto.replace(',', '.'));
  if (isNaN(alvoNumerico)) return;

  const sufixo = alvoTexto.replace(/[0-9.,]/g, '');
  const duracao = 1200;
  const inicio = performance.now();

  function passo(agora) {
    const progresso = Math.min((agora - inicio) / duracao, 1);
    const valorAtual = (alvoNumerico * progresso).toFixed(alvoTexto.includes(',') ? 1 : 0).replace('.', ',');
    elemento.textContent = valorAtual + sufixo;
    if (progresso < 1) requestAnimationFrame(passo);
  }
  requestAnimationFrame(passo);
}

/* ---------- Carrossel de depoimentos ---------- */
function inicializarCarrossel() {
  const track = document.getElementById('carrossel-track');
  const dotsContainer = document.getElementById('carrossel-dots');
  if (!track || !dotsContainer) return;

  const slides = track.children.length;
  let atual = 0;
  let intervalo;

  for (let i = 0; i < slides; i++) {
    const dot = document.createElement('div');
    dot.className = 'dot' + (i === 0 ? ' ativo' : '');
    dot.addEventListener('click', () => irPara(i));
    dotsContainer.appendChild(dot);
  }

  function irPara(indice) {
    atual = (indice + slides) % slides;
    track.style.transform = `translateX(-${atual * 100}%)`;
    dotsContainer.querySelectorAll('.dot').forEach((d, i) => {
      d.classList.toggle('ativo', i === atual);
    });
  }

  document.getElementById('carrossel-prev')?.addEventListener('click', () => irPara(atual - 1));
  document.getElementById('carrossel-next')?.addEventListener('click', () => irPara(atual + 1));

  function iniciarAutoplay() {
    intervalo = setInterval(() => irPara(atual + 1), 5000);
  }
  function pararAutoplay() {
    clearInterval(intervalo);
  }

  const carrossel = document.querySelector('.carrossel');
  carrossel?.addEventListener('mouseenter', pararAutoplay);
  carrossel?.addEventListener('mouseleave', iniciarAutoplay);

  iniciarAutoplay();
}

/* ---------- Sistema de edição (config.json) ---------- */
let configData = {};

function carregarConfig() {
  fetch('./assets/config.json')
    .then(res => res.json())
    .then(data => { configData = data; })
    .catch(err => console.log('Config não carregado:', err));
}

function abrirEditorModal() {
  document.getElementById('editor-modal').style.display = 'flex';
  document.getElementById('edit-titulo').value = configData.pagina?.titulo || '';
  document.getElementById('edit-subtitulo').value = configData.pagina?.subtitulo || '';
  document.getElementById('edit-telefone').value = configData.empresa?.telefone || '';
  document.getElementById('edit-endereco').value = configData.empresa?.endereco || '';
  document.getElementById('edit-instagram').value = configData.empresa?.instagram || '';
}

function fecharEditorModal() {
  document.getElementById('editor-modal').style.display = 'none';
}

function salvarEdicoes() {
  configData.pagina.titulo = document.getElementById('edit-titulo').value;
  configData.pagina.subtitulo = document.getElementById('edit-subtitulo').value;
  configData.empresa.telefone = document.getElementById('edit-telefone').value;
  configData.empresa.endereco = document.getElementById('edit-endereco').value;
  configData.empresa.instagram = document.getElementById('edit-instagram').value;

  atualizarPagina();
  salvarJSON();
  fecharEditorModal();
  alert('Alterações salvas! Download do arquivo JSON...');
}

function valorAninhado(obj, caminho) {
  return caminho.split('.').reduce((acc, chave) => (acc && acc[chave] !== undefined) ? acc[chave] : undefined, obj);
}

function atualizarPagina() {
  document.querySelectorAll('[data-edit]').forEach(el => {
    const valor = valorAninhado(configData, el.dataset.edit);
    if (valor !== undefined) el.textContent = valor;
  });
}

function salvarJSON() {
  const dataStr = JSON.stringify(configData, null, 2);
  const blob = new Blob([dataStr], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = 'config-edicoes.json';
  link.click();
}
