// Lista de documentos disponibles
const documentos = ['F-TH-01.docx', 'documento2.docx', 'documento3.docx'];

const select = document.getElementById('archivoSelect');
documentos.forEach((doc) => {
  const option = document.createElement('option');
  option.value = doc;
  option.textContent = doc;
  select.appendChild(option);
});

// Cargar y convertir documento a HTML
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

// Descargar documento editado (HTML → DOCX)
document.getElementById('saveBtn').addEventListener('click', async () => {
  const contenidoHTML = document.getElementById('editor').innerHTML;

  const converted = await window.docx.HtmlToDocx.toDocx(contenidoHTML, null, {
    table: { row: { cantSplit: true } }
  });

  const blob = new Blob([converted], {
    type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
  });

  saveAs(blob, 'documento_editado.docx');
});
