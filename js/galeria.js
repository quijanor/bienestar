document.addEventListener('DOMContentLoaded', () => {
  const grid = document.querySelector('.gallery-grid');
  const modal = document.querySelector('.modal');
  const modalImg = document.querySelector('#modalImg');
  const closeBtn = document.querySelector('.close-modal');

  // Lista de imágenes — las puedes reemplazar por las tuyas
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

  // Construye la galería automáticamente
  imagenes.forEach((src) => {
    const item = document.createElement('div');
    item.classList.add('gallery-item');

    const img = document.createElement('img');
    img.src = src;
    img.alt = 'Foto de bienestar laboral';

    item.appendChild(img);
    grid.appendChild(item);

    // Abrir modal al hacer clic
    img.addEventListener('click', () => {
      modal.classList.add('show');
      modalImg.src = src;
    });
  });

  // Cerrar modal
  closeBtn.addEventListener('click', () => {
    modal.classList.remove('show');
  });

  // Cerrar haciendo clic fuera
  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.classList.remove('show');
    }
  });
});
