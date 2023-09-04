import { Router } from "express"
import {
  createSubjectValidations,
  updateSubjectValidations,
} from "../../middlewares/validations/subject.validation"
import {
  createSubject,
  deleteSubject,
  getSubjectById,
  getSubjects,
  updateSubject,
} from "./subject.controller"

const SubjectRoutes = Router()

SubjectRoutes.get("/", [], getSubjects)
SubjectRoutes.get("/:id", [], getSubjectById)
SubjectRoutes.post("/", createSubjectValidations, createSubject)
SubjectRoutes.put("/:id", updateSubjectValidations, updateSubject)
SubjectRoutes.delete("/:id", [], deleteSubject)

export default SubjectRoutes
