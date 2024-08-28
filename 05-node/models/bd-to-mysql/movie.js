import mysql from 'mysql2/promise'

const connection = await mysql.createConnection({
  host: 'localhost',
  port: 3306,
  user: 'root',
  database: 'moviesdb'
})

export class MovieModel {
  static async getAll ({ genero, pag }) {
    if (genero) {
      const [idGenre] = await connection.execute('SELECT id FROM generos WHERE name = ?', [genero.toLowerCase()])
      if (idGenre.length === 0) return { message: 'Genero no encontrado' }

      const [{ id }] = idGenre

      const [results] = await connection.execute(
        `SELECT 
          BIN_TO_UUID(m.id) AS id, m.title, m.year,m.director,m.duration,m.poster, 
          GROUP_CONCAT(g.name SEPARATOR ', ') AS genres,m.rate 
        FROM movies AS m
        INNER JOIN (
          SELECT id,id_genero FROM movies AS t1 
          INNER JOIN  movies_genre as t2 ON t1.id = t2.id_movie 
          WHERE id_genero = ${id}
        ) AS t2 ON m.id = t2.id
        INNER JOIN movies_genre mg  ON m.id = mg.id_movie
        INNER JOIN generos g ON mg.id_genero = g.id
        GROUP BY m.id; `
      )

      return results.map((e) => ({
        ...e,
        genres: e.genres.split(', ')
      }))
    }
    if (pag) {
      const [countPag] = await connection.query('SELECT COUNT(*) AS total FROM movies')
      const [{ total }] = countPag

      const currentPag = parseInt(pag)
      const pageSize = 2
      const paginasTotales = Math.ceil(total / pageSize)

      if (pag > paginasTotales || pag < 1) {
        return { status: 203 } // 204
      }
      const pagIni = (currentPag - 1) * pageSize

      const [pagMovies] = await connection.query(
        `SELECT 
          bin_to_uuid(m.id) AS id, m.title, m.year,m.director,m.duration,m.poster, 
          GROUP_CONCAT(g.name SEPARATOR ', ') AS genres,m.rate 
        FROM movies AS m 
        INNER JOIN movies_genre mg ON m.id = mg.id_movie
        INNER JOIN generos g ON mg.id_genero = g.id
        GROUP BY m.id LIMIT ?,?`,
        [pagIni, pageSize]
      )
      const pagination = {
        pagActual: pag,
        totalPaginas: paginasTotales
      }

      const movies = pagMovies.map((e) => ({
        ...e,
        genres: e.genres.split(', ')
      }))

      movies.push(pagination)

      return movies
    }
    try {
      const [results] = await connection.query(
        `SELECT 
          bin_to_uuid(m.id) AS id, m.title, m.year,m.director,m.duration,m.poster, 
          GROUP_CONCAT(g.name SEPARATOR ', ') AS genres,m.rate 
        FROM movies AS m 
        INNER JOIN movies_genre mg ON m.id = mg.id_movie
        INNER JOIN generos g ON mg.id_genero = g.id
        GROUP BY m.id;`
      )

      return results.map((e) => ({
        ...e,
        genres: e.genres.split(', ')
      }))
    } catch (e) {
      console.log(e)
    }
  }

  static async create ({ input }) {
    const {
      // genre: genreInput, // genre is an array
      title,
      year,
      duration,
      director,
      rate,
      poster
    } = input

    const [uuidResult] = await connection.query('SELECT UUID() uuid')
    const [{ uuid }] = uuidResult

    try {
      await connection.execute(
        `INSERT INTO movies (id,title,year,director,duration,poster,rate)
          VALUES (UUID_TO_BIN("${uuid}"),?,?,?,?,?,? );`,
        [title, year, director, duration, poster, rate])
    } catch (error) {
      console.log(error)
      throw new Error('Error creating movie')
    }
    const [movieCreate] = await connection.query(
      `SELECT bin_to_uuid(id) AS id, title, year,director,duration,poster,rate FROM movies 
      WHERE id = UUID_TO_BIN("${uuid}")`
    )

    return movieCreate
  }

  static async update ({ id, input }) {
    const [movieResult] = await connection.execute(
      'SELECT bin_to_uuid(id) AS id, title, year,director,duration,poster,rate FROM movies WHERE id = UUID_TO_BIN(?)',
      [id]
    )
    if (movieResult.length === 0) return { message: 'no se encontro ninguna pelicula' }
    const udapteMovie = {
      ...movieResult[0],
      ...input
    }

    const {
      title,
      year,
      duration,
      director,
      rate,
      poster
    } = udapteMovie

    try {
      const [resultsUpdate] = await connection.execute(
        'UPDATE movies SET title = ? , year = ?, duration = ?,director = ? , rate = ?, poster = ? WHERE id = UUID_TO_BIN(?)',
        [title, year, duration, director, rate, poster, id]
      )

      console.log(resultsUpdate)

      if (resultsUpdate.affectedRows === 1) {
        return udapteMovie
      } else {
        return { message: 'No se encontro ningun registro para eliminar' }
      }
    } catch (error) {
      throw new Error('Error al actualizar la pelicula')
    }
  }

  static async delete ({ id }) {
    try {
      const [result] = await connection.execute('DELETE FROM movies WHERE id = UUID_TO_BIN(?)', [id])
      if (result.affectedRows === 1) {
        return { message: 'Pelicula elimianda correctamente' }
      } else {
        return { message: 'No se encontro ningun registro para eliminar' }
      }
    } catch (error) {
      throw new Error('Error delete movie')
    }
  }
}
