// Lista de documentos disponibles
const documentos = ['F-TH-01.docx', 'documento2.docx', 'documento3.docx'];

const select = document.getElementById('archivoSelect');
documentos.forEach((doc) => {
  const option = document.createElement('option');
  option.value = doc;
  option.textContent = doc;
  select.appendChild(option);
});

// Cargar documento y convertir a HTML
document.getElementById('btnCargar').addEventListener('click', () => {
  const fileName = select.value;

  fetch('docs/' + fileName)
    .then((res) => res.arrayBuffer())
    .then((arrayBuffer) => mammoth.convertToHtml({ arrayBuffer }))
    .then((result) => {
      document.getElementById('editor').innerHTML = result.value;
    })
    .catch((err) => alert('Error al cargar documento: ' + err));
});

// Descargar como DOCX (HTML → DOCX)
document.getElementById('saveBtn').addEventListener('click', () => {
  const contenido = document.getElementById('editor').innerHTML;

  const html = `
        <html xmlns:o='urn:schemas-microsoft-com:office:office'
              xmlns:w='urn:schemas-microsoft-com:office:word'
              xmlns='http://www.w3.org/TR/REC-html40'>
        <head><meta charset="UTF-8"></head>
        <body>${contenido}</body>
        </html>
    `;

  const blob = new Blob(['\ufeff', html], {
    type: 'application/msword'
  });

  saveAs(blob, 'documento_editado.doc');
});
