const http = require('node:http')

// commonJS -> modulos clásicos de node
const dittoJSON = require('./pokemon/dittto.json')

const server = http.createServer((req, res) => {
  const { method, url } = req
  console.log(method)
  switch (method) {
    case 'GET':
      res.setHeader('Content-Type', 'text/html; charset=utf-8')
      switch (url) {
        case '/pokemon/ditto':
          res.end(JSON.stringify(dittoJSON))
          break
        default:
          res.end('<h1>404 NOT FOUND</h1>')
          break
      }
      break
    case 'POST':
      switch (url) {
        case '/pokemon': {
          let body = ''

          // escuchar el evento data
          req.on('data', chunk => {
            body += chunk.toString()
          })

          req.on('end', () => {
            const data = JSON.parse(body)
            // llamar a una base de datos para guardar la info
            res.writeHead(201, { 'Content-Type': 'application/json; charset=utf-8' })

            data.timestamp = Date.now()
            res.end(JSON.stringify(data))
          })

          break
        }
      }
      break
    default:
      res.setHeader('Content-Type', 'text/html; charset=utf-8')
      res.end('<h1>404 NOT FOUND</h1>')
      break
  }
  // res.end('hola mundo nuevamenteee')
})

server.listen(1234, () => {
  console.log(`escuchando desde el puerto : http://localhost:${server.address().port}`)
})
