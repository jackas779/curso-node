// import fs from 'node:fs'
import express, { json } from 'express'
import { corsMiddleware } from './middlewares/cors.js'
import { moviesRouter } from './routes/movies.js'

const api = express()
// const { validationPaginator } = require('./schemas/pagination')

const PORT = process.env.PORT ?? 1234

api.use(json())
api.use(corsMiddleware())

api.disable('x-powered-by') // deshabilitar el header X-Powered-By: Express

api.use('/movies', moviesRouter)

api.use((req, res) => {
  res.status(400).send('<h1> 404 NOT FOUND </h1>')
})

api.listen(PORT, () => {
  console.log(`Servidor escuchando desde http://localhost:${PORT}`)
})
