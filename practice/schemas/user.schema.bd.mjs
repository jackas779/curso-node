import { boolean, number, string } from 'zod'

export const ModelUser = 'users'
export const baseModelUser = {
  _id: {
    type: Number
  },
  username: {
    type: string,
    required: true
  },
  firstName: {
    type: string,
    required: true
  },
  lastName: {
    type: string,
    required: true
  },
  email: {
    type: string,
    required: true
  },
  password: {
    type: string,
    required: true
  },
  phone: {
    type: string,
    required: true
  },
  age: {
    type: number,
    required: true
  },
  isAdult: {
    type: boolean,
    required: true
  }
}
