document.getElementById('asistenciaForm').addEventListener('submit', (e) => {
  e.preventDefault();
  const nombre = document.getElementById('nombre').value;
  const actividad = document.getElementById('actividad').value;
  const registro = {
    nombre,
    actividad,
    fecha: new Date().toLocaleDateString()
  };
  let arr = JSON.parse(localStorage.getItem('asistencias')) || [];
  arr.push(registro);
  localStorage.setItem('asistencias', JSON.stringify(arr));
  mostrar();
  e.target.reset();
});
cargarActividades();
function mostrar() {
  const lista = document.getElementById('lista');
  const arr = JSON.parse(localStorage.getItem('asistencias')) || [];
  lista.innerHTML =
    '<h2>Asistencias registradas:</h2>' +
    arr
      .map(
        (a) =>
          `<p><strong>${a.nombre}</strong> — ${a.actividad} (${a.fecha})</p>`
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
