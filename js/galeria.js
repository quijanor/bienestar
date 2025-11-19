// LISTA DE IMÁGENES (aquí agregas más si quieres)
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

// Crear las imágenes en el grid
imagenes.forEach((src) => {
  const img = document.createElement('img');
  img.src = src;
  img.alt = 'Foto de bienestar';
  img.addEventListener('click', () => abrirModal(src));
  galeria.appendChild(img);
});

// CREAR MODAL
const modal = document.createElement('div');
modal.id = 'modal';
modal.innerHTML = `<img src="">`;
document.body.appendChild(modal);

// Abrir modal
function abrirModal(src) {
  modal.style.display = 'flex';
  modal.querySelector('img').src = src;
}

// Cerrar modal al hacer clic
modal.addEventListener('click', () => (modal.style.display = 'none'));
