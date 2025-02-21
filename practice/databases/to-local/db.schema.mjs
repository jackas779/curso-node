import DbLocal from 'db-local'
const { Schema } = new DbLocal({ path: './data' })

export function connectionBd (model, baseModel) {
  return Schema(model, baseModel)
}
