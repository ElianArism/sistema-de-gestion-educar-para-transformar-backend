import { Router } from "express"
import {
  createCourse,
  deleteCourse,
  getCourses,
  updateCourse,
} from "./course.controller"

const courseRoutes = Router()

courseRoutes.get("/", [], getCourses)
courseRoutes.post("/", [], createCourse)
courseRoutes.put("/:courseId", [], updateCourse)
courseRoutes.delete("/:courseId", [], deleteCourse)

export default courseRoutes
