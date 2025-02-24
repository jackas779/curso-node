import { verifyLogin } from '../schemas/login.schema.mjs'
import { validateUser } from '../schemas/user.mjs'

export class AuthController {
  constructor ({ authModel }) {
    this.authModel = authModel
  }

  create = (req, res) => {
    const result = validateUser(req.body)
    if (!result.success) {
      console.log(result.error.issues[0])
      const field = result.error.issues[0].path[0]
      const error = result.error.issues[0].message
      return res.status(422).send({ field, error })
    }
    const resultCreate = this.authModel.create({ input: result.data })

    if (resultCreate.ok) {
      return res.status(400).json({ message: 'Usuario ya esta registrado' })
    }
    return res.status(201).json({ message: 'Usuario creado satifactoriamente', user: resultCreate.user.username })
  }

  login = (req, res) => {
    const user = req.body
    const result = verifyLogin(user)
    if (!result.success) {
      const field = result.error.issues[0].path[0]
      const error = result.error.issues[0].message
      return res.status(422).send({ field, error })
    }

    const login = this.authModel.login(result.data)

    if (!login) {
      return res.status(401).send({ error: 'usuario o contraseña incorrectos' })
    }

    res.status(200).json(login)
  }
}
