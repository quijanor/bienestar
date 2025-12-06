/**
 * Formatos - Diseño moderno con tarjetas
 * Genera tarjetas visuales en lugar de tabla tradicional
 */

document.addEventListener('DOMContentLoaded', () => {
  const formatos = [
    {
      codigo: 'F-TH-01',
      nombre: 'Formato de necesidades del bienestar laboral',
      responsable: 'Coordinador de Talento Humano',
      lugar: 'docs/F-TH-01.docx',
      icon: '📝'
    },
    {
      codigo: 'F-TH-02',
      nombre: 'Formato de plan de bienestar laboral',
      responsable: 'Coordinador de Talento Humano',
      lugar: 'docs/F-TH-02.docx',
      icon: '📋'
    },
    {
      codigo: 'F-TH-03',
      nombre: 'Formato de evaluación de actividades de bienestar',
      responsable: 'Coordinador de Talento Humano',
      lugar: 'docs/F-TH-03.xlsx',
      icon: '📊'
    },
    {
      codigo: 'F-TH-04',
      nombre: 'Formato de asistencia',
      responsable: 'Analista de Bienestar',
      lugar: 'docs/F-TH-04.docx',
      icon: '✅'
    },
    {
      codigo: 'F-TH-05',
      nombre: 'Encuesta de satisfacción de bienestar',
      responsable: 'Analista de Bienestar',
      lugar: 'docs/F-TH-05.docx',
      icon: '📝'
    }
  ];

  const grid = document.getElementById('formatosGrid');

  if (!grid) {
    console.error('Contenedor de formatos no encontrado');
    return;
  }

  // Generar tarjetas
  formatos.forEach((fmt) => {
    const extension = fmt.lugar.split('.').pop();

    const card = document.createElement('div');
    card.className = 'formato-card';

    card.innerHTML = `
      <span class="formato-badge ${extension}">${extension.toUpperCase()}</span>
      
      <div class="formato-header">
        <div class="formato-icon">${fmt.icon}</div>
        <h3 class="formato-codigo">${fmt.codigo}</h3>
      </div>
      
      <h4 class="formato-nombre">${fmt.nombre}</h4>
      
      <div class="formato-info">
        <div class="formato-info-item">
          <span class="icon">👤</span>
          <div>
            <span class="formato-info-label">Responsable:</span>
            <span>${fmt.responsable}</span>
          </div>
        </div>
        <div class="formato-info-item">
          <span class="icon">📁</span>
          <div>
            <span class="formato-info-label">Archivo:</span>
            <span>${fmt.lugar.replace('docs/', '')}</span>
          </div>
        </div>
      </div>
      
      <button class="formato-download" data-path="${fmt.lugar}" data-codigo="${fmt.codigo}">
        <span class="icon">⬇️</span>
        <span>Descargar</span>
      </button>
    `;

    grid.appendChild(card);
  });

  // Evento de descarga
  grid.addEventListener('click', async (e) => {
    const btn = e.target.closest('.formato-download');
    if (!btn) return;

    const filePath = btn.getAttribute('data-path');
    const codigo = btn.getAttribute('data-codigo');

    // Deshabilitar botón temporalmente
    btn.disabled = true;
    btn.innerHTML = '<span class="icon">⏳</span><span>Descargando...</span>';

    // Verificar si existe el archivo real
    try {
      const resp = await fetch(filePath, { method: 'HEAD' });
      if (resp.ok) {
        window.location.href = filePath;

        // Restaurar botón después de un momento
        setTimeout(() => {
          btn.disabled = false;
          btn.innerHTML = '<span class="icon">⬇️</span><span>Descargar</span>';
        }, 2000);

        return;
      }
    } catch (e) {
      console.warn('Archivo no encontrado:', filePath);
    }

    // Si no existe, generar placeholder
    generarPlaceholder(codigo);

    // Restaurar botón
    setTimeout(() => {
      btn.disabled = false;
      btn.innerHTML = '<span class="icon">⬇️</span><span>Descargar</span>';
    }, 1000);
  });

  /**
   * Generar documento placeholder
   */
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

    console.log('✅ Placeholder generado:', codigo);
  }

  console.log('✅ Formatos cargados:', formatos.length, 'tarjetas');
});
