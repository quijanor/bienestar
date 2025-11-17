document.addEventListener('DOMContentLoaded', () => {
  fetch('footer.html')
    .then((res) => res.text())
    .then((html) => {
      document.getElementById('footer').innerHTML = html;
    })
    .catch((err) => console.log('Footer no encontrado:', err));
});
