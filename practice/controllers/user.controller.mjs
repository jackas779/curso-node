import { UserModel } from '../models/user.model.mjs'
import { validateUser } from '../schemas/user.mjs'

export class UserController {
  
  create (req,res){
    const result = validateUser(req.body)
    if (!result.success) {
      console.log(result.error.issues[0])
      const field = result.error.issues[0].path[0]
      const error = result.error.issues[0].message
      return res.status(422).send({ field, error })
    }
    const userModel = UserModel.create()
    return res.status(201).json(userModel)
  }
}