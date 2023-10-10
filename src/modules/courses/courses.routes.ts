import { Router } from "express"
import { createCourse, getCourses } from "./course.controller"

const courseRoutes = Router()

courseRoutes.get("/", [], getCourses)
courseRoutes.post("/", [], createCourse)

export default courseRoutes
