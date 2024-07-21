const express = require('express')
const app = express()
const dittoJSON = require('./pokemon/dittto.json')

app.disable('x-powered-by')

const PORT = process.env.PORT ?? 1234

/// manera que ofrece express
app.use(express.json())

/// / manera larga de hacerlo.
// app.use((req, res, next) => {
//   if (req.method !== 'POST') return next()
//   if (req.headers['content-type'] !== 'application/json') return next()

//   let body = ''
//   // escuchar el evento data
//   req.on('data', chunk => {
//     body += chunk.toString()
//   })

//   req.on('end', () => {
//     const data = JSON.parse(body)
//     data.timestamp = Date.now()
//     /// /mutamos el cuerpo de la peticion
//     req.body = data
//     next()
//   })
// })

app.get('/', (req, res) => {
  res.send(dittoJSON)
})

app.post('/', (req, res) => {
  res.status(201).json(req.body)
})

/// / para la ultima ruta usar use y manejar los errroes de no contarar
app.use((req, res) => {
  res.status(404).send('<h1>404 NOT FOUND</h1>')
})

app.listen(PORT, () => {
  console.log(`EL puerto listo para escuchar es http://localhost:${PORT}`)
})
