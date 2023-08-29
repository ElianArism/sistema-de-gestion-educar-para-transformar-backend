import { Router } from "express"
import { createCommentValidations } from "../../middlewares/validations/comment.validation"
import {
  createComment,
  deleteComment,
  getCommentById,
  getComments,
} from "./comment.controller"

export const router = Router()

router.get("/", [], getComments)
router.get("/:id", [], getCommentById)
router.get("/:id", [], deleteComment)
router.get("/", createCommentValidations, createComment)

export default router
