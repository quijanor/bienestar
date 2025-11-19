document.addEventListener('DOMContentLoaded', () => {
  const radios = ['s1', 's2', 's3'];
  let idx = 0;
  const total = radios.length;

  // Helper para seleccionar radio por id
  function checkIndex(i) {
    idx = (i + total) % total;
    document.getElementById(radios[idx]).checked = true;
  }

  // Flechas: prev / next
  document.querySelectorAll('[data-prev]').forEach((el) => {
    el.addEventListener('click', () => checkIndex(idx - 1));
  });
  document.querySelectorAll('[data-next]').forEach((el) => {
    el.addEventListener('click', () => checkIndex(idx + 1));
  });

  // Si el usuario hace click en un dot (label), actualizar idx
  document.querySelectorAll('.dots .dot').forEach((dot, i) => {
    dot.addEventListener('click', () => {
      checkIndex(i);
    });
  });

  // Autoplay (opcional)
  let autoplay = true;
  let autoplayInterval = 4000;
  let timer = setInterval(() => {
    if (autoplay) checkIndex(idx + 1);
  }, autoplayInterval);

  // Pausar autoplay al hover (desktop)
  const container = document.querySelector('.slider-container');
  if (container) {
    container.addEventListener('mouseenter', () => (autoplay = false));
    container.addEventListener('mouseleave', () => (autoplay = true));
  }

  // Inicializar estado según radio inicial
  const initRadio = document.querySelector(
    '.slider-container input[type="radio"]:checked'
  );
  if (initRadio) idx = radios.indexOf(initRadio.id);
});
