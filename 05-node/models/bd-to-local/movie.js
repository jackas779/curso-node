import { readJSON } from '../../utils.js'
import { randomUUID } from 'crypto'

const movieJSON = readJSON('./movies.json')

export class MovieModel {
  static async getAll ({ genero, pag }) {
    if (genero) {
      return movieJSON.filter(
        movie => movie.genre.some(g => g.toLowerCase() === genero.toLowerCase())
      )
    }

    if (pag) {
      const currentPag = parseInt(pag)
      const pageSize = 2
      const paginasTotales = Math.ceil(movieJSON.length / pageSize)

      if (pag > paginasTotales || pag < 1) {
        return { status: 203 } // 204
      }
      const pagIni = (currentPag - 1) * 2
      const pagFinal = pagIni + pageSize

      const pagMovies = movieJSON.slice(pagIni, pagFinal)
      const pagination = {
        paginas: paginasTotales,
        pagAct: pag
      }

      pagMovies.push(pagination)
      return pagMovies
    }
    return movieJSON
  }

  static async create ({ input }) {
    const newMovie = {
      id: randomUUID(),
      ...input
    }
    // Esto no sería REST, porque estamos guardando
    // el estado de la aplicación en memoria
    movieJSON.push(newMovie)

    return newMovie
  }

  static async update ({ id, input }) {
    const movieIndex = movieJSON.findIndex(movie => movie.id === id)

    if (movieIndex === -1) {
      return false
    }

    const udapteMovie = {
      ...movieJSON[movieIndex],
      ...input
    }

    return udapteMovie
  }

  static async delete ({ id }) {
    const movieIndex = movieJSON.findIndex(movie => movie.id === id)

    if (movieIndex === -1) {
      return false
    }

    movieJSON.slice(movieIndex, 1)
    return { message: 'Pelicula eliminada' }
  }
}
