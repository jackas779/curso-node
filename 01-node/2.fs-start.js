const fs = require('node:fs')

const txt = fs.statSync('./archivo.txt')/// / modo sincrono

console.log(
  txt.isFile(), // si es un archivo
  txt.isDirectory(), // si es un directorio
  txt.isSymbolicLink(), // si es un link simbolico
  txt.size// el tamaño en bytes
)
