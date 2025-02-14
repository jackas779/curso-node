import PDFdocument from 'pdfkit'
import fs from 'fs'

const configPDF = {
  font: 'Courier',
  size: 'A4',
  autoFirstPage: false
}

const doc = new PDFdocument(configPDF);

doc.pipe(fs.createWriteStream('./pdf/file.pdf'));
doc.on('pageAdded', () => doc.text("Pagina de titulo nueva "));//// agrega contentido cuanod se cree una pagina 
// doc.pipe(res);
doc.addPage();
// doc.moveTo(0, 20)                               // set the current point
//   .lineTo(100, 160)                            // draw a line
//   .quadraticCurveTo(130, 200, 150, 120)        // draw a quadratic curve
//   .bezierCurveTo(190, -40, 200, 200, 300, 150) // draw a bezier curve
//   .lineTo(400, 90)                             // draw another line
//   .stroke();      

// doc.path('M 0,20 L 100,160 Q 130,200 150,120 C 190,-40 200,200 300,150 L 400,90')
//   .stroke() /// dibujar lineas con path svg

// doc.moveTo(40, 40)                               // set the current point
//   .bezierCurveTo(36, 75, 20, 55, 38, 55) // draw a bezier curve
//   .lineTo(39, 55)
// .stroke();

// doc.text('Hello world!', 100, 100)

// const lorem = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam in suscipit purus.  Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Vivamus nec hendrerit felis. Morbi aliquam facilisis risus eu lacinia. Sed eu leo in turpis fringilla hendrerit. Ut nec accumsan nisl.';

// doc.fontSize(8);

// doc.fillColor('red')
//   .text(lorem.slice(0, 199), {
//     width: 465,
//     continued: true
//   })
//   .fillColor('blue')
//   .text(lorem.slice(199, 282), {
//     link: 'http://www.example.com',
//     continued: true
//   })
//   .fillColor('green')
//   .text(lorem.slice(182, 400), {
//     link: null
//   });
//   doc.fillColor('black')

// doc.image('./imgs/certificado_pag1.jpg', 0,0, {width: 595.28, height:841.89})
//   .text('Proportional to width', 0, 0); //titulo 
// Get a reference to the Outline root
const { outline } = doc;

// Add a top-level bookmark
const top = outline.addItem('Top Level');

// Add a sub-section
top.addItem('Sub-section');


doc.end();




// fs.readdir('./imgs')
// .then(files =>{
//   console.log("archivo: ", files);
// })
// console.log();