import { Router } from 'express'
import { UserController } from '../controllers/user.controller.mjs'

export const createUserRoute = ({ userModel }) => {
  const userController = new UserController({ userModel })
  const userRoute = Router()

  userRoute.post('/user/register', userController.create)

  return userRoute
}
