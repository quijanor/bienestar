let tabla;

// Cargar automáticamente el archivo Excel desde docs/F-TH-02.xlsx
fetch('docs/F-TH-02.xlsx')
  .then((response) => response.arrayBuffer())
  .then((data) => {
    const workbook = XLSX.read(data, { type: 'array' });
    const hojaNombre = workbook.SheetNames[0];
    const hoja = workbook.Sheets[hojaNombre];

    const datos = XLSX.utils.sheet_to_json(hoja, { header: 1 });

    const contenedor = document.getElementById('excel');

    tabla = new Handsontable(contenedor, {
      data: datos,
      rowHeaders: true,
      colHeaders: true,
      width: '100%',
      height: 500,
      licenseKey: 'non-commercial-and-evaluation',
      contextMenu: true,
      manualColumnResize: true,
      manualRowResize: true,
      filters: true,
      dropdownMenu: true
    });
  })
  .catch((err) => {
    alert('No se pudo cargar docs/F-TH-02.xlsx');
    console.error(err);
  });

// Descargar archivo actualizado
function descargarExcel() {
  if (!tabla) {
    alert('El archivo aún no se ha cargado.');
    return;
  }

  const datosEditados = tabla.getData();
  const hoja = XLSX.utils.aoa_to_sheet(datosEditados);
  const libro = XLSX.utils.book_new();

  XLSX.utils.book_append_sheet(libro, hoja, 'Hoja1');

  XLSX.writeFile(libro, 'F-TH-02_editado.xlsx');
}
