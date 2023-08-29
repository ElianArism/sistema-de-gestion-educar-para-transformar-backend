import { Router } from "express"

import { validateJWT } from "../../middlewares/validate-jwt.middleware"
import {
  createParentValidations,
  createProfessorValidations,
  createStudentValidations,
  updateParentValidations,
  updateProfessorValidations,
  updateStudentValidations,
} from "../../middlewares/validations/user.validation"

import {
  createParent,
  createProfessor,
  createStudent,
  deleteUser,
  getAllUsers,
  getUserById,
  updateParent,
  updatePassword,
  updateProfessor,
  updateStudent,
} from "./user.controller"

const userRoutes = Router()

userRoutes.get("/all/:role", [], getAllUsers)
userRoutes.get("/:role/:id", [], getUserById)
userRoutes.delete("/:role/:id", [], deleteUser)
userRoutes.put("/update-password", [validateJWT], updatePassword)

userRoutes.put("/professor/:id", updateProfessorValidations, updateProfessor)
userRoutes.put("/student/:id", updateStudentValidations, updateStudent)
userRoutes.put("/parent/:id", updateParentValidations, updateParent)

userRoutes.post("/professor", createProfessorValidations, createProfessor)
userRoutes.post("/student", createStudentValidations, createStudent)
userRoutes.post("/parent", createParentValidations, createParent)

export default userRoutes
