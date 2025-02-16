import swaggerJsdoc from 'swagger-jsdoc'

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'ESPOT API',
      version: '1.0.0',
      description: 'API DE ESPOT',
      contact: {
        name: 'Nicolas Ardila'
      },
      servers: [
        {
          url: 'http://localhost:1234',
          description: 'Local server'
        }
      ]
    }
  },
  apis: ['./swagger/*.yml']
}

const specs = swaggerJsdoc(options)
export default specs
