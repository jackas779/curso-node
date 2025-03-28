import PDFDocument from 'pdfkit' // Nombre correcto de la clase (PDFDocument, no PDFdocument)
import fs from 'fs'
import fsPromise from 'fs/promises'

// Configuración del PDF
const configPDF = {
  font: 'Helvetica',
  size: 'A4',
  autoFirstPage: false,
  fontSize: 10
}

// Crear un nuevo documento PDF
const doc = new PDFDocument(configPDF)
// Crear un stream de escritura para guardar el PDF
const outputStream = fs.createWriteStream('./pdf/Jack_Nicolas_Ardila_Ochoa.pdf')
doc.pipe(outputStream)

doc.addPage({
  margin: {
    top: 10,
    left: 40,
    right: 40
  }
})

doc.font('Helvetica-Bold')
  .fontSize(18)
  .text('Jack Nicolas Ardila Ochoa')
  .fillColor('#118cb6 ')
  .text('Desarrollador Full Stack')

doc.text('\n')

doc.font('Helvetica-Bold')
  .fontSize(12)
  .text('Pefil profesional')

doc.font('Helvetica')
  .fontSize(10)
  .text('Soy un Desarrollador Full Stack con experiencia en desarrollo web,automatización de procesos y cahtbots. He trabajado con tecnologías como JavaScript, PHP, Python, Node.js, React, Drupal, AWS, y base de datso como SQL Server y MySQL. Mi experiencia incluye la implementación de portales web con HTML5, CSS3, SASS, y jQuery, con el uso de metodologías ágiles como SCRUM y GitFlow. Logro destacarme por mi capacidad de adaptarme rápidamente a, trabajar en equipo y resolver problemas de manera eficazm siempre buscando aprender demanera constante. Soy una persona orientada al compromiso y mejora continua.'
    , {
      align: 'left',
      width: 300
    })

doc.text('\n\n')

doc.font('Helvetica-Bold')
  .fontSize(12)
  .text('Experiencia laboral')

doc.font('Helvetica-Bold')
  .fontSize(10)
  .text('\n')
  .text('Desarrollador Full Stack, ', {
    continued: true
  })
  .font('Helvetica-Oblique')
  .text(' Exabyte IT SAS')
  .fontSize(8)
  .fillColor('gray')
  .text('Octubre 2021 - Marzo 2023')

doc.font('Helvetica')
  .fillColor('black')
  .fontSize(10)
  .list(
    [
      'Desarrollo de aplicaciones web utilizando PHP y JavaScript como lenguajes principales.',
      'Experto en la creación, modificación y actualización de código, así como en la implementación de consultas en bases de datos SQL Server (SSMS) y MySQL (SQL-Yog)',
      'Generación de documentos PDF con la librería Open Source FPDF.',
      'Complemento del desarrollo web con librerías JavaScript como jQuery y Ajax para mejorar la funcionalidad y experiencia del usuario'
    ], {
      width: 300
    }
  )

doc.font('Helvetica-Bold')
  .fontSize(10)
  .text('\n')
  .text('Desarrollador Full Stack, ', {
    continued: true
  })
  .font('Helvetica-Oblique')
  .text('Bextechnology S.A.')
  .fontSize(8)
  .fillColor('gray')
  .text('Mayo 2023 - marzo 2025')

doc.font('Helvetica')
  .fillColor('black')
  .fontSize(10)
  .list(
    [
      'Desarrollador de Chatbots y Automatización de Procesos.',
      'Apoyo en el desarrollo de chatbots y automatización de procesos utilizando AWS (Amazon Lex,Amazon Forecast, EC2, RDS, Lambda) y Python.',
      'Colaboración en la estructuración de proyectos y desarrollo de formularios y documentación decasos de uso bajo la guía de un líder técnico.',
      'Creación de interfaces gráficas (GUI) basadas en wireframes proporcionados por diseñadores UX.',
      'Manejo de solicitudes de Pull Request y resolución de errores en React y C#.',
      'Consumo de servicios REST para integración de sistemas.'
    ], {
      width: 300
    }
  )

doc.font('Helvetica-Bold')
  .fontSize(10)
  .text('\n')
  .text('Desarrollador Front End, ', {
    continued: true
  })
  .font('Helvetica-Oblique')
  .text('Universidad de los Andes')
  .fontSize(8)
  .fillColor('gray')
  .text('Enero 2021 - Julio 2021')

doc.font('Helvetica')
  .fillColor('black')
  .fontSize(10)
  .list(
    [
      'Soporte e implementación de portales para facultades universitarias utilizando Drupal 7,HTML5, JavaScript, jQuery, SASS y CSS3.',
      'Aplicación de metodologías ágiles SCRUM y GitFlow para el desarrollo y gestión de proyectos.',
      'Versionado de código con Git y aseguramiento de visualización responsive en diversos dispositivos.'
    ], {
      width: 300
    }
  )
doc.font('Helvetica-Bold')
  .fontSize(10)
  .text('Datos personales', 400, 116)
  .font('Helvetica')
  .fontSize(8)
  .text('3024442702')
  .text('jackas779@gmail.com')

doc.font('Helvetica-Bold')
  .fontSize(10)
  .text('\n\n')
  .text('Competencias')

doc.font('Helvetica')
  .fontSize(10)
  .text('JavaScript')
  .text('PHP')
  .text('Python')
  .text('Ajax')
  .text('SQL')

// Pagina 2

doc.addPage()

doc.font('Helvetica-Bold')
  .fontSize(12)
  .text('EDUCACIÓN')

doc.text('\n')

doc.font('Helvetica-Bold')
  .fontSize(10)
  .text('\n')
  .text('Ingeniería de Sistemas, ', {
    continued: true
  })
  .font('Helvetica')
  .text('Fundación Universitaria del Área Andina')
  .fontSize(8)
  .fillColor('gray')
  .text('Enero 2024 - Actualmente')

doc.font('Helvetica-Bold')
  .fillColor('black')
  .fontSize(10)
  .text('\n')
  .text('Tecnología/Técnico de software informático, ', {
    continued: true
  })
  .font('Helvetica')
  .text(' Servicio Nacional de Aprendizaje (SENA)')
  .fontSize(8)
  .fillColor('gray')
  .text('Abril 2019 - Julio 2022')

doc.font('Helvetica-Bold')
  .fontSize(12)
  .fillColor('black')
  .text('\n\n')
  .text('CAPACITACIÓN / CURSOS')

doc.text('\n')

doc.font('Helvetica-Bold')
  .fillColor('black')
  .fontSize(10)
  .text('\n')
  .text('Crear esquemas de página y prototipos, ', {
    continued: true
  })
  .font('Helvetica')
  .text('Coursera')
  .fontSize(8)
  .fillColor('gray')
  .text('Agosto 2023 - Enero 2024')

doc.end()
