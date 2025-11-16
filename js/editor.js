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
document.getElementById('saveBtn').addEventListener('click', () => {
  const contenidoHTML = document.getElementById('editor').innerHTML;

  const zip = new PizZip();
  const doc = new window.docxtemplater(zip);

  doc.setData({ text: contenidoHTML });

  try {
    doc.render();
    const out = doc.getZip().generate({
      type: 'blob',
      mimeType:
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
    });
    saveAs(out, 'documento_editado.docx');
  } catch (error) {
    console.error(error);
    alert('Error generando documento');
  }
});
