let tabla;
let datosOriginales;
let nombreArchivo = 'F-TH-02.xlsx';

document.getElementById('btnCargar').addEventListener('click', () => {
  fetch('docs/' + nombreArchivo)
    .then((res) => res.arrayBuffer())
    .then((buffer) => {
      const workbook = XLSX.read(buffer, { type: 'array' });
      const nombreHoja = workbook.SheetNames[0];
      const hoja = workbook.Sheets[nombreHoja];

      const datos = XLSX.utils.sheet_to_json(hoja, { header: 1 });

      // Eliminar columnas vacías al inicio
      //   datos = datos.map((row) => {
      //     while (row.length && (row[0] === '' || row[0] == null)) {
      //       row.shift();
      //     }
      //     return row;
      //   });

      console.log('DATOS CARGADOS:', datos);

      datosOriginales = datos;

      const contenedor = document.getElementById('excel');

      setTimeout(() => {
        tabla.scrollViewportTo(0, 5); // ir a columna 5 donde comienzan datos
      }, 200);

      tabla = new Handsontable(contenedor, {
        data: datos,
        rowHeaders: true,
        colHeaders: true,
        width: '100%',
        height: 500,
        manualColumnResize: true,
        manualRowResize: true,
        stretchH: 'all',
        licenseKey: 'non-commercial-and-evaluation',
        // 🔥 importante:
        renderAllRows: false,
        autoColumnSize: { useHeaders: true },
        autoRowSize: true
      });
    })
    .catch((err) => alert('Error cargando Excel: ' + err));
});

document.getElementById('btnDescargar').addEventListener('click', () => {
  if (!tabla) {
    alert('Primero carga el archivo');
    return;
  }

  const datosEditados = tabla.getData();

  const hoja = XLSX.utils.aoa_to_sheet(datosEditados);
  const libro = XLSX.utils.book_new();

  XLSX.utils.book_append_sheet(libro, hoja, 'Hoja1');

  XLSX.writeFile(libro, 'F-TH-02_EDITADO.xlsx');
});
