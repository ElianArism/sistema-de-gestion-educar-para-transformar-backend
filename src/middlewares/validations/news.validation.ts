import { check } from "express-validator"

export const newsValidation = [
  check("title").isString(),
  check("description").isString(),
  check("imgUrl").optional().isString(),
  check("date").optional().isString(),
]
