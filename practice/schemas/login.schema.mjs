import { z } from 'zod'

const loginSchema = z.object({
  username: z.string().min(7, { message: 'El nombre de usuario o email debe tener al menos 3 caracteres' }), // Permite usuario o email como identificador
  password: z.string()
    .min(1, { message: 'La contraseña es requerida' }) // Mínimo 1 caracter para que no esté vacío
}).required()

export const verifyLogin = (input) => loginSchema.safeParse(input)
