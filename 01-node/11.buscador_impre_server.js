// const { promises } = require('node:dns')
const fs = require('node:fs/promises')
const http = require('node:http')
const path = require('node:path')
const pc = require('picocolors')

async function recorrerDir(carpeta, file, extension) {
  let files
  try {
    files = await fs.readdir('.')
  } catch {
    console.error(pc.red(`❌ No se pudo leer el directorio ${carpeta}`))
    process.exit(1)
  }

  const promesasFicheros = files.map(async files => {
    const rutaFile = path.join(carpeta, files)

    if (path.basename(rutaFile, '.' + extension) === file) {
      return true
    }
    return false
  })

  const fileExist = await Promise.all(promesasFicheros)

  // fileExist.forEach(fileInfo => console.log(fileInfo))
  const even = (respuesta) => respuesta === true
  if (fileExist.some(even)) {
    openServer(file + '.html')
  } else {
    console.log('No se encuentra el archivo')
  }
}

function openServer(nameFile) {
  const server = http.createServer((req, res) => {
    console.log('request received')
    fs.readFile(nameFile, 'utf-8')
      .then(text => {
        res.end(text)
      })
  })

  server.listen(0, () => {
    console.log(`server listening on port http://localhost:${server.address().port}`)
  })
}

recorrerDir('.', 'pruebas', 'html')
