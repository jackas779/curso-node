// import fs from 'node:fs'
import express, { json } from 'express'
import { corsMiddleware } from './middlewares/cors.js'
import { createMoviesRouter } from './routes/movies.js'
import { MovieModel } from './models/bd-to-mysql/movie.js'
// import { MovieModel } from './models/bd-to-local/movie.js'

const api = express()
// const { validationPaginator } = require('./schemas/pagination')

const PORT = process.env.PORT ?? 1234

api.use(json())
api.use(corsMiddleware())
api.disable('x-powered-by') // deshabilitar el header X-Powered-By: Express

api.use('/movies', createMoviesRouter({ movieModel: MovieModel }))

api.listen(PORT, () => {
  console.log(`Servidor escuchando desde http://localhost:${PORT}`)
})
