// Lista de documentos que tienes en la carpeta /docs
const documentos = ['F-TH-01.docx', 'documento2.docx', 'documento3.docx'];

// Rellenar el select
const select = document.getElementById('archivoSelect');
documentos.forEach((doc) => {
  const option = document.createElement('option');
  option.value = doc;
  option.textContent = doc;
  select.appendChild(option);
});

// Cargar documento elegido
document.getElementById('btnCargar').addEventListener('click', () => {
  const fileName = select.value;
  fetch('docs/' + fileName)
    .then((response) => response.arrayBuffer())
    .then((data) => {
      const zip = new PizZip(data);
      const doc = new window.docxtemplater(zip, { paragraphLoop: true });
      const text = doc.getFullText();
      document.getElementById('editor').value = text;
    })
    .catch((err) => alert('Error al cargar documento: ' + err));
});

// Descargar documento editado
document.getElementById('saveBtn').addEventListener('click', () => {
  const textoNuevo = document.getElementById('editor').value;

  const zip = new PizZip();
  const doc = new window.docxtemplater(zip);

  doc.setData({ text: textoNuevo });

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
    alert('Error generando el documento');
  }
});
