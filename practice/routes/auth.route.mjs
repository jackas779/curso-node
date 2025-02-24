import { Router } from 'express'
import { AuthController } from '../controllers/auth.controller.mjs'

export const createUserRoute = ({ authModel }) => {
  const authController = new AuthController({ authModel })
  const userRoute = Router()

  userRoute.post('/auth/register', authController.create)
  userRoute.post('/auth/login', authController.login)
  userRoute.get('/user/:username', (req, res) => {
    res.send(req.params)
  })

  return userRoute
}
