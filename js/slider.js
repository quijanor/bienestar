document.addEventListener('DOMContentLoaded', () => {
  const radios = ['s1', 's2', 's3'];
  let idx = 0;
  const total = radios.length;

  function checkIndex(i) {
    idx = (i + total) % total;
    document.getElementById(radios[idx]).checked = true;
  }

  document.querySelectorAll('[data-prev]').forEach((el) => {
    el.addEventListener('click', () => checkIndex(idx - 1));
  });

  document.querySelectorAll('[data-next]').forEach((el) => {
    el.addEventListener('click', () => checkIndex(idx + 1));
  });

  document.querySelectorAll('.dots .dot').forEach((dot, i) => {
    dot.addEventListener('click', () => checkIndex(i));
  });

  // Autoplay
  let autoplay = true;
  let timer = setInterval(() => {
    if (autoplay) checkIndex(idx + 1);
  }, 4000);

  const container = document.querySelector('.slider-container');
  if (container) {
    container.addEventListener('mouseenter', () => (autoplay = false));
    container.addEventListener('mouseleave', () => (autoplay = true));
  }

  // Inicializar
  const initRadio = document.querySelector(
    '.slider-container input[type="radio"]:checked'
  );
  if (initRadio) idx = radios.indexOf(initRadio.id);
});
