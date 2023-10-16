import { Router } from "express"
import {
  createCourse,
  deleteCourse,
  getCourses,
  updateCourse,
  updateCourseNotesByStudent,
} from "./course.controller"

const courseRoutes = Router()

courseRoutes.get("/", [], getCourses)
courseRoutes.post("/", [], createCourse)
courseRoutes.put("/:courseId", [], updateCourse)
courseRoutes.put("/:courseId/:studentId", [], updateCourseNotesByStudent)
courseRoutes.delete("/:courseId", [], deleteCourse)

export default courseRoutes
