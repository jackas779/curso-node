import { z } from 'zod'
// import { spanishErrorMap2 } from '../locales/es.mjs';

// z.setErrorMap(spanishErrorMap2)

const userSchema = z.object({
  username: z.string().min(7).max(30),
  firstName: z.string().min(3).max(30),
  lastName: z.string().min(3).max(30),
  email: z.string().email(),
  password: z.string().min(8).max(30),
  phone: z.string().min(10).max(10).length(10),
  age: z.number().int().positive().min(16),
  isAdult: z.boolean()
})

export const validateUser = (input) => userSchema.safeParse(input)
export const partialUser = (input) => userSchema.partial().safeParse(input)
