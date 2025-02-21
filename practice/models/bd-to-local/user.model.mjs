import { ModelUser, baseModelUser } from '../../schemas/user.schema.bd.mjs'
import DbLocal from 'db-local'
import crypto from 'crypto'

const { randomUUID } = crypto
const { Schema } = new DbLocal({ path: './data' })

export class UserModel {
  static create ({ input }) {
    const userSchema = Schema(ModelUser, baseModelUser)

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
