document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('diagnosticoForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const nombre = document.getElementById('nombre').value;
    const area = document.getElementById('area').value;
    const necesidad = document.getElementById('necesidad').value;
    const registro = {
      nombre,
      area,
      necesidad,
      fecha: new Date().toLocaleDateString()
    };
    let arr = JSON.parse(localStorage.getItem('diagnosticos')) || [];
    arr.push(registro);
    localStorage.setItem('diagnosticos', JSON.stringify(arr));
    mostrar();
    e.target.reset();
  });
  function mostrar() {
    const lista = document.getElementById('lista');
    const arr = JSON.parse(localStorage.getItem('diagnosticos')) || [];
    lista.innerHTML =
      '<h2>Registros guardados:</h2>' +
      arr
        .map(
          (r) =>
            `<p><strong>${r.nombre}</strong> (${r.area}): ${r.necesidad} — ${r.fecha}</p>`
        )
        .join('');
  }
  mostrar();
});
