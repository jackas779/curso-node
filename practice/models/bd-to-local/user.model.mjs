import { ModelUser, baseModelUser } from '../../schemas/user.schema.bd.mjs'
import DbLocal from 'db-local'
import crypto from 'crypto'

const { randomUUID } = crypto
const { Schema } = new DbLocal({ path: './data' })

export class UserModel {
  constructor () {
    this.userSchema = Schema(ModelUser, baseModelUser)
  }

  static async create ({ input }) {
    const newUser = {
      _id: randomUUID(),
      ...input
    }
    this.userSchema.create(newUser).save()

    const result = {
      ok: true,
      user: newUser
    }
    return result
  }
}
