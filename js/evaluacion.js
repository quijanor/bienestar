document.getElementById('evaluacionForm').addEventListener('submit', (e) => {
  e.preventDefault();
  const actividad = document.getElementById('actividad').value;
  const satisfaccion = document.getElementById('satisfaccion').value;
  const comentarios = document.getElementById('comentarios').value;
  const registro = {
    actividad,
    satisfaccion,
    comentarios,
    fecha: new Date().toLocaleDateString()
  };
  let arr = JSON.parse(localStorage.getItem('evaluaciones')) || [];
  arr.push(registro);
  localStorage.setItem('evaluaciones', JSON.stringify(arr));
  mostrar();
  e.target.reset();
});
cargarActividades();
function mostrar() {
  const lista = document.getElementById('lista');
  const arr = JSON.parse(localStorage.getItem('evaluaciones')) || [];
  lista.innerHTML =
    '<h2>Evaluaciones guardadas:</h2>' +
    arr
      .map(
        (e) =>
          `<p><strong>${e.actividad}</strong>: ${e.satisfaccion}/5 — ${e.comentarios}</p>`
      )
      .join('');
}
function cargarActividades() {
  const select = document.getElementById('actividad');
  const planes = JSON.parse(localStorage.getItem('planes')) || [];

  select.innerHTML = "<option value=''>Seleccionar...</option>";

  planes.forEach((p) => {
    const option = document.createElement('option');
    option.value = p.actividad;
    option.textContent = `${p.actividad} (${p.tipo})`;
    select.appendChild(option);
  });
}
mostrar();
