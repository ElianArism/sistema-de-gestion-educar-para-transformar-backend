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
  createAuthority,
  createParent,
  createPersonal,
  createProfessor,
  createStudent,
  deleteUser,
  getAllUsers,
  getUserById,
  payFee,
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
userRoutes.put("/student/fees", [] /* [validateJWT] */, payFee)
userRoutes.put("/student/:id", updateStudentValidations, updateStudent)
userRoutes.put("/parent/:id", updateParentValidations, updateParent)

userRoutes.post("/personal", [], createPersonal)
userRoutes.post("/authority", [], createAuthority)
userRoutes.post("/professor", createProfessorValidations, createProfessor)
userRoutes.post("/student", createStudentValidations, createStudent)
userRoutes.post("/parent", createParentValidations, createParent)

export default userRoutes
