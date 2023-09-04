import { Router } from "express"
import { newsValidation } from "../../middlewares/validations/news.validation"
import {
  createNews,
  deleteNews,
  getNews,
  getNewsById,
  updateNews,
} from "./news.controller"

const NewsRouter = Router()

NewsRouter.get("/", [], getNews)
NewsRouter.get("/:id", [], getNewsById)
NewsRouter.delete("/:id", [], deleteNews)
NewsRouter.post("/", newsValidation, createNews)
NewsRouter.put("/:id", newsValidation, updateNews)

export default NewsRouter
