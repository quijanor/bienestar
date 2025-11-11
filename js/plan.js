document.addEventListener('DOMContentLoaded', () => {
  // --- Lista fija de responsables (dos nombres y dos apellidos) ---
  const responsables = [
    'Laura María Gómez López',
    'Carlos Andrés Pérez Ramírez',
    'Ana Lucía Torres Castaño',
    'Julián Alberto Rojas Cardona',
    'María Fernanda Díaz Morales',
    'Andrés Felipe Herrera Guzmán',
    'Diana Carolina Suárez Muñoz',
    'Luis Eduardo Martínez Salazar',
    'Paula Andrea Vélez Cárdenas',
    'Juan Sebastián Torres Pineda',
    'Natalia Alejandra Rincón Vargas',
    'Santiago David Ramírez Ospina',
    'Valentina Sofía López Giraldo',
    'Camilo Andrés Pérez Montoya'
  ];

  // --- Llenar el <select> con los responsables ---
  const select = document.getElementById('responsable');
  select.innerHTML = "<option value=''>Seleccionar...</option>";
  responsables.forEach((nombre) => {
    const option = document.createElement('option');
    option.value = nombre;
    option.textContent = nombre;
    select.appendChild(option);
  });
  document.getElementById('planForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const actividad = document.getElementById('actividad').value;
    const tipo = document.getElementById('tipo').value;
    const fecha = document.getElementById('fecha').value;
    const responsable = document.getElementById('responsable').value;
    const registro = { actividad, tipo, fecha, responsable };
    let arr = JSON.parse(localStorage.getItem('planes')) || [];
    arr.push(registro);
    localStorage.setItem('planes', JSON.stringify(arr));
    mostrar();
    e.target.reset();
  });
  function mostrar() {
    const lista = document.getElementById('lista');
    const arr = JSON.parse(localStorage.getItem('planes')) || [];
    lista.innerHTML =
      '<h2>Actividades registradas:</h2>' +
      arr
        .map(
          (p) =>
            `<p><strong>${p.actividad}</strong> (${p.tipo}) — ${p.fecha} — Resp: ${p.responsable}</p>`
        )
        .join('');
  }
  mostrar();
});
