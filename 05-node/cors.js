import cors from 'cors'

const ACCEPTED_ORIGINS = [
  'http://127.0.0.1:5500',
  'http://localhost:8080',
  'https://movies.com',
  'https://midu.dev'
]

export const corsMiddleware = ({ originesAcepteds = ACCEPTED_ORIGINS } = {}) => cors({
  origin: (origin, callback) => {
    if (originesAcepteds.includes(origin)) {
      return callback(null, true)
    }

    if (!origin) {
      return callback(null, true)
    }

    return callback(new Error('Not allowed by CORS'))
  }
})
