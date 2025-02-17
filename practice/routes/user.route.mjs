import { Router } from 'express'
import { UserController } from '../controllers/user.controller.mjs'

export const createUserRoute = () =>{ 
  const userController = new UserController()
  const userRoute = Router()

  userRoute.post('/user/register', userController.create)

  return userRoute
}