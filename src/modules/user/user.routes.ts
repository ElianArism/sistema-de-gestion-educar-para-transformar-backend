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

const router = Router()

router.get("/all/:role", [], getAllUsers)
router.get("/:role/:id", [], getUserById)
router.delete("/:role/:id", [], deleteUser)
router.put("/update-password", [validateJWT], updatePassword)

router.put("/professor/:id", updateProfessorValidations, updateProfessor)
router.put("/student/:id", updateStudentValidations, updateStudent)
router.put("/parent/:id", updateParentValidations, updateParent)

router.post("/professor", createProfessorValidations, createProfessor)
router.post("/student", createStudentValidations, createStudent)
router.post("/parent", createParentValidations, createParent)

export default router
