import { Router } from 'express'
import { MovieController } from '../controllers/movies.js'
/// // se tiene que poner siempre la extension
// import movieJSON from '../movies.json' with { type: "json" } /// esto es oficial pero es esperimental
// const movieJSON = JSON.parse(fs.readFileSync('./movies.json', 'utf-8'))/// forma 2 que es un poco complicada

// como leer un json module hasta que whit deje de ser experimental

export const moviesRouter = Router()

moviesRouter.get('/', MovieController.getAll)

moviesRouter.post('/', MovieController.create)

moviesRouter.patch('/:id', MovieController.update)

moviesRouter.delete('/:id', MovieController.delete)
