import { z, setErrorMap, getErrorMap } from 'zod'
import { spanishErrorMap2 } from '../locales/es.mjs';

z.setErrorMap(spanishErrorMap2)

const userSchema  = z.object({
  username : z.number().max(10)
})



export const verifyUser = ({username}) =>{
  return userSchema.safeParse({username});
}
