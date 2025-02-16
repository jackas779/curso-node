import express from 'express'
import path from 'path'
import { createDirname } from './utils/path.mjs'
import { verifyUser } from './schemas/schema.mjs'
import { validateUser } from './schemas/user.mjs'
import swaggerUI from 'swagger-ui-express'
import specs from './swagger/swagger.mjs'

const { __dirname } = createDirname(import.meta.url)
const PORT = process.env.PORT || 3000

const app = express()

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(specs))

app.get('/', (req, res) => {
  // res.send(__dirname+'\\pdf\\factura.pdf' )
  // res.sendFile(path.join(__dirname, 'pdf', 'factura.pdf'))/// retorna un archivo
  res.redirect('/api-docs')/// retorna un archivo
})

app.get('/users', (req, res) => {
  const { user } = req.body
  const result = verifyUser({ username: user })

  if (!result.success) {
    const field = result.error.issues[0].path[0]
    const error = result.error.issues[0].message
    res.send({ field, error })
    return
  }
  res.json(result.data)
})

app.get('./pdf', (req, res) => {
  res.sendFile(path.join(__dirname, 'pdf', 'factura.pdf'))/// retorna un archivo
})

app.post('/register/users', (req, res) => {
  const result = validateUser(req.body)
  if (!result.success) {
    console.log(result.error.issues[0])
    const field = result.error.issues[0].path[0]
    const error = result.error.issues[0].message
    res.send({ field, error })
    return
  }
  res.json(req.body)
})

app.listen(PORT, () => {
  console.log(` escuchando desde http://localhost:${PORT}`)
})
