import { Router } from "express"
import commentRoutes from "./modules/comment/comment.routes"
import userRoutes from "./modules/user/user.routes"

const AppRouter = Router()

AppRouter.use("/users", userRoutes)
AppRouter.use("/comment", commentRoutes)

export default AppRouter
