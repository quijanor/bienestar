document.getElementById('encuestaForm').addEventListener('submit', (e) => {
  e.preventDefault();
  const satisfaccion = document.getElementById('satisfaccion').value;
  const comentarios = document.getElementById('comentarios').value;
  const registro = {
    satisfaccion,
    comentarios,
    fecha: new Date().toLocaleDateString()
  };
  let arr = JSON.parse(localStorage.getItem('encuestas')) || [];
  arr.push(registro);
  localStorage.setItem('encuestas', JSON.stringify(arr));
  mostrar();
  e.target.reset();
});
function mostrar() {
  const lista = document.getElementById('lista');
  const arr = JSON.parse(localStorage.getItem('encuestas')) || [];
  lista.innerHTML =
    '<h2>Encuestas registradas:</h2>' +
    arr.map((e) => `<p>${e.satisfaccion} — ${e.comentarios}</p>`).join('');
}
mostrar();
