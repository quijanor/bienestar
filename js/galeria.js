/**
 * Galería Moderna con Lightbox
 * Incluye navegación, teclado, y animaciones suaves
 */

document.addEventListener('DOMContentLoaded', () => {
  // LISTA DE IMÁGENES
  const imagenes = [
    'img/galeria/1.jpeg',
    'img/galeria/2.jpeg',
    'img/galeria/3.jpeg',
    'img/galeria/4.jpeg',
    'img/galeria/5.jpeg',
    'img/galeria/6.jpeg',
    'img/galeria/7.jpeg',
    'img/galeria/8.jpeg'
  ];

  // Contenedor del grid
  const galeria = document.getElementById('galeria');

  if (!galeria) {
    console.error('Contenedor de galería no encontrado');
    return;
  }

  let currentIndex = 0;

  // Crear las imágenes en el grid
  imagenes.forEach((src, index) => {
    const item = document.createElement('div');
    item.className = 'galeria-item';

    const img = document.createElement('img');
    img.src = src;
    img.alt = `Actividad de bienestar ${index + 1}`;
    img.loading = 'lazy'; // Lazy loading nativo

    item.appendChild(img);
    item.addEventListener('click', () => abrirModal(index));

    galeria.appendChild(item);
  });

  // Crear modal con estructura completa
  const modal = document.createElement('div');
  modal.id = 'modal';
  modal.innerHTML = `
    <button class="modal-close" aria-label="Cerrar">×</button>
    <button class="modal-nav prev" aria-label="Anterior">‹</button>
    <button class="modal-nav next" aria-label="Siguiente">›</button>
    <div class="modal-content">
      <img src="" alt="Imagen ampliada">
    </div>
    <div class="modal-counter"></div>
  `;
  document.body.appendChild(modal);

  // Elementos del modal
  const modalImg = modal.querySelector('.modal-content img');
  const modalClose = modal.querySelector('.modal-close');
  const modalPrev = modal.querySelector('.modal-nav.prev');
  const modalNext = modal.querySelector('.modal-nav.next');
  const modalCounter = modal.querySelector('.modal-counter');

  /**
   * Abrir modal en índice específico
   */
  function abrirModal(index) {
    currentIndex = index;
    actualizarModal();
    modal.classList.add('active');
    document.body.style.overflow = 'hidden'; // Prevenir scroll
  }

  /**
   * Cerrar modal
   */
  function cerrarModal() {
    modal.classList.remove('active');
    document.body.style.overflow = ''; // Restaurar scroll
  }

  /**
   * Actualizar contenido del modal
   */
  function actualizarModal() {
    modalImg.src = imagenes[currentIndex];
    modalImg.alt = `Actividad de bienestar ${currentIndex + 1}`;
    modalCounter.textContent = `${currentIndex + 1} / ${imagenes.length}`;
  }

  /**
   * Navegar a imagen anterior
   */
  function imagenAnterior() {
    currentIndex = (currentIndex - 1 + imagenes.length) % imagenes.length;
    actualizarModal();
  }

  /**
   * Navegar a imagen siguiente
   */
  function imagenSiguiente() {
    currentIndex = (currentIndex + 1) % imagenes.length;
    actualizarModal();
  }

  // Event Listeners
  modalClose.addEventListener('click', cerrarModal);
  modalPrev.addEventListener('click', (e) => {
    e.stopPropagation();
    imagenAnterior();
  });
  modalNext.addEventListener('click', (e) => {
    e.stopPropagation();
    imagenSiguiente();
  });

  // Cerrar al hacer click en el fondo (no en la imagen)
  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      cerrarModal();
    }
  });

  // Navegación por teclado
  document.addEventListener('keydown', (e) => {
    if (!modal.classList.contains('active')) return;

    switch (e.key) {
      case 'Escape':
        cerrarModal();
        break;
      case 'ArrowLeft':
        imagenAnterior();
        break;
      case 'ArrowRight':
        imagenSiguiente();
        break;
    }
  });

  // Soporte para gestos táctiles en el modal
  let touchStartX = 0;
  let touchEndX = 0;

  modal.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
  }, { passive: true });

  modal.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
  }, { passive: true });

  function handleSwipe() {
    const swipeThreshold = 50;
    const diff = touchStartX - touchEndX;

    if (Math.abs(diff) > swipeThreshold) {
      if (diff > 0) {
        // Swipe left - siguiente imagen
        imagenSiguiente();
      } else {
        // Swipe right - imagen anterior
        imagenAnterior();
      }
    }
  }

  console.log('✅ Galería moderna cargada con', imagenes.length, 'imágenes');
});
