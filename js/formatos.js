// formatos.js
document.addEventListener('DOMContentLoaded', () => {
  const formatos = [
    {
      codigo: 'F-TH-01',
      nombre: 'Formato de necesidades del bienestar laboral',
      responsable: 'Coordinador de Talento Humano',
      lugar: 'docs/F-TH-01.docx'
    },
    {
      codigo: 'F-TH-02',
      nombre: 'Formato de plan de bienestar laboral',
      responsable: 'Coordinador de Talento Humano',
      lugar: 'docs/F-TH-02.xlsx'
    },
    {
      codigo: 'F-TH-03',
      nombre: 'Formato de evaluación de actividades de bienestar',
      responsable: 'Coordinador de Talento Humano',
      lugar: 'docs/F-TH-03.docx'
    },
    {
      codigo: 'F-TH-04',
      nombre: 'Formato de asistencia',
      responsable: 'Analista de Bienestar',
      lugar: 'docs/F-TH-04.xlsx'
    },
    {
      codigo: 'F-TH-05',
      nombre: 'Encuesta de satisfacción de bienestar',
      responsable: 'Analista de Bienestar',
      lugar: 'docs/F-TH-05.docx'
    }
  ];

  const tbody = document.querySelector('#formatosTable tbody');

  // Renderizar tabla
  formatos.forEach((fmt) => {
    const tr = document.createElement('tr');

    tr.innerHTML = `
      <td>${fmt.codigo}</td>
      <td>${fmt.nombre}</td>
      <td>${fmt.responsable}</td>
      <td>${fmt.lugar.replace('docs/', '')}</td>
      <td><button class="btn-download" data-path="${fmt.lugar}" data-codigo="${
      fmt.codigo
    }">Descargar</button></td>
    `;

    tbody.appendChild(tr);
  });

  // Evento de descarga
  tbody.addEventListener('click', async (e) => {
    const btn = e.target.closest('.btn-download');
    if (!btn) return;

    const filePath = btn.getAttribute('data-path');
    const codigo = btn.getAttribute('data-codigo');

    // Verificar si existe el archivo real
    try {
      const resp = await fetch(filePath, { method: 'HEAD' });
      if (resp.ok) {
        window.location.href = filePath;
        return;
      }
    } catch (e) {
      console.warn('Archivo no encontrado:', filePath);
    }

    // Si no existe, generar placeholder
    generarPlaceholder(codigo);
  });

  function generarPlaceholder(codigo) {
    const fmt = formatos.find((f) => f.codigo === codigo);

    const texto = `
${fmt.codigo} - ${fmt.nombre}

Responsable de diligenciarlo: ${fmt.responsable}
Lugar de archivo: ${fmt.lugar}

Este es un documento placeholder generado automáticamente.
Reemplace cuando tenga el archivo real.
    `;

    const blob = new Blob([texto], {
      type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
    });

    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = `${codigo}-placeholder.docx`;
    a.click();
    URL.revokeObjectURL(a.href);
  }
});
