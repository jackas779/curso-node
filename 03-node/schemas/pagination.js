const z = require('zod')

function validationPaginator(input, number) {
  const pagination = z.object({
    pagination: z.number().max(number).min(1)
  })
  return pagination.safeParse(input)
}

module.exports = {
  validationPaginator
}
