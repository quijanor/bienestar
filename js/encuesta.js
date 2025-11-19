document.getElementById('encuestaForm').addEventListener('submit', (e) => {
  e.preventDefault();

  const satisfaccion = document.getElementById('satisfaccion').value;
  const emocional = document.getElementById('emocional').value;
  const recomienda = document.getElementById('recomienda').value;
  const organizacion = document.getElementById('organizacion').value;
  const comentarios = document.getElementById('comentarios').value;

  const registro = {
    satisfaccion,
    emocional,
    recomienda,
    organizacion,
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
    arr
      .map(
        (e) => `
        <p>
          <strong>Satisfacción:</strong> ${e.satisfaccion}<br>
          <strong>Bienestar emocional:</strong> ${e.emocional}<br>
          <strong>¿Recomienda?:</strong> ${e.recomienda}<br>
          <strong>Organización:</strong> ${e.organizacion}<br>
          <strong>Comentarios:</strong> ${e.comentarios}<br>
          <strong>Fecha:</strong> ${e.fecha}
        </p><hr>
        `
      )
      .join('');
}

mostrar();
