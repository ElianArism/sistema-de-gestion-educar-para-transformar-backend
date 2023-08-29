import { check } from "express-validator"

export const createCommentValidations = [
  check("description").not().isEmpty().isString(),
  check("name").optional().isString(),
  check("date").not().isEmpty().isString(),
  check("rating").optional().isNumeric(),
]
