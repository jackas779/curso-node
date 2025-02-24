import { validateUser } from '../schemas/user.mjs'

export class UserController {
  constructor ({ userModel }) {
    this.userModel = userModel
  }

  create = (req, res) => {
    const result = validateUser(req.body)
    if (!result.success) {
      console.log(result.error.issues[0])
      const field = result.error.issues[0].path[0]
      const error = result.error.issues[0].message
      return res.status(422).send({ field, error })
    }
    const resultCreate = this.userModel.create({ input: result.data })

    if (resultCreate.ok) {
      return res.status(400).json({ message: 'Usuario ya esta registrado' })
    }
    return res.status(201).json({ message: 'Usuario creado satifactoriamente', user: resultCreate.user.username })
  }

  get = (req, res) => {
    const { username } = req.params
    const user = this.userModel.get({ username })
  }
}
