import PDFDocument from 'pdfkit' // Nombre correcto de la clase (PDFDocument, no PDFdocument)
import fs from 'fs'
import fsPromise from 'fs/promises'

// Configuración del PDF
const configPDF = {
  font: 'Courier',
  size: 'A3',
  autoFirstPage: false
}

// Crear un nuevo documento PDF
const doc = new PDFDocument(configPDF)

// Crear un stream de escritura para guardar el PDF
const outputStream = fs.createWriteStream('./pdf/saber_ser.pdf')
doc.pipe(outputStream)

// Leer la carpeta de imágenes y agregarlas al PDF
fsPromise.readdir('./imgs/malparida')
  .then((files) => {
    console.log('Archivos encontrados:', files)

    // Iterar sobre cada archivo de imagen
    files.forEach((file, index) => {
      if (index > 2) {
        return
      }
      // Agregar una nueva página para cada imagen
      doc.addPage()

      // Insertar la imagen en la página
      doc.image(`./imgs/malparida/${file}`, 0, 0, { width: 841.89, height: 1190.55 })

      // Agregar un texto en la página (ajusta las coordenadas según sea necesario)
      // doc.text('Proportional to width', 50, 50); // Título
    })

    // Finalizar el documento
    doc.end()
  })
  .catch((error) => {
    console.error('Error al leer la carpeta de imágenes:', error)
  })
