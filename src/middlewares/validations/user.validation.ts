import { check } from "express-validator"
import { checkErrors } from "./check-errors"

export const userValidations = [
  check("id", "id is required").isString().not().isEmpty(),
  check("name", "name is required").isString().not().isEmpty(),
  check("lastName", "lastName is required").isString().not().isEmpty(),
  check("password", "password is required").isString().not().isEmpty(),
  check("birthDate", "birthDate is required").isString().not().isEmpty(),
  check("role", "role is required").isString().not().isEmpty(),
]

export const createProfessorValidations = [
  ...userValidations,
  check("email").not().isEmpty().isEmail(),
  check("subjects").optional().isArray(),
  checkErrors,
]
export const createStudentValidations = [
  ...userValidations,
  check("subjects").optional().isArray(),
  checkErrors,
]

export const createParentValidations = [
  ...userValidations,
  check("son").not().isEmpty().isMongoId(),
  checkErrors,
]

export const updateUserValidations = [
  check("name", "name is required").optional().isString(),
  check("lastName", "lastName is required").optional().isString(),
  check("birthDate", "birthDate is required").optional().isString(),
]

export const updateProfessorValidations = [
  ...updateUserValidations,
  check("email").optional().isEmail(),
  checkErrors,
]
export const updateStudentValidations = [
  ...updateUserValidations,
  check("subjects").optional().isArray(),
  checkErrors,
]

export const updateParentValidations = [
  ...updateUserValidations,
  check("subjects").optional().isArray(),
  checkErrors,
]
