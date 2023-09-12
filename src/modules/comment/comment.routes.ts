import { Router } from "express"
import { createCommentValidations } from "../../middlewares/validations/comment.validation"
import {
  createComment,
  deleteComment,
  getCommentById,
  getComments,
} from "./comment.controller"

export const commentRoutes = Router()

commentRoutes.get("/", [], getComments)
commentRoutes.get("/:id", [], getCommentById)
commentRoutes.get("/:id", [], deleteComment)
commentRoutes.post("/", createCommentValidations, createComment)

export default commentRoutes
