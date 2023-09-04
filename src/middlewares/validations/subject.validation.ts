import { check } from "express-validator"

export const createSubjectValidations = [
  check("name").isString(),
  check("schedules").isArray(),
]

export const updateSubjectValidations = [
  check("name").isString(),
  check("students").isArray(),
  check("schedules").isArray(),
]
