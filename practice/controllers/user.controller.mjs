import { validateUser } from '../schemas/user.mjs'

export class UserController {
  constructor ({ userModel }) {
    this.userModel = userModel
  }

  create (req, res) {
    const result = validateUser(req.body)
    if (!result.success) {
      console.log(result.error.issues[0])
      const field = result.error.issues[0].path[0]
      const error = result.error.issues[0].message
      return res.status(422).send({ field, error })
    }
    const resultCreate = this.userModel.create(req.body)
    if (resultCreate.ok) {
      return res.status(401).json({ message: 'Usuario ya existe' })
    }
    return res.status(201).json(resultCreate.user)
  }
}
