document.addEventListener('DOMContentLoaded', () => {
  const radios = ['s1', 's2', 's3'];
  let idx = 0;
  const total = radios.length;

  function checkIndex(i) {
    idx = (i + total) % total;
    document.getElementById(radios[idx]).checked = true;
  }

  document
    .querySelector('[data-prev]')
    .addEventListener('click', () => checkIndex(idx - 1));
  document
    .querySelector('[data-next]')
    .addEventListener('click', () => checkIndex(idx + 1));

  document.querySelectorAll('.dots .dot').forEach((dot, i) => {
    dot.addEventListener('click', () => checkIndex(i));
  });

  // Autoplay
  let autoplay = true;
  setInterval(() => {
    if (autoplay) checkIndex(idx + 1);
  }, 4000);

  const container = document.querySelector('.slider-container');
  container.addEventListener('mouseenter', () => (autoplay = false));
  container.addEventListener('mouseleave', () => (autoplay = true));

  // Inicializar
  const initRadio = document.querySelector(
    '.slider-container input[type="radio"]:checked'
  );
  idx = radios.indexOf(initRadio.id);
});
