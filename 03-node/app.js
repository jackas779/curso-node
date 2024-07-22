const express = require('express')
const crypto = require('crypto')
const cors = require('cors')
const api = express()
const movieJSON = require('./movies.json')
const { validateMovie, partialMovie } = require('./schemas/movies')
const { validationPaginator } = require('./schemas/pagination')

const PORT = process.env.PORT ?? 1234

function obtenerPelis(arr, start, end) {
  return arr.slice(start, end)
}

api.use(cors({
  origin: (origin, callback) => {
    const ACCEPTED_ORIGINS = [
      'http://127.0.0.1:5500',
      'http://localhost:8080',
      'https://movies.com',
      'https://midu.dev'
    ]

    if (ACCEPTED_ORIGINS.includes(origin)) {
      return callback(null, true)
    }

    if (!origin) {
      return callback(null, true)
    }

    return callback(new Error('Not allowed by CORS'))
  }
}))

api.disable('x-powered-by') // deshabilitar el header X-Powered-By: Express
api.use(express.json())

api.get('/movies', (req, res) => {
  const { genero, pag } = req.query

  if (genero) {
    const filtersMovies = movieJSON.filter(
      movie => movie.genre.some(g => g.toLowerCase() === genero.toLowerCase())
    )
    return res.json(filtersMovies)
  }

  if (pag) {
    const paginasTotales = Math.ceil(movieJSON.length / 2)
    const result = validationPaginator(pag, paginasTotales)

    if (!result.success) {
      return res.status(204).json({ error: result.error.message })
    }

    const pagMovies = obtenerPelis(movieJSON, 0, 2)
    const pagination = {
      paginas: paginasTotales,
      pagAct: pag
    }
    pagMovies.push(pagination)
    return res.json(pagMovies)
  }

  res.json(movieJSON)
})

api.post('/movies', (req, res) => {
  const result = validateMovie(req.body)

  if (!result.success) {
    return res.status(400).json({ error: result.error.issues[0].message })
  }
  const newMovie = {
    id: crypto.randomUUID(),
    ...result.data
  }
  // Esto no sería REST, porque estamos guardando
  // el estado de la aplicación en memoria
  movieJSON.push(newMovie)

  res.status(201).json(newMovie)
})

api.patch('/movies/:id', (req, res) => {
  const result = partialMovie(req.body)
  if (!result.success) {
    return res.status(400).json({ error: JSON.parse(result.error.message) })
  }
  const { id } = req.params
  const movieIndex = movieJSON.findIndex(movie => movie.id === id)

  if (movieIndex === -1) {
    return res.status(400).json({ message: 'Pelicula no encontrada ' })
  }
  const udapteMovie = {
    ...movieJSON[movieIndex],
    ...result.data
  }

  res.json(udapteMovie)
})

api.delete('/movies/:id', (req, res) => {
  const { id } = req.params
  const movieIndex = movieJSON.findIndex(movie => movie.id === id)

  if (movieIndex === -1) {
    return res.status(400).json({ message: 'Pelicula no encontrada ' })
  }

  movieJSON.slice(movieIndex, 1)
  res.json({ message: 'Pelicula eliminada' })
})

api.use((req, res) => {
  res.status(400).send('<h1> 404 NOT FOUND </h1>')
})

api.listen(PORT, () => {
  console.log(`Servidor escuchando desde http://localhost:${PORT}`)
})
