import { Router } from 'express'
import { UserController } from '../controllers/auth.controller.mjs'

export const createUserRoute = ({ userModel }) => {
  const userController = new UserController({ userModel })
  const userRoute = Router()

  userRoute.post('/auth/register', userController.create)
  userRoute.get('/user/:username', (req, res) => {
    res.send(req.params)
  })

  return userRoute
}
