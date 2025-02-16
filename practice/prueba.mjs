import PDFDocument from 'pdfkit'
import fs from 'fs'

// Crear un documento PDF
const doc = new PDFDocument({ size: 'A4',autoFirstPage: false });

// Crear un flujo de escritura en un archivo
doc.pipe(fs.createWriteStream('./pdf/tarjeta_profesional.pdf'));
doc.addPage();
doc.image('./imgs/tajeta.jpg', 0, 0, { width: 595.28, height: 841.89 });

// // Crear una lista de outlines
// let outline = [];

// // Agregar la primera página
// doc.addPage()
//    .fontSize(25)
//    .text('Sección 1: Introducción', 100, 100);

// // Agregar un marcador para la primera página
// outline.push({
//   title: 'Introducción', // Título del marcador
//   page: 1,               // Página a la que lleva
//   dest: { x: 0, y: 0 }   // Destino (no es obligatorio en este caso)
// });

// // Agregar la segunda página
// doc.addPage()
//    .fontSize(25)
//    .text('Sección 2: Detalles', 100, 100);

// // Agregar un marcador para la segunda página
// outline.push({
//   title: 'Detalles',     // Título del marcador
//   page: 2,               // Página a la que lleva
//   dest: { x: 0, y: 0 }   // Destino (no es obligatorio)
// });

// // Agregar la tercera página
// doc.addPage()
//    .fontSize(25)
//    .text('Sección 3: Conclusión', 100, 100);

// // Agregar un marcador para la tercera página
// outline.push({
//   title: 'Conclusión',   // Título del marcador
//   page: 3,               // Página a la que lleva
//   dest: { x: 0, y: 0 }   // Destino (no es obligatorio)
// });

// // Agregar los outlines al documento
// doc.outline(outline);

// Finalizar el documento
doc.end();
