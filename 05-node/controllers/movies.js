import { MovieModel } from '../models/bd-to-mysql/movie.js'
import { partialMovie, validateMovie } from '../schemas/movies.js'

export class MovieController {
  static async getAll (req, res) {
    const { genero, pag } = req.query
    const movies = await MovieModel.getAll({ genero, pag })

    if (movies.status === 203) {
      return res.status(203).json({ message: 'pagina no encontrada' })
    }
    res.json(movies)
  }

  static async create (req, res) {
    const result = validateMovie(req.body)

    if (!result.success) {
      return res.status(404).json({ error: result.error.issues[0].message })
    }
    const newMovie = await MovieModel.create({ input: result.data })
    res.status(201).json(newMovie)
  }

  static async update (req, res) {
    const { id } = req.params
    const result = partialMovie(req.body)

    if (!result.success) {
      return res.status(400).json({ error: JSON.parse(result.error.message) })
    }

    const udapteMovie = await MovieModel.update({ id, input: result.data })

    if (udapteMovie === false) {
      return res.status(400).json({ message: 'Pelicula no encontrada ' })
    }
    res.json(udapteMovie)
  }

  static async delete (req, res) {
    const { id } = req.params
    const confirm = await MovieModel.delete({ id })

    if (confirm === false) {
      return res.status(400).json({ message: 'Pelicula no encontrada ' })
    }
    return res.json(confirm)
  }
}
