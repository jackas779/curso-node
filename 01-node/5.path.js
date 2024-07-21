const path = require('node:path')

// barra separadora de carpetas segun SO
console.log(path.sep)

// unir rutas con path.join
const filePath = path.join('content', 'subfolder', 'test.txt')
console.log(filePath)

/// // nombre con fichero con extension
const base = path.basename('/tmp/midu-secret-files/password.txt')
console.log(base)

/// nombre del fichero sin extensiopn
const filename = path.basename('/tmp/midu-secret-files/password.txt', '.txt')
console.log(filename)

/// / extension del archivo
const extension = path.extname('my.super.image.jpg')
console.log(extension)
