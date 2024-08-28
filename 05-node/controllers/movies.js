import { partialMovie, validateMovie } from '../schemas/movies.js'

export class MovieController {
  constructor ({ movieModel }) {
    this.movieModel = movieModel
  }

  getAll = async (req, res) => {
    const { genero, pag } = req.query
    const movies = await this.movieModel.getAll({ genero, pag })

    if (movies.status === 203) {
      return res.status(203).json({ message: 'pagina no encontrada' })
    }
    res.json(movies)
  }

  create = async (req, res) => {
    const result = validateMovie(req.body)

    if (!result.success) {
      return res.status(404).json({ error: result.error.issues[0].message })
    }
    const newMovie = await this.movieModel.create({ input: result.data })
    res.status(201).json(newMovie)
  }

  update = async (req, res) => {
    const { id } = req.params
    const result = partialMovie(req.body)

    if (!result.success) {
      return res.status(400).json({ error: JSON.parse(result.error.message) })
    }

    const udapteMovie = await this.movieModel.update({ id, input: result.data })

    if (udapteMovie === false) {
      return res.status(400).json({ message: 'Pelicula no encontrada ' })
    }
    res.json(udapteMovie)
  }

  delete = async (req, res) => {
    const { id } = req.params
    const confirm = await this.movieModel.delete({ id })

    if (confirm === false) {
      return res.status(400).json({ message: 'Pelicula no encontrada ' })
    }
    return res.json(confirm)
  }

  notFound = async (req, res) => {
    res.status(400).send('<h1> 404 NOT FOUND </h1>')
  }
}
