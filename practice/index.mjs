import express from 'express'
import path from 'path'
// import jsw from 'jsonwebtoken'
import { createDirname } from './utils/path.mjs'
import swaggerUI from 'swagger-ui-express'
import specs from './swagger/swagger.mjs'
import { createUserRoute } from './routes/auth.route.mjs'
import { UserModel } from './models/bd-to-local/auth.model.mjs'

const { __dirname } = createDirname(import.meta.url)
const PORT = process.env.PORT || 3000

const app = express()

app.disable('x-powered-by')

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(specs))

app.get('/', (req, res) => {
  // res.send(__dirname+'\\pdf\\factura.pdf' )
  // res.sendFile(path.join(__dirname, 'pdf', 'factura.pdf'))/// retorna un archivo
  res.redirect('/api-docs')/// retorna un archivo
})

app.get('./pdf', (req, res) => {
  res.sendFile(path.join(__dirname, 'pdf', 'factura.pdf'))/// retorna un archivo
})

// app.post('/user/register', (userCreate))
// app.use('/user/',createUserRoute()) /// rutas de usuarios manera 1
app.use(createUserRoute({ userModel: UserModel }))/// ruta de usuarios manera 2

app.listen(PORT, () => {
  console.log(` escuchando desde http://localhost:${PORT}`)
})
