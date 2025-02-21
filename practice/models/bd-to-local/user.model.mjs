import { ModelUser, baseModelUser } from '../../schemas/user.schema.bd.mjs'
import { connectionBd } from '../../databases/to-local/db.schema.mjs'
import crypto from 'crypto'

const { randomUUID } = crypto

export class UserModel {
  static create ({ input }) {
    const userSchema = connectionBd(ModelUser, baseModelUser)

    const userRegister = userSchema.findOne({ username: input.username })

    if (userRegister) {
      return { ok: true }
    }

    const newUser = {
      _id: randomUUID(),
      ...input
    }

    userSchema.create(newUser).save()

    const result = {
      ok: false,
      user: input
    }

    return result
  }

  static console () {
    console.log('estoy imprimiendo')
  }
}
